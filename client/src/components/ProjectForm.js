import { useState } from "react";
import axios from "axios";

export default function ProjectForm({ onCreate }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();

    // Check if all required fields are filled
    if (!title || !description || status === "Select a Status") {
      // Check if all inputs are filled
      setShowMessage(true); // Show the message if any input is missing
    } else {
      setShowMessage(false); // Hide the message if all inputs are filled

      const data = { title, description, status };

      axios
        .post("/projects", data)
        .then(response => {
          onCreate(response.data);
          setTitle("");
          setDescription("");
          setStatus("");
        })
        .catch(error => console.error(error));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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

      <select value={status} onChange={e => setStatus(e.target.value)}>
        <option value="Select a Status">Select a Status</option>
        <option value="Not Started">Not Started</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
      <button type="submit">Create Project</button>
      {showMessage && (
        <h2 className="fill-input">Please fill all form inputs!</h2>
      )}
    </form>
  );
}
