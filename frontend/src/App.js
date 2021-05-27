import React, { useState, useEffect } from "react";
import { Link, Route } from "react-router-dom";
import axios from "axios";
import "./App.css";
import Navigation from "./components/Navigation";
import Register from "./components/Register";
import Login from "./components/Login";

export default function App() {
  return (
    <div>
      <Navigation />
      <Route exact path="/register" component={Register} />
      <Route exact path="/Login" component={Login} />
    </div>
  );
}
