// TO DELETE
import React, { useState, createContext } from 'react'

const  AdminLayoutContext  =  createContext();

const AdminLayoutProvider = ({ children }) => {
    const [isMenu, setIsMenu] = useState(false)
    const [isAside, setIsAside] = useState(false)

    return (
        <AdminLayoutContext.Provider value={{ isMenu, isAside, setIsMenu, setIsAside }}>
            {children}
        </AdminLayoutContext.Provider>     
    )
}

export { AdminLayoutContext, AdminLayoutProvider }