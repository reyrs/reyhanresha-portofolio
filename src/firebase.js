// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCefVRErSFBHtGIMAd_PEZPWu1td5N38Pg",
  authDomain: "reyhanresha-685c1.firebaseapp.com",
  projectId: "reyhanresha-685c1",
  storageBucket: "reyhanresha-685c1.firebasestorage.app",
  messagingSenderId: "675744495336",
  appId: "1:675744495336:web:54e16e34e5bcdfad9dfb5d",
  measurementId: "G-3BBS19YQYV"
};

// Init Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);

// Auth
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export const loginWithGoogle = () => signInWithPopup(auth, provider);
export const logout = () => signOut(auth);

// Firestore
export const db = getFirestore(app);
