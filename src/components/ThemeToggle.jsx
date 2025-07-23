import React from "react";
import { useTheme } from "../context/ThemeContext";

const ThemeToggle = ({ onToggle }) => {
    const { theme, toggleTheme } = useTheme();

    const handleToggle = () => {
        toggleTheme();
        onToggle?.(); // Call optional toast function
    };

    return (
        <label className="switch">
            <input type="checkbox" onChange={handleToggle} checked={theme === "dark"} />
            <span className="slider"></span>
        </label>
    );

};

export default ThemeToggle;
