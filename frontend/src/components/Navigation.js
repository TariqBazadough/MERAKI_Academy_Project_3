import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Link, Route } from "react-router-dom";
import Register from "./Register";

const Navigation = () => {
  return (
    <div className="navigation">
      <Link to="/login"> Login </Link>
      <Link to="/register"> Register </Link>
    </div>
  );
};

export default Navigation;
