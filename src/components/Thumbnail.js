import React from 'react'
import { IconSmall } from './Icons'
import { NoImage } from './SVG'

export const Thumbnail = ({ project }) => {
    return (
        <>
            {project.thumbnail ?
                <div 
                    className="w-full h-full sm:rounded-lg" 
                    style={{ 
                        backgroundImage: 'url(' + project.thumbnail + ')',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center center'
                    }}
                ></div>
            :
                <div className="w-full h-full bg-gray-200 flex items-center justify-center dark:bg-myGray-800">
                    <IconSmall>
                        <NoImage tailwind="text-gray-400 dark:text-myGray-400" />
                    </IconSmall>
                </div>
            }
        </>
    )
}
