import { useEffect } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext"; // Import the useAuth hook
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const { logout } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .delete("/signOut")
      .then(() => {
        logout();
        navigate("/");
      })
      .catch(error => {
        console.error("Network error", error);
      });
  }, [navigate, logout]);
}
