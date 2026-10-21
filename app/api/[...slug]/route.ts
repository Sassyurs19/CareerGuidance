import { botReady, botConfig } from '../../../lib/whatsapp';
import { body, cookie, db, identity, json, limit, newSession } from '../../../lib/server';
import { digest, hashPassword, token, validPassword, verifyPassword } from '../../../lib/security';
import { validPlan, type Plan } from '../../../lib/catalog';
import { isPlanLocked, normalizeStoredPlan, pathComplete } from '../../../lib/plan-state';
export const dynamic='force-dynamic';
function endpoint(r:Request){return new URL(r.url).pathname.slice(5);}
async function storedPlan(student:string){
 const row=await db().prepare('SELECT data,updated FROM plans WHERE student=?').bind(student).first<{data:string;updated:number}>();
 if(!row)return {row:null,plan:null};
 const value:unknown=JSON.parse(row.data);
 if(!validPlan(value))throw new Error('PLAN_INVALID');
 return {row,plan:normalizeStoredPlan(value,row.updated)};
}
function sameRoute(a:Plan,b:Plan){return a.branch===b.branch&&a.path.length===b.path.length&&a.path.every((id,i)=>id===b.path[i]);}
function planFields(plan:Plan):Plan{
 return {
  version:2,path:[...plan.path],branch:plan.branch,region:plan.region,
  ...(plan.exploration?{exploration:plan.exploration.map(entry=>({id:entry.id,work:entry.work,reflection:entry.reflection}))}:{}),
  history:plan.history.map(item=>({label:item.label,at:item.at})),tasks:[...plan.tasks],
  ...(plan.student?{student:{standard:plan.student.standard,course:plan.student.course,year:plan.student.year,interests:[...plan.student.interests],subjects:[...plan.student.subjects]}}:{}),
 };
}
export async function GET(req:Request){try{
 const route=endpoint(req);
 if(route==='config')return json({whatsappReady:botReady()});
 const user=await identity(req);
 if(route==='me')return json({user});
 if(!user)return json({error:'Please sign in to view your saved plan.'},401);
 if(route==='plan'){const saved=await storedPlan(user.id);return json({plan:saved.plan,updated:saved.row?.updated});}
 return json({error:'Not found'},404);
 }catch{return json({error:'We could not load this right now. Please try again.'},503);}}
export async function POST(req:Request){try{
 const input=await body(req);const route=endpoint(req);
 if(!input||typeof input!=='object'||Array.isArray(input))return json({error:'Invalid request. Refresh the page and try again.'},400);
 if(route==='register'||route==='login'){
  const email=typeof input.email==='string'?input.email.trim().toLowerCase():'';
  if(email.length>254||!/^\S+@\S+\.\S+$/.test(email)||!validPassword(input.password))return json({error:'Enter a valid email and a password of 12–128 characters.'},400);
  const ip=req.headers.get('cf-connecting-ip')||'local';
  if(!await limit('ip:'+digest(ip),60)||!await limit('email:'+digest(email),12))return json({error:'Too many attempts. Please try again in 15 minutes.'},429);
  await db().prepare('DELETE FROM sessions WHERE expires<?').bind(Date.now()).run();
  if(route==='register'){
   if(input.password!==input.confirmPassword)return json({error:'Your passwords do not match.'},400);
   if(input.terms!==true)return json({error:'Please read and accept the terms and privacy notice.'},400);
   const exists=await db().prepare('SELECT id FROM students WHERE email=?').bind(email).first();
   if(exists)return json({error:'An account cannot be created with these details. Try signing in.'},409);
   const id=token();const password=await hashPassword(input.password);
   await db().prepare('INSERT INTO students(id,email,password,created,terms) VALUES(?,?,?,?,?)').bind(id,email,password,Date.now(),'2026-10-19').run();
   return json({user:{id,email}},201,{'Set-Cookie':await newSession(id,req)});
  }
  const row=await db().prepare('SELECT id,email,password FROM students WHERE email=?').bind(email).first<{id:string;email:string;password:string}>();
  const hash=row?.password||'scrypt$0000000000000000000000000000000000000000000000000000000000000000$0000000000000000000000000000000000000000000000000000000000000000';
  const good=await verifyPassword(input.password,hash);
  if(!row||!good)return json({error:'The email or password is incorrect.'},401);
  return json({user:{id:row.id,email:row.email}},200,{'Set-Cookie':await newSession(row.id,req)});
 }
 const user=await identity(req);if(!user)return json({error:'Please sign in first.'},401);
 if(!await limit('user:'+user.id,120,60000))return json({error:'Please wait a moment and try again.'},429);
 if(route==='connect'){
  if(!botReady())return json({error:'The WhatsApp bot is coming soon.'},503);
  if(input.consent!==true||!validPlan(input.plan))return json({error:'Review your plan and accept sharing first.'},400);
  const saved=await storedPlan(user.id);
  if(!saved.plan||!isPlanLocked(saved.plan))return json({error:'Finish and save your career route before connecting.'},409);
  if(!sameRoute(input.plan,saved.plan)||input.plan.region!==saved.plan.region||JSON.stringify(input.plan.history)!==JSON.stringify(saved.plan.history)||JSON.stringify(input.plan.tasks)!==JSON.stringify(saved.plan.tasks))return json({error:'Save your latest progress, then review the plan to share.'},409);
  const snapshot={...saved.plan,student:undefined,exploration:undefined};
  const code=token().slice(0,24);
  await db().prepare('DELETE FROM bot_links WHERE expires<?').bind(Date.now()).run();
  const link=await db().prepare('INSERT INTO bot_links(code,student,snapshot,expires) SELECT ?,?,?,? WHERE EXISTS(SELECT 1 FROM plans WHERE student=? AND data=? AND updated=?)').bind(digest(code),user.id,JSON.stringify(snapshot),Date.now()+86400000,user.id,saved.row!.data,saved.row!.updated).run();
  if(link.meta.changes!==1)return json({error:'Your plan changed. Reload the page and review it before connecting.'},409);
  return json({url:'https://wa.me/'+botConfig().number+'?text='+encodeURIComponent('CG '+code)});
 }
 if(route==='logout'){const raw=req.headers.get('cookie')?.match(/(?:^|;\s*)cg_session=([a-f0-9]{64})/)?.[1];if(raw)await db().prepare('DELETE FROM sessions WHERE token=?').bind(digest(raw)).run();return json({ok:true},200,{'Set-Cookie':cookie('',req,0)});}
 if(route==='plan'){
  if(input.action==='reset'){
   if(input.confirmReset!==true)return json({error:'Confirm that you want to reset your route and its progress.'},400);
   if(typeof input.expectedUpdated!=='number'||!Number.isSafeInteger(input.expectedUpdated)||input.expectedUpdated<=0)return json({error:'Reload your saved plan before resetting it.'},400);
   const saved=await storedPlan(user.id);
   if(!saved.row||!saved.plan)return json({error:'There is no saved plan to reset.'},400);
   if(input.expectedUpdated!==saved.row.updated)return json({error:'Your plan changed in another tab. Reload it before resetting.'},409);
   const plan=planFields({version:2,path:['tenth'],branch:'',region:saved.plan.region,history:[],tasks:[],...(saved.plan.exploration?{exploration:saved.plan.exploration}:{}),...(saved.plan.student?{student:saved.plan.student}:{})});
   const data=JSON.stringify(plan);
   const updated=Math.max(Date.now(),saved.row.updated+1);
   const result=await db().batch([
    db().prepare('UPDATE plans SET data=?,updated=? WHERE student=? AND data=? AND updated=?').bind(data,updated,user.id,saved.row.data,saved.row.updated),
    // changes() refers to the preceding update in this atomic batch.
    db().prepare('DELETE FROM bot_links WHERE student=? AND changes()=1 AND EXISTS(SELECT 1 FROM plans WHERE student=? AND data=? AND updated=?)').bind(user.id,user.id,data,updated),
   ]);
   if(result[0].meta.changes!==1)return json({error:'Your plan changed in another tab. Reload it before resetting.'},409);
   return json({ok:true,plan,updated});
  }
  if(!validPlan(input.plan))return json({error:'This plan contains an invalid selection.'},400);
  if(input.action!==undefined&&input.action!=='save'&&input.action!=='finish')return json({error:'This plan action is not available.'},400);
  const incoming=input.plan;
  const saved=await storedPlan(user.id);
  const locked=!!saved.plan&&isPlanLocked(saved.plan);
  const finish=input.action==='finish';
  if(locked&&saved.plan&&!sameRoute(incoming,saved.plan))return json({error:'Your career route is already saved. Reload the page to continue with your plan.'},409);
  if(finish&&(!pathComplete(incoming)||!incoming.student))return json({error:'Complete your student profile and choose an engineering branch or career destination before saving your route.'},400);
  if(!locked&&!finish&&(incoming.lockedAt!==undefined||incoming.overviewSeen!==undefined))return json({error:'Use Finish and save my route to confirm your career choice.'},400);
  const updated=Math.max(Date.now(),saved.row?saved.row.updated+1:0);
  const plan=planFields(incoming);
  if(locked&&saved.plan){
   plan.lockedAt=saved.plan.lockedAt;
   plan.overviewSeen=saved.plan.overviewSeen===true||incoming.overviewSeen===true;
   if(!plan.student&&saved.plan.student)plan.student=saved.plan.student;
  }else if(finish){
   plan.lockedAt=updated;
   plan.overviewSeen=false;
  }
  const data=JSON.stringify(plan);
  const result=saved.row
   ?await db().prepare('UPDATE plans SET data=?,updated=? WHERE student=? AND data=? AND updated=?').bind(data,updated,user.id,saved.row.data,saved.row.updated).run()
   :await db().prepare('INSERT INTO plans(student,data,updated) VALUES(?,?,?) ON CONFLICT(student) DO NOTHING').bind(user.id,data,updated).run();
  if(result.meta.changes!==1)return json({error:'Your plan changed in another tab. Reload the page before saving again.'},409);
  return json({ok:true,plan,updated});
 }
 if(route==='delete-account'){if(!validPassword(input.password))return json({error:'Enter your current password.'},400);const row=await db().prepare('SELECT password FROM students WHERE id=?').bind(user.id).first<{password:string}>();if(!row||!await verifyPassword(input.password,row.password))return json({error:'The password is incorrect.'},401);await db().batch([db().prepare('DELETE FROM bot_links WHERE student=?').bind(user.id),db().prepare('DELETE FROM sessions WHERE student=?').bind(user.id),db().prepare('DELETE FROM plans WHERE student=?').bind(user.id),db().prepare('DELETE FROM students WHERE id=?').bind(user.id)]);return json({ok:true},200,{'Set-Cookie':cookie('',req,0)});}
 if(route==='change-password'){if(!validPassword(input.password)||!validPassword(input.newPassword)||input.newPassword!==input.confirmPassword)return json({error:'Use 12–128 characters and matching new passwords.'},400);const row=await db().prepare('SELECT password FROM students WHERE id=?').bind(user.id).first<{password:string}>();if(!row||!await verifyPassword(input.password,row.password))return json({error:'The current password is incorrect.'},401);await db().batch([db().prepare('UPDATE students SET password=? WHERE id=?').bind(await hashPassword(input.newPassword),user.id),db().prepare('DELETE FROM sessions WHERE student=?').bind(user.id)]);return json({ok:true},200,{'Set-Cookie':await newSession(user.id,req)});}
 return json({error:'Not found'},404);
 }catch(e){if(e instanceof Error&&['ORIGIN','BODY'].includes(e.message))return json({error:'Invalid request. Refresh the page and try again.'},400);return json({error:'We could not complete that action. Please try again.'},503);}}

