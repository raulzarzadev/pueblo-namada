import Head from './Head'
export default function Layout({ children }) {
  return <div>
    <Head />
    <header className='text-4xl bg-blue-100 '>
      header
    </header>
    <main>
      {children}
    </main>
    <footer>
      Este es el footer
    </footer>
  </div>
}
