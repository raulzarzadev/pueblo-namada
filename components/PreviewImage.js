import Image from 'next/image'
import { useState } from 'react'
import DeleteIcon from './icons/DeleteIcon'
import EditIcon from './icons/EditIcon'
import Loading from './Loadign'
import Modal from './Modal'


const PreviewImage = ({
  label = null,
  image = '',
  previewSize = 'md',
  uploading,
  handleDelete,
  showOrigin = false
}) => {

  const [openModal, setOpenModal] = useState(false)
  const handleOpenModal = () => setOpenModal(!openModal)
  const size = {
    sm: 'w-8',
    md: 'w-12',
    lg: 'w-24',
    xl: 'w-32',
    full: 'w-full'
  }

  const [openDelete, setOpenDelete] = useState()
  const handleOpenDelete = () => {
    setOpenDelete(!openDelete)
  }

  return (
    <div className='flex flex-col justify-center items-center'>
      { label && <span className=''>{ label }</span> }
      { uploading && <progress className='progress progress-primary'>
      </progress> }
      { !image && !uploading &&
        <span className='italic'>No image</span>
      }
      { image && (
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
            `}
            onClick={ handleOpenModal }
          >
            <Image
              src={ image }
              layout='fill'
              objectFit='cover'
            />
            { handleDelete &&
              <div className='absolute right-0 '>
                <button className=' hover:text-error text-white ' onClick={ (e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  handleOpenDelete()
                } }>
                  <DeleteIcon />
                </button>
                <Modal open={ openDelete } handleOpen={ handleOpenDelete } title='Delete image' >
                  <div className='flex w-full justify-around'>
                    <button className='btn btn-outline' onClick={ () => setOpenDelete(false) }>
                      Cancel
                    </button>
                    <button className='btn btn-error' onClick={ ((e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      handleDelete()
                    }) }>
                      Delete image
                    </button>
                  </div>
                </Modal>
              </div>
            }
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
            { showOrigin && <a href={ image } target={ '_blank' }>{ image }</a> }
          </Modal>
        </>
      ) }

    </div>
  )
}

export default PreviewImage
