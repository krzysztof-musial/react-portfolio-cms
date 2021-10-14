import React from 'react'

export const Thumbnail = ({ project }) => {
    return (
        <div className="w-full h-full bg-gray-100 dark:bg-gray-800">
            {project.thumbnail ?
                <img className="w-full h-full" src={project.thumbnail} alt="" draggable="false" />
            :
                <div></div>
            }
        </div>
    )
}
