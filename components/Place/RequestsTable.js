import { selectPlaceState } from '@/store/slices/placeSlice'
import { useUser } from 'comps/context/userContext'
import PreviewImage from 'comps/PreviewImage'
import { format } from 'date-fns'
import Link from 'next/link'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import {
  deleteRoomRequest,
  updateRoomRequest
} from '../../firebase/RoomRequests/main'
import Modal from '../Modal'
import ModalDelete from '../Modal/ModalDelete'
import TextInfo from '../TextInfo'

const RequestsTable = ({
  requests = [],
  showPlaceName,
  showRequestUser
}) => {
  const sortRequestsByCreatedAt = (a, b) => {
    if (a?.createdAt > b?.createdAt) return -1
    if (a?.createdAt < b?.createdAt) return 1
    return 0
  }
  const requestsSortedByDate = [...requests]?.sort(sortRequestsByCreatedAt)
  return (
    <div>
      <div className='overflow-x-auto'>
        <table className='table table-compact w-full'>
          {/* <!-- head --> */ }
          <thead>
            <tr>
              <th className=' text-center hidden sm:table-cell'></th>
              <th className='hidden sm:table-cell'>Dates</th>
              { showPlaceName && <th>Place</th> }
              { showRequestUser && <th>Guest </th> }
              <th>Requested</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {/* <!-- row 1 --> */ }
            { requestsSortedByDate.map((request, i) => (
              <RequestRow
                key={ request.id }
                request={ request }
                showPlaceName={ showPlaceName }
                showRequestUser={ showRequestUser }
                i={ i }
              />
            )) }
          </tbody>
        </table>
      </div>
    </div>
  )
}

const RequestRow = ({
  request,
  i,
  showPlaceName,
  showRequestUser
}) => {
  const {
    user: { id: userId }
  } = useUser()
  const { userId: placeUserId } = useSelector(
    selectPlaceState
  )
  const [openModal, setOpenModal] = useState(false)
  const handleOpenModal = () => {
    setOpenModal(!openModal)
  }

  const handleDeleteRequest = (id) => {
    // TODO delete room requests id
    deleteRoomRequest(id)
    // console.log({ id })
  }
  const [deletedSuccessfully, setDeletedSuccessfully] =
    useState(false)
  const STATUSES = {
    unsolved: 'UNSOLVED',
    accepted: 'ACCEPTED',
    rejected: 'REJECTED'
  }
  const handleUpdateRequestStatus = (newStatus) => {
    updateRoomRequest(id, { status: newStatus })
      .then((res) => console.log(res))
      .catch((err) => console.error(err))
  }
  const {
    createdAt,
    dates,
    status,
    id,
    guest,
    placeId,
    placeInfo
  } = request

  const isPlaceOwner = userId === placeUserId
  return (
    <tr
      className='hover cursor-pointer'
      onClick={ () => handleOpenModal() }
    >
      <th className=' text-center hidden sm:table-cell'>{ i + 1 }</th>
      <td className=' text-center hidden sm:table-cell'>
        <span>{ ` From ` }</span>
        <span>
          { dates?.startsAt &&
            format(dates?.startsAt, 'dd/MM/yy') }
        </span>
        <span>{ ` to ` }</span>
        <span>
          { dates?.endsAt &&
            format(dates?.endsAt, ' dd/MM/yy ') }
        </span>
      </td>
      { showPlaceName && (
        <td className='whitespace-pre-line'>
          { placeInfo.name }
        </td>
      ) }
      { showRequestUser && (
        <td className='whitespace-pre-line'>
          { guest.name }
        </td>
      ) }
      <td>
        { createdAt && format(createdAt, 'dd MMM yy hh:mm') }
      </td>
      <td>
        { status || 'unknow' }
        <Modal
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
                  text={ `Just the admin of the place can edit the status of your requests. If you have any question contact him` }
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
      </td>
    </tr>
  )
}

export default RequestsTable
