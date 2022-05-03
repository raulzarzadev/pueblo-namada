import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signOut } from "firebase/auth";
import { auth } from ".";
import { mapUserFromFirebase } from "./firebase-helpers";

export function createUser({ email, password }) {

  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
}


export async function signIn({ email, password }) {
  return await signInWithEmailAndPassword(auth, email, password)
    .then(
      (userCredential) => userCredential
    )
    .catch(err => console.error(err))
}

export function authStateChanged(...props) {
  const cb = props.pop()
  return onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      cb(mapUserFromFirebase(user))
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      // ...
    } else {
      cb(null)
      return null
      // User is signed out
      // ...
    }
  });
}

export async function sendRecoverPasswordEmail({ email }) {

  return await sendPasswordResetEmail(auth, email)
    .then(() => {
      console.log('Email sent.');
      return true
      // Password reset email sent!
      // ..
    })
    .catch((error) => {
      console.error(error)
    });
}
export function logout() {
  signOut(auth)
} 