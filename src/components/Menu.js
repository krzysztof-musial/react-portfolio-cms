import React, { useContext } from 'react'
import { AuthContext } from "../contexts/AuthContext"
import { Link, NavLink } from 'react-router-dom'
import Toggle from '../components/Toggle'

export default function Menu() {
    const { logout } = useContext(AuthContext)

    function handleLogout() {
        logout()
    }

    return (
        <div className="p-4 flex flex-col justify-between h-full">
            {/* Top */}
            <div className="flex flex-col space-y-8">
                <div className="flex items-center space-x-3">
                    <Link to="/" className="bg-indigo-600 h-10 w-10 rounded-lg flex justify-center items-center hover:bg-indigo-500 cursor-pointer dark:bg-gray-700 dark:hover:bg-gray-600">
                        <svg className="w-6 h-6 fill-current text-white" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 4.8555V27.1445C0 31.4616 5.17028 33.6237 8.19411 30.571L13.6323 25.0809L10.3253 21.8221C7.0683 18.6126 7.0683 13.3874 10.3253 10.1778L13.6323 6.91904L8.19411 1.42901C5.17028 -1.62366 0 0.538366 0 4.8555Z" />
                            <path d="M25.5667 19.3447L30.6745 24.3781C31.5232 25.2144 32 26.3487 32 27.5315C32 31.5045 27.1254 33.4943 24.2745 30.6849L12.7667 19.3447C10.8922 17.4975 10.8922 14.5025 12.7667 12.6553L24.2745 1.31512C27.1254 -1.49425 32 0.495459 32 4.46851C32 5.65126 31.5232 6.78557 30.6745 7.6219L25.5667 12.6553C23.6922 14.5025 23.6922 17.4975 25.5667 19.3447Z" />
                        </svg>
                    </Link>
                    <div className="flex flex-col">
                        <p className="text-md font-bold">Krzysztof Musiał</p>
                        <p className="text-xs opacity-70">Web Developer</p>
                    </div>
                </div>
                {/* Nav */}
                <div className="flex flex-col space-y-4 pl-1.5">
                    <NavLink to="/admin" className="opacity-40" activeClassName="opacity-100" exact>
                        <div className="flex items-center space-x-3">
                            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21.5 10.9V4.1C21.5 2.6 20.86 2 19.27 2H15.23C13.64 2 13 2.6 13 4.1V10.9C13 12.4 13.64 13 15.23 13H19.27C20.86 13 21.5 12.4 21.5 10.9Z" />
                                <path d="M11 13.1V19.9C11 21.4 10.36 22 8.77 22H4.73C3.14 22 2.5 21.4 2.5 19.9V13.1C2.5 11.6 3.14 11 4.73 11H8.77C10.36 11 11 11.6 11 13.1Z" />
                                <path opacity="0.4" d="M21.5 19.9V17.1C21.5 15.6 20.86 15 19.27 15H15.23C13.64 15 13 15.6 13 17.1V19.9C13 21.4 13.64 22 15.23 22H19.27C20.86 22 21.5 21.4 21.5 19.9Z" />
                                <path opacity="0.4" d="M11 6.9V4.1C11 2.6 10.36 2 8.77 2H4.73C3.14 2 2.5 2.6 2.5 4.1V6.9C2.5 8.4 3.14 9 4.73 9H8.77C10.36 9 11 8.4 11 6.9Z" />
                            </svg>
                            <p className="text-sm font-medium">Projects</p>
                        </div>
                    </NavLink>
                    <NavLink to="/admin/messages" className="opacity-40" activeClassName="opacity-100">
                        <div className="flex items-center space-x-3">
                            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path opacity="0.4" d="M17.98 10.79V14.79C17.98 15.05 17.97 15.3 17.94 15.54C17.71 18.24 16.12 19.58 13.19 19.58H12.79C12.54 19.58 12.3 19.7 12.15 19.9L10.95 21.5C10.42 22.21 9.56 22.21 9.03 21.5L7.82999 19.9C7.69999 19.73 7.41 19.58 7.19 19.58H6.79001C3.60001 19.58 2 18.79 2 14.79V10.79C2 7.86001 3.35001 6.27001 6.04001 6.04001C6.28001 6.01001 6.53001 6 6.79001 6H13.19C16.38 6 17.98 7.60001 17.98 10.79Z" />
                                <path d="M9.99023 14C9.43023 14 8.99023 13.55 8.99023 13C8.99023 12.45 9.44023 12 9.99023 12C10.5402 12 10.9902 12.45 10.9902 13C10.9902 13.55 10.5502 14 9.99023 14Z" />
                                <path d="M13.4902 14C12.9302 14 12.4902 13.55 12.4902 13C12.4902 12.45 12.9402 12 13.4902 12C14.0402 12 14.4902 12.45 14.4902 13C14.4902 13.55 14.0402 14 13.4902 14Z" />
                                <path d="M6.5 14C5.94 14 5.5 13.55 5.5 13C5.5 12.45 5.95 12 6.5 12C7.05 12 7.5 12.45 7.5 13C7.5 13.55 7.05 14 6.5 14Z" />
                                <path d="M21.9791 6.79001V10.79C21.9791 13.73 20.6291 15.31 17.9391 15.54C17.9691 15.3 17.9791 15.05 17.9791 14.79V10.79C17.9791 7.60001 16.3791 6 13.1891 6H6.78906C6.52906 6 6.27906 6.01001 6.03906 6.04001C6.26906 3.35001 7.85906 2 10.7891 2H17.1891C20.3791 2 21.9791 3.60001 21.9791 6.79001Z" />
                            </svg>
                            <p className="text-sm font-medium">Messages</p>
                        </div>
                    </NavLink>
                </div>
            </div>
            {/* Bottom */}
            <div className="flex space-x-4 items-center justify-between">
                <button className="rounded-lg py-2 bg-indigo-600 px-4 w-full text-sm font-semibold text-white" onClick={handleLogout}>Logout</button>
                <div>
                    <Toggle />
                </div>
            </div>
        </div>
    )
}
