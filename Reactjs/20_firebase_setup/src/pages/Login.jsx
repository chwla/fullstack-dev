import React, { useState} from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebase";

const auth = getAuth(app);

const Login = ()=>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginUser = () => {
    signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            alert("Log in successful!");
        })
        .catch((error) => {
            alert("Wrong email/password!");
        });
};

    return(
        <div className="login-page">
            <h1>Login</h1>
            <label >Email</label>
            <input 
                onChange={(e)=> setEmail(e.target.value)}
                value={email}
                type="email" 
                placeholder="Enter your email here"
            />
            <label>Password</label>
            <input 
                onChange={(e)=> setPassword(e.target.value)}
                value={password}
                type="password" 
                placeholder="Enter your password here"
            />
            <button onClick={loginUser}>Login</button>
        </div>
    );
};

export default Login;