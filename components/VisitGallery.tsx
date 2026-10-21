 'use client';
import {useRef,useState,useEffect} from 'react';
import {ChevronLeft,ChevronRight,X,Expand} from 'lucide-react';
import styles from './VisitGallery.module.css';
const photos=[
 {id:1,title:'Outside the school office',date:'17 June 2026',position:'center 60%'},
 {id:2,title:'Classroom group photograph',date:'17 June 2026',position:'center 65%'},
 {id:3,title:'Team photograph in the classroom',date:'17 June 2026',position:'center 65%'},
 {id:4,title:'Students in the classroom',date:'17 June 2026',position:'center 75%'},
 {id:5,title:'Our team at the school',date:'17 June 2026',position:'center 65%'},
 {id:6,title:'A further school visit',date:'20 June 2026',position:'center 70%'},
 {id:7,title:'With students in the classroom',date:'20 June 2026',position:'center 65%'}
];
export default function VisitGallery(){
 const strip=useRef<HTMLDivElement>(null),dialog=useRef<HTMLDialogElement>(null),[selected,setSelected]=useState<number|null>(null);
 const [hovered,setHovered]=useState(false),[focused,setFocused]=useState(false),[touching,setTouching]=useState(false),[reduced,setReduced]=useState(true);
 useEffect(()=>{const query=window.matchMedia('(prefers-reduced-motion: reduce)');const sync=()=>setReduced(query.matches);sync();query.addEventListener('change',sync);return()=>query.removeEventListener('change',sync);},[]);
 useEffect(()=>{
  const el=strip.current;if(!el||hovered||focused||touching||reduced||selected!==null)return;
  let frame=0,last=0,position=el.scrollLeft,resetAt=0;
  function step(time:number){
   if(!el)return;
   const elapsed=last?Math.min(time-last,50):0;last=time;
   if(!document.hidden){
    const max=el.scrollWidth-el.clientWidth;
    if(max>0){
     if(position>=max-1){if(!resetAt)resetAt=time+1800;if(time>=resetAt){position=0;el.scrollLeft=0;resetAt=0;}}
     else{position=Math.min(max,position+elapsed*.022);el.scrollLeft=position;}
    }
   }
   frame=requestAnimationFrame(step);
  }
  frame=requestAnimationFrame(step);return()=>cancelAnimationFrame(frame);
 },[hovered,focused,touching,reduced,selected]);
 useEffect(()=>{if(selected===null)return;const el=dialog.current;if(!el)return;el.showModal();const old=document.body.style.overflow;document.body.style.overflow='hidden';return()=>{el.close();document.body.style.overflow=old;};},[selected]);
 function scroll(direction:number){const el=strip.current;if(!el)return;el.scrollBy({left:direction*(el.firstElementChild?.getBoundingClientRect().width||el.clientWidth)+direction*20,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});}
 const photo=selected===null?null:photos[selected];
 return <section className={styles.gallery} aria-labelledby="visit-title" onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)} onFocusCapture={e=>{if(e.target.matches(':focus-visible'))setFocused(true);}} onBlurCapture={e=>{if(!e.currentTarget.contains(e.relatedTarget))setFocused(false);}}><div className={styles.heading}><div><span className={styles.eyebrow}>ZPHS Kanchikacherla</span><h2 id="visit-title">Our school visits</h2><p>Photographs from 17 and 20 June 2026. Scroll through the visits or open a photo to see the complete original.</p></div><div className={styles.controls}><button type="button" onClick={()=>scroll(-1)} aria-label="Scroll to previous photos"><ChevronLeft size={20}/></button><button type="button" onClick={()=>scroll(1)} aria-label="Scroll to next photos"><ChevronRight size={20}/></button></div></div>
 <div className={styles.strip} ref={strip} onTouchStart={()=>setTouching(true)} onTouchEnd={()=>setTouching(false)} onTouchCancel={()=>setTouching(false)} tabIndex={0} role="region" aria-label="School visit photographs" onKeyDown={e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();scroll(e.key==='ArrowRight'?1:-1);}}}>{photos.map((p,i)=><figure className={styles.photo} key={p.id}><button className={styles.imageButton} onClick={()=>setSelected(i)} aria-label={'Open full photo: '+p.title}><img src={'/school-visits/visit-'+p.id+'.png'} alt={p.title+' at ZPHS Kanchikacherla'} loading="lazy" decoding="async" style={{objectPosition:p.position}}/><span className={styles.expand}><Expand size={16}/> View full photo</span></button><figcaption><strong>{p.title}</strong><span>{p.date} · {i+1} / {photos.length}</span></figcaption></figure>)}</div>
 {photo&&<dialog className={styles.dialog} ref={dialog} aria-labelledby="full-photo-title" onCancel={e=>{e.preventDefault();setSelected(null);}} onClick={e=>{if(e.target===e.currentTarget)setSelected(null);}}><div className={styles.dialogTop}><div><h3 id="full-photo-title">{photo.title}</h3><span>{photo.date}</span></div><button autoFocus onClick={()=>setSelected(null)} aria-label="Close full photo"><X size={24}/></button></div><img className={styles.original} src={'/school-visits/visit-'+photo.id+'.png'} alt={photo.title+' — complete original photograph'}/></dialog>}
 </section>;
}
