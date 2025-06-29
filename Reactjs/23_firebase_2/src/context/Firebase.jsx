import { createContext, useContext } from 'react';
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { getDatabase, set, ref } from "firebase/database";

// Config
const firebaseConfig = {
  apiKey: "AIzaSyDTi8Fy3EHabrAAXfmr9yXmNe3MzXaAFiE",
  authDomain: "myapp-b987d.firebaseapp.com",
  projectId: "myapp-b987d",
  storageBucket: "myapp-b987d.appspot.com", // Fixed storageBucket URL
  messagingSenderId: "1074233968112",
  appId: "1:1074233968112:web:be326975c7d530f6480935",
  databaseURL: "https://myapp-b987d-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const database = getDatabase(firebaseApp);

// Context
const FirebaseContext = createContext(null);
export const useFirebase = () => useContext(FirebaseContext);

// Provider
export const FirebaseProvider = (props) => {

  const signupUserWithEmailAndPassword = (email, password) => {
    return createUserWithEmailAndPassword(firebaseAuth, email, password);
  };

  const putData = (key, data) => set(ref(database, key), data);

  return (
    <FirebaseContext.Provider value={{ signupUserWithEmailAndPassword, putData }}>
      {props.children}
    </FirebaseContext.Provider>
  );
};
