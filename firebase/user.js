import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signOut,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth'
import { auth } from '.'
import { getUser, listenUser, setUser } from './Users'

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

export async function googleLogin() {
  const provider = new GoogleAuthProvider()
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential =
        GoogleAuthProvider.credentialFromResult(result)
      const token = credential.accessToken
      // The signed-in user info.
      const user = result.user

      // console.log(user)
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code
      const errorMessage = error.message
      // The email of the user's account used.
      const email = error.customData.email
      // The AuthCredential type that was used.
      const credential =
        GoogleAuthProvider.credentialFromError(error)
      // ...
    })
}

const createUser = (user) => {
  console.log(user)
  const {
    emailVerified,
    photoURL,
    phoneNumber,
    providerData,
    uid,
    email,
    displayName
  } = user

  const newUser = {
    id: uid,
    name: displayName,
    displayName,
    email: email,
    emailVerified,
    image: photoURL,
    photoURL: photoURL,
    phone: phoneNumber,
    phoneNumber,
    providerData
  }
  setUser(newUser.id, { ...newUser })
    .then((res) => {
      console.log('user created')
    })
    .catch((err) => {
      console.error('create user error')
    })

  return newUser
}

export function authStateChanged(...props) {
  const cb = props?.pop()
  return onAuthStateChanged(auth, async (user) => {
    if (user) {
      listenUser(user.uid, (dbUser) => {
        if (dbUser) {
          cb(dbUser)
        } else {
          createUser(user)
        }
      })
    } else {
      cb(null)
      console.log('not logged')
    }
  })
}

export async function sendRecoverPasswordEmail({
  email,
  domain
}) {
  const DOMAIN = 'pueblonomada.page.link'
  const actionCodeSettings = {
    url: `https://${DOMAIN}/?email=${email}`,
    iOS: {
      bundleId: DOMAIN
    },
    android: {
      packageName: DOMAIN,
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
    .then((res) => {
      console.log('Email sent', { res })
      return { res }
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
