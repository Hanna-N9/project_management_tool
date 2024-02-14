import { useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";
import ProjectForm from "./ProjectForm";
import EditProject from "./EditProject";

export default function Projects() {
  const { isAuthenticated } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
  const [editingProjectId, setEditingProjectId] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      axios
        .get("/projects")
        .then(response => setProjects(response.data))
        .catch(error => console.error(error));
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <p>Please log in to view projects.</p>;
  }

  function handleNewProject(newProject) {
    setProjects([...projects, newProject]);
  }

  function handleDeleteProject(id) {
    axios
      .delete(`/projects/${id}`)
      .then(response => {
        if (response.status === 204) {
          // Filter out the deleted project from the local state
          setProjects(projects.filter(project => project.id !== id));
        } else {
          throw new Error("Unexpected response status");
        }
      })
      .catch(error => {
        console.error(error);
      });
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
              <p>
                <b>Description:</b> {project.description}
              </p>
              <p>
                <b>Status:</b> {project.status}
              </p>
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
              <p>
                <b>Description:</b> {project.description}
              </p>
              <p>
                <b>Status:</b> {project.status}
              </p>

              <button
                type="submit"
                className="edit"
                onClick={() => handleEditProject(project.id)}>
                Edit
              </button>
              <button
                type="button"
                className="delete"
                onClick={() => handleDeleteProject(project.id)}>
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
