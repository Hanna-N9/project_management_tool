import { useState } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

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
          setErrorMessage("Invalid Username or Password, Please try again.");
        } else {
          console.log("Logged in successfully");
          setIsAuthenticated(true);
          setCurrentUser(response.data);
          navigate("/user");
        }
      })
      .catch(error => {
        // If the error is due to incorrect credentials, display the custom message
        if (error.response && error.response.data.error) {
          setErrorMessage("Invalid Username or Password, Please try again.");
        } else {
          // For other errors, display a different message
          setErrorMessage("An unexpected error occurred during login.");
        }
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        value={credentials.username}
        onChange={handleLoginChange}
        name="username"
      />
      <input
        type="password"
        placeholder="Password"
        value={credentials.password}
        onChange={handleLoginChange}
        name="password"
      />
      <button type="submit">Login</button>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </form>
  );
}
