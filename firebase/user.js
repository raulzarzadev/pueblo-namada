import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signOut
} from 'firebase/auth'
import { auth } from '.'
import { getUser } from './Users'

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
  ).then((userCredential) => userCredential)
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

export async function sendRecoverPasswordEmail({
  email,
  domain
}) {
  const actionCodeSettings = {
    url: `https://${domain}/?email=${email}`,
    iOS: {
      bundleId: domain
    },
    android: {
      packageName: domain,
      installApp: true,
      minimumVersion: '12'
    },
    handleCodeInApp: true
  }
  return await sendPasswordResetEmail(
    auth,
    email,
    actionCodeSettings
  )
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
