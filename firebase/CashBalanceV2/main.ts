import { getPlaceAccomodationsBettwenDates } from '@firebase/Accommodations/main'
import { getPlaceCostBetteenDates } from '@firebase/Costs/main'
import { where } from 'firebase/firestore'
import { FirebaseCRUD } from '../FirebaseCRUD'
import { CashBalance } from './CashBalance.model'

const CashBalancesCRUD = new FirebaseCRUD('CashBalances_V2')

export const createCashBalance = (
  newCashBalance: CashBalance
) => CashBalancesCRUD.create(newCashBalance)
export const updateCashBalance = (
  CashBalanceId: string,
  newCashBalance: CashBalance
) => CashBalancesCRUD.update(CashBalanceId, newCashBalance)
export const deleteCashBalance = (CashBalanceId: string) =>
  CashBalancesCRUD.delete(CashBalanceId)
export const getCashBalance = (CashBalanceId: string) =>
  CashBalancesCRUD.get(CashBalanceId)
export const listenCashBalance = (
  CashBalanceId: string,
  cb: CallableFunction
) => CashBalancesCRUD.listen(CashBalanceId, cb)
export const listenPlaceCashBalances = (
  placeId: string,
  cb: CallableFunction
) =>
  CashBalancesCRUD.listenDocs(
    [where('place.id', '==', placeId)],
    cb
  )

export const listenUserCashBalances = (
  userId: string,
  cb: CallableFunction
) =>
  CashBalancesCRUD.listenDocs(
    [where('userId', '==', userId)],
    cb
  )

export const getPlaceCashBalanceBettweenDates = async (
  placeId: string,
  from: any,
  to: any
) => {
  const accommodations =
    await getPlaceAccomodationsBettwenDates(
      placeId,
      from,
      to
    )
  const costs = await getPlaceCostBetteenDates(
    placeId,
    from,
    to
  )

  return {
    accommodations,
    costs
  }
}
