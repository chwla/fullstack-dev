import { useFirebase } from './context/Firebase';
import './App.css';
import { useState } from 'react';

function App() {
  const firebase = useFirebase();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="App">
      <h1>Firebase</h1>
      <input 
        onChange={e => setEmail(e.target.value)}
        value={email} 
        type='email' 
        placeholder='Enter Email'
      />
      <input
        onChange={e => setPassword(e.target.value)}
        value={password} 
        type='password' 
        placeholder='Enter Password'
      />
      <button
        onClick={() => {
          firebase.signupUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
              const user = userCredential.user;
              firebase.putData("users/" + user.uid, {
                email: user.email,
                uid: user.uid
              });
              alert("Signup successful");
            })
            .catch((error) => {
              console.error(error.code, error.message);
              alert("Signup failed: " + error.message);
            });
        }}
      >
        Sign up
      </button>
    </div>
  );
} // ✅ <--- You were missing this

export default App;
