'use client';

import {useId,useRef,useState,type KeyboardEvent} from 'react';
import {ArrowDown,ArrowUpRight,BookOpen,Check,ChevronRight,Flag,Printer,RotateCcw,Save} from 'lucide-react';
import {careerSteps,nodes,type Plan} from '../lib/catalog';
import {shortName,stageLabel} from '../lib/presentation';
import {getPlanStages,getStudentStage} from '../lib/progress';
import {studentStandardLabel} from '../lib/student-profile';
import '../app/plan-dashboard.css';

type Props={
 plan:Plan;
 dirty:boolean;
 savedAt:number|null;
 busy:boolean;
 whatsappReady:boolean;
 onSave:()=>void;
 onPrint:()=>void;
 onResources:()=>void;
 onTask:(id:string,checked:boolean)=>void;
 onConnect:()=>void;
 onOverviewSeen:()=>void;
 onProfile:()=>void;
 onReset:()=>void;
};

type PlanTab='tasks'|'route'|'requirements';
const tabs:{id:PlanTab;label:string}[]=[{id:'tasks',label:'Tasks'},{id:'route',label:'My route'},{id:'requirements',label:'Requirements'}];

export default function MyPlan({plan,dirty,savedAt,busy,whatsappReady,onSave,onPrint,onResources,onTask,onConnect,onOverviewSeen,onProfile,onReset}:Props){
 const stages=getPlanStages(plan),position=getStudentStage(plan);
 const currentStage=stages[position.index]||stages[0];
 const destination=nodes[plan.path.at(-1)!];
 const [tab,setTab]=useState<PlanTab>(plan.overviewSeen?'tasks':'route');
 const [requirementStage,setRequirementStage]=useState(currentStage.id);
 const selectedStage=stages.find(stage=>stage.id===requirementStage)||currentStage;
 const currentTasks=currentStage.tasks;
 const completed=currentTasks.filter(task=>plan.tasks.includes(task.id)).length;
 const hasNextTask=currentTasks.some(task=>!plan.tasks.includes(task.id));
 const howTo=careerSteps(plan).filter(step=>!step.startsWith('Continue down the tree'));
 const currentStudy=plan.student?studentStandardLabel(plan.student):'Add your current studies';
 const checklist=useRef<HTMLDivElement>(null);
 const tabPrefix=useId();
 function openTab(next:PlanTab){
  if(busy)return;
  setTab(next);
  if(next==='tasks'&&!plan.overviewSeen)onOverviewSeen();
 }
 function navigateTabs(event:KeyboardEvent<HTMLButtonElement>,index:number){
  const next=event.key==='ArrowRight'?(index+1)%tabs.length:event.key==='ArrowLeft'?(index+tabs.length-1)%tabs.length:event.key==='Home'?0:event.key==='End'?tabs.length-1:-1;
  if(next<0)return;
  event.preventDefault();
  openTab(tabs[next].id);
  event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[next]?.focus();
 }
 function continueTask(){
  const firstUnchecked=checklist.current?.querySelector<HTMLInputElement>('input:not(:checked)');
  if(!firstUnchecked)return;
  const row=firstUnchecked.closest('.dashboard-task');
  const details=row?.querySelector('details');
  if(details)details.open=true;
  const behavior=window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth';
  row?.scrollIntoView({block:'center',behavior});
  firstUnchecked.focus({preventScroll:true});
 }
 return <section className="my-plan-page personal-plan-dashboard">
  <header className="dashboard-header">
   <p className="dashboard-page-label">My plan</p>
   <h1>{destination.title}</h1>
   <div className="dashboard-current-study"><p><span>Currently studying</span><strong>{currentStudy}</strong></p><button className="text-control" onClick={onProfile}>Update details<ArrowUpRight size={15}/></button></div>
  </header>
  <div className="dashboard-actions"><button className="button primary" onClick={onPrint}><Printer size={17}/>Print guide</button><button className="button secondary" onClick={onSave} disabled={busy||!dirty}><Save size={17}/>{busy?'Saving…':'Save progress'}</button><span className={dirty?'dashboard-save-status is-pending':'dashboard-save-status'} role="status">{dirty?'Unsaved progress':savedAt?'Saved '+new Date(savedAt).toLocaleDateString('en-IN'):'Plan ready'}</span></div>

  {position.note&&<p className="dashboard-study-note">{position.note}</p>}
  {!plan.overviewSeen&&tab==='route'&&<p className="dashboard-first-note">Your route is ready. View the requirements for each stage, then open Tasks to begin.</p>}

  <div className="dashboard-content">
   <div className="dashboard-tabs" role="tablist" aria-label="My plan sections">{tabs.map((item,index)=><button key={item.id} id={tabPrefix+'-tab-'+item.id} type="button" role="tab" aria-selected={tab===item.id} aria-controls={tabPrefix+'-panel-'+item.id} tabIndex={tab===item.id?0:-1} disabled={busy} onClick={()=>openTab(item.id)} onKeyDown={event=>navigateTabs(event,index)}>{item.label}</button>)}</div>

   <section className="dashboard-tab-panel" role="tabpanel" id={tabPrefix+'-panel-tasks'} aria-labelledby={tabPrefix+'-tab-tasks'} hidden={tab!=='tasks'} tabIndex={0}>
    <header className="dashboard-task-heading"><div><p>{position.aligned?'Current stage':'Start with these requirements'}</p><h2>{currentStage.title}</h2></div><span className="dashboard-task-count"><strong>{completed}/{currentTasks.length}</strong><span>tasks done</span></span></header>
    <progress className="preparation-progress" value={completed} max={Math.max(1,currentTasks.length)} aria-label={completed+' of '+currentTasks.length+' tasks completed for '+currentStage.title}/>
    {hasNextTask?<button className="button secondary dashboard-continue" onClick={continueTask} disabled={busy}>Continue next task<ArrowDown size={16}/></button>:<p className="dashboard-stage-done"><Check size={18}/>All tasks for this stage are marked complete. Update your study details when you move to a new class or course.</p>}
    <div className="dashboard-checklist" ref={checklist}>{currentTasks.map(task=>{
     const done=plan.tasks.includes(task.id);
     return <div className={done?'dashboard-task is-done':'dashboard-task'} key={task.id}><label><input type="checkbox" checked={done} disabled={busy} onChange={event=>onTask(task.id,event.target.checked)}/><span>{task.title}</span></label><details><summary>Details<ChevronRight size={15}/></summary><p>{task.detail}</p></details></div>;
    })}</div>
    <p className="dashboard-footnote">Progress tracks these tasks, not completed qualifications.</p>
   </section>

   <section className="dashboard-tab-panel" role="tabpanel" id={tabPrefix+'-panel-route'} aria-labelledby={tabPrefix+'-tab-route'} hidden={tab!=='route'} tabIndex={0}>
    <header className="dashboard-panel-heading"><h2>Your selected route</h2><p>{plan.region}</p></header>
    <ol className="dashboard-route">{plan.path.map((id,index)=>{
     const isCurrent=position.aligned&&index===position.index;
     return <li key={id} className={isCurrent?'is-current':''} aria-current={isCurrent?'step':undefined}><span className="dashboard-route-marker" aria-hidden="true">{index===plan.path.length-1?<Flag size={15}/>:String(index+1).padStart(2,'0')}</span><div><small>{stageLabel(id)}</small><strong>{shortName(id)}</strong>{nodes[id].duration&&<span>{nodes[id].duration}</span>}{isCurrent&&<span className="dashboard-route-here">Current stage</span>}</div></li>;
    })}</ol>
    <details className="dashboard-how-to"><summary>How to achieve this<ChevronRight size={17}/></summary><p>{destination.description}</p><ol>{howTo.map(step=><li key={step}>{step}</li>)}</ol></details>
    {!plan.overviewSeen&&<button className="button primary dashboard-start" onClick={()=>openTab('tasks')} disabled={busy}>Start my tasks<ChevronRight size={16}/></button>}
   </section>

   <section className="dashboard-tab-panel" role="tabpanel" id={tabPrefix+'-panel-requirements'} aria-labelledby={tabPrefix+'-tab-requirements'} hidden={tab!=='requirements'} tabIndex={0}>
    <label className="dashboard-stage-select">Study stage<select value={selectedStage.id} onChange={event=>setRequirementStage(event.target.value)}>{stages.map(stage=><option key={stage.id} value={stage.id}>{stage.index+1}. {stage.title}{position.aligned&&stage.index===position.index?' — current stage':''}</option>)}</select></label>
    <div className="dashboard-requirements-content" key={selectedStage.id}><section><h2>Requirements</h2><ul>{selectedStage.requirements.map(item=><li key={item}>{item}</li>)}</ul></section><section><h2>How to prepare</h2><ul>{selectedStage.preparation.map(item=><li key={item}>{item}</li>)}</ul></section><p className="dashboard-stage-next">{selectedStage.next}</p></div>
   </section>
  </div>

  <div className="dashboard-shortcuts"><button className="text-control" onClick={onResources}><BookOpen size={17}/>Study resources<ArrowUpRight size={15}/></button>{whatsappReady&&<button className="text-control" onClick={onConnect} disabled={busy}>WhatsApp resources<ArrowUpRight size={15}/></button>}<button className="text-control dashboard-reset" onClick={onReset} disabled={busy}><RotateCcw size={15}/>Reset career plan</button></div>

 </section>;
}
