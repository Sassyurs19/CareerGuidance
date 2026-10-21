'use client';
export default function StudentError({reset}:{reset:()=>void}){return <main className="workspace-error"><h1>Your student space couldn’t load.</h1><p>Please try again. Your saved plan has not been changed.</p><button className="button primary" onClick={reset}>Try again</button><a className="button secondary" href="/login">Go to sign in</a></main>}
