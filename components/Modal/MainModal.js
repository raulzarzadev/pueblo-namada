import Modal from "."
import { useState, useRef } from 'react'

export default function MainModal({
  children,
  title = "Opening modal",
  buttonLabel = 'open modal',
  OpenComponent,
  OpenComponentProps,
  OpenComponentType
}) {

  const OPEN_COMPONENT_STYLE = {
    delete: `btn btn-error btn-sm`
  }
  const [openModal, setOpenModal] = useState(false)
  const modalRef = useRef(null)
  const handleOpenModal = () => {
    setOpenModal(!openModal)
  }

  return <>
    {OpenComponent ? <OpenComponent onClick={handleOpenModal}  {...OpenComponentProps} /> :
      <button
        onClick={() => handleOpenModal()}
        {...OpenComponentProps}
        className={`${OpenComponentProps?.className || ''} ${OPEN_COMPONENT_STYLE[OpenComponentType]}`}
      >
        {buttonLabel}
      </button>
    }
    <Modal ref={modalRef} title={title} open={openModal} handleOpen={handleOpenModal} >
      {children}
    </Modal>
  </>
}