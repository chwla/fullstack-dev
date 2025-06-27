import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyAaGo_FBdUis2oMe9hG4qdPUJu9RqFiMWM",
  authDomain: "app-63eeb.firebaseapp.com",
  projectId: "app-63eeb",
  storageBucket: "app-63eeb.firebasestorage.app",
  messagingSenderId: "572277884786",
  appId: "1:572277884786:web:a7057f622274a0d34dffeb",
  databaseURL: "https://app-63eeb-default-rtdb.firebaseio.com"
};

export const app = initializeApp(firebaseConfig);