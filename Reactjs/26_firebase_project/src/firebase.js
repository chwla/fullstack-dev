// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAaGo_FBdUis2oMe9hG4qdPUJu9RqFiMWM",
  authDomain: "app-63eeb.firebaseapp.com",
  databaseURL: "https://app-63eeb-default-rtdb.firebaseio.com",
  projectId: "app-63eeb",
  storageBucket: "app-63eeb.firebasestorage.app",
  messagingSenderId: "572277884786",
  appId: "1:572277884786:web:a7057f622274a0d34dffeb"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);