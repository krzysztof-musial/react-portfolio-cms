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
            <form onSubmit={update}>
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

function EditorLayout(props) {
    return (
        <div>
            <div className="w-full flex flex-col">
                {/* Block settings */}
                <div className="px-4 sm:px-8 flex space-x-1 items-center">
                    <button onClick={() => props.moveBlock(props.index, 'up')}>
                        <svg className="fill-current text-gray-400 hover:text-gray-900 w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 9.5L7 14.5H17L12 9.5Z" />
                        </svg>
                    </button>
                    <button onClick={() => props.setShowEditor(true)}>Edit</button>
                    <button onClick={() => props.deleteBlock(props.index)}>
                        <svg className="fill-current text-gray-500 hover:text-gray-900 w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17 22H7C5.89543 22 5 21.1046 5 20V7H3V5H7V4C7 2.89543 7.89543 2 9 2H15C16.1046 2 17 2.89543 17 4V5H21V7H19V20C19 21.1046 18.1046 22 17 22ZM7 7V20H17V7H7ZM9 4V5H15V4H9Z" />
                        </svg>
                    </button>
                    <button onClick={() => props.moveBlock(props.index, 'down')}>
                        <svg className="fill-current text-gray-400 hover:text-gray-900 w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 14.5L17 9.5H7L12 14.5Z" />
                        </svg>
                    </button>
                </div>
                {/* Block */}
                <div>{props.block}</div>
            </div>
            <div>
                {props.showEditor && 
                    <div className="absolute top-0 left-0 w-full h-screen flex items-center justify-center z-10">
                        <div className="w-full max-w-screen-sm p-4 m-4 rounded-lg bg-gray-200">
                            {props.form}
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export { Paragraph, ParagraphEditor }