import { getAuth } from 'firebase/auth'
import { where } from 'firebase/firestore'
import { FirebaseCRUD } from '../FirebaseCRUD'
import { RoomRequest } from './roomRequest.model'


const roomRequestsCRUD = new FirebaseCRUD('roomRequests')

export const createRoomRequest = (RoomRequest: RoomRequest) =>
  roomRequestsCRUD.create({ ...RoomRequest, status: 'UNSOLVED' })

export const updateRoomRequest = (
  roomRequestId: string,
  newRoomRequest: RoomRequest
) => roomRequestsCRUD.update(roomRequestId, newRoomRequest)

export const deleteRoomRequest = (roomRequestId: string) =>
  roomRequestsCRUD.delete(roomRequestId)

export const getRoomRequest = (roomRequestId: string) =>
  roomRequestsCRUD.get(roomRequestId)

export const listen = (roomRequestId: string, cb: CallableFunction) =>
  roomRequestsCRUD.listen(roomRequestId, cb)

export const listenAllRoomRequests = (cb: CallableFunction) =>
  roomRequestsCRUD.listenAll(cb)

export const listenPlaceRoomRequests = (
  placeId: string,
  cb: CallableFunction
) => roomRequestsCRUD.listenDocs([where('place', '==', placeId)], cb)

export const listenUserPlaceRoomRequests = (placeId: string, cb: CallableFunction) => {
  const currentUserId = getAuth().currentUser?.uid
  return roomRequestsCRUD.listenDocs([where('place', '==', placeId), where('userId', '==', currentUserId)], cb)
}

export const listenUserRequests = (cb: CallableFunction) => {
  const currentUserId = getAuth().currentUser?.uid
  return roomRequestsCRUD.listenDocs([where('userId', '==', currentUserId)], cb)
}