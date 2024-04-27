import React from "react";
import { useState } from "react";

import "../styles/ToDo.css";

function ToDo() {
  const [tasks, setTasks] = useState([]);
  const [inputText, setInputText] = useState("");

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const addTask = () => {
    if (inputText.trim() !== "") {
      const newTask = {
        id: Date.now(),
        text: inputText,
        completed: false,
        time: new Date().toLocaleDateString(),
      };
      setTasks([...tasks, newTask]);
      setInputText("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  const toggleCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const editTask = (id, newTask) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, text: newTask } : task))
    );
  };

  return (
    <div className="container">
      <div className="main-content">
        <div className="input-container">
          <input
            type="text"
            value={inputText}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
          <button onClick={addTask}>Add Task</button>
        </div>
        <div className="tasks">
          {tasks.map((task) => (
            <div className="task" key={task.id}>
              <div className="tleft">
                <div className="tleft-content">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleCompletion(task.id)}
                  />
                  <h3>{task.text}</h3>
                </div>
                <small>{task.time}</small>
              </div>

              <div className="tright">
                <button className="delete" onClick={() => deleteTask(task.id)}>
                  Delete Task
                </button>
                <button
                  className="edit"
                  onClick={() =>
                    editTask(task.id, prompt("Edit Task:", task.text))
                  }
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ToDo;
