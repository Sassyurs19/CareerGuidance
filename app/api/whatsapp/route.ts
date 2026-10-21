import { botConfig, botReady, botReply, sendReply, verifySignature } from '../../../lib/whatsapp';
import { db, json, limit } from '../../../lib/server';
import { digest } from '../../../lib/security';
import { validPlan } from '../../../lib/catalog';
export const dynamic='force-dynamic';
export async function GET(req:Request){const c=botConfig();const q=new URL(req.url).searchParams;if(!botReady())return json({error:'WhatsApp is not connected.'},503);if(q.get('hub.mode')==='subscribe'&&q.get('hub.verify_token')===c.verifyToken)return new Response(q.get('hub.challenge')||'',{headers:{'Cache-Control':'no-store'}});return json({error:'Verification failed'},403);}
type Incoming={entry?:{changes?:{value?:{metadata?:{phone_number_id?:string};messages?:{id:string;from:string;type:string;text?:{body:string}}[]}}[]}[]};
export async function POST(req:Request){
 if(!botReady())return json({error:'WhatsApp is not connected.'},503);
 const raw=await req.text();if(raw.length>128000)return json({error:'Payload too large'},413);
 if(!verifySignature(raw,req.headers.get('x-hub-signature-256')||'',botConfig().appSecret))return json({error:'Invalid signature'},403);
 try{const payload=JSON.parse(raw) as Incoming;const now=Date.now();await db().batch([db().prepare('DELETE FROM bot_links WHERE expires<?').bind(now),db().prepare('DELETE FROM bot_messages WHERE expires<?').bind(now)]);
 for(const entry of payload.entry||[])for(const change of entry.changes||[]){const value=change.value;if(value?.metadata?.phone_number_id!==botConfig().phoneId)continue;
 for(const message of value.messages||[]){if(!/^\d{8,15}$/.test(message.from)||typeof message.id!=='string')continue;
 const seen=await db().prepare('INSERT INTO bot_messages(id,expires,sent) VALUES(?,?,0) ON CONFLICT(id) DO NOTHING RETURNING id').bind(message.id,now+86400000).first();if(!seen)continue;
 try{if(!await limit('wa:'+digest(message.from),15,60000)){await db().prepare('UPDATE bot_messages SET sent=1 WHERE id=?').bind(message.id).run();continue;}
 const code=message.text?.body?.trim().match(/^CG ([a-f0-9]{24})$/i)?.[1].toLowerCase();let reply='Hi! I am the Career Guidance resource bot. Choose your study path on the website, review the sharing notice, then use Get connected to send your plan code. I will reply automatically with your path and resources. Do not send passwords or documents.';
 if(code){const phoneHash=digest(message.from);const row=await db().prepare('UPDATE bot_links SET phone_hash=? WHERE code=? AND expires>? AND (phone_hash IS NULL OR phone_hash=?) RETURNING snapshot').bind(phoneHash,digest(code),now,phoneHash).first<{snapshot:string}>();if(row){const plan=JSON.parse(row.snapshot);reply=validPlan(plan)?botReply(plan):'This plan could not be read. Please create a new connection from the website.';}else reply='This plan code has expired or is already linked elsewhere. Please use Get connected on the website to create a new code.';}
 await sendReply(message.from,reply);await db().prepare('UPDATE bot_messages SET sent=1 WHERE id=?').bind(message.id).run();
 }catch{await db().prepare('DELETE FROM bot_messages WHERE id=? AND sent=0').bind(message.id).run();return json({error:'Delivery pending; retry webhook'},503);}
 }}return json({ok:true});}catch{return json({error:'Unable to process webhook'},503);}
}
