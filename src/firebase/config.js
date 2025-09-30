// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD0TtYOI3HW8DuEWTAj_QMcC5EV3hBveCs",
  authDomain: "finance-ce394.firebaseapp.com",
  projectId: "finance-ce394",
  storageBucket: "finance-ce394.firebasestorage.app",
  messagingSenderId: "66003840183",
  appId: "1:66003840183:web:9e1c8330a4138636baf132",
  measurementId: "G-VFJYY1V5FS"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const db = getFirestore()