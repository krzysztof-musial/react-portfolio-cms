import React, { useRef, useState, useEffect } from 'react'
// Firebase
import { collection, addDoc, onSnapshot, orderBy, query, doc, deleteDoc, updateDoc } from "firebase/firestore"; 
import { listAll, ref, deleteObject } from "firebase/storage";
import { db, storage } from '../firebase'
// Components
import { Layout } from '../layouts/Layout'
import { Link } from 'react-router-dom';
import { IconSmall } from '../components/Icons';
import { CircleDots, CirclePlus, Close, Plus } from '../components/SVG';
import { Thumbnail } from '../components/Thumbnail';
import { Popup } from '../components/Popup';

export const Dashboard = () => {
    const [projects, setProjects] = useState([])
    const [messages, setMessages] = useState([])
    const [showMessagePopup, setShowMessagePopup] = useState(false)
    const [messageToShow, setMessageToShow] = useState({})
    const projectNameRef = useRef()

    useEffect(() => {
        const q = query(collection(db, 'projects'), orderBy('date', 'desc'))
        const unsubscribe = onSnapshot(q, (projectsData) => {
            let projectsArray = []
            projectsData.forEach(project => {
                let projectTemp = project.data()
                projectTemp.id = project.id 
                projectsArray.push(projectTemp)
            });
            setProjects(projectsArray)
        })
        return unsubscribe
    }, [])
    useEffect(() => {
        const q = query(collection(db, 'messages'), orderBy('date', 'desc'))
        const unsubscribe = onSnapshot(q, (messagesData) => {
            let messagesArray = []
            messagesData.forEach(message => {
                let messageTemp = message.data()
                messageTemp.id = message.id 
                messagesArray.push(messageTemp)
            });
            setMessages(messagesArray)
        })
        return unsubscribe
    }, [])

    async function handleAddProject(e) {
        e.preventDefault()
        if (projectNameRef.current.value.length >= 3) {
            await addDoc(collection(db, "projects"), {
                name: projectNameRef.current.value,
                category: '',
                date: new Date().toISOString().split('T')[0],
                public: false,
                thumbnail: null,
                sections: []
            }).then(() => projectNameRef.current.value = "")
        }
    }
    async function handleDeleteProject(id) {
        if (window.confirm('Are you sure?')) {
            await listAll(ref(storage, id)).then((res) => {
                res.items.forEach((item) => {
                    deleteObject(item)
                })
            })
            await deleteDoc(doc(db, 'projects', id))
        } else {
            console.log('canceled')
        }
    }

    function openMessage(message) {
        setMessageToShow(message)
        if (message.unread) {
            let messageRead = {
                ...message,
                unread: false
            }
            delete messageRead.id
            updateDoc(doc(db, "messages", message.id), messageRead).then(() => {
                console.log('Updated')
            });
        }
        setShowMessagePopup(true)
    }

    return (
        <div>
            <Layout>
                <div className="w-full max-w-screen-md m-auto flex flex-col px-4 sm:px-8">
                    <form className="relative" onSubmit={handleAddProject}>
                        <input 
                            ref={projectNameRef} 
                            type="text" 
                            placeholder="Project name" 
                            className="w-full pr-9 rounded-lg border-gray-200 dark:bg-myGray-700 dark:border-myGray-600 dark:ring-violet-500" 
                        />
                        <button className="absolute right-2 top-2" type='submit'>
                            <IconSmall>
                                <CirclePlus tailwind={'text-blue-600 dark:text-white'} />
                            </IconSmall>
                        </button>
                    </form>
                    {projects.length > 0 ?
                        <div className="mt-4 border border-b-2 border-gray-200 rounded-lg overflow-hidden dark:border-myGray-700">
                            {projects.map((project) => (
                                <div key={project.id} className="flex items-center justify-between p-2 bg-white border-b last:border-b-0 border-gray-200 hover:bg-gray-50 dark:bg-myGray-800 dark:border-myGray-700 dark:hover:bg-myGray-700">
                                    <div className="flex items-center space-x-4 pl-2">
                                        {project.public ?
                                            <div className="w-2 h-2 rounded-full bg-blue-600 dark:bg-violet-500"></div>
                                        :
                                            <div className="w-2 h-2 rounded-full bg-transparent border border-gray-200 dark:border-myGray-700"></div>
                                        }
                                        <div className="w-10 h-10 rounded-lg border border-gray-200 dark:border-myGray-700 overflow-hidden">
                                            <Thumbnail project={project} />
                                        </div>
                                        <div>
                                            <p className="text-xs opacity-75">{ project.date }</p>
                                            <p className="text-sm font-medium">{ project.name }</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2 pl-4 pr-2 border-l border-gray-200 dark:border-myGray-700">
                                        <Link to={`/editor/${project.id}`}>
                                            <IconSmall>
                                                <CircleDots tailwind={'text-orange-600'} />
                                            </IconSmall>
                                        </Link>
                                        <button onClick={() => handleDeleteProject(project.id)}>
                                            <IconSmall>
                                                <Close tailwind={'text-rose-600'} />
                                            </IconSmall>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    :
                        <div className="mt-4 flex justify-center items-center opacity-50">
                            <IconSmall tailwind={'p-1'}>
                                <Plus />
                            </IconSmall>
                            <p className="text-sm">Add project</p>
                        </div>
                    }
                </div>
                <div className="w-full max-w-screen-md m-auto flex flex-col px-4 sm:px-8">
                    {messages.length > 0 ?
                        <div className="mt-4 border border-b-2 border-gray-200 rounded-lg overflow-hidden dark:border-gray-900">
                            {messages.map((message) => (
                                <button 
                                    key={message.id} 
                                    className="w-full flex items-center space-x-4 p-2 bg-white border-b last:border-b-0 border-gray-200 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-900 dark:hover:bg-gray-700"
                                    onClick={() => openMessage(message)}
                                >
                                    <div className="flex items-center space-x-4 pl-2">
                                        {message.unread ?
                                            <div className="w-2 h-2 rounded-full bg-blue-600 dark:bg-violet-500"></div>
                                        :
                                            <div className="w-2 h-2 rounded-full bg-transparent border border-gray-200 dark:border-gray-900"></div>
                                        }
                                        {/* <Icon>
                                            <Message tailwind={'text-blue-600'} />
                                        </Icon> */}
                                    </div>
                                    <div className="w-full flex flex-col items-start">
                                        <div className="w-full flex justify-between items-start">
                                            <p className="text-sm font-medium">{ message.name }</p>
                                            <p className="text-xs opacity-75">{ message.date }</p>
                                        </div>
                                        <p className="text-sm">{ message.email }</p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    :
                        <div className="mt-4 flex justify-center items-center opacity-50">
                            <p className="text-sm">No messages</p>
                        </div>
                    }
                </div>
            </Layout>
            {showMessagePopup &&
                <Popup 
                    setPopupOpen={setShowMessagePopup} 
                    // icon={<Message tailwind={'text-blue-600 dark:text-violet-500'} />} 
                    // title={'Send me a message'} 
                >
                    <MessagePopup setPopupOpen={setShowMessagePopup} messageToShow={messageToShow} />
                </Popup>
            }
        </div>
    )
}

const MessagePopup = ({ setPopupOpen, messageToShow }) => {
    return (
        <div className="p-8 flex flex-col space-y-8">
            <div className="flex space-x-4">
                <div className="flex flex-col">
                    <p className="font-semibold text-sm">From:</p>
                    <p className="text-sm">{messageToShow.name}</p>
                    <p className="text-xs">{messageToShow.email}</p>
                </div>
                <div className="flex flex-col">
                    <p className="font-semibold text-sm">Date:</p>
                    <p className="text-sm">{messageToShow.date}</p>
                </div>
            </div>
            <p>{messageToShow.message}</p>
        </div>
    )
}