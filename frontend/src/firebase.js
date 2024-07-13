// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAE_x5LrW_JAzxUpr7qtXcedn14iWG_XC0",
  authDomain: "aqua-chic.firebaseapp.com",
  projectId: "aqua-chic",
  storageBucket: "aqua-chic.appspot.com",
  messagingSenderId: "872762634817",
  appId: "1:872762634817:web:d7d04f8903f9b1599d4cc0",
  measurementId: "G-SLGYFWDPCP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

