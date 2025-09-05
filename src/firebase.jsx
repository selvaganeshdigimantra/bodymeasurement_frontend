// firebase.js
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup,signOut,signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCAg4NsE9k19a7r-kOg-HwlTP5j1ZC5DI0",
  authDomain: "selva-body-measurement-app.firebaseapp.com",
  projectId: "selva-body-measurement-app",
  storageBucket: "selva-body-measurement-app.firebasestorage.app",
  messagingSenderId: "923690438440",
  appId: "1:923690438440:web:5b11e5ae3ee6d3bfe48a1d",
  measurementId: "G-VPSHEK8JJW"
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);
console.log("<<<<<<<<<<>>>>>>>>>>>",auth)
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup,signOut, signInWithEmailAndPassword };
