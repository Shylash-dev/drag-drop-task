import React, { createContext, useContext, useState, useEffect } from "react";

// Create context
const ThemeContext = createContext();

// Custom hook for easier access
export const useTheme = () => useContext(ThemeContext);

// Provider component
export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("theme") || "light";
    });

    useEffect(() => {
        document.body.className = theme;
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
    };
    const [dropIndex, setDropIndex] = useState(null)

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, setDropIndex, dropIndex }}>
            {children}
        </ThemeContext.Provider>
    );
};
