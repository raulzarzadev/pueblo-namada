import { useState } from 'react'

export default function Section ({
  title,
  subtitle = null,
  children,
  open = false,
  indent = false,
  sticky = false,
  bgColor = 'bg-base-100'
}) {
  const [show, setShow] = useState(open || false)
  useState(() => {
    setShow(open)
  }, [open])
  return (
    <section
      className={ `
         ${bgColor}   
         text-basep-content 
         shadow-lg 
        rounded-md 
         py-0.5 
        `}
    >
      <div
        onClick={ () => setShow(!show) }
        className={ ` 
        ${sticky && ' sticky top-0 bg-base-100 '}
        p-1
        text-left 
        flex   
        font-bold 
        items-center 
        justify-between 
        cursor-pointer 
        z-[1]
        `}
      >
        <div className='flex '>
          <h3 className='m-0'>
            { title }
          </h3>
          <span className='font-medium  text-xs mx-2 '>
            { subtitle }
          </span>
        </div>
        { show ? (
          <svg
            width='24px'
            height='24px'
            viewBox='0 0 24 24'
            fill='currentColor'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M8.34921 4.24075C7.92989 4.60017 7.88132 5.23147 8.24075 5.65079L13.6829 12L8.24075 18.3492C7.88132 18.7685 7.92989 19.3998 8.34921 19.7593C8.76854 20.1187 9.39984 20.0701 9.75926 19.6508L15.7593 12.6508C16.0803 12.2763 16.0803 11.7237 15.7593 11.3492L9.75926 4.34921C9.39984 3.92989 8.76854 3.88132 8.34921 4.24075Z'
              fill='currentColor'
            />
          </svg>
        ) : (
          <svg
            width={ 24 }
            height={ 24 }
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M4.24 8.35a1 1 0 0 1 1.41-.11L12 13.684l6.35-5.442a1 1 0 0 1 1.3 1.518l-7 6a1 1 0 0 1-1.3 0l-7-6a1 1 0 0 1-.11-1.41Z'
              fill='currentColor'
            />
          </svg>
        ) }
      </div>
      <div className={ `${indent && 'pl-4 '}   bg-inherit` }>
        { show && children }
      </div>
    </section>
  )
}
