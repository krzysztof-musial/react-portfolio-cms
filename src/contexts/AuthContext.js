import React, { useState, useEffect, createContext } from "react"
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "@firebase/auth"
import { auth } from "../firebase"

const AuthContext = createContext("")

const AuthProvider = ({ children }) => {
    const [currentUser , setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }

    function logout() {
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user)
            setLoading(false)
        })
        return unsubscribe
    }, [])

    const value = {
        currentUser,
        login,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider }