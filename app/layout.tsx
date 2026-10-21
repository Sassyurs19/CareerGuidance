import type { Metadata } from 'next';
import './globals.css';
import './theme.css';
import './introduction.css';
import './journey.css';
import './responsive.css';
import './next-step.css';
import './resource-guide.css';
export const metadata:Metadata={title:'Career Guidance — My Next Step',icons:{icon:'/favicon.svg'},description:'Compare study options after Class 10, understand requirements and build a practical career plan.'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
