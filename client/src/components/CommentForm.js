import { useState, useEffect } from "react";
import axios from "axios";

export default function CommentForm({ onCreate }) {
  const [text, setText] = useState("");
  const [taskId, setTaskId] = useState("");
  const [tasks, setTasks] = useState([]);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    axios
      .get("/tasks")
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => console.error(error));
  }, []);

  const handleSubmit = event => {
    event.preventDefault();

    // Check if both required fields are filled
    if (!text || !taskId) {
      setShowMessage(true); // Show the message if any input is missing
    } else {
      setShowMessage(false); // Hide the message if all inputs are filled

      const data = {
        task_id: taskId,
        text,
      };

      axios
        .post("/comments", data)
        .then(response => {
          onCreate(response.data);
          // Reset form fields
          setText("");
          setTaskId("");
        })
        .catch(error => console.error(error));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <select
        id="taskId"
        value={taskId}
        onChange={e => setTaskId(e.target.value)}>
        <option value="">Select a task</option>
        {tasks.map(task => (
          <option key={task.id} value={task.id}>
            {task.title}
          </option>
        ))}
      </select>

      <textarea
        placeholder="Write down your comments here..."
        value={text}
        onChange={e => setText(e.target.value)}
      />

      <button type="submit">Add Comment</button>
      {showMessage && (
        <h2 className="fill-input">Please fill all form inputs!</h2>
      )}
    </form>
  );
}
