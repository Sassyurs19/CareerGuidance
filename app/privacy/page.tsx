import Legal from '../../components/LegalNotice';
import Brand from '../../components/Brand';

export default function PrivacyPage(){
 return <div className="access-page">
  <header className="header"><a className="brand" href="/" aria-label="Career Guidance home"><Brand/></a><a className="account-link" href="/login">Log in</a></header>
  <main className="public-legal wrap"><Legal type="privacy"/><a className="account-link" href="/register">Create an account →</a></main>
  <footer className="footer wrap"><span>Career Guidance · Student project</span><div><a href="/terms">Terms</a><a href="/privacy" aria-current="page">Privacy</a></div></footer>
 </div>;
}
