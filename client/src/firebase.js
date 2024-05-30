// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-ae03b.firebaseapp.com",
  projectId: "mern-auth-ae03b",
  storageBucket: "mern-auth-ae03b.appspot.com",
  messagingSenderId: "908878696568",
  appId: "1:908878696568:web:aa6ad0104c7729b2d61d8d",
  measurementId: "G-9FP4732RMP"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);