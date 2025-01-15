import React, { useEffect, useState } from "react";
import './dashboard.css';


const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  const fetchData = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("No token found. Please log in.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/protected-route", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setUser(data.user);
    } catch (err) {
      console.error("Error fetching user data:", err.message);
      setError("Failed to fetch user data. Please try again.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard">
      <h1>Welcome to the Dashboard</h1>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Phone:</strong> {user.phone}</p>
      <p><strong>User ID:</strong> {user._id}</p>
    </div>
  );
};

export default Dashboard;
