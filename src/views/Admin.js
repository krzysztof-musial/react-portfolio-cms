import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Menu from '../components/Menu'
import Settings from '../components/Settings'

export default function Admin() {
    const [isMenu, setIsMenu] = useState(true)
    const [isSettings, setIsSettings] = useState(false)
    const menuWidth = '200px'
    const settingsWidth = '200px'

    return (
        <main className="flex overflow-x-hidden">
            {/* Menu */}
            <motion.div 
                className="flex-shrink-0 min-h-screen" 
                style={{ width: menuWidth }} 
                initial={{ marginLeft: isMenu ? 0 : '-' + menuWidth }} 
                animate={{ marginLeft: isMenu ? 0 : '-' + menuWidth }}
                exit={{ marginLeft: '-' + menuWidth }} 
                transition={{ type: "tween" }}
            >
                <Menu />
            </motion.div>
            {/* Content */}
            <div className="w-full">
                {/* Nav */}
                <div className="p-2 flex items-center justify-between">
                    <div className="flex space-x-2 items-center">
                        <button 
                            className={`p-1.5 rounded-lg transition-all ${isMenu ? "bg-white hover:bg-gray-200" : "bg-white hover:bg-gray-200"}`}
                            onClick={() => { setIsMenu(!isMenu) }}
                        >
                            <svg className={`w-5 h-5 fill-current transition-all ${isMenu ? "text-black" : "text-black"}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3 18H12V16H3V18ZM3 13H21V11H3V13ZM3 8H21V6H3V8Z" />
                            </svg>
                        </button>
                    </div>
                    <div className="flex space-x-2 items-center">
                        <button 
                            className={`p-1.5 rounded-lg transition-all ${isSettings ? "bg-white hover:bg-gray-200" : "bg-white hover:bg-gray-200"}`} 
                            onClick={() => { setIsSettings(!isSettings) }}
                        >
                            <svg className={`w-5 h-5 fill-current transition-all ${isSettings ? "text-black" : "text-black"}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22 7.25H16C15.59 7.25 15.25 6.91 15.25 6.5C15.25 6.09 15.59 5.75 16 5.75H22C22.41 5.75 22.75 6.09 22.75 6.5C22.75 6.91 22.41 7.25 22 7.25Z" />
                                <path d="M6 7.25H2C1.59 7.25 1.25 6.91 1.25 6.5C1.25 6.09 1.59 5.75 2 5.75H6C6.41 5.75 6.75 6.09 6.75 6.5C6.75 6.91 6.41 7.25 6 7.25Z" />
                                <path d="M10 10.75C7.66 10.75 5.75 8.84 5.75 6.5C5.75 4.16 7.66 2.25 10 2.25C12.34 2.25 14.25 4.16 14.25 6.5C14.25 8.84 12.34 10.75 10 10.75ZM10 3.75C8.48 3.75 7.25 4.98 7.25 6.5C7.25 8.02 8.48 9.25 10 9.25C11.52 9.25 12.75 8.02 12.75 6.5C12.75 4.98 11.52 3.75 10 3.75Z" />
                                <path d="M22 18.25H18C17.59 18.25 17.25 17.91 17.25 17.5C17.25 17.09 17.59 16.75 18 16.75H22C22.41 16.75 22.75 17.09 22.75 17.5C22.75 17.91 22.41 18.25 22 18.25Z" />
                                <path d="M8 18.25H2C1.59 18.25 1.25 17.91 1.25 17.5C1.25 17.09 1.59 16.75 2 16.75H8C8.41 16.75 8.75 17.09 8.75 17.5C8.75 17.91 8.41 18.25 8 18.25Z" />
                                <path d="M14 21.75C11.66 21.75 9.75 19.84 9.75 17.5C9.75 15.16 11.66 13.25 14 13.25C16.34 13.25 18.25 15.16 18.25 17.5C18.25 19.84 16.34 21.75 14 21.75ZM14 14.75C12.48 14.75 11.25 15.98 11.25 17.5C11.25 19.02 12.48 20.25 14 20.25C15.52 20.25 16.75 19.02 16.75 17.5C16.75 15.98 15.52 14.75 14 14.75Z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            {/* Settings */}
            <motion.div 
                className="flex-shrink-0 min-h-screen" 
                style={{ width: settingsWidth }} 
                initial={{ marginRight: isSettings ? 0 : '-' + settingsWidth }}
                animate={{ marginRight: isSettings ? 0 : '-' + settingsWidth }}
                exit={{ marginRight: '-' + settingsWidth }} 
                transition={{ type: "tween" }}
            >
                <Settings />
            </motion.div>
        </main>
    )
}
