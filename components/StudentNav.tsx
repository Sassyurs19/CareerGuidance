'use client';
import {useEffect,useRef,useState} from 'react';
import {UserRound,LogOut,Settings,ChevronDown} from 'lucide-react';
import Brand from './Brand';
export type PortalView='introduction'|'roadmap'|'resources'|'exams'|'plan'|'report'|'profile'|'settings';
export default function StudentNav({view,onGo,onLogout,busy,locked,onboarding}:{view:PortalView;onGo:(view:PortalView)=>void;onLogout:()=>void;busy:boolean;locked:boolean;onboarding:boolean}){
 const home:PortalView=onboarding?'introduction':locked?'plan':'roadmap';
 const items:{id:PortalView;label:string}[]=onboarding?[{id:'introduction',label:'About you'}]:[{id:locked?'plan':'roadmap',label:locked?'My plan':'Choose your route'},{id:'resources',label:'Resources'},{id:'exams',label:'Exams'}];
 const [expanded,setExpanded]=useState(false),container=useRef<HTMLDivElement>(null),trigger=useRef<HTMLButtonElement>(null);
 useEffect(()=>{
  if(!expanded)return;
  const close=(event:PointerEvent)=>{if(!container.current?.contains(event.target as Node))setExpanded(false);};
  document.addEventListener('pointerdown',close);
  container.current?.querySelector<HTMLButtonElement>('[role="menuitem"]')?.focus();
  return()=>document.removeEventListener('pointerdown',close);
 },[expanded]);
 function menuKeys(event:React.KeyboardEvent){
  const buttons=Array.from(container.current?.querySelectorAll<HTMLButtonElement>('[role="menuitem"]:not(:disabled)')||[]);
  const i=buttons.indexOf(document.activeElement as HTMLButtonElement);
  if(event.key==='Escape'){setExpanded(false);trigger.current?.focus();event.preventDefault();}
  if(event.key==='ArrowDown'||event.key==='ArrowUp'){event.preventDefault();buttons[(i+(event.key==='ArrowDown'?1:-1)+buttons.length)%buttons.length]?.focus();}
 }
 function go(next:PortalView){setExpanded(false);onGo(next);}
 return <header className="student-header"><div className="student-header-inner">
  <button className="brand" onClick={()=>go(home)} aria-label="Career Guidance home"><Brand/></button>
  <nav className="portal-nav" style={{gridTemplateColumns:`repeat(${items.length+1},minmax(0,1fr))`}} aria-label="Student navigation">{items.map(item=><button key={item.id} onClick={()=>go(item.id)} aria-current={view===item.id||view==='report'&&item.id==='plan'?'page':undefined}>{item.label}</button>)}<a className="portal-about-link" href="/about">About</a></nav>
  <div className="portal-utilities"><div className="home-menu" ref={container} onBlur={event=>{if(!event.currentTarget.contains(event.relatedTarget))setExpanded(false);}} onKeyDown={menuKeys}>
   <button className={'home-trigger '+(['profile','settings'].includes(view)?'active':'')} ref={trigger} onClick={()=>setExpanded(!expanded)} aria-label="Profile menu" aria-haspopup="menu" aria-controls="student-profile-menu" aria-expanded={expanded}><UserRound size={18}/><ChevronDown size={12}/></button>
   {expanded&&<div id="student-profile-menu" className="home-dropdown" role="menu" aria-label="Profile menu">
    <button role="menuitem" aria-current={view==='profile'?'page':undefined} onClick={()=>go('profile')}><UserRound size={16}/>Profile</button>
    <button role="menuitem" aria-current={view==='settings'?'page':undefined} onClick={()=>go('settings')}><Settings size={16}/>Settings</button>
    <button role="menuitem" onClick={()=>{setExpanded(false);onLogout();}} disabled={busy}><LogOut size={16}/>Log out</button>
   </div>}
  </div></div>
 </div></header>;
}
