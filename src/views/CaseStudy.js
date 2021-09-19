import React from 'react'
import Header from '../components/Header'

export default function CaseStudy(props) {
    console.log(props.match.params.id)
    return (
        <div>
            <Header />
            <p>Case Study</p>
        </div>
    )
}
