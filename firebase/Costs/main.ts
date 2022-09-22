import { Dates } from 'firebase-dates-util'
import { where } from 'firebase/firestore'
import { FirebaseCRUD } from '../FirebaseCRUD'
import { Cost } from './cost.model'
const CostsCRUD = new FirebaseCRUD('costs')

export const createCost = (Cost: Cost) =>
  CostsCRUD.create(Cost)
export const updateCost = (CostId: string, newCost: Cost) =>
  CostsCRUD.update(CostId, newCost)
export const deleteCost = (CostId: string) =>
  CostsCRUD.delete(CostId)
export const getCost = (CostId: string) =>
  CostsCRUD.get(CostId)
export const listen = (
  CostId: string,
  cb: CallableFunction
) => CostsCRUD.listen(CostId, cb)
export const listenAllCosts = (cb: CallableFunction) =>
  CostsCRUD.listenAll(cb)
export const listenPlaceCosts = (
  placeId: string,
  cb: CallableFunction
) =>
  CostsCRUD.listenDocs(where('placeId', '==', placeId), cb)

export const getPlaceCostBetteenDates = (
  placeId: unknown,
  startAt: unknown,
  endAt: unknown
) => {
  console.log(Dates.toMiliseconds(startAt))
  console.log(Dates.toMiliseconds(endAt))
  return CostsCRUD.getMany([
    where('placeId', '==', placeId),
    where('date', '>', Dates.toMiliseconds(startAt)),
    where('date', '<', Dates.toMiliseconds(endAt))
  ])
}
