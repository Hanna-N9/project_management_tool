import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [signupInfo, setSignupInfo] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { setIsAuthenticated, setCurrentUser } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = e => {
    setSignupInfo({ ...signupInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .post("/sign_up", signupInfo)
      .then(response => {
        if (response.data.error) {
          setErrorMessage(response.data.error);
        } else {
          setSuccessMessage("Successfully signed up");
          setIsAuthenticated(true); // Only set isAuthenticated to true once after a successful signup
          setCurrentUser(response.data); // Update user in the AuthContext
          navigate("/user"); // Redirect to user profile
        }
      })
      .catch(error => {
        if (error.response) {
          setErrorMessage(error.response.data.error);
        } else if (error.request) {
          setErrorMessage("No response received from the server.");
        } else {
          setErrorMessage("An error occurred during signup.");
        }
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        value={signupInfo.username}
        onChange={handleInputChange}
        name="username"
      />
      <input
        type="email"
        placeholder="Email"
        value={signupInfo.email}
        onChange={handleInputChange}
        name="email"
      />
      <input
        type="password"
        placeholder="Password"
        value={signupInfo.password}
        onChange={handleInputChange}
        name="password"
      />
      <button type="submit">Sign Up</button>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
    </form>
  );
}
