import React, { useRef, useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
// Firebase
import { doc, updateDoc, onSnapshot } from "firebase/firestore"; 
import { ref, uploadBytes, listAll, getDownloadURL, deleteObject } from "firebase/storage";
import { db, storage } from '../firebase'
// Components
import { Layout } from '../layouts/Layout'
import { IconSmall } from '../components/Icons';
import { Close, Folder, Image, Plus, Settings, Space, Text, Tick, Video } from '../components/SVG';
import { Popup } from '../components/Popup';
import { Button, ButtonLarge } from '../components/Buttons';
import { SpaceEditor, TextEditor, sectionsTypes, AssetEditor, TagEditor, LinksEditor } from '../components/Sections';
import { Thumbnail } from '../components/Thumbnail';

export const Editor = () => {
    let { id } = useParams()
    const [project, setProject] = useState({})
    const [assets, setAssets] = useState([])

    // Get project
    useEffect(() => {
        const unsubscribe = onSnapshot(doc(db, "projects", id), (doc) => {
            // console.log(doc.data());
            setProject(doc.data())
        });
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
    
    return (
        <Layout>
            {/* Project details */}
            <div className="w-full max-w-screen-md m-auto px-4 sm:px-8">
                <ProjectDetails id={id} project={project} assets={assets} setProject={setProject} setAssets={setAssets} />
            </div>
            {/* Project sections */}
            <div className="w-full max-w-screen-md m-auto px-4 sm:px-8">
                <ProjectSections id={id} project={project} setProject={setProject} assets={assets} />
            </div>
        </Layout>
    )
}

const ProjectDetails = ({ project, assets, setProject, setAssets, id }) => {
    const [settingsPopupOpen, setSettingsPopupOpen] = useState(false)
    const [assetsPopupOpen, setAssetsPopupOpen] = useState(false)

    return (
        <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-b-2 border-gray-200 dark:bg-gray-800 dark:border-gray-900">
            <div className="flex items-center space-x-4 pl-2">
                {project.public ?
                    <div className="w-2 h-2 rounded-full bg-blue-600 dark:bg-violet-500"></div>
                :
                    <div className="w-2 h-2 rounded-full bg-transparent border border-gray-200 dark:border-gray-900"></div>
                }
                <Link to={`/id/${id}`}>
                    <div className="w-10 h-10 rounded-lg bg-gray-200 dark:bg-gray-900 overflow-hidden">
                        <Thumbnail project={project} />
                    </div>
                </Link>
                <div>
                    <p className="text-xs font-medium opacity-75">{ project.date }</p>
                    <p className="text-sm font-medium">{ project.name }</p>
                </div>
            </div>
            <div className="flex items-center space-x-2 pl-4 pr-2 border-l border-gray-200 dark:border-gray-900">
                <button onClick={() => setSettingsPopupOpen(true)}>
                    <IconSmall>
                        <Settings tailwind={'text-blue-600 dark:text-violet-500'} />
                    </IconSmall>
                </button>
                <button onClick={() => setAssetsPopupOpen(true)}>
                    <IconSmall>
                        <Folder tailwind={'text-blue-600 dark:text-violet-500'} />
                    </IconSmall>
                </button>
            </div>
            {settingsPopupOpen &&
                <Popup setPopupOpen={setSettingsPopupOpen} icon={<Settings tailwind={'text-blue-600 dark:text-violet-500'} />} title={'Project settings'} >
                    <SettingsPopup project={project} assets={assets} setProject={setProject} id={id} />
                </Popup>
            }
            {assetsPopupOpen &&
                <Popup setPopupOpen={setAssetsPopupOpen} icon={<Folder tailwind={'text-blue-600 dark:text-violet-500'} />} title={'Assets manager'} >
                    <AssetsPopup assets={assets} setAssets={setAssets} id={id} />
                </Popup>
            }
        </div>
    )
}

const SettingsPopup = ({ project, assets, setProject, id }) => {
    const initialRender = useRef(true);
    const [canSave, setCanSave] = useState(false)
    const nameRef = useRef()
    const categoryRef = useRef()
    const dateRef = useRef()
    const publicRef = useRef()
    const thumbnailRef = useRef()

    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false;
        } else {
            updateDoc(doc(db, "projects", id), project).then(() => {
                console.log('Updated')
            });
            initialRender.current = true;
        }
    }, [project, id])

    const handleSave = (e) => {
        e.preventDefault()
        let projectNew = {
            name: nameRef.current.value,
            category: categoryRef.current.value,
            date: dateRef.current.value,
            public: publicRef.current.checked,
            thumbnail: thumbnailRef.current.value
        }
        setProject((projectOld) => ({
            ...projectOld,
            ...projectNew
        }))
        setCanSave(false)
    }

    return (
        <form onChange={() => setCanSave(true)} onSubmit={handleSave} className="flex flex-col space-y-8">
            <div className="flex flex-col overflow-hidden">
                <input ref={nameRef} defaultValue={project.name} type="text" placeholder="Name" className="px-4 border-0 border-t border-b border-gray-200 dark:bg-gray-700 dark:border-gray-800" />
                <input ref={categoryRef} defaultValue={project.category} type="text" placeholder="Category" className="px-4 border-0 border-b border-gray-200 dark:bg-gray-700 dark:border-gray-800" />
                <input ref={dateRef} defaultValue={project.date} type="date" placeholder="Category" className="px-4 pr-2 border-0 border-b border-gray-200 dark:bg-gray-700 dark:border-gray-800" />
                <label htmlFor="public" className="px-4 pr-3 py-2 flex items-center justify-between border-0 border-b border-gray-200 dark:bg-gray-700 dark:border-gray-800">
                    <p>Public</p>
                    <input id="public" ref={publicRef} defaultChecked={project.public} type="checkbox" />
                </label>
                <select ref={thumbnailRef} defaultValue={project.thumbnail} className="pl-4 border-0 border-b border-gray-200 dark:bg-gray-700 dark:border-gray-800">
                    <option value="">Select thumbnail</option>
                    {assets.map(asset => (
                        <option key={asset.name} value={asset.url}>
                            {asset.name.length > 20 ? asset.name.substring(0,15) + '(...)' + asset.name.slice(asset.name.length - 4, asset.name.length) : asset.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="px-8 flex flex-col">
                {canSave ?
                    <button type="submit">
                        <ButtonLarge text={'Save'} tailwind={'bg-blue-600 text-white hover:bg-blue-500 dark:bg-violet-500 dark:hover:bg-violet-600'} />
                    </button>
                :
                    <ButtonLarge text={'Save'} tailwind={'bg-gray-100 text-gray-400'} />
                }
            </div>
        </form>
    )
}

const AssetsPopup = ({ assets, setAssets, id }) => {
    const [canSave, setCanSave] = useState(false)
    const [uploaded, setUploaded] = useState([])

    const handleUpload = (e) => {
        if (e.target.files[0]) {
            let nameIsAvaliable = {
                uploads: true,
                assets: true
            }
            uploaded.forEach(upload => {
                if (upload.name === e.target.files[0].name) {
                    nameIsAvaliable.uploads = false
                }
            })
            assets.forEach(asset => {
                if (asset.name === e.target.files[0].name) {
                    nameIsAvaliable.assets = false
                }
            })
            if (nameIsAvaliable.uploads === true && nameIsAvaliable.assets === true) {
                setUploaded([...uploaded, e.target.files[0]])
                setCanSave(true)
            } else {
                console.log("File name is taken")
            }
        } else {
            console.log('Canceled')
        }
    }
    const handleSave = () => {
        uploaded.forEach(asset => {
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
        setUploaded([])
        setCanSave(false)
    }
    const handleDelete = (assetName) => {
        const assetRef = ref(storage, id + '/' + assetName)
        deleteObject(assetRef).then(() => {
            console.log('Deleted asset')
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
        }).catch((error) => {
            console.log('Error')
        });
    }

    return (
        <div className="flex flex-col space-y-8">
            <div className="flex flex-col overflow-hidden">
                {assets.map((asset, index) => (
                    <div key={asset.name} className="px-8 py-2 flex items-center justify-between border-0 border-t last:border-b border-gray-200 dark:bg-gray-700 dark:border-gray-800">
                        <div className="flex items-center space-x-2">
                            {asset.name.slice(asset.name.length - 3, asset.name.length) === 'mp4' ?
                                <IconSmall>
                                    <Video tailwind="text-rose-500" />
                                </IconSmall>
                            :
                                <IconSmall>
                                    <Image tailwind="text-orange-400" />
                                </IconSmall>
                            }
                            <a href={asset.url} target="_blank" rel="noreferrer" className="text-sm hover:underline">
                                {asset.name.length > 20 ? asset.name.substring(0,15) + '(...)' + asset.name.slice(asset.name.length - 4, asset.name.length) : asset.name}
                            </a>
                        </div>
                        <button onClick={() => handleDelete(asset.name)}>
                            <IconSmall>
                                <Close tailwind={'text-rose-600'} />
                            </IconSmall>
                        </button>
                    </div>
                ))}
                {uploaded.map((asset) => (
                    <div key={asset.name} className="px-8 py-2 flex items-center justify-between bg-blue-100 border-0 border-t border-blue-200 dark:bg-gray-700 dark:border-gray-800">
                        <div className="flex items-center space-x-2">
                            {asset.name.slice(asset.name.length - 3, asset.name.length) === 'mp4' ?
                                <IconSmall>
                                    <Video tailwind="text-blue-600" />
                                </IconSmall>
                            :
                                <IconSmall>
                                    <Image tailwind="text-blue-600" />
                                </IconSmall>
                            }
                            <a href={asset.url} target="_blank" rel="noreferrer" className="text-sm text-blue-600 hover:underline">
                                {asset.name.length > 20 ? asset.name.substring(0,15) + '(...)' + asset.name.slice(asset.name.length - 4, asset.name.length) : asset.name}
                            </a>
                        </div>
                    </div>
                ))}
                <label htmlFor="file" className="px-8 py-2 flex items-center justify-between cursor-pointer border-0 border-t border-b border-gray-200 hover:bg-blue-100 dark:bg-gray-700 dark:border-gray-800">
                    <div className="flex items-center space-x-2">
                        <IconSmall tailwind={'bg-blue-50 p-0.5'}>
                            <Plus tailwind="text-blue-600" />
                        </IconSmall>
                        <p>Upload assets</p>
                    </div>
                    <input id="file" type="file" onChange={handleUpload} className="w-0 h-0"/>
                </label>
            </div>
            <div className="px-8 flex flex-col">
                {canSave ?
                    <button onClick={() => handleSave()}>
                        <ButtonLarge text={'Save'} tailwind={'bg-blue-600 text-white hover:bg-blue-500 dark:bg-violet-500 dark:hover:bg-violet-600'} />
                    </button>
                :
                    <ButtonLarge text={'Save'} tailwind={'bg-gray-100 text-gray-400'} />
                }
            </div>
        </div>
    )
}

const ProjectSections = ({ id, project, setProject, assets }) => {
    const [canSave, setCanSave] = useState(false)

    const addSection = (type) => {
        let section = {
            id: Date.now()
        }
        section = {...section, ...sectionsTypes[type]}
        let sections = project.sections
        sections.push(section)
        updateSections(sections)
    }
    const deleteSection = (index) => {
        let sections = project.sections
        sections.splice(index, 1)
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
    const updateSection = (index, section) => {
        let sections = project.sections
        sections[index] = section
        updateSections(sections)
    }
    const updateSections = (sections) => {
        setProject((projectOld) => ({...projectOld, sections: sections}))
        setCanSave(true)
    }
    const saveSections = () => {
        updateDoc(doc(db, "projects", id), project).then(() => {
            console.log('Updated')
        });
        setCanSave(false)
    }

    return (
        <div className="pb-8">
            {/* Sections */}
            {project.sections?.length > 0 &&
                <div className="flex flex-col space-y-8 mb-8">
                    {project.sections?.map((section, index) => (
                        <motion.div key={section.id} className="w-full flex items-center justify-between" layout>
                                {section.type === 'text' && <TextEditor section={section} index={index} updateSection={updateSection} moveSection={moveSection} deleteSection={deleteSection} /> }
                                {section.type === 'space' && <SpaceEditor section={section} index={index} updateSection={updateSection} moveSection={moveSection} deleteSection={deleteSection} /> }
                                {section.type === 'asset' && <AssetEditor section={section} index={index} updateSection={updateSection} moveSection={moveSection} deleteSection={deleteSection} assets={assets} /> }
                                {section.type === 'tag' && <TagEditor section={section} index={index} updateSection={updateSection} moveSection={moveSection} deleteSection={deleteSection} /> }
                                {section.type === 'links' && <LinksEditor section={section} index={index} updateSection={updateSection} moveSection={moveSection} deleteSection={deleteSection} /> }
                        </motion.div>
                    ))}
                </div>
            }
            {/* Settings */}
            <div className="w-full h-8 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <IconSmall tailwind={'p-0.5'}>
                        <Plus tailwind={'text-gray-300'} />
                    </IconSmall>
                    <button onClick={() => addSection('text')}>
                        <IconSmall>
                            <Text tailwind={'text-gray-300 hover:text-gray-500'} />
                        </IconSmall>
                    </button>
                    <button onClick={() => addSection('space')}>
                        <IconSmall>
                            <Space tailwind={'text-gray-300 hover:text-gray-500'} />
                        </IconSmall>
                    </button>
                    <button onClick={() => addSection('asset')}>
                        <IconSmall>
                            <Image tailwind={'text-gray-300 hover:text-gray-500'} />
                        </IconSmall>
                    </button>
                    <button onClick={() => addSection('tag')}>
                        <IconSmall>
                            <Text tailwind={'text-gray-300 hover:text-gray-500'} />
                        </IconSmall>
                    </button>
                    <button onClick={() => addSection('links')}>
                        <IconSmall>
                            <Text tailwind={'text-gray-300 hover:text-gray-500'} />
                        </IconSmall>
                    </button>
                </div>
                {canSave &&
                    <button onClick={() => saveSections()}>
                        <Button 
                            icon={
                                <IconSmall tailwind={'p-1'}>
                                    <Tick tailwind={'text-white'} />
                                </IconSmall>
                            } 
                            text={'Save'} 
                            tailwind={'bg-blue-600 text-white hover:bg-blue-500 dark:bg-gray-800 dark:hover:bg-gray-700'} 
                        />
                    </button>
                }
            </div>
        </div>
    )
}