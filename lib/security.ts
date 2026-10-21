import { randomBytes, scrypt, timingSafeEqual, createHash } from 'node:crypto';
export const token=()=>randomBytes(32).toString('hex');
export const digest=(s:string)=>createHash('sha256').update(s).digest('hex');
function derive(password:string,salt:string):Promise<Buffer>{return new Promise((resolve,reject)=>scrypt(password,salt,32,{N:16384,r:8,p:5,maxmem:32*1024*1024},(e,key)=>e?reject(e):resolve(key)));}
export async function hashPassword(password:string){const salt=token();return `scrypt$${salt}$${(await derive(password,salt)).toString('hex')}`;}
export async function verifyPassword(password:string,stored:string){const [algorithm,salt,hash]=stored.split('$');if(algorithm!=='scrypt'||!salt||!hash)return false;const a=await derive(password,salt);const b=Buffer.from(hash,'hex');return a.length===b.length&&timingSafeEqual(a,b);}
export function validPassword(p:unknown):p is string{return typeof p==='string'&&p.length>=12&&p.length<=128;}
