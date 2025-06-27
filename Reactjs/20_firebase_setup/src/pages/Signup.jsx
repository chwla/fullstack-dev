import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const createUser = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => alert("Success!"))
      .catch(err => alert("Error: " + err.message));
  };

  return (
    <div className="signup-page">
        <h1>Sign Up</h1>
      <label>Email</label>
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder='Enter your email here'
      />
      <label>Password</label>
      <input
        type="password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder='Enter your password here'
      />
      <button onClick={createUser}>Sign Up</button>
    </div>
  );
};

export default Signup;
