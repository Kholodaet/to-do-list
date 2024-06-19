import { useState, useEffect } from "react";
import css from "./Todolist.module.css";

const Todolist = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      return JSON.parse(savedTasks);
    } else {
      return [];
    }
  });

  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const toggleTask = (index) => {
    const updatedTasks = tasks.map((task, i) => {
      if (i === index) {
        return { ...task, completed: !task.completed };
      } else {
        return task;
      }
    });
    setTasks(updatedTasks);
  };

  return (
    <div className={css.container}>
      <h1>To-Do List</h1>
      <div className={css.inputContainer}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
        />
        <button onClick={addTask}>Add</button>
      </div>
      <ul className={css.taskList}>
        {tasks.map((task, index) => {
          let taskClass = "";
          if (task.completed) {
            taskClass = css.completed;
          }

          return (
            <li key={index} className={taskClass}>
              <span onClick={() => toggleTask(index)}>{task.text}</span>
              <button onClick={() => deleteTask(index)}>Delete</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Todolist;
