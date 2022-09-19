import { db, auth } from './index'
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  doc,
  deleteDoc,
  updateDoc
} from 'firebase/firestore'
import { mapUserFromFirebase } from './firebase-helpers'

export async function newPlaceGuest(guest) {
  const user = mapUserFromFirebase(auth.currentUser)

  if (!user) return console.error('No user logged in')
  if (!guest.placeId) return console.error('No placeId')

  try {
    const docRef = await addDoc(collection(db, 'guests'), {
      ...guest,
      userId: user.uid
    })
    return {
      message: `Document written with ID: ${docRef.id}`,
      document: { ...guest, id: docRef.id }
    }
  } catch (error) {
    console.error(error)
  }
}

export async function getGuests(cb) {
  const guests = collection(db, 'guests')
  const docsSnapshot = await getDocs(guests)
  const guestsList = docsSnapshot.docs.map((doc) => doc.data())
  console.log(docsSnapshot)
}

export async function updateGuest(...props) {
  const id = props[0]
  const guest = props[1]
  const guestRef = doc(db, 'guests', id)
  return await updateDoc(guestRef, {
    ...guest,
    updatedAt: new Date().toUTCString()
  })
    .then((res) => {
      return true
    })
    .catch((err) => console.error(err))
}

export async function listenPlaceGuests(...props) {
  const cb = props.pop()
  const placeId = props[0]
  const q = query(collection(db, 'guests'), where('placeId', '==', placeId))
  onSnapshot(q, (querySnapshot) => {
    const guests = []
    querySnapshot.docs.forEach((doc) => {
      guests.push({ ...doc.data(), id: doc.id })
    })
    cb(guests)
  })
}

export async function listenGuest(...props) {
  const cb = props.pop()
  const id = props[0]
  const q = query(doc(collection(db, 'guests'), id))
  onSnapshot(q, (querySnapshot) => {
    const guest = querySnapshot.data()
    guest ? cb({ ...guest, id }) : cb(null)
  })
}

export async function deleteGuest(...props) {
  const id = props[0]
  return await deleteDoc(doc(db, 'guests', id))
    .then((res) => true)
    .catch((err) => console.error(err))
}

export async function listenUserGuests(...props) {
  const cb = props.pop()

  const q = query(
    collection(db, 'guests'),
    where('userId', '==', auth.currentUser.uid)
  )
  onSnapshot(q, (querySnapshot) => {
    const guests = []
    querySnapshot.docs.forEach((doc) => {
      guests.push({ ...doc.data(), id: doc.id })
    })
    cb(guests)
  })
}
