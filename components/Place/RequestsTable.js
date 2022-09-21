import { format } from 'date-fns'
import { useState } from 'react'
import Modal from '../Modal'
import ModalDelete from '../Modal/ModalDelete'

const RequestsTable = ({ requests = [] }) => {
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
              <RequestRow key={requests.createdAt} request={request} i={i} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const RequestRow = ({ request, i }) => {
  const [openModal, setOpenModal] = useState(false)
  const handleOpenModal = () => {
    setOpenModal(!openModal)
  }
  const { createdAt, dates, status } = request
  const handleDeleteRequest = (id) => {
    // TODO delete room requests id

    console.log({ id })
  }
  const [deletedSuccessfully, setDeletedSuccessfully] = useState(false)
  return (
    <>
      <tr className="hover cursor-pointer">
        <th>{i + 1}</th>
        <td>
          <span>{dates?.startsAt && format(dates?.startsAt, 'dd MM yy')}</span>
          <span>{` to `}</span>
          <span>{dates?.endsAt && format(dates?.endsAt, ' dd MM yy ')}</span>
        </td>
        <td>{createdAt && format(createdAt, 'dd MMM yy hh:mm')}</td>
        <td>{status || 'unknow'}</td>
        <td>
          <button onClick={() => handleOpenModal()}>...</button>
          <Modal
            title="Request accommodation"
            open={openModal}
            handleOpen={handleOpenModal}>
            <div className="">
              <ModalDelete
                modalTitle="Delete request"
                itemLabel="Requests accomodation"
                deleteText={'Are you sure that you want delete this resquest'}
                handleDelete={handleDeleteRequest}
                deleteSuccessful={() => setDeletedSuccessfully(true)}
                itemId={createdAt}
                buttonType="btn"
              />
            </div>
          </Modal>
        </td>
      </tr>
    </>
  )
}

export default RequestsTable
