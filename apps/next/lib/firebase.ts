// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';


// var auth=require("firebase/auth")
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyABNFdVdKCFr6qz_t9kAY2GkL5KB5lsS5g",
  authDomain: "rizzup-2cd53.firebaseapp.com",
  projectId: "rizzup-2cd53",
  storageBucket: "rizzup-2cd53.appspot.com",
  messagingSenderId: "1095896251964",
  appId: "1:1095896251964:web:4b84e16ca64617627b8d39",
  measurementId: "G-BH2WJ7K5W3"
};


// Initialize Firebase

const app = initializeApp(firebaseConfig);
const db = getFirestore();

export { db };
