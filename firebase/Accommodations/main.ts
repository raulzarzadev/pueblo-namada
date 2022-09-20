import { Dates } from 'firebase-dates-util'
import { where } from 'firebase/firestore'
import { FirebaseCRUD } from '../FirebaseCRUD'
import { Accommodation } from './accommodation.model'
const AccommodationsCRUD = new FirebaseCRUD('accommodations')

export const createAccommodation = (Accommodation: Accommodation) =>
  AccommodationsCRUD.create(Accommodation)
export const updateAccommodation = (
  AccommodationId: string,
  newAccommodation: Accommodation
) => AccommodationsCRUD.update(AccommodationId, newAccommodation)
export const deleteAccommodation = (AccommodationId: string) =>
  AccommodationsCRUD.delete(AccommodationId)
export const getAccommodation = (AccommodationId: string) =>
  AccommodationsCRUD.get(AccommodationId)
export const listen = (AccommodationId: string, cb: CallableFunction) =>
  AccommodationsCRUD.listen(AccommodationId, cb)
export const listenAllAccommodations = (cb: CallableFunction) =>
  AccommodationsCRUD.listenAll(cb)

export const listenPlaceAccommodations = (
  placeId: string,
  cb: CallableFunction
) => AccommodationsCRUD.listenDocs([where('place', '==', placeId)], cb)

export const getPlaceAccomodationsBettwenDates = (
  placeId: string,
  startDate: string,
  endDate: string
) => {
  /*   console.log(placeId, startDate, endDate)
    console.log(FirebaseCRUD.dateToFirebase(startDate)?.toDate()) */
  console.log(Dates.toMiliseconds(startDate))

  return AccommodationsCRUD.getMany([
    where('dates.startsAt', '>=', Dates.toMiliseconds(startDate)),
    where('dates.startsAt', '<=', Dates.toMiliseconds(endDate)),
    where('place', '==', placeId)
  ])
}
/*  //[
  /*  where('dates.starts', '>', FirebaseCRUD.dateToFirebase(startDate)),
   where('dates.starts', '<', FirebaseCRUD.dateToFirebase(endDate)), */
