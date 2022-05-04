import { db } from './index'
import { collection, query, where, onSnapshot, addDoc, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { auth } from './index'
import { mapUserFromFirebase } from './firebase-helpers';
import { async } from '@firebase/util';

export async function getPlaces(cb) {
  const places = collection(db, 'places');
  const docsSnapshot = await getDocs(places);
  const placesList = docsSnapshot.docs.map(doc => doc.data());
  console.log(docsSnapshot)
}

export async function listenPlaces(...props) {
  const cb = props.pop()

  const q = query(collection(db, 'places'))
  onSnapshot(q, querySnapshot => {
    let places = []
    querySnapshot.docs.forEach(doc => {
      places.push({ ...doc.data(), id: doc.id })
    }
    )
    cb(places)
  })

}

export async function updatePlace(id, place) {
  const placeRef = doc(db, 'places', id)
  return await updateDoc(placeRef, place)
    .then(res => {
      return { message: 'updated', place, res }
    })
    .catch(err => console.error('error', err))
}

export async function listenPlace(...props) {
  const cb = props.pop()
  const id = props[0]
  const q = query(doc(collection(db, 'places'), id))
  onSnapshot(q, querySnapshot => {
    let place = querySnapshot.data()
    place ? cb({ ...place, id }) : cb(null)
  }
  )
}

export async function deletePlace(...props) {
  const id = props[0]
  console.log(props);
  return await deleteDoc(doc(db, 'places', id)).then(
    res => true
  ).catch(err => console.error(err))
}

export async function listenUserPlaces(...props) {
  const cb = props.pop()
  let q
  if (auth.currentUser) {
    q = query(collection(db, 'places'), where('userId', '==', auth.currentUser.uid))
  } else {
    q = query(collection(db, 'places'))
  }
  onSnapshot(q, querySnapshot => {
    let places = []
    querySnapshot.docs.forEach(doc => {
      places.push({ ...doc.data(), id: doc.id })
    }
    )
    cb(places)
  })

}


export async function newPlace(place) {
  const user = mapUserFromFirebase(auth.currentUser)
  if (!user) return console.error('No user logged in')
  try {
    const docRef = await addDoc(collection(db, 'places'), {
      ...place,
      userId: user.uid,
    })
    return { message: `Document written with ID: ${docRef.id}`, document: place }
  } catch (error) {
    console.error(error)
  }

}
