import { useState, useEffect } from "react";
import axios from "axios";
import ProjectForm from "./ProjectForm";
import EditProject from "./EditProject";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [editingProjectId, setEditingProjectId] = useState(null);

  useEffect(() => {
    axios
      .get("/projects")
      .then(response => setProjects(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleNewProject = newProject => {
    setProjects([...projects, newProject]);
  };

  const handleDeleteProject = projectId => {
    axios
      .delete(`/projects/${projectId}`)
      .then(res => {
        // Refresh the projects list after deletion
        axios.get("/projects").then(response => setProjects(response.data));
      })
      .catch(error => console.error(error));
  };

  const handleProjectUpdate = updatedProject => {
    setProjects(
      projects.map(project =>
        project.id === updatedProject.id ? updatedProject : project,
      ),
    );
  };

  const handleEditProject = projectId => {
    setEditingProjectId(projectId);
  };

  const handleStopEditing = () => {
    setEditingProjectId(null);
  };

  return (
    <div>
      {projects.map(project => (
        <div key={project.id}>
          {editingProjectId === project.id ? (
            <EditProject
              projectId={project.id}
              initialValues={project}
              onUpdate={handleProjectUpdate}
              onCancel={handleStopEditing}
            />
          ) : (
            <>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <p>{project.status}</p>
              <button onClick={() => handleEditProject(project.id)}>
                Edit
              </button>
              <button onClick={() => handleDeleteProject(project.id)}>
                Delete
              </button>
            </>
          )}
        </div>
      ))}
      <ProjectForm onCreate={handleNewProject} />
    </div>
  );
}
