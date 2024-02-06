import { NavLink } from "react-router-dom";
import "../App.css";

export default function NavBar() {
  return (
    <nav>
      <NavLink to="/" className="navLink">
        Home Page
      </NavLink>
      <NavLink to="/login" className="navLink">
        Login Page
      </NavLink>
      <NavLink to="/signup" className="navLink">
        Sign Up page
      </NavLink>
      <NavLink to="/dashboard" className="navLink">
        Dashboard page
      </NavLink>
      <NavLink to="/project/:id" className="navLink">
        Project Detail Page
      </NavLink>
    </nav>
  );
}
