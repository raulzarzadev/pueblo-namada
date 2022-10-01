import { selectCashBalanceState, setCashBalances } from "@/store/slices/cashBalancesSlice";
import { selectPlaceState } from "@/store/slices/placeSlice";
import sortByDate from "@/utils/sortByDate";
import sortByField from "@/utils/sortByField";
import { listenPlaceCashBalances } from "@firebase/CashBalanceV2/main";
import { format } from "date-fns";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const CashBalancesList = () => {
  //console.log(place)
  const { route, query } = useRouter()
  const dispatch = useDispatch()
  useEffect(() => {
    if (query.id && route.includes('/places/[id]/dashboard/cashbalances')) {
      listenPlaceCashBalances(query.id, (balances) => {
        dispatch(setCashBalances(balances))
      })

    }
  }, [query.id])

  const { cashBalances = [] } = useSelector(selectCashBalanceState)
  const place = useSelector(selectPlaceState)
  const balancesSorted = sortByField(cashBalances, 'createdAt')

  return (
    <div>
      <div>
        <h3 className="text-xl text-center">{ place?.name || 'Place cash balances' }</h3>
      </div>
      <table className="table table-compact hover mx-auto">
        <thead>
          <tr>
            <th>
              Created At
            </th>
            <th>
              Requests
            </th>
            <th>
              Total
            </th>
          </tr>
        </thead>
        <tbody>
          { balancesSorted?.map(((cashBalance) => <BalanceRow key={ cashBalance.id } balance={ cashBalance } />)) }
        </tbody>
      </table>
    </div>
  );
}
const BalanceRow = ({ balance }) => {
  const { requests, createdAt } = balance
  const getTotals = (requests) => {
    const mxnTotal = requests.reduce((prev, curr) => {
      return prev += curr.mxnTotal
    }, 0)
    const usdTotal = requests.reduce((prev, curr) => {
      return prev += curr.usdTotal
    }, 0)
    return { mxnTotal, usdTotal }

  }
  const router = useRouter()
  return (
    <tr onClick={ () => router.push(`${router.asPath}/${balance.id}`) }>
      <td>
        { format(createdAt, 'dd/MMM/yy HH:mm') }
      </td>
      <td>
        { requests.length }
      </td>
      <td>
        { getTotals(requests).mxnTotal }
      </td>
    </tr>)
}

export default CashBalancesList;