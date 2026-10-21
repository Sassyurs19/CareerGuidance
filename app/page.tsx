import {redirect} from 'next/navigation';
import {currentStudent} from '../lib/student-page';
import Welcome from '../components/WelcomePage';
export const dynamic='force-dynamic';
export default async function Page(){if(await currentStudent())redirect('/student');return <Welcome/>;}
