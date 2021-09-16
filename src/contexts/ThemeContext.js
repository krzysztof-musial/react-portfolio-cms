import React, { useState } from 'react'

const  ThemeContext  =  React.createContext(false);

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

export { ThemeContext, ThemeProvider }