import { Accommodation } from '@firebase/Accommodations/accommodation.model'
import { Dates } from 'firebase-dates-util'
import { getAuth } from 'firebase/auth'
import {
  arrayRemove,
  arrayUnion,
  where
} from 'firebase/firestore'
import { FirebaseCRUD } from '../FirebaseCRUD'
import { Place } from './place.model'

const placesCRUD = new FirebaseCRUD('places')

export const createPlace = (newplace: Place) =>
  placesCRUD.create(newplace)

export const updatePlace = (
  placeId: string,
  newplace: Place
) => placesCRUD.update(placeId, newplace)

export const deletePlace = (placeId: string) =>
  placesCRUD.delete(placeId)

export const getPlace = (placeId: string) =>
  placesCRUD.get(placeId)

export const listenPlace = (
  placeId: string,
  cb: CallableFunction
) => placesCRUD.listen(placeId, cb)

export const listenPlaces = (
  cb: CallableFunction
) =>
  placesCRUD.listenAll(
    cb
  )

export const listenUserPlaces = (
  cb: CallableFunction
) =>
  placesCRUD.listenCurrentUserDocs(cb)
