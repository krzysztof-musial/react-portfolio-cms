import React, { useContext } from 'react'
import { Link } from "react-router-dom"
import { AuthContext } from "../contexts/AuthContext"
import { motion } from 'framer-motion'

export default function Navigation() {
    const { currentUser, logout } = useContext(AuthContext)

    function handleLogout() {
        logout()
    }

    return (
        <motion.div 
            className="w-full bg-gradient-to-r from-indigo-600 to-sky-500 dark:from-emerald-600 dark:to-teal-800 text-white text-xs px-4 py-2 flex justify-between" 
            initial={{ y: -30 }} 
            animate={{ y: 0 }} 
            transition={{ type: "tween" }}
        >
            <div className="flex space-x-2">
                <Link to="/" className="hover:underline">Home</Link>
                <Link to="/admin" className="hover:underline">Admin</Link>
            </div>
            {currentUser ? (
              <button onClick={handleLogout}>Logout {currentUser.email}</button>
            ) : (
              <p>Not logged in.</p>
            )}
        </motion.div>
    )
}
