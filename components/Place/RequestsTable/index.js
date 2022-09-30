import { format } from 'date-fns'
import { useState } from 'react'
import ModalRequestDetails from './ModalRequestDetails'

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

  // get all diferents satus in the requests lists
  const allStaus = [...requests].map(({ status }) => status)
  const statusOptions = [...new Set(allStaus)]

  const handleChangeStatusSelect = ({ target: { value: filter } }) => {
    if (filter === 'ALL') return setDisplayRequests([...requestsSortedByDate])
    const filteredStatusReques = [...requestsSortedByDate].filter(({ status }) => filter === status)
    setDisplayRequests(filteredStatusReques)
  }
  const [displayRequests, setDisplayRequests] = useState([...requestsSortedByDate])


  return (
    <div className='overflow-x-auto'>
      <table className='table table-compact w-full'>
        {/* <!-- head --> */ }
        <thead>
          <tr>
            <th className=' text-center '></th>
            <th className='hidden sm:table-cell'>Dates</th>
            { showPlaceName && <th>Place</th> }
            { showRequestUser && <th>Guest </th> }
            <th>Requested</th>
            <th className='flex flex-col'>
              Status
              <select onChange={ handleChangeStatusSelect } name='selectoption' className='select select-xs'>
                <option value={ 'ALL' }>ALL</option>
                { statusOptions.map(status =>
                  <option value={ status }>{ status }</option>
                ) }

              </select>
            </th>
          </tr>
        </thead>
        <tbody>
          {/* <!-- row 1 --> */ }
          { displayRequests.map((request, i) => (
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
  )
}

const RequestRow = ({
  request,
  i,
  showPlaceName,
  showRequestUser
}) => {

  const [openModal, setOpenModal] = useState(false)
  const handleOpenModal = () => {
    setOpenModal(!openModal)
  }

  const {
    createdAt,
    dates,
    status,
    guest,
    placeInfo
  } = request

  return (
    <>
      <tr
        className='hover cursor-pointer'
        onClick={ () => handleOpenModal() }
      >
        <th className=' text-center  !rounded-none'>{ i + 1 }</th>
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
        <td className=' !rounded-none'>
          { status || 'unknow' }

        </td>
      </tr>
      <ModalRequestDetails openModal={ openModal } handleOpenModal={ handleOpenModal } request={ request } />
    </>
  )
}



export default RequestsTable
