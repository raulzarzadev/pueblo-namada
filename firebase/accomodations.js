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
import { async } from '@firebase/util'

export async function getAccommodations(cb) {
  const accommodations = collection(db, 'accommodations')
  const docsSnapshot = await getDocs(accommodations)
  const accommodationsList = docsSnapshot.docs.map((doc) => doc.data())
  console.log(docsSnapshot)
}

export async function listenAccommodations(...props) {
  const cb = props.pop()
  const q = query(collection(db, 'accommodations'))
  onSnapshot(q, (querySnapshot) => {
    const accommodations = []
    querySnapshot.docs.forEach((doc) => {
      accommodations.push({ ...doc.data(), id: doc.id })
    })
    cb(accommodations)
  })
}

export async function updateAccommodations(id, accommodations) {
  const accommodationsRef = doc(db, 'accommodations', id)
  return await updateDoc(accommodationsRef, accommodations)
    .then((res) => {
      return { message: 'updated', accommodations, res }
    })
    .catch((err) => console.error('error', err))
}

export async function listenAccommodation(...props) {
  const cb = props.pop()
  const id = props[0]
  const q = query(doc(collection(db, 'accommodations'), id))
  onSnapshot(q, (querySnapshot) => {
    const accommodations = querySnapshot.data()
    accommodations ? cb({ ...accommodations, id }) : cb(null)
  })
}

export async function deleteAccommodation(...props) {
  const id = props[0]
  console.log(props)
  return await deleteDoc(doc(db, 'accommodations', id))
    .then((res) => true)
    .catch((err) => console.error(err))
}

export async function listenUserAccommodations(...props) {
  const cb = props.pop()
  let q
  if (auth.currentUser) {
    q = query(
      collection(db, 'accommodations'),
      where('userId', '==', auth.currentUser.uid)
    )
  } else {
    q = query(collection(db, 'accommodations'))
  }
  onSnapshot(q, (querySnapshot) => {
    const accommodations = []
    querySnapshot.docs.forEach((doc) => {
      accommodations.push({ ...doc.data(), id: doc.id })
    })
    cb(accommodations)
  })
}

export async function listenAccommodationPayments(...props) {
  const cb = props.pop()
  const { guestId, placeId } = props[0]
  const q = query(
    collection(db, 'accommodations'),
    where('guest', '==', guestId),
    where('place', '==', placeId)
  )
  onSnapshot(q, (querySnapshot) => {
    const accommodations = []
    querySnapshot.docs.forEach((doc) => {
      accommodations.push({ ...doc.data(), id: doc.id })
    })
    cb(accommodations)
  })
}

export async function newAccommodation(accommodation) {
  const user = mapUserFromFirebase(auth.currentUser)
  if (!user) return console.error('No user logged in')
  try {
    const docRef = await addDoc(collection(db, 'accommodations'), {
      ...accommodation,
      userId: user.uid,
      createdAt: new Date().toISOString()
    })
    return {
      message: `Document written with ID: ${docRef.id}`,
      document: accommodation
    }
  } catch (error) {
    console.error(error)
  }
}

export async function listenPlacePayments(...props) {
  const cb = props.pop()
  const placeId = props[0]
  const q = query(
    collection(db, 'accommodations'),
    where('place', '==', placeId)
  )
  onSnapshot(q, (querySnapshot) => {
    const accommodations = []
    querySnapshot.docs.forEach((doc) => {
      accommodations.push({ ...doc.data(), id: doc.id })
    })
    cb(accommodations)
  })
}
