import {postDegreeOptions} from './post-degree';
import {branches,nodes} from './catalog';
export type ChoiceGuidance={why:string;benefits:string[]};
const study:Record<string,[string,string,string]>={
 inter:['You want to study academic subjects before choosing a degree.','Build foundations in your chosen subject group.','Explore degree routes that accept those subjects.'],
 diploma:['You prefer practical technical study after Class 10.','Learn through workshops and applied subjects.','Explore technical work or eligible B.Tech lateral entry.'],
 iti:['You want focused training in a specific trade.','Practise job-related tasks and workplace safety.','Explore trade jobs and suitable apprenticeships.'],
 vocational:['You want practical training for a particular type of work.','Develop a focused set of skills through practice.','Explore roles that recognise the chosen certificate.'],
 mpc:['You enjoy mathematics, problem-solving and physical science.','Build a base for engineering and physical sciences.','Develop calculation, reasoning and analytical skills.'],
 bipc:['You are interested in living systems, health or biology.','Build foundations for healthcare and life-science study.','Develop observation and scientific reasoning.'],
 commerce:['You like business, accounts, economics or working with numbers.','Learn how money and organisations are managed.','Explore commerce, management and related degree routes.'],
 humanities:['You enjoy reading, writing, society, languages or creative subjects.','Develop research, communication and interpretation skills.','Explore humanities, law and design-related routes.'],
 btech:['You want to use science and mathematics to solve technical problems.','Study a specialised engineering field with practical projects.','Explore engineering roles or further technical study.'],
 lateral:['You have an eligible diploma and want to continue into engineering.','Build a degree-level foundation on your technical training.','Use an approved lateral-entry route where available.'],
 science:['You want a deeper understanding of mathematics or scientific subjects.','Develop analysis and scientific-method skills.','Explore graduate roles, research and further study.'],
 lifescience:['You are curious about living systems, laboratories or agriculture.','Study biological processes and scientific methods.','Explore research or graduate work linked to your course.'],
 medicine:['You want professional training in medicine or dentistry.','Develop clinical knowledge through the required training.','Work towards the profession permitted by your qualification.'],
 allied:['You are interested in patient care, diagnostics or rehabilitation.','Learn the practical skills of a specific health profession.','Prepare for roles linked to that recognised qualification.'],
 business:['You want to understand accounting, business decisions or management.','Build a foundation in commercial and organisational work.','Explore finance, marketing, operations or further study.'],
 arts:['You want to study people, society, languages or ideas in depth.','Strengthen writing, analysis and research.','Explore relevant graduate roles or postgraduate study.'],
 law:['You like reading carefully, reasoning and understanding rules.','Develop legal research and structured writing.','Explore legal roles subject to their qualification requirements.'],
 design:['You enjoy developing visual ideas or improving how products work.','Learn to research, prototype and present your ideas.','Build a portfolio for design opportunities.'],
 apprentice:['You want to develop skills in a supervised workplace.','Apply your training to real tasks.','Gain practical experience; a permanent job is not guaranteed.'],
 technical:['You want to use your trade or diploma skills in practical work.','Develop maintenance, repair and troubleshooting experience.','Explore technician work or a skilled-service business.'],
 engineeringcareer:['You want to apply engineering knowledge to practical problems.','Build technical projects and work experience.','Explore roles connected to your branch and skills.'],
 higher:['You want deeper knowledge for a specific study or career goal.','Develop expertise in an eligible specialisation.','Build advanced projects or research experience.'],
 research:['You enjoy investigating questions and working with evidence.','Develop research methods and analytical skills.','Prepare for further study and research opportunities.'],
 graduate:['You want to explore work that accepts your degree.','Apply communication and analytical skills in practical tasks.','Compare graduate jobs and eligible recruitment routes.'],
 healthcareer:['You want to apply your professional training in healthcare.','Develop patient communication and clinical experience.','Explore roles allowed by your exact qualification.'],
 businesscareer:['You want to use business knowledge in an organisation.','Apply financial, communication or organisational skills.','Compare accounting, marketing and operations roles.'],
 lawcareer:['You want to work with legal questions and obligations.','Apply legal reading, research and writing.','Explore roles with the required professional qualifications.'],
 designcareer:['You want to turn research and visual ideas into finished work.','Develop a portfolio around real design problems.','Compare interaction and visual communication roles.'],
 technician:['You enjoy finding faults and fixing practical problems.','Apply installation and maintenance skills.','Build experience in your recognised trade.'],
 tradebusiness:['You want to provide a service using a trade you know well.','Combine technical work with customer service.','Develop pricing, planning and business skills.'],
 accounting:['You enjoy accurate records, numbers and financial information.','Apply bookkeeping and spreadsheet skills.','Build experience in finance-support tasks.'],
 marketing:['You are interested in customers and how organisations operate.','Use communication, research and analysis.','Build experience through campaigns or process projects.'],
 uxdesigner:['You want to make digital products easier for people to use.','Practise user research, accessibility and prototyping.','Build case studies that explain your design decisions.'],
 visualdesigner:['You enjoy communicating through images, typography and layout.','Develop visual thinking and design-tool skills.','Build a portfolio of original communication work.'],
 legalresearch:['You enjoy investigating legal questions and explaining findings.','Use research and evidence-based writing.','Explore research and compliance work matching your qualifications.'],
 researcher:['You want to investigate a subject in depth.','Develop analysis, research methods and academic writing.','Build experience through supervised research projects.'],
 analyst:['You enjoy organising information and solving business problems.','Use spreadsheets, communication and analysis.','Explore entry roles that accept your degree and skills.'],
 publicservice:['You want to explore a specific public-service recruitment route.','Prepare using its official syllabus and selection stages.','Match your qualification to notified opportunities.'],
 specialist:['You have a field in mind and want advanced knowledge in it.','Develop subject depth through specialised study.','Build advanced projects or research.'],
 healthprofessional:['You want to practise the healthcare profession your course qualifies you for.','Apply professional knowledge through supervised practice.','Develop patient communication and ethical decision-making.'],
};
const roleFit:Record<string,[string,string,string]>={
 'Software developer':['You enjoy building programs and solving problems with code.','Develop applications and software systems.','Practise programming, testing and teamwork.'],
 'Systems engineer':['You like understanding how parts of a computing system work together.','Learn to integrate and maintain systems.','Develop troubleshooting and reliability skills.'],
 'Security analyst':['You are interested in protecting systems and investigating weaknesses.','Develop skills in monitoring and risk analysis.','Practise responsible security work in authorised environments.'],
 'Embedded engineer':['You like programming devices that interact with the physical world.','Combine electronics with software.','Build and test sensor or controller projects.'],
 'VLSI engineer':['You are curious about how integrated circuits are designed.','Develop digital design and verification skills.','Explore specialised chip-design study and projects.'],
 'Communications engineer':['You are interested in how information moves between devices.','Apply signals and communication-system concepts.','Practise simulation and network analysis.'],
 'Electrical engineer':['You enjoy working with electrical systems and machines.','Apply circuit and equipment knowledge.','Develop testing and safety skills.'],
 'Power systems engineer':['You are interested in generation, supply and use of electricity.','Study power-system analysis and reliability.','Explore energy and electrical-network projects.'],
 'Controls engineer':['You like making machines or processes behave predictably.','Apply control theory and automation.','Practise modelling and system tuning.'],
 'Design engineer':['You enjoy turning a technical idea into a workable design.','Develop CAD and engineering-analysis skills.','Build and evaluate mechanical designs.'],
 'Manufacturing engineer':['You are interested in how products are made.','Study production methods and process improvement.','Develop quality and manufacturing-analysis skills.'],
 'Thermal engineer':['You are interested in heat, energy and fluid behaviour.','Apply thermodynamics and heat-transfer concepts.','Explore thermal modelling and design projects.'],
 'Site engineer':['You want to understand how construction work is carried out.','Develop drawing, estimation and coordination skills.','Gain supervised site and safety experience.'],
 'Structural engineer':['You are interested in how structures carry loads safely.','Develop structural modelling and analysis skills.','Explore deeper structural study where roles require it.'],
 'Transport engineer':['You are interested in roads, mobility and transport systems.','Apply planning and analytical methods.','Explore transport and infrastructure projects.'],
 'Data analyst':['You enjoy finding and explaining patterns in information.','Develop statistical and visualisation skills.','Turn data into clear, evidence-based findings.'],
 'Data engineer':['You like organising data and building reliable systems around it.','Develop database and data-processing skills.','Build pipelines that prepare data for use.'],
 'ML engineer with relevant skills':['You enjoy mathematics, programming and evaluating models.','Develop machine-learning and software skills.','Explore deeper model development through projects or further study.'],
 'Application developer':['You want to build useful applications for users.','Develop programming and database skills.','Practise building, testing and improving software.'],
 'Cloud associate':['You are interested in how online services are deployed and operated.','Develop infrastructure and networking knowledge.','Practise deployment and monitoring in learning environments.'],
 'IT systems analyst':['You like connecting user needs with technical solutions.','Develop requirements and systems-analysis skills.','Practise communication between users and technical teams.'],
 'Process engineer':['You enjoy understanding and improving industrial processes.','Apply process modelling and analysis.','Develop safety and efficiency knowledge.'],
 'Production engineer':['You are interested in how industrial production is organised.','Apply process and equipment knowledge.','Develop quality, planning and safety skills.'],
 'Quality engineer':['You enjoy checking how consistently a product or process meets requirements.','Develop measurement and analysis skills.','Practise investigating defects and improving processes.'],
 'Work and internships':['Develop projects, practical skills and interview preparation.','Build practical projects and a technical portfolio of work.','Develop industry-ready technical skills and prepare for internships and interviews.'],
 'M.Tech / M.E.':['Further study in an engineering specialisation.','Gain advanced subject depth in an engineering specialisation.','Prepare for specialised engineering R&D, design or technical leadership.'],
 'M.S. / Research':['Explore advanced study and research programmes.','Develop scientific inquiry, experimental investigation and research methodology.','Explore research opportunities, university fellowships and international programmes.'],
 'MBA / Management':['Explore business and management studies.','Combine technical engineering knowledge with business strategy, finance and operations.','Prepare for product management, consulting or business leadership roles.'],
};
export function choiceGuidance(id:string):ChoiceGuidance{
 const n=nodes[id];
 if(!n)return {why:'Explore this study route.',benefits:['Build knowledge relevant to this field.','Explore the next study or career stage.']};
 const direction=postDegreeOptions[('post-'+id.split('-').at(-1)) as keyof typeof postDegreeOptions];
 if(direction)return {why:direction.description,benefits:direction.skills.slice(0,2).map(skill=>'Develop '+skill.toLowerCase()+'.')};
 const specific=study[id]||roleFit[n.title]||study[n.title];
 if(specific)return {why:specific[0],benefits:specific.slice(1)};
 const branch=branches.find(b=>b.id===n.branch);
 if(branch&&id.startsWith('branch-'))return {why:branch.fit,benefits:[`Study ${branch.subjects.slice(0,3).join(', ').toLowerCase()}.`,`Develop ${branch.skills.join(', ').toLowerCase()}.`]};
 return {why:n.description,benefits:n.skills?.slice(0,2).map(skill=>'Develop '+skill.toLowerCase()+'.')||['Build knowledge relevant to this field.','Explore the next study or career stage.']};
}
