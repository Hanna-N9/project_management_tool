import { useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";
import TaskForm from "./TaskForm";
import EditTask from "./EditTask";

export default function Tasks() {
  const { isAuthenticated } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      axios
        .get("/tasks")
        .then(response => setTasks(response.data))
        .catch(error => console.error(error));
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <p>Please log in to view tasks.</p>;
  }

  function handleNewTask(newTask) {
    setTasks([...tasks, newTask]);
  }

  function handleDeleteTask(id) {
    axios
      .delete(`/tasks/${id}`)
      .then(response => {
        if (response.status === 204) {
          setTasks(tasks.filter(task => task.id !== id));
        } else {
          throw new Error("Unexpected response status");
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  function handleTaskUpdate(updatedTask) {
    setTasks(
      tasks.map(task => (task.id === updatedTask.id ? updatedTask : task)),
    );
  }

  const handleEditTask = taskId => {
    setEditingTaskId(taskId);
  };

  const handleStopEditing = () => {
    setEditingTaskId(null);
  };

  return (
    <div>
      {tasks.map(task => (
        <div key={task.id}>
          <h3>Project: {task.project ? task.project.title : ""}</h3>
          {editingTaskId === task.id ? (
            <>
              <p>
                <b>Title:</b> {task.title}
              </p>
              <p>
                <b>Description:</b> {task.description}
              </p>
              <b>Priority:</b> {task.priority}
              <p>
                <b>Status:</b> {task.status}
              </p>
              <EditTask
                taskId={task.id}
                initialValues={task}
                onUpdate={handleTaskUpdate}
                onCancel={handleStopEditing}
              />
            </>
          ) : (
            <>
              <p>
                <b>Title:</b> {task.title}
              </p>
              <p>
                <b>Description:</b> {task.description}
              </p>
              <p>
                <b>Priority:</b> {task.priority}
              </p>
              <p>
                <b>Status:</b> {task.status}
              </p>
              <button
                type="submit"
                className="edit"
                onClick={() => handleEditTask(task.id)}>
                Edit
              </button>
              <button
                type="button"
                className="delete"
                onClick={() => handleDeleteTask(task.id)}>
                Delete
              </button>
            </>
          )}
        </div>
      ))}
      <TaskForm onCreate={handleNewTask} />
    </div>
  );
}
