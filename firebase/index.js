import { initializeApp, getApps } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
// const { initializeAppCheck, ReCaptchaV3Provider } = require("firebase/app-check");

const firebaseConfig = process.env.NEXT_PUBLIC_FIREBASE_CONFIG

const app = initializeApp(JSON.parse(firebaseConfig))
export const db = getFirestore(app)

export const auth = getAuth(app)
export const storage = getStorage(app)

/* const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider('abcdefghijklmnopqrstuvwxy-1234567890abcd'),

  // Optional argument. If true, the SDK automatically refreshes App Check
  // tokens as needed.
  isTokenAutoRefreshEnabled: true
});
 */
