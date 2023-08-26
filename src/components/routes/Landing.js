// src/components/routes/Landing.js

import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div>
      <p>Click the button below to start recording</p>
      <Link to="/login">
        <button>Start Recording</button>
      </Link>
    </div>
  );
};

export default Landing;
