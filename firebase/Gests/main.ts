import { where } from 'firebase/firestore'
import { FirebaseCRUD } from '../FirebaseCRUD'
import { Guest } from './guest.model'

const guestsCRUD = new FirebaseCRUD('guests')

export const createGuest = (newGuest: Guest) => guestsCRUD.create(newGuest)
export const updateGuest = (guestId: string, newGuest: Guest) =>
  guestsCRUD.update(guestId, newGuest)
export const deleteGuest = (guestId: string) => guestsCRUD.delete(guestId)
export const getGuest = (guestId: string) => guestsCRUD.get(guestId)
export const listenGuest = (guestId: string, cb: CallableFunction) =>
  guestsCRUD.listen(guestId, cb)
export const listenPlaceGuests = (placeId: string, cb: CallableFunction) =>
  guestsCRUD.listenDocs([where('placeId', '==', placeId)], cb)

export const listenUserGuests = (userId: string, cb: CallableFunction) =>
  guestsCRUD.listenDocs([where('userId', '==', userId)], cb)
