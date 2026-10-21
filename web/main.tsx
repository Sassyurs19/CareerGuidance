import {useEffect,useState} from 'react';
import {createRoot} from 'react-dom/client';
import Welcome from '../components/WelcomePage';
import About from '../components/AboutPage';
import AccountAccess from '../components/AccountAccess';
import StudentPortal from '../components/StudentPortal';
import Project from '../app/project/page';
import Privacy from '../app/privacy/page';
import Terms from '../app/terms/page';
import {apiRequest} from '../lib/client-api';
import '../app/globals.css';
import '../app/theme.css';
import '../app/introduction.css';
import '../app/journey.css';
import '../app/responsive.css';
import '../app/next-step.css';
import '../app/resource-guide.css';

type User={id:string;email:string};
function App(){
 const path=window.location.pathname.replace(/\/$/,'')||'/';
 const publicPage=path==='/privacy'?<Privacy/>:path==='/terms'?<Terms/>:path==='/project'?<Project/>:null;
 const [user,setUser]=useState<User|null>(null),[ready,setReady]=useState(false),[error,setError]=useState(false);
 useEffect(()=>{
  if(publicPage)return;
  let active=true;
  apiRequest('me').then(async response=>{if(!response.ok)throw new Error();const data=await response.json();if(!active)return;setUser(data.user);setReady(true);if(!data.user&&['/student','/about'].includes(path))window.location.replace('/login');else if(data.user&&['/','/login','/register'].includes(path))window.location.replace('/student');}).catch(()=>{if(active)setError(true);});
  return ()=>{active=false;};
 },[path]);
 if(publicPage)return publicPage;
 if(error)return <main className="access-card"><h1>Could not connect</h1><p>Please try again in a moment. Your saved plan has not changed.</p><button className="button primary" onClick={()=>window.location.reload()}>Try again</button></main>;
 if(!ready)return <main className="access-card" role="status"><p>Opening Career Guidance…</p></main>;
 if(path==='/student')return user?<StudentPortal initialUser={user}/>:null;
 if(path==='/about')return user?<About/>:null;
 if(path==='/login'||path==='/register')return user?null:<AccountAccess mode={path==='/login'?'login':'register'}/>;
 if(path==='/')return user?null:<Welcome/>;
 return <main className="access-card"><h1>Page not found</h1><a href="/">Go to home</a></main>;
}
createRoot(document.getElementById('root')!).render(<App/>);
