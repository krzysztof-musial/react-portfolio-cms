import React, { useContext } from 'react'
import { ThemeContext } from '../contexts/ThemeContext';

export default function Toggle() {
    const { darkMode, handleThemeChange } = useContext(ThemeContext);
    const lightClass = {
        bg: "bg-gray-300 hover:bg-gray-400",
        toggle: "ml-0"
    }
    const darkClass = {
        bg: "bg-green-500 hover:bg-green-600",
        toggle: "ml-4"
    }

    return (
        <div className={`rounded-r-full p-1 rounded-l-full w-10 h-6 cursor-pointer transition-all ${darkMode ? darkClass.bg : lightClass.bg}`} onClick={handleThemeChange}>
            <div className={`rounded-full bg-white w-4 h-4 transition-all ${darkMode ? darkClass.toggle : lightClass.toggle}`}></div>
        </div>
    )
}
