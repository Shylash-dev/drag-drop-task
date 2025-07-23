import React from "react";
import ReactDOM from "react-dom";

const Toast = ({ id, message, onClose }) => {
    return ReactDOM.createPortal(
        <div className="toast">
            <span>{message}</span>
            <button onClick={onClose}>✕</button>
        </div>,
        document.body
    );
};

export default Toast;