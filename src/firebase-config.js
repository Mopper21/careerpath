// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getStorage } from 'firebase/storage'; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAVhdwoMIKehFTatNdln5MjAI15-m412es",
  authDomain: "careerpath-d51e8.firebaseapp.com",
  databaseURL: "https://careerpath-d51e8-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "careerpath-d51e8",
  storageBucket: "careerpath-d51e8.appspot.com",
  messagingSenderId: "566451300543",
  appId: "1:566451300543:web:0fd05f65f4863216947e0a",
  measurementId: "G-PCQQ1DNK8H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const storage = getStorage(app);
