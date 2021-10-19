import React, { useState, useContext, useRef } from 'react'
import { Link } from 'react-router-dom'
// Firebase
import { collection, addDoc } from "firebase/firestore"; 
import { db } from '../firebase'
// Contexts
import { AuthContext } from '../contexts/AuthContext'
// Components
import { Button } from '../components/Buttons'
import { Icon, IconSmall } from '../components/Icons'
import { Close, Dashboard, Logo, Message, Shield } from '../components/SVG'
import { ThemeToggle } from '../contexts/ThemeContext'
import { Popup } from '../components/Popup'
import { ButtonLarge } from '../components/Buttons'

export const Layout = ({ children }) => {
    return (
        <div>
            <div className="w-full max-w-screen-md m-auto p-4 sm:p-8">
                <Header />
            </div>
            <div className="flex flex-col space-y-8">
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
        <div className="w-full flex items-center justify-between">
            <Link to={'/'}>
                <Icon tailwind={'bg-gray-900 border-2 border-transparent dark:border-white'}>
                    <Logo tailwind={'text-white'} />
                </Icon>
            </Link>
            <div className="flex items-center space-x-2">
                {currentUser &&
                    <div className="flex items-center space-x-2">
                        <Link to={'/dashboard'}>
                            <Icon tailwind={'p-1 bg-gray-200 hover:bg-gray-300 dark:bg-myGray-800 dark:hover:bg-myGray-700'}>
                                <Dashboard tailwind={'text-gray-700 dark:text-myGray-50'} />
                            </Icon>
                        </Link>
                        <button onClick={() => logout()}>
                            <Icon tailwind={'p-1 bg-gray-200 hover:bg-gray-300 dark:bg-myGray-800 dark:hover:bg-myGray-700'}>
                                <Close tailwind={'text-gray-700 dark:text-myGray-50'} />
                            </Icon>
                        </button>
                    </div>
                }
                {!currentUser &&
                    <div className="flex items-center space-x-2">
                        <button onClick={() => setContactPopupOpen(true)}>
                            <Button 
                                icon={
                                    <IconSmall>
                                        <Message />
                                    </IconSmall>
                                } 
                                text={'Contact'} 
                                tailwind={'bg-blue-600 text-white hover:bg-blue-500 dark:bg-myGray-800 dark:hover:bg-myGray-700'} 
                            />
                        </button>
                        <button onClick={() => setLoginPopupOpen(true)}>
                            <Icon tailwind={'p-1 bg-gray-200 hover:bg-gray-300 dark:bg-myGray-800 dark:hover:bg-myGray-700'}>
                                <Shield tailwind={'text-gray-700 dark:text-myGray-50'} />
                            </Icon>
                        </button>
                    </div>
                }
                <div className="pl-2">
                    <ThemeToggle />
                </div>
            </div>
            {loginPopupOpen &&
                <Popup setPopupOpen={setLoginPopupOpen} icon={<Shield tailwind={'text-blue-600 dark:text-purple-500'} />} title={'Sign in to the admin account'} >
                    <LoginPopup setPopupOpen={setLoginPopupOpen} />
                </Popup>
            }
            {contactPopupOpen &&
                <Popup setPopupOpen={setContactPopupOpen} icon={<Message tailwind={'text-blue-600 dark:text-purple-500'} />} title={'Send me a message'} >
                    <ContactPopup setPopupOpen={setContactPopupOpen} />
                </Popup>
            }
        </div>
    )
}

const ContactPopup = ({ setPopupOpen }) => {
    const nameRef = useRef()
    const emailRef = useRef()
    const messageRef = useRef()
    
    async function handleSend(e) {
        e.preventDefault()
        await addDoc(collection(db, "messages"), {
            name: nameRef.current.value,
            email: emailRef.current.value,
            message: messageRef.current.value,
            date: new Date().toISOString().split('T')[0],
            unread: true,
        }).then(() => {
            setPopupOpen(false)
        })
    }

    return (
        <form onSubmit={handleSend} className="flex flex-col space-y-8 px-8">
            <div className="flex flex-col space-y-2">
                <input ref={nameRef} type="text" placeholder="Name" className="input" />
                <input ref={emailRef} type="email" placeholder="Email" className="input" />
                <textarea 
                    ref={messageRef} 
                    className="input" 
                    placeholder="Message" 
                    style={{ minHeight: '100px' }}
                ></textarea>
            </div>
            <button type="submit">
                <ButtonLarge text={'Send'} tailwind={'button-primary'} />
            </button>
        </form>
    )
}

const LoginPopup = ({ setPopupOpen }) => {
    const { login } = useContext(AuthContext)
    const emailRef = useRef()
    const passwordRef = useRef()

    function handleLogin(e) {
        e.preventDefault()
        login(emailRef.current.value, passwordRef.current.value)
        setPopupOpen(false)
    }

    return (
        <form onSubmit={handleLogin} className="flex flex-col space-y-8 px-8">
            <div className="flex flex-col space-y-2">
                <input ref={emailRef} type="email" placeholder="Email" className="input" />
                <input ref={passwordRef} type="password" placeholder="Password" className="input" />
            </div>
            <button type="submit">
                <ButtonLarge text={'Login'} tailwind={'button-primary'} />
            </button>
        </form>
    )
}