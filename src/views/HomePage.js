import React, { useEffect, useState } from "react";
// Firebase
import { collection, onSnapshot, where, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";
//
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HomeLayout } from "../layouts/HomeLayout";
import { Thumbnail } from "../components/Thumbnail";

export default function Home() {
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
  // Animations
  const projectsMotion = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  const projectMotion = {
    hidden: { y: 100, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  return (
    <HomeLayout>
      <div className="max-w-screen-md m-auto flex flex-col space-y-4">
        	{projects.length > 0 && (
          <motion.div
            className="grid grid-cols-2 sm:px-8 sm:gap-4 sm:grid-cols-3 md:grid-cols-4"
            variants={projectsMotion}
            initial="hidden"
            animate="show"
          >
            {projects.map((project) => (
              <Link to={{ pathname: `/id/${project.id}` }} key={project.id}>
                <motion.div
                  className="sm:rounded-lg aspect-w-1 aspect-h-1 cursor-pointer overflow-hidden"
                  variants={projectMotion}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Thumbnail project={project} />
                </motion.div>
              </Link>
            ))}
          </motion.div>
        )}
      </div>
    </HomeLayout>
  );
}

