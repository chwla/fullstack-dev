import { createContext, useContext } from "react";
import {initializeApp} from 'firebase/app';
const FirebaseContext = createContext(null);

const firebaseConfig = {
  apiKey: "AIzaSyBgSnwCCfg9KC1K5ayBlC8xmNd3cWoslpc",
  authDomain: "bookify-b9638.firebaseapp.com",
  projectId: "bookify-b9638",
  storageBucket: "bookify-b9638.firebasestorage.app",
  messagingSenderId: "758634400875",
  appId: "1:758634400875:web:756b1af11e161ba18f352e"
};

export const useFirebase = ()=>useContext(FirebaseContext);

const firebaseApp = initializeApp(firebaseConfig); 

export const FirebaseProvider = (props) =>{
    return <FirebaseContext.Provider>
        {props.children}
    </FirebaseContext.Provider>
};