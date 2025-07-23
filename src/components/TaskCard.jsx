const TaskCard = ({ task, onDragStart, onDragOver, onDrop, onDelete }) => {
    return (
        <div
            className="task"
            draggable
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            onDrop={onDrop}
        >
            <span>{task.title}</span>
            <button onClick={onDelete}>✕</button>
        </div>
    );
};

export default TaskCard;
