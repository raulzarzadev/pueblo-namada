import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signOut
} from 'firebase/auth'
import { auth } from '.'
import { mapUserFromFirebase } from './firebase-helpers'
import { createUser, getUser, setUser } from './Users'

export async function signUp({ email, password }) {
  return await createUserWithEmailAndPassword(
    auth,
    email,
    password
  )
    .then(({ user }) => {
      return { email, password }
    })
    .catch((error) => {
      console.error(error)
    })
}

export async function signIn({ email, password }) {
  return await signInWithEmailAndPassword(
    auth,
    email,
    password
  )
    .then((userCredential) => userCredential)
    .catch((err) => console.error(err))
}

export function authStateChanged(...props) {
  const cb = props?.pop()
  return onAuthStateChanged(auth, async (user) => {
    if (user) {
      // get user
      const dbuser = await getUser(user?.uid).catch((err) =>
        console.error(err)
      )
      cb(dbuser)
      // console.log(user)
      // cb(mapUserFromFirebase(user))
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      // ...
    } else {
      if (cb) {
        // console.log(cb)
        cb(null)
      } else {
        console.log('err auth state change')
      }
    }
  })
}

export async function sendRecoverPasswordEmail({ email }) {
  return await sendPasswordResetEmail(auth, email)
    .then(() => {
      console.log('Email sent.')
      return true
      // Password reset email sent!
      // ..
    })
    .catch((error) => {
      console.error(error)
    })
}
export function logout() {
  return signOut(auth)
}
