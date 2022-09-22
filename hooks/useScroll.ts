// let lastScroll = 0
// useEffect(() => {

//   const handleScroll = () => {
//     const scroll = window.scrollY;
//     if (scroll > lastScroll) {
//       // scroll is going down
//       setShowMobileNav(false);
//     } else {
//       // scroll is going up
//       setShowMobileNav(true);
//     }
//     lastScroll = scroll;

//   };

//   handleScroll();

//   window.addEventListener("scroll", handleScroll);
//   return () => {
//     window.removeEventListener("scroll", handleScroll);
//   };
//   // eslint-disable-next-line react-hooks/exhaustive-deps
// }, []);
