import {redirect} from 'next/navigation';
import {currentStudent} from '../../lib/student-page';
import About from '../../components/AboutPage';
export const dynamic='force-dynamic';
export default async function Page(){if(!await currentStudent())redirect('/login');return <About/>;}
