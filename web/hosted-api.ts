import {initializeApp} from 'firebase/app';
import {getAuth, browserSessionPersistence, setPersistence, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, reauthenticateWithCredential, EmailAuthProvider, deleteUser} from 'firebase/auth';

declare const __FIREBASE_CONFIG__: Record<string,string>;
declare const __API_URL__: string;
const auth=getAuth(initializeApp(__FIREBASE_CONFIG__));
const ready=setPersistence(auth,browserSessionPersistence).then(()=>auth.authStateReady());
const result=(value:unknown,status=200)=>Response.json(value,{status});

async function remote(path:string,data?:unknown){
 const user=auth.currentUser;
 const headers:Record<string,string>={};
 if(user)headers.Authorization='Bearer '+await user.getIdToken();
 if(data!==undefined)headers['Content-Type']='application/json';
 return fetch(__API_URL__+'/api/'+path,{method:data===undefined?'GET':'POST',headers,body:data===undefined?undefined:JSON.stringify(data),signal:AbortSignal.timeout(60000)});
}

export async function hostedRequest(path:string,data?:unknown):Promise<Response>{
 try {
  await ready;
  const input=(data||{}) as Record<string,unknown>;
  if(path==='login'||path==='register'){
   const email=String(input.email||'').trim(),password=String(input.password||'');
   if(password.length<12||password.length>128)return result({error:'Use a password of 12–128 characters.'},400);
   if(path==='register'){
    if(input.terms!==true||input.confirmPassword!==password)return result({error:'Confirm your password and accept the terms.'},400);
    const account=await createUserWithEmailAndPassword(auth,email,password);
    try {
     const accepted=await remote('register',{terms:true});
     if(!accepted.ok){await deleteUser(account.user);return accepted;}
    } catch(error){await deleteUser(account.user).catch(()=>{});throw error;}
   }else await signInWithEmailAndPassword(auth,email,password);
   return result({user:{id:auth.currentUser!.uid,email:auth.currentUser!.email}});
  }
  if(path==='logout'){await signOut(auth);return result({ok:true});}
  if(path==='change-password'||path==='delete-account'){
   const user=auth.currentUser;
   if(!user?.email)return result({error:'Please sign in again.'},401);
   await reauthenticateWithCredential(user,EmailAuthProvider.credential(user.email,String(input.password||'')));
   // Send only the new password, never the old password, to the API.
   const response=await remote(path,path==='change-password'?{newPassword:input.newPassword,confirmPassword:input.confirmPassword}:{});
   if(response.ok){
    if(path==='change-password')await signInWithEmailAndPassword(auth,user.email,String(input.newPassword));
    else await signOut(auth);
   }
   return response;
  }
  if(path==='me'&&!auth.currentUser)return result({user:null});
  return await remote(path,data);
 }catch(error){
  const code=(error as {code?:string}).code||'';
  const message=code==='auth/email-already-in-use'?'An account already exists. Please log in.':
   ['auth/invalid-credential','auth/wrong-password','auth/user-not-found'].includes(code)?'The email or password is incorrect.':
   code==='auth/too-many-requests'?'Too many attempts. Please try again later.':
   code==='auth/invalid-email'?'Enter a valid email address.':
   code==='auth/weak-password'?'Choose a stronger password.':
   'Unable to connect. Please try again shortly.';
  return result({error:message},400);
 }
}
