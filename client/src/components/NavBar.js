// Navbar.js
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import "../App.css";

export default function NavBar() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <nav>
      <NavLink to="/" className="navLink" exact>
        Home
      </NavLink>
      {isAuthenticated ? (
        // Links for authenticated users
        <>
          <NavLink to="/projects" className="navLink">
            Projects
          </NavLink>
          <NavLink to="/tasks" className="navLink">
            Tasks
          </NavLink>
          <NavLink to="/comments" className="navLink">
            Comments
          </NavLink>
          <NavLink to="/logout" className="navLink">
            Logout
          </NavLink>
        </>
      ) : (
        // Links for unauthenticated users
        <>
          <NavLink to="/login" className="navLink">
            Login
          </NavLink>
          <NavLink to="/sign_up" className="navLink">
            Sign Up
          </NavLink>
        </>
      )}
    </nav>
  );
}
