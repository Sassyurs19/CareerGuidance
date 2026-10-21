import { redirect } from 'next/navigation';
import { currentStudent } from '../../lib/student-page';
import StudentPortal from '../../components/StudentPortal';
export const dynamic='force-dynamic';
export default async function StudentPage(){const user=await currentStudent();if(!user)redirect('/login');return <StudentPortal initialUser={user}/>;}
