import { Accommodation } from '@firebase/Accommodations/accommodation.model'
import { Dates } from 'firebase-dates-util'
import { getAuth } from 'firebase/auth'
import { arrayUnion, where } from 'firebase/firestore'
import { FirebaseCRUD } from '../FirebaseCRUD'
import { Place } from './place.model'

const placesCRUD = new FirebaseCRUD('places')

export const createPlace = (newplace: Place) => placesCRUD.create(newplace)

export const updatePlace = (placeId: string, newplace: Place) =>
  placesCRUD.update(placeId, newplace)

export const deletePlace = (placeId: string) => placesCRUD.delete(placeId)

export const getPlace = (placeId: string) => placesCRUD.get(placeId)

export const listenPlace = (placeId: string, cb: CallableFunction) =>
  placesCRUD.listen(placeId, cb)

export const listenPlaces = (cb: CallableFunction) =>
  placesCRUD.listenAll(cb)

export const listenUserPlaces = (cb: CallableFunction) => {
  const userId = getAuth().currentUser?.uid
  return placesCRUD.listenDocs([where('userId', '==', userId)], cb)
}

export function requestAccommodation (accommodationRequest: Accommodation) {
  const formatedDates = Dates.deepFormatObjectDates({ ...accommodationRequest, createdAt: new Date() })
  return placesCRUD.update(accommodationRequest?.placeId, { requests: arrayUnion(formatedDates) })
}


