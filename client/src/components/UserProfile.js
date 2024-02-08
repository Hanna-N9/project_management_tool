import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import axios from "axios";

function UserProfile() {
  const { isAuthenticated, user, setCurrentUser, setIsAuthenticated } =
    useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    axios
      .delete("/signOut")
      .then(() => {
        setIsAuthenticated(false);
        setCurrentUser(null); // Clear user data from the context
        navigate("/"); // Redirect to the home page
      })
      .catch(error => {
        console.error("Error during logout:", error);
      });
  };

  if (!isAuthenticated || !user.username) {
    return <p>Please log in to view your profile.</p>;
  }

  return (
    <div>
      <h1>User Profile</h1>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default UserProfile;
