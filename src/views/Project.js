import React, {useState, useEffect} from 'react'
import Header from '../components/Header'
import { doc, onSnapshot } from "firebase/firestore"; 
import { db } from '../firebase'
import Preview from '../components/Preview'
import { useHistory } from 'react-router';

export default function Project(props) {
    const [project, setProject] = useState()
    const history = useHistory()

    useEffect(() => {
        const unsubscribe = onSnapshot(doc(db, "projects", props.match.params.id), (data) => {
            if (data.data().published) {
                setProject(data.data())
            } else {
                history.push('/')
            }
        });
        return unsubscribe
    }, [props.match.params.id, history])

    return (
        <div>
            <Header />
            <Preview project={ project } />
        </div>
    )
}
