// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCqbtMGwqq676li-XsxARmQfvhFk9M0Zog",
  authDomain: "student-dashboard-316d3.firebaseapp.com",
  projectId: "student-dashboard-316d3",
  storageBucket: "student-dashboard-316d3.firebasestorage.app",
  messagingSenderId: "231415928296",
  appId: "1:231415928296:web:45d7bf1cc3133e0d16405d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };