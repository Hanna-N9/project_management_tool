import { useState } from "react";
import axios from "axios";

export default function EditTask({
  taskId,
  initialValues,
  onUpdate,
  onCancel,
}) {
  const [task, setTask] = useState(
    initialValues || {
      title: "",
      description: "",
      priority: "Select a Priority",
      status: "Select a Status",
    },
  );

  const handleChange = e => {
    setTask({
      ...task,
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
      <input
        type="text"
        name="title"
        value={task.title}
        onChange={handleChange}
        placeholder="Title"
      />

      <textarea
        name="description"
        value={task.description}
        onChange={handleChange}
        placeholder="Description"
      />

      <select name="priority" value={task.priority} onChange={handleChange}>
        <option value="Select a Priority">Select a Status</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>

      <select name="status" value={task.status} onChange={handleChange}>
        <option value="Select a Status">Select a Status</option>
        <option value="Not Started">Not Started</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>

      <div className="button-group">
        <button type="submit" className="save">
          Save Changes
        </button>
        <button type="button" className="cancel" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}
