import React from 'react'

export default function Modal({
  title = 'Modal title',
  open,
  handleOpen = () => { },
  children
}) {
  const modalId = `modal-${new Date().getTime()}-${Math.random()}`

  return (
    <div
      className={`modal  ${open && 'modal-open'} `}
      id={modalId}
      onClick={(e) => {
        e.target.id === modalId && handleOpen()
      }}
    >
      <div className="modal-box py-1 pt-0 bg-base-300 min-h-[10rem] ">
        <header className={'flex justify-between sticky top-0 bg-base-300'}>
          <div className={'w-[80%] text-center'}>
            <h5>{title}</h5>
          </div>
          <button
            className={''}
            onClick={(e) => {
              e.preventDefault()
              handleOpen()
            }}
          >
            X {/*  <Icon name="cross" /> */}
          </button>
        </header>
        <main className={'pt-5'}>{children}</main>
      </div>
    </div>
  )
}