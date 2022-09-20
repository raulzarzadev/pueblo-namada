import Head from './Head'
import MobileNav from './MobileNav'
import { useUser } from '@comps/context/userContext'
import TopNavBar from './TopNavBar'
import useShowNavBar from 'hooks/useShowNavBar'

export default function Layout ({ children }) {
  const { user } = useUser()
  const { showMobileNav } = useShowNavBar()

  return (
    <div className="relative bg-base-300 pb-11 min-h-screen ">
      <Head />
      <header className="text-4xl bg-blue-100  ">
        <TopNavBar user={user} />
      </header>
      <main className="min-h-screen">{children}</main>
      {showMobileNav ? (
        <MobileNav />
      ) : (
        <footer className={'relative z-10  '}>Footer</footer>
      )}
    </div>
  )
}
