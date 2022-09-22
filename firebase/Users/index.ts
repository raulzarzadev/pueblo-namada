import { where } from 'firebase/firestore'
import { FirebaseCRUD } from '../FirebaseCRUD'
import { User } from './user.model'

const usersCRUD = new FirebaseCRUD('users')

export const setUser = (itemId: string, newItem: object) => usersCRUD.setDoc(itemId, newItem)

export const createUser = (newItem: User) => usersCRUD.create(newItem)

export const updateUser = (itemId: string, newItem: User) =>
  usersCRUD.update(itemId, newItem)

export const deleteUser = (itemId: string) => usersCRUD.delete(itemId)

export const getUser = (itemId: string) => usersCRUD.get(itemId)

export const listenUser = (itemId: string, cb: CallableFunction) =>
  usersCRUD.listen(itemId, cb)


