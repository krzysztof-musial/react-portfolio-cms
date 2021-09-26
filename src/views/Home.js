import React, { useEffect, useState } from 'react'
// Firebase
import { collection, onSnapshot, where, query } from "firebase/firestore"; 
import { db } from '../firebase'
// Components
import Header from '../components/Header'
// 
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function Home() {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    const unsubscribe = onSnapshot(query(collection(db, "projects"), where("published", "==", true)), (projectsData) => {
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
  // Animations
  const projectsMotion = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: .1
      }
    }
  }
  const projectMotion = {
    hidden: { y: 100, opacity: 0 },
    show: { y: 0, opacity: 1 }
  }

  return (
    <div>
        <Header />
        <div className="max-w-screen-md m-auto flex flex-col">
          {projects.length > 0 &&
            <motion.div 
              className="grid grid-cols-2 sm:px-8 sm:gap-4 sm:grid-cols-3 md:grid-cols-4" 
              variants={projectsMotion}
              initial="hidden"
              animate="show"
            >
              {projects.map((project) => {
                return (
                  <Link 
                    to={{ pathname: `/id/${project.id}` }} 
                    key={project.id} 
                  >
                    <motion.div 
                      className="bg-gray-200 dark:bg-gray-600 sm:rounded-lg aspect-w-1 aspect-h-1 cursor-pointer" 
                      variants={projectMotion} 
                      whileHover={{ scale: 1.1 }} 
                      whileTap={{ scale: 0.9 }} 
                    >
                      <img className="w-full h-full sm:rounded-lg" src={project.thumbnail} alt="" />
                    </motion.div>
                  </Link>
                )
              })}
            </motion.div>
          }
        </div>
    </div>
  )
}
