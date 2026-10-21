import Legal from '../../components/LegalNotice';
import Brand from '../../components/Brand';

export default function TermsPage(){
 return <div className="access-page">
  <header className="header"><a className="brand" href="/" aria-label="Career Guidance home"><Brand/></a><a className="account-link" href="/login">Log in</a></header>
  <main className="public-legal wrap"><Legal type="terms"/><a className="account-link" href="/register">Create an account →</a></main>
  <footer className="footer wrap"><span>Career Guidance · Student project</span><div><a href="/terms" aria-current="page">Terms</a><a href="/privacy">Privacy</a></div></footer>
 </div>;
}
