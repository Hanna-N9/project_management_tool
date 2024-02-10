import React, { useState } from "react";
import axios from "axios";

export default function EditTask({
  taskId,
  initialValues,
  onUpdate,
  onCancel,
}) {
  const [task, setTask] = useState(
    initialValues || {
      user_id: "",
      description: "",
      priority: "High",
      status: "Not Started",
    },
  );

  const handleChange = event => {
    setTask({
      ...task,
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
      .patch(`/tasks/${taskId}`, task)
      .then(response => {
        if (onUpdate) {
          onUpdate(response.data);
        }
      })
      .catch(error => console.error(error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="user_id">User ID:</label>
      <input
        type="text"
        id="user_id"
        name="user_id"
        value={task.user_id}
        onChange={handleChange}
      />

      <label htmlFor="description">Description:</label>
      <input
        type="text"
        id="description"
        name="description"
        value={task.description}
        onChange={handleChange}
      />

      <label htmlFor="priority">Priority:</label>
      <select
        id="priority"
        name="priority"
        value={task.priority}
        onChange={handleChange}>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>

      <label htmlFor="status">Status:</label>
      <select
        id="status"
        name="status"
        value={task.status}
        onChange={handleChange}>
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
