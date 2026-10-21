export function subjectResource(course:string,subject:string){
 const school=['inter','mpc','bipc','commerce','humanities'].includes(course);
 const trade=['iti','vocational','apprentice','technical'].includes(course);
 const engineering=course.startsWith('branch-')||['btech','lateral','diploma','post-mtech','post-ms'].includes(course);
 const provider=school?'NCERT':trade?'Bharat Skills':engineering?'NPTEL':'SWAYAM';
 const domain=school?'ncert.nic.in':trade?'bharatskills.gov.in':engineering?'nptel.ac.in':'swayam.gov.in';
 const url=school?'https://ncert.nic.in/textbook.php':trade?'https://bharatskills.gov.in/':engineering?'https://nptel.ac.in/courses':'https://swayam.gov.in/explorer';
 const query=subject.replace(/ or /g,' ');
 const instruction=school?`Open NCERT, select Class 11 or 12, then choose the subject and book. For “${subject}”, find the matching chapter in the contents and download its PDF. Match it to your board syllabus.`:trade?`Choose your trade on Bharat Skills, then open its study material. Look for “${subject}” in the contents of the trade theory or practical book. Use supervised training for practical tasks.`:engineering?`Open NPTEL and enter “${subject}” in Search for courses. Open a relevant course, read its prerequisites and syllabus, then start with the introductory lecture. Notes and transcripts depend on the course.`:`Open SWAYAM and search for “${subject}”. Compare the course level and syllabus before choosing. Availability, enrolment and downloadable materials depend on the course.`;
 const books:Record<string,{title:string;slug:string}>={
 'calculus':{title:'Calculus Volume 1',slug:'calculus-volume-1'},
 'physics':{title:'University Physics Volume 1',slug:'university-physics-volume-1'},
 'chemistry':{title:'Chemistry 2e',slug:'chemistry-2e'},
 'biology':{title:'Biology 2e',slug:'biology-2e'}
 };
 const book=books[subject.toLowerCase()];
 return {provider,url,instruction,query,search:'https://www.google.com/search?q='+encodeURIComponent('site:'+domain+' '+query),book:book?{title:book.title,url:'https://openstax.org/details/books/'+book.slug}:null};
}
