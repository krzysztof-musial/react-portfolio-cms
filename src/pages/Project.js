import React, {useState, useEffect} from 'react'
import { doc, onSnapshot } from "firebase/firestore"; 
import { db } from '../firebase'
import { useHistory } from 'react-router';
import { Layout } from '../layouts/Layout'
import { AssetSection, SpaceSection, TextSection } from '../components/Sections';
import { motion } from 'framer-motion';

export const Project = (props) => {
    const [project, setProject] = useState()
    const history = useHistory()

    useEffect(() => {
        const unsubscribe = onSnapshot(doc(db, "projects", props.match.params.id), (data) => {
            if (data.data().public) {
                setProject(data.data())
            } else {
                history.push('/')
            }
        });
        return unsubscribe
    }, [props.match.params.id, history])

    const projectsMotion = {
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: {
            staggerChildren: 0.2,
          },
        },
    };
    const projectMotion = {
        hidden: { opacity: 0 },
        show: { opacity: 1 },
    };

    return (
        <Layout>
            {project?.sections.length > 0 &&
                <motion.div 
                    className="flex flex-col space-y-4 items-center pb-16"
                    variants={projectsMotion}
                    initial="hidden"
                    animate="show"
                >
                    {project?.sections.map((section) => (
                        <motion.div 
                            key={section.id} 
                            className="w-full"
                            variants={projectMotion}
                        >
                            {section.type === 'text' && <TextSection section={section} /> }
                            {section.type === 'space' && <SpaceSection section={section} /> }
                            {section.type === 'asset' && <AssetSection section={section} /> }
                        </motion.div>
                    ))}
                </motion.div>
            }
        </Layout>
    )
}