import { NavLink } from "react-router-dom";
import "../App.css";

export default function NavBar() {
  return (
    <nav>
      <NavLink to="/" className="navLink" exact>
        Home
      </NavLink>
      <NavLink to="/login" className="navLink">
        Login
      </NavLink>
      <NavLink to="/sign_up" className="navLink">
        Sign Up
      </NavLink>
      <NavLink to="/dashboard" className="navLink">
        Dashboard
      </NavLink>
      <NavLink to="/projects" className="navLink">
        Projects
      </NavLink>
      <NavLink to="/tasks" className="navLink">
        Tasks
      </NavLink>
      <NavLink to="/comments" className="navLink">
        Comments
      </NavLink>
      <NavLink to="/user" className="navLink">
        User Profile
      </NavLink>
    </nav>
  );
}
