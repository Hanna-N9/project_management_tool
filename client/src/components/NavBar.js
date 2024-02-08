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
      <NavLink to="/sign_up" className="navLink">
        Sign Up page
      </NavLink>
      <NavLink to="/dashboard" className="navLink">
        Dashboard page
      </NavLink>
      {/*  <NavLink to="/logout" className="navLink">
        Logout page
      </NavLink>
      <NavLink to="/project/:id" className="navLink">
        Project Detail Page
      </NavLink>
      <NavLink to="/project-form" className="navLink">
        Project Form
      </NavLink>
      <NavLink to="/user" className="navLink">
        User Profile
      </NavLink>
      <NavLink to="/admin" className="navLink">
        Admin
      </NavLink>
      <NavLink to="/comment-form" className="navLink">
        Comment Form
      </NavLink>
      <NavLink to="/edit-task" className="navLink">
        Edit Task
      </NavLink>
      <NavLink to="/task-form" className="navLink">
        Task Form
      </NavLink>
      <NavLink to="/edit-comment" className="navLink">
        Edit Comment
      </NavLink>
      <NavLink to="/edit-project" className="navLink">
        Edit Project
      </NavLink> */}
    </nav>
  );
}
