import assert from 'node:assert/strict';
const base='http://127.0.0.1:5173';
const email=`qa-${Date.now()}@example.test`, password='Career-test-passphrase-2026';
let cookie='';
async function call(path,data,options={}){const r=await fetch(base+'/api/'+path,{method:data===undefined?'GET':'POST',headers:{...(data===undefined?{}:{'Content-Type':'application/json',Origin:base}),...(cookie?{Cookie:cookie}:{}),...options},body:data===undefined?undefined:JSON.stringify(data)});const text=await r.text();let b;try{b=JSON.parse(text)}catch{b={error:text}};if(r.headers.get('set-cookie'))cookie=r.headers.get('set-cookie').split(';')[0];return {status:r.status,body:b,headers:r.headers};}
const plan={path:['tenth','diploma','lateral','engineeringcareer'],branch:'ece',region:'Andhra Pradesh',history:[{label:'Diploma / Polytechnic',at:new Date().toISOString()}],tasks:['explore']};
assert.equal((await call('plan')).status,401);
assert.equal((await call('register',{email,password,confirmPassword:'different',terms:true})).status,400);
assert.equal((await call('register',{email,password,confirmPassword:password,terms:false})).status,400);
let r=await call('register',{email,password,confirmPassword:password,terms:true});assert.equal(r.status,201,JSON.stringify(r.body));assert.equal(r.body.user.email,email);assert.match(r.headers.get('set-cookie'),/HttpOnly/);assert.match(r.headers.get('set-cookie'),/SameSite=Lax/);
assert.equal((await call('me')).body.user.email,email);
assert.ok([400,403].includes((await call('plan',{plan},{Origin:'https://other.example'})).status));
assert.equal((await call('plan',{plan:{...plan,path:['tenth','medicine']}})).status,400);
assert.equal((await call('plan',{plan})).status,200);
assert.deepEqual((await call('plan')).body.plan,plan);
const ownerCookie=cookie;cookie='';assert.equal((await call('register',{email:'second-'+email,password,confirmPassword:password,terms:true})).status,201);assert.equal((await call('plan')).body.plan,null);assert.equal((await call('delete-account',{password})).status,200);cookie=ownerCookie;assert.deepEqual((await call('plan')).body.plan,plan);
assert.equal((await call('config')).body.whatsappReady,false);
assert.equal((await call('connect',{plan,consent:true})).status,503);
const firstCookie=cookie;
assert.equal((await call('logout',{})).status,200);
assert.equal((await call('plan',undefined,{Cookie:firstCookie})).status,401);
assert.equal((await call('login',{email,password:'wrong-password-here'})).status,401);
assert.equal((await call('login',{email,password})).status,200);
assert.deepEqual((await call('plan')).body.plan,plan);
const secondCookie=cookie;
const newPassword='Changed-career-passphrase-2026';
assert.equal((await call('change-password',{password,newPassword,confirmPassword:newPassword})).status,200);
assert.equal((await call('plan',undefined,{Cookie:secondCookie})).status,401);
assert.equal((await call('delete-account',{password:'wrong-password-here'})).status,401);
assert.equal((await call('delete-account',{password:newPassword})).status,200);
assert.equal((await call('me')).body.user,null);
assert.equal((await call('login',{email,password:newPassword})).status,401);
console.log('PASS: registration validation, hashed-password authentication, session cookies, CSRF protection, plan validation/persistence, logout, password rotation, account deletion, and disabled WhatsApp integration.');


