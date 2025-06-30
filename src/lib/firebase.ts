// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDOddX7Sv2JpibdPPDwaNrxkCYtfSh9t5U",
  authDomain: "my-portfolio-e5fa7.firebaseapp.com",
  projectId: "my-portfolio-e5fa7",
  storageBucket: "my-portfolio-e5fa7.firebasestorage.app",
  messagingSenderId: "783410550728",
  appId: "1:783410550728:web:0c3865b65e18890bc812fd",
  measurementId: "G-WJ7N0DRNB0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
export { db, storage };
