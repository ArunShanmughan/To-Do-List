import React, { useState, useEffect } from "react";

function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");

  // Load tasks from localStorage when the component mounts
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) ?? [];
    setTasks(storedTasks);
  }, []);

  function handleInputChange(e) {
    setNewTask(e.target.value);
  }

  // Add Task and store it in both state and localStorage
  function addTask() {
    if (newTask.trim() !== "") {
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);

      // Save the updated tasks to localStorage
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));

      setNewTask(""); // Clear the input field
    }
  }

  // Delete Task and remove it from both state and localStorage
  function deleteTask(index) {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);

    // Save the updated tasks to localStorage
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  }

  function moveTaskUp(index) {
    if (index > 0) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index - 1]] = [
        updatedTasks[index - 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);

      // Save the updated tasks to localStorage
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }
  }

  function moveTaskDown(index) {
    if (index < tasks.length - 1) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index + 1]] = [
        updatedTasks[index + 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);

      // Save the updated tasks to localStorage
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }
  }

  function editTask(index) {
    setEditIndex(index);
    setEditText(tasks[index]);
  }

  function saveTask() {
    if (editText.trim() !== "") {
      const updatedTasks = [...tasks];
      updatedTasks[editIndex] = editText;
      setTasks(updatedTasks);

      // Save the updated tasks to localStorage
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));

      setEditIndex(null);
      setEditText("");
    }
  }

  return (
    <div className="to-do-list">
      <h1>To-Do-List</h1>

      <div>
        <input
          type="text"
          placeholder="Enter a task..."
          value={newTask}
          onChange={handleInputChange}
        />
        <button className="add-button" onClick={addTask}>
          Add Task
        </button>
      </div>

      <ol>
        {tasks.map((task, index) => (
          <li key={index}>
            {editIndex === index ? (
              <div className="edit-mode">
                <input
                  type="text"
                  className="edit-input"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button className="save-button" onClick={saveTask}>
                  Save
                </button>
              </div>
            ) : (
              <>
                <span className="text">{task}</span>
                <div className="task-buttons">
                  <button
                    className="delete-button"
                    onClick={() => deleteTask(index)}
                  >
                    Delete
                  </button>
                  <button
                    className="task-move"
                    onClick={() => moveTaskUp(index)}
                  >
                    👆
                  </button>
                  <button
                    className="task-move"
                    onClick={() => moveTaskDown(index)}
                  >
                    👇
                  </button>
                  <button
                    className="edit-button"
                    onClick={() => editTask(index)}
                  >
                    📝
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

export default ToDoList;
