import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged
} from 'firebase/auth';

const FirebaseContext = createContext(null);

const firebaseConfig = {
  apiKey: "AIzaSyBgSnwCCfg9KC1K5ayBlC8xmNd3cWoslpc",
  authDomain: "bookify-b9638.firebaseapp.com",
  projectId: "bookify-b9638",
  storageBucket: "bookify-b9638.firebasestorage.app",
  messagingSenderId: "758634400875",
  appId: "1:758634400875:web:756b1af11e161ba18f352e"
};

export const useFirebase = () => useContext(FirebaseContext);

const firebaseApp = initializeApp(firebaseConfig); 
const firebaseAuth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();

export const FirebaseProvider = (props) => {

  const [user, SetUser] = useState(null);

  useEffect(()=>{
    onAuthStateChanged(firebaseAuth, (user)=>{
      if(user) SetUser(user);
      else SetUser(null);
    });
  }, []);

  const signupUserWithEmailAndPassword = (email, password) => 
    createUserWithEmailAndPassword(firebaseAuth, email, password);

  const signInWithEmailAndPass = (email, password) =>
    signInWithEmailAndPassword(firebaseAuth, email, password);

  const signInWithGoogle = () =>
    signInWithPopup(firebaseAuth, googleProvider);

  const isLoggedIn = user ? true : false;

  return (
    <FirebaseContext.Provider
      value={{
        signInWithGoogle,
        signupUserWithEmailAndPassword,
        signInWithEmailAndPass,
        isLoggedIn
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
