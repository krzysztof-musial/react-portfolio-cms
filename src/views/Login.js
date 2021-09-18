import React, { useRef, useContext } from 'react'
import { motion } from "framer-motion"
import { AuthContext } from "../contexts/AuthContext"

export default function Login() {
    // Variables
    const emailRef = useRef()
    const passwordRef = useRef()

    const { currentUser, login, logout } = useContext(AuthContext)
    // Methods
    function handleLogin(e) {
        e.preventDefault()
        login(emailRef.current.value, passwordRef.current.value)
    }
    function handleLogout() {
        logout()
    }
    // HTML
    return (
        <div className="max-w-md m-auto mt-8 flex flex-col space-y-4 p-4">
            {currentUser ? (
            <motion.div 
                className="flex flex-col space-y-8" 
                initial={{ y: 100 }} 
                animate={{ y: 0 }} 
            >
                <div className="flex flex-col space-y-2">
                    <p className="text-3xl font-bold">{currentUser.email}</p>
                    <p className="text-2xl font-semibold">You are already logged in.</p>
                </div>
                <button onClick={handleLogout} className="text-sm font-semibold rounded-xl py-4 bg-indigo-600 dark:bg-emerald-500 text-white cursor-pointer hover:bg-indigo-500 dark:hover:bg-emerald-400 transition">Logout</button>
            </motion.div>
            ) : (
            <motion.div 
                className="flex flex-col space-y-8" 
                initial={{ y: 100 }} 
                animate={{ y: 0 }} 
            >
                <div className="flex flex-col space-y-2">
                    <p className="text-3xl font-bold">Welcome back.</p>
                    <p className="text-2xl font-semibold">Sign in to your admin account.</p>
                </div>
                <form className="flex flex-col space-y-8" onSubmit={handleLogin}>
                    <div className="flex flex-col space-y-4">
                        <input type="email" ref={emailRef} placeholder="Email" required />
                        <input type="password" ref={passwordRef} placeholder="Password" required />
                    </div>
                    <input type="submit" value="Sign in" />
                </form>
            </motion.div>
            )}
        </div>
    )
}
