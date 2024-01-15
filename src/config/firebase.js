// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFhMZNOghwPEmqXNw9H78qZBJiKq_lkAE",
  authDomain: "react-social-media-2c281.firebaseapp.com",
  projectId: "react-social-media-2c281",
  storageBucket: "react-social-media-2c281.appspot.com",
  messagingSenderId: "521925387918",
  appId: "1:521925387918:web:1d18486e5044d7d55bcbdf",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
