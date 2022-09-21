import { format } from 'date-fns'

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
            {requests?.map(({ createdAt, dates, status }, i) => (
              <tr key={createdAt} className="hover cursor-pointer">
                <th>{i + 1}</th>
                <td>
                  <span>
                    {dates?.startsAt && format(dates?.startsAt, 'dd MM yy')}
                  </span>
                  <span>{` to `}</span>
                  <span>
                    {dates?.endsAt && format(dates?.endsAt, ' dd MM yy ')}
                  </span>
                </td>
                <td>{createdAt && format(createdAt, 'dd MMM yy hh:mm')}</td>
                <td>{status || 'unknow'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default RequestsTable
