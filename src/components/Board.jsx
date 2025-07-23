import React from "react";
import Column from "./Column";

const Board = ({ tasks, setTasks, showToast }) => {
    const handleDragStart = (e, task, from) => {
        e.dataTransfer.setData("task", JSON.stringify({ task, from }));
    };

    const handleDrop = (e, to) => {
        const { task, from } = JSON.parse(e.dataTransfer.getData("task"));
        if (from === to) return;
        const newTasks = { ...tasks };
        newTasks[from] = newTasks[from].filter((t) => t.id !== task.id);
        newTasks[to].push(task);
        setTasks(newTasks);
        showToast("Task moved successfully");
    };

    return (
        <div className="board">
            {Object.entries(tasks).map(([key, value]) => (
                <Column
                    key={key}
                    name={key}
                    tasks={value}
                    onDrop={(e) => handleDrop(e, key)}
                    onDragStart={handleDragStart}
                    setTasks={setTasks}
                    showToast={showToast}
                />
            ))}
        </div>
    );
};

export default Board;
