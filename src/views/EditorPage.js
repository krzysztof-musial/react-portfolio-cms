import React, { useRef, useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { motion } from 'framer-motion'
// Firebase
import { doc, getDoc, updateDoc } from "firebase/firestore"; 
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { db, storage } from '../firebase'
// Components
import { IconExtraSmall, IconSmall } from '../components/Icon'
import { ArrowDown, ArrowUp, Cross, Edit, Picture, Tic } from '../components/SVG'
import { HomeLayout } from '../layouts/HomeLayout'
import Popup from '../components/Popup'

export const EditorPage = () => {
    let { id } = useParams()
    const [showSettings, setShowSettings] = useState()
    const [showAssets, setShowAssets] = useState()
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

    function saveProject() {
        updateDoc(doc(db, "projects", id), project).then(() => {
            console.log('Updated')
        });
        // if (assetsToUpload.length > 0) {
        //     const assets = assetsToUpload
        //     setAssetsToUpload([])
        //     assets.forEach(asset => {
        //         uploadBytes(ref(storage, id + '/' + asset.name), asset).then(() => {
        //             getDownloadURL(ref(storage, id + '/' + asset.name)).then((url) => {
        //                 let object = {
        //                     name: asset.name,
        //                     url: url
        //                 }
        //                 setAssets((assetsOld) => [...assetsOld, object])
        //             })
        //         })
        //     })
        // }
    }
    const updateSections = (sections) => {
        setProject((projectOld) => ({
            ...projectOld,
            sections: sections
        }))
    }
    const addSection = (type) => {
        let sections = project.sections
        let section
        if (type === 'text') {
            section = {
                id: Date.now(),
                type: 'text',
                value: 'Lorem ipsum dolor sit amet...',
                style: {
                    fontFamily: 'serif',
                    fontSize: 'xl',
                    fontWeight: 'semibold'
                }
            }
        }
        sections.push(section)
        updateSections(sections)
    }
    const updateSection = (index, section) => {
        let sections = project.sections
        sections[index] = section
        updateSections(sections)
    }
    const moveSection = (index, direction) => {
        let sections = project.sections
        if (direction === 'up') {
            if (index !== 0) {
                let temp = sections.splice(index, 1)[0];
                sections.splice(index - 1, 0, temp);
            }
        } else if (direction === 'down') {
            if (index !== sections.length - 1) {
                let temp = sections.splice(index, 1)[0];
                sections.splice(index + 1, 0, temp);
            }
        }
        updateSections(sections)
    }
    function deleteSection(index) {
        let sections = project.sections
        sections.splice(index, 1)
        updateSections(sections)
    }
    
    return (
        <div>
            {/* Settings */}
            {showSettings &&
                <Popup setPopupOpen={setShowSettings}>
                    <Settings project={project} setProject={setProject} assets={assets} />
                </Popup>
            }
            {/* Assets */}
            {showAssets &&
                <Popup setPopupOpen={setShowAssets}>
                    <Assets assetsToUpload={assetsToUpload} setAssetsToUpload={setAssetsToUpload} assets={assets} setAssets={setAssets} id={id} />
                </Popup>
            }
            {/* Editor */}
            <HomeLayout>
                {project &&
                    <div className="flex flex-col space-y-8">
                        {/* Menu */}
                        <div className="w-full max-w-screen-md m-auto px-4 sm:px-8 sticky top-1 left-0">
                            <div className="rounded-lg bg-gray-100 p-2 flex items-center justify-between border border-gray-200">
                                <div className="flex items-center space-x-2">
                                    <button onClick={() => setShowSettings(true)}>
                                        <IconSmall>
                                            <Edit />
                                        </IconSmall>
                                    </button>
                                    <p className="font-semibold">{project.name}</p>
                                </div>
                                <div className="flex items-center">
                                    <button onClick={() => setShowAssets(true)}>
                                        <IconSmall>
                                            <Picture />
                                        </IconSmall>
                                    </button>
                                    <button onClick={saveProject}>
                                        <IconSmall>
                                            <Tic />
                                        </IconSmall>
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* Sections */}
                        <div className="flex flex-col items-center space-y-4">
                            {project.sections.map((section, index) => (
                                <motion.div key={section.id} layout className="w-full">
                                    {section.type === 'text' && <Text section={section} index={index} sectionsLength={project.sections.length} updateSection={updateSection} moveSection={moveSection} deleteSection={deleteSection} /> }
                                </motion.div>
                            ))}
                        </div>
                        {/* Temp */}
                        <div className="w-full max-w-screen-md m-auto p-4 sm:p-8 flex flex-col space-y-4">
                            {/* Temporary add sections buttons */}
                            <div>
                                <button onClick={() => addSection('text')}>T</button>
                            </div>
                            {/* Temporary temrinal output */}
                            <div>
                                <div className="rounded-lg bg-gray-900 p-2">
                                    <pre className="text-xs font-mono text-white whitespace-pre-wrap">{ JSON.stringify(project, null, 2) }</pre>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </HomeLayout>
        </div>
    )
}

export const Settings = ({ project, setProject, assets }) => {
    const dateRef = useRef()
    const nameRef = useRef()
    const categoryRef = useRef()

    function updateDetails() {
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
            public: event.target.checked
        }))
    }
    function updateThumbnail(event) {
        setProject((projectOld) => ({
            ...projectOld,
            thumbnail: event.target.value
        }))
    }

    return (
        <div>
        {project &&
            <div className="bg-white rounded-lg border border-gray-200">
                <div className={`border-b border-gray-200 rounded-t-lg hover:bg-gray-100 transition flex items-center justify-between p-2 ${project.public ? 'bg-blue-50 text-blue-600 hover:bg-blue-100' : 'bg-white'}`}>
                    <label htmlFor="public" className="w-full font-medium text-sm">{project.public ? 'Public' : 'Not public'}</label>
                    <input className="mr-1" id="public" type="checkbox" defaultChecked={project.public} onChange={updatePublished} />
                </div>
                <div className="border-b border-gray-200 hover:bg-gray-100 transition">
                    <input className="w-full p-2 bg-transparent border-none" type="text" defaultValue={project.name} placeholder="Name" ref={nameRef} onChange={updateDetails} />
                </div>
                <div className="border-b border-gray-200 hover:bg-gray-100 transition">
                    <input className="w-full p-2 bg-transparent border-none" type="date" defaultValue={project.date} ref={dateRef} onChange={updateDetails} />
                </div>
                <div className="border-b border-gray-200 hover:bg-gray-100 transition">
                    <input className="w-full p-2 bg-transparent border-none" type="text" defaultValue={project.category} placeholder="Category" ref={categoryRef} onChange={updateDetails} />
                </div>
                <div className="hover:bg-gray-100 transition">
                    <select className="w-full p-2 bg-transparent border-none" onChange={updateThumbnail} value={project.thumbnail}>
                        <option value="">Select thumbnail</option>
                    {assets.map(asset => (
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

export const Assets = ({ assets, setAssets, assetsToUpload, setAssetsToUpload, id }) => {

    const saveAssets = () => {
        const assetsToSave = assetsToUpload
        setAssetsToUpload([])
        assetsToSave.forEach(asset => {
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
    function uploadAssets(event) {
        if (event.target.files[0]) {
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
        } else {
            console.log('canceled')
        }
    }

    return (
        <div>
            <div className="bg-white rounded-lg border border-gray-200">
                {assets &&
                    <div>
                    {assets.map((asset) => (
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
                {assetsToUpload &&
                    <div>
                        {assetsToUpload.map((asset) => (
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
                <label htmlFor="uploadAssets" className="py-2 text-black flex items-center space-x-2 hover:bg-gray-100 transition cursor-pointer">
                    <input id="uploadAssets" type="file" onChange={uploadAssets} className="w-0 h-0" />
                    <div className="p-1.5">
                        <svg className="w-5 h-5 fill-current text-blue-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path opacity="0.4" d="M20.5 10.19H17.61C15.24 10.19 13.31 8.26 13.31 5.89V3C13.31 2.45 12.86 2 12.31 2H8.07C4.99 2 2.5 4 2.5 7.57V16.43C2.5 20 4.99 22 8.07 22H15.93C19.01 22 21.5 20 21.5 16.43V11.19C21.5 10.64 21.05 10.19 20.5 10.19Z" />
                            <path d="M15.7997 2.20999C15.3897 1.79999 14.6797 2.07999 14.6797 2.64999V6.13999C14.6797 7.59999 15.9197 8.80999 17.4297 8.80999C18.3797 8.81999 19.6997 8.81999 20.8297 8.81999C21.3997 8.81999 21.6997 8.14999 21.2997 7.74999C19.8597 6.29999 17.2797 3.68999 15.7997 2.20999Z" />
                            <path d="M11.5295 12.47L9.52945 10.47C9.51945 10.46 9.50945 10.46 9.50945 10.45C9.44945 10.39 9.36945 10.34 9.28945 10.3C9.27945 10.3 9.27945 10.3 9.26945 10.3C9.18945 10.27 9.10945 10.26 9.02945 10.25C8.99945 10.25 8.97945 10.25 8.94945 10.25C8.88945 10.25 8.81945 10.27 8.75945 10.29C8.72945 10.3 8.70945 10.31 8.68945 10.32C8.60945 10.36 8.52945 10.4 8.46945 10.47L6.46945 12.47C6.17945 12.76 6.17945 13.24 6.46945 13.53C6.75945 13.82 7.23945 13.82 7.52945 13.53L8.24945 12.81V17C8.24945 17.41 8.58945 17.75 8.99945 17.75C9.40945 17.75 9.74945 17.41 9.74945 17V12.81L10.4695 13.53C10.6195 13.68 10.8095 13.75 10.9995 13.75C11.1895 13.75 11.3795 13.68 11.5295 13.53C11.8195 13.24 11.8195 12.76 11.5295 12.47Z" />
                        </svg>
                    </div>
                    <p className="w-full font-medium text-sm">Upload assets</p>
                </label>
            </div>
            <button onClick={saveAssets}>Save</button>
        </div>
    )
}

// TODO: Sections, move to other file
const Text = ({ section, index, sectionsLength, updateSection, moveSection, deleteSection }) => {
    const value = useRef()

    const update = (e) => {
        e.preventDefault()
        let sectionTemp = {
            ...section,
            value: value.current.value
        }
        updateSection(index, sectionTemp)
    }

    return (
        <div className="w-full max-w-screen-md m-auto px-4 sm:px-8">
            <div className="p-4 rounded bg-gray-50 flex flex-col space-y-4">
                <div className="w-full flex items-center justify-between">
                    <p className="font-semibold text-gray-600 text-sm uppercase">Text</p>
                    <div className="flex items-center space-x-0.5">
                        {index < sectionsLength - 1 &&
                            <button onClick={() => moveSection(index, 'down')}>
                                <IconExtraSmall>
                                    <ArrowDown tailwind={'text-gray-500 hover:text-gray-600'} />
                                </IconExtraSmall>
                            </button>
                        }
                        {index > 0 &&
                            <button onClick={() => moveSection(index, 'up')}>
                                <IconExtraSmall>
                                    <ArrowUp tailwind={'text-gray-500 hover:text-gray-600'} />
                                </IconExtraSmall>
                            </button>
                        }
                        <button onClick={() => deleteSection(index)}>
                            <IconExtraSmall>
                                <Cross tailwind={'text-gray-500 hover:text-gray-600'} />
                            </IconExtraSmall>
                        </button>
                    </div>
                </div>
                <textarea defaultValue={section.value} className="bg-white border-gray-200 rounded-lg w-full" ref={value} onChange={update} style={{ minHeight: '66px' }} />
            </div>
        </div>
    )
}

// const Text = ({section, index, updateSection}) => {
//     const [popupOpen, setPopupOpen] = useState(false)
//     const value = useRef()
//     const fontFamily = useRef()
//     const fontSize = useRef()
//     const fontWeight = useRef()

//     const update = (e) => {
//         e.preventDefault()
//         let sectionTemp = {
//             ...section,
//             value: value.current.value
//         }
//         updateSection(index, sectionTemp)
//     }
//     const updateSelect = (e) => {
//         e.preventDefault()
//         let sectionTemp = {
//             ...section,
//             style: {
//                 fontFamily: fontFamily.current.value,
//                 fontSize: fontSize.current.value,
//                 fontWeight: fontWeight.current.value
//             }
//         }
//         updateSection(index, sectionTemp)
//     }

//     return (
//         <div>
//             {popupOpen &&
//                 <Popup setPopupOpen={setPopupOpen}>
//                     <div className="flex flex-col space-y-2">
//                         <select className="w-full p-2 bg-transparent" onChange={updateSelect} defaultValue={section.style.fontFamily} ref={fontFamily}>
//                             <option value="sans">Sans</option>
//                             <option value="serif">Serif</option>
//                             <option value="mono">Mono</option>
//                         </select>
//                         <select className="w-full p-2 bg-transparent" onChange={updateSelect} defaultValue={section.style.fontSize} ref={fontSize}>
//                             <option value="xs">Extra small</option>
//                             <option value="sm">Small</option>
//                             <option value="base">Medium</option>
//                             <option value="lg">Large</option>
//                             <option value="xl">Extra large</option>
//                             <option value="2xl">2 Extra large</option>
//                             <option value="3xl">3 Extra large</option>
//                             <option value="4xl">4 Extra large</option>
//                             <option value="5xl">5 Extra large</option>
//                             <option value="6xl">6 Extra large</option>
//                             <option value="7xl">7 Extra large</option>
//                             <option value="8xl">8 Extra large</option>
//                             <option value="9xl">9 Extra large</option>
//                         </select>
//                         <select className="w-full p-2 bg-transparent" onChange={updateSelect} defaultValue={section.style.fontWeight} ref={fontWeight}>
//                             <option value="thin">Thin</option>
//                             <option value="extralight">Extra light</option>
//                             <option value="light">Light</option>
//                             <option value="normal">Normal</option>
//                             <option value="medium">Medium</option>
//                             <option value="semibold">Semibold</option>
//                             <option value="bold">Bold</option>
//                             <option value="extrabold">Extra bold</option>
//                             <option value="black">Black</option>
//                         </select>
//                     </div>
//                 </Popup>
//             }
//             <div className="w-full max-w-screen-md m-auto px-4 sm:px-8 flex items-center space-x-2">
//                 <div onClick={() => setPopupOpen(true)}>
//                     <IconSmall>
//                         <FourDots tailwind={'text-gray-400'} />
//                     </IconSmall>
//                 </div>
//                 <input 
//                     type="text" 
//                     defaultValue={section.value} 
//                     ref={value}
//                     className={`w-full border-none p-0 font-${section.style.fontFamily} text-${section.style.fontSize} font-${section.style.fontWeight}`} 
//                     placeholder="Type something..." 
//                     onChange={update}
//                 />
//             </div>
//         </div>
//     )
// }


// const ContentEditable = () => {
//     const [textValue, setTextValue] = useState({__html: ""})

//     const handleOnBlur = (event) => {
//         setTextValue({__html: event.currentTarget.innerHTML})
//     }

//     return (
//         <div className="w-full max-w-screen-md p-4 sm:p-8">
//             <div className="flex space-x-1 px-2 py-1 bg-white shadow border border-gray-100">
//                 <button onClick={() => document.execCommand('bold', false)}>B</button>
//                 <button onClick={() => document.execCommand('justifyCenter', false)}>JustifyCenter</button>
//                 <button onClick={() => document.execCommand('fontName', false, 'Merriweather')}>fontName</button>
//                 <button onClick={() => document.execCommand('fontSize', false, 7)}>fontSize</button>
//                 <button onClick={() => document.execCommand('styleWithCSS', true, true)}>styleWithCSS</button>
//             </div>
//             <div 
//                 contentEditable="true" 
//                 data-placeholder="Test" 
//                 dangerouslySetInnerHTML={textValue} 
//                 onBlur={handleOnBlur} 
//                 style={{outline: 'none'}}
//             ></div>
//             <p>{textValue.__html}</p>
//         </div>
//     )
// }