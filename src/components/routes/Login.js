// src/components/routes/Login.js

import React, { useState } from "react";
import './Login.css' ;
import axios from "axios";
import { useNavigate, Link} from "react-router-dom";



export default function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [isRegistered, setIsRegistered] = useState(false);
    const Navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);

        if (!email) {
            alert("Please Fill your Email ");
            return;
        }

        if (!email.includes('@')) {
            alert('Email should contain @');
            return;
        } 

        if (!password) {
            alert("Please Fill the password");
            return;
        }
        
        
        try {
            const response = await axios.post(
                'YOUR_API_ENDPOINT/login',
                { email, password },
                { headers: { 'Content-Type': 'application/json' } }
            );

            const jwtToken = response.data.data;
            if (jwtToken) {
                localStorage.setItem("jwtToken", jwtToken);
                // setIsRegistered(true);
                window.location.href = "/";
            } else {
                alert('Failed to receive JWT token.');
            }
        } catch (error) {
            console.error("Axios error:", error);
            alert('Failed to Sign In: ' + error.message);
        }
    };

    return (
        
        <div class="login-container">
            <h1 class="head">Login</h1>
            <form action="YOUR_API_ENDPOINT/login" method="post" id="form-section" onSubmit={handleSubmit}>
                <input
                    type="text"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    placeholder="Email"
                />
                <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    placeholder="Password"
                />
                <button type="submit">Sign in</button>
            </form>
            <h3 class="head2">Not a registered user?</h3>
            <Link to="/register" class="register-link">
                Register
            </Link>
        </div>
    );
}

