export default function TeamAvatar({variant='neutral'}:{variant?:'male'|'female'|'neutral'}){
 if(variant==='neutral')return <svg viewBox="0 0 120 120" fill="none" aria-hidden="true" focusable="false"><circle cx="60" cy="60" r="58" fill="#DFECE5"/><circle cx="60" cy="44" r="20" fill="#62856E"/><path d="M23 103c0-21 16-35 37-35s37 14 37 35" fill="#62856E"/></svg>;
 return <svg viewBox="0 0 120 120" fill="none" aria-hidden="true" focusable="false">
  <circle cx="60" cy="60" r="58" fill={variant==='female'?'#E4EEDB':'#DFECE5'}/>
  {variant==='female'&&<path d="M33 53c0-23 12-32 27-32s27 9 27 32v33H33V53Z" fill="#375C4B"/>}
  <path d="M23 108c2-23 16-36 37-36s35 13 37 36" fill="#62856E"/>
  <path d="m47 77 13 20 13-20-13-6-13 6Z" fill="#F7FAF2"/>
  <path d="M52 65h16v15c-5 5-11 5-16 0V65Z" fill="#D6B89A"/>
  <ellipse cx="60" cy="49" rx="20" ry="25" fill="#E6C9AA"/>
  {variant==='female'?<path d="M39 48c-3-18 6-28 21-28s24 11 21 28c-7-3-13-9-17-16-6 8-13 13-25 16Z" fill="#375C4B"/>:<path d="M39 45c-2-18 8-25 23-25 13 0 22 10 19 25l-7-10c-12 4-20 2-27-1l-8 11Z" fill="#375C4B"/>}
  <path d="M52 59c5 4 11 4 16 0" stroke="#876C56" strokeWidth="2" strokeLinecap="round"/>
  <circle cx="52" cy="48" r="1.7" fill="#375C4B"/><circle cx="68" cy="48" r="1.7" fill="#375C4B"/>
 </svg>;
}
