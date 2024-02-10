import { useState, useEffect } from "react";
import axios from "axios";

export default function TaskForm({ onCreate }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("Not Started");
  const [projectId, setProjectId] = useState(""); // State for project selection
  const [projects, setProjects] = useState([]); // State for projects
  const [selectedProject, setSelectedProject] = useState(null); // State for the selected project

  useEffect(() => {
    axios
      .get("/projects")
      .then(response => {
        setProjects(response.data);
      })
      .catch(error => console.error(error));
  }, []);

  const handleSubmit = event => {
    event.preventDefault();

    const data = {
      project_id: projectId, // Use the state variable projectId
      title,
      description,
      priority,
      status,
    };

    axios
      .post("/tasks", data)
      .then(response => {
        onCreate(response.data);
        // Reset form fields
        setTitle("");
        setDescription("");
        setPriority("");
        setStatus("Not Started");
        setProjectId(""); // Reset the selected project ID after submission
        setSelectedProject(null);
      })
      .catch(error => console.error(error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <select
        id="projectId"
        value={projectId}
        onChange={e => {
          setProjectId(e.target.value);
          setSelectedProject(
            projects.find(project => project.id === e.target.value),
          );
        }}>
        <option value="">Select a project</option>
        {projects.map(project => (
          <option key={project.id} value={project.id}>
            {project.title}
          </option>
        ))}
      </select>
      {selectedProject && <p>Selected Project: {selectedProject.title}</p>}

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />

      <label htmlFor="priority">Priority:</label>
      <select
        id="priority"
        value={priority}
        onChange={e => setPriority(e.target.value)}>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>

      <label htmlFor="status">Status:</label>
      <select
        id="status"
        value={status}
        onChange={e => setStatus(e.target.value)}>
        <option value="Not Started">Not Started</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>

      <button type="submit">Create Task</button>
    </form>
  );
}
