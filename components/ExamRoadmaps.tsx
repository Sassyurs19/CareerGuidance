'use client';
import {useMemo,useState} from 'react';
import {ArrowUpRight,BookOpen,CalendarDays,CheckCircle2,GraduationCap,Target} from 'lucide-react';
import '../app/exam-roadmaps.css';

type Track='ap'|'tg'|'jee';
const resources:Record<Track,{label:string;note:string;url:string}[]>={
 ap:[
  {label:'AP EAPCET official portal',note:'Applications, notices, results, syllabus and mock test',url:'https://cets.apsche.ap.gov.in/EAPCET/Eapcet/EAPCET_HomePage'},
  {label:'AP EAPCET 2026 engineering syllabus',note:'Use the current official syllabus; check for the next exam-year update.',url:'https://cets.apsche.ap.gov.in/EAPCET/PDF/APEAPCET2026_Instruction_Booklet_Engineering.pdf'},
  {label:'AP counselling portal',note:'Registration, certificates, web options and allotment notices',url:'https://cap.apcfss.in/'},
  {label:'APSCHE previous last-rank reference',note:'Official previous-year rank details; confirm the year and category shown.',url:'https://apsche.ap.gov.in/Pdf/APEAMCET2024LASTRANKDETAILSNONSW.XLS'}
 ],
 tg:[
  {label:'TG EAPCET official exam portal',note:'Exam notices, application, syllabus and results',url:'https://eapcet.tgche.ac.in/'},
  {label:'TG EAPCET counselling portal',note:'Web options, seat allotment and official college information',url:'https://tgeapcet.nic.in/'},
  {label:'TG EAPCET 2025 second-phase last ranks',note:'Official historical college, branch, category and gender rank table',url:'https://tgeapcet.nic.in/files/TGEAPCET_2025_LASTRANKS_SecondPhase.pdf'}
 ],
 jee:[
  {label:'JEE Main official portal',note:'Current bulletin, eligibility, dates and application',url:'https://jeemain.nta.nic.in/'},
  {label:'Official JEE Main syllabus',note:'Study only the syllabus released for your exam year',url:'https://jeemain.nta.nic.in/document/syllabus-2026/'},
  {label:'Official question papers and notices',note:'Use NTA papers and notices to practise the current exam pattern',url:'https://jeemain.nta.nic.in/documents/'},
  {label:'JoSAA opening and closing ranks',note:'Filter by year, round, institute, course and seat category',url:'https://josaa.nic.in/or-cr/'}
 ]
};
const roadmap:Record<Track,{title:string;period:string;tasks:string[]}[]>={
 ap:[
  {title:'Build the basics',period:'Start now',tasks:['Review Class 11 and 12 Mathematics, Physics and Chemistry concepts.','Keep a short formula and mistake notebook.','Use the current AP EAPCET syllabus to mark each chapter as not started, learning or revised.']},
  {title:'Finish the syllabus in cycles',period:'Main study phase',tasks:['Study one concept, solve examples, then attempt timed questions.','Give extra Mathematics practice while keeping Physics and Chemistry in the weekly routine.','After each chapter, solve EAPCET-style questions and revisit mistakes.']},
  {title:'Practise full papers',period:'After first revision',tasks:['Take a timed mock test regularly in a quiet setting.','Review every wrong, guessed or skipped question and revise its concept.','Practise on the official mock-test link and previous question papers.']},
  {title:'Apply and attend counselling',period:'When notices open',tasks:['Apply only on the official APSCHE portal and check eligibility carefully.','Keep certificates and marksheets ready in the required formats.','During counselling, order a broad list of acceptable colleges and branches; confirm fees and rules before locking options.']}
 ],
 tg:[
  {title:'Build the basics',period:'Start now',tasks:['Review Class 11 and 12 Mathematics, Physics and Chemistry concepts.','Keep a short formula and mistake notebook.','Use the current TG EAPCET syllabus to mark each chapter as not started, learning or revised.']},
  {title:'Finish the syllabus in cycles',period:'Main study phase',tasks:['Study one concept, solve examples, then attempt timed questions.','Balance Mathematics practice with Physics and Chemistry throughout the week.','After each chapter, solve EAPCET-style questions and revisit mistakes.']},
  {title:'Practise full papers',period:'After first revision',tasks:['Take a timed mock test regularly in a quiet setting.','Review every wrong, guessed or skipped question and revise its concept.','Use official papers and mocks to practise time management.']},
  {title:'Apply and attend counselling',period:'When notices open',tasks:['Apply through the official TG EAPCET portal and read the current rules.','Keep certificates and marksheets ready for verification.','Use official last-rank lists as a guide; shortlist multiple acceptable colleges and branches.']}
 ],
 jee:[
  {title:'Strengthen Class 11 foundations',period:'Start now',tasks:['Learn concepts in Physics, Chemistry and Mathematics before relying on shortcuts.','Keep up with school lessons and solve a small set of entrance questions each day.','Check the current JEE Main syllabus and keep a chapter tracker.']},
  {title:'Complete Class 12 topics and connect them',period:'Main study phase',tasks:['Study new topics while revising Class 11 each week.','Practise mixed-topic problems and learn to choose a method under time pressure.','Use official previous papers to understand the question style.']},
  {title:'Mock tests and correction',period:'After first revision',tasks:['Take a full-length timed mock at regular intervals.','Analyse accuracy, time spent and recurring errors after every test.','Revise weak topics; avoid taking mock tests without reviewing them.']},
  {title:'Apply, result and JoSAA',period:'When notices open',tasks:['Apply on the NTA portal and verify the bulletin, documents and dates.','After results, check JoSAA eligibility, category rank type and current seat matrix.','Compare institute, branch, fees, location and previous opening/closing ranks before filling choices.']}
 ]
};
const colleges:Record<Track,{name:string;route:string;url:string}[]>={
 ap:[
  {name:'NIT Andhra Pradesh',route:'JEE Main · JoSAA',url:'https://nitandhra.ac.in/'},{name:'IIT Tirupati',route:'JEE Main, then JEE Advanced · JoSAA',url:'https://www.iittp.ac.in/'},{name:'Andhra University College of Engineering',route:'AP EAPCET counselling',url:'https://www.andhrauniversity.edu.in/college/college-of-engineering.html'},{name:'JNTU Kakinada College of Engineering',route:'AP EAPCET counselling',url:'https://jntuk.edu.in/'},{name:'Sri Venkateswara University College of Engineering',route:'AP EAPCET counselling',url:'https://svuniversity.edu.in/'},{name:'GVP College of Engineering',route:'AP EAPCET counselling',url:'https://www.gvpce.ac.in/'}
 ],
 tg:[
  {name:'NIT Warangal',route:'JEE Main · JoSAA',url:'https://nitw.ac.in/'},{name:'IIT Hyderabad',route:'JEE Main, then JEE Advanced · JoSAA',url:'https://www.iith.ac.in/'},{name:'University College of Engineering, Osmania University',route:'TG EAPCET counselling',url:'https://www.osmania.ac.in/engineering.php'},{name:'JNTUH College of Engineering Hyderabad',route:'TG EAPCET counselling',url:'https://jntuh.ac.in/'},{name:'CBIT',route:'TG EAPCET counselling',url:'https://www.cbit.ac.in/'},{name:'Vasavi College of Engineering',route:'TG EAPCET counselling',url:'https://www.vce.ac.in/'},{name:'VNR Vignana Jyothi Institute of Engineering & Technology',route:'TG EAPCET counselling',url:'https://vnrvjiet.ac.in/'},{name:'Gokaraju Rangaraju Institute of Engineering & Technology',route:'TG EAPCET counselling',url:'https://www.griet.ac.in/'}
 ],
 jee:[
  {name:'IIT Hyderabad',route:'JEE Main qualification + JEE Advanced + JoSAA',url:'https://www.iith.ac.in/'},{name:'IIT Tirupati',route:'JEE Main qualification + JEE Advanced + JoSAA',url:'https://www.iittp.ac.in/'},{name:'NIT Warangal',route:'JEE Main + JoSAA',url:'https://nitw.ac.in/'},{name:'NIT Andhra Pradesh',route:'JEE Main + JoSAA',url:'https://nitandhra.ac.in/'},{name:'IIIT Hyderabad',route:'JEE Main / institution-specific route; check current admission page',url:'https://www.iiit.ac.in/admissions/undergraduate/'},{name:'Other NITs, IIITs and GFTIs',route:'JEE Main + JoSAA',url:'https://josaa.nic.in/'}
 ]
};
// Official TG EAPCET 2025 second-phase OC last ranks; each pair is boys, girls.
const tgCutoffs:{college:string;branch:'CSE'|'ECE';boys:number;girls:number}[]=[
 {college:'CBIT',branch:'CSE',boys:1743,girls:2181},{college:'CBIT',branch:'ECE',boys:4205,girls:5013},
 {college:'VNR VJIET',branch:'CSE',boys:1445,girls:1707},{college:'VNR VJIET',branch:'ECE',boys:4044,girls:4395},
 {college:'Vasavi College of Engineering',branch:'CSE',boys:2089,girls:2358},{college:'Vasavi College of Engineering',branch:'ECE',boys:5339,girls:5908},
 {college:'Gokaraju Rangaraju Institute of Engineering & Technology',branch:'CSE',boys:3569,girls:4335},{college:'Gokaraju Rangaraju Institute of Engineering & Technology',branch:'ECE',boys:5400,girls:5900},
 {college:'Mahatma Gandhi Institute of Technology',branch:'CSE',boys:5862,girls:6663},{college:'Mahatma Gandhi Institute of Technology',branch:'ECE',boys:9439,girls:9890},
 {college:'CVR College of Engineering',branch:'CSE',boys:6107,girls:6870},{college:'CVR College of Engineering',branch:'ECE',boys:8680,girls:8971}
];
// AP 2025 open-category closing ranks from the published counselling summary linked below.
const apCutoffs:{college:string;branch:'CSE'|'ECE';closing:number}[]=[
 {college:'Gayatri Vidya Parishad College of Engineering',branch:'CSE',closing:4127},{college:'JNTU College of Engineering, Kakinada',branch:'CSE',closing:4973},{college:'Andhra University College of Engineering',branch:'CSE',closing:5567},{college:'SRM University AP',branch:'CSE',closing:6108},{college:'Vishnu Institute of Technology',branch:'CSE',closing:7353},{college:'Anil Neerukonda Institute of Technology & Sciences',branch:'CSE',closing:7720},{college:'Sagi Ramakrishnam Raju Engineering College',branch:'CSE',closing:7980},{college:'VIT-AP University',branch:'CSE',closing:9383},{college:'GMR Institute of Technology',branch:'CSE',closing:12149},{college:'RVR & JC College of Engineering',branch:'CSE',closing:12688},
 {college:'JNTU College of Engineering, Kakinada',branch:'ECE',closing:4202},{college:'SRM University AP',branch:'ECE',closing:4510},{college:'Andhra University College of Engineering',branch:'ECE',closing:4933},{college:'VIT-AP University',branch:'ECE',closing:5500},{college:'Gayatri Vidya Parishad College of Engineering',branch:'ECE',closing:8300},{college:'Sri Venkateswara University College of Engineering',branch:'ECE',closing:9810},{college:'GMR Institute of Technology',branch:'ECE',closing:14197},{college:'Maharaj Vijayaram Gajapathi Raj College of Engineering',branch:'ECE',closing:14342},{college:'Vishnu Institute of Technology',branch:'ECE',closing:15094},{college:'Sagi Ramakrishnam Raju Engineering College',branch:'ECE',closing:15629}
];
export default function ExamRoadmaps({region}:{region:string}){
const first:Track=region==='Telangana'?'tg':'ap';
 const [track,setTrack]=useState<Track>(first),[rank,setRank]=useState(''),[branch,setBranch]=useState<'CSE'|'ECE'>('CSE'),[candidate,setCandidate]=useState<'boys'|'girls'>('boys');
 const matches=useMemo(()=>{const value=Number(rank);if(!Number.isInteger(value)||value<1)return[];if(track==='ap')return apCutoffs.filter(item=>item.branch===branch&&value<=item.closing).sort((a,b)=>a.closing-b.closing);return tgCutoffs.filter(item=>item.branch===branch&&value<=(candidate==='girls'?Math.max(item.boys,item.girls):item.boys)).map(item=>({...item,closing:candidate==='girls'?Math.max(item.boys,item.girls):item.boys})).sort((a,b)=>a.closing-b.closing);},[rank,branch,candidate,track]);
 const exam:Track=track==='jee'?'jee':track;
 return <section className="exam-roadmaps" aria-labelledby="exam-roadmaps-title">
  <div className="exam-roadmaps-heading"><div><span className="eyebrow">PLAN YOUR PREPARATION</span><h2 id="exam-roadmaps-title">Entrance exam roadmaps</h2><p>Choose an exam to see a clear study plan, official resources and colleges to explore.</p></div><Target size={24}/></div>
  <div className="exam-track-tabs" role="group" aria-label="Exam roadmaps">
   <button aria-pressed={track==='ap'} onClick={()=>setTrack('ap')}>AP EAPCET</button><button aria-pressed={track==='tg'} onClick={()=>setTrack('tg')}>TG EAPCET</button><button aria-pressed={track==='jee'} onClick={()=>setTrack('jee')}>JEE Main</button>
  </div>
  <div className="exam-roadmap-grid">
   <section className="exam-roadmap-panel"><h3><CalendarDays size={17}/> Preparation roadmap</h3><ol className="exam-roadmap-steps">{roadmap[exam].map((step,i)=><li key={step.title}><span className="exam-step-number">0{i+1}</span><div><p className="exam-step-period">{step.period}</p><h4>{step.title}</h4><ul>{step.tasks.map(task=><li key={task}>{task}</li>)}</ul></div></li>)}</ol><div className="exam-week-note"><strong>Simple weekly rhythm</strong><span>Concept learning → timed questions → revise mistakes → one planned test. Adjust study time around school and rest.</span></div></section>
   <aside className="exam-roadmap-side"><section className="exam-roadmap-panel"><h3><BookOpen size={17}/> Official study resources</h3><div className="exam-resource-links">{resources[exam].map(item=><a key={item.url} href={item.url} target="_blank" rel="noreferrer"><span><strong>{item.label}</strong><small>{item.note}</small></span><ArrowUpRight size={16}/></a>)}</div></section>
    <section className="exam-roadmap-panel college-shortlist"><h3><GraduationCap size={18}/> Main colleges to explore</h3><p>Shortlist by course, fees, location and facilities. The route shown is the usual admission route; confirm this year’s rules.</p><ul>{colleges[exam].map(item=><li key={item.name}><a href={item.url} target="_blank" rel="noreferrer"><strong>{item.name}</strong><small>{item.route}</small></a></li>)}</ul></section>
   </aside>
  </div>
  {(track==='tg'||track==='ap')&&<section className="exam-roadmap-panel rank-predictor"><div className="rank-predictor-heading"><div><span className="eyebrow">HISTORICAL CUTOFF GUIDE</span><h3>Explore colleges by {track==='tg'?'TG':'AP'} EAPCET rank</h3><p>{track==='tg'?'Compare selected colleges with the official 2025 second-phase Open Category cutoffs.':'Compare selected colleges with published 2025 open-category closing ranks for CSE and ECE.'}</p></div><Target size={23}/></div>
   <div className="rank-predictor-controls"><label>Your rank<input type="number" min="1" inputMode="numeric" value={rank} onChange={event=>setRank(event.target.value)} placeholder="For example, 8,000"/></label><label>Branch<select value={branch} onChange={event=>setBranch(event.target.value as 'CSE'|'ECE')}><option value="CSE">Computer Science (CSE)</option><option value="ECE">Electronics & Communication (ECE)</option></select></label>{track==='tg'?<label>Candidate cutoff<select value={candidate} onChange={event=>setCandidate(event.target.value as 'boys'|'girls')}><option value="boys">Boys / open seats</option><option value="girls">Girls (girls and open seats)</option></select></label>:<div className="rank-predictor-category"><span>Category shown</span><strong>Open / General</strong><small>Reservation cutoffs are not included in this sample.</small></div>}</div>
   {Number(rank)>0&&<div className="rank-results" aria-live="polite">{matches.length?<><h4>Previous-year matches to review</h4><ul>{matches.map(item=><li key={item.college}><span><strong>{item.college}</strong><small>{item.branch} · 2025 last rank {item.closing.toLocaleString('en-IN')}</small></span><span className="rank-match-label">Historical match</span></li>)}</ul></>:<p>No match in this short list. Check the full official cutoff file; other colleges, branches and categories may fit your rank.</p>}</div>}
   <p className="rank-disclaimer">This is a historical comparison, not an admission prediction or guarantee. Cutoffs change by year, counselling phase, category, local area, gender and seat availability. The AP sample uses published 2025 open-category ranks; the TG sample uses the official 2025 second-phase last-rank statement. Confirm the current year’s final notice.</p>
   <a className="rank-official-link" href={track==='tg'?'https://tgeapcet.nic.in/files/TGEAPCET_2025_LASTRANKS_SecondPhase.pdf':'https://engineering.careers360.com/articles/ap-eamcet-cutoff-ranks-college-wise-2026'} target="_blank" rel="noreferrer">{track==='tg'?'Open the official TG EAPCET 2025 cutoff list':'View the 2025 AP EAPCET open-category reference'} <ArrowUpRight size={15}/></a>
  </section>}
  <p className="exam-roadmaps-footnote"><CheckCircle2 size={15}/> Entrance exams are choices based on the college and course. JEE Advanced is only for eligible JEE Main candidates seeking IIT admissions; EAPCET is a separate state route.</p>
 </section>
}
