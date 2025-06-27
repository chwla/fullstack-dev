// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "api_key",
  authDomain: "app-63eeb.firebaseapp.com",
  projectId: "app-63eeb",
  storageBucket: "app-63eeb.appspot.com",
  messagingSenderId: "572277884786",
  appId: "1:572277884786:web:a7057f622274a0d34dffeb",
  databaseURL: "https://app-63eeb-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
