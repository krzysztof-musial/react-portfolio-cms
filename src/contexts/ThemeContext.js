import React, { useState } from 'react'

const  ThemeContext  =  React.createContext(false);

const ThemeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(false);
    function handleThemeChange() {
        setDarkMode(!darkMode)
    }

    return (
        <ThemeContext.Provider value={{ darkMode, handleThemeChange }}>
            {children}
        </ThemeContext.Provider>     
    )
}

export { ThemeContext, ThemeProvider }