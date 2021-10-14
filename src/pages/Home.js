import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// Firebase
import { collection, onSnapshot, where, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";
// Components
import { Layout } from '../layouts/Layout'
import { Thumbnail } from "../components/Thumbnail";
import { motion } from "framer-motion";

export const Home = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
      const q = query(collection(db, "projects"), where("public", "==", true), orderBy('date', 'desc'))
      const unsubscribe = onSnapshot(q, (projectsData) => {
          let projectsArray = [];
          projectsData.forEach((project) => {
            let projectTemp = project.data();
            projectTemp.id = project.id;
            projectsArray.push(projectTemp);
          });
          setProjects(projectsArray);
        }
      );
      return unsubscribe;
    }, []);

    const projectsMotion = {
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: {
            staggerChildren: 0.15,
          },
        },
    };
    const projectMotion = {
        hidden: { y: 100, opacity: 0 },
        show: { y: 0, opacity: 1 },
    };

    return (
        <Layout>
            {projects.length > 0 &&
                <motion.div 
                    className="w-full max-w-screen-md m-auto px-0 sm:px-8 grid grid-cols-2 sm:gap-4 sm:grid-cols-3 md:grid-cols-4"
                    variants={projectsMotion}
                    initial="hidden"
                    animate="show"
                >
                    {projects.map((project) => (
                        <Link to={{ pathname: `/id/${project.id}` }} key={project.id}>
                            <motion.div 
                                className="sm:rounded-lg aspect-w-1 aspect-h-1 border border-gray-200 dark:border-black overflow-hidden"
                                variants={projectMotion}
                                whileHover={{ scale: 1.1, boxShadow: '8px 16px 8px rgba(0, 0, 0, 0.02)' }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <Thumbnail project={project} />
                            </motion.div>
                        </Link>
                    ))}
                </motion.div>
            }
        </Layout>
    )
}
