import {createServer,type IncomingMessage,type ServerResponse} from 'node:http';
import {readFileSync} from 'node:fs';
import {initializeApp,cert,applicationDefault} from 'firebase-admin/app';
import {getAuth,type DecodedIdToken} from 'firebase-admin/auth';
import {getFirestore} from 'firebase-admin/firestore';
import {validPlan,type Plan} from '../lib/catalog';
import {isPlanLocked,normalizeStoredPlan,pathComplete} from '../lib/plan-state';

const projectId=process.env.FIREBASE_PROJECT_ID||'careerguidaance';
const credentialPath=process.env.GOOGLE_APPLICATION_CREDENTIALS;
initializeApp({projectId,credential:credentialPath?cert(JSON.parse(readFileSync(credentialPath,'utf8'))):applicationDefault()});
const store=getFirestore();
store.settings({ignoreUndefinedProperties:true});
const auth=getAuth();
const allowed=new Set((process.env.ALLOWED_ORIGINS||'https://careerguidaance.web.app,https://careerguidaance.firebaseapp.com').split(',').map(v=>v.trim()).filter(Boolean));
class ApiError extends Error{constructor(public status:number,message:string){super(message);}}
const fail=(status:number,message:string):never=>{throw new ApiError(status,message);};
const sameRoute=(a:Plan,b:Plan)=>a.branch===b.branch&&a.path.length===b.path.length&&a.path.every((id,i)=>id===b.path[i]);
function fields(plan:Plan):Plan{
 return {version:2,path:[...plan.path],branch:plan.branch,region:plan.region,history:plan.history.map(v=>({label:v.label,at:v.at})),tasks:[...plan.tasks],...(plan.student?{student:{...plan.student,interests:[...plan.student.interests],subjects:[...plan.student.subjects]}}:{}),...(plan.exploration?{exploration:plan.exploration.map(v=>({id:v.id,work:v.work,reflection:v.reflection}))}:{})};
}
async function input(req:IncomingMessage){
 if(!req.headers['content-type']?.startsWith('application/json'))fail(400,'Send a JSON request.');
 const chunks:Buffer[]=[];let size=0;
 for await(const chunk of req){size+=chunk.length;if(size>24000)fail(413,'This request is too large.');chunks.push(chunk);}
 try{const value=JSON.parse(Buffer.concat(chunks).toString());if(!value||typeof value!=='object'||Array.isArray(value))throw new Error();return value;}catch{fail(400,'Invalid request.');}
}
async function identity(req:IncomingMessage):Promise<DecodedIdToken>{
 const header=req.headers.authorization;
 if(!header?.startsWith('Bearer '))return fail(401,'Please sign in first.');
 try{return await auth.verifyIdToken(header.slice(7),true);}catch{return fail(401,'Please sign in again.');}
}
async function limit(uid:string){
 // One document per account, replaced each minute; no unbounded rate-limit collection.
 const ref=store.collection('limits').doc(uid),now=Date.now(),window=Math.floor(now/60000);
 await store.runTransaction(async tx=>{const row=(await tx.get(ref)).data();const count=row?.window===window?row.count+1:1;if(count>120)fail(429,'Please wait a moment and try again.');tx.set(ref,{window,count});});
}
async function updatePlan(uid:string,data:Record<string,unknown>){
 const ref=store.collection('students').doc(uid);
 return store.runTransaction(async tx=>{
  const row=(await tx.get(ref)).data();
  if(!row)fail(409,'Your account setup is incomplete. Please sign in again.');
  if(row?.deleting)fail(409,'This account is being deleted.');
  const saved=row?.plan&&validPlan(row.plan)?normalizeStoredPlan(row.plan,row.updated):null;
  if(row?.plan&&!saved)fail(503,'Your saved plan could not be loaded.');
  if(data.expectedUpdated!==(row?.updated??null))fail(409,'Your plan changed in another tab. Reload it before saving.');
  const updated=Math.max(Date.now(),(row?.updated||0)+1);
  if(data.action==='reset'){
   if(data.confirmReset!==true||!saved)fail(400,'Confirm the saved route you want to reset.');
   const plan=fields({version:2,path:['tenth'],branch:'',region:saved!.region,history:[],tasks:[],...(saved!.student?{student:saved!.student}:{}),...(saved!.exploration?{exploration:saved!.exploration}:{})});
   tx.set(ref,{...row,plan,updated});return {ok:true,plan,updated};
  }
  if(!validPlan(data.plan))fail(400,'This plan contains an invalid selection.');
  if(data.action!==undefined&&data.action!=='save'&&data.action!=='finish')fail(400,'This action is not available.');
  const incoming=data.plan as Plan,locked=!!saved&&isPlanLocked(saved),finish=data.action==='finish';
  if(locked&&!sameRoute(incoming,saved!))fail(409,'Your route is already saved. Use Reset to choose again.');
  if(finish&&(!pathComplete(incoming)||!incoming.student))fail(400,'Complete your profile and choose a branch or career destination.');
  if(!locked&&!finish&&(incoming.lockedAt!==undefined||incoming.overviewSeen!==undefined))fail(400,'Use Finish and save to confirm your route.');
  const plan=fields(incoming);
  if(locked){plan.lockedAt=saved!.lockedAt;plan.overviewSeen=saved!.overviewSeen===true||incoming.overviewSeen===true;if(!plan.student&&saved!.student)plan.student=saved!.student;}
  else if(finish){plan.lockedAt=updated;plan.overviewSeen=false;}
  // Store the whole plan as one value; nested merge would retain old lock fields after reset.
  tx.set(ref,{...row,plan,updated});return {ok:true,plan,updated};
 });
}
async function handle(req:IncomingMessage,res:ServerResponse){
 res.setHeader('Cache-Control','no-store');res.setHeader('X-Content-Type-Options','nosniff');
 const send=(value:unknown,status=200)=>{res.writeHead(status,{'Content-Type':'application/json'});res.end(JSON.stringify(value));};
 try{
  const origin=req.headers.origin;
  if(origin&&!allowed.has(origin))fail(403,'This website is not allowed to use the API.');
  if(origin){res.setHeader('Access-Control-Allow-Origin',origin);res.setHeader('Vary','Origin');}
  if(req.method==='OPTIONS'){res.setHeader('Access-Control-Allow-Headers','Authorization, Content-Type');res.setHeader('Access-Control-Allow-Methods','GET, POST, OPTIONS');res.writeHead(204);res.end();return;}
  const path=new URL(req.url||'/','http://localhost').pathname;
  if(path==='/health'&&req.method==='GET'){send({ok:true});return;}
  if(path==='/api/config'&&req.method==='GET'){send({whatsappReady:false});return;}
  if(!path.startsWith('/api/'))fail(404,'Not found.');
  const user=await identity(req);
  if(path==='/api/me'&&req.method==='GET'){send({user:{id:user.uid,email:user.email||''}});return;}
  await limit(user.uid);
  const ref=store.collection('students').doc(user.uid);
  if(path==='/api/plan'&&req.method==='GET'){
   const row=(await ref.get()).data();if(row?.deleting)fail(409,'This account is being deleted.');
   if(row?.plan&&!validPlan(row.plan))fail(503,'Your saved plan could not be loaded.');
   send({plan:row?.plan?normalizeStoredPlan(row.plan,row.updated):null,updated:row?.updated});return;
  }
  if(req.method!=='POST')fail(404,'Not found.');
  const data=await input(req);
  if(path==='/api/register'){
   if(data.terms!==true)fail(400,'Accept the terms before continuing.');
   await store.runTransaction(async tx=>{const old=await tx.get(ref);if(!old.exists)tx.create(ref,{created:Date.now(),terms:'2026-10-21',email:user.email||''});});
   send({ok:true});return;
  }
  if(path==='/api/plan'){send(await updatePlan(user.uid,data));return;}
  if(path==='/api/connect')fail(503,'The WhatsApp bot is coming soon.');
  if(path==='/api/change-password'||path==='/api/delete-account'){
   if(Date.now()/1000-user.auth_time>300)fail(401,'Confirm your password again.');
   if(path==='/api/change-password'){
    const password=data.newPassword;
    if(typeof password!=='string'||password.length<12||password.length>128||password!==data.confirmPassword)fail(400,'Use 12–128 characters and matching new passwords.');
    await auth.updateUser(user.uid,{password});await auth.revokeRefreshTokens(user.uid);send({ok:true});return;
   }
   await ref.set({deleting:true},{merge:true});
   await auth.updateUser(user.uid,{disabled:true});
   await store.collection('limits').doc(user.uid).delete();await ref.delete();await auth.deleteUser(user.uid);send({ok:true});return;
  }
  fail(404,'Not found.');
 }catch(error){const known=error instanceof ApiError;send({error:known?error.message:'Unable to complete this request. Please try again.'},known?error.status:503);if(!known)console.error('API request failed:',(error as {code?:string}).code||'internal');}
}
const server=createServer((req,res)=>{void handle(req,res);});
server.requestTimeout=65000;
server.listen(Number(process.env.PORT)||10000,'0.0.0.0',()=>console.log('Career Guidance API is ready.'));
