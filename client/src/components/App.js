import { Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import NavBar from "./NavBar";
import HomePage from "./Homepage";
import Dashboard from "./Dashboard";
import Login from "./Login";
import SignUp from "./SignUp";
import Logout from "./Logout";
import AdminPage from "./AdminPage";
import User from "./User";
import Projects from "./Projects";
import EditProject from "./EditProject";
import Tasks from "./Tasks";
import EditTask from "./EditTask";
import EditComment from "./EditComment";

import "../App.css";

export default function App() {
  return (
    <div className="App">
      <AuthProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/sign_up" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/user" element={<User />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/edit-project" element={<EditProject />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/edit-task" element={<EditTask />} />
          <Route path="/edit-comment" element={<EditComment />} />
          <Route
            path="/redirect-page"
            element={<Navigate to="/error-page" replace />}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}
