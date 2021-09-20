import React from 'react'
import Settings from '../../components/Settings'
import AdminLayout from '../../layouts/AdminLayout'

export default function Editor() {
    return (
        <div>
            <AdminLayout 
                content={'Editor'}
                settings={<Settings />}
            />
        </div>
    )
}
