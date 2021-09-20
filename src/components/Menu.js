import React, { useContext } from 'react'
import { AuthContext } from "../contexts/AuthContext"
import { Link } from 'react-router-dom'

export default function Menu() {
    const { logout } = useContext(AuthContext)

    function handleLogout() {
        logout()
    }

    return (
        <div className="bg-gray-800 flex flex-col justify-between min-h-full text-white">
            {/* Top */}
            <div className="flex flex-col space-y-4">
                <div className="flex p-2">
                    <Link to="/" className="bg-white p-1.5 rounded-lg flex justify-center items-center hover:bg-gray-100 cursor-pointer">
                        <svg className="w-5 h-5 fill-current text-gray-800" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 4.8555V27.1445C0 31.4616 5.17028 33.6237 8.19411 30.571L13.6323 25.0809L10.3253 21.8221C7.0683 18.6126 7.0683 13.3874 10.3253 10.1778L13.6323 6.91904L8.19411 1.42901C5.17028 -1.62366 0 0.538366 0 4.8555Z" />
                            <path d="M25.5667 19.3447L30.6745 24.3781C31.5232 25.2144 32 26.3487 32 27.5315C32 31.5045 27.1254 33.4943 24.2745 30.6849L12.7667 19.3447C10.8922 17.4975 10.8922 14.5025 12.7667 12.6553L24.2745 1.31512C27.1254 -1.49425 32 0.495459 32 4.46851C32 5.65126 31.5232 6.78557 30.6745 7.6219L25.5667 12.6553C23.6922 14.5025 23.6922 17.4975 25.5667 19.3447Z" />
                        </svg>
                    </Link>
                </div>
            </div>
            {/* Bottom */}
            <div className="p-2">
                <button className="bg-white rounded-lg py-2 px-4 w-full text-sm font-semibold text-black" onClick={handleLogout}>Logout</button>
            </div>
        </div>
    )
}
