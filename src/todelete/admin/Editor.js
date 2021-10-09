// TO DELETE
import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router'
import AdminLayout from '../AdminLayout'
import { doc, getDoc, updateDoc } from "firebase/firestore"; 
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { db, storage } from '../../firebase'
import { ParagraphEditor, HeadingEditor } from '../Blocks';
import Preview from '../Preview'
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Popup from '../../components/Popup';

export default function Editor() {
    let { id } = useParams()
    const [project, setProject] = useState()
    const [assets, setAssets] = useState([])
    const [assetsToUpload, setAssetsToUpload] = useState([])

    // Get project
    useEffect(() => {
        const unsubscribe = getDoc(doc(db, "projects", id)).then((data) => {
            setProject(data.data())
        })
        return unsubscribe
    }, [id])
    // Get assets
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
            const assets = assetsToUpload
            setAssetsToUpload([])
            assets.forEach(asset => {
                uploadBytes(ref(storage, id + '/' + asset.name), asset).then(() => {
                    getDownloadURL(ref(storage, id + '/' + asset.name)).then((url) => {
                        let object = {
                            name: asset.name,
                            url: url
                        }
                        setAssets((assetsOld) => [...assetsOld, object])
                    })
                })
            })
        }
    }

    return (
        <div>
            <AdminLayout 
                center={<Buttons updateProject={ updateProject } id={id} />}
                content={<Preview project={ project } />}
                aside={<Aside project={ project } setProject={ setProject } updateProject={ updateProject } assetsToUpload={assetsToUpload} setAssetsToUpload={setAssetsToUpload} assets={assets} setAssets={setAssets} id={id} />}
            />
        </div>
    )
}

function Buttons({ updateProject, id }) {
    return (
        <div className="flex">
            <button onClick={updateProject} className="px-4 h-8 flex items-center bg-indigo-600 rounded-lg rounded-r-none text-xs font-medium text-white hover:bg-indigo-700">
                Save project
            </button>
            <Link 
                to={{ pathname: `/id/${id}` }} 
                key={id} 
                className="px-4 h-8 flex items-center bg-indigo-500 rounded-lg rounded-l-none text-xs font-medium text-white hover:bg-indigo-400"
            >Preview</Link>
        </div>
    )
}

function Aside({ project, setProject, assetsToUpload, setAssetsToUpload, assets }) {
    const [showSettings, setShowSettings] = useState(true)
    const [showBlocks, setShowBlocks] = useState(true)
    const [showAssets, setShowAssets] = useState(true)
    const [showTerminal, setShowTerminal] = useState(false)

    return (
        <div className="p-2 flex flex-col space-y-8 justify-between">
            {/* Settings */}
            <div className="flex flex-col space-y-4">
                <div className="px-2 flex items-center justify-between cursor-pointer" onClick={() => setShowSettings(!showSettings)}>
                    <p className="uppercase text-xs font-semibold">Settings</p>
                    <div>
                        {showSettings &&                         
                        <svg className="w-4 h-4 stroke-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19.9201 15.0499L13.4001 8.52989C12.6301 7.75989 11.3701 7.75989 10.6001 8.52989L4.08008 15.0499" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>}
                        {!showSettings &&                          
                        <svg className="w-4 h-4 stroke-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19.9201 8.94995L13.4001 15.47C12.6301 16.24 11.3701 16.24 10.6001 15.47L4.08008 8.94995" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>}
                    </div>
                </div>
                {showSettings &&
                <SettingsAside project={project} setProject={setProject} assets={assets} />
                }
            </div>
            {/* Blocks */}
            <div className="flex flex-col space-y-4">
                <div className="px-2 flex items-center justify-between cursor-pointer" onClick={() => setShowBlocks(!showBlocks)}>
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
                <BlocksAside project={project} setProject={setProject} />
                }
            </div>
            {/* Assets */}
            <div className="flex flex-col space-y-4">
                <div className="px-2 flex items-center justify-between cursor-pointer" onClick={() => setShowAssets(!showAssets)}>
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
                <AssetsAside assets={assets} assetsToUpload={assetsToUpload} setAssetsToUpload={setAssetsToUpload} />
                }
            </div>
            {/* Terminal */}
            <div className="flex flex-col space-y-4">
                <div className="px-2 flex items-center justify-between cursor-pointer" onClick={() => setShowTerminal(!showTerminal)}>
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
                <TerminalAside project={project} />
                }
            </div>
        </div>
    )
}

function SettingsAside(props) {
    const dateRef = useRef()
    const nameRef = useRef()
    const categoryRef = useRef()

    function updateDetails(event) {
        props.setProject((projectOld) => ({
            ...projectOld,
            date: dateRef.current.value,
            name: nameRef.current.value,
            category: categoryRef.current.value
        }))
    }
    function updatePublished(event) {
        props.setProject((projectOld) => ({
            ...projectOld,
            published: event.target.checked
        }))
    }
    function updateThumbnail(event) {
        props.setProject((projectOld) => ({
            ...projectOld,
            thumbnail: event.target.value
        }))
    }

    return (
        <div>
        {props.project &&
            <div className="bg-white rounded-lg border border-gray-200">
                <div className={`border-b border-gray-200 rounded-t-lg hover:bg-gray-100 transition flex items-center justify-between p-2 ${props.project.published ? 'bg-blue-50 text-blue-600 hover:bg-blue-100' : 'bg-white'}`}>
                    <label htmlFor="published" className="w-full font-medium text-sm">{props.project.published ? 'Public' : 'Not public'}</label>
                    <input className="mr-1" id="published" type="checkbox" defaultChecked={props.project.published} onChange={updatePublished} />
                </div>
                <div className="border-b border-gray-200 hover:bg-gray-100 transition">
                    <input className="w-full p-2 bg-transparent border-none" type="text" defaultValue={props.project.name} placeholder="Name" ref={nameRef} onChange={updateDetails} />
                </div>
                <div className="border-b border-gray-200 hover:bg-gray-100 transition">
                    <input className="w-full p-2 bg-transparent border-none" type="date" defaultValue={props.project.date} ref={dateRef} onChange={updateDetails} />
                </div>
                <div className="border-b border-gray-200 hover:bg-gray-100 transition">
                    <input className="w-full p-2 bg-transparent border-none" type="text" defaultValue={props.project.category} placeholder="Category" ref={categoryRef} onChange={updateDetails} />
                </div>
                <div className="hover:bg-gray-100 transition">
                    <select className="w-full p-2 bg-transparent border-none" onChange={updateThumbnail} value={props.project.thumbnail}>
                        <option value="">Select thumbnail</option>
                    {props.assets.map(asset => (
                        <option key={asset.name} value={asset.url}>
                        {asset.name.length > 20 ? asset.name.substring(0,15) + '(...)' + asset.name.slice(asset.name.length - 4, asset.name.length) : asset.name}
                        </option>
                    ))}
                    </select>
                </div>
            </div>
        }
        </div>     
    )
}

function BlocksAside(props) {
    const [showPopup, setShowPopup] = useState(false)

    function updateBlocks(blocks) {
        props.setProject((projectOld) => ({
            ...projectOld,
            blocks: blocks
        }))
    }
    function addBlock(type) {
        let blocks = props.project.blocks
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
        setShowPopup(false)
    }
    function updateBlock(index, content) {
        let blocks = props.project.blocks
        props.project.blocks[index].content = content
        updateBlocks(blocks)
    }
    function moveBlock(index, direction) {
        let blocks = props.project.blocks
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
        let blocks = props.project.blocks
        blocks.splice(index, 1)
        updateBlocks(blocks)
    }

    function PopupAddBlock() {
        return (
            <div>
                <button onClick={ () => addBlock('paragraph') }>P</button>
                <button onClick={ () => addBlock('heading') }>H</button>
                <div className="flex items-center space-x-2">
                    <button onClick={() => setShowPopup(false)} className="text-sm font-medium text-gray-600 rounded-lg px-8 py-2 bg-gray-200">Cancel</button>
                </div>
            </div>
        )
    }

    return (
        <div>
            <div className="bg-white rounded-lg border border-gray-200">
            {props.project?.blocks.length > 0 && 
                <div>
                    {props.project.blocks.map((block, index) => (
                    <motion.div 
                        layout
                        key={block.id} 
                        className="p-2 border-b border-gray-200 hover:bg-gray-100"
                    >
                        {block.type === 'paragraph' && <ParagraphEditor block={block} index={index} updateBlock={updateBlock} moveBlock={moveBlock} deleteBlock={deleteBlock} />}
                        {block.type === 'heading' && <HeadingEditor block={block} index={index} updateBlock={updateBlock} moveBlock={moveBlock} deleteBlock={deleteBlock} />}
                    </motion.div>
                    ))}
                </div>
            }
            <div onClick={() => setShowPopup(true)} className="p-2 text-black flex items-center space-x-2 hover:bg-gray-100 transition cursor-pointer">
                <div className="p-1.5">
                    <svg className="w-5 h-5 fill-current text-blue-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path opacity="0.4" d="M20.5 10.19H17.61C15.24 10.19 13.31 8.26 13.31 5.89V3C13.31 2.45 12.86 2 12.31 2H8.07C4.99 2 2.5 4 2.5 7.57V16.43C2.5 20 4.99 22 8.07 22H15.93C19.01 22 21.5 20 21.5 16.43V11.19C21.5 10.64 21.05 10.19 20.5 10.19Z" />
                        <path d="M15.7997 2.20999C15.3897 1.79999 14.6797 2.07999 14.6797 2.64999V6.13999C14.6797 7.59999 15.9197 8.80999 17.4297 8.80999C18.3797 8.81999 19.6997 8.81999 20.8297 8.81999C21.3997 8.81999 21.6997 8.14999 21.2997 7.74999C19.8597 6.29999 17.2797 3.68999 15.7997 2.20999Z" />
                        <path d="M11.5295 12.47L9.52945 10.47C9.51945 10.46 9.50945 10.46 9.50945 10.45C9.44945 10.39 9.36945 10.34 9.28945 10.3C9.27945 10.3 9.27945 10.3 9.26945 10.3C9.18945 10.27 9.10945 10.26 9.02945 10.25C8.99945 10.25 8.97945 10.25 8.94945 10.25C8.88945 10.25 8.81945 10.27 8.75945 10.29C8.72945 10.3 8.70945 10.31 8.68945 10.32C8.60945 10.36 8.52945 10.4 8.46945 10.47L6.46945 12.47C6.17945 12.76 6.17945 13.24 6.46945 13.53C6.75945 13.82 7.23945 13.82 7.52945 13.53L8.24945 12.81V17C8.24945 17.41 8.58945 17.75 8.99945 17.75C9.40945 17.75 9.74945 17.41 9.74945 17V12.81L10.4695 13.53C10.6195 13.68 10.8095 13.75 10.9995 13.75C11.1895 13.75 11.3795 13.68 11.5295 13.53C11.8195 13.24 11.8195 12.76 11.5295 12.47Z" />
                    </svg>
                </div>
                <p className="w-full font-medium text-sm">Add blocks</p>
            </div>
            </div>
            {showPopup &&
            <Popup content={<PopupAddBlock />} />
            }
        </div>
    )
}

function AssetsAside(props) {
    function addAssets(event) {
        if (event.target.files[0]) {
            let nameIsAvaliable = true
            props.assetsToUpload.forEach(asset => {
                if (asset.name === event.target.files[0].name) {
                    nameIsAvaliable = false
                }
            })
            if (nameIsAvaliable) {
                props.setAssetsToUpload([...props.assetsToUpload, event.target.files[0]])
            } else {
                console.log("File name is taken")
            }
        } else {
            console.log('canceled')
        }
    }

    return (
        <div>
        <div className="bg-white rounded-lg border border-gray-200">
        {props.assets &&
            <div>
            {props.assets.map((asset) => (
                <div key={asset.name} className="p-2 text-black flex items-center space-x-2 border-b border-gray-200 hover:bg-gray-100 transition">
                    <div className="p-1.5">
                        {asset.name.slice(asset.name.length - 3, asset.name.length) === 'mp4' ?
                        <svg className="w-5 h-5 fill-current text-red-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path opacity="0.4" d="M22 7.81V16.19C22 19.83 19.83 22 16.19 22H7.81C4.17 22 2 19.83 2 16.19V7.81C2 7.3 2.04 6.81 2.13 6.36C2.64 3.61 4.67 2.01 7.77 2H16.23C19.33 2.01 21.36 3.61 21.87 6.36C21.96 6.81 22 7.3 22 7.81Z" />
                            <path d="M22 7.81V7.86H2V7.81C2 7.3 2.04 6.81 2.13 6.36H7.77V2H9.27V6.36H14.73V2H16.23V6.36H21.87C21.96 6.81 22 7.3 22 7.81Z" />
                            <path d="M14.4391 12.7198L12.3591 11.5198C11.5891 11.0798 10.8491 11.0198 10.2691 11.3498C9.68914 11.6798 9.36914 12.3598 9.36914 13.2398V15.6398C9.36914 16.5198 9.68914 17.1998 10.2691 17.5298C10.5191 17.6698 10.7991 17.7398 11.0891 17.7398C11.4891 17.7398 11.9191 17.6098 12.3591 17.3598L14.4391 16.1598C15.2091 15.7198 15.6291 15.0998 15.6291 14.4298C15.6291 13.7598 15.1991 13.1698 14.4391 12.7198Z" />
                        </svg>
                        :                                    
                        <svg className="w-5 h-5 fill-current text-yellow-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path opacity="0.4" d="M22 7.81V13.9L20.37 12.5C19.59 11.83 18.33 11.83 17.55 12.5L13.39 16.07C12.61 16.74 11.35 16.74 10.57 16.07L10.23 15.79C9.52 15.17 8.39 15.11 7.59 15.65L2.67 18.95L2.56 19.03C2.19 18.23 2 17.28 2 16.19V7.81C2 4.17 4.17 2 7.81 2H16.19C19.83 2 22 4.17 22 7.81Z" />
                            <path d="M8.99914 10.3801C10.3136 10.3801 11.3791 9.31456 11.3791 8.00012C11.3791 6.68568 10.3136 5.62012 8.99914 5.62012C7.6847 5.62012 6.61914 6.68568 6.61914 8.00012C6.61914 9.31456 7.6847 10.3801 8.99914 10.3801Z" />
                            <path d="M22.0005 13.9001V16.1901C22.0005 19.8301 19.8305 22.0001 16.1905 22.0001H7.81055C5.26055 22.0001 3.42055 20.9301 2.56055 19.0301L2.67055 18.9501L7.59055 15.6501C8.39055 15.1101 9.52055 15.1701 10.2305 15.7901L10.5705 16.0701C11.3505 16.7401 12.6105 16.7401 13.3905 16.0701L17.5505 12.5001C18.3305 11.8301 19.5905 11.8301 20.3705 12.5001L22.0005 13.9001Z" />
                        </svg>
                        }
                    </div>
                    <a href={asset.url} target="_blank" rel="noreferrer" className="text-sm hover:underline">
                        {asset.name.length > 20 ? asset.name.substring(0,15) + '(...)' + asset.name.slice(asset.name.length - 4, asset.name.length) : asset.name}
                    </a>
                </div>
            ))}
            </div>
        }
        {props.assetsToUpload &&
            <div>
                {props.assetsToUpload.map((asset) => (
                <div key={asset.name} className="p-2 text-black flex items-center space-x-2 border-b border-gray-200 bg-blue-50 hover:bg-blue-100 transition">
                    <div className="p-1.5">
                        <svg className="w-5 h-5 fill-current text-blue-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path opacity="0.4" d="M20.5 10.19H17.61C15.24 10.19 13.31 8.26 13.31 5.89V3C13.31 2.45 12.86 2 12.31 2H8.07C4.99 2 2.5 4 2.5 7.57V16.43C2.5 20 4.99 22 8.07 22H15.93C19.01 22 21.5 20 21.5 16.43V11.19C21.5 10.64 21.05 10.19 20.5 10.19Z" />
                            <path d="M15.7997 2.20999C15.3897 1.79999 14.6797 2.07999 14.6797 2.64999V6.13999C14.6797 7.59999 15.9197 8.80999 17.4297 8.80999C18.3797 8.81999 19.6997 8.81999 20.8297 8.81999C21.3997 8.81999 21.6997 8.14999 21.2997 7.74999C19.8597 6.29999 17.2797 3.68999 15.7997 2.20999Z" />
                            <path d="M11.5295 12.47L9.52945 10.47C9.51945 10.46 9.50945 10.46 9.50945 10.45C9.44945 10.39 9.36945 10.34 9.28945 10.3C9.27945 10.3 9.27945 10.3 9.26945 10.3C9.18945 10.27 9.10945 10.26 9.02945 10.25C8.99945 10.25 8.97945 10.25 8.94945 10.25C8.88945 10.25 8.81945 10.27 8.75945 10.29C8.72945 10.3 8.70945 10.31 8.68945 10.32C8.60945 10.36 8.52945 10.4 8.46945 10.47L6.46945 12.47C6.17945 12.76 6.17945 13.24 6.46945 13.53C6.75945 13.82 7.23945 13.82 7.52945 13.53L8.24945 12.81V17C8.24945 17.41 8.58945 17.75 8.99945 17.75C9.40945 17.75 9.74945 17.41 9.74945 17V12.81L10.4695 13.53C10.6195 13.68 10.8095 13.75 10.9995 13.75C11.1895 13.75 11.3795 13.68 11.5295 13.53C11.8195 13.24 11.8195 12.76 11.5295 12.47Z" />
                        </svg>
                    </div>
                    <p className="text-sm text-blue-600">
                        {asset.name.length > 20 ? asset.name.substring(0,15) + '(...)' + asset.name.slice(asset.name.length - 4, asset.name.length) : asset.name}
                    </p>
                </div>
                ))}
            </div>
        }
            <label htmlFor="addAssets" className="py-2 text-black flex items-center space-x-2 hover:bg-gray-100 transition cursor-pointer">
                <input id="addAssets" type="file" onChange={addAssets} className="w-0 h-0" />
                <div className="p-1.5">
                    <svg className="w-5 h-5 fill-current text-blue-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path opacity="0.4" d="M20.5 10.19H17.61C15.24 10.19 13.31 8.26 13.31 5.89V3C13.31 2.45 12.86 2 12.31 2H8.07C4.99 2 2.5 4 2.5 7.57V16.43C2.5 20 4.99 22 8.07 22H15.93C19.01 22 21.5 20 21.5 16.43V11.19C21.5 10.64 21.05 10.19 20.5 10.19Z" />
                        <path d="M15.7997 2.20999C15.3897 1.79999 14.6797 2.07999 14.6797 2.64999V6.13999C14.6797 7.59999 15.9197 8.80999 17.4297 8.80999C18.3797 8.81999 19.6997 8.81999 20.8297 8.81999C21.3997 8.81999 21.6997 8.14999 21.2997 7.74999C19.8597 6.29999 17.2797 3.68999 15.7997 2.20999Z" />
                        <path d="M11.5295 12.47L9.52945 10.47C9.51945 10.46 9.50945 10.46 9.50945 10.45C9.44945 10.39 9.36945 10.34 9.28945 10.3C9.27945 10.3 9.27945 10.3 9.26945 10.3C9.18945 10.27 9.10945 10.26 9.02945 10.25C8.99945 10.25 8.97945 10.25 8.94945 10.25C8.88945 10.25 8.81945 10.27 8.75945 10.29C8.72945 10.3 8.70945 10.31 8.68945 10.32C8.60945 10.36 8.52945 10.4 8.46945 10.47L6.46945 12.47C6.17945 12.76 6.17945 13.24 6.46945 13.53C6.75945 13.82 7.23945 13.82 7.52945 13.53L8.24945 12.81V17C8.24945 17.41 8.58945 17.75 8.99945 17.75C9.40945 17.75 9.74945 17.41 9.74945 17V12.81L10.4695 13.53C10.6195 13.68 10.8095 13.75 10.9995 13.75C11.1895 13.75 11.3795 13.68 11.5295 13.53C11.8195 13.24 11.8195 12.76 11.5295 12.47Z" />
                    </svg>
                </div>
                <p className="w-full font-medium text-sm">Add assets</p>
            </label>
        </div>
    </div>
    )
}

function TerminalAside(props) {
    return (
        <div className="rounded-lg bg-gray-900 p-2">
            <pre className="text-xs font-mono text-white whitespace-pre-wrap">{ JSON.stringify(props.project, null, 2) }</pre>
        </div>
    )
}