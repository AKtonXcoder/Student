// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBrTMQgRMHP2J1lZ5vro23bE8N7cCpufy0",
  authDomain: "student-dashboard-9eba5.firebaseapp.com",
  projectId: "student-dashboard-9eba5",
  storageBucket: "student-dashboard-9eba5.firebasestorage.app",
  messagingSenderId: "574468968203",
  appId: "1:574468968203:web:741f8bc46941b518295c0e",
  measurementId: "G-T8CB3TD7T8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
export { auth, db };
