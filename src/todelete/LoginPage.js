// TO DELETE
import React, { useRef, useContext } from 'react'
import { AuthContext } from "../contexts/AuthContext"
import { HomeLayout } from '../layouts/HomeLayout'

export default function LoginPage() {
    // Variables
    const emailRef = useRef()
    const passwordRef = useRef()

    const { login } = useContext(AuthContext)
    // Methods
    function handleLogin(e) {
        e.preventDefault()
        login(emailRef.current.value, passwordRef.current.value)
    }
    // HTML
    return (
        <div>
            <HomeLayout>
                <div className="max-w-screen-md m-auto p-4 sm:p-8 pt-4 sm:pt-0">
                    <div className="flex flex-col space-y-4 w-full">
                        <div className="flex flex-col space-y-0">
                            <p className="text-3xl font-bold">Welcome back.</p>
                            <p className="text-2xl font-semibold">Sign in to your admin account.</p>
                        </div>
                        <form className="flex flex-col space-y-4" onSubmit={handleLogin}>
                            <div className="flex flex-col space-y-4">
                                <input type="email" ref={emailRef} placeholder="Email" required />
                                <input type="password" ref={passwordRef} placeholder="Password" required />
                            </div>
                            <div>
                                <input type="submit" value="Sign in" />
                            </div>
                        </form>
                    </div>
                </div>
            </HomeLayout>
        </div>
    )
}
