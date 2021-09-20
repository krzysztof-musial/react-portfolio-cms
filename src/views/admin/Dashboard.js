import React from 'react'
import AdminLayout from '../../layouts/AdminLayout'
// Firebase
import { db } from '../../firebase'

export default function Dashboard() {
    return (
        <div>
            <AdminLayout 
                content={<Content />}
            />
        </div>
    )
}

function Content() {
    return (
        <div>
            Dashboard
        </div>
    )
}
