import { selectPlaceState } from "@/store/slices/placeSlice"
import { useUser } from "comps/context/userContext"
import Modal from "comps/Modal"
import ModalDelete from "comps/Modal/ModalDelete"
import PreviewImage from "comps/PreviewImage"
import TextInfo from "comps/TextInfo"
import { format } from "date-fns"
import Link from "next/link"
import { useState } from "react"
import { useSelector } from "react-redux"

const ModalRequestDetails = ({ openModal, handleOpenModal, request }) => {
  const {
    user: { id: userId }
  } = useUser()
  const { userId: placeUserId } = useSelector(
    selectPlaceState
  )
  const {
    dates,
    status,
    id,
    guest,
    placeId,
    placeInfo
  } = request

  const STATUSES = {
    unsolved: 'UNSOLVED',
    accepted: 'ACCEPTED',
    rejected: 'REJECTED'
  }
  const isPlaceOwner = userId === placeUserId
  const handleUpdateRequestStatus = (newStatus) => {
    updateRoomRequest(id, { status: newStatus })
      .then((res) => console.log(res))
      .catch((err) => console.error(err))
  }
  const handleDeleteRequest = (id) => {
    // TODO delete room requests id
    deleteRoomRequest(id)
    // console.log({ id })
  }
  const [deletedSuccessfully, setDeletedSuccessfully] =
    useState(false)

  return <Modal
    title='Request accommodation'
    open={ openModal }
    handleOpen={ handleOpenModal }
  >
    <div className=''>
      <div className=' grid gap-2'>
        <div className='  bg-base-300 p-1 rounded-lg'>

          <h4 className='font-bold text-lg'>
            Guest information
          </h4>
          <div>
            <p>
              <span>Name:</span>
              { guest?.name }
            </p>
            <p>
              <span>Email:</span>
              { guest?.email }
            </p>
            <p>
              <span>Phone:</span>
              { guest?.phone }
            </p>
            <p>
              <span>Plates:</span>
              { guest?.plates }
            </p>
            <div className='flex w-full justify-around'>
              <div>
                <span>Image:</span>
                { guest?.publicImage && <PreviewImage image={ guest.publicImage } previewSize='xl' /> }
              </div>
              <div>
                <span>Image ID:</span>
                { guest?.imageID && <PreviewImage image={ guest.imageID } previewSize='xl' /> }
              </div>
            </div>
          </div>
        </div>
        <div className='  bg-base-300 p-1 rounded-lg'>
          <h4 className='font-bold text-lg'>
            Place information
          </h4>
          <div className='flex w-full justify-around'>
            <p>
              Place name: <span>{ placeInfo?.name }</span>
            </p>
            <Link
              href={ `/places/${placeId}` }
              className=''
            >
              <button className='btn btn-sm btn-outline'>
                Visit
              </button>
            </Link>
          </div>
        </div>

        <div className='  bg-base-300 p-1 rounded-lg'>
          <h4 className='font-bold text-lg'>
            Room Request Info
          </h4>
          <div className='flex'>

            <div className='flex w-full flex-col justify-center'>
              <span>Dates: </span>
              <span className='font-bold'>
                { dates.startsAt &&
                  format(dates.startsAt, 'dd/MM/yy') }
              </span>
              <span>{ ` - ` } </span>
              <span className='font-bold'>

                { dates.endsAt &&
                  format(dates.endsAt, 'dd/MM/yy') }
              </span>
            </div>
            <div>
              <span>
                Nights:
                <span className='font-bold'>
                  { request.nights }
                </span>
              </span>
              <p>Total:</p>
              <p className='grid font-bold'>
                <span>
                  ${ request.mxnTotal } mxn
                </span>
                <span>
                  ${ request.usdTotal } usd{ ' ' }
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className='  bg-base-300 p-1 rounded-lg'>


          <h4 className='font-bold text-lg'>
            Request Status
          </h4>
          <div className='flex w-full justify-around mb-4'>
            { Object.keys(STATUSES).map((key) => {
              return (
                <button
                  disabled={ !isPlaceOwner }
                  onClick={ () =>
                    handleUpdateRequestStatus(
                      STATUSES[key]
                    )
                  }
                  className={ `
                      btn btn-sm 
                      ${STATUSES[key] === status &&
                    ' btn-success disabled:bg-success disabled:text-black disabled:bg-opacity-40 '
                    }
                      `}
                  key={ key }
                >
                  { STATUSES[key] }
                </button>
              )
            }) }
          </div>
          <TextInfo
            text={ `Just the admin of the place can edit the request status . Contact them for more info` }
          />
        </div>
        <div className='  bg-base-300 p-1 rounded-lg border-2 border-error'>
          <div className='flex justify-around w-full mt-6'>
            <ModalDelete
              disabled={ status === 'ACCEPTED' }
              modalTitle='Delete request'
              itemLabel='Requests accomodation'
              deleteText={
                'Are you sure that you want delete this resquest'
              }
              handleDelete={ handleDeleteRequest }
              deleteSuccessful={ () =>
                setDeletedSuccessfully(true)
              }
              itemId={ id }
              buttonType='btn'
            />
          </div>
          <TextInfo textType='warning' text='You can not delete if request is accepted' />
        </div>
      </div>
    </div>
  </Modal>
}

export default ModalRequestDetails