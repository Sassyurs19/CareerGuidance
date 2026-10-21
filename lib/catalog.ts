import {postDegreeOptions} from './post-degree';
import {validExploration,type ExplorationEntry} from './exploration';
import { validStudentProfile, type StudentProfile } from './student-profile';

export type PathNode = { title:string; subtitle:string; duration?:string; description:string; next:string[]; legacyNext?:string[]; branch?:string; steps?:string[]; skills?:string[]; resource?:string; resourceLabel?:string };
export const nodes:Record<string,PathNode> = {
 tenth:{title:'After Class 10',subtitle:'Your starting point',description:'Choose Intermediate, a diploma, ITI or a vocational course.',next:['inter','diploma','iti','vocational']},
 inter:{title:'Intermediate / Class 11–12',subtitle:'Explore academic subjects',duration:'Usually 2 years',description:'Class 11–12 subjects determine which degree courses you can apply for.',next:['mpc','bipc','commerce','humanities']},
 diploma:{title:'Diploma / Polytechnic',subtitle:'Learn by doing',duration:'Often 3 years after Class 10',description:'Combine classroom learning with technical practice. Admissions, duration and lateral-entry options depend on the state, course and institution.',next:['lateral','technical'],skills:['Applied maths','Workshop practice','Technical drawing'],resource:'https://cets.apsche.ap.gov.in/APSCHE/APSCHEHome.aspx',resourceLabel:'AP entrance examinations'},
 iti:{title:'ITI / Trade training',subtitle:'Build a practical skill',duration:'Trade-dependent, often 1–2 years',description:'Explore trades such as electrician, fitter, welding and computer operator. Entry requirements differ by trade. ITI is different from IIT.',next:['apprentice','technical'],skills:['Hands-on practice','Workplace safety'],resource:'https://www.dgt.gov.in/en/CTS',resourceLabel:'DGT trade training'},
 vocational:{title:'Vocational & skill courses',subtitle:'A focused, practical route',description:'Explore recognised programmes in healthcare support, hospitality, digital services and design. Check recognition, entry requirements and further-study options.',next:['apprentice','technical'],resource:'https://www.skillindiadigital.gov.in/',resourceLabel:'Skill India Digital'},
 mpc:{title:'Maths, Physics & Chemistry',subtitle:'MPC / Science with mathematics',duration:'Class 11–12',description:'Explore engineering, mathematics, physical sciences and other courses that accept your subject combination.',next:['btech','science','design']},
 bipc:{title:'Biology, Physics & Chemistry',subtitle:'BiPC / Science with biology',duration:'Class 11–12',description:'Explore medicine, life sciences and allied health. Each course has its own entrance and subject requirements.',next:['medicine','lifescience','allied']},
 commerce:{title:'Commerce & business',subtitle:'MEC / CEC and other combinations',description:'Explore accounting, economics, business and finance. Mathematics requirements vary between courses and universities.',next:['business','law']},
 humanities:{title:'Arts & humanities',subtitle:'People, society and ideas',description:'Explore languages, history, social sciences and creative subjects. Degree admissions depend on the university and programme.',next:['arts','law','design']},
 lateral:{title:'B.Tech through lateral entry',subtitle:'Eligible diploma → engineering degree',description:'Some institutions admit eligible diploma holders into the second year. ECET is a route in AP/Telangana; branch mapping and admission rules apply. IIT admission uses a different process.',next:['engineeringcareer','higher'],resource:'https://cets.apsche.ap.gov.in/ECET/PDF/APECET2026_InstructionBooklet_V6.pdf',resourceLabel:'AP ECET 2026 eligibility'},
 btech:{title:'B.E. / B.Tech',subtitle:'Explore engineering branches',duration:'Usually 4 years',description:'Engineering admission may use JEE Main, JEE Advanced for IITs, a state entrance test or an institution-specific process. Choose the branch below.',next:['engineeringcareer','higher'],skills:['Mathematics','Projects','Teamwork'],resource:'https://jeemain.nta.nic.in/information-bulletin/',resourceLabel:'JEE Main official bulletins'},
 science:{title:'Science & mathematics degrees',subtitle:'B.Sc. and related programmes',description:'Explore computing, mathematics, physics and scientific investigation. Course structures and entry subjects differ by institution.',next:['research','graduate'],skills:['Analysis','Scientific methods']},
 medicine:{title:'Medicine & dentistry',subtitle:'MBBS / BDS pathways',description:'NEET-UG is the entrance route for MBBS/BDS, followed by the applicable counselling process. Check the current bulletin for subjects, age and other requirements.',next:['healthcareer'],resource:'https://neet.nta.nic.in/admission-bulletin/',resourceLabel:'NEET official bulletin'},
 lifescience:{title:'Life sciences & agriculture',subtitle:'Living systems and the environment',description:'Explore biotechnology, microbiology and agriculture-related programmes. Entrance routes and eligibility vary by course and institution.',next:['research','graduate']},
 allied:{title:'Nursing & allied health',subtitle:'Care, rehabilitation and diagnostics',description:'Explore recognised nursing, physiotherapy and allied-health programmes. Check the relevant regulator, institution and admission notice for the exact course.',next:['healthcareer']},
 business:{title:'Commerce & management degrees',subtitle:'B.Com / BBA and related courses',description:'Build business, accounting and economics foundations. Professional accountancy pathways have their own registration and examination stages.',next:['businesscareer','higher']},
 arts:{title:'Humanities & social-science degrees',subtitle:'B.A. and related programmes',description:'Explore languages, psychology, economics, history, policy or media. Some careers require professional training or postgraduate study.',next:['graduate','research']},
 law:{title:'Law',subtitle:'Integrated law / graduate-entry routes',description:'Explore recognised law programmes. Five-year integrated and three-year graduate-entry courses have different entry requirements and entrance routes.',next:['lawcareer'],resource:'https://consortiumofnlus.ac.in/',resourceLabel:'Consortium of NLUs'},
 design:{title:'Design & creative studies',subtitle:'Products, communication and experiences',description:'Explore design schools, portfolios and entrance tests. Check subject requirements for each programme; architecture has separate requirements.',next:['designcareer'],resource:'https://www.nid.edu/',resourceLabel:'National Institute of Design'},
 apprentice:{title:'Apprenticeship',subtitle:'Learn in a workplace',description:'Check trade, age, qualification and employer requirements before applying. An apprenticeship does not guarantee a permanent job.',next:['technical'],resource:'https://www.apprenticeshipindia.gov.in/',resourceLabel:'Apprenticeship India'},
 technical:{title:'Technical work & self-employment',subtitle:'Put practical skills to work',description:'Explore technician, maintenance and service roles related to your training. Check certifications needed for regulated work.',next:[],skills:['A practical portfolio','Safety','Customer communication']},
 engineeringcareer:{title:'Engineering careers',subtitle:'Build, test and improve',description:'Use the branch explorer to compare career directions. Develop projects, find internships and practise interviews; a degree alone does not guarantee employment.',next:[],skills:['Branch fundamentals','Projects','Internships','Communication']},
 higher:{title:'Further study & specialisation',subtitle:'Choose a course for your goal',description:'Explore relevant postgraduate programmes, research or management. GATE, CAT and other routes have separate eligibility and programme-specific requirements.',next:[],resource:'https://gate2027.iitm.ac.in/',resourceLabel:'GATE official information'},
 research:{title:'Research & advanced study',subtitle:'Ask questions and investigate',description:'Explore postgraduate study, research projects and relevant fellowships. Admission and career requirements differ by discipline.',next:[],skills:['Research methods','Writing','Data analysis']},
 graduate:{title:'Graduate career options',subtitle:'Turn learning into experience',description:'Explore roles aligned with your degree, internships and graduate recruitment. Government exams have their own qualification, age and category rules.',next:[],skills:['Work portfolio','Communication','Digital skills']},
 healthcareer:{title:'Healthcare careers',subtitle:'Care with professional training',description:'Complete the qualification, practical training and registration required for your profession. Specialisation may require further study and examinations.',next:[],skills:['Clinical training','Ethics','Patient communication']},
 businesscareer:{title:'Business & finance careers',subtitle:'Work with organisations and numbers',description:'Explore accounting support, operations, marketing and business analysis. Regulated professional roles need additional qualifications.',next:[],skills:['Spreadsheets','Business communication','Internships']},
 lawcareer:{title:'Legal careers',subtitle:'Reason, research and advocate',description:'Explore legal research, compliance and practice. Professional practice requires the applicable qualifications, enrolment and examinations.',next:[],skills:['Legal research','Writing','Internships']},
 designcareer:{title:'Creative careers',subtitle:'Make your portfolio your story',description:'Explore product, visual, interaction and communication design. Build a portfolio showing your process, feedback and finished work.',next:[],skills:['Portfolio','Design tools','User research']},
};
export const branches = [
 {id:'cse',name:'Computer Science',short:'CSE',tag:'Software & systems',about:'Understand how software, algorithms and computer systems work.',subjects:['Programming','Algorithms','Databases','Networks'],fit:'You enjoy logical puzzles and building digital tools.',jobs:['Software developer','Systems engineer','Security analyst'],project:'Build a small study planner with a database.',skills:['Programming','Problem-solving','Git & teamwork'],study:'M.Tech / M.S. in computing or related specialisations'},
 {id:'ece',name:'Electronics & Communication',short:'ECE',tag:'Chips & connected devices',about:'Explore electronic circuits, communication systems and embedded computing.',subjects:['Digital electronics','Signals','Communication','Embedded systems'],fit:'You are curious about how devices sense and communicate.',jobs:['Embedded engineer','VLSI engineer','Communications engineer'],project:'Make a sensor-based room monitor.',skills:['Circuit design','C / C++','Simulation'],study:'Microelectronics, embedded systems or communications'},
 {id:'eee',name:'Electrical & Electronics',short:'EEE',tag:'Energy & automation',about:'Study electrical power, machines, control systems and electronics.',subjects:['Power systems','Electrical machines','Control','Power electronics'],fit:'You like energy, machines and making systems reliable.',jobs:['Electrical engineer','Power systems engineer','Controls engineer'],project:'Model a solar-powered lighting system.',skills:['Circuit analysis','Safety','Simulation'],study:'Power systems, energy or control engineering'},
 {id:'mech',name:'Mechanical Engineering',short:'MECH',tag:'Machines & manufacturing',about:'Learn how machines, materials, heat and manufacturing work.',subjects:['Mechanics','Thermodynamics','Materials','Manufacturing'],fit:'You enjoy understanding movement and physical products.',jobs:['Design engineer','Manufacturing engineer','Thermal engineer'],project:'Design a simple mechanical mechanism.',skills:['CAD','Engineering drawing','Analysis'],study:'Robotics, manufacturing, thermal or design engineering'},
 {id:'civil',name:'Civil Engineering',short:'CIVIL',tag:'Structures & communities',about:'Explore buildings, roads, water systems and infrastructure.',subjects:['Structures','Surveying','Geotechnics','Water resources'],fit:'You care about how safe and useful places are built.',jobs:['Site engineer','Structural engineer','Transport engineer'],project:'Survey a local accessibility problem and propose a design.',skills:['CAD / BIM','Estimation','Site safety'],study:'Structures, transport, geotechnical or environmental engineering'},
 {id:'ai',name:'AI & Data Science',short:'AI / DS',tag:'Patterns & intelligent systems',about:'Study data, statistics and machine learning alongside computing fundamentals.',subjects:['Statistics','Programming','Machine learning','Data engineering'],fit:'You enjoy mathematics and asking questions with data.',jobs:['Data analyst','Data engineer','ML engineer with relevant skills'],project:'Analyse a public dataset and explain your findings.',skills:['Python','Statistics','Responsible data use'],study:'Data science, computing, AI or statistics'},
 {id:'it',name:'Information Technology',short:'IT',tag:'Applications & infrastructure',about:'Explore software applications, information systems and computing infrastructure.',subjects:['Programming','Web systems','Databases','Networks'],fit:'You like applying technology to practical problems.',jobs:['Application developer','Cloud associate','IT systems analyst'],project:'Build a resource-sharing website for your class.',skills:['Web development','Databases','Networks'],study:'IT, computing, cybersecurity or information systems'},
 {id:'chemical',name:'Chemical Engineering',short:'CHEM',tag:'Processes & materials',about:'Use chemistry, physics and maths to design industrial processes.',subjects:['Thermodynamics','Transport processes','Reaction engineering','Process control'],fit:'You like turning raw materials into useful products.',jobs:['Process engineer','Production engineer','Quality engineer'],project:'Model a safe water-treatment process.',skills:['Process simulation','Analysis','Safety'],study:'Process engineering, energy or materials'},
];
export type BtechDirection = {
 id: string;
 title: string;
 subtitle: string;
 description: string;
 why: string;
 benefits: string[];
 getSteps: (branch: (typeof branches)[0]) => string[];
 getSkills: (branch: (typeof branches)[0]) => string[];
 resource: string;
 resourceLabel: string;
};

export const btechDirections:BtechDirection[]=Object.entries(postDegreeOptions).map(([key,option])=>({
 id:key.replace('post-',''),title:option.title,subtitle:option.subtitle,description:option.description,
 why:option.description,benefits:option.skills.slice(0,2).map(skill=>'Develop '+skill.toLowerCase()+'.'),
 getSteps:branch=>[...option.steps,`Connect your preparation to ${branch.name}: ${branch.study}.`],
 getSkills:()=>option.skills,resource:option.resource,resourceLabel:option.resourceLabel
}));

// Keep old saved routes readable while new journeys continue through a branch and clearer final choices.
for (const degree of ['btech','lateral']) {
 nodes[degree].legacyNext = [...nodes[degree].next];
 nodes[degree].next = branches.map(b=>'branch-'+b.id);
}
for (const branch of branches) {
 const nextChoiceIds = btechDirections.map(d => `career-${branch.id}-${d.id}`);
 const legacyJobIds = branch.jobs.map((_, i) => `career-${branch.id}-${i}`);
 nodes['branch-'+branch.id]={
  title:branch.name,
  subtitle:branch.tag,
  description:branch.about+' '+branch.fit,
  next:nextChoiceIds,
  legacyNext:legacyJobIds,
  branch:branch.id,
  skills:branch.skills,
  resource:'https://nptel.ac.in/',
  resourceLabel:'Explore related learning on NPTEL'
 };
 btechDirections.forEach(d => {
  nodes[`career-${branch.id}-${d.id}`] = {
   title: d.title,
   subtitle: d.subtitle,
   description: d.description,
   next: [],
   branch: branch.id,
   skills: d.getSkills(branch),
   steps: d.getSteps(branch),
   resource: d.resource,
   resourceLabel: d.resourceLabel
  };
 });
 branch.jobs.forEach((job,i)=>{
  nodes[legacyJobIds[i]]={
   title:job,
   subtitle:'A career to work towards',
   description:`Use your ${branch.name.toLowerCase()} foundation to explore ${job.toLowerCase()} roles. This is one possible route; employers may accept other qualifications and require further experience.`,
   next:[],
   branch:branch.id,
   skills:branch.skills,
   steps:[
    `Choose an eligible ${branch.name} programme and complete the required admission process. For diploma lateral entry, confirm the permitted branch mapping.`,
    `Build strong foundations in ${branch.subjects.join(', ').toLowerCase()}.`,
    `Start with a practical project: ${branch.project}`,
    `Build a portfolio, seek relevant internships and practise role-specific interviews. Check each employer’s qualifications and experience requirements.`,
    ...(job.toLowerCase().includes('structural')||job.toLowerCase().includes('vlsi')||job.toLowerCase().includes('ml engineer')?[`Consider specialised training or postgraduate study where the role requires deeper expertise. ${branch.study} is a direction to investigate.`]:[])
   ],
   resource:'https://nptel.ac.in/',
   resourceLabel:'NPTEL learning resources'
  };
 });
}
for(const [id,option] of Object.entries(postDegreeOptions)){nodes[id]={...option,next:[]};}
function addCareer(parent:string,id:string,title:string,description:string,steps:string[],skills:string[],url='https://www.ncs.gov.in/'){
 nodes[id]={title,subtitle:'A career to work towards',description,next:[],steps,skills,resource:url,resourceLabel:'Explore official resources'};
 nodes[parent].next.push(id);
}
addCareer('technical','technician','Technician','Work on installation, maintenance or repairs in the trade you trained for. Job eligibility depends on the exact trade and employer.', ['Complete a recognised diploma or ITI trade relevant to the work.','Practise safe installation, testing and maintenance in supervised workshops.','Explore suitable apprenticeships and keep a record of practical work.','Apply for roles matching your qualification and any required certification.'],['Trade skills','Safety','Fault-finding']);
addCareer('technical','tradebusiness','Skilled-service business','Build a service business around a trade you understand and can practise safely.', ['Gain recognised training and supervised experience in your chosen trade.','Understand tools, quality, customer communication and service pricing.','Check licences, insurance and local requirements for the work you plan to offer.','Start with a clear service offering and build a reputation through reliable work.'],['Practical expertise','Customer service','Planning']);
addCareer('businesscareer','accounting','Accounting & finance support','Help organisations maintain records and understand financial information. Professional accountancy roles require their own qualifications.', ['Complete a relevant commerce qualification.','Learn bookkeeping, spreadsheets and commonly used accounting tools.','Practise with sample business records and seek relevant internships.','Apply for suitable junior roles; research professional qualifications if that is your goal.'],['Spreadsheets','Accuracy','Business communication']);
addCareer('businesscareer','marketing','Marketing & business operations','Help organisations understand customers and run their operations.', ['Build a foundation in business or a relevant field.','Practise research, communication, spreadsheets and presentation skills.','Create a small campaign or operations-improvement project.','Seek internships and apply for roles that match your strengths.'],['Communication','Analysis','Organisation']);
addCareer('designcareer','uxdesigner','Interaction / UX designer','Research how people use products and design clearer digital experiences.', ['Explore a recognised design course or a relevant learning route.','Learn observation, user research, accessibility and prototyping.','Build a portfolio explaining the problem, your decisions and feedback.','Seek internships and present your case studies when applying.'],['User research','Prototyping','Communication'],'https://www.nid.edu/');
addCareer('designcareer','visualdesigner','Visual communication designer','Use typography, images and layout to communicate ideas.', ['Build design foundations through a suitable course and practice.','Learn typography, layout and relevant design tools.','Develop a portfolio of original work and improve it through feedback.','Explore internships, studio roles or carefully scoped freelance work.'],['Visual thinking','Typography','Portfolio'],'https://www.nid.edu/');
addCareer('lawcareer','legalresearch','Legal research & compliance','Research legal questions and help organisations understand obligations; responsibilities depend on your role and qualifications.', ['Complete a suitable recognised law qualification.','Practise legal reading, research and structured writing.','Seek supervised internships and build a writing portfolio.','Check the qualification and professional-registration requirements of the role you want.'],['Research','Writing','Reasoning'],'https://consortiumofnlus.ac.in/');
addCareer('research','researcher','Researcher','Investigate questions in your chosen discipline. Independent research roles often require advanced study.', ['Complete a relevant undergraduate programme.','Learn research methods, analysis and academic writing.','Join supervised projects and explore postgraduate or doctoral admission requirements.','Develop evidence of research and apply for relevant projects, fellowships or roles.'],['Research methods','Analysis','Writing']);
addCareer('graduate','analyst','Graduate analyst / operations roles','Explore entry-level roles that accept your degree and use your analytical or organisational skills.', ['Complete the qualification required by your target employers.','Build spreadsheet, communication and practical digital skills.','Create projects and seek relevant internships.','Read job requirements carefully and prepare examples for interviews.'],['Spreadsheets','Communication','Problem-solving']);
addCareer('graduate','publicservice','Public-service examination route','Explore notified recruitment routes for which your completed qualification is eligible.', ['Choose the specific role and read the current official recruitment notice.','Check qualification, age, nationality and category conditions before applying.','Plan preparation using the official syllabus and previous papers where available.','Complete the application and each selection stage specified in the notice.'],['Reading','Reasoning','Consistent preparation']);
addCareer('higher','specialist','Postgraduate specialist','Develop deeper knowledge in a field related to your interests and eligible qualification.', ['Shortlist programmes based on your goal, curriculum, costs and entry rules.','Check which entrance papers and undergraduate qualifications each programme accepts.','Complete the admission process and build specialised projects or research.','Apply your advanced skills to suitable professional or research opportunities.'],['Subject depth','Projects','Research']);
addCareer('healthcareer','healthprofessional','Healthcare professional in your chosen course','Your specific degree determines the profession you can enter. Medicine, dentistry, nursing and allied-health qualifications lead to different roles.', ['Choose the exact profession and a recognised course that qualifies you for it.','Meet its subject and entrance requirements, then complete admission and the required course.','Complete mandatory practical training and the registration required for that profession.','Apply for appropriate roles and investigate further specialisation if needed.'],['Professional training','Patient communication','Ethics']);
export function careerSteps(p:Plan):string[]{const end=nodes[p.path.at(-1)!];const b=branches.find(b=>b.id===p.branch);return end.steps||(p.path.at(-1)!.startsWith('branch-')?[`Complete the admission process for ${end.title}.`,`Build foundations in ${b?.subjects.join(', ')||'your branch subjects'}.`,b?.project||'Complete a supervised practical project.','Work, internships and further study are optional later choices. You can decide during your degree.']:[end.next.length===0?'Review the qualifications and practical skills required for your selected career.':'Continue down the tree until you choose a career destination.','Compare course recognition, entry requirements, duration and costs.',b?b.project:'Try a small practical activity related to this field.','Discuss your choices with a teacher or guardian before applying.']);}
export function planResources(p:Plan){const list=p.path.flatMap(id=>{const n=nodes[id];return n.resource?[{label:n.resourceLabel||n.title,url:n.resource}]:[]});if(p.branch)list.push({label:'NPTEL courses',url:'https://nptel.ac.in/'});return list.filter((r,i)=>list.findIndex(x=>x.url===r.url)===i);}
export const exams = [
 {id:'cat',name:'CAT',level:'Degree',region:'National',purpose:'Management admission at participating institutions',eligibility:'Check the current notice for degree, marks and category conditions and the separate programme selection criteria.',url:'https://iimcat.ac.in/',note:'Not every management programme uses CAT. Check each institution.'},
 {id:'poly',name:'POLYCET',level:'Class 10',region:'AP / Telangana',purpose:'Polytechnic diploma admission',eligibility:'Check the state bulletin for Class 10 subjects, qualification and course-specific rules.',url:'https://polycetap.nic.in/',alternate:'https://polycet.sbtet.telangana.gov.in/',note:'State-specific admissions. Choose the correct state portal.'},
 {id:'jee',name:'JEE Main',level:'Class 12',region:'National',purpose:'Engineering entrance; qualifying route to JEE Advanced',eligibility:'Class 12/equivalent year and subject rules apply. Eligibility to sit the exam and eligibility for admission are different.',url:'https://jeemain.nta.nic.in/information-bulletin/',note:'Read the current bulletin and institute admission criteria.'},
 {id:'advanced',name:'JEE Advanced',level:'Class 12',region:'National',purpose:'IIT undergraduate admission route',eligibility:'For most Indian applicants: qualify through JEE Main and meet all Advanced age, attempt, Class 12/equivalent and earlier-admission conditions.',url:'https://jeeadv.ac.in/eligibility.html',note:'Qualifying does not guarantee an IIT seat; admission and counselling rules apply.'},
 {id:'eapcet',name:'EAPCET',level:'Class 12',region:'AP / Telangana',purpose:'Engineering, agriculture & pharmacy pathways',eligibility:'Subjects, marks, age and local-status rules vary by course and state.',url:'https://cets.apsche.ap.gov.in/APSCHE/APSCHEHome.aspx',alternate:'https://eapcet.tgche.ac.in/',note:'Engineering and agriculture/pharmacy streams have different requirements.'},
 {id:'ecet',name:'ECET',level:'Diploma',region:'AP / Telangana',purpose:'Eligible lateral entry into engineering / pharmacy',eligibility:'Relevant diploma or eligible B.Sc. Mathematics qualification, required marks and state rules; branch mapping applies.',url:'https://cets.apsche.ap.gov.in/ECET/PDF/APECET2026_InstructionBooklet_V6.pdf',alternate:'https://ecet.tgche.ac.in/',note:'Check which degree branches your diploma permits.'},
 {id:'neet',name:'NEET-UG',level:'Class 12',region:'National',purpose:'MBBS / BDS and other notified medical routes',eligibility:'Qualifying subjects, age and other conditions are specified in the official bulletin.',url:'https://neet.nta.nic.in/admission-bulletin/',note:'Counselling, category documentation and admission rules are separate steps.'},
 {id:'cuet',name:'CUET-UG',level:'Class 12',region:'National',purpose:'Participating universities’ undergraduate courses',eligibility:'Select subjects that match the university and programme requirements.',url:'https://cuet.nta.nic.in/',note:'Participating universities determine programme eligibility.'},
 {id:'gate',name:'GATE',level:'Degree',region:'National',purpose:'Postgraduate study and some recruitment routes',eligibility:'Check the current bulletin for accepted qualifications and study years. Programme eligibility and accepted papers are separate.',url:'https://gate2027.iitm.ac.in/',note:'Paper choice, postgraduate eligibility and employer branch requirements are separate.'},
 {id:'clat',name:'CLAT',level:'Class 12',region:'National',purpose:'Law admission at participating institutions',eligibility:'Check the current undergraduate bulletin for qualification, marks and category provisions.',url:'https://consortiumofnlus.ac.in/',note:'Not every law institution uses CLAT.'},
];
export type Plan = {
 version?:2;
 path:string[];
 branch:string;
 region:string;
 history:{label:string; at:string}[];
 tasks:string[];
 student?:StudentProfile;
 exploration?:ExplorationEntry[];
 lockedAt?:number;
 overviewSeen?:boolean;
};
export const initialPlan:Plan={version:2,path:['tenth'],branch:'',region:'All India',history:[],tasks:[]};
export function canFinishAt(id:string){return !!nodes[id]&&(id.startsWith('branch-')||nodes[id].next.length===0);}
export function validPlan(value:unknown):value is Plan {
 if(!value||typeof value!=='object'||Array.isArray(value))return false;
 const p=value as Record<string,unknown>;
 if(p.version!==undefined&&p.version!==2)return false;
 if(!Array.isArray(p.path)||p.path.length===0||p.path.length>=12||p.path[0]!=='tenth')return false;
 const path=p.path;
 if(!path.every(id=>typeof id==='string'&&Object.prototype.hasOwnProperty.call(nodes,id))||new Set(path).size!==path.length)return false;
 if(!path.every((id,i)=>i===0||[...nodes[path[i-1]].next,...(nodes[path[i-1]].legacyNext||[])].includes(id)))return false;
 if(typeof p.branch!=='string'||(p.branch!==''&&!branches.some(b=>b.id===p.branch)))return false;
 const routeBranch=path.map(id=>nodes[id].branch).find(Boolean);
 if(routeBranch&&p.branch!==routeBranch)return false;
 if(typeof p.region!=='string'||!['All India','Andhra Pradesh','Telangana'].includes(p.region))return false;
 if(p.exploration!==undefined&&!validExploration(p.exploration))return false;
 if(p.student!==undefined&&!validStudentProfile(p.student))return false;
 if(p.lockedAt!==undefined&&(typeof p.lockedAt!=='number'||!Number.isFinite(p.lockedAt)||p.lockedAt<=0||!canFinishAt(path[path.length-1])))return false;
 if(p.overviewSeen!==undefined&&typeof p.overviewSeen!=='boolean')return false;
 if(!Array.isArray(p.history)||p.history.length>50||!p.history.every(h=>h&&typeof h==='object'&&typeof h.label==='string'&&h.label.length<160&&typeof h.at==='string'&&h.at.length<=40&&!Number.isNaN(Date.parse(h.at))))return false;
 if(!Array.isArray(p.tasks)||p.tasks.length>120||new Set(p.tasks).size!==p.tasks.length)return false;
 const allowedTasks=new Set(['explore','compare','eligibility','project']);
 for(const id of path){
  for(const kind of ['requirements','project','skills','application'])allowedTasks.add(`${id}:${kind}`);
  for(let i=0;i<10;i++)allowedTasks.add(`${id}:prepare-${i}`);
 }
 return p.tasks.every(task=>typeof task==='string'&&allowedTasks.has(task));
}
export function planText(p:Plan){
 const b=branches.find(b=>b.id===p.branch);const end=nodes[p.path[p.path.length-1]];
 return ['MY CAREER PLAN','', 'Path: '+p.path.map(id=>nodes[id].title).join(' → '), ...(b?['Branch: '+b.name]:[]), 'Region: '+p.region,'',canFinishAt(p.path.at(-1)!)?'Study or career goal: '+end.title:'Journey in progress: '+end.title,'', 'HOW TO GET THERE', ...careerSteps(p).map((step,i)=>(i+1)+'. '+step),'', 'SKILLS TO BUILD', (end.skills||b?.skills||[]).join(' · ')||'Explore the next step in your tree.','', 'OFFICIAL RESOURCES', ...planResources(p).map(r=>r.label+': '+r.url),'', 'RECENT SELECTION HISTORY',...p.history.slice(-12).map(h=>'• '+h.label),'','Guidance only. Verify current eligibility with the official institution.'].join('\n');
}
