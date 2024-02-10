import { useState, useEffect } from "react";
import axios from "axios";
import TaskForm from "./TaskForm";
import EditTask from "./EditTask";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);

  useEffect(() => {
    axios
      .get("/tasks")
      .then(response => setTasks(response.data))
      .catch(error => console.error(error));
  }, []);

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
          {editingTaskId === task.id ? (
            <EditTask
              taskId={task.id}
              initialValues={task}
              onUpdate={handleTaskUpdate}
              onCancel={handleStopEditing}
            />
          ) : (
            <>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <p>{task.status}</p>
              <button onClick={() => handleEditTask(task.id)}>Edit</button>
              <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
            </>
          )}
        </div>
      ))}
      <TaskForm onCreate={handleNewTask} />
    </div>
  );
}
