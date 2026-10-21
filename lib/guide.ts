import {postDegreeOptions} from './post-degree';
import {branches, exams, nodes, planResources, type Plan} from './catalog';

type StageGuide={requirements:string[];preparation:string[];next:string};
const requirements:Record<string,string[]>={
 tenth:['Complete Class 10 or the accepted equivalent for your chosen programme. Keep your marksheet and school records.','Compare subject interests, practical learning, course costs and the qualifications needed for the career you want.'],
 inter:['Check the junior college or school’s Class 10 admission rules and the subjects offered.','Choose a recognised board and a subject combination accepted by the degree courses you may want later.'],
 diploma:['Check the diploma’s accepted school qualification, required subjects and state admission notice.','Confirm the institute and course recognition, available branches and the applicable entrance test or merit process.'],
 iti:['Check the exact trade’s school qualification, age and admission rules; different trades have different requirements.','Confirm recognition of the institute and trade, workshop facilities and the certificate awarded.'],
 vocational:['Check the provider, course recognition, entry qualification and assessment process.','Ask which jobs or further-study routes accept the certificate; a short course is not automatically equivalent to a diploma or degree.'],
 mpc:['Select Mathematics, Physics and Chemistry in your accepted Class 11–12 programme.','Check the subject and admission conditions of the engineering, science or design programmes you are considering.'],
 bipc:['Choose the science subjects required by your intended healthcare or life-science course.','Read the exact course’s qualifying-subject and entrance rules before finalising your school subjects.'],
 commerce:['Check the commerce combinations offered by your college.','Some business, economics or related degrees require mathematics; check your target programme before choosing subjects.'],
 humanities:['Check the humanities subjects and combinations offered by your school or college.','Match your subject choices with the entry requirements of the degree you want to pursue.'],
 btech:['Complete an accepted qualifying programme with the subjects and marks required by your target engineering institution.','Use the relevant entrance or admission route. JEE Main, JEE Advanced and state entrance routes are alternatives for different institutions, not one compulsory sequence for every student.'],
 lateral:['Complete a qualification accepted under the current lateral-entry rules.','Check permitted diploma-to-degree branch mapping, required marks, local-status conditions and participating institutions. Do not assume every branch is open to your diploma.'],
 science:['Check the university’s accepted Class 12 subjects and programme-specific admission criteria.','Select the entrance subjects, merit process or other admission route required by the specific degree.'],
 lifescience:['Choose the exact life-science or agriculture programme first; the required subjects and admission routes can differ.','Confirm university recognition, practical facilities and eligibility in the current prospectus.'],
 medicine:['Read the current NEET-UG bulletin and the admission requirements for the exact MBBS or BDS programme.','Check qualifying subjects, age, marks, applicable category provisions and the relevant counselling process.'],
 allied:['Decide the exact profession and course, such as nursing or a named allied-health programme.','Check its recognised qualification, subject requirements, entrance process, clinical training and professional-registration conditions. Do not assume all courses use the same entrance exam.'],
 business:['Check the university’s Class 12, subject and admission requirements for B.Com, BBA or your exact course.','Professional accountancy qualifications have separate registration and examination stages; a general degree does not replace them.'],
 arts:['Check the recognised university’s qualification, subject and admission rules for your chosen degree.','For careers requiring professional training, check the additional qualification beyond the general undergraduate degree.'],
 law:['For a route directly after Class 12, check the five-year integrated law programme’s admission requirements.','A three-year law programme is a graduate-entry route. Check the current rules and recognition for the exact course rather than treating these routes as interchangeable.'],
 design:['Check the design programme’s accepted qualifications and subjects.','Read its entrance, portfolio, interview or studio-test requirements; these vary by institution.'],
 apprentice:['Check the specific apprenticeship’s trade, age, qualification and employer requirements.','Read the training duration, stipend, assessment and contract conditions before applying.'],
 technical:['Match your recognised trade, diploma or other training to the work you plan to perform.','Check employer requirements and any work-specific certification or licence before taking on regulated work.'],
 higher:['Check the postgraduate course’s accepted undergraduate degrees, subject prerequisites and admission route.','An exam score alone does not establish programme eligibility; verify the accepted papers and qualifications with the institution.'],
 research:['Build the relevant subject foundation and check entry requirements for the research programme or position.','Advanced or independent research positions may require postgraduate or doctoral study.'],
 graduate:['Complete a recognised qualification accepted by your target employer or recruitment notice.','Check role-specific skills, experience and any additional selection requirements.'],
 healthcareer:['Complete the exact qualification and supervised practical training required for your chosen profession.','Confirm the applicable registration and practice requirements with the relevant authority.'],
 lawcareer:['Complete the law qualification required for the role.','Practice, research and compliance roles have different professional requirements; check the specific role before applying.'],
 businesscareer:['Match your qualification and skills to the specific business or finance role.','Check whether the work requires a professional credential beyond your degree.'],
 designcareer:['Build a portfolio suited to the design role and check employer qualification requirements.','Include your process, original work and feedback, as well as finished designs.'],
};
const preparation:Record<string,string[]>={
 tenth:['List subjects you enjoy, tasks you do well and questions you want to explore. Discuss two possible routes with a teacher or guardian.'],
 inter:['Keep a weekly study routine, track subject performance and explore course syllabi before selecting a degree.'],
 diploma:['Build workshop, applied mathematics and technical drawing skills. Keep a record of supervised practical work.'],
 iti:['Practise trade skills safely under supervision and keep an evidence-based work record.'],
 vocational:['Complete practical assignments and ask the provider for a clear progression route before paying fees.'],
 mpc:['Strengthen mathematics, physics and chemistry fundamentals. Use the official syllabus for any entrance test you choose.'],
 bipc:['Develop biology and chemistry foundations, scientific reasoning and a regular revision routine.'],
 commerce:['Practise accounting fundamentals, economics, spreadsheets and business communication.'],
 humanities:['Practise reading, structured writing, research and explaining ideas with evidence.'],
 btech:['Compare curricula, laboratories, project opportunities, total fees and the actual branches offered.'],
 lateral:['Revise diploma fundamentals and the official lateral-entry syllabus. Compare the curriculum and any bridging support.'],
 science:['Practise mathematics or laboratory methods relevant to your subject, record observations and analyse results.'],
 lifescience:['Explore supervised laboratory or field activities and learn to organise observations and data.'],
 medicine:['Prepare from the official examination syllabus and compare recognised courses, clinical training and total costs.'],
 allied:['Explore the work of the exact profession and compare its practical training and clinical placements.'],
 business:['Practise with sample accounts, spreadsheets, presentations or a small business research project.'],
 arts:['Create writing, research or fieldwork samples connected to your chosen subject.'],
 law:['Practise careful reading, reasoning and evidence-based writing; seek supervised exposure when appropriate.'],
 design:['Sketch, prototype and document why you made each design decision. Improve your work using feedback.'],
 apprentice:['Keep a training log, follow workplace safety procedures and document the skills you develop.'],
};
for(const [id,option] of Object.entries(postDegreeOptions)){requirements[id]=option.requirements;preparation[id]=option.steps;}
export function stageGuide(id:string,index:number,plan:Plan):StageGuide{
 const node=nodes[id],branch=branches.find(b=>b.id===node.branch),nextId=plan.path[index+1];
 const direction=postDegreeOptions[('post-'+id.split('-').at(-1)) as keyof typeof postDegreeOptions];
 const entry=requirements[id]||direction?.requirements||(id.startsWith('branch-')?['Check that your admission route offers this branch.','For lateral entry, confirm your diploma-to-degree branch mapping.']:['Check the exact qualification and experience required by the course or role.','Read its current admission or recruitment notice.']);
 let prepare=preparation[id]||direction?.steps||(branch?[`Build foundations in ${branch.subjects.join(', ')}.`,`Practise through a project: ${branch.project}`]:node.skills?.length?[`Build these skills through guided practice: ${node.skills.join(', ')}.`]:['Complete a small practical activity related to this field.']);
 if(plan.lockedAt){
  if(id==='tenth')prepare=['Strengthen your school subjects and keep a weekly study routine. Discuss the requirements of your selected route with a teacher or guardian.'];
  if(id==='inter')prepare=['Keep a weekly study routine, track your subject performance and read the syllabus and admission requirements for your selected degree.'];
  if(id==='btech')prepare=['Review your selected branch’s curriculum, laboratories and project opportunities. Keep a record of course costs and admission requirements.'];
 }
 let next=nextId?`Your next selected step is ${nodes[nextId].title}. Check that stage’s entry requirements before applying or committing to a course.`:node.next.length?'Your journey is still in progress. Return to the tree and choose a next step to complete your career guide.':'Turn this goal into a shortlist of real courses, training opportunities or roles. Match their stated requirements to your preparation and track your applications.';
 if(nextId?.startsWith('branch-'))next=`Your selected branch is ${nodes[nextId].title}. This is a specialisation within your engineering degree, not an additional degree after it.`;
 if(nextId&&(nextId.endsWith('-work')||nextId.endsWith('-mtech')||nextId.endsWith('-ms')||nextId.endsWith('-mba')))next=`Your selected final choice is ${nodes[nextId].title}. Review its requirements and prepare systematically.`;
 if(['mpc','bipc','commerce','humanities'].includes(nextId||''))next=`Your selected subject group is ${nodes[nextId!].title}. This is part of Class 11–12, not a separate course after Intermediate.`;
 if(!nextId){
  if(id.endsWith('-work'))next='Build your project portfolio, apply for internships during your degree, and prepare for campus placement and off-campus recruitment.';
  if(id.endsWith('-mtech'))next='Shortlist participating institutions and engineering specialisations, check previous years’ GATE cutoffs, and prepare a structured revision schedule.';
  if(id.endsWith('-ms'))next='Identify research laboratories, faculty working in your area of interest, and admission deadlines for target university research programmes.';
  if(id.endsWith('-mba'))next='Shortlist management programmes, check their entrance test requirements, and plan your preparation schedule.';
 }
 if(!nextId&&id.startsWith('branch-'))next='Your plan ends at this engineering branch. Work and postgraduate study are optional future choices; no further selection is required.';
 return {requirements:entry,preparation:prepare,next};
}
export function guideExams(plan:Plan){
 const path=plan.path;const has=(...ids:string[])=>ids.some(id=>path.includes(id));
 const reasons:Record<string,string>={};
 if(has('diploma'))reasons.poly='A diploma-admission option in AP/Telangana. For another state, use its official polytechnic admission notice.';
 if(has('lateral'))reasons.ecet='A lateral-entry route in AP/Telangana; use the exact diploma-to-degree branch mapping.';
 if(has('btech')){reasons.jee='Explore for engineering institutions that use JEE Main.';reasons.advanced='Explore only if you intend to apply to IIT undergraduate programmes and meet its separate eligibility conditions.';reasons.eapcet='An alternative engineering admission route in AP/Telangana, where applicable.';}
 if(has('medicine'))reasons.neet='For the MBBS/BDS route selected in your tree; confirm the current counselling and admission process.';
 if(has('science','lifescience','business','arts'))reasons.cuet='An option only if your target university and exact programme use CUET-UG; select its required test subjects.';
 if(has('law'))reasons.clat='An option for participating law institutions; other institutions may use different routes.';
 if(path.some(id=>id.endsWith('-mtech')||id.endsWith('-ms'))||(has('higher','specialist','post-mtech','post-ms')&&has('btech','lateral','engineeringcareer','science')))reasons.gate='An option for programmes that accept GATE. Verify the accepted degree, paper and separate admission process; it is not compulsory for every postgraduate route.';
 if(path.some(id=>id.endsWith('-mba')))reasons.cat='Used for admission to postgraduate management programmes (MBA / PGDM) at IIMs and participating business schools nationwide.';
 if(has('post-mba'))reasons.cat='Only for management programmes that accept CAT; check their separate application and selection process.';
 return exams.filter(e=>reasons[e.id]).map(e=>({...e,reason:reasons[e.id],links:e.alternate?(plan.region==='Telangana'?[{label:'Telangana official source',url:e.alternate}]:plan.region==='Andhra Pradesh'?[{label:'AP official source',url:e.url}]:[{label:'AP official source',url:e.url},{label:'Telangana official source',url:e.alternate}]):[{label:e.name+' official source',url:e.url}]}));
}
export function guideResources(plan:Plan){
 const resources=[...planResources(plan),...guideExams(plan).flatMap(e=>e.links),{label:'National Career Service — career and work resources',url:'https://www.ncs.gov.in/'},{label:'National Scholarship Portal — scheme notices and eligibility',url:'https://scholarships.gov.in/'}];
 return resources.filter((r,i)=>resources.findIndex(other=>other.url===r.url)===i);
}
export function applicationDocuments(plan:Plan){
 return [...(plan.path.some(id=>id.startsWith('post-')||/-(work|mtech|ms|mba)$/.test(id))?['Degree transcripts and completion or permitted final-year documents. For postgraduate study, add references, a statement or research proposal only when requested.']:[]),'Class 10 marksheet and other school records requested by the institution.',...(plan.path.includes('inter')?['Class 12 marksheet or the permitted appearing-candidate documents for your application stage.']:[]),...(plan.path.includes('diploma')?['Diploma marksheets and completion or provisional documents, as requested for lateral entry or employment.']:[]),...(plan.path.includes('iti')||plan.path.includes('vocational')?['The trade or vocational qualification documents accepted by the specific training provider or employer.']:[]),'Identity details and photograph/signature in the formats allowed by the official notice.','Category, income, disability or domicile/local-status certificates only where applicable, in the required format and validity period.','Transfer, migration or other certificates only when requested for admission.','Application confirmation, fee receipt, scorecard and counselling/allotment records as they become available.'];
}
