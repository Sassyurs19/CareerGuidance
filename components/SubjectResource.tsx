import {ArrowUpRight} from 'lucide-react';
import {subjectResource} from '../lib/subject-resources';
export default function SubjectResource({course,subject}:{course:string;subject:string}){
 const source=subjectResource(course,subject);
 return <details className="subject-resource"><summary>{subject}<span>Find resources</span></summary><div className="subject-resource-body"><p>{source.instruction}</p><div className="subject-resource-actions"><a href={source.search} target="_blank" rel="noreferrer">Search {source.provider} for this topic <ArrowUpRight size={13}/></a><a href={source.url} target="_blank" rel="noreferrer">Open {source.provider} catalogue <ArrowUpRight size={13}/></a>{source.book&&<a href={source.book.url} target="_blank" rel="noreferrer">E-book: {source.book.title} <ArrowUpRight size={13}/></a>}</div><small>Search phrase: <strong>{source.query}</strong>. Read the course outline or book contents first and match the topic to your syllabus. The search link opens Google results limited to the named source.</small></div></details>;
}
