import React, { useRef } from 'react'
import { useState } from 'react/cjs/react.development'
import Popup from './Popup'

function Paragraph({ block }) {
    return (
        <div className="w-full max-w-screen-md m-auto px-4 sm:px-8">
            <p className="font-bold text-3xl mb-4">{block.content.title}</p>
            <p className="opacity-80">{block.content.paragraph}</p>
        </div>
    )
}

function ParagraphEditor(props) {
    const [showPopup, setShowPopup] = useState(false)
    const title = useRef()
    const paragraph = useRef()

    function update(e) {
        e.preventDefault()
        let content = {
            title: title.current.value,
            paragraph: paragraph.current.value
        }
        props.updateBlock(props.index, content)
        setShowPopup(false)
    }

    function Form() {
        return (
            <form onSubmit={update} className="flex flex-col space-y-4 items-center">
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
                <div className="flex items-center space-x-2">
                    <input type="submit" className="text-sm font-medium text-white rounded-lg px-8 py-2 bg-blue-600 cursor-pointer" value="Ok" />
                    <button onClick={() => props.deleteBlock(props.index)} className="text-sm font-medium text-gray-600 rounded-lg px-8 py-2 bg-gray-200">Delete</button>
                </div>
            </form>
        )
    }

    return (
        <div>
            <EditorLayout 
                type={'Paragraph'} 
                index={props.index} 
                moveBlock={props.moveBlock} 
                deleteBlock={props.deleteBlock} 
                setShowPopup={setShowPopup} 
            />
            {showPopup &&
            <Popup content={<Form />} />
            }
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
    const [showPopup, setShowPopup] = useState(false)
    const title = useRef()
    const subtitle = useRef()

    function update(e) {
        e.preventDefault()
        let content = {
            title: title.current.value,
            subtitle: subtitle.current.value
        }
        props.updateBlock(props.index, content)
        setShowPopup(false)
    }

    function Form() {
        return (
            <form onSubmit={update} className="flex flex-col space-y-4 items-center">
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
                <div className="flex items-center space-x-2">
                    <input type="submit" className="text-sm font-medium text-white rounded-lg px-8 py-2 bg-blue-600 cursor-pointer" value="Ok" />
                    <button onClick={() => props.deleteBlock(props.index)} className="text-sm font-medium text-gray-600 rounded-lg px-8 py-2 bg-gray-200">Delete</button>
                </div>
            </form>
        )
    }

    return (
        <div>
            <EditorLayout 
                type={'Heading'} 
                index={props.index} 
                moveBlock={props.moveBlock} 
                deleteBlock={props.deleteBlock} 
                setShowPopup={setShowPopup} 
            />
            {showPopup &&
            <Popup content={<Form />} />
            }
        </div>
    )
}

// Layout
function EditorLayout({ type, index, moveBlock, setShowPopup }) {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
                <div className="p-1.5">
                    <svg className="w-5 h-5 fill-current text-red-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path opacity="0.4" d="M22 7.81V16.19C22 19.83 19.83 22 16.19 22H7.81C4.17 22 2 19.83 2 16.19V7.81C2 7.3 2.04 6.81 2.13 6.36C2.64 3.61 4.67 2.01 7.77 2H16.23C19.33 2.01 21.36 3.61 21.87 6.36C21.96 6.81 22 7.3 22 7.81Z" />
                        <path d="M22 7.81V7.86H2V7.81C2 7.3 2.04 6.81 2.13 6.36H7.77V2H9.27V6.36H14.73V2H16.23V6.36H21.87C21.96 6.81 22 7.3 22 7.81Z" />
                        <path d="M14.4391 12.7198L12.3591 11.5198C11.5891 11.0798 10.8491 11.0198 10.2691 11.3498C9.68914 11.6798 9.36914 12.3598 9.36914 13.2398V15.6398C9.36914 16.5198 9.68914 17.1998 10.2691 17.5298C10.5191 17.6698 10.7991 17.7398 11.0891 17.7398C11.4891 17.7398 11.9191 17.6098 12.3591 17.3598L14.4391 16.1598C15.2091 15.7198 15.6291 15.0998 15.6291 14.4298C15.6291 13.7598 15.1991 13.1698 14.4391 12.7198Z" />
                    </svg>
                </div>
                <p className="text-sm font-semibold cursor-pointer hover:underline" onClick={() => setShowPopup(true)}>{type}</p>
            </div>
            <div className="flex flex-col items-center">
                <button onClick={() => moveBlock(index, 'up')}>
                    <svg className="fill-current text-gray-400 hover:text-gray-900 w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 9.5L7 14.5H17L12 9.5Z" />
                    </svg>
                </button>
                <button onClick={() => moveBlock(index, 'down')}>
                    <svg className="fill-current text-gray-400 hover:text-gray-900 w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 14.5L17 9.5H7L12 14.5Z" />
                    </svg>
                </button>
            </div>
        </div>
    )
}

export { 
    Paragraph, ParagraphEditor,
    Heading, HeadingEditor
}