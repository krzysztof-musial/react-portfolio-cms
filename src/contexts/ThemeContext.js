import React, { useState, createContext, useContext } from 'react'

const  ThemeContext  =  createContext(false);

const ThemeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(() => {
        return JSON.parse(localStorage.getItem('darkMode')) || false
    });
    function handleThemeChange() {
        if (darkMode === false) {
            localStorage.setItem('darkMode', JSON.stringify(true))
            setDarkMode(true)
        } else {
            localStorage.setItem('darkMode', JSON.stringify(false))
            setDarkMode(false)
        }
    }

    return (
        <ThemeContext.Provider value={{ darkMode, handleThemeChange }}>
            {children}
        </ThemeContext.Provider>     
    )
}

const ThemeToggle = () => {
    const { darkMode, handleThemeChange } = useContext(ThemeContext);
    const lightClass = {
        bg: "bg-gray-300 hover:bg-gray-400",
        toggle: "ml-0"
    }
    const darkClass = {
        bg: "bg-violet-500 hover:bg-violet-600",
        toggle: "ml-4"
    }

    return (
        <div className={`rounded-r-full p-1 rounded-l-full w-10 h-6 cursor-pointer transition-all ${darkMode ? darkClass.bg : lightClass.bg}`} onClick={handleThemeChange}>
            <div className={`rounded-full bg-white w-4 h-4 transition-all ${darkMode ? darkClass.toggle : lightClass.toggle}`}></div>
        </div>
    )
}

export { ThemeContext, ThemeProvider, ThemeToggle }