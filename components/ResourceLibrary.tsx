'use client';
import {useEffect,useRef,useState} from 'react';
import {ArrowLeft,ChevronRight,Folder,Search} from 'lucide-react';
import {branches,nodes} from '../lib/catalog';
import {resourceGuides} from '../lib/resource-guides';
import ResourceGuidePanel from './ResourceGuidePanel';
import {shortName} from '../lib/presentation';
const groups=[
 {id:'school',name:'School & subjects',description:'Intermediate and subject combinations',ids:['inter','mpc','bipc','commerce','humanities']},
 {id:'skills',name:'Diploma & skills',description:'Polytechnic, ITI and practical training',ids:['diploma','iti','vocational','apprentice','technical']},
 {id:'btech',name:'B.Tech',description:'Engineering branches and admissions',ids:['btech','lateral',...branches.map(b=>'branch-'+b.id)]},
 {id:'science',name:'Science & health',description:'Science, medicine and allied health',ids:['science','medicine','lifescience','allied','healthcareer']},
 {id:'business',name:'Business & humanities',description:'Commerce, management and arts',ids:['business','arts','businesscareer']},
 {id:'design',name:'Law & design',description:'Legal and creative study routes',ids:['law','design','lawcareer','designcareer']},
 {id:'further',name:'Further study & work',description:'Postgraduate study, research and careers',ids:['post-work','post-mtech','post-ms','post-mba','higher','research','graduate','publicservice']},
];
function folderName(id:string){return id==='btech'?'B.Tech admissions':id==='lateral'?'Lateral-entry admissions':shortName(id);}
export default function ResourceLibrary({onExplore,selectedPath=[],locked=false}:{onExplore:()=>void;selectedPath?:string[];locked?:boolean}){
 const [area,setArea]=useState<string|null>(null),[course,setCourse]=useState<string|null>(null),[query,setQuery]=useState('');
 const heading=useRef<HTMLHeadingElement>(null),moved=useRef(false);
 const group=groups.find(item=>item.id===area),node=course?nodes[course]:null,branch=branches.find(item=>course==='branch-'+item.id);
 const search=query.trim().toLowerCase();
 const results=(group?[group]:groups).flatMap(g=>g.ids.map(id=>({id,area:g.id,group:g.name}))).filter(({id})=>{
  const b=branches.find(item=>id==='branch-'+item.id);
  return [nodes[id].title,nodes[id].subtitle,nodes[id].description,...(nodes[id].skills||[]),...(resourceGuides[id]?.subjects.flatMap(group=>group.items)||[]),...(resourceGuides[id]?.skills.flatMap(skill=>[skill.name,skill.practice])||[]),b?.short||''].join(' ').toLowerCase().includes(search);
 });
 useEffect(()=>{if(moved.current){heading.current?.focus({preventScroll:true});moved.current=false;}},[area,course]);
 function open(nextArea:string|null,nextCourse:string|null=null){moved.current=true;setArea(nextArea);setCourse(nextCourse);setQuery('');}
 function courseFolder(id:string,areaId:string){
  const b=branches.find(item=>id==='branch-'+item.id);
  return <button className="study-folder" key={id} onClick={()=>open(areaId,id)}>
   <span className="folder-top"><Folder size={25}/><span>{b?b.short:'Guide'}</span><ChevronRight size={16}/></span>
   <strong>{folderName(id)}</strong><span className="folder-description">{b?b.subjects.slice(0,3).join(' · '):nodes[id].subtitle}</span>
   <span className="folder-bottom">{new Set(resourceGuides[id].subjects.flatMap(group=>group.items)).size} topics · {resourceGuides[id].skills.length} skills</span>
  </button>;
 }
 return <section className="resource-library folder-library">
  <div className="page-heading"><div><h1>Study resources</h1><p>Find subjects, skills and reliable learning sources for your next step.</p></div></div>
  {locked&&!area&&!query&&<div className="plan-resource-shortcuts"><span>FOR YOUR PLAN</span><div>{groups.flatMap(g=>g.ids.filter(id=>(selectedPath.includes(id)||(id.startsWith('post-')&&selectedPath.some(step=>step.endsWith('-'+id.slice(5)))))).map(id=><button key={id} onClick={()=>open(g.id,id)}><Folder size={14}/>{folderName(id)}<ChevronRight size={13}/></button>))}</div></div>}
  <div className="folder-browser">
   <div className="folder-browser-toolbar"><nav className="folder-breadcrumbs" aria-label="Resource folders">
    <button onClick={()=>open(null)} aria-current={!group?'page':undefined}><Folder size={15}/>All resources</button>
    {group&&<><ChevronRight size={13}/><button onClick={()=>open(group.id)} aria-current={!course?'page':undefined}>{group.name}</button></>}
    {course&&<><ChevronRight size={13}/><span aria-current="page">{folderName(course)}</span></>}
   </nav><label className="search folder-search"><Search size={16}/><input aria-label={group?'Search '+group.name+' folders':'Search all resource folders'} placeholder={group?'Search in '+group.name:'Search subjects, skills or branches'} value={query} onChange={event=>{setQuery(event.target.value);setCourse(null);}}/>{query&&<button aria-label="Clear search" onClick={()=>setQuery('')}>Clear</button>}</label></div>
   <div className="folder-content">
    <div className="folder-heading">{group&&<button className="folder-back" aria-label={course?'Back to '+group.name:'Back to all resources'} onClick={()=>open(course?group.id:null)}><ArrowLeft size={17}/></button>}<div><h2 ref={heading} tabIndex={-1}>{search?'Search results':course?folderName(course):group?group.name:'Study areas'}</h2><p>{search?`${results.length} matching folders`:course?(branch?branch.tag:node?.subtitle):group?group.description:'Browse by subject and qualification.'}</p></div>{!course&&!search&&<span className="folder-total">{group?group.ids.length:groups.length} folders</span>}</div>
    {search?<><div className="study-folder-grid">{results.map(result=><div className="folder-search-result" key={result.id}><span>{result.group}</span>{courseFolder(result.id,result.area)}</div>)}</div>{!results.length&&<p className="empty-state">No matching folders. Try a course name, branch or subject.</p>}</>:!group?<div className="study-folder-grid">{groups.map(item=><button className="study-folder area-folder" key={item.id} onClick={()=>open(item.id)}><span className="folder-top"><Folder size={27}/><ChevronRight size={16}/></span><strong>{item.name}</strong><span className="folder-description">{item.description}</span><span className="folder-bottom">{item.id==='btech'?`${branches.length} branches · Admissions`:`${item.ids.length} folders`}</span></button>)}</div>:!course?<>
     {group.id==='btech'?<><h3 className="folder-section-label">Branches</h3><div className="study-folder-grid">{group.ids.filter(id=>id.startsWith('branch-')).map(id=>courseFolder(id,group.id))}</div><h3 className="folder-section-label admissions-label">Admissions</h3><div className="study-folder-grid">{group.ids.filter(id=>!id.startsWith('branch-')).map(id=>courseFolder(id,group.id))}</div></>:<div className="study-folder-grid">{group.ids.map(id=>courseFolder(id,group.id))}</div>}
    </>:course&&<ResourceGuidePanel key={course} course={course} onContinue={onExplore} locked={locked}/>}
   </div>
  </div>
  <p className="library-note">Subject lists are study overviews, not universal syllabuses. Check your board or university for the exact curriculum and current admission notice.</p>
 </section>;
}
