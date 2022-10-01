import Image from 'next/image'
import { useState } from 'react'
import Modal from './Modal'


const PreviewImage = ({ label = null, image = null, previewSize = 'md' }) => {
  const [openModal, setOpenModal] = useState(false)
  const handleOpenModal = () => setOpenModal(!openModal)
  const size = {
    sm: 'w-8',
    md: 'w-12',
    lg: 'w-24',
    xl: 'w-32',
    full: 'w-full'
  }
  return (
    <div className='flex flex-col'>
      { label && <span className=''>{ label }</span> }
      { image ? (
        <>
          <div
            className={ `
            ${size[previewSize]}
            relative 
             aspect-square
             mx-auto
             opacity-60 
            hover:opacity-100
             shadow-lg 
             cursor-pointer
            m-1`}
            onClick={ handleOpenModal }
          >
            <Image
              src={ image }
              layout='fill'
              objectFit='cover'
            />
          </div>
          <Modal
            title='Image'
            open={ openModal }
            handleOpen={ handleOpenModal }
          >
            <div className='relative w-full aspect-square mx-auto '>
              <Image
                src={ image }
                layout='fill'
                objectFit='contain'
              />
            </div>
          </Modal>
        </>
      ) : (
        <span className='italic'>No image</span>
      ) }
    </div>
  )
}

export default PreviewImage
