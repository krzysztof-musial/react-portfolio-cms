import React, { useRef } from 'react'
import { useState } from 'react/cjs/react.development'

function Paragraph({ block }) {
    return (
        <div>
            <p>{block.content}</p>
        </div>
    )
}

function ParagraphEditor({ block, index, updateBlock, moveBlock, deleteBlock }) {
    const [showEditor, setShowEditor] = useState(false)
    const textareaRef = useRef()

    function update() {
        let content = textareaRef.current.value
        updateBlock(index, content)
    }

    return (
        <div>
            <div className="p-2 w-full bg-white shadow rounded-lg border border-gray-100 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 rounded-lg bg-green-100 w-12 h-12"></div>
                    <div className="flex flex-col">
                        <p onClick={() => setShowEditor(true)} className="font-semibold hover:underline cursor-pointer">Paragraph</p>
                        <p className="text-sm">Paragraph description</p>
                    </div>
                </div>
                <div className="flex flex-col space-y-1 items-center">
                    <button onClick={() => moveBlock(index, 'up')}>
                        <svg className="fill-current text-gray-400 hover:text-gray-900 w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 9.5L7 14.5H17L12 9.5Z" />
                        </svg>
                    </button>
                    <button onClick={() => deleteBlock(index)}>
                        <svg className="fill-current text-gray-500 hover:text-gray-900 w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17 22H7C5.89543 22 5 21.1046 5 20V7H3V5H7V4C7 2.89543 7.89543 2 9 2H15C16.1046 2 17 2.89543 17 4V5H21V7H19V20C19 21.1046 18.1046 22 17 22ZM7 7V20H17V7H7ZM9 4V5H15V4H9Z" />
                        </svg>
                    </button>
                    <button onClick={() => moveBlock(index, 'down')}>
                        <svg className="fill-current text-gray-400 hover:text-gray-900 w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 14.5L17 9.5H7L12 14.5Z" />
                        </svg>
                    </button>
                </div>
            </div>
            {showEditor && 
                <div className="absolute top-0 left-0 w-full h-screen flex items-center justify-center">
                    <div className="w-full max-w-screen-sm p-4 m-4 rounded-lg bg-gray-200">
                        <textarea 
                            className="w-full rounded-lg" 
                            ref={textareaRef} 
                            defaultValue={block.content} 
                            onChange={update}>
                        </textarea>
                        <button onClick={() => setShowEditor(false)}>Apply</button> 
                    </div>
                </div>
            }
        </div>
    )
}

export { Paragraph, ParagraphEditor }