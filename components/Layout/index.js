import Head from './Head'
import MobileNav from '../MobileNav'
import { useUser } from '@comps/context/userContext'
import { useRouter } from 'next/router'
import TopNavBar from './TopNavBar'
import { useEffect, useState } from 'react'
export default function Layout({ children }) {
  const { user } = useUser()

  const ROUTES_CONFIG = {
    '/': {
      private: false
    },
    '/login': {
      private: false,
      avoidWhenLogged: true
    },
    '/recover': {
      private: false,
      avoidWhenLogged: true
    },
  }

  const { pathname, push } = useRouter()
  const isPrivate = ROUTES_CONFIG[pathname]?.private
  const avoidWhenLogged = ROUTES_CONFIG[pathname]?.avoidWhenLogged

  if (isPrivate && !user) {
    push('/login')
  } else if (avoidWhenLogged && user) {
    push('/')
  }
  const [showMobileNav, setShowMobileNav] = useState(false);

  let lastScroll = 0
  useEffect(() => {

    const handleScroll = () => {
      const scroll = window.scrollY;
      if (scroll > lastScroll) {
        // scroll is going down
        setShowMobileNav(false);
      } else {
        // scroll is going up
        setShowMobileNav(true);
      }
      lastScroll = scroll;


    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <div className='relative bg-base-300' >
      <Head />
      < header className='text-4xl bg-blue-100  '>
        <TopNavBar user={user} />
      </header>
      <main>
        {children}
      </main>
      {showMobileNav &&
        <footer className={`relative p-10  `}>

          <MobileNav />
        </footer>
      }
    </div>)
}
