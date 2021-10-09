import React from 'react'

const Icon = (props) => {
    return (
        <div className={'w-10 h-10 rounded-lg p-2 transition ' + props.tailwind}>
            {props.children}
        </div>
    )
}

const IconSmall = (props) => {
    return (
        <div className={'w-8 h-8 rounded-md p-1.5 transition ' + props.tailwind }>
            {props.children}
        </div>
    )
}

const IconExtraSmall = (props) => {
    return (
        <div className={'w-6 h-6 rounded-md transition ' + props.tailwind }>
            {props.children}
        </div>
    )
}

export { Icon, IconSmall, IconExtraSmall }