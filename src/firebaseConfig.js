// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCwat86PChHJnO2E0yRa4y1WvCbKgWfW6c",
  authDomain: "portfolio-abuzar.firebaseapp.com",
  projectId: "portfolio-abuzar",
  storageBucket: "portfolio-abuzar.firebasestorage.app",
  messagingSenderId: "1084035538908",
  appId: "1:1084035538908:web:d324aa3d9afabcb56bb919",
  measurementId: "G-16PJNV63F7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);