import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Link, Route } from "react-router-dom";
import axios from "axios";
// import Login from "./components/Login";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <p>Dashboard</p>
      <button>Get All Articles</button>
    </div>
  );
};

export default Dashboard;
