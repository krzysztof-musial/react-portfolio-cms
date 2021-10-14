import React, { useRef } from 'react'
import { useState } from 'react/cjs/react.development'
import { IconExtraSmall, IconSmall } from './Icons'
import { ArrowDown, ArrowUp, Close, Image, Space, Text } from './SVG'

const TextSection = ({ section }) => {
    return (
        <div className={`w-full max-w-screen-${section.style.width} m-auto px-4 sm:px-8`}>
            <p className={`w-full text-${section.style.size} font-${section.style.family} text-${section.style.align} font-${section.style.weight}`}>
                {section.value}
            </p>
        </div>
    )
}

const TextEditor = ({ section, index, updateSection, moveSection, deleteSection }) => {
    const valueRef = useRef()
    const widthRef = useRef()
    const sizeRef = useRef()
    const familyRef = useRef()
    const alignRef = useRef()
    const weightRef = useRef()

    const update = () => {
        let sectionNew = {
            ...section,
            value: valueRef.current.value,
            style: {
                width: widthRef.current.value,
                size: sizeRef.current.value,
                family: familyRef.current.value,
                align: alignRef.current.value,
                weight: weightRef.current.value
            }
        }
        updateSection(index, sectionNew)
    }

    const Icon = () => {
        return (
            <div className="flex items-center space-x-2">
                <IconExtraSmall>
                    <Text tailwind={'text-white'} />
                </IconExtraSmall>
                <p className="text-white uppercase text-sm font-medium mt-0.5">Text</p>
            </div>
        )
    }

    return (
        <EditorLayout index={index} moveSection={moveSection} deleteSection={deleteSection} icon={<Icon />}>
            <div className="w-full flex flex-col space-y-4">
                <textarea 
                    ref={valueRef} 
                    defaultValue={section.value} 
                    placeholder="Write something here..." 
                    className="rounded-lg border-gray-200 dark:bg-gray-700 dark:border-gray-800 dark:ring-violet-500" 
                    style={{ minHeight: '100px' }} 
                    onChange={update}
                />
                <div className="flex items-center space-x-2">
                    {/* Width */}
                    <select 
                        ref={widthRef} 
                        defaultValue={section.style.width} 
                        className="rounded-lg text-sm border-gray-200 dark:bg-gray-700 dark:border-gray-800 dark:ring-violet-500" 
                        onChange={update}
                    >
                        <option value="sm">Small</option>
                        <option value="md">Medium</option>
                        <option value="lg">Large</option>
                        <option value="xl">Extra Large</option>
                        <option value="2xl">2 Extra Large</option>
                        <option value="screen">Screen</option>
                    </select>
                    {/* Font size */}
                    <select 
                        ref={sizeRef} 
                        defaultValue={section.style.size} 
                        className="rounded-lg text-sm border-gray-200 dark:bg-gray-700 dark:border-gray-800 dark:ring-violet-500" 
                        onChange={update}
                    >
                        <option value="xs">Small</option>
                        <option value="base">Base</option>
                        <option value="3xl">Large</option>
                        <option value="5xl">Extra Large</option>
                    </select>
                    {/* Font family */}
                    <select 
                        ref={familyRef} 
                        defaultValue={section.style.family} 
                        className="rounded-lg text-sm border-gray-200 dark:bg-gray-700 dark:border-gray-800 dark:ring-violet-500" 
                        onChange={update}
                    >
                        <option value="sans">Sans</option>
                        <option value="serif">Serif</option>
                        <option value="mono">Mono</option>
                    </select>
                    {/* Text justify */}
                    <select 
                        ref={alignRef} 
                        defaultValue={section.style.align} 
                        className="rounded-lg text-sm border-gray-200 dark:bg-gray-700 dark:border-gray-800 dark:ring-violet-500" 
                        onChange={update}
                    >
                        <option value="left">Left</option>
                        <option value="center">Center</option>
                        <option value="right">Right</option>
                        <option value="justify">Justify</option>
                    </select>
                    {/* Font weight */}
                    <select 
                        ref={weightRef} 
                        defaultValue={section.style.weight} 
                        className="rounded-lg text-sm border-gray-200 dark:bg-gray-700 dark:border-gray-800 dark:ring-violet-500" 
                        onChange={update}
                    >
                        <option value="light">Light</option>
                        <option value="normal">Normal</option>
                        <option value="semibold">Semibold</option>
                        <option value="bold">Bold</option>
                    </select>
                </div>
            </div>
        </EditorLayout>
    )
}

const SpaceSection = ({section}) => {
    return (
        <div className={`h-${section.size}`}></div>
    )
}

const SpaceEditor = ({ section, index, updateSection, moveSection, deleteSection }) => {
    const sizeRef = useRef()

    const update = () => {
        let sectionNew = {
            ...section,
            size: sizeRef.current.value
        }
        updateSection(index, sectionNew)
    }

    const Icon = () => {
        return (
            <div className="flex items-center space-x-2">
                <IconExtraSmall>
                    <Space tailwind={'text-white'} />
                </IconExtraSmall>
                <p className="text-white uppercase text-sm font-medium mt-0.5">Space</p>
            </div>
        )
    }

    return (
        <EditorLayout index={index} moveSection={moveSection} deleteSection={deleteSection} icon={<Icon />}>
            <div className="w-full flex flex-col space-y-2">
                {/* Space size */}
                <select 
                    ref={sizeRef} 
                    defaultValue={section.size} 
                    className="rounded-lg text-sm border-gray-200 dark:bg-gray-700 dark:border-gray-800 dark:ring-violet-500" 
                    onChange={update}
                >
                    <option value="4">Small</option>
                    <option value="24">Medium</option>
                    <option value="48">Large</option>
                </select>
            </div>
        </EditorLayout>
    )
}

const AssetSection = ({section}) => {
    return (
        <div className={`w-full max-w-screen-${section.width} m-auto px-4 sm:px-8`}>
            <img 
                src={section.asset} 
                alt="Asset" 
                className="w-full rounded-lg"
                draggable="false"
            />
        </div>
    )
}

const AssetEditor = ({ section, index, updateSection, moveSection, deleteSection, assets }) => {
    const assetRef = useRef()
    const widthRef = useRef()

    const update = () => {
        let sectionNew = {
            ...section,
            asset: assetRef.current.value,
            width: widthRef.current.value
        }
        updateSection(index, sectionNew)
    }

    const Icon = () => {
        return (
            <div className="flex items-center space-x-2">
                <IconExtraSmall>
                    <Image tailwind={'text-white'} />
                </IconExtraSmall>
                <p className="text-white uppercase text-sm font-medium mt-0.5">Asset</p>
            </div>
        )
    }

    return (
        <EditorLayout index={index} moveSection={moveSection} deleteSection={deleteSection} icon={<Icon />}>
            <div className="w-full flex flex-col space-y-2">
                {/* Asset */}
                <select 
                    ref={assetRef} 
                    value={section.asset} 
                    className="rounded-lg text-sm border-gray-200 dark:bg-gray-700 dark:border-gray-800 dark:ring-violet-500" 
                    onChange={update}
                >
                    <option value="">Select asset</option>
                    {assets.map(asset => (
                        <option key={asset.name} value={asset.url}>
                            {asset.name.length > 20 ? asset.name.substring(0,15) + '(...)' + asset.name.slice(asset.name.length - 4, asset.name.length) : asset.name}
                        </option>
                    ))}
                </select>
                {/* Width */}
                <select 
                    ref={widthRef} 
                    defaultValue={section.width} 
                    className="rounded-lg text-sm border-gray-200 dark:bg-gray-700 dark:border-gray-800 dark:ring-violet-500" 
                    onChange={update}
                >
                    <option value="md">Regular</option>
                    <option value="lg">Large</option>
                    <option value="2xl">Extra Large</option>
                </select>
            </div>
        </EditorLayout>
    )
}

// Shared
const EditorLayout = ({ index, moveSection, deleteSection, children, icon }) => {
    const [showEditor, setShowEditor] = useState(true)

    return (
        <div className="w-full rounded-lg bg-gray-100 border border-gray-200 overflow-hidden">
            <div className="bg-blue-600 p-2 flex items-center justify-between">
                <button onClick={() => setShowEditor(!showEditor)}>
                    {icon}
                </button>
                <div className="flex items-center">
                    <button onClick={() => moveSection(index, 'up')}>
                        <IconSmall>
                            <ArrowUp tailwind={'text-white'} />
                        </IconSmall>
                    </button>
                    <button onClick={() => moveSection(index, 'down')}>
                        <IconSmall>
                            <ArrowDown tailwind={'text-white'} />
                        </IconSmall>
                    </button>
                    <button onClick={() => deleteSection(index)} className="pl-1">
                        <IconSmall>
                            <Close tailwind={'text-white'} />
                        </IconSmall>
                    </button>
                </div>
            </div>
            {showEditor &&
                <div className="p-4">
                    {children}
                </div>
            }
        </div>
    )
}

let sectionsTypes = {
    text: {
        type: 'text',
        value: '',
        style: {
            width: "md",
            size: "base",
            family: "sans",
            align: "left",
            weight: 'normal'
        }
    },
    space: {
        type: 'space',
        size: '4'
    },
    asset: {
        type: 'asset',
        asset: undefined,
        width: "md"
    }
}

export {
    sectionsTypes,
    TextSection, SpaceSection,
    TextEditor, SpaceEditor,
    AssetSection, AssetEditor
}