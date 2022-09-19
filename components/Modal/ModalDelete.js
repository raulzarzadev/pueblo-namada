import { useState } from 'react'
import Modal from '.'
import DeleteIcon from '../icons/DeleteIcon'

export default function ModalDelete ({
  handleDelete = null,
  deleteSuccessful = () => { },
  itemLabel = 'elemento',
  itemId = '',
  deleteText = null,
  modalTitle = 'Eliminar elemento'

}) {
  const [open, setOpen] = useState()
  const handleOpen = () => {
    setOpen(!open)
  }
  const [loading, setLoading] = useState(false)
  const [buttonLabelModal, setButtonLabelModal] = useState('Eliminar')

  const functionDelete = async () => {
    setLoading(true)
    setButtonLabelModal('Eliminando')

    const deleteFunc = async () => {
      try {
        if (handleDelete) {
          await handleDelete(itemId)
        } else {
          console.error('handleDelete is not defined')
        }
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
        setButtonLabelModal('Eliminado')
        deleteSuccessful()
        setTimeout(() => {
          setButtonLabelModal('Eliminar')
          setOpen(false)
        }, 1000)
      }
    }
    deleteFunc()
  }
  return (
    <div>
      <button
        onClick={handleOpen}
        className='text-error'
      /*  iconName={'trash'}
       size={buttonSize}
       label={buttonLabel}
       variant={buttonVariant}
       className="btn-error" */
      ><DeleteIcon />
      </button>
      <Modal title={modalTitle} open={open} handleOpen={handleOpen}>
        <div className='text-center whitespace-pre-line'>
          {deleteText || `¿Seguro que desea eliminar 
           ${itemLabel.toUpperCase()} 
           de forma permanente?`}

          <div className="w-full justify-evenly flex my-4 ">
            <button
              className={'btn-outline btn btn-sm'}
              onClick={() => {
                handleOpen()
              }}
            >
              Cancelar
            </button>
            <button
              className={'btn-error  btn btn-sm'}
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                functionDelete()
              }}
            >
              {buttonLabelModal}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
