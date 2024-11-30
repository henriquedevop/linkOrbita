import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCeU2bPuMugYG4twZar8KbZuCu5qorwal0",
  authDomain: "linkorbita-eb97a.firebaseapp.com",
  projectId: "linkorbita-eb97a",
  storageBucket: "linkorbita-eb97a.firebasestorage.app",
  messagingSenderId: "525597800831",
  appId: "1:525597800831:web:63ce19f6b2f411deee824a",
  measurementId: "G-LYC07L1BGN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const fireStore = getFirestore()
const analytics = getAnalytics(app);

export { auth, fireStore}