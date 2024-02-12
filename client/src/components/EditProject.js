import { useState } from "react";
import axios from "axios";

export default function EditProject({
  projectId,
  initialValues,
  onUpdate,
  onCancel,
}) {
  const [project, setProject] = useState(
    initialValues || {
      title: "",
      description: "",
      status: "Not Started",
    },
  );

  const handleChange = e => {
    setProject({
      ...project,
      [e.target.name]: e.target.value,
    });
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .patch(`/projects/${projectId}`, project)
      .then(response => {
        if (onUpdate) {
          onUpdate(response.data);
        }
      })
      .catch(error => console.error(error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        value={project.title}
        onChange={handleChange}
        placeholder="Title"
      />

      <textarea
        name="description"
        value={project.description}
        onChange={handleChange}
        placeholder="Description"
      />

      <label htmlFor="status">Status:</label>
      <select name="status" value={project.status} onChange={handleChange}>
        <option value="Not Started">Not Started</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>

      <button type="submit">Save Changes</button>
      <button type="button" onClick={handleCancel}>
        Cancel
      </button>
    </form>
  );
}
