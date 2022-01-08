import { initApp } from './firebase'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth'

initApp()
const auth = getAuth()
// Inside AuthProvider
const provider = new GoogleAuthProvider();

export const GoogleLogin = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log({ credential, token, user });
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log({ errorCode, errorMessage, email, credential });
    });
};


export const signup = ({ email, password }) => new Promise((res, rej) => {
  createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
    const user = userCredential.user
    res(user.providerData[0])
  }).catch((error) => {
    const errorCode = error.code
    const errorMessage = error.message
    rej(errorMessage)
  })
})

export const signin = ({ email, password }) => new Promise((res, rej) => {
  signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
    const user = userCredential.user
    res(user.providerData[0])
  }).catch((error) => {
    const errorCode = error.code
    const errorMessage = error.message
    rej(errorMessage)
  })
})

export const signout = () => new Promise((res, rej) => {
  signOut(auth).then(() => {
    res(true)
  }).catch((error) => {
    res(false)
  })
})

export const authWatcher = (cb) =>
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const userData = user.providerData[0]
      cb(userData, true)
    } else {
      cb(null, false)
    }
  })
