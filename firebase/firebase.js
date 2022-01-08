// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD5TdSdt_Y0rVwVpPDRxTaFYDrFMy56w4c",
  authDomain: "social-netw-app.firebaseapp.com",
  projectId: "social-netw-app",
  storageBucket: "social-netw-app.appspot.com",
  messagingSenderId: "122899444749",
  appId: "1:122899444749:web:a9b9f5cf02e47845f6d144"
};

export const initApp = async () => {
  let app = null
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
  }
  return app
}
