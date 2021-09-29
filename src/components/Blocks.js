import React, { useRef } from 'react'
import { useState } from 'react/cjs/react.development'

function Paragraph({ block }) {
    return (
        <div className="w-full max-w-screen-md m-auto px-4 sm:px-8">
            <p className="font-bold text-3xl mb-4">{block.content.title}</p>
            <p className="opacity-80">{block.content.paragraph}</p>
        </div>
    )
}

function ParagraphEditor(props) {
    const [showEditor, setShowEditor] = useState(false)
    const title = useRef()
    const paragraph = useRef()

    function update(e) {
        e.preventDefault()
        let content = {
            title: title.current.value,
            paragraph: paragraph.current.value
        }
        props.updateBlock(props.index, content)
        setShowEditor(false)
    }

    function Form() {
        return (
            <form onSubmit={update} className="flex flex-col space-y-2">
                <input 
                    type="text" 
                    defaultValue={props.block.content.title} 
                    ref={title}
                />
                <textarea 
                    className="w-full rounded-lg" 
                    ref={paragraph} 
                    defaultValue={props.block.content.paragraph}>
                </textarea>
                <input type="submit" value="Apply" />
            </form>
        )
    }

    return (
        <div>
            <EditorLayout 
                index={props.index} 
                moveBlock={props.moveBlock} 
                deleteBlock={props.deleteBlock} 
                setShowEditor={setShowEditor} 
                showEditor={showEditor}
                block={<Paragraph block={props.block} />} 
                form={<Form />}
            />
        </div>
    )
}

function Heading({block}) {
    return (
        <div className="w-full max-w-screen-md m-auto px-4 sm:px-8 flex flex-col space-y-4">
            <p className="text-5xl font-black text-center font-serif">{block.content.title}</p>
            <p className="text-xl text-center opacity-75 font-light">{block.content.subtitle}</p>
        </div>
    )
}

function HeadingEditor(props) {
    const [showEditor, setShowEditor] = useState(false)
    const title = useRef()
    const subtitle = useRef()

    function update(e) {
        e.preventDefault()
        let content = {
            title: title.current.value,
            subtitle: subtitle.current.value
        }
        props.updateBlock(props.index, content)
        setShowEditor(false)
    }

    function Form() {
        return (
            <form onSubmit={update} className="flex flex-col space-y-2">
                <input 
                    type="text" 
                    defaultValue={props.block.content.title} 
                    ref={title}
                />
                <input 
                    type="text" 
                    defaultValue={props.block.content.subtitle} 
                    ref={subtitle}
                />
                <input type="submit" value="Apply" />
            </form>
        )
    }

    return (
        <div>
            <EditorLayout 
                index={props.index} 
                moveBlock={props.moveBlock} 
                deleteBlock={props.deleteBlock} 
                setShowEditor={setShowEditor} 
                showEditor={showEditor}
                block={<Heading block={props.block} />} 
                form={<Form />}
            />
        </div>
    )
}

// Layout
function EditorLayout(props) {
    const [showSettings, setShowSettings] = useState(false)

    return (
        <div>
            <div className="relative" onMouseEnter={() => setShowSettings(true)} onMouseLeave={() => setShowSettings(false)}>
                {/* Block settings */}
                {showSettings &&
                <div className="z-40 w-min absolute -left-4 top-0">
                    <div className="p-2 rounded-lg bg-indigo-600 flex space-x-2">
                        <div className="flex flex-col items-center">
                            <button onClick={() => props.moveBlock(props.index, 'up')}>
                                <svg className="fill-current text-gray-400 hover:text-gray-900 w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 9.5L7 14.5H17L12 9.5Z" />
                                </svg>
                            </button>
                            <button onClick={() => props.setShowEditor(true)} className="font-semibold text-sm text-white">E</button>
                            <button onClick={() => props.moveBlock(props.index, 'down')}>
                                <svg className="fill-current text-gray-400 hover:text-gray-900 w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 14.5L17 9.5H7L12 14.5Z" />
                                </svg>
                            </button>
                        </div>
                        {/* <button onClick={() => props.deleteBlock(props.index)}>
                            <svg className="fill-current text-gray-500 hover:text-gray-900 w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17 22H7C5.89543 22 5 21.1046 5 20V7H3V5H7V4C7 2.89543 7.89543 2 9 2H15C16.1046 2 17 2.89543 17 4V5H21V7H19V20C19 21.1046 18.1046 22 17 22ZM7 7V20H17V7H7ZM9 4V5H15V4H9Z" />
                            </svg>
                        </button> */}
                    </div>
                </div>
                }
                {/* Block */}
                <div>{props.block}</div>
            </div>
            {/* Editor */}
            {props.showEditor && 
                <div className="absolute top-0 left-0 w-full h-screen flex items-center justify-center" style={{ background: 'rgba(0,0,0,.75)', zIndex: 100 }}>
                    <div className="w-full max-w-screen-sm p-4 m-4 rounded-lg bg-white">
                        <button onClick={() => props.setShowEditor(false)}>X</button>
                        {props.form}
                    </div>
                </div>
            }
        </div>
    )
}

export { 
    Paragraph, ParagraphEditor,
    Heading, HeadingEditor
}