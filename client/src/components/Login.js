import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const { setIsAuthenticated, setCurrentUser } = useAuth();
  const navigate = useNavigate();

  const handleLoginChange = e => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .post("/login", credentials)
      .then(response => {
        if (response.data.error) {
          console.error(response.data.error);
        } else {
          console.log("Logged in successfully");
          setIsAuthenticated(true); // Only set isAuthenticated to true once after a successful login
          setCurrentUser(response.data); // Update user in the AuthContext
          navigate("/user"); // Redirect to user profile
        }
      })
      .catch(error => {
        console.error("Network error", error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        value={credentials.username}
        onChange={handleLoginChange}
        name="username" // Ensure the name attribute matches the state property
      />
      <input
        type="password"
        placeholder="Password"
        value={credentials.password}
        onChange={handleLoginChange}
        name="password" // Ensure the name attribute matches the state property
      />
      <button type="submit">Login</button>
    </form>
  );
}
