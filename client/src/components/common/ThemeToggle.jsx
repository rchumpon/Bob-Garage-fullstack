import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

const ThemeToggle = () => {
  // Load saved theme or use light mode by default
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    // Apply dark mode to the entire application
    document.documentElement.classList.toggle("dark", darkMode);

    // Save the selected theme
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);
  return (
    <button
      type="button"
      onClick={() => setDarkMode(!darkMode)}
      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      className="flex items-center justify-center rounded-full p-2 text-primary transition-colors hover:bg-secondary"
    >
      {darkMode ? (
        <FaSun className="h-5 w-5" />
      ) : (
        <FaMoon className="h-5 w-5" />
      )}
    </button>
  );
};
export default ThemeToggle;
