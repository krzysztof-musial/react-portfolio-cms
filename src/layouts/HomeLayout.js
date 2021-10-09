import React, { useContext, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
// Components
// import Toggle from '../components/Toggle'
import { IconSmall } from '../components/Icon'
import { Exit, Github, Grid, Key, Logo, Message } from '../components/SVG'
import { AuthContext } from '../contexts/AuthContext'
import Popup from '../components/Popup'
// import image from '../assets/temp.png'

export const HomeLayout = ({ children }) => {
    return (
        <div>
            {/* Header */}
            <Header />
            {/* Content */}
            <div className="w-full">
                {children}
            </div>
        </div>
    )
}

const Header = () => {
    const { currentUser, logout } = useContext(AuthContext)
    const [loginPopupOpen, setLoginPopupOpen] = useState(false)
    const [contactPopupOpen, setContactPopupOpen] = useState(false)

	return (
        <div className="w-full">
            <div className="w-full max-w-screen-md m-auto flex items-center justify-between p-4 sm:p-8">
                <div className="flex items-center space-x-3">
                    <Link to={'/'}>
                        <IconSmall tailwind={'bg-blue-600 hover:bg-blue-500 dark:bg-trueGray-700'}>
                            <Logo tailwind={'text-white'} />
                        </IconSmall>
                    </Link>
                    {/* <div className="flex flex-col">
                        <p className="font-semibold">Krzysztof Musiał</p>
                        <p className="text-xs opacity-75">Web Developer</p>
                    </div> */}
                </div>
                <div className="flex space-x-2 items-center">
                    <a href="https://github.com" target="_blank" rel="noreferrer">
                        <IconSmall tailwind={'bg-trueGray-800 hover:bg-trueGray-700'}>
                            <Github tailwind={'text-gray-50'} />
                        </IconSmall>
                    </a>
                    {currentUser &&
                    <Link to={'/projects'}>
                        <IconSmall tailwind={'bg-rose-500 hover:bg-rose-600'}>
                            <Grid tailwind={'text-white'} />
                        </IconSmall>
                    </Link>
                    }
                    <div className="cursor-pointer" onClick={() => setContactPopupOpen(true)}>
                        <IconSmall tailwind={'bg-blue-600 hover:bg-blue-500'}>
                            <Message tailwind={'text-white'} />
                        </IconSmall>
                    </div>
                    {!currentUser ?
                    <div className="cursor-pointer" onClick={() => setLoginPopupOpen(true)}>
                        <IconSmall tailwind={'bg-gray-200 hover:bg-gray-300'}>
                            <Key tailwind={'text-trueGray-700'} />
                        </IconSmall>
                    </div>
                    :
                    <button onClick={logout}>
                        <IconSmall tailwind={'bg-trueGray-700 hover:bg-trueGray-600'}>
                            <Exit tailwind={'text-gray-200'} />
                        </IconSmall>
                    </button>
                    }
                    {/* <Toggle /> */}
                </div>
            </div>
            {loginPopupOpen &&
                <Popup setPopupOpen={setLoginPopupOpen}>
                    <Login setLoginPopupOpen={setLoginPopupOpen} />
                </Popup>
            }
            {contactPopupOpen &&
                <Popup setPopupOpen={setContactPopupOpen} size="md">
                    <Contact setContactPopupOpen={setContactPopupOpen} />
                </Popup>
            }
        </div>
	)
}

const Login = ({setLoginPopupOpen}) => {
    const { login, currentUser } = useContext(AuthContext)
    const emailRef = useRef()
    const passwordRef = useRef()

    function handleLogin(e) {
        e.preventDefault()
        login(emailRef.current.value, passwordRef.current.value)
        console.log(currentUser)
        setLoginPopupOpen(false)
    }

    return (
        <div className="p-8 flex flex-col space-y-8 w-full">
            <div className="flex flex-col items-center space-y-2">
                {/* <div className="pb-4">
                    <img src={image} alt="" />
                </div> */}
                <p className="text-2xl font-bold">Login</p>
                <p className="opacity-75">Sign in to the admin panel</p>
            </div>
            <form className="flex flex-col space-y-8" onSubmit={handleLogin}>
                <div className="flex flex-col space-y-2">
                    <input className="rounded-lg border border-gray-200" type="email" ref={emailRef} placeholder="Email" required />
                    <input className="rounded-lg border border-gray-200" type="password" ref={passwordRef} placeholder="Password" required />
                </div>
                <div className="flex items-center space-x-2">
                    <button type="submit" className="w-full bg-blue-600 rounded-lg px-8 py-3 flex justify-center hover:bg-blue-700 text-white">Login</button>
                    <button onClick={() => setLoginPopupOpen(false)} className="w-full bg-gray-200 rounded-lg py-3 flex justify-center text-gray-600 hover:bg-gray-100">Cancel</button>
                </div>
            </form>
        </div>
    )
}

const Contact = ({setContactPopupOpen}) => {
    const nameRef = useRef()
    const emailRef = useRef()
    const messageRef = useRef()

    function handleLogin(e) {
        e.preventDefault()
        console.log('Send')
    }

    return (
        <div className="flex flex-col space-y-8 w-full">
            <div className="flex flex-col items-start space-y-2">
                <p className="text-2xl font-bold">Contact</p>
                <p className="opacity-75">Send me a message</p>
            </div>
            <form className="flex flex-col space-y-8" onSubmit={handleLogin}>
                <div className="flex flex-col space-y-4">
                    <input className="rounded-lg border border-gray-200" type="text" ref={nameRef} placeholder="Name" required />
                    <input className="rounded-lg border border-gray-200" type="email" ref={emailRef} placeholder="Email" required />
                    <textarea className="rounded-lg border border-gray-200" ref={messageRef} placeholder="Message" required></textarea>
                </div>
                <div className="flex items-center space-x-2">
                    <button type="submit" className="w-2/3 bg-blue-600 rounded-lg px-8 py-2.5 flex justify-center hover:bg-blue-700 text-white font-medium">Send</button>
                    <button onClick={() => setContactPopupOpen(false)} className="w-1/3 bg-gray-200 rounded-lg py-2.5 flex justify-center text-gray-600 hover:bg-gray-300 font-medium">Cancel</button>
                </div>
            </form>
        </div>
    )
}
