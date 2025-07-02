import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useFirebase } from "../context/Firebase";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const firebase = useFirebase();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(()=>{
        if(firebase.isLoggedIn){
            navigate("/");
        }
    }, [firebase, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await firebase.signInWithEmailAndPass(email, password);
            console.log("Logging in user:", result);
        } catch (err) {
            console.error("Login failed:", err.message);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            const result = await firebase.signInWithGoogle();
            console.log("Google sign-in success:", result);
        } catch (err) {
            console.error("Google login failed:", err.message);
        }
    };

    return (
        <div className="container mt-5">
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                        onChange={e => setEmail(e.target.value)} 
                        value={email} 
                        type="email" 
                        placeholder="Enter email" 
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        onChange={e => setPassword(e.target.value)} 
                        value={password} 
                        type="password" 
                        placeholder="Password" 
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Log in
                </Button>
            </Form>

            <h4 className="mt-4 text-center">OR</h4>

            <div className="text-center mt-3">
                <Button variant="danger" onClick={handleGoogleSignIn}>
                    Sign in with Google
                </Button>
            </div>
        </div>
    );
};

export default LoginPage;
