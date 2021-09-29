import React from 'react'
import { motion } from 'framer-motion'

export default function Popup({ content }) {
    return (
        <motion.div 
            className="absolute top-0 left-0 w-full h-full flex justify-center items-center" 
            initial={{ background: 'rgba(0,0,0,0)' }} 
            animate={{ background: 'rgba(0,0,0,.5)' }}
        >
            <motion.div 
                className="bg-white p-4 rounded-xl flex flex-col space-y-4" 
                initial={{ y: 100 }} 
                animate={{ y: 0 }}
            >
                {/* Content */}
                <div>{content}</div>
            </motion.div>
        </motion.div>
    )
}
