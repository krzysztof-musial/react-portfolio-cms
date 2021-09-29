import React from 'react'
import { Paragraph, Heading } from '../components/Blocks';
import { motion } from 'framer-motion';

export default function Preview({ project }) {
    return (
        <div className="max-w-screen-md m-auto my-16">
            {project?.blocks.length > 0 && 
                <ul className="flex flex-col space-y-16 pb-16">
                    {project.blocks.map((block, index) => (
                        <motion.li 
                            layout
                            key={block.id}
                        >
                            {block.type === 'paragraph' && <Paragraph block={block} />}
                            {block.type === 'heading' && <Heading block={block} />}
                        </motion.li>
                    ))}
                </ul>
            }
        </div>
    )
}
