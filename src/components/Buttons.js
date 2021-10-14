import React from 'react'

const Button = ({ icon, text, tailwind }) => {
    return (
        <div className={'h-8 px-1 flex items-center justify-center space-x-1 rounded-lg ' + tailwind}>
            {/* Icon */}
            <div>
                {icon}
            </div>
            {/* Text */}
            <p className="pr-1.5 font-medium text-sm">
                {text}
            </p>
        </div>
    )
}

const ButtonLarge = ({ text, tailwind }) => {
    return (
        <div className={'px-8 py-3 flex items-center justify-center space-x-1 rounded-lg ' + tailwind}>
            {/* Text */}
            <p className="font-medium">
                {text}
            </p>
        </div>
    )
}

export {
    Button,
    ButtonLarge
}