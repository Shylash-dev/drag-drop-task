import React, { useEffect, useState } from "react";
import Board from "./components/Board";
import ThemeToggle from "./components/ThemeToggle";
import Toast from "./components/Toast";
import { useTheme } from "./context/ThemeContext"; // ✅ use the hook

const getInitialTasks = () => {
  const saved = localStorage.getItem("tasks");
  return saved
    ? JSON.parse(saved)
    : {
      todo: [],
      inProgress: [],
      done: [],
    };
};

function App() {
  const { theme } = useTheme(); // ✅ get theme from context
  const [tasks, setTasks] = useState(getInitialTasks);
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const showToast = (message) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  return (
    <div className="app">
      <h1>Task Board</h1>
      <ThemeToggle
        onToggle={() =>
          showToast(`${theme === "dark" ? "Light" : "Dark"} mode activated`)
        }
      />
      <Board tasks={tasks} setTasks={setTasks} showToast={showToast} />
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          id={toast.id}
          message={toast.message}
          onClose={() =>
            setToasts((prev) => prev.filter((t) => t.id !== toast.id))
          }
        />
      ))}
    </div>
  );
}

export default App;
