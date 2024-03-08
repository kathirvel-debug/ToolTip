// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyApi8Cs8d8OGb3nObzK218QV4QEHfGRJgE",
  authDomain: "hallowed-anthem-310607.firebaseapp.com",
  projectId: "hallowed-anthem-310607",
  storageBucket: "hallowed-anthem-310607.appspot.com",
  messagingSenderId: "19782351845",
  appId: "1:19782351845:web:8304c6bd231e18e4bf8d0c",
  measurementId: "G-0ECJ92ZBVX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
