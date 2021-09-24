import React, { useRef, useState, useEffect } from 'react'
import AdminLayout from '../../layouts/AdminLayout'
import { Link } from 'react-router-dom';
// Firebase
import { collection, addDoc, onSnapshot } from "firebase/firestore"; 
import { db } from '../../firebase'

export default function Projects() {
    return (
        <div>
            <AdminLayout 
                content={<Content />}
            />
        </div>
    )
}

function Content() {
    return (
        <div>
            <ProjectsManager />
        </div>
    )
}

function ProjectsManager() {
    const [projects, setProjects] = useState([])
    const projectNameRef = useRef()

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "projects"), (projectsData) => {
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

    async function handleAddProject(e) {
        e.preventDefault()
        await addDoc(collection(db, "projects"), {
            name: projectNameRef.current.value,
            published: false,
            blocks: []
        });
    }

    return (
        <div className="p-4 flex flex-col space-y-4">
            <form onSubmit={handleAddProject} className="w-full flex items-center space-x-2">
                <input type="text" ref={projectNameRef} placeholder="Name" className="w-full" />
                <input type="submit" value="Add Project" className="px-4" />
            </form>
            {projects.map(project => {
                return (
                    <div key={project.id} className="flex space-x-4 items-center">
                        <Link to={`/admin/editor/${project.id}`}>Edit</Link>
                        <p>{project.name}</p>
                    </div>
                )})
            }
        </div>
    )
}
