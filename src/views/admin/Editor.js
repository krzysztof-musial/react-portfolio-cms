import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router'
import AdminLayout from '../../layouts/AdminLayout'
import { doc, getDoc, updateDoc } from "firebase/firestore"; 
import { db } from '../../firebase'
import { Paragraph, ParagraphEditor } from '../../components/Blocks';
import { motion } from 'framer-motion';

export default function Editor() {
    let { id } = useParams()
    const [project, setProject] = useState()
    const [blockHover, setBlockHover] = useState()

    useEffect(() => {
        const unsubscribe = getDoc(doc(db, "projects", id)).then((data) => {
            setProject(data.data())
        })
        return unsubscribe
    }, [id])

    function updateProject() {
        updateDoc(doc(db, "projects", id), project).then(() => {
            console.log('Updated')
        });
          
    }

    return (
        <div>
            <AdminLayout 
                content={<Preview project={ project } blockHover={blockHover} setBlockHover={setBlockHover} />}
                settings={<Settings project={ project } setProject={ setProject } updateProject={ updateProject } blockHover={blockHover} setBlockHover={setBlockHover} />}
            />
        </div>
    )
}

function Preview({ project, setBlockHover, blockHover }) {
    return (
        <div className="p-2">
            {project?.blocks.length > 0 ? 
                <ul className="flex flex-col space-y-16">
                    {project.blocks.map((block, index) => (
                        <motion.li 
                            layout
                            transition={spring}
                            key={block.id} 
                            className={`p-2 rounded-lg border-2 border-transparent ${blockHover === index ? 'border-sky-400' : ''}`} 
                            onMouseEnter={() => setBlockHover(index)} 
                            onMouseLeave={() => setBlockHover(null)}
                        >
                            {block.type === 'paragraph' && <Paragraph block={block} />}
                        </motion.li>
                    ))}
                </ul>
                : 
                <div>brak bloków</div>
            }
        </div>
    )
}

function Settings({ project, setProject, updateProject, setBlockHover, blockHover }) {
    const [showDetails, setShowDetails] = useState(true)
    const [showBlocks, setShowBlocks] = useState(true)
    const [showTerminal, setShowTerminal] = useState(false)
    const nameRef = useRef()

    function updateDetails(event) {
        event.preventDefault()
        setProject((projectOld) => ({
            ...projectOld,
            name: nameRef.current.value,
        }))
    }
    function updateBlocks(blocks) {
        setProject((projectOld) => ({
            ...projectOld,
            blocks: blocks
        }))
    }
    function addBlock() {
        let blocks = project.blocks
        const block = {
            id: Date.now(),
            type: 'paragraph',
            content: 'Paragraph'
        }
        blocks.push(block)
        updateBlocks(blocks)
    }
    function updateBlock(index, content) {
        let blocks = project.blocks
        project.blocks[index].content = content
        updateBlocks(blocks)
    }
    function moveBlock(index, direction) {
        let blocks = project.blocks
        if(direction === 'up') {
            if (index !== 0) {
                let temp = blocks.splice(index, 1)[0];
                blocks.splice(index - 1, 0, temp);
            }
        } else if (direction === 'down') {
            if (index !== blocks.length - 1) {
                let temp = blocks.splice(index, 1)[0];
                blocks.splice(index + 1, 0, temp);
            }
        }
        updateBlocks(blocks)
    }
    function deleteBlock(index) {
        let blocks = project.blocks
        blocks.splice(index, 1)
        updateBlocks(blocks)
    }

    return (
        <div className="p-4 border-l border-gray-200 bg-gray-50 h-screen flex flex-col space-y-8">
            <button onClick={updateProject}>Save</button>
            {/* Details */}
            <div className="flex flex-col space-y-4">
                <div className="flex items-center justify-between cursor-pointer" onClick={() => setShowDetails(!showDetails)}>
                    <p className="uppercase text-xs font-semibold">Details</p>
                    <div>
                        {showDetails &&                         
                        <svg className="w-4 h-4 stroke-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19.9201 15.0499L13.4001 8.52989C12.6301 7.75989 11.3701 7.75989 10.6001 8.52989L4.08008 15.0499" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>}
                        {!showDetails &&                          
                        <svg className="w-4 h-4 stroke-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19.9201 8.94995L13.4001 15.47C12.6301 16.24 11.3701 16.24 10.6001 15.47L4.08008 8.94995" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>}
                    </div>
                </div>
                {showDetails &&
                <div>
                    <input type="text" defaultValue={project?.name} placeholder="Name" ref={nameRef} onChange={updateDetails} />
                </div>
                }
            </div>
            {/* Blocks */}
            <div className="flex flex-col space-y-4">
                <div className="flex items-center justify-between cursor-pointer" onClick={() => setShowBlocks(!showBlocks)}>
                    <p className="uppercase text-xs font-semibold">Blocks</p>
                    <div>
                        {showBlocks &&                         
                        <svg className="w-4 h-4 stroke-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19.9201 15.0499L13.4001 8.52989C12.6301 7.75989 11.3701 7.75989 10.6001 8.52989L4.08008 15.0499" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>}
                        {!showBlocks &&                          
                        <svg className="w-4 h-4 stroke-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19.9201 8.94995L13.4001 15.47C12.6301 16.24 11.3701 16.24 10.6001 15.47L4.08008 8.94995" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>}
                    </div>
                </div>
                {showBlocks &&
                <div>
                    {project?.blocks.length > 0 ? 
                        <ul className="flex flex-col space-y-2">
                            {project.blocks.map((block, index) => (
                                <motion.li 
                                    layout
                                    transition={spring}
                                    key={block.id} 
                                    className={`flex flex-col space-y-2 border-2 rounded-lg border-transparent ${blockHover === index ? 'border-sky-400' : ''}`} 
                                    onMouseEnter={() => setBlockHover(index)} 
                                    onMouseLeave={() => setBlockHover(null)}
                                >
                                    {block.type === 'paragraph' && <ParagraphEditor block={block} index={index} updateBlock={updateBlock} moveBlock={moveBlock} deleteBlock={deleteBlock} />}
                                </motion.li>
                            ))}
                        </ul>
                        : 
                        <div>brak bloków</div>
                    }
                    <button onClick={addBlock}>Add Block</button>
                </div>
                }
            </div>
            {/* Terminal */}
            <div className="flex flex-col space-y-4">
                <div className="flex items-center justify-between cursor-pointer" onClick={() => setShowTerminal(!showTerminal)}>
                    <p className="uppercase text-xs font-semibold">Terminal</p>
                    <div>
                        {showTerminal &&                         
                        <svg className="w-4 h-4 stroke-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19.9201 15.0499L13.4001 8.52989C12.6301 7.75989 11.3701 7.75989 10.6001 8.52989L4.08008 15.0499" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>}
                        {!showTerminal &&                          
                        <svg className="w-4 h-4 stroke-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19.9201 8.94995L13.4001 15.47C12.6301 16.24 11.3701 16.24 10.6001 15.47L4.08008 8.94995" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>}
                    </div>
                </div>
                {showTerminal &&
                <div className="rounded-lg bg-gray-900 p-2">
                    <pre className="text-xs font-mono text-white whitespace-pre-wrap">{ JSON.stringify(project, null, 2) }</pre>
                </div>
                }
            </div>
        </div>
    )
}

const spring = {
    type: "spring",
    damping: 25,
    stiffness: 120
};