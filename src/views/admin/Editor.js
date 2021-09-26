import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router'
import AdminLayout from '../../layouts/AdminLayout'
import { doc, getDoc, updateDoc } from "firebase/firestore"; 
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { db, storage } from '../../firebase'
import { ParagraphEditor, HeadingEditor } from '../../components/Blocks';
import { motion } from 'framer-motion';

export default function Editor() {
    let { id } = useParams()
    const [project, setProject] = useState()
    const [assets, setAssets] = useState([])
    const [assetsToUpload, setAssetsToUpload] = useState([])

    useEffect(() => {
        const unsubscribe = getDoc(doc(db, "projects", id)).then((data) => {
            setProject(data.data())
        })
        return unsubscribe
    }, [id])

    useEffect(() => {
        const unsubscribe = listAll(ref(storage, id)).then((res) => {
            setAssets([])
            res.items.forEach((item) => {
                getDownloadURL(item).then((asset) => {
                    let object = {
                        name: item.name,
                        url: asset
                    }
                    setAssets((assets) => [...assets, object])
                })
            });
        })
        return unsubscribe
    }, [id])

    function updateProject() {
        updateDoc(doc(db, "projects", id), project).then(() => {
            console.log('Updated')
        });
        if (assetsToUpload.length > 0) {
            const assets = assetsToUpload;
            assets.forEach(asset => {
                uploadBytes(ref(storage, id + '/' + asset.name), asset).then(() => {
                    listAll(ref(storage, id)).then((res) => {
                        setAssets([])
                        res.items.forEach((item) => {
                            getDownloadURL(item).then((asset) => {
                                let object = {
                                    name: item.name,
                                    url: asset
                                }
                                setAssets((assets) => [...assets, object])
                            })
                        });
                    })
                });
            })
            setAssetsToUpload([]);
        }
    }

    return (
        <div>
            <AdminLayout 
                content={<Preview project={ project } setProject={ setProject } updateProject={ updateProject } />}
                settings={<Settings project={ project } setProject={ setProject } updateProject={ updateProject } assetsToUpload={assetsToUpload} setAssetsToUpload={setAssetsToUpload} assets={assets} setAssets={setAssets} id={id} />}
            />
        </div>
    )
}

function Preview({ project, setProject }) {
    const [menu, setMenu] = useState(false)
    function updateBlocks(blocks) {
        setProject((projectOld) => ({
            ...projectOld,
            blocks: blocks
        }))
    }
    function addBlock(type) {
        let blocks = project.blocks
        let block = {}
        if (type === 'paragraph') {
            block = {
                id: Date.now(),
                type: 'paragraph',
                content: {
                    title: 'Title',
                    paragraph: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusantium, cupiditate veniam! Ut praesentium laborum veniam molestias officiis quos est dolorum repellat minus odio ratione, nulla beatae temporibus nam. Eaque, eos. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam dicta corrupti itaque expedita officia, necessitatibus quod nostrum cupiditate libero qui ex et cum repudiandae nulla. Tenetur dignissimos officia sed quidem!'
                }
            }
        }
        if (type === 'heading') {
            block = {
                id: Date.now(),
                type: 'heading',
                content: {
                    title: 'Lorem ipsum dolor sit amet consectetur',
                    subtitle: 'Ipsum deserunt quod, quidem beatae accusantium'
                }
            }
        }
        blocks.push(block)
        updateBlocks(blocks)
        setMenu(false)
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
        <div className="max-w-screen-md m-auto mb-16">
            {project?.blocks.length > 0 && 
                <ul className="flex flex-col space-y-16 pb-16">
                    {project.blocks.map((block, index) => (
                        <motion.li 
                            layout
                            key={block.id}
                        >
                            {block.type === 'paragraph' && <ParagraphEditor block={block} index={index} updateBlock={updateBlock} moveBlock={moveBlock} deleteBlock={deleteBlock} />}
                            {block.type === 'heading' && <HeadingEditor block={block} index={index} updateBlock={updateBlock} moveBlock={moveBlock} deleteBlock={deleteBlock} />}
                        </motion.li>
                    ))}
                </ul>
            }
            <div className="w-full max-w-screen-md m-auto px-4 sm:px-8 flex space-x-4">
                <button 
                    onClick={() => setMenu(!menu)} 
                    className="rounded-md w-6 h-6 flex justify-center items-center border border-gray-200 hover:bg-gray-100"
                >
                    <svg className={`fill-current text-black w-4 h-4 transition ${menu ? 'transform rotate-45' : ''}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13 13V19H11V13H5V11H11V5H13V11H19V13H13Z" />
                    </svg>
                </button>
                {menu && 
                    <div className="flex items-center space-x-2">
                        <button 
                            onClick={() => addBlock('paragraph')} 
                            className="rounded-md h-6 w-6 flex justify-center items-center border border-gray-200 text-sm font-semibold hover:bg-gray-100"
                        >P</button>
                        <button 
                            onClick={() => addBlock('heading')} 
                            className="rounded-md h-6 w-6 flex justify-center items-center border border-gray-200 text-sm font-semibold hover:bg-gray-100"
                        >H</button>
                    </div>
                }
            </div>
        </div>
    )
}

function Settings({ project, setProject, updateProject, assetsToUpload, setAssetsToUpload, assets, setAssets, id }) {
    const [showDetails, setShowDetails] = useState(true)
    const [showAssets, setShowAssets] = useState(true)
    const [showTerminal, setShowTerminal] = useState(false)
    const dateRef = useRef()
    const nameRef = useRef()
    const categoryRef = useRef()

    function updateDetails(event) {
        setProject((projectOld) => ({
            ...projectOld,
            date: dateRef.current.value,
            name: nameRef.current.value,
            category: categoryRef.current.value
        }))
    }
    function updatePublished(event) {
        setProject((projectOld) => ({
            ...projectOld,
            published: event.target.checked
        }))
    }
    function updateThumbnail(event) {
        setProject((projectOld) => ({
            ...projectOld,
            thumbnail: event.target.value
        }))
    }

    function addAssets(event) {
        let nameIsAvaliable = true
        assetsToUpload.forEach(asset => {
            if (asset.name === event.target.files[0].name) {
                nameIsAvaliable = false
            }
        })
        if (nameIsAvaliable) {
            setAssetsToUpload([...assetsToUpload, event.target.files[0]])
        } else {
            console.log("File name is taken")
        }
    }

    return (
        <div className="p-4 border-l border-gray-200 bg-gray-50 h-full flex flex-col space-y-8">
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
                    {project &&
                        <div className="flex flex-col space-y-1">
                            <input type="date" defaultValue={project.date} ref={dateRef} onChange={updateDetails} />
                            <input type="checkbox" defaultChecked={project.published} onChange={updatePublished} />
                            <input type="text" defaultValue={project.name} placeholder="Name" ref={nameRef} onChange={updateDetails} />
                            <input type="text" defaultValue={project.category} placeholder="Category" ref={categoryRef} onChange={updateDetails} />
                            <select onChange={updateThumbnail} value={project.thumbnail}>
                                <option value=""></option>
                            {assets.map(asset => (
                                <option key={asset.name} value={asset.url}>
                                {asset.name}
                                </option>
                            ))}
                            </select>
                        </div>
                    }
                    </div>
                }
            </div>
            {/* Assets */}
            <div className="flex flex-col space-y-4">
                <div className="flex items-center justify-between cursor-pointer" onClick={() => setShowAssets(!showAssets)}>
                    <p className="uppercase text-xs font-semibold">Assets</p>
                    <div>
                        {showAssets &&                         
                        <svg className="w-4 h-4 stroke-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19.9201 15.0499L13.4001 8.52989C12.6301 7.75989 11.3701 7.75989 10.6001 8.52989L4.08008 15.0499" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>}
                        {!showAssets &&                          
                        <svg className="w-4 h-4 stroke-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19.9201 8.94995L13.4001 15.47C12.6301 16.24 11.3701 16.24 10.6001 15.47L4.08008 8.94995" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>}
                    </div>
                </div>
                {showAssets && 
                <div>
                    {assets &&
                        <div>
                            {assets.map((asset) => (
                                <p key={asset.name}>{asset.name}</p>
                            ))}
                        </div>
                    }
                    {/* <button onClick={test}>assets</button> */}
                    <input type="file" onChange={addAssets}/>
                    {assetsToUpload &&
                        <div>
                            {assetsToUpload.map((asset) => (
                                <p key={asset.name}>{asset.name}</p>
                            ))}
                        </div>
                    }
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