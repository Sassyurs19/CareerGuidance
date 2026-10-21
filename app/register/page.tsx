import { redirect } from 'next/navigation';
import { currentStudent } from '../../lib/student-page';
import AccountAccess from '../../components/AccountAccess';
export const dynamic='force-dynamic';
export default async function RegisterPage(){if(await currentStudent())redirect('/student');return <AccountAccess mode="register"/>;}
