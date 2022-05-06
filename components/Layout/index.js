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

  useEffect(() => {
    var scrollPos = 0;
    window.addEventListener('scroll', function () {
      if ((document.body.getBoundingClientRect()).top > scrollPos) {
        // GOING UP
        setShowMobileNav(true);
      }
      else {
        scrollPos = (document.body.getBoundingClientRect()).top;
        setShowMobileNav(false);
        // GOING DOWN

      }
    });
  }, []);

  console.log(showMobileNav)

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
        <footer className={`relative   `}>

          <MobileNav />
        </footer>
      }
    </div>)
}
