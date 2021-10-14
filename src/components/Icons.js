import React from 'react'

const IconLarge = (props) => {
    return (
        <div className={'w-12 h-12 rounded-lg ' + props.tailwind}>
            {props.children}
        </div>
    )
}

const Icon = (props) => {
    return (
        <div className={'w-8 h-8 rounded-lg ' + props.tailwind}>
            {props.children}
        </div>
    )
}

const IconSmall = (props) => {
    return (
        <div className={'w-6 h-6 rounded-lg ' + props.tailwind}>
            {props.children}
        </div>
    )
}

const IconExtraSmall = (props) => {
    return (
        <div className={'w-4 h-4 rounded-lg ' + props.tailwind}>
            {props.children}
        </div>
    )
}

export { IconLarge, Icon, IconSmall, IconExtraSmall }