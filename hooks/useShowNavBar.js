import { useEffect, useState } from 'react'

export default function useShowNavBar() {
  const [showMobileNav, setShowMobileNav] = useState(true)
  const SHOW_MOBILE_NAV_BELOW_SCREEN_WIDTH = 800

  useEffect(() => {
    const screenWidth = window.innerWidth
    screenWidth > SHOW_MOBILE_NAV_BELOW_SCREEN_WIDTH
      ? setShowMobileNav(false)
      : setShowMobileNav(true)
  }, [])

  return { showMobileNav }
}
