'use client';
import {useEffect,useRef,useState} from 'react';
import {branches,careerSteps,nodes,canFinishAt,type Plan} from '../lib/catalog';
import {applicationDocuments,guideExams,guideResources,stageGuide} from '../lib/guide';
import {shortName,stageLabel} from '../lib/presentation';
import {getPlanStages,getStudentStage} from '../lib/progress';
import {studentStandardLabel} from '../lib/student-profile';
import PrintAnimation from './PrintAnimation';
export default function PlanReport({plan,preview=false}:{plan:Plan;preview?:boolean}){
 const [activeSection,setActiveSection]=useState(0),[printingIntro,setPrintingIntro]=useState(false);
 const sectionsRef=useRef<HTMLElement>(null);
 function finishIntro(){setPrintingIntro(false);sectionsRef.current?.querySelector<HTMLButtonElement>('button')?.focus({preventScroll:true});}
 useEffect(()=>{if(!preview){setPrintingIntro(false);return;}setActiveSection(0);setPrintingIntro(!window.matchMedia('(prefers-reduced-motion: reduce)').matches);},[preview]);
 const end=nodes[plan.path.at(-1)!],complete=canFinishAt(plan.path.at(-1)!);
 const stages=getPlanStages(plan),focusStage=getStudentStage(plan);
 const branch=branches.find(b=>plan.path.some(id=>nodes[id].branch===b.id));
 const entrances=guideExams(plan),resources=guideResources(plan),skills=end.skills||branch?.skills||[];
 const source=(url:string)=>{const i=resources.findIndex(r=>r.url===url);return i>=0?<a className="source-ref" href={url}>[{i+1}]</a>:null;};
 return <article className={'print-report'+(preview?' is-preview':'')+(printingIntro?' print-intro-active':'')} aria-label="Career plan document">
  {preview&&printingIntro&&<PrintAnimation plan={plan} onDone={finishIntro}/>}
  {preview&&<nav ref={sectionsRef} className="report-section-nav" aria-label="Report sections">{['Route','Requirements','Applications','Resources'].map((label,i)=><button key={label} aria-pressed={activeSection===i} onClick={()=>setActiveSection(i)}><span>{String(i+1).padStart(2,'0')}</span>{label}</button>)}</nav>}
  <section className="document-section" hidden={preview&&activeSection!==0}>
   <header className="document-header"><strong>Career Guidance</strong><span>01 / Selected route</span></header>
   <div className="document-title"><small>{complete?'CAREER PLAN':'DRAFT PLAN'}</small><h1>{complete?end.title:'Route in progress'}</h1><p>{plan.region}{branch?' · '+branch.name:''}{plan.student&&<><br/>Current studies: {studentStandardLabel(plan.student)}</>}</p></div>
   {!complete&&<p className="document-note">Your route ends at {end.title}. Choose the remaining stages in the tree to complete this guide.</p>}
   <div className="route-summary"><div><h2>Selected pathway</h2><ol className="document-route">{plan.path.map((id,i)=><li key={id}><span className="route-number">{String(i+1).padStart(2,'0')}</span><div><small>{stageLabel(id)}</small><strong>{shortName(id)}</strong>{plan.student&&i===focusStage.index&&<span className="report-current-stage">{focusStage.aligned?'Current stage':'Planning focus'}</span>}{nodes[id].duration&&!['mpc','bipc'].includes(id)&&<span>{nodes[id].duration}</span>}</div></li>)}</ol></div><div className="goal-preparation"><h2>{complete?'Preparation for your next step':'Next steps'}</h2><ol className="action-list">{careerSteps(plan).map(step=><li key={step}>{step}</li>)}</ol>{skills.length>0&&<><h3>Core skills</h3><p>{skills.join(' · ')}</p></>}{branch&&<><h3>Practice project</h3><p>{branch.project}</p><h3>Further study</h3><p>{branch.study}</p></>}</div></div>
   <p className="document-note">Subject groups are part of Intermediate; engineering branches are part of the degree. They are not additional courses or years.</p>
  </section>
  <section className="document-section" hidden={preview&&activeSection!==1}>
   <header className="document-header"><strong>Career Guidance</strong><span>02 / Study requirements</span></header><h2>Requirements at each stage</h2>
   <table className="requirements-table"><colgroup><col className="stage-column"/><col/><col/></colgroup><thead><tr><th>Stage</th><th>Entry requirements</th><th>Preparation</th></tr></thead><tbody>{plan.path.map((id,i)=>{const guide=stageGuide(id,i,plan);return <tr key={id}><th scope="row"><small>{String(i+1).padStart(2,'0')}</small><strong>{shortName(id)}</strong>{nodes[id].resource&&source(nodes[id].resource!)}<span>{nodes[id].duration||stageLabel(id)}</span></th><td data-label="Entry requirements"><ul>{guide.requirements.map(t=><li key={t}>{t}</li>)}</ul></td><td data-label="Preparation"><ul>{guide.preparation.map(t=><li key={t}>{t}</li>)}</ul></td></tr>;})}</tbody></table>
   <p className="document-note">The table follows your selected route. Check the exact course’s current admission notice for marks, subjects, age, accepted qualifications and branch mapping.</p>
  </section>
  <section className="document-section" hidden={preview&&activeSection!==2}>
   <header className="document-header"><strong>Career Guidance</strong><span>03 / Applications</span></header><h2>Relevant entrance routes</h2><p className="section-intro">Choose the route used by your target institution. These exams are not all compulsory.</p>
   {entrances.length?<table className="admission-table"><thead><tr><th>Exam / stage</th><th>When it applies</th><th>Eligibility to check</th></tr></thead><tbody>{entrances.map(e=><tr key={e.id}><th scope="row"><strong>{e.name}</strong><small>{e.level}</small><div>{e.links.map(link=><span key={link.url}>{source(link.url)} </span>)}</div></th><td data-label="When it applies">{e.reason}</td><td data-label="Eligibility to check">{e.eligibility}</td></tr>)}</tbody></table>:<p>Check the institution’s prospectus for its merit, test, interview or portfolio process. No common exam from this catalogue is assigned to the selected route.</p>}
   <h3>Application sequence</h3><ol className="application-flow">{['Read the current notice','Confirm eligibility','Register and upload documents','Pay and save confirmation','Follow results and counselling'].map((label,i)=><li key={label}><b>{i+1}</b><span>{label}</span></li>)}</ol>
   <h3>Documents to prepare</h3><ul className="document-checklist">{applicationDocuments(plan).map(t=><li key={t}><span className="empty-check"/>{t}</li>)}</ul>
   <div className="category-note"><h3>Category and region</h3><p>Check the applicable General, EWS, OBC-NCL / state BC, SC, ST or PwD conditions in the current notice. Certificate formats, validity, fees and relaxations depend on the admission process. Central and state rules may differ. Exam eligibility and admission eligibility are separate.</p></div>
  </section>
  <section className="document-section" hidden={preview&&activeSection!==3}>
   <header className="document-header"><strong>Career Guidance</strong><span>04 / Resources & checklist</span></header><h2>Official resources</h2><p className="section-intro">Numbers match the references in the tables. Some notices are for 2026; use the notice for your application year.</p>
   <ol className="resource-directory">{resources.map((r,i)=><li key={r.url}><span className="resource-number">[{i+1}]</span><div><strong>{r.label}</strong><a href={r.url}>{r.url}</a></div></li>)}</ol>
   <h3>Tasks for your complete route</h3><p className="section-intro">Your checklist records tasks you mark complete. It does not confirm that a qualification has been awarded.</p>{stages.map(stage=><section className="report-stage-checklist" key={stage.id}><h4>{String(stage.index+1).padStart(2,'0')} · {stage.title}{stage.index===focusStage.index?' — current focus':''}</h4><ul className="document-checklist">{stage.tasks.map(task=><li key={task.id}><span className={'empty-check '+(plan.tasks.includes(task.id)?'checked':'')}>{plan.tasks.includes(task.id)?'✓':''}</span><span><strong>{task.title}</strong>{['skills','project','application','requirements','prepare-0'].includes(task.id.split(':').at(-1)!)&&<small>{task.detail}</small>}</span></li>)}</ul></section>)}
   <p className="document-note">Compare tuition, equipment, travel or hostel costs, and scholarship conditions before applying. Confirm the qualification and professional registration required for your intended role.</p>
   <footer className="document-footer">This report contains your current selected route, including unsaved changes. Requirements are introductory; official admission and professional rules apply. Admission and employment are not guaranteed.</footer>
  </section>
 </article>;
}
