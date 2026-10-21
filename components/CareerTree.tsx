'use client';
import {useEffect,useRef,useState} from 'react';
import {BookOpen,Check,Flag,GraduationCap,RotateCcw,Save,ArrowUpRight,ChevronDown,ArrowRight} from 'lucide-react';
import {nodes,careerSteps,canFinishAt,type Plan} from '../lib/catalog';
import {shortName,choiceLabel,stageLabel} from '../lib/presentation';
import {choiceGuidance} from '../lib/choice-guidance';
import '../app/tree-mobile.css';
const CARD_WIDTH=152,CARD_HEIGHT=112,GAP=18,LEVEL_GAP=180,ROOT_TOP=35,ROOT_HEIGHT=62;
function buildMap(plan:Plan){
 const levels=plan.path.flatMap((parent,i)=>{
  const selected=plan.path[i+1],ids=[...nodes[parent].next];
  if(selected&&!ids.includes(selected))ids.push(selected);
  return ids.length?[{parent,depth:i+1,selected,ids}]:[];
 });
 const width=Math.max(810,...levels.map(level=>level.ids.length*CARD_WIDTH+(level.ids.length-1)*GAP+80));
 const rows=levels.map(level=>({...level,top:173+(level.depth-1)*LEVEL_GAP,items:level.ids.map((id,i)=>({
  id,depth:level.depth,x:(width-(level.ids.length*CARD_WIDTH+(level.ids.length-1)*GAP))/2+i*(CARD_WIDTH+GAP),
  y:173+(level.depth-1)*LEVEL_GAP,selected:id===level.selected,alternative:!!level.selected&&id!==level.selected,
 }))}));
 return {width,height:(rows.at(-1)?.top||ROOT_TOP)+CARD_HEIGHT+50,rows};
}
export default function CareerTree({plan,onChoose,onReset,onSave,onFinish,busy,dirty}:{plan:Plan;onChoose:(depth:number,id:string)=>void;onReset:()=>void;onSave:()=>void;onFinish:()=>void;busy:boolean;dirty:boolean}){
 const viewport=useRef<HTMLDivElement>(null),[availableWidth,setAvailableWidth]=useState(1000),[inspected,setInspected]=useState<string|null>(null);
 const [mobileReviewDepth,setMobileReviewDepth]=useState<number|null>(null),mobileHeading=useRef<HTMLHeadingElement>(null),mobileFocusPending=useRef(false),mobileSummary=useRef<HTMLDetailsElement>(null);
 const signature=plan.path.join('|'),map=buildMap(plan),lastId=plan.path.at(-1)!,complete=nodes[lastId].next.length===0,canSave=canFinishAt(lastId),atBranch=lastId.startsWith('branch-');
 const reviewDepth=mobileReviewDepth!==null&&mobileReviewDepth>0&&mobileReviewDepth<plan.path.length?mobileReviewDepth:null;
 const mobileDepth=reviewDepth??plan.path.length,mobileParent=plan.path[mobileDepth-1],mobileOptions=[...nodes[mobileParent].next];
 const previousChoice=plan.path[mobileDepth];
 if(previousChoice&&!mobileOptions.includes(previousChoice))mobileOptions.push(previousChoice);
 const scale=Math.max(availableWidth<600?.85:.72,Math.min(1,availableWidth/map.width));
 const detailId=inspected||lastId,detail=nodes[detailId],guidance=choiceGuidance(detailId);
 useEffect(()=>{const element=viewport.current;if(!element)return;const observer=new ResizeObserver(([entry])=>setAvailableWidth(entry.contentRect.width));observer.observe(element);return()=>observer.disconnect();},[]);
 useEffect(()=>{setInspected(null);setMobileReviewDepth(null);},[signature]);
 useEffect(()=>{
  const element=viewport.current;if(!element)return;
  const selected=map.rows.at(-1)?.items.find(item=>item.selected);
  const center=complete&&selected?selected.x+CARD_WIDTH/2:map.width/2;
  element.scrollLeft=Math.max(0,center*scale-availableWidth/2);
 },[signature,scale,availableWidth]);
 useEffect(()=>{
  if(!mobileFocusPending.current)return;
  mobileFocusPending.current=false;
  const frame=requestAnimationFrame(()=>{
   const heading=mobileHeading.current;if(!heading||heading.getClientRects().length===0)return;
   heading.focus({preventScroll:true});
   heading.scrollIntoView({block:'start',behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
  });
  return()=>cancelAnimationFrame(frame);
 },[signature,mobileReviewDepth]);
 function reviewMobileStage(depth:number){
  if(busy)return;
  mobileFocusPending.current=true;
  if(mobileSummary.current)mobileSummary.current.open=false;
  setMobileReviewDepth(depth);
 }
 function keepMobileRoute(){mobileFocusPending.current=true;setMobileReviewDepth(null);}
 function chooseMobileOption(id:string){
  if(busy)return;
  mobileFocusPending.current=true;
  setMobileReviewDepth(null);
  if(previousChoice!==id)onChoose(mobileDepth,id);
 }
 function resetMobileRoute(){mobileFocusPending.current=true;setMobileReviewDepth(null);onReset();}
 return <><section className="pathway-map restored-tree desktop-career-tree" aria-label="Career choice tree">
  <div className="map-controls"><div className="map-key"><span><i/>Selected path</span><span><i/>Other options</span></div><button className="text-control map-reset-path" onClick={onReset} disabled={busy||plan.path.length===1}><RotateCcw size={13}/>Reset path</button></div>
  {atBranch&&<div className="optional-route-notice"><div><strong>Your branch is enough to save a plan.</strong><p>Work, M.Tech, research and management are optional later choices. You do not need to decide now.</p></div><button className="button primary small" onClick={onFinish} disabled={busy}>Save with {shortName(lastId)}</button></div>}
  <div className="tree-with-summary"><div className="tree-main-column">
   <p className="map-scroll-hint">Swipe sideways to see every branch.</p>
   <div className="map-viewport" ref={viewport} tabIndex={0} role="region" aria-label="Career branches. Select an option to reveal the next stage.">
    <div className="map-size" style={{width:map.width*scale,height:map.height*scale}}><div className="map-world" style={{width:map.width,height:map.height,transform:`scale(${scale})`}}>
     <svg className="map-connections" width={map.width} height={map.height} aria-hidden="true">
      {map.rows.map((row,index)=>{
       const parent=index?map.rows[index-1].items.find(item=>item.selected):null;
       const x1=parent?parent.x+CARD_WIDTH/2:map.width/2,y1=parent?parent.y+CARD_HEIGHT:ROOT_TOP+ROOT_HEIGHT;
       return row.items.map(item=>{
        const x2=item.x+CARD_WIDTH/2,y2=item.y,bend=y1+(y2-y1)*.55;
        const d=`M ${x1} ${y1} C ${x1} ${bend}, ${x2} ${bend}, ${x2} ${y2}`;
        return <g key={`${row.depth}-${item.id}`}>
         {item.selected&&<path d={d} className="connection-halo"/>}
         <path d={d} className={'map-line '+(item.selected?'chosen':item.alternative?'quiet':'open')}/>
         <circle cx={x2} cy={y2} r={item.selected?4:3} className={item.selected?'chosen-port':'map-port'}/>
        </g>;
       });
      })}
     </svg>
     <div className="map-origin" style={{left:map.width/2-108,top:ROOT_TOP}}><span className="origin-symbol"><GraduationCap size={21}/></span><div><small>START HERE</small><strong>Class 10</strong></div><span className="origin-check"><Check size={12}/></span></div>
     {map.rows.map(row=><div key={row.depth} role="group" aria-label={choiceLabel(row.parent)}>
      <div className="map-level-caption" style={{left:30,top:row.top-42}}><span>{String(row.depth).padStart(2,'0')}</span>{choiceLabel(row.parent)}{!row.selected&&<b>{row.parent.startsWith('branch-')?'Optional':'Choose next'}</b>}</div>
      {row.items.map(item=>{
       const node=nodes[item.id],goal=node.next.length===0;
       return <button key={item.id} className={'map-node '+(item.selected?'is-selected ':item.alternative?'is-alternative ':'')+(goal?'goal-node':'')} style={{left:item.x,top:item.y,width:CARD_WIDTH,height:CARD_HEIGHT}} disabled={busy} aria-pressed={item.selected} aria-label={node.title+(item.selected?', selected':'')} title={node.description} onClick={()=>onChoose(item.depth,item.id)} onMouseEnter={()=>setInspected(item.id)} onMouseLeave={()=>setInspected(null)} onFocus={()=>setInspected(item.id)} onBlur={()=>setInspected(null)}>
        <span className="node-topline">{goal?<Flag size={14}/>:<BookOpen size={14}/>}<span>{item.selected?<><Check size={11}/>Selected</>:goal?'Choice':''}</span></span><strong>{shortName(item.id)}</strong><span className="node-caption">{node.duration||node.subtitle}</span><i className="node-exit"/>
       </button>;
      })}
     </div>)}
     {complete&&<div className="map-finish" style={{left:map.width/2-85,top:map.height-25}}><Flag size={12}/>Final choice selected</div>}
    </div></div>
   </div>
  </div><aside className="selected-path-panel" aria-label="Your selected path"><div className="selected-path-heading"><span>YOUR ROUTE</span><h2>Selected path</h2></div><ol>{plan.path.map((id,i)=><li key={id}><div className={'selected-path-node '+(i===plan.path.length-1&&complete?'path-goal':'')}><span>{String(i+1).padStart(2,'0')}</span><div><small>{stageLabel(id)}</small><strong>{shortName(id)}</strong></div></div>{i<plan.path.length-1&&<span className="route-link" aria-hidden="true"/>}</li>)}</ol>{!complete&&<p className="selected-path-next">Your next choice appears here.</p>}</aside></div>
  <div className={'map-detail '+(complete&&!inspected?'destination-detail':'')}><span className="map-detail-icon">{detail.next.length?<BookOpen size={21}/>:<Flag size={21}/>}</span><div className="map-detail-copy"><span>{inspected?'EXPLORE THIS OPTION':complete?'YOUR FINAL CHOICE':'CURRENT STAGE'}</span><h2>{detail.title}</h2><p>{detail.description}</p>{detailId!=='tenth'&&<div className="map-choice-guidance"><p><b>Why choose this?</b> {guidance.why}</p><ul>{guidance.benefits.map(benefit=><li key={benefit}>{benefit}</li>)}</ul></div>}{complete&&!inspected&&<details className="next-steps"><summary>How to get there</summary><ol>{careerSteps(plan).map(step=><li key={step}>{step}</li>)}</ol></details>}</div>{detail.resource&&<a className="map-source" href={detail.resource} target="_blank" rel="noreferrer">Official resource <ArrowUpRight size={13}/></a>}</div>
  {complete&&<p className="route-lock-note">Click “Save my plan” to save this route and open your requirements, preparation tasks, resources and complete printable guide. You can update your study details or use Reset career plan to start again.</p>}
  <div className="map-footer"><span className="save-label"><i className={dirty?'pending':''}/>{dirty?'Unsaved changes':'No unsaved changes'}</span><div><button className="button secondary small" onClick={onSave} disabled={busy}><Save size={14}/>{busy?'Saving…':'Save draft'}</button><button className="button primary small" onClick={onFinish} disabled={busy||!canSave}><Check size={14}/>{atBranch?'Save with this branch':'Save my plan'}</button></div></div>
 </section>
 <section className="mobile-career-tree" aria-label="Choose your career route">
  <div className="mobile-tree-route">
   <div className="mobile-tree-route-heading"><span>Your selected path</span><button type="button" onClick={resetMobileRoute} disabled={busy||plan.path.length===1}><RotateCcw size={14}/>Reset</button></div>
   <ol className="mobile-tree-trail" aria-label="Selected stages">{plan.path.map((id,index)=><li key={`${index}-${id}`}><span aria-hidden="true">{index+1}</span>{shortName(id)}</li>)}</ol>
   {plan.path.length>1&&<details className="mobile-tree-review" ref={mobileSummary}>
    <summary>Review earlier choices<ChevronDown size={16}/></summary>
    <ol>{plan.path.slice(1).map((id,index)=><li key={`${index}-${id}`}><div><small>{stageLabel(id)}</small><strong>{shortName(id)}</strong></div><button type="button" onClick={()=>reviewMobileStage(index+1)} disabled={busy} aria-label={`Change ${shortName(id)}`}>Change</button></li>)}</ol>
   </details>}
  </div>

  {atBranch&&reviewDepth===null&&<div className="optional-route-notice"><strong>You can save your plan here.</strong><p>The options below are optional. Decide after exploring your branch.</p><button className="button primary" onClick={onFinish} disabled={busy}>Save with this branch</button></div>}
  <div className="mobile-tree-decision">
   {reviewDepth!==null&&<div className="mobile-tree-review-note"><p>Reviewing an earlier choice</p><button type="button" onClick={keepMobileRoute} disabled={busy}>Keep my current route</button></div>}
   {complete&&reviewDepth===null?<div className="mobile-tree-destination">
    <span className="mobile-tree-step-label"><Flag size={15}/>Your final choice</span>
    <h2 ref={mobileHeading} tabIndex={-1}>{nodes[lastId].title}</h2>
    <p>{nodes[lastId].description}</p>
    <div className="mobile-tree-achieve"><h3>How to get there</h3><ol>{careerSteps(plan).map((step,index)=><li key={`${index}-${step}`}><span aria-hidden="true">{index+1}</span><p>{step}</p></li>)}</ol></div>
    {nodes[lastId].resource&&<a className="mobile-tree-resource" href={nodes[lastId].resource} target="_blank" rel="noreferrer">Official resource<ArrowUpRight size={15}/></a>}
   </div>:<>
    <div className="mobile-tree-stage-heading">
     <span className="mobile-tree-step-label">{reviewDepth!==null?'Review your choice':'Choose your next step'}<span>{String(mobileDepth).padStart(2,'0')}</span></span>
     <h2 ref={mobileHeading} tabIndex={-1}>{choiceLabel(mobileParent)==='Study route'?'What would you like to study?':choiceLabel(mobileParent)==='Subjects'?'Choose your subjects':choiceLabel(mobileParent)==='Branch'?'Choose your branch':choiceLabel(mobileParent)==='Next step'?'Choose your next step':choiceLabel(mobileParent)==='Career'?'Choose your career direction':'Where would you like to go next?'}</h2>
     <p>{mobileParent.startsWith('branch-')?'Optional choices after ':'After '}<strong>{shortName(mobileParent)}</strong></p>
    </div>
    <div className="mobile-tree-options" role="group" aria-label={choiceLabel(mobileParent)}>{mobileOptions.map(id=>{
     const option=nodes[id],optionGuidance=choiceGuidance(id),selected=previousChoice===id;
     return <button type="button" key={id} className={'mobile-tree-option'+(selected?' is-selected':'')} onClick={()=>chooseMobileOption(id)} disabled={busy} aria-pressed={selected}>
      <span className="mobile-tree-option-top"><span>{option.duration||option.subtitle}</span>{selected?<Check size={17}/>:option.next.length===0?<Flag size={17}/>:<BookOpen size={17}/>}</span>
      <strong className="mobile-tree-option-name">{shortName(id)}</strong>
      <span className="mobile-tree-option-why"><b>Why choose this?</b>{optionGuidance.why}</span>
      <span className="mobile-tree-option-benefits"><b>What you gain</b>{optionGuidance.benefits.slice(0,2).map(benefit=><span key={benefit}><Check size={14}/>{benefit}</span>)}</span>
      <span className="mobile-tree-select">{selected?'Keep this choice':'Choose this option'}<ArrowRight size={17}/></span>
     </button>;
    })}</div>
   </>}
  </div>

  <div className="mobile-tree-footer">
   {complete&&reviewDepth===null&&<p className="mobile-tree-lock-note">Click “Save my plan” to save this route and open your requirements, preparation tasks, resources and complete printable guide. You can update your study details or use Reset career plan to start again.</p>}
   <span className="mobile-tree-save-state"><i className={dirty?'pending':''}/>{dirty?'Unsaved changes':'No unsaved changes'}</span>
   <div className="mobile-tree-actions">
    <button type="button" className="button secondary" onClick={onSave} disabled={busy}><Save size={16}/>{busy?'Saving…':'Save draft'}</button>
    {canSave&&reviewDepth===null&&<button type="button" className="button primary" onClick={onFinish} disabled={busy}><Check size={16}/>{atBranch?'Save with this branch':'Save my plan'}</button>}
   </div>
  </div>
 </section></>;
}
