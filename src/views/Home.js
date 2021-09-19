import React from 'react'
// Components
import Header from '../components/Header'
// 
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function Home() {
  const projects = [
    {title: 1},
    {title: 2},
    {title: 3},
    {title: 4},
    {title: 5},
    {title: 6},
    {title: 7},
    {title: 8},
    {title: 9},
    {title: 10},
  ]
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
          <motion.div 
            className="grid grid-cols-2 sm:px-8 sm:gap-4 sm:grid-cols-3 md:grid-cols-4" 
            variants={projectsMotion}
            initial="hidden"
            animate="show"
          >
            {projects.map((project, i) => {
              return (
                <Link 
                  to={{ pathname: `/id/${i}` }} 
                  key={project.title} 
                >
                  <motion.div 
                    className="bg-gray-200 dark:bg-gray-600 sm:rounded-lg aspect-w-1 aspect-h-1 cursor-pointer" 
                    variants={projectMotion} 
                    whileHover={{ scale: 1.1 }} 
                    whileTap={{ scale: 0.9 }} 
                  ></motion.div>
                </Link>
              )
            })}
          </motion.div>
        </div>
    </div>
  )
}
