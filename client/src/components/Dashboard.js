import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

export default function Dashboard() {
  const { isAuthenticated } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    if (isAuthenticated) {
      axios
        .get("/projects")
        .then(response => {
          setProjects(response.data);
        })
        .catch(error => {
          console.error("Error fetching projects:", error);
        });
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <p>Please log in to view your dashboard.</p>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <ul>
        {projects.map(project => (
          <li key={project.id}>{project.title}</li>
        ))}
      </ul>
    </div>
  );
}
