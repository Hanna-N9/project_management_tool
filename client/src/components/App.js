import { Routes, Route } from "react-router-dom";
import HomePage from "./Homepage";
import LoginPage from "./LoginPage";
import SignUp from "./SignUp";
import DashboardPage from "./DashboardPage";
import ProjectDetailPage from "./ProjectDetailPage";
import NavBar from "./NavBar";
import "../App.css";

export default function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/project/:id" element={<ProjectDetailPage />} />
      </Routes>
    </div>
  );
}
