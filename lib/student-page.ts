import { headers } from 'next/headers';
import { identity } from './server';
export async function currentStudent(){
 const h=await headers();
 return identity(new Request('https://career-guidance.internal/',{headers:{cookie:h.get('cookie')||''}}));
}
