// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDF9Q0GJSUk6CojLWALBVHYMkFrH9t6rh8",
  authDomain: "fir-crud-c085d.firebaseapp.com",
  projectId: "fir-crud-c085d",
  storageBucket: "fir-crud-c085d.appspot.com",
  messagingSenderId: "304828876715",
  appId: "1:304828876715:web:b9ac042c824d906f7334ee",
  measurementId: "G-ECG6T8X5MJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db= getFirestore(app)