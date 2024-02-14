import { useState, useEffect } from "react";
import axios from "axios";

export default function TaskForm({ onCreate }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Select a Priority");
  const [status, setStatus] = useState("Select a Status");
  const [projectId, setProjectId] = useState(""); // State for project selection
  const [projects, setProjects] = useState([]); // State for projects
  const [selectedProject, setSelectedProject] = useState(null); // State for the selected project
  const [showMessage, setShowMessage] = useState(false);

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

    // Check if all required fields are filled
    if (
      !title ||
      !description ||
      priority === "Select a Priority" ||
      !projectId ||
      status === "Select a Status"
    ) {
      setShowMessage(true); // Show the message if any input is missing
    } else {
      setShowMessage(false); // Hide the message if all inputs are filled

      const data = {
        project_id: projectId,
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
          setPriority("Select a Priority");
          setStatus("Select a Status");
          setProjectId("");
          setSelectedProject(null);
        })
        .catch(error => console.error(error));
    }
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

      <select
        id="priority"
        value={priority}
        onChange={e => setPriority(e.target.value)}>
        <option value="Select a Priority">Select a Priority</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>

      <select
        id="status"
        value={status}
        onChange={e => setStatus(e.target.value)}>
        <option value="Select a Status">Select a Status</option>
        <option value="Not Started">Not Started</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>

      <button type="submit">Create Task</button>
      {showMessage && (
        <h2 className="fill-input">Please fill all form inputs!</h2>
      )}
    </form>
  );
}
