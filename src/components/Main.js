// src/components/Main.js


import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./routes/Login";
import Register from "./routes/Register";
import Record from "./routes/Record";
import Landing from "./routes/Landing";
import Videos from "./routes/Videos";

export default function Main() {
    return <div>
        <Router>
            <Routes>
                <Route path="/login" Component={Login} /> 
                <Route path="/register" Component={Register} />
                <Route path="/record" Component={Record} />
                <Route path="/videos" Component={Videos} />
                <Route path="/" Component={Landing} /> 
            </Routes>
        </Router>
      </div>
  }

