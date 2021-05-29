import React, { useState, useEffect } from "react";
import { Link, Route } from "react-router-dom";
import axios from "axios";
import "./App.css";
import Navigation from "./components/Navigation";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

export default function App() {
  const [token, setToken] = useState("");
  return (
    <div className="main-page">
      <Navigation />
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" render={() => <Login setToken={setToken} />} />
      <Route exact path="/dashboard" component={Dashboard} />
    </div>
  );
}
