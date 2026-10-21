'use client';
import {useEffect,useRef} from 'react';
import {X} from 'lucide-react';
import Brand from './Brand';
import {shortName} from '../lib/presentation';
import type {Plan} from '../lib/catalog';
import '../app/print-animation.css';
export default function PrintAnimation({plan,onDone}:{plan:Plan;onDone:()=>void}){
 const dialog=useRef<HTMLDialogElement>(null),done=useRef(onDone),finished=useRef(false);
 useEffect(()=>{done.current=onDone;},[onDone]);
 function finish(){if(finished.current)return;finished.current=true;dialog.current?.close();done.current();}
 useEffect(()=>{
  const element=dialog.current;if(!element)return;
  finished.current=false;
  const oldOverflow=document.body.style.overflow;
  document.body.style.overflow='hidden';
  element.showModal();
  const timer=window.setTimeout(finish,4000);
  const preference=window.matchMedia('(prefers-reduced-motion: reduce)');
  const reduce=()=>{if(preference.matches)finish();};
  preference.addEventListener('change',reduce);
  window.addEventListener('beforeprint',finish);
  if(preference.matches)finish();
  return()=>{window.clearTimeout(timer);preference.removeEventListener('change',reduce);window.removeEventListener('beforeprint',finish);element.close();document.body.style.overflow=oldOverflow;};
 },[]);
 return <dialog ref={dialog} className="print-scene" aria-labelledby="print-scene-title" aria-describedby="print-scene-description" onCancel={event=>{event.preventDefault();finish();}}>
  <header className="print-scene-top"><Brand/><button className="print-scene-skip" onClick={finish} autoFocus>Skip animation<X size={17}/></button></header>
  <div className="print-scene-content">
   <div className="print-machine" aria-hidden="true"><div className="print-machine-paper"><span>CAREER GUIDANCE</span><strong>My career plan</strong><div className="print-machine-route">{plan.path.map((id,index)=><div key={id} style={{animationDelay:`${.35+index*.27}s`}}><i/>{shortName(id)}</div>)}</div><span className="print-paper-rule"/></div><div className="print-machine-slot"/><div className="print-machine-body"><span className="print-machine-light"/><span className="print-machine-label">CAREER GUIDANCE</span><div className="print-machine-keys">{Array.from({length:12},(_,index)=><i key={index} style={{animationDelay:`${index*.08}s`}}/>)}</div><span className="print-machine-space"/></div><span className="print-machine-carriage"/></div>
   <div className="print-scene-caption"><span>YOUR JOURNEY, ON PAPER</span><h1 id="print-scene-title">Your career guide.</h1><p id="print-scene-description">Opening your route, tasks and resources for printing.</p></div>
   <div className="print-scene-progress" aria-hidden="true"><i/></div>
  </div>
 </dialog>;
}
