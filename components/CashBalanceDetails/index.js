import { selectCashBalanceState } from "@/store/slices/cashBalancesSlice";
import { format } from "date-fns";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const CashBalanceDetails = () => {
  const { query } = useRouter()
  const { cashBalances } = useSelector(selectCashBalanceState)
  const cashBalance = cashBalances?.find(({ id }) => id === query.cashBalanceId)
  const router = useRouter()
  if (!cashBalances) {
    router.back()
    return <div>Loading ...</div>
  }
  const { requests = [], place = {}, dates = {}, createdAt } = cashBalance
  return (
    <div>
      <h2 className="text-xl text-center"> { place.name }</h2>
      <div className="flex flex-col items-end">
        <h2>Cash balance from: { place.name }</h2>
        <div>Created At: { format(createdAt, 'dd MMM yy HH:mm') }</div>
        <div>From: { dates?.from && format(new Date(dates?.from), 'dd MMM yy') }</div>
        <div>To: { dates?.to && format(new Date(dates?.to), 'dd MMM yy') }</div>
      </div>
      <div className="overflow-x-auto">

        <h3 className="text-lg "> Cash balance Requests </h3>
        <table className="table table-compact w-full">
          <thead>

            <tr>
              <th></th>
              <th>Created At</th>
              <th>Guest</th>
              <th>Dates</th>
              <th>Prices</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>

            { requests?.map((request, i) => <RequestsRow request={ request } key={ request.id } index={ i } />) }
          </tbody>
        </table>
      </div>
    </div>
  );
}

const RequestsRow = (({ request, index }) => {
  const { createdAt, dates, guest, prices, mxnTotal, usdTotal } = request
  return (
    <tr><th>{ index + 1 }</th>
      <td>{ format(createdAt, 'dd MMM yy HH:mm') }</td>
      <td>{ guest.name }</td>
      <td>
        <div>
          from { format(dates.startsAt, 'dd/MMM/yy') }
        </div>
        <div>
          from { format(dates.endsAt, 'dd/MMM/yy') }
        </div>
      </td>
      <td>
        <div>
          usd price { prices.usd }
        </div>
        <div>
          night price { prices.night }
        </div>
      </td>
      <td>
        <div>
          { usdTotal } usd
        </div>
        <div>
          { mxnTotal } mxn
        </div>
      </td>
    </tr>)
})

export default CashBalanceDetails;