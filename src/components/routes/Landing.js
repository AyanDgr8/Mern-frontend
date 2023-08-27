// src/components/routes/Landing.js

import React from "react";
import './Landing.css' ;
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div>
      <p id="sentence">Click the button below to start recording</p>
      <Link to="/login">
        <button class="start-record">Start Recording</button>
      </Link>
    </div>
  );
};

export default Landing;
