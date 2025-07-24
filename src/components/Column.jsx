import React, { useState } from "react";
import TaskCard from "./TaskCard";

const Column = ({ name, tasks, onDrop, onDragStart, setTasks, showToast }) => {
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
    };

    const handleDragOver = (e) => {
        e.preventDefault(); // Required to allow drop
    };

    const handleDrop = (e, index) => {
        e.preventDefault();
        const data = JSON.parse(e.dataTransfer.getData("task"));
        if (data.from !== name) return; // Skip if dropped from other column

        if (draggedTask) {
            const newList = [...tasks];
            // Remove the dragged task
            newList.splice(draggedTask.index, 1);
            // Insert it at new position
            newList.splice(index, 0, draggedTask.task);

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
                        onDragOver={handleDragOver}
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
