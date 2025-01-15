import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
// import "./index.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* Login Route */}
        <Route path="/" element={<Login />} />
        {/* Registration Route */}
        <Route path="/register" element={<Register />} />
        {/* Dashboard Route */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
