import { format } from 'date-fns'
import { useState } from 'react'
import {
  deleteRoomRequest,
  updateRoomRequest
} from '../../firebase/RoomRequests/main'
import Modal from '../Modal'
import ModalDelete from '../Modal/ModalDelete'

const RequestsTable = ({ requests = [], isPlaceOwner }) => {
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table table-compact w-full">
          {/* <!-- head --> */}
          <thead>
            <tr>
              <th></th>
              <th>Dates</th>
              <th>Requested</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {/* <!-- row 1 --> */}
            {requests.map((request, i) => (
              <RequestRow
                key={request.id}
                request={request}
                i={i}
                isPlaceOwner={isPlaceOwner}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const RequestRow = ({ request, i, isPlaceOwner }) => {
  const [openModal, setOpenModal] = useState(false)
  const handleOpenModal = () => {
    setOpenModal(!openModal)
  }

  const { createdAt, dates, status, id, guest } = request
  const handleDeleteRequest = (id) => {
    // TODO delete room requests id
    deleteRoomRequest(id)
    console.log({ id })
  }
  const [deletedSuccessfully, setDeletedSuccessfully] = useState(false)
  const STATUSES = {
    unsolved: 'UNSOLVED',
    accepted: 'ACCEPTED',
    rejected: 'REJECTED'
  }
  console.log(status)
  const handleUpdateRequestStatus = (newStatus) => {
    updateRoomRequest(id, { status: newStatus })
      .then((res) => console.log(res))
      .catch((err) => console.error(err))
  }
  console.log(guest)

  return (
    <tr className="hover cursor-pointer" onClick={() => handleOpenModal()}>
      <th>{i + 1}</th>
      <td>
        <span>{dates?.startsAt && format(dates?.startsAt, 'dd MM yy')}</span>
        <span>{` to `}</span>
        <span>{dates?.endsAt && format(dates?.endsAt, ' dd MM yy ')}</span>
      </td>
      <td>{createdAt && format(createdAt, 'dd MMM yy hh:mm')}</td>
      <td>
        {status || 'unknow'}
        <Modal
          title="Request accommodation"
          open={openModal}
          handleOpen={handleOpenModal}>
          <div className="">
            <div>
              <h4>Guest information</h4>

              <div>
                <p>
                  <span>Name:</span>
                  {guest?.name}
                </p>
                <p>
                  <span>Email:</span>
                  {guest?.email}
                </p>
                <p>
                  <span>Phone:</span>
                  {guest?.phone}
                </p>
                <p>
                  <span>Plates:</span>
                  {guest?.plates}
                </p>
                <p>
                  <span>Image:</span>
                  {guest?.image}
                </p>
                <p>
                  <span>Image ID:</span>
                  {guest?.imageID}
                </p>
              </div>
              <h4>Status</h4>
              <div className="flex w-full justify-around">
                {Object.keys(STATUSES).map((key) => {
                  return (
                    <button
                      disabled={!isPlaceOwner}
                      onClick={() => handleUpdateRequestStatus(STATUSES[key])}
                      className={`
                        btn btn-sm 
                       ${STATUSES[key] === status &&
                        ' btn-success disabled:bg-success disabled:text-black disabled:bg-opacity-40 '
                        }
                       `}
                      key={key}>
                      {console.log(key)}
                      {STATUSES[key]}
                    </button>
                  )
                })}
              </div>
            </div>
            <div className="flex justify-around w-full mt-6">
              <ModalDelete
                modalTitle="Delete request"
                itemLabel="Requests accomodation"
                deleteText={'Are you sure that you want delete this resquest'}
                handleDelete={handleDeleteRequest}
                deleteSuccessful={() => setDeletedSuccessfully(true)}
                itemId={id}
                buttonType="btn"
              />
            </div>
          </div>
        </Modal>
      </td>
    </tr>
  )
}

export default RequestsTable
