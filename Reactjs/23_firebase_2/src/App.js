import { useFirebase } from './context/Firebase';
import './App.css';
import { useState } from 'react';

function App() {
  const firebase = useFirebase();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailSignup = () => {
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
  };

  const handleGoogleSignup = () => {
    firebase.signupWithGoogle()
      .then((result) => {
        const user = result.user;
        firebase.putData("users/" + user.uid, {
          email: user.email,
          uid: user.uid,
          name: user.displayName,
          provider: "google"
        });
        alert("Google sign-in successful");
      })
      .catch((error) => {
        console.error(error.code, error.message);
        alert("Google sign-in failed: " + error.message);
      });
  };

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
      <button onClick={handleEmailSignup}>
        Sign up with Email
      </button>

      <br/><br/>

      <button onClick={handleGoogleSignup}>
        Sign up with Google
      </button>
    </div>
  );
}

export default App;
