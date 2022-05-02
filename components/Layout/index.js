import Head from './Head'
import MobileNav from '../MobileNav'
export default function Layout({ children }) {
  return (
    <div className='relative'>
      <Head />
      < header className='text-4xl bg-blue-100 '>

      </header>
      <main>
        {children}
      </main>
      <footer className='relative'>
        <MobileNav />
      </footer>
    </div>)
}
