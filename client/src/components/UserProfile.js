import React, { useState, useEffect, useContext } from "react"; // Add useContext to the import statement
import { AuthContext } from "./AuthContext";
import axios from "axios";

function UserProfile() {
  const { isAuthenticated, user, setCurrentUser } = useContext(AuthContext); // Now useContext is defined
  const [hasFetchedUser, setHasFetchedUser] = useState(false); // State to track if user has been fetched

  useEffect(() => {
    if (isAuthenticated && !hasFetchedUser) {
      axios
        .get("/user")
        .then(response => {
          setCurrentUser(response.data); // Update user in the AuthContext
          setHasFetchedUser(true); // Update state to indicate user has been fetched
        })
        .catch(error => {
          console.error("Error fetching current user:", error);
        });
    }
  }, [isAuthenticated, setCurrentUser, hasFetchedUser]); // dependency array

  if (!isAuthenticated || !user.username) {
    return <p>Please log in to view your profile.</p>;
  }

  return (
    <div>
      <h1>User Profile</h1>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
    </div>
  );
}

export default UserProfile;
