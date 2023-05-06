// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDLl182ZETO3XQN88mTbDb-e6UPxZCitnI",
  authDomain: "manga-afa82.firebaseapp.com",
  projectId: "manga-afa82",
  storageBucket: "manga-afa82.appspot.com",
  messagingSenderId: "946048162369",
  appId: "1:946048162369:web:dfda8509799c7854b844c0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();