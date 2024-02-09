// EditProject.js
import React, { useState } from "react";
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

  const handleChange = event => {
    setProject({
      ...project,
      [event.target.name]: event.target.value,
    });
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
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
