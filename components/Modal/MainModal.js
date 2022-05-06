import Modal from "."
import React, { useState, useRef } from 'react'

const MainModal = React.forwardRef(({
  children,
  title = "Opening modal",
  buttonLabel = 'open modal',
  OpenComponent,
  OpenComponentProps
}, ref) => {

  const [openModal, setOpenModal] = useState(false)
  const modalRef = useRef(null)
  const handleOpenModal = () => {
    setOpenModal(!openModal)
  }

  return (
    <div className="">
      {OpenComponent ? <OpenComponent onClick={handleOpenModal}  {...OpenComponentProps} /> :
        <button
          onClick={() => handleOpenModal()}
          {...OpenComponentProps}
        >
          {buttonLabel}
        </button>
      }
      <Modal ref={modalRef} title={title} open={openModal} handleOpen={handleOpenModal} >
        {children}
      </Modal>
    </div>)
})

export default MainModal