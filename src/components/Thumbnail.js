import React from 'react'
import { Icon } from './Icon'
import { NoPicture } from './SVG'

export const Thumbnail = ({ project }) => {
    return (
        <div className="w-full h-full bg-gray-200 flex justify-center items-center dark:bg-trueGray-800">
            {project.thumbnail ?
            <img className="w-full h-full" src={project.thumbnail} alt="" draggable="false" />
            :
            <Icon>
                <NoPicture tailwind={'text-gray-400'} />
            </Icon>
            }
        </div>
    )
}
