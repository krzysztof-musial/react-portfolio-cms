import React, {useState, useEffect} from 'react'
import { doc, onSnapshot } from "firebase/firestore"; 
import { db } from '../firebase'
import { useHistory } from 'react-router';
import { HomeLayout } from '../layouts/HomeLayout';

export default function ProjectPage(props) {
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

    return (
        <HomeLayout>
            {project &&
                <p>{project.name}</p>
            }
        </HomeLayout>
    )
}
