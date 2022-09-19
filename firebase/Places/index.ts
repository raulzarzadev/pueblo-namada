import { where } from 'firebase/firestore'
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
export const listenPlacePlaces = (placeId: string, cb: CallableFunction) =>
  placesCRUD.listenDocs([where('placeId', '==', placeId)], cb)

export const listenUserPlaces = (userId: string, cb: CallableFunction) =>
  placesCRUD.listenDocs([where('userId', '==', userId)], cb)
