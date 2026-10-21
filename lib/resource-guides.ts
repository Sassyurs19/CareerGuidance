import {postDegreeOptions} from './post-degree';
export type ResourceGuide={subjects:{title:string;items:string[]}[];skills:{name:string;practice:string}[];start:string;scope:string;links:{label:string;url:string;note:string}[]};
export const resourceGuides:Record<string,ResourceGuide>={
  "branch-cse": {
    "subjects": [
      {
        "title": "Foundation subjects",
        "items": [
          "Calculus",
          "Linear algebra",
          "Differential equations",
          "Probability and statistics",
          "Engineering physics or chemistry",
          "Programming fundamentals",
          "Engineering graphics",
          "Technical communication"
        ]
      },
      {
        "title": "Computing core",
        "items": [
          "Data structures",
          "Algorithms",
          "Discrete mathematics",
          "Computer architecture",
          "Operating systems",
          "Database management",
          "Computer networks",
          "Theory of computation",
          "Compiler design",
          "Software engineering"
        ]
      },
      {
        "title": "Applied topics & electives",
        "items": [
          "Web development",
          "Information security",
          "Distributed systems",
          "Artificial intelligence",
          "Machine learning",
          "Cloud computing"
        ]
      },
      {
        "title": "Practical work",
        "items": [
          "Programming laboratories",
          "Database projects",
          "Software testing",
          "Team projects"
        ]
      }
    ],
    "skills": [
      {
        "name": "Programming",
        "practice": "Write, test and explain small programs."
      },
      {
        "name": "Algorithms",
        "practice": "Choose a suitable data structure and explain its cost."
      },
      {
        "name": "Databases",
        "practice": "Design tables and write SQL queries."
      },
      {
        "name": "Debugging",
        "practice": "Reproduce a bug and document the fix."
      },
      {
        "name": "Team development",
        "practice": "Use version control and clear documentation."
      }
    ],
    "start": "Strengthen mathematics and logical reasoning; learn one programming language before exploring specialised tools.",
    "scope": "Topics vary by course, institution and elective choice. This is a study overview, not an official semester syllabus.",
    "links": [
      {
        "label": "AICTE model engineering curricula — Volume I",
        "url": "https://www.aicte.gov.in/sites/default/files/ug-vol1.pdf",
        "note": "2018 model reference, not your university’s current semester syllabus."
      },
      {
        "label": "NPTEL subject course catalogue",
        "url": "https://nptel.ac.in/courses",
        "note": "Search for a subject listed here. Many courses require undergraduate foundations."
      }
    ]
  },
  "branch-ece": {
    "subjects": [
      {
        "title": "Foundation subjects",
        "items": [
          "Calculus",
          "Linear algebra",
          "Differential equations",
          "Probability and statistics",
          "Engineering physics or chemistry",
          "Programming fundamentals",
          "Engineering graphics",
          "Technical communication"
        ]
      },
      {
        "title": "Electronics core",
        "items": [
          "Circuit theory",
          "Electronic devices",
          "Analog circuits",
          "Digital logic",
          "Signals and systems",
          "Electromagnetic fields",
          "Control systems",
          "Electronic measurements"
        ]
      },
      {
        "title": "Communication & computing",
        "items": [
          "Analog communication",
          "Digital communication",
          "Digital signal processing",
          "Microprocessors",
          "Microcontrollers",
          "Embedded systems"
        ]
      },
      {
        "title": "Advanced topics & labs",
        "items": [
          "VLSI design",
          "Antennas and propagation",
          "Microwave engineering",
          "Optical communication",
          "Wireless communication",
          "Circuit simulation",
          "Electronics laboratories"
        ]
      }
    ],
    "skills": [
      {
        "name": "Circuit reasoning",
        "practice": "Read a schematic and explain current, voltage and component functions."
      },
      {
        "name": "Programming",
        "practice": "Practise C/C++ and basic embedded logic."
      },
      {
        "name": "Signal analysis",
        "practice": "Interpret a waveform and its frequency content."
      },
      {
        "name": "Simulation",
        "practice": "Compare a circuit model with an expected result."
      },
      {
        "name": "Digital design",
        "practice": "Build logic diagrams; learn HDL later for suitable courses."
      },
      {
        "name": "Measurement & documentation",
        "practice": "Learn instruments and record results under qualified supervision."
      }
    ],
    "start": "Start with school mathematics, electricity and waves. Later, use a circuit simulator before supervised laboratory work.",
    "scope": "Topics vary by course, institution and elective choice. This is a study overview, not an official semester syllabus.",
    "links": [
      {
        "label": "AICTE model engineering curricula — Volume I",
        "url": "https://www.aicte.gov.in/sites/default/files/ug-vol1.pdf",
        "note": "2018 model reference, not your university’s current semester syllabus."
      },
      {
        "label": "NPTEL subject course catalogue",
        "url": "https://nptel.ac.in/courses",
        "note": "Search for a subject listed here. Many courses require undergraduate foundations."
      }
    ]
  },
  "branch-eee": {
    "subjects": [
      {
        "title": "Foundation subjects",
        "items": [
          "Calculus",
          "Linear algebra",
          "Differential equations",
          "Probability and statistics",
          "Engineering physics or chemistry",
          "Programming fundamentals",
          "Engineering graphics",
          "Technical communication"
        ]
      },
      {
        "title": "Electrical core",
        "items": [
          "Circuit analysis",
          "Electromagnetic fields",
          "Electrical machines",
          "Power generation",
          "Power transmission and distribution",
          "Power system analysis",
          "Measurements and instrumentation"
        ]
      },
      {
        "title": "Electronics & control",
        "items": [
          "Analog electronics",
          "Digital electronics",
          "Power electronics",
          "Control systems",
          "Microprocessors",
          "Electric drives"
        ]
      },
      {
        "title": "Advanced topics & labs",
        "items": [
          "Renewable energy",
          "Protection and switchgear",
          "High-voltage engineering",
          "Smart grids",
          "Electrical machine laboratories",
          "Control simulation"
        ]
      }
    ],
    "skills": [
      {
        "name": "Circuit analysis",
        "practice": "Use equations and diagrams to explain circuit behaviour."
      },
      {
        "name": "Modelling",
        "practice": "Simulate a machine or control-system response."
      },
      {
        "name": "Power-system reasoning",
        "practice": "Read a single-line diagram and explain its components."
      },
      {
        "name": "Instrumentation",
        "practice": "Learn safe measurement procedures under supervision."
      },
      {
        "name": "Technical reporting",
        "practice": "Explain efficiency, limitations and engineering assumptions."
      }
    ],
    "start": "Revise electricity, algebra and graphs. Use simulations; live electrical work requires trained supervision.",
    "scope": "Topics vary by course, institution and elective choice. This is a study overview, not an official semester syllabus.",
    "links": [
      {
        "label": "AICTE model engineering curricula — Volume I",
        "url": "https://www.aicte.gov.in/sites/default/files/ug-vol1.pdf",
        "note": "2018 model reference, not your university’s current semester syllabus."
      },
      {
        "label": "NPTEL subject course catalogue",
        "url": "https://nptel.ac.in/courses",
        "note": "Search for a subject listed here. Many courses require undergraduate foundations."
      }
    ]
  },
  "branch-mech": {
    "subjects": [
      {
        "title": "Foundation subjects",
        "items": [
          "Calculus",
          "Linear algebra",
          "Differential equations",
          "Probability and statistics",
          "Engineering physics or chemistry",
          "Programming fundamentals",
          "Engineering graphics",
          "Technical communication"
        ]
      },
      {
        "title": "Mechanical core",
        "items": [
          "Engineering mechanics",
          "Strength of materials",
          "Thermodynamics",
          "Fluid mechanics",
          "Heat transfer",
          "Material science",
          "Theory of machines",
          "Machine design"
        ]
      },
      {
        "title": "Manufacturing & design",
        "items": [
          "Manufacturing processes",
          "Engineering drawing",
          "CAD",
          "Metrology",
          "Industrial engineering",
          "Production planning"
        ]
      },
      {
        "title": "Advanced topics & labs",
        "items": [
          "Mechatronics",
          "Robotics",
          "Finite element methods",
          "Refrigeration and air conditioning",
          "Automobile engineering",
          "Workshop practice",
          "Thermal laboratories"
        ]
      }
    ],
    "skills": [
      {
        "name": "Engineering drawing",
        "practice": "Read dimensions and create a clear technical sketch."
      },
      {
        "name": "CAD",
        "practice": "Model a simple component and explain design choices."
      },
      {
        "name": "Analysis",
        "practice": "Estimate forces, heat flow or motion using suitable assumptions."
      },
      {
        "name": "Manufacturing awareness",
        "practice": "Compare materials and production methods."
      },
      {
        "name": "Measurement",
        "practice": "Record tolerances and observations in supervised practical work."
      }
    ],
    "start": "Start with forces, motion, energy and geometry. Practise technical sketching before advanced CAD.",
    "scope": "Topics vary by course, institution and elective choice. This is a study overview, not an official semester syllabus.",
    "links": [
      {
        "label": "AICTE model engineering curricula — Volume I",
        "url": "https://www.aicte.gov.in/sites/default/files/ug-vol1.pdf",
        "note": "2018 model reference, not your university’s current semester syllabus."
      },
      {
        "label": "NPTEL subject course catalogue",
        "url": "https://nptel.ac.in/courses",
        "note": "Search for a subject listed here. Many courses require undergraduate foundations."
      }
    ]
  },
  "branch-civil": {
    "subjects": [
      {
        "title": "Foundation subjects",
        "items": [
          "Calculus",
          "Linear algebra",
          "Differential equations",
          "Probability and statistics",
          "Engineering physics or chemistry",
          "Programming fundamentals",
          "Engineering graphics",
          "Technical communication"
        ]
      },
      {
        "title": "Civil core",
        "items": [
          "Engineering mechanics",
          "Strength of materials",
          "Structural analysis",
          "Construction materials",
          "Surveying",
          "Soil mechanics",
          "Fluid mechanics"
        ]
      },
      {
        "title": "Infrastructure subjects",
        "items": [
          "Concrete structures",
          "Steel structures",
          "Foundation engineering",
          "Transportation engineering",
          "Environmental engineering",
          "Hydrology",
          "Water resources engineering"
        ]
      },
      {
        "title": "Planning & practical work",
        "items": [
          "Construction management",
          "Estimation and costing",
          "Building planning",
          "Geotechnical laboratories",
          "Material testing",
          "CAD and BIM",
          "Surveying practice"
        ]
      }
    ],
    "skills": [
      {
        "name": "Drawing & spatial thinking",
        "practice": "Read a plan and explain dimensions and scale."
      },
      {
        "name": "Estimation",
        "practice": "Prepare a simple quantity calculation with stated assumptions."
      },
      {
        "name": "Analysis",
        "practice": "Understand loads, soil behaviour and water flow."
      },
      {
        "name": "CAD/BIM",
        "practice": "Learn digital drawing and coordinated building models."
      },
      {
        "name": "Field documentation",
        "practice": "Record observations accurately during supervised visits."
      }
    ],
    "start": "Strengthen geometry, measurement and mechanics. Begin with reading simple plans; structural design needs formal training.",
    "scope": "Topics vary by course, institution and elective choice. This is a study overview, not an official semester syllabus.",
    "links": [
      {
        "label": "AICTE model engineering curricula — Volume I",
        "url": "https://www.aicte.gov.in/sites/default/files/ug-vol1.pdf",
        "note": "2018 model reference, not your university’s current semester syllabus."
      },
      {
        "label": "NPTEL subject course catalogue",
        "url": "https://nptel.ac.in/courses",
        "note": "Search for a subject listed here. Many courses require undergraduate foundations."
      }
    ]
  },
  "branch-ai": {
    "subjects": [
      {
        "title": "Mathematics & computing",
        "items": [
          "Linear algebra",
          "Calculus",
          "Probability",
          "Statistics",
          "Discrete mathematics",
          "Python programming",
          "Data structures",
          "Algorithms",
          "Database management"
        ]
      },
      {
        "title": "Data & AI core",
        "items": [
          "Data cleaning",
          "Exploratory data analysis",
          "Machine learning",
          "Artificial intelligence",
          "Data visualisation",
          "Data engineering",
          "Model evaluation"
        ]
      },
      {
        "title": "Advanced topics & practice",
        "items": [
          "Deep learning",
          "Natural language processing",
          "Computer vision",
          "Big-data systems",
          "Optimisation",
          "Responsible AI",
          "Data projects"
        ]
      }
    ],
    "skills": [
      {
        "name": "Python & SQL",
        "practice": "Write reproducible code and query structured data."
      },
      {
        "name": "Statistical reasoning",
        "practice": "Explain uncertainty and distinguish correlation from causation."
      },
      {
        "name": "Data preparation",
        "practice": "Document missing values, errors and assumptions."
      },
      {
        "name": "Model evaluation",
        "practice": "Use appropriate validation and compare against a simple baseline."
      },
      {
        "name": "Responsible data use",
        "practice": "Respect privacy and discuss bias and limitations."
      },
      {
        "name": "Communication",
        "practice": "Explain a chart and its limitations without exaggerating findings."
      }
    ],
    "start": "Start with mathematics, probability and basic programming. Understanding data matters before using advanced models.",
    "scope": "Topics vary by course, institution and elective choice. This is a study overview, not an official semester syllabus.",
    "links": [
      {
        "label": "AICTE model engineering curricula — Volume I",
        "url": "https://www.aicte.gov.in/sites/default/files/ug-vol1.pdf",
        "note": "2018 model reference, not your university’s current semester syllabus."
      },
      {
        "label": "NPTEL subject course catalogue",
        "url": "https://nptel.ac.in/courses",
        "note": "Search for a subject listed here. Many courses require undergraduate foundations."
      }
    ]
  },
  "branch-it": {
    "subjects": [
      {
        "title": "Foundation subjects",
        "items": [
          "Calculus",
          "Linear algebra",
          "Differential equations",
          "Probability and statistics",
          "Engineering physics or chemistry",
          "Programming fundamentals",
          "Engineering graphics",
          "Technical communication"
        ]
      },
      {
        "title": "Computing foundations",
        "items": [
          "Programming",
          "Data structures",
          "Algorithms",
          "Discrete mathematics",
          "Computer architecture",
          "Operating systems",
          "Database systems",
          "Computer networks"
        ]
      },
      {
        "title": "Application subjects",
        "items": [
          "Web technologies",
          "Software engineering",
          "Information systems",
          "Systems analysis",
          "Information security",
          "Human-computer interaction"
        ]
      },
      {
        "title": "Advanced topics & practice",
        "items": [
          "Cloud computing",
          "Mobile applications",
          "Network administration",
          "Distributed systems",
          "Data analytics",
          "Application testing",
          "Deployment projects"
        ]
      }
    ],
    "skills": [
      {
        "name": "Application development",
        "practice": "Build a small usable interface and explain its behaviour."
      },
      {
        "name": "SQL & data modelling",
        "practice": "Organise records and write safe queries."
      },
      {
        "name": "Networking",
        "practice": "Explain how devices communicate and troubleshoot simple issues."
      },
      {
        "name": "Testing",
        "practice": "Check normal cases, invalid input and error handling."
      },
      {
        "name": "Deployment & teamwork",
        "practice": "Learn version control, documentation and basic service operation."
      }
    ],
    "start": "Learn programming and how websites work, then build a small application with clear inputs and outputs.",
    "scope": "Topics vary by course, institution and elective choice. This is a study overview, not an official semester syllabus.",
    "links": [
      {
        "label": "AICTE model engineering curricula — Volume I",
        "url": "https://www.aicte.gov.in/sites/default/files/ug-vol1.pdf",
        "note": "2018 model reference, not your university’s current semester syllabus."
      },
      {
        "label": "NPTEL subject course catalogue",
        "url": "https://nptel.ac.in/courses",
        "note": "Search for a subject listed here. Many courses require undergraduate foundations."
      }
    ]
  },
  "branch-chemical": {
    "subjects": [
      {
        "title": "Chemical foundations",
        "items": [
          "Engineering mathematics",
          "Physical chemistry",
          "Organic chemistry fundamentals",
          "Material and energy balances",
          "Fluid mechanics",
          "Chemical engineering thermodynamics"
        ]
      },
      {
        "title": "Process subjects",
        "items": [
          "Heat transfer",
          "Mass transfer",
          "Chemical reaction engineering",
          "Mechanical operations",
          "Separation processes",
          "Process instrumentation",
          "Process control"
        ]
      },
      {
        "title": "Design & practical work",
        "items": [
          "Process equipment design",
          "Plant design and economics",
          "Process safety",
          "Environmental engineering",
          "Transport phenomena",
          "Process simulation",
          "Unit-operations laboratories"
        ]
      }
    ],
    "skills": [
      {
        "name": "Balances",
        "practice": "Track material and energy through a simple process."
      },
      {
        "name": "Process diagrams",
        "practice": "Read a flow diagram and explain each stage."
      },
      {
        "name": "Modelling",
        "practice": "Use equations and simulation with explicit assumptions."
      },
      {
        "name": "Data analysis",
        "practice": "Compare measured and predicted process performance."
      },
      {
        "name": "Safety & communication",
        "practice": "Recognise hazards and document procedures during supervised training."
      }
    ],
    "start": "Strengthen chemistry, mathematics and units of measurement. Use diagrams and simulations rather than unsupervised chemical experiments.",
    "scope": "Topics vary by course, institution and elective choice. This is a study overview, not an official semester syllabus.",
    "links": [
      {
        "label": "AICTE model engineering curricula — Volume II",
        "url": "https://www.aicte.gov.in/sites/default/files/ug-vol2.pdf",
        "note": "Model reference for broad course coverage; check your institution’s current syllabus."
      },
      {
        "label": "NPTEL subject course catalogue",
        "url": "https://nptel.ac.in/courses",
        "note": "Search for a subject listed here. Many courses require undergraduate foundations."
      }
    ]
  },
  "inter": {
    "subjects": [
      {
        "title": "Choose a subject combination",
        "items": [
          "Science with mathematics",
          "Science with biology",
          "Commerce combinations",
          "Humanities combinations"
        ]
      },
      {
        "title": "Alongside your chosen subjects",
        "items": [
          "Languages",
          "Practical work where applicable",
          "Internal assessments",
          "Optional subjects offered by your board"
        ]
      }
    ],
    "skills": [
      {
        "name": "Study planning",
        "practice": "Use a weekly timetable for your actual subjects."
      },
      {
        "name": "Reading & writing",
        "practice": "Explain concepts in your own words."
      },
      {
        "name": "Revision",
        "practice": "Solve questions and review mistakes."
      }
    ],
    "start": "Compare the combinations offered by your college with the subjects required for your intended degree.",
    "scope": "These are alternative combinations, not subjects every student must study together. AP, Telangana and other boards may use different combinations.",
    "links": [
      {
        "label": "CBSE senior-secondary subject syllabuses",
        "url": "https://cbseacademic.nic.in/curriculum_2027.html",
        "note": "2026–27 reference. Use your own board syllabus if you study under a different board."
      }
    ]
  },
  "mpc": {
    "subjects": [
      {
        "title": "Mathematics",
        "items": [
          "Algebra",
          "Trigonometry",
          "Coordinate geometry",
          "Calculus",
          "Vectors",
          "Probability"
        ]
      },
      {
        "title": "Physics",
        "items": [
          "Mechanics",
          "Heat and thermodynamics",
          "Waves",
          "Electricity and magnetism",
          "Optics",
          "Modern physics"
        ]
      },
      {
        "title": "Chemistry",
        "items": [
          "Physical chemistry",
          "Inorganic chemistry",
          "Organic chemistry",
          "Practical chemistry"
        ]
      }
    ],
    "skills": [
      {
        "name": "Mathematical reasoning",
        "practice": "Show each step and check units."
      },
      {
        "name": "Scientific problem-solving",
        "practice": "Connect a formula to the situation it describes."
      },
      {
        "name": "Laboratory records",
        "practice": "Record observations carefully in supervised classes."
      }
    ],
    "start": "Strengthen Class 10 algebra, trigonometry and science before entrance-level questions.",
    "scope": "Topics vary by course, institution and elective choice. This is a study overview, not an official semester syllabus.",
    "links": [
      {
        "label": "CBSE senior-secondary subject syllabuses",
        "url": "https://cbseacademic.nic.in/curriculum_2027.html",
        "note": "2026–27 reference. Use your own board syllabus if you study under a different board."
      }
    ]
  },
  "bipc": {
    "subjects": [
      {
        "title": "Biology",
        "items": [
          "Cell biology",
          "Plant physiology",
          "Human physiology",
          "Genetics",
          "Evolution",
          "Ecology",
          "Biotechnology"
        ]
      },
      {
        "title": "Physics & chemistry",
        "items": [
          "Mechanics",
          "Electricity",
          "Optics",
          "Physical chemistry",
          "Organic chemistry",
          "Inorganic chemistry"
        ]
      },
      {
        "title": "Practical learning",
        "items": [
          "Biological diagrams",
          "Observation",
          "Laboratory records"
        ]
      }
    ],
    "skills": [
      {
        "name": "Concept understanding",
        "practice": "Explain biological processes rather than only memorising."
      },
      {
        "name": "Scientific reading",
        "practice": "Interpret diagrams, graphs and evidence."
      },
      {
        "name": "Consistent revision",
        "practice": "Connect related topics and practise questions."
      }
    ],
    "start": "Begin with school biology and chemistry. Check whether your intended course needs any additional subjects.",
    "scope": "Topics vary by course, institution and elective choice. This is a study overview, not an official semester syllabus.",
    "links": [
      {
        "label": "CBSE senior-secondary subject syllabuses",
        "url": "https://cbseacademic.nic.in/curriculum_2027.html",
        "note": "2026–27 reference. Use your own board syllabus if you study under a different board."
      }
    ]
  },
  "commerce": {
    "subjects": [
      {
        "title": "Common study areas",
        "items": [
          "Accountancy",
          "Business studies",
          "Economics",
          "Languages"
        ]
      },
      {
        "title": "Depending on combination",
        "items": [
          "Mathematics",
          "Statistics",
          "Computer applications",
          "Civics"
        ]
      }
    ],
    "skills": [
      {
        "name": "Numeracy",
        "practice": "Calculate percentages and explain a budget."
      },
      {
        "name": "Accounting logic",
        "practice": "Understand how transactions affect records."
      },
      {
        "name": "Communication",
        "practice": "Write a clear business explanation."
      },
      {
        "name": "Spreadsheets",
        "practice": "Organise a small fictional dataset."
      }
    ],
    "start": "Check the actual MEC, CEC or other combination offered; mathematics requirements for later degrees differ.",
    "scope": "Topics vary by course, institution and elective choice. This is a study overview, not an official semester syllabus.",
    "links": [
      {
        "label": "CBSE senior-secondary subject syllabuses",
        "url": "https://cbseacademic.nic.in/curriculum_2027.html",
        "note": "2026–27 reference. Use your own board syllabus if you study under a different board."
      }
    ]
  },
  "humanities": {
    "subjects": [
      {
        "title": "Subject choices",
        "items": [
          "History",
          "Political science",
          "Geography",
          "Economics",
          "Sociology",
          "Psychology",
          "Languages"
        ]
      },
      {
        "title": "Depending on school",
        "items": [
          "Fine arts",
          "Legal studies",
          "Media studies",
          "Mathematics"
        ]
      }
    ],
    "skills": [
      {
        "name": "Reading",
        "practice": "Identify the main argument and evidence."
      },
      {
        "name": "Writing",
        "practice": "Build a clear paragraph with reasons."
      },
      {
        "name": "Research",
        "practice": "Distinguish sources and acknowledge them."
      }
    ],
    "start": "Choose subjects you want to study in depth and check the requirements of possible degrees.",
    "scope": "Subject choices vary. These are examples, not a compulsory combination.",
    "links": [
      {
        "label": "CBSE senior-secondary subject syllabuses",
        "url": "https://cbseacademic.nic.in/curriculum_2027.html",
        "note": "2026–27 reference. Use your own board syllabus if you study under a different board."
      }
    ]
  },
  "diploma": {
    "subjects": [
      {
        "title": "Shared foundations",
        "items": [
          "Applied mathematics",
          "Applied science",
          "Engineering drawing",
          "Communication",
          "Workshop practice"
        ]
      },
      {
        "title": "Branch examples — choose one",
        "items": [
          "Computer engineering",
          "Electronics",
          "Electrical engineering",
          "Mechanical engineering",
          "Civil engineering"
        ]
      },
      {
        "title": "Within your chosen branch",
        "items": [
          "Technical theory",
          "Laboratories",
          "Projects",
          "Industrial training where prescribed"
        ]
      }
    ],
    "skills": [
      {
        "name": "Applied problem-solving",
        "practice": "Connect classroom ideas to a practical task."
      },
      {
        "name": "Drawing & measurement",
        "practice": "Read diagrams and use units correctly."
      },
      {
        "name": "Technical records",
        "practice": "Document supervised work and results."
      }
    ],
    "start": "Choose a recognised branch and obtain its state-board syllabus. Compare its further-study and work options.",
    "scope": "There is no single diploma syllabus. Branch and state-board subjects differ; use the engineering folders for an introduction, not as a diploma syllabus.",
    "links": [
      {
        "label": "NPTEL subject course catalogue",
        "url": "https://nptel.ac.in/courses",
        "note": "Search for a subject listed here. Many courses require undergraduate foundations."
      }
    ]
  },
  "iti": {
    "subjects": [
      {
        "title": "Common training areas",
        "items": [
          "Employability skills",
          "Workplace safety",
          "Trade theory",
          "Trade practical"
        ]
      },
      {
        "title": "Trade-dependent subjects",
        "items": [
          "Workshop calculation and science",
          "Engineering drawing",
          "Tools and measurement",
          "Equipment maintenance"
        ]
      },
      {
        "title": "Trade examples — alternatives",
        "items": [
          "Electrician",
          "Fitter",
          "Welder",
          "Computer operator and programming assistant"
        ]
      }
    ],
    "skills": [
      {
        "name": "Trade practice",
        "practice": "Learn each operation under qualified supervision."
      },
      {
        "name": "Safety",
        "practice": "Follow workshop procedures and identify hazards."
      },
      {
        "name": "Fault-finding",
        "practice": "Record the problem and a systematic diagnosis."
      },
      {
        "name": "Work habits",
        "practice": "Maintain tools, records and punctuality."
      }
    ],
    "start": "Open the DGT trade list and choose the exact trade before comparing its syllabus and qualification.",
    "scope": "Topics vary by course, institution and elective choice. This is a study overview, not an official semester syllabus.",
    "links": [
      {
        "label": "DGT trade-wise curricula",
        "url": "https://dgt.gov.in/en/cts-details",
        "note": "Choose the exact trade to find its syllabus and entry qualification."
      }
    ]
  },
  "vocational": {
    "subjects": [
      {
        "title": "Depends on the chosen occupation",
        "items": [
          "Digital services",
          "Retail operations",
          "Hospitality",
          "Office support",
          "Design services"
        ]
      },
      {
        "title": "Common learning areas",
        "items": [
          "Occupational tasks",
          "Customer communication",
          "Digital literacy",
          "Safety",
          "Workplace practice"
        ]
      }
    ],
    "skills": [
      {
        "name": "Job-specific practice",
        "practice": "Demonstrate the tasks named in the course."
      },
      {
        "name": "Communication",
        "practice": "Understand a request and explain your work."
      },
      {
        "name": "Reliability",
        "practice": "Follow a checklist and meet agreed standards."
      }
    ],
    "start": "Ask for the recognised qualification, curriculum, assessments and progression route before enrolling.",
    "scope": "Examples are different courses, not a combined syllabus.",
    "links": [
      {
        "label": "SWAYAM learning catalogue",
        "url": "https://swayam.gov.in/",
        "note": "Browse by subject and read the level, prerequisites and availability of each course."
      }
    ]
  },
  "apprentice": {
    "subjects": [
      {
        "title": "Workplace training",
        "items": [
          "Occupational safety",
          "Tools and processes",
          "Quality checks",
          "Technical records",
          "Trade-specific instruction",
          "Workplace communication"
        ]
      }
    ],
    "skills": [
      {
        "name": "Supervised practice",
        "practice": "Follow the training plan and keep a work log."
      },
      {
        "name": "Problem reporting",
        "practice": "Explain a fault without taking unsafe shortcuts."
      },
      {
        "name": "Professional conduct",
        "practice": "Follow the contract and workplace procedures."
      }
    ],
    "start": "Read the exact apprenticeship advertisement and training plan; job offers after training are not guaranteed.",
    "scope": "Topics vary by course, institution and elective choice. This is a study overview, not an official semester syllabus.",
    "links": [
      {
        "label": "DGT trade-wise curricula",
        "url": "https://dgt.gov.in/en/cts-details",
        "note": "Choose the exact trade to find its syllabus and entry qualification."
      }
    ]
  },
  "technical": {
    "subjects": [
      {
        "title": "Learn for your exact trade",
        "items": [
          "Technical drawings",
          "Installation principles",
          "Maintenance",
          "Fault diagnosis",
          "Quality control",
          "Safety procedures"
        ]
      },
      {
        "title": "For service work",
        "items": [
          "Job estimates",
          "Service records",
          "Customer communication"
        ]
      }
    ],
    "skills": [
      {
        "name": "Diagnosis",
        "practice": "Use a repeatable method to identify a problem."
      },
      {
        "name": "Documentation",
        "practice": "Record work completed and unresolved issues."
      },
      {
        "name": "Customer service",
        "practice": "Explain scope, cost and limitations clearly."
      }
    ],
    "start": "Choose a specific trade and recognised training; only undertake work you are trained and authorised to perform.",
    "scope": "Topics vary by course, institution and elective choice. This is a study overview, not an official semester syllabus.",
    "links": [
      {
        "label": "DGT trade-wise curricula",
        "url": "https://dgt.gov.in/en/cts-details",
        "note": "Choose the exact trade to find its syllabus and entry qualification."
      }
    ]
  },
  "btech": {
    "subjects": [
      {
        "title": "Foundation subjects",
        "items": [
          "Calculus",
          "Linear algebra",
          "Differential equations",
          "Probability and statistics",
          "Engineering physics or chemistry",
          "Programming fundamentals",
          "Engineering graphics",
          "Technical communication"
        ]
      },
      {
        "title": "After choosing a branch",
        "items": [
          "Branch core subjects",
          "Professional electives",
          "Laboratories",
          "Projects",
          "Internship or practical training as prescribed"
        ]
      }
    ],
    "skills": [
      {
        "name": "Mathematics",
        "practice": "Build fluency with algebra, calculus and basic modelling."
      },
      {
        "name": "Problem-solving",
        "practice": "Explain assumptions and compare possible solutions."
      },
      {
        "name": "Technical communication",
        "practice": "Write reports and discuss project results."
      }
    ],
    "start": "Compare branch syllabuses and entry routes before choosing an engineering programme.",
    "scope": "This is a common overview. Open a branch folder for detailed topics; lateral entry does not mean every diploma can enter every branch.",
    "links": [
      {
        "label": "AICTE model engineering curricula — Volume I",
        "url": "https://www.aicte.gov.in/sites/default/files/ug-vol1.pdf",
        "note": "2018 model reference, not your university’s current semester syllabus."
      },
      {
        "label": "NPTEL subject course catalogue",
        "url": "https://nptel.ac.in/courses",
        "note": "Search for a subject listed here. Many courses require undergraduate foundations."
      }
    ]
  },
  "lateral": {
    "subjects": [
      {
        "title": "Foundation subjects",
        "items": [
          "Calculus",
          "Linear algebra",
          "Differential equations",
          "Probability and statistics",
          "Engineering physics or chemistry",
          "Programming fundamentals",
          "Engineering graphics",
          "Technical communication"
        ]
      },
      {
        "title": "After choosing a branch",
        "items": [
          "Branch core subjects",
          "Professional electives",
          "Laboratories",
          "Projects",
          "Internship or practical training as prescribed"
        ]
      }
    ],
    "skills": [
      {
        "name": "Mathematics",
        "practice": "Build fluency with algebra, calculus and basic modelling."
      },
      {
        "name": "Problem-solving",
        "practice": "Explain assumptions and compare possible solutions."
      },
      {
        "name": "Technical communication",
        "practice": "Write reports and discuss project results."
      }
    ],
    "start": "Check diploma-to-degree branch mapping and any bridge subjects before applying.",
    "scope": "This is a common overview. Open a branch folder for detailed topics; lateral entry does not mean every diploma can enter every branch.",
    "links": [
      {
        "label": "AICTE model engineering curricula — Volume I",
        "url": "https://www.aicte.gov.in/sites/default/files/ug-vol1.pdf",
        "note": "2018 model reference, not your university’s current semester syllabus."
      },
      {
        "label": "NPTEL subject course catalogue",
        "url": "https://nptel.ac.in/courses",
        "note": "Search for a subject listed here. Many courses require undergraduate foundations."
      }
    ]
  },
  "science": {
    "subjects": [
      {
        "title": "Choose a main discipline",
        "items": [
          "Mathematics",
          "Physics",
          "Chemistry",
          "Computer science",
          "Statistics"
        ]
      },
      {
        "title": "Across many science degrees",
        "items": [
          "Scientific methods",
          "Laboratory or computational work",
          "Data analysis",
          "Research writing"
        ]
      },
      {
        "title": "Examples of discipline topics",
        "items": [
          "Calculus and algebra",
          "Mechanics and electromagnetism",
          "Organic and physical chemistry",
          "Programming and algorithms"
        ]
      }
    ],
    "skills": [
      {
        "name": "Analytical reasoning",
        "practice": "Explain the evidence behind an answer."
      },
      {
        "name": "Measurement & computation",
        "practice": "Use appropriate methods and record uncertainty."
      },
      {
        "name": "Scientific writing",
        "practice": "Describe a method so someone else can understand it."
      }
    ],
    "start": "Select the exact B.Sc. major; do not assume all science degrees teach the same subjects.",
    "scope": "Topics vary by course, institution and elective choice. This is a study overview, not an official semester syllabus.",
    "links": [
      {
        "label": "SWAYAM learning catalogue",
        "url": "https://swayam.gov.in/",
        "note": "Browse by subject and read the level, prerequisites and availability of each course."
      },
      {
        "label": "NPTEL subject course catalogue",
        "url": "https://nptel.ac.in/courses",
        "note": "Search for a subject listed here. Many courses require undergraduate foundations."
      }
    ]
  },
  "lifescience": {
    "subjects": [
      {
        "title": "Life-science foundations",
        "items": [
          "Cell biology",
          "Genetics",
          "Biochemistry",
          "Microbiology",
          "Ecology",
          "Molecular biology"
        ]
      },
      {
        "title": "Programme-dependent specialisation",
        "items": [
          "Biotechnology",
          "Plant science",
          "Animal science",
          "Agronomy",
          "Soil science",
          "Crop protection"
        ]
      },
      {
        "title": "Practical work",
        "items": [
          "Laboratory methods",
          "Field observations",
          "Biostatistics",
          "Research projects"
        ]
      }
    ],
    "skills": [
      {
        "name": "Observation",
        "practice": "Record biological observations accurately."
      },
      {
        "name": "Data handling",
        "practice": "Summarise results without overstating them."
      },
      {
        "name": "Laboratory practice",
        "practice": "Follow supervised methods and biosafety procedures."
      }
    ],
    "start": "Separate biotechnology, microbiology and agriculture options; compare their individual curricula.",
    "scope": "Topics vary by course, institution and elective choice. This is a study overview, not an official semester syllabus.",
    "links": [
      {
        "label": "SWAYAM learning catalogue",
        "url": "https://swayam.gov.in/",
        "note": "Browse by subject and read the level, prerequisites and availability of each course."
      },
      {
        "label": "ICAR undergraduate agriculture curriculum reference",
        "url": "https://ebook.icar.org.in/index.php/bookprocess/catalog/book/15",
        "note": "Agriculture-programme reference. Biotechnology and other life-science courses have different syllabuses."
      }
    ]
  },
  "medicine": {
    "subjects": [
      {
        "title": "Medical foundations",
        "items": [
          "Anatomy",
          "Physiology",
          "Biochemistry"
        ]
      },
      {
        "title": "Medical disciplines",
        "items": [
          "Pathology",
          "Microbiology",
          "Pharmacology",
          "Forensic medicine",
          "Community medicine"
        ]
      },
      {
        "title": "Clinical study in MBBS",
        "items": [
          "Medicine",
          "Surgery",
          "Paediatrics",
          "Obstetrics and gynaecology",
          "Related clinical postings"
        ]
      },
      {
        "title": "Dental programmes — different curriculum",
        "items": [
          "Dental anatomy",
          "Oral pathology",
          "Dental materials",
          "Conservative dentistry",
          "Orthodontics",
          "Oral surgery"
        ]
      }
    ],
    "skills": [
      {
        "name": "Scientific foundations",
        "practice": "Build strong biology and chemistry concepts."
      },
      {
        "name": "Professional communication",
        "practice": "Develop careful listening and respectful explanations."
      },
      {
        "name": "Clinical learning",
        "practice": "Acquire clinical competencies only through recognised supervised training."
      },
      {
        "name": "Ethics",
        "practice": "Understand confidentiality and professional responsibilities."
      }
    ],
    "start": "Choose medicine or dentistry first. Check the relevant official curriculum and recognised institution.",
    "scope": "MBBS and BDS are different qualifications. The medical reference supports MBBS; confirm dentistry subjects with the relevant dental authority and institution.",
    "links": [
      {
        "label": "NMC undergraduate medical curriculum",
        "url": "https://www.nmc.org.in/information-desk/for-colleges/ug-curriculum/1000/",
        "note": "Medical curriculum reference. Confirm the version applicable to your admission batch."
      },
      {
        "label": "Official dental curriculum regulations",
        "url": "https://dciindia.gov.in/GazetteList.aspx",
        "note": "Find the BDS regulations and applicable amendments; dentistry has its own curriculum."
      }
    ]
  },
  "allied": {
    "subjects": [
      {
        "title": "Shared foundations in many programmes",
        "items": [
          "Anatomy",
          "Physiology",
          "Microbiology",
          "Professional ethics",
          "Communication"
        ]
      },
      {
        "title": "Nursing examples",
        "items": [
          "Nursing foundations",
          "Adult health nursing",
          "Community health nursing",
          "Child health nursing",
          "Mental health nursing"
        ]
      },
      {
        "title": "Allied-health alternatives",
        "items": [
          "Physiotherapy: movement and rehabilitation",
          "Laboratory technology: diagnostic laboratory sciences",
          "Imaging technology: imaging science and safety"
        ]
      }
    ],
    "skills": [
      {
        "name": "Communication",
        "practice": "Explain clearly and listen respectfully."
      },
      {
        "name": "Observation & records",
        "practice": "Record information accurately."
      },
      {
        "name": "Professional practice",
        "practice": "Learn course-specific competencies under supervision."
      }
    ],
    "start": "Choose the exact profession before comparing degrees; nursing, physiotherapy and laboratory technology are not interchangeable.",
    "scope": "These are separate professional programmes with different recognised curricula and registration requirements.",
    "links": [
      {
        "label": "Indian Nursing Council programme guidelines",
        "url": "https://indiannursingcouncil.org/nursing-programs-guidelines",
        "note": "Nursing-specific guidance; other allied-health professions have different curricula and authorities."
      }
    ]
  },
  "healthcareer": {
    "subjects": [
      {
        "title": "Based on the chosen profession",
        "items": [
          "Professional core knowledge",
          "Supervised clinical practice",
          "Professional ethics",
          "Record keeping",
          "Continuing education"
        ]
      }
    ],
    "skills": [
      {
        "name": "Patient communication",
        "practice": "Learn profession-appropriate communication."
      },
      {
        "name": "Teamwork",
        "practice": "Work within your professional role and responsibilities."
      },
      {
        "name": "Evidence-based learning",
        "practice": "Follow approved training and current professional guidance."
      }
    ],
    "start": "Confirm the qualification, practical training and registration required for the specific profession.",
    "scope": "Topics vary by course, institution and elective choice. This is a study overview, not an official semester syllabus.",
    "links": [
      {
        "label": "NMC undergraduate medical curriculum",
        "url": "https://www.nmc.org.in/information-desk/for-colleges/ug-curriculum/1000/",
        "note": "Medical curriculum reference. Confirm the version applicable to your admission batch."
      },
      {
        "label": "Indian Nursing Council programme guidelines",
        "url": "https://indiannursingcouncil.org/nursing-programs-guidelines",
        "note": "Nursing-specific guidance; other allied-health professions have different curricula and authorities."
      }
    ]
  },
  "business": {
    "subjects": [
      {
        "title": "Commerce foundations",
        "items": [
          "Financial accounting",
          "Business economics",
          "Business law",
          "Business statistics",
          "Taxation fundamentals",
          "Auditing fundamentals"
        ]
      },
      {
        "title": "Management foundations",
        "items": [
          "Marketing",
          "Human-resource management",
          "Operations management",
          "Organisational behaviour",
          "Financial management",
          "Entrepreneurship"
        ]
      },
      {
        "title": "Practical work",
        "items": [
          "Spreadsheets",
          "Business reports",
          "Case studies",
          "Projects"
        ]
      }
    ],
    "skills": [
      {
        "name": "Numerical reasoning",
        "practice": "Explain calculations and business assumptions."
      },
      {
        "name": "Spreadsheets",
        "practice": "Build clear tables and check formulas."
      },
      {
        "name": "Business writing",
        "practice": "Summarise findings and recommendations."
      },
      {
        "name": "Presentation",
        "practice": "Explain a decision with evidence."
      }
    ],
    "start": "Compare B.Com and BBA curricula. Professional accountancy qualifications have separate requirements.",
    "scope": "B.Com and BBA emphasise different areas. Not all topics are compulsory in both.",
    "links": [
      {
        "label": "SWAYAM learning catalogue",
        "url": "https://swayam.gov.in/",
        "note": "Browse by subject and read the level, prerequisites and availability of each course."
      },
      {
        "label": "University of Delhi B.Com curriculum example",
        "url": "https://academicaffairs.du.ac.in/syllabi/b-com-p/",
        "note": "An institution-specific B.Com example. Other universities and BBA programmes may differ."
      }
    ]
  },
  "arts": {
    "subjects": [
      {
        "title": "Choose a discipline",
        "items": [
          "History",
          "Political science",
          "Economics",
          "Sociology",
          "Psychology",
          "Languages and literature",
          "Geography"
        ]
      },
      {
        "title": "Methods and applications",
        "items": [
          "Academic writing",
          "Research methods",
          "Text or source analysis",
          "Fieldwork where prescribed",
          "Communication"
        ]
      }
    ],
    "skills": [
      {
        "name": "Critical reading",
        "practice": "Compare arguments and the sources behind them."
      },
      {
        "name": "Writing",
        "practice": "Build a structured explanation."
      },
      {
        "name": "Research",
        "practice": "Collect and cite evidence appropriately."
      }
    ],
    "start": "Choose a specific major and check whether your intended profession requires further qualifications.",
    "scope": "Topics vary by course, institution and elective choice. This is a study overview, not an official semester syllabus.",
    "links": [
      {
        "label": "SWAYAM learning catalogue",
        "url": "https://swayam.gov.in/",
        "note": "Browse by subject and read the level, prerequisites and availability of each course."
      }
    ]
  },
  "businesscareer": {
    "subjects": [
      {
        "title": "Role-dependent knowledge",
        "items": [
          "Accounting records",
          "Marketing principles",
          "Business operations",
          "Financial analysis",
          "Customer research",
          "Business communication"
        ]
      }
    ],
    "skills": [
      {
        "name": "Spreadsheets",
        "practice": "Organise and analyse business information."
      },
      {
        "name": "Problem-solving",
        "practice": "Explain a process problem and a possible improvement."
      },
      {
        "name": "Communication",
        "practice": "Present concise, accurate recommendations."
      }
    ],
    "start": "Choose the exact role and compare its qualifications and skill requirements.",
    "scope": "Topics vary by course, institution and elective choice. This is a study overview, not an official semester syllabus.",
    "links": [
      {
        "label": "SWAYAM learning catalogue",
        "url": "https://swayam.gov.in/",
        "note": "Browse by subject and read the level, prerequisites and availability of each course."
      },
      {
        "label": "University of Delhi B.Com curriculum example",
        "url": "https://academicaffairs.du.ac.in/syllabi/b-com-p/",
        "note": "An institution-specific B.Com example. Other universities and BBA programmes may differ."
      }
    ]
  },
  "law": {
    "subjects": [
      {
        "title": "Legal foundations",
        "items": [
          "Constitutional law",
          "Contract law",
          "Law of torts",
          "Legal methods",
          "Legal history"
        ]
      },
      {
        "title": "Core legal areas",
        "items": [
          "Criminal law",
          "Family law",
          "Property law",
          "Administrative law",
          "Company law",
          "Environmental law",
          "Evidence and procedure"
        ]
      },
      {
        "title": "Practice and specialisation",
        "items": [
          "Legal writing",
          "Research",
          "Moot courts",
          "Professional ethics",
          "Internships"
        ]
      }
    ],
    "skills": [
      {
        "name": "Reading & reasoning",
        "practice": "Identify the issue, rule and argument in a text."
      },
      {
        "name": "Research",
        "practice": "Use authoritative legal sources and cite them."
      },
      {
        "name": "Writing",
        "practice": "Develop structured, precise arguments."
      },
      {
        "name": "Communication",
        "practice": "Listen carefully and explain a position respectfully."
      }
    ],
    "start": "Compare five-year integrated and graduate-entry law programmes and their recognition.",
    "scope": "Topics are illustrative; course structure and current legal content must be checked with the recognised law institution.",
    "links": [
      {
        "label": "SWAYAM learning catalogue",
        "url": "https://swayam.gov.in/",
        "note": "Browse by subject and read the level, prerequisites and availability of each course."
      },
      {
        "label": "NLSIU integrated law programme and curriculum",
        "url": "https://www.nls.ac.in/programme/ba-llb-hons/",
        "note": "An example of one institution’s law curriculum; not a universal law syllabus."
      }
    ]
  },
  "design": {
    "subjects": [
      {
        "title": "Design foundations",
        "items": [
          "Drawing and observation",
          "Colour",
          "Form",
          "Composition",
          "Materials",
          "Visual communication",
          "Design history"
        ]
      },
      {
        "title": "Methods",
        "items": [
          "User research",
          "Design thinking",
          "Prototyping",
          "Testing and feedback",
          "Portfolio development"
        ]
      },
      {
        "title": "Discipline examples",
        "items": [
          "Product design",
          "Graphic design",
          "Interaction design",
          "Textile design",
          "Animation"
        ]
      }
    ],
    "skills": [
      {
        "name": "Observation",
        "practice": "Explain a real user need."
      },
      {
        "name": "Visual communication",
        "practice": "Use layout and images to communicate clearly."
      },
      {
        "name": "Prototyping",
        "practice": "Make and revise a simple model or mock-up."
      },
      {
        "name": "Portfolio",
        "practice": "Explain the problem, process and improvements."
      }
    ],
    "start": "Explore design disciplines and study portfolio examples before selecting a programme.",
    "scope": "Topics vary by course, institution and elective choice. This is a study overview, not an official semester syllabus.",
    "links": [
      {
        "label": "NID foundation programme",
        "url": "https://www.nid.edu/academics/programmes/bachelor-of-design-bdes/foundation-programme.html",
        "note": "An example of design foundations; each institute offers different disciplines."
      }
    ]
  },
  "lawcareer": {
    "subjects": [
      {
        "title": "Role-dependent preparation",
        "items": [
          "Legal research",
          "Legal writing",
          "Case analysis",
          "Compliance",
          "Professional ethics",
          "Procedure relevant to the role"
        ]
      }
    ],
    "skills": [
      {
        "name": "Research",
        "practice": "Find and verify authoritative sources."
      },
      {
        "name": "Analysis",
        "practice": "Distinguish facts, rules and conclusions."
      },
      {
        "name": "Writing",
        "practice": "Prepare clear, well-supported notes."
      }
    ],
    "start": "Practice, research and compliance roles have different qualification and professional requirements.",
    "scope": "Topics vary by course, institution and elective choice. This is a study overview, not an official semester syllabus.",
    "links": [
      {
        "label": "SWAYAM learning catalogue",
        "url": "https://swayam.gov.in/",
        "note": "Browse by subject and read the level, prerequisites and availability of each course."
      },
      {
        "label": "NLSIU integrated law programme and curriculum",
        "url": "https://www.nls.ac.in/programme/ba-llb-hons/",
        "note": "An example of one institution’s law curriculum; not a universal law syllabus."
      }
    ]
  },
  "designcareer": {
    "subjects": [
      {
        "title": "Portfolio foundations",
        "items": [
          "Visual principles",
          "Design process",
          "Research",
          "Prototyping",
          "Usability",
          "Professional presentation"
        ]
      }
    ],
    "skills": [
      {
        "name": "Portfolio development",
        "practice": "Show original work and explain decisions."
      },
      {
        "name": "Tool use",
        "practice": "Choose tools suited to the discipline."
      },
      {
        "name": "Feedback",
        "practice": "Use critique to improve the result."
      }
    ],
    "start": "Select a design discipline and tailor your portfolio to its work.",
    "scope": "Topics vary by course, institution and elective choice. This is a study overview, not an official semester syllabus.",
    "links": [
      {
        "label": "NID foundation programme",
        "url": "https://www.nid.edu/academics/programmes/bachelor-of-design-bdes/foundation-programme.html",
        "note": "An example of design foundations; each institute offers different disciplines."
      }
    ]
  },
  "higher": {
    "subjects": [
      {
        "title": "Depends on specialisation",
        "items": [
          "Advanced subject theory",
          "Research methods",
          "Specialist electives",
          "Seminars",
          "Dissertation or capstone project"
        ]
      }
    ],
    "skills": [
      {
        "name": "Subject depth",
        "practice": "Identify gaps in your undergraduate foundations."
      },
      {
        "name": "Academic reading",
        "practice": "Compare research and explain limitations."
      },
      {
        "name": "Independent planning",
        "practice": "Define a realistic study or project question."
      }
    ],
    "start": "Choose the postgraduate programme first, then check accepted degrees, entrance papers and its curriculum.",
    "scope": "Topics vary by course, institution and elective choice. This is a study overview, not an official semester syllabus.",
    "links": [
      {
        "label": "SWAYAM learning catalogue",
        "url": "https://swayam.gov.in/",
        "note": "Browse by subject and read the level, prerequisites and availability of each course."
      },
      {
        "label": "NPTEL subject course catalogue",
        "url": "https://nptel.ac.in/courses",
        "note": "Search for a subject listed here. Many courses require undergraduate foundations."
      }
    ]
  },
  "research": {
    "subjects": [
      {
        "title": "Research preparation",
        "items": [
          "Research methods",
          "Literature review",
          "Statistics or qualitative methods",
          "Research ethics",
          "Academic writing",
          "Discipline-specific tools"
        ]
      }
    ],
    "skills": [
      {
        "name": "Question design",
        "practice": "Define a question that can be investigated."
      },
      {
        "name": "Evidence handling",
        "practice": "Keep accurate records and report limitations."
      },
      {
        "name": "Writing",
        "practice": "Cite sources and distinguish findings from speculation."
      }
    ],
    "start": "Build subject foundations and seek supervised research opportunities.",
    "scope": "Topics vary by course, institution and elective choice. This is a study overview, not an official semester syllabus.",
    "links": [
      {
        "label": "SWAYAM learning catalogue",
        "url": "https://swayam.gov.in/",
        "note": "Browse by subject and read the level, prerequisites and availability of each course."
      }
    ]
  },
  "graduate": {
    "subjects": [
      {
        "title": "Role-dependent preparation",
        "items": [
          "Digital literacy",
          "Spreadsheets",
          "Written communication",
          "Analytical reasoning",
          "Professional presentation",
          "Portfolio preparation"
        ]
      }
    ],
    "skills": [
      {
        "name": "Role research",
        "practice": "Compare job descriptions and required qualifications."
      },
      {
        "name": "Evidence of work",
        "practice": "Keep relevant projects and explain your contribution."
      },
      {
        "name": "Communication",
        "practice": "Practise clear written and spoken explanations."
      }
    ],
    "start": "Choose a specific role before selecting preparation courses. A degree does not make every role eligible.",
    "scope": "Topics vary by course, institution and elective choice. This is a study overview, not an official semester syllabus.",
    "links": [
      {
        "label": "SWAYAM learning catalogue",
        "url": "https://swayam.gov.in/",
        "note": "Browse by subject and read the level, prerequisites and availability of each course."
      }
    ]
  },
  "publicservice": {
    "subjects": [
      {
        "title": "Common examples, not a universal syllabus",
        "items": [
          "Reading comprehension",
          "Quantitative aptitude",
          "Reasoning",
          "General awareness"
        ]
      },
      {
        "title": "Only if the notice specifies them",
        "items": [
          "Subject papers",
          "Language papers",
          "Writing",
          "Computer knowledge",
          "Physical or skill assessments"
        ]
      }
    ],
    "skills": [
      {
        "name": "Notice reading",
        "practice": "Check qualification, age and selection stages."
      },
      {
        "name": "Preparation planning",
        "practice": "Use the exact official syllabus."
      },
      {
        "name": "Practice review",
        "practice": "Track mistakes and revise weak areas."
      }
    ],
    "start": "Select one recruitment notice and use its syllabus; public-service examinations do not share one eligibility rule.",
    "scope": "Topics vary by course, institution and elective choice. This is a study overview, not an official semester syllabus.",
    "links": [
      {
        "label": "SWAYAM learning catalogue",
        "url": "https://swayam.gov.in/",
        "note": "Browse by subject and read the level, prerequisites and availability of each course."
      }
    ]
  }
};

for(const [id,option] of Object.entries(postDegreeOptions)){resourceGuides[id]={start:option.description,scope:"Preparation areas depend on your branch and target programme.",subjects:[{title:"Preparation areas",items:option.skills}],skills:option.steps.map((practice,i)=>({name:"Step "+(i+1),practice})),links:[{label:option.resourceLabel,url:option.resource,note:"Read the current requirements for your target opportunity."}]};}
