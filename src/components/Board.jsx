import React from "react";
import Column from "./Column";
import { useTheme } from "../context/ThemeContext";

const Board = ({ tasks, setTasks, showToast }) => {
    const { dropIndex } = useTheme();

    const handleDragStart = (e, task, from, index) => {
        e.dataTransfer.setData("task", JSON.stringify({ task, from, index }));
    };

    const handleDrop = (e, to) => {
        const { task, from } = JSON.parse(e.dataTransfer.getData("task"));
        if (from === to) return;

        const newTasks = { ...tasks };
        newTasks[from] = newTasks[from].filter((t) => t.id !== task.id);

        const insertIndex = typeof dropIndex === "number" ? dropIndex : newTasks[to].length;
        newTasks[to].splice(insertIndex, 0, task);

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
