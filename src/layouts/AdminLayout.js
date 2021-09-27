import React, { useState, useContext } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, NavLink } from 'react-router-dom'
import Toggle from '../components/Toggle'
import { AuthContext } from "../contexts/AuthContext"

export default function AdminLayout(props) {
    const [isMenu, setIsMenu] = useState(false)
    const [isAside, setIsAside] = useState(false)
    const menuWidth = '300px'
    const asideWidth = '300px'

    return (
        <main className="relative overflow-hidden lg:flex">
            {/* Menu */}
            <AnimatePresence>
            {isMenu && (
                <motion.div 
                    className="absolute top-0 bg-gray-50 border-r min-h-screen border-gray-200 lg:static flex-shrink-0 dark:bg-gray-800 z-50" 
                    style={{ width: menuWidth }} 
                    initial={{ marginLeft: '-' + menuWidth }} 
                    animate={{ marginLeft: 0 }} 
                    exit={{ marginLeft: '-' + menuWidth }} 
                    transition={{ type: 'tween' }}
                >
                    <div className="p-4 flex items-center justify-between">
                        <Link to="/" className="p-1.5 rounded-md bg-indigo-600 hover:bg-indigo-700">
                            <svg className="w-5 h-5 fill-current text-white" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 4.8555V27.1445C0 31.4616 5.17028 33.6237 8.19411 30.571L13.6323 25.0809L10.3253 21.8221C7.0683 18.6126 7.0683 13.3874 10.3253 10.1778L13.6323 6.91904L8.19411 1.42901C5.17028 -1.62366 0 0.538366 0 4.8555Z" />
                                <path d="M25.5667 19.3447L30.6745 24.3781C31.5232 25.2144 32 26.3487 32 27.5315C32 31.5045 27.1254 33.4943 24.2745 30.6849L12.7667 19.3447C10.8922 17.4975 10.8922 14.5025 12.7667 12.6553L24.2745 1.31512C27.1254 -1.49425 32 0.495459 32 4.46851C32 5.65126 31.5232 6.78557 30.6745 7.6219L25.5667 12.6553C23.6922 14.5025 23.6922 17.4975 25.5667 19.3447Z" />
                            </svg>
                        </Link>
                        <button onClick={() => setIsMenu(!isMenu)} className="p-1.5 rounded-md hover:bg-gray-200 lg:hidden">
                            <svg className="w-5 h-5 fill-current transform rotate-45" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13 13V19H11V13H5V11H11V5H13V11H19V13H13Z" />
                            </svg>
                        </button>
                    </div>
                    <Menu />
                </motion.div>
            )}
            </AnimatePresence>
            {/* Content */}
            <div className="w-full h-screen overflow-y-auto">
                <div className="sticky top-0 z-40">
                    <Navigation isMenu={isMenu} setIsMenu={setIsMenu} isAside={isAside} setIsAside={setIsAside} aside={props.aside} />
                </div>
                {props.content}
            </div>
            {/* Aside */}
            {props.aside &&
            <AnimatePresence>
            {isAside && (
                <motion.div 
                    className="absolute top-0 right-0 bg-gray-50 border-l min-h-screen border-gray-200 lg:static flex-shrink-0 dark:bg-gray-800 z-50" 
                    style={{ width: asideWidth }} 
                    initial={{ marginRight: '-' + asideWidth }} 
                    animate={{ marginRight: 0 }} 
                    exit={{ marginRight: '-' + asideWidth }} 
                    transition={{ type: 'tween' }}
                >
                    <div className="p-4 flex items-center justify-between lg:justify-end">
                        <button onClick={() => setIsAside(!isAside)} className="p-1.5 rounded-md hover:bg-gray-200 lg:hidden">
                            <svg className="w-5 h-5 fill-current transform rotate-45" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13 13V19H11V13H5V11H11V5H13V11H19V13H13Z" />
                            </svg>
                        </button>
                        <div className="h-8 flex justify-center items-center">
                            <Toggle />
                        </div>
                    </div>
                    {props.aside}
                </motion.div>
            )}
            </AnimatePresence>
            }
        </main>
    )
}

function Navigation(props) {
    return (
        <main className="flex items-center justify-between p-4 bg-white">
            <button onClick={() => props.setIsMenu(!props.isMenu)} className={`p-1.5 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 ${props.isMenu ? 'bg-gray-200 dark:bg-gray-700' : ''}`}>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 18H12V16H3V18ZM3 13H21V11H3V13ZM3 8H21V6H3V8Z" />
                </svg>
            </button>
            {props.aside &&
            <button onClick={() => props.setIsAside(!props.isAside)} className={`p-1.5 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 ${props.isAside ? 'bg-gray-200 dark:bg-gray-700' : ''}`}>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 7.25H16C15.59 7.25 15.25 6.91 15.25 6.5C15.25 6.09 15.59 5.75 16 5.75H22C22.41 5.75 22.75 6.09 22.75 6.5C22.75 6.91 22.41 7.25 22 7.25Z" />
                    <path d="M6 7.25H2C1.59 7.25 1.25 6.91 1.25 6.5C1.25 6.09 1.59 5.75 2 5.75H6C6.41 5.75 6.75 6.09 6.75 6.5C6.75 6.91 6.41 7.25 6 7.25Z" />
                    <path d="M10 10.75C7.66 10.75 5.75 8.84 5.75 6.5C5.75 4.16 7.66 2.25 10 2.25C12.34 2.25 14.25 4.16 14.25 6.5C14.25 8.84 12.34 10.75 10 10.75ZM10 3.75C8.48 3.75 7.25 4.98 7.25 6.5C7.25 8.02 8.48 9.25 10 9.25C11.52 9.25 12.75 8.02 12.75 6.5C12.75 4.98 11.52 3.75 10 3.75Z" />
                    <path d="M22 18.25H18C17.59 18.25 17.25 17.91 17.25 17.5C17.25 17.09 17.59 16.75 18 16.75H22C22.41 16.75 22.75 17.09 22.75 17.5C22.75 17.91 22.41 18.25 22 18.25Z" />
                    <path d="M8 18.25H2C1.59 18.25 1.25 17.91 1.25 17.5C1.25 17.09 1.59 16.75 2 16.75H8C8.41 16.75 8.75 17.09 8.75 17.5C8.75 17.91 8.41 18.25 8 18.25Z" />
                    <path d="M14 21.75C11.66 21.75 9.75 19.84 9.75 17.5C9.75 15.16 11.66 13.25 14 13.25C16.34 13.25 18.25 15.16 18.25 17.5C18.25 19.84 16.34 21.75 14 21.75ZM14 14.75C12.48 14.75 11.25 15.98 11.25 17.5C11.25 19.02 12.48 20.25 14 20.25C15.52 20.25 16.75 19.02 16.75 17.5C16.75 15.98 15.52 14.75 14 14.75Z" />
                </svg>
            </button>
            }
        </main>
    )
}

function Menu() {
    const { logout, currentUser } = useContext(AuthContext)

    function handleLogout() {
        logout()
    }
    return (
        <div className="p-2 flex flex-col space-y-4 justify-between">
            <div className="bg-white rounded-lg border border-gray-200">
                <NavLink to="/admin" className="p-2 text-black flex items-center space-x-2 border-b border-gray-200 hover:bg-gray-100 transition" activeClassName="text-indigo-600" exact>
                    <div className="p-1.5">
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21.5 10.9V4.1C21.5 2.6 20.86 2 19.27 2H15.23C13.64 2 13 2.6 13 4.1V10.9C13 12.4 13.64 13 15.23 13H19.27C20.86 13 21.5 12.4 21.5 10.9Z" />
                            <path d="M11 13.1V19.9C11 21.4 10.36 22 8.77 22H4.73C3.14 22 2.5 21.4 2.5 19.9V13.1C2.5 11.6 3.14 11 4.73 11H8.77C10.36 11 11 11.6 11 13.1Z" />
                            <path opacity="0.4" d="M21.5 19.9V17.1C21.5 15.6 20.86 15 19.27 15H15.23C13.64 15 13 15.6 13 17.1V19.9C13 21.4 13.64 22 15.23 22H19.27C20.86 22 21.5 21.4 21.5 19.9Z" />
                            <path opacity="0.4" d="M11 6.9V4.1C11 2.6 10.36 2 8.77 2H4.73C3.14 2 2.5 2.6 2.5 4.1V6.9C2.5 8.4 3.14 9 4.73 9H8.77C10.36 9 11 8.4 11 6.9Z" />
                        </svg>
                    </div>
                    <p className="text-sm font-semibold">Projects</p>
                </NavLink>
                <NavLink to="/admin/messages" className="p-2 text-black flex items-center space-x-2 hover:bg-gray-100 transition" activeClassName="text-indigo-600">
                    <div className="p-1.5">
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path opacity="0.4" d="M17.98 10.79V14.79C17.98 15.05 17.97 15.3 17.94 15.54C17.71 18.24 16.12 19.58 13.19 19.58H12.79C12.54 19.58 12.3 19.7 12.15 19.9L10.95 21.5C10.42 22.21 9.56 22.21 9.03 21.5L7.82999 19.9C7.69999 19.73 7.41 19.58 7.19 19.58H6.79001C3.60001 19.58 2 18.79 2 14.79V10.79C2 7.86001 3.35001 6.27001 6.04001 6.04001C6.28001 6.01001 6.53001 6 6.79001 6H13.19C16.38 6 17.98 7.60001 17.98 10.79Z" />
                            <path d="M9.99023 14C9.43023 14 8.99023 13.55 8.99023 13C8.99023 12.45 9.44023 12 9.99023 12C10.5402 12 10.9902 12.45 10.9902 13C10.9902 13.55 10.5502 14 9.99023 14Z" />
                            <path d="M13.4902 14C12.9302 14 12.4902 13.55 12.4902 13C12.4902 12.45 12.9402 12 13.4902 12C14.0402 12 14.4902 12.45 14.4902 13C14.4902 13.55 14.0402 14 13.4902 14Z" />
                            <path d="M6.5 14C5.94 14 5.5 13.55 5.5 13C5.5 12.45 5.95 12 6.5 12C7.05 12 7.5 12.45 7.5 13C7.5 13.55 7.05 14 6.5 14Z" />
                            <path d="M21.9791 6.79001V10.79C21.9791 13.73 20.6291 15.31 17.9391 15.54C17.9691 15.3 17.9791 15.05 17.9791 14.79V10.79C17.9791 7.60001 16.3791 6 13.1891 6H6.78906C6.52906 6 6.27906 6.01001 6.03906 6.04001C6.26906 3.35001 7.85906 2 10.7891 2H17.1891C20.3791 2 21.9791 3.60001 21.9791 6.79001Z" />
                        </svg>
                    </div>
                    <p className="text-sm font-semibold">Messages</p>
                </NavLink>
            </div>
            <div className="bg-white rounded-lg border border-gray-200">
                <button onClick={handleLogout} className="p-2 flex items-center space-x-2 w-full hover:bg-gray-100 cursor-pointer transition">
                    <div className="p-1.5">
                        <div className="w-5 h-5 rounded-full bg-indigo-600 flex items-center justify-center font-semibold text-xs text-white">A</div>
                    </div>
                    <p className="text-sm">{currentUser.email}</p>
                </button>
            </div>
        </div>
    )
}