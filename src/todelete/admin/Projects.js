// TO DELETE
import React, { useRef, useState, useEffect } from 'react'
import AdminLayout from '../AdminLayout'
import { Link } from 'react-router-dom';
// Firebase
import { collection, addDoc, onSnapshot, orderBy, query, doc, deleteDoc } from "firebase/firestore"; 
import { listAll, ref, deleteObject } from "firebase/storage";
import { db, storage } from '../../firebase'

export default function Projects() {
    return (
        <div>
            <AdminLayout 
                content={<ProjectsManager />}
            />
        </div>
    )
}

function ProjectsManager() {
    const [projects, setProjects] = useState([])
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

    async function handleAddProject(e) {
        e.preventDefault()
        await addDoc(collection(db, "projects"), {
            name: projectNameRef.current.value,
            published: false,
            date: new Date().toISOString().split('T')[0],
            blocks: []
        }).then(() => projectNameRef.current.value = "")
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

    return (
        <div className="max-w-screen-md m-auto flex flex-col space-y-4 p-8">
            <form onSubmit={handleAddProject} className="w-full flex items-center space-x-2">
                <input type="text" ref={projectNameRef} placeholder="Name" className="w-full rounded-lg border-gray-200" />
                <input type="submit" value="Create" className="px-8 py-2.5 bg-indigo-600 text-white rounded-lg font-semibold text-sm cursor-pointer hover:bg-indigo-500 transition" />
            </form>
            <div className="flex flex-col space-y-2">
            {projects.map(project => {
                return (
                    <div key={project.id} className="flex justify-between items-center p-2 rounded-lg border border-gray-200 shadow-sm">
                        <div className="flex space-x-4 items-center">
                            <div className={`py-1 px-2 font-medium text-xs rounded text-white ${project.published ? 'bg-green-500' : 'bg-blue-600' }`}>
                                {project.published ? 'Public' : 'Draft'}
                            </div>
                            <div className="flex flex-col">
                                {/* <p className="text-sm">{project.date}</p> */}
                                <p className="font-semibold text-sm">{project.name}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Link to={`/admin/editor/${project.id}`}>Edit</Link>
                            <button onClick={() => handleDeleteProject(project.id)}>Delete</button>
                        </div>
                    </div>
                )})
            }
            </div>
        </div>
    )
}
