import {branches,nodes,type Plan} from './catalog';
import {stageGuide} from './guide';
import {shortName} from './presentation';
import {interestOptions} from './student-profile';
export type PlanTask={id:string;title:string;detail:string;stageId:string};
export type PlanStage={id:string;title:string;index:number;requirements:string[];preparation:string[];tasks:PlanTask[];next:string};
export function getPlanStages(plan:Plan):PlanStage[]{
 return plan.path.map((id,index)=>{
  const node=nodes[id],guide=stageGuide(id,index,plan),nextId=plan.path[index+1];
  const branch=branches.find(item=>item.id===node.branch);
  const tasks:PlanTask[]=[{id:id+':requirements',stageId:id,title:'Check entry requirements',detail:guide.requirements.join(' ')}];
  if(branch&&id.startsWith('branch-'))tasks.push({id:id+':project',stageId:id,title:'Build one practical project',detail:branch.project});
  else if(guide.preparation.length)tasks.push({id:id+':prepare-0',stageId:id,title:node.next.length===0?'Prepare for your chosen direction':'Prepare for this study stage',detail:guide.preparation.join(' ')});
  if(node.next.length===0)tasks.push({id:id+':application',stageId:id,title:'Shortlist and apply',detail:/-(mtech|ms|mba)$/.test(id)?'Compare eligible programmes, fees and deadlines. Prepare the documents and apply through the institution’s official process.':'Shortlist relevant opportunities, check their requirements and submit a CV or work samples where requested.'});
  return {id,title:shortName(id),index,requirements:guide.requirements,preparation:guide.preparation,tasks,next:guide.next};
 });
}
export function getAllPlanTasks(plan:Plan){return getPlanStages(plan).flatMap(stage=>stage.tasks);}
export function getStudentStage(plan:Plan):{index:number;aligned:boolean;note?:string}{
 const profile=plan.student;
 if(!profile)return {index:0,aligned:false,note:'Add your current study details to focus your tasks.'};
 const at=(id:string)=>plan.path.indexOf(id);
 const find=(ids:string[])=>ids.map(at).find(index=>index>=0);
 if(['class-8','class-9'].includes(profile.standard))return {index:0,aligned:false,note:'Your route begins after Class 10. For now, focus on school subjects and explore the requirements for the stages ahead.'};
 if(profile.standard==='class-10')return {index:0,aligned:true};
 if(['class-11','class-12'].includes(profile.standard)){
  if(at(profile.course)>=0)return {index:at(profile.course),aligned:true};
  if(at('inter')>=0)return {index:at('inter'),aligned:profile.course==='other',note:profile.course==='other'?undefined:'Your current subject group differs from this route. Check accepted subjects before moving to the next stage.'};
 }
 if(['diploma','iti','vocational'].includes(profile.standard)&&at(profile.standard)>=0)return {index:at(profile.standard),aligned:true};
 if(profile.standard==='degree'){
  if(at(profile.course)>=0)return {index:at(profile.course),aligned:true};
  const index=find(['btech','lateral','science','lifescience','medicine','allied','business','arts','law','design']);
  if(index!==undefined)return {index,aligned:false,note:'Your current course differs from this selected route. Use the requirements to check any additional study you may need.'};
 }
 if(profile.standard==='postgraduate'){
  const index=find(plan.path.filter(id=>/-(mtech|ms|mba)$/.test(id)).concat(['higher','research']));
  if(index!==undefined)return {index,aligned:true};
 }
 if(profile.standard==='working')return {index:plan.path.length-1,aligned:false,note:'Use the career-stage tasks to compare your experience with the requirements of your saved goal. This does not mark the career as achieved.'};
 return {index:0,aligned:false,note:'Your current studies do not directly match a stage in this route. Start with its entry requirements; earlier stages are not marked as completed.'};
}
export function interestGuidance(interests:string[]):string[]{
 const notes:Record<string,string>={
  technology:'Look at the computing subjects, practical projects and skills in each route.',
  healthcare:'Compare the specific qualification and supervised training required for each healthcare role.',
  business:'Compare opportunities to practise accounts, communication and business analysis.',
  design:'Look for learning that helps you build and explain a portfolio of work.',
  engineering:'Compare the branch subjects and types of practical problems you would work on.',
  science:'Look for subjects that let you investigate questions and practise scientific methods.',
  society:'Compare course requirements for law and the qualifications needed for specific public-service roles.',
  communication:'Look for opportunities to practise reading, writing, research and presenting ideas.',
  practical:'Compare recognised practical training and opportunities for supervised experience.',
  law:'Read about the course, research skills and professional requirements for the role.',
  'public-service':'Check each role’s qualifications and its own examination or recruitment process.',
  'skilled-work':'Compare recognised practical training and opportunities for supervised experience.',
 };
 return interests.filter(id=>notes[id]).slice(0,2).map(id=>notes[id]);
}

export function practiceSuggestion(plan:Plan):string{
 const subjects=plan.student?.subjects||[];
 const approach=subjects.includes('practical')?'Use a supervised demonstration or worked example, then record what you learned.':subjects.includes('mathematics')?'Work through an example and explain the reasoning behind each step.':subjects.includes('art')?'Sketch or map the idea before developing a small practice exercise.':subjects.includes('computing')?'Use a simple digital learning log to record examples and questions about this subject.':subjects.some(id=>['languages','social-studies'].includes(id))?'Summarise the topic in your own words and explain it to someone else.':'Break this task into a small weekly activity and record the result.';
 const interest=interestOptions.find(option=>option.id!=='unsure'&&plan.student?.interests.includes(option.id));
 return approach+(interest?' Where it fits this course, connect an example to your interest in '+interest.label.toLowerCase()+'.':'');
}
