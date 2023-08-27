// src/components/routes/Register.js

import React, { useState } from "react";
import './Register.css';
import { Link } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
//   const [isRegistered, setIsRegistered] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);

    if (name.length < 2) {
      alert("Name is required");
    }

    if (!email) {
      alert("Please fill in your Email");
      return;
    }

    if (!email.includes('@')) {
      alert('Email should contain @');
      return;
    }

    if (!password) {
      alert("Please fill in the password");
      return;
    }

    axios.post("https://videosharing-frontend-33u7.onrender.com/registering", 
    formData, 
    {
      headers: { 'Content-Type': 'application/json' },
    })
    .then(res => {
      console.log(res);

      // Simulate successful registration and automatic login
      localStorage.setItem("jwtToken", "your-jwt-token"); // Replace with your actual token
    //   setIsRegistered(true);
    })
    .catch(error => {
      console.log(error);
    });
  };

  return (
    <div class="register-container">
        <h1 class="header">Register</h1>
        <form 
            id="form_container" 
            onSubmit={handleSubmit} 
            encType="multipart/form-data">
        <input
              type="text"
              class="Register_input"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <input
              type="text"
              class="Register_input"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <input
              type="password"
              class="Register_input"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <button type="submit">Register</button>
          </form>
        </div>
  );
}
