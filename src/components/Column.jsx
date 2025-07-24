import React, { useState } from "react";
import TaskCard from "./TaskCard";
import { useTheme } from "../context/ThemeContext";

const Column = ({ name, tasks, onDrop, onDragStart, setTasks, showToast }) => {
    const { setDropIndex } = useTheme();

    const [newTask, setNewTask] = useState("");
    const [draggedTask, setDraggedTask] = useState(null);

    const addTask = () => {
        if (!newTask.trim()) return;
        const id = Date.now();
        setTasks((prev) => ({
            ...prev,
            [name]: [...prev[name], { id, title: newTask }],
        }));
        setNewTask("");
        showToast("Task Added");
    };

    const deleteTask = (id) => {
        setTasks((prev) => ({
            ...prev,
            [name]: prev[name].filter((task) => task.id !== id),
        }));
        showToast("Task deleted");
    };

    const handleDragStart = (e, task, index) => {
        e.dataTransfer.setData("task", JSON.stringify({ task, from: name, index }));
        setDraggedTask({ task, index });
        onDragStart(e, task, name, index); // Call parent drag start
    };

    const handleDragOver = (e, index) => {
        e.preventDefault();
        setDropIndex(index);
    };

    const handleDrop = (e, index) => {
        e.preventDefault();
        setDropIndex(index);
        const data = JSON.parse(e.dataTransfer.getData("task"));
        if (data.from !== name) return; // Skip reordering if from another column

        if (draggedTask) {
            const newList = [...tasks];
            newList.splice(draggedTask.index, 1); // Remove original
            newList.splice(index, 0, draggedTask.task); // Insert at new index

            setTasks((prev) => ({
                ...prev,
                [name]: newList,
            }));
            showToast("Task reordered");
        }
    };

    return (
        <div className="column" onDragOver={(e) => e.preventDefault()} onDrop={onDrop}>
            <h2>{name.replace(/([A-Z])/g, " $1").trim()}</h2>
            <div className="task-list">
                {tasks.map((task, index) => (
                    <TaskCard
                        key={task.id}
                        task={task}
                        onDragStart={(e) => handleDragStart(e, task, index)}
                        onDragOver={(e) => handleDragOver(e, index)}
                        onDrop={(e) => handleDrop(e, index)}
                        onDelete={() => deleteTask(task.id)}
                    />
                ))}
            </div>
            <div className="add-task">
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="New task"
                />
                <button onClick={addTask}>Add</button>
            </div>
        </div>
    );
};

export default Column;
