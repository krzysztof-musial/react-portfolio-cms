import React, {useState, useEffect} from 'react'
import Header from '../components/Header'
import { doc, onSnapshot } from "firebase/firestore"; 
import { db } from '../firebase'
import { Heading, Paragraph } from '../components/Blocks';

export default function Project(props) {
    const [project, setProject] = useState()

    useEffect(() => {
        const unsubscribe = onSnapshot(doc(db, "projects", props.match.params.id), (data) => {
            setProject(data.data())
        });        
        return unsubscribe
    }, [props.match.params.id])

    return (
        <div>
            <Header />
            {project?.blocks.length > 0 && 
                <ul className="flex flex-col space-y-16 pb-16 my-16">
                    {project.blocks.map((block) => (
                        <li 
                            key={block.id}
                        >
                            {block.type === 'paragraph' && <Paragraph block={block} />}
                            {block.type === 'heading' && <Heading block={block} />}
                        </li>
                    ))}
                </ul>
            }
        </div>
    )
}
