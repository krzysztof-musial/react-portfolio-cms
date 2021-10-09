import React, { useRef, useState, useEffect } from 'react'
import { HomeLayout } from '../layouts/HomeLayout'
// Firebase
import { collection, addDoc, onSnapshot, orderBy, query, doc, deleteDoc } from "firebase/firestore"; 
import { listAll, ref, deleteObject } from "firebase/storage";
import { db, storage } from '../firebase'
import { Thumbnail } from '../components/Thumbnail';
import { IconSmall } from '../components/Icon';
import { Edit, Plus, Trash, Weird } from '../components/SVG';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const ProjectsPage = () => {
    const [projects, setProjects] = useState([])
    const [projectsMenu, setProjectsMenu] = useState([])
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

            let menuTemp = []
            projectsArray.forEach(() => {
                menuTemp.push(false)
            })
            setProjectsMenu(menuTemp)
        })
        return unsubscribe
    }, [])

    async function handleAddProject(e) {
        e.preventDefault()
        if (projectNameRef.current.value.length >= 3) {
            await addDoc(collection(db, "projects"), {
                name: projectNameRef.current.value,
                public: false,
                date: new Date().toISOString().split('T')[0],
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
    function toggleProjectsMenu(index) {
        let tempArray = [...projectsMenu]
        tempArray[index] = !tempArray[index]
        setProjectsMenu(tempArray)
    }

    return (
        <HomeLayout>
            <div className="w-full max-w-screen-md m-auto px-0 sm:px-8">
                <div className="sm:rounded-2xl bg-transparent p-1 flex flex-col space-y-1 border-2 border-gray-100 bg-gray-100">
                    <form className="relative flex space-x-4 items-center justify-between bg-white rounded-xl" onSubmit={handleAddProject}>
                        <input type="text" ref={projectNameRef} placeholder="Project name" className="w-full border-gray-100 rounded-xl pr-12" />
                        <button className="absolute right-1 top-1" type='submit'>
                            <IconSmall>
                                <Plus tailwind={'text-blue-600'} />
                            </IconSmall>
                        </button>
                    </form>
                    <div className=" flex flex-col space-y-1 rounded-b-2xl">
                        {projects.map((project, index) => (
                            <div key={project.id} className="relative z-10">
                                <motion.div 
                                    className="w-full h-full flex space-x-4 items-center justify-between p-3 bg-white border-2 border-gray-100 rounded-xl z-20" 
                                    animate={{ x: projectsMenu[index] ? -85 : 0 }} 
                                    transition={{ type: 'tween' }}
                                >
                                    <div className="flex space-x-4 items-center">
                                        {project.published ?
                                            <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                                        :
                                            <div className="w-2 h-2 rounded-full bg-transparent"></div>
                                        }
                                        <div className="w-12 h-12 rounded-lg overflow-hidden">
                                            <Thumbnail project={project} />
                                        </div>
                                        <div className="flex flex-col">
                                            <p className="text-xs font-medium opacity-75">{project.date}</p>
                                            <p className="font-semibold">{project.name}</p>
                                        </div>
                                    </div>
                                    <div onClick={() => toggleProjectsMenu(index)} className="cursor-pointer">
                                        <IconSmall>
                                            <Weird tailwind={'text-gray-300'} />
                                        </IconSmall>
                                    </div>
                                </motion.div>
                                <div className="absolute right-0 top-0 w-24 h-full rounded-r-2xl flex border border-gray-100 space-x-0.5 overflow-hidden bg-orange-400" style={{ zIndex: -100 }}>
                                    <motion.div 
                                        className="w-full h-full bg-rose-600 flex items-center justify-center rounded-r-xl" 
                                        initial={{ x: projectsMenu[index] ? 0 : 40 }} 
                                        animate={{ x: projectsMenu[index] ? 0 : 40 }} 
                                        transition={{ type: 'tween' }}
                                    >
                                        <button onClick={() => handleDeleteProject(project.id)}>
                                            <IconSmall>
                                                <Trash tailwind={'text-white'} />
                                            </IconSmall>
                                        </button>
                                    </motion.div>
                                    <div className="h-full pr-1.5 pl-0.5 bg-orange-400 flex items-center justify-center">
                                        <Link to={`/editor/${project.id}`}>
                                            <IconSmall>
                                                <Edit tailwind={'text-white'} />
                                            </IconSmall>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </HomeLayout>
    )
}
