import Image from 'next/image'
import { useState } from 'react'
import Modal from './Modal'

const PreviewImage = ({ label = null, image = null }) => {
  const [openModal, setOpenModal] = useState(false)
  const handleOpenModal = () => setOpenModal(!openModal)

  return (
    <div className="flex flex-col">
      {label && <span className="">{label}</span>}
      {image ? (
        <>
          <div
            className="relative h-12 aspect-video mx-auto opacity-60 hover:opacity-100 shadow-lg m-1"
            onClick={handleOpenModal}
          >
            <Image src={image} layout="fill" objectFit="contain" />
          </div>
          <Modal title="Image" open={openModal} handleOpen={handleOpenModal}>
            <div className="relative w-full aspect-video mx-auto">
              <Image src={image} layout="fill" objectFit="contain" />
            </div>
          </Modal>
        </>
      ) : (
        <span className="italic">No image</span>
      )}
    </div>
  )
}

export default PreviewImage
