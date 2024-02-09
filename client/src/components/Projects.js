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

  function handleNewProject(newProject) {
    setProjects([...projects, newProject]);
  }

  function handleDeleteProject(id) {
    axios
      .delete(`/projects/${id}`)
      .then(response => {
        if (response.status !== 200 && response.status !== 204) {
          throw new Error("Network response was not ok");
        }
        // Filter out the deleted project from the local state
        setProjects(projects.filter(project => project.id !== id));
      })
      .catch(error => console.error(error));
  }

  function handleProjectUpdate(updatedProject) {
    setProjects(
      projects.map(project =>
        project.id === updatedProject.id ? updatedProject : project,
      ),
    );
  }

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
            <>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <p>{project.status}</p>
              <EditProject
                projectId={project.id}
                initialValues={project}
                onUpdate={handleProjectUpdate}
                onCancel={handleStopEditing}
              />
            </>
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