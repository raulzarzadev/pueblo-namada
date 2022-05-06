import Modal from "."
import { useState, useRef } from 'react'

export default function MainModal({
  children,
  title = "Opening modal",
  buttonLabel = 'open modal',
  OpenComponent,
  OpenComponentProps }) {

  const [openModal, setOpenModal] = useState(false)
  const modalRef = useRef(null)
  const handleOpenModal = () => {
    setOpenModal(!openModal)
  }

  return <div className="">
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
  </div>
}