import React, { useRef } from 'react'
import { useState } from 'react/cjs/react.development'
import { IconExtraSmall, IconSmall } from './Icons'
import { ArrowDown, ArrowUp, Close, Image, Space, Text } from './SVG'

const TextSection = ({ section }) => {
    return (
        <div className={`w-full max-w-screen-${section.style.width} m-auto px-4 sm:px-8`}>
            <p className={`w-full tracking-wide text-${section.style.size} font-${section.style.family} text-${section.style.align} font-${section.style.weight} opacity-${section.style.opacity}`}>
                {section.value}
            </p>
        </div>
    )
}

const TextEditor = ({ section, index, updateSection, moveSection, deleteSection }) => {
    const valueRef = useRef()
    const widthRef = useRef()
    const sizeRef = useRef()
    const familyRef = useRef()
    const alignRef = useRef()
    const weightRef = useRef()
    const opacityRef = useRef()

    const update = () => {
        let sectionNew = {
            ...section,
            value: valueRef.current.value,
            style: {
                width: widthRef.current.value,
                size: sizeRef.current.value,
                family: familyRef.current.value,
                align: alignRef.current.value,
                weight: weightRef.current.value,
                opacity: opacityRef.current.value,
            }
        }
        updateSection(index, sectionNew)
    }

    const Icon = () => {
        return (
            <div className="flex items-center space-x-2">
                <IconExtraSmall>
                    <Text tailwind={'text-white'} />
                </IconExtraSmall>
                <p className="text-white uppercase text-sm font-medium mt-0.5">Text</p>
            </div>
        )
    }

    return (
        <EditorLayout index={index} moveSection={moveSection} deleteSection={deleteSection} icon={<Icon />}>
            <div className="w-full flex flex-col space-y-4">
                <textarea 
                    ref={valueRef} 
                    defaultValue={section.value} 
                    placeholder="Write something here..." 
                    className="rounded-lg border-gray-200 dark:bg-gray-700 dark:border-gray-800 dark:ring-violet-500" 
                    style={{ minHeight: '100px' }} 
                    onChange={update}
                />
                <div className="flex items-center space-x-2">
                    {/* Width */}
                    <select 
                        ref={widthRef} 
                        defaultValue={section.style.width} 
                        className="rounded-lg text-sm border-gray-200 dark:bg-gray-700 dark:border-gray-800 dark:ring-violet-500" 
                        onChange={update}
                    >
                        <option value="sm">Small</option>
                        <option value="md">Medium</option>
                        <option value="lg">Large</option>
                        <option value="xl">Extra Large</option>
                        <option value="2xl">2 Extra Large</option>
                        <option value="screen">Screen</option>
                    </select>
                    {/* Font size */}
                    <select 
                        ref={sizeRef} 
                        defaultValue={section.style.size} 
                        className="rounded-lg text-sm border-gray-200 dark:bg-gray-700 dark:border-gray-800 dark:ring-violet-500" 
                        onChange={update}
                    >
                        <option value="xs">Small</option>
                        <option value="base">Base</option>
                        <option value="2xl">Large</option>
                        <option value="5xl">Extra Large</option>
                    </select>
                    {/* Font family */}
                    <select 
                        ref={familyRef} 
                        defaultValue={section.style.family} 
                        className="rounded-lg text-sm border-gray-200 dark:bg-gray-700 dark:border-gray-800 dark:ring-violet-500" 
                        onChange={update}
                    >
                        <option value="sans">Sans</option>
                        <option value="serif">Serif</option>
                        <option value="mono">Mono</option>
                    </select>
                    {/* Text justify */}
                    <select 
                        ref={alignRef} 
                        defaultValue={section.style.align} 
                        className="rounded-lg text-sm border-gray-200 dark:bg-gray-700 dark:border-gray-800 dark:ring-violet-500" 
                        onChange={update}
                    >
                        <option value="left">Left</option>
                        <option value="center">Center</option>
                        <option value="right">Right</option>
                        <option value="justify">Justify</option>
                    </select>
                    {/* Font weight */}
                    <select 
                        ref={weightRef} 
                        defaultValue={section.style.weight} 
                        className="rounded-lg text-sm border-gray-200 dark:bg-gray-700 dark:border-gray-800 dark:ring-violet-500" 
                        onChange={update}
                    >
                        <option value="light">Light</option>
                        <option value="normal">Normal</option>
                        <option value="semibold">Semibold</option>
                        <option value="bold">Bold</option>
                        <option value="extrabold">Extrabold</option>
                        <option value="black">Black</option>
                    </select>
                    {/* Opacity */}
                    <select 
                        ref={opacityRef} 
                        defaultValue={section.style.opacity} 
                        className="rounded-lg text-sm border-gray-200 dark:bg-gray-700 dark:border-gray-800 dark:ring-violet-500" 
                        onChange={update}
                    >
                        <option value="100">100</option>
                        <option value="75">75</option>
                    </select>
                </div>
            </div>
        </EditorLayout>
    )
}

const SpaceSection = ({section}) => {
    return (
        <div className={`py-${section.size} flex justify-center items-center`}>
            {section.decorator === 'line' &&
                <div className="w-full bg-gray-200" style={{ height: '1px' }}></div>
            }
            {section.decorator === 'wave' &&
                <svg className="fill-current" width="378" height="8" viewBox="0 0 378 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M82.6829 3.30798C80.4535 1.14654 76.6997 1.75492 75.3054 4.45841C73.2833 8.37936 67.9307 9.20368 64.7583 6.12805L61.8495 3.30798C59.6201 1.14654 55.8664 1.75492 54.4721 4.45841C52.45 8.37936 47.0973 9.20368 43.925 6.12805L41.0162 3.30798C38.7868 1.14654 35.033 1.75492 33.6388 4.45841C31.6166 8.37936 26.264 9.20368 23.0916 6.12805L20.1829 3.30798C17.9535 1.14654 14.1997 1.75492 12.8054 4.45841C10.7833 8.37936 5.43066 9.20368 2.2583 6.12805L0.803924 4.71802C0.407402 4.33358 0.397601 3.70049 0.782033 3.30397C1.16647 2.90745 1.79955 2.89765 2.19608 3.28208L3.65046 4.69211C5.87988 6.85356 9.63365 6.24517 11.0279 3.54169C13.05 -0.379265 18.4027 -1.20358 21.575 1.87205L20.879 2.59001L21.575 1.87205L24.4838 4.69211C26.7132 6.85356 30.467 6.24517 31.8612 3.54169C33.8834 -0.379265 39.236 -1.20358 42.4084 1.87205L45.3171 4.69211C47.5465 6.85356 51.3003 6.24517 52.6946 3.54169C54.7167 -0.379265 60.0693 -1.20358 63.2417 1.87205L66.1505 4.69211C68.3799 6.85356 72.1336 6.24517 73.5279 3.54169C75.55 -0.379264 80.9027 -1.20358 84.075 1.87205L86.9838 4.69211C89.2132 6.85356 92.967 6.24517 94.3612 3.54169C96.3834 -0.379265 101.736 -1.20358 104.908 1.87205L107.817 4.69211C110.047 6.85356 113.8 6.24517 115.195 3.54169C117.217 -0.379264 122.569 -1.20358 125.742 1.87205L128.65 4.69211C130.88 6.85356 134.634 6.24517 136.028 3.54169C138.05 -0.379265 143.403 -1.20358 146.575 1.87205L149.484 4.69211C151.713 6.85356 155.467 6.24517 156.861 3.54169C158.883 -0.379267 164.236 -1.20358 167.408 1.87204L170.317 4.69211C172.547 6.85356 176.3 6.24517 177.695 3.54169C179.717 -0.379267 185.069 -1.20358 188.242 1.87204L191.15 4.69211C193.38 6.85356 197.134 6.24517 198.528 3.54169C200.55 -0.379265 205.903 -1.20358 209.075 1.87205L211.984 4.69211C214.213 6.85356 217.967 6.24517 219.361 3.54169C221.383 -0.379264 226.736 -1.20358 229.908 1.87205L232.817 4.69211C235.047 6.85356 238.8 6.24517 240.195 3.54169C242.217 -0.379265 247.569 -1.20358 250.742 1.87205L253.65 4.69211C255.88 6.85356 259.634 6.24517 261.028 3.54169C263.05 -0.379265 268.403 -1.20358 271.575 1.87205L274.484 4.69211C276.713 6.85356 280.467 6.24517 281.861 3.54169C283.883 -0.379265 289.236 -1.20358 292.408 1.87205L295.317 4.69211C297.547 6.85356 301.3 6.24517 302.695 3.54169C304.717 -0.379265 310.069 -1.20358 313.242 1.87205L316.15 4.69211C318.38 6.85356 322.134 6.24517 323.528 3.54169C325.55 -0.379265 330.903 -1.20358 334.075 1.87205L336.984 4.69211C339.213 6.85356 342.967 6.24517 344.361 3.54169C346.383 -0.379266 351.736 -1.20358 354.908 1.87204L357.817 4.69211C360.047 6.85356 363.8 6.24517 365.195 3.54169C367.217 -0.379267 372.569 -1.20358 375.742 1.87204L377.196 3.28208C377.593 3.66651 377.602 4.2996 377.218 4.69612C376.834 5.09265 376.2 5.10245 375.804 4.71801L374.35 3.30798C372.12 1.14653 368.366 1.75493 366.972 4.45841C364.95 8.37936 359.597 9.20368 356.425 6.12805L353.516 3.30798C351.287 1.14653 347.533 1.75493 346.139 4.45841C344.117 8.37936 338.764 9.20368 335.592 6.12805L332.683 3.30798C330.453 1.14654 326.7 1.75492 325.305 4.45841C323.283 8.37936 317.931 9.20368 314.758 6.12805L311.85 3.30798C309.62 1.14654 305.866 1.75492 304.472 4.45841C302.45 8.37936 297.097 9.20368 293.925 6.12805L291.016 3.30798C288.787 1.14654 285.033 1.75492 283.639 4.45841C281.617 8.37936 276.264 9.20368 273.092 6.12805L270.183 3.30798C267.953 1.14654 264.2 1.75492 262.805 4.45841C260.783 8.37936 255.431 9.20368 252.258 6.12805L249.35 3.30798C247.12 1.14654 243.366 1.75492 241.972 4.45841C239.95 8.37936 234.597 9.20368 231.425 6.12805L228.516 3.30798C226.287 1.14654 222.533 1.75492 221.139 4.45841C219.117 8.37936 213.764 9.20368 210.592 6.12805L207.683 3.30798C205.453 1.14654 201.7 1.75492 200.305 4.45841C198.283 8.37936 192.931 9.20368 189.758 6.12805L186.85 3.30798C184.62 1.14653 180.866 1.75493 179.472 4.45841C177.45 8.37936 172.097 9.20368 168.925 6.12805L166.016 3.30798C163.787 1.14653 160.033 1.75493 158.639 4.45841C156.617 8.37936 151.264 9.20368 148.092 6.12805L145.183 3.30798C142.953 1.14654 139.2 1.75492 137.805 4.45841C135.783 8.37936 130.431 9.20368 127.258 6.12805L124.35 3.30798C122.12 1.14654 118.366 1.75492 116.972 4.45841C114.95 8.37936 109.597 9.20368 106.425 6.12805L103.516 3.30798C101.287 1.14654 97.533 1.75492 96.1388 4.45841C94.1166 8.37936 88.764 9.20368 85.5916 6.12805L82.6829 3.30798Z" />
                </svg>

            }
        </div>
    )
}

const SpaceEditor = ({ section, index, updateSection, moveSection, deleteSection }) => {
    const sizeRef = useRef()
    const decoratorRef = useRef()

    const update = () => {
        let sectionNew = {
            ...section,
            size: sizeRef.current.value,
            decorator: decoratorRef.current.value
        }
        updateSection(index, sectionNew)
    }

    const Icon = () => {
        return (
            <div className="flex items-center space-x-2">
                <IconExtraSmall>
                    <Space tailwind={'text-white'} />
                </IconExtraSmall>
                <p className="text-white uppercase text-sm font-medium mt-0.5">Space</p>
            </div>
        )
    }

    return (
        <EditorLayout index={index} moveSection={moveSection} deleteSection={deleteSection} icon={<Icon />}>
            <div className="w-full flex flex-col space-y-2">
                {/* Space size */}
                <select 
                    ref={sizeRef} 
                    defaultValue={section.size} 
                    className="rounded-lg text-sm border-gray-200 dark:bg-gray-700 dark:border-gray-800 dark:ring-violet-500" 
                    onChange={update}
                >
                    <option value="4">p-4</option>
                    <option value="8">p-8</option>
                    <option value="16">p-16</option>
                    <option value="32">p-32</option>
                </select>
                {/* Decorator type */}
                <select 
                    ref={decoratorRef} 
                    defaultValue={section.decorator} 
                    className="rounded-lg text-sm border-gray-200 dark:bg-gray-700 dark:border-gray-800 dark:ring-violet-500" 
                    onChange={update}
                >
                    <option value="none">None</option>
                    <option value="line">Line</option>
                    <option value="wave">Wave</option>
                </select>
            </div>
        </EditorLayout>
    )
}

const AssetSection = ({section}) => {
    return (
        <div className={`w-full max-w-screen-${section.width} m-auto sm:px-8 overflow-hidden`}>
            <div 
                className="w-full h-96 sm:rounded-lg" 
                style={{ 
                    background: 'url(' + section.asset + '), #e6e7ea',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center center'
                }}
            ></div>
        </div>
    )
}

const AssetEditor = ({ section, index, updateSection, moveSection, deleteSection, assets }) => {
    const assetRef = useRef()
    const widthRef = useRef()

    const update = () => {
        let sectionNew = {
            ...section,
            asset: assetRef.current.value,
            width: widthRef.current.value
        }
        updateSection(index, sectionNew)
    }

    const Icon = () => {
        return (
            <div className="flex items-center space-x-2">
                <IconExtraSmall>
                    <Image tailwind={'text-white'} />
                </IconExtraSmall>
                <p className="text-white uppercase text-sm font-medium mt-0.5">Asset</p>
            </div>
        )
    }

    return (
        <EditorLayout index={index} moveSection={moveSection} deleteSection={deleteSection} icon={<Icon />}>
            <div className="w-full flex flex-col space-y-2">
                {/* Asset */}
                <select 
                    ref={assetRef} 
                    value={section.asset} 
                    className="rounded-lg text-sm border-gray-200 dark:bg-gray-700 dark:border-gray-800 dark:ring-violet-500" 
                    onChange={update}
                >
                    <option value="">Select asset</option>
                    {assets.map(asset => (
                        <option key={asset.name} value={asset.url}>
                            {asset.name.length > 20 ? asset.name.substring(0,15) + '(...)' + asset.name.slice(asset.name.length - 4, asset.name.length) : asset.name}
                        </option>
                    ))}
                </select>
                {/* Width */}
                <select 
                    ref={widthRef} 
                    defaultValue={section.width} 
                    className="rounded-lg text-sm border-gray-200 dark:bg-gray-700 dark:border-gray-800 dark:ring-violet-500" 
                    onChange={update}
                >
                    <option value="md">Regular</option>
                    <option value="lg">Large</option>
                    <option value="2xl">Extra Large</option>
                </select>
            </div>
        </EditorLayout>
    )
}

const TagSection = ({section}) => {
    return (
        <div className="w-full flex items-center justify-center py-2">
            <div className="px-2 py-1 rounded-lg border border-gray-900 dark:border-white font-semibold uppercase text-xs">
                {section.value}
            </div>
        </div>
    )
}

const TagEditor = ({ section, index, updateSection, moveSection, deleteSection }) => {
    const valueRef = useRef()

    const update = () => {
        let sectionNew = {
            ...section,
            value: valueRef.current.value,
        }
        updateSection(index, sectionNew)
    }

    const Icon = () => {
        return (
            <div className="flex items-center space-x-2">
                <IconExtraSmall>
                    <Space tailwind={'text-white'} />
                </IconExtraSmall>
                <p className="text-white uppercase text-sm font-medium mt-0.5">Tag</p>
            </div>
        )
    }

    return (
        <EditorLayout index={index} moveSection={moveSection} deleteSection={deleteSection} icon={<Icon />}>
            <div className="w-full flex flex-col space-y-2">
                <input 
                    type="text"
                    ref={valueRef} 
                    defaultValue={section.value} 
                    placeholder="Tag..." 
                    className="rounded-lg border-gray-200 dark:bg-gray-700 dark:border-gray-800 dark:ring-violet-500" 
                    onChange={update}
                />
            </div>
        </EditorLayout>
    )
}

const LinksSection = ({section}) => {
    return (
        <div className="w-full flex items-center justify-center space-x-8 py-8">
            {section.github !== '' &&
                <a href={section.github} target="_blank" rel="noreferrer">
                    <svg className="fill-current" width="82" height="24" viewBox="0 0 82 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.026 2C7.13293 1.99937 2.96182 5.54799 2.1784 10.3779C1.39498 15.2079 4.2306 19.893 8.873 21.439C9.373 21.529 9.552 21.222 9.552 20.958C9.552 20.721 9.544 20.093 9.541 19.258C6.766 19.858 6.18 17.92 6.18 17.92C5.99732 17.317 5.60458 16.7993 5.073 16.461C4.173 15.842 5.142 15.856 5.142 15.856C5.78268 15.9438 6.34655 16.3235 6.669 16.884C6.94194 17.3803 7.40176 17.747 7.94631 17.9026C8.49085 18.0583 9.07502 17.99 9.569 17.713C9.61542 17.207 9.84054 16.7341 10.204 16.379C7.99 16.128 5.662 15.272 5.662 11.449C5.64971 10.4602 6.0169 9.5043 6.688 8.778C6.38435 7.91731 6.42011 6.97325 6.788 6.138C6.788 6.138 7.625 5.869 9.53 7.159C11.1638 6.71101 12.8882 6.71101 14.522 7.159C16.428 5.868 17.264 6.138 17.264 6.138C17.6336 6.97286 17.6694 7.91757 17.364 8.778C18.0376 9.50423 18.4044 10.4626 18.388 11.453C18.388 15.286 16.058 16.128 13.836 16.375C14.3153 16.8651 14.5611 17.5373 14.511 18.221C14.511 19.555 14.499 20.631 14.499 20.958C14.499 21.225 14.677 21.535 15.186 21.437C19.8265 19.8884 22.659 15.203 21.874 10.3743C21.089 5.54565 16.9181 1.99888 12.026 2Z" />
                        <path d="M42.0156 16.0625C41.5938 16.5677 40.9974 16.9609 40.2266 17.2422C39.4557 17.5182 38.6016 17.6562 37.6641 17.6562C36.6797 17.6562 35.8151 17.4427 35.0703 17.0156C34.3307 16.5833 33.7578 15.9583 33.3516 15.1406C32.9505 14.3229 32.7448 13.362 32.7344 12.2578V11.4844C32.7344 10.349 32.9245 9.36719 33.3047 8.53906C33.6901 7.70573 34.2422 7.07031 34.9609 6.63281C35.6849 6.1901 36.5312 5.96875 37.5 5.96875C38.849 5.96875 39.9036 6.29167 40.6641 6.9375C41.4245 7.57812 41.875 8.51302 42.0156 9.74219H39.7344C39.6302 9.09115 39.3984 8.61458 39.0391 8.3125C38.6849 8.01042 38.1953 7.85938 37.5703 7.85938C36.7734 7.85938 36.1667 8.15885 35.75 8.75781C35.3333 9.35677 35.1224 10.2474 35.1172 11.4297V12.1562C35.1172 13.349 35.3438 14.25 35.7969 14.8594C36.25 15.4688 36.9141 15.7734 37.7891 15.7734C38.6693 15.7734 39.2969 15.5859 39.6719 15.2109V13.25H37.5391V11.5234H42.0156V16.0625ZM46.1562 17.5H43.8906V9.04688H46.1562V17.5ZM43.7578 6.85938C43.7578 6.52083 43.8698 6.24219 44.0938 6.02344C44.3229 5.80469 44.6328 5.69531 45.0234 5.69531C45.4089 5.69531 45.7161 5.80469 45.9453 6.02344C46.1745 6.24219 46.2891 6.52083 46.2891 6.85938C46.2891 7.20312 46.1719 7.48438 45.9375 7.70312C45.7083 7.92188 45.4036 8.03125 45.0234 8.03125C44.6432 8.03125 44.3359 7.92188 44.1016 7.70312C43.8724 7.48438 43.7578 7.20312 43.7578 6.85938ZM50.7266 6.96875V9.04688H52.1719V10.7031H50.7266V14.9219C50.7266 15.2344 50.7865 15.4583 50.9062 15.5938C51.026 15.7292 51.2552 15.7969 51.5938 15.7969C51.8438 15.7969 52.0651 15.7786 52.2578 15.7422V17.4531C51.8151 17.5885 51.3594 17.6562 50.8906 17.6562C49.3073 17.6562 48.5 16.8568 48.4688 15.2578V10.7031H47.2344V9.04688H48.4688V6.96875H50.7266ZM62.8359 17.5H60.4922V12.625H55.9219V17.5H53.5781V6.125H55.9219V10.7344H60.4922V6.125H62.8359V17.5ZM69.8047 16.6406C69.2474 17.3177 68.4766 17.6562 67.4922 17.6562C66.5859 17.6562 65.8932 17.3958 65.4141 16.875C64.9401 16.3542 64.6979 15.5911 64.6875 14.5859V9.04688H66.9453V14.5078C66.9453 15.388 67.3464 15.8281 68.1484 15.8281C68.9141 15.8281 69.4401 15.5625 69.7266 15.0312V9.04688H71.9922V17.5H69.8672L69.8047 16.6406ZM81.3125 13.3516C81.3125 14.7057 81.0234 15.763 80.4453 16.5234C79.8672 17.2786 79.0599 17.6562 78.0234 17.6562C77.1068 17.6562 76.375 17.3047 75.8281 16.6016L75.7266 17.5H73.6953V5.5H75.9531V9.80469C76.474 9.19531 77.1589 8.89062 78.0078 8.89062C79.0391 8.89062 79.8464 9.27083 80.4297 10.0312C81.0182 10.7865 81.3125 11.8516 81.3125 13.2266V13.3516ZM79.0547 13.1875C79.0547 12.3333 78.9193 11.7109 78.6484 11.3203C78.3776 10.9245 77.974 10.7266 77.4375 10.7266C76.7188 10.7266 76.224 11.0208 75.9531 11.6094V14.9453C76.2292 15.5391 76.7292 15.8359 77.4531 15.8359C78.1823 15.8359 78.6615 15.4766 78.8906 14.7578C79 14.4141 79.0547 13.8906 79.0547 13.1875Z" />
                    </svg>
                </a>
            }
            {section.demo !== '' &&
                <a href={section.demo} target="_blank" rel="noreferrer">
                    <svg className="fill-current" width="74" height="24" viewBox="0 0 74 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.65 20.91C7.62 20.91 7.58 20.93 7.55 20.93C5.61 19.97 4.03 18.38 3.06 16.44C3.06 16.41 3.08 16.37 3.08 16.34C4.3 16.7 5.56 16.97 6.81 17.18C7.03 18.44 7.29 19.69 7.65 20.91Z" />
                        <path d="M20.94 16.45C19.95 18.44 18.3 20.05 16.29 21.02C16.67 19.75 16.99 18.47 17.2 17.18C18.46 16.97 19.7 16.7 20.92 16.34C20.91 16.38 20.94 16.42 20.94 16.45Z" />
                        <path d="M21.02 7.71C19.76 7.33 18.49 7.02 17.2 6.8C16.99 5.51 16.68 4.23 16.29 2.98C18.36 3.97 20.03 5.64 21.02 7.71Z" />
                        <path d="M7.65 3.09C7.29 4.31 7.03 5.55 6.82 6.81C5.53 7.01 4.25 7.33 2.98 7.71C3.95 5.7 5.56 4.05 7.55 3.06C7.58 3.06 7.62 3.09 7.65 3.09Z" />
                        <path d="M15.49 6.59C13.17 6.33 10.83 6.33 8.51 6.59C8.76 5.22 9.08 3.85 9.53 2.53C9.55 2.45 9.54 2.39 9.55 2.31C10.34 2.12 11.15 2 12 2C12.84 2 13.66 2.12 14.44 2.31C14.45 2.39 14.45 2.45 14.47 2.53C14.92 3.86 15.24 5.22 15.49 6.59Z" />
                        <path d="M6.59 15.49C5.21 15.24 3.85 14.92 2.53 14.47C2.45 14.45 2.39 14.46 2.31 14.45C2.12 13.66 2 12.85 2 12C2 11.16 2.12 10.34 2.31 9.56C2.39 9.55 2.45 9.55 2.53 9.53C3.86 9.09 5.21 8.76 6.59 8.51C6.34 10.83 6.34 13.17 6.59 15.49Z" />
                        <path d="M22 12C22 12.85 21.88 13.66 21.69 14.45C21.61 14.46 21.55 14.45 21.47 14.47C20.14 14.91 18.78 15.24 17.41 15.49C17.67 13.17 17.67 10.83 17.41 8.51C18.78 8.76 20.15 9.08 21.47 9.53C21.55 9.55 21.61 9.56 21.69 9.56C21.88 10.35 22 11.16 22 12Z" />
                        <path d="M15.49 17.41C15.24 18.79 14.92 20.15 14.47 21.47C14.45 21.55 14.45 21.61 14.44 21.69C13.66 21.88 12.84 22 12 22C11.15 22 10.34 21.88 9.55 21.69C9.54 21.61 9.55 21.55 9.53 21.47C9.09 20.14 8.76 18.79 8.51 17.41C9.67 17.54 10.83 17.63 12 17.63C13.17 17.63 14.34 17.54 15.49 17.41Z" />
                        <path d="M15.7633 15.7633C13.2622 16.0789 10.7378 16.0789 8.23667 15.7633C7.92111 13.2622 7.92111 10.7378 8.23667 8.23667C10.7378 7.92111 13.2622 7.92111 15.7633 8.23667C16.0789 10.7378 16.0789 13.2622 15.7633 15.7633Z" />
                        <path d="M33.0156 17.5V6.125H36.5156C37.5156 6.125 38.4089 6.35156 39.1953 6.80469C39.987 7.2526 40.6042 7.89323 41.0469 8.72656C41.4896 9.55469 41.7109 10.4974 41.7109 11.5547V12.0781C41.7109 13.1354 41.4922 14.0755 41.0547 14.8984C40.6224 15.7214 40.0104 16.3594 39.2188 16.8125C38.4271 17.2656 37.5339 17.4948 36.5391 17.5H33.0156ZM35.3594 8.02344V15.6172H36.4922C37.4089 15.6172 38.1094 15.3177 38.5938 14.7188C39.0781 14.1198 39.3255 13.263 39.3359 12.1484V11.5469C39.3359 10.3906 39.0964 9.51562 38.6172 8.92188C38.138 8.32292 37.4375 8.02344 36.5156 8.02344H35.3594ZM47.1641 17.6562C45.9245 17.6562 44.9141 17.276 44.1328 16.5156C43.3568 15.7552 42.9688 14.7422 42.9688 13.4766V13.2578C42.9688 12.4089 43.1328 11.651 43.4609 10.9844C43.7891 10.3125 44.2526 9.79688 44.8516 9.4375C45.4557 9.07292 46.1432 8.89062 46.9141 8.89062C48.0703 8.89062 48.9792 9.25521 49.6406 9.98438C50.3073 10.7135 50.6406 11.7474 50.6406 13.0859V14.0078H45.2578C45.3307 14.5599 45.5495 15.0026 45.9141 15.3359C46.2839 15.6693 46.75 15.8359 47.3125 15.8359C48.1823 15.8359 48.862 15.5208 49.3516 14.8906L50.4609 16.1328C50.1224 16.612 49.6641 16.987 49.0859 17.2578C48.5078 17.5234 47.8672 17.6562 47.1641 17.6562ZM46.9062 10.7188C46.4583 10.7188 46.0938 10.8698 45.8125 11.1719C45.5365 11.474 45.3594 11.9062 45.2812 12.4688H48.4219V12.2891C48.4115 11.7891 48.276 11.4036 48.0156 11.1328C47.7552 10.8568 47.3854 10.7188 46.9062 10.7188ZM54.0469 9.04688L54.1172 9.99219C54.7161 9.25781 55.526 8.89062 56.5469 8.89062C57.6354 8.89062 58.3828 9.32031 58.7891 10.1797C59.3828 9.32031 60.2292 8.89062 61.3281 8.89062C62.2448 8.89062 62.9271 9.15885 63.375 9.69531C63.8229 10.2266 64.0469 11.0286 64.0469 12.1016V17.5H61.7812V12.1094C61.7812 11.6302 61.6875 11.2812 61.5 11.0625C61.3125 10.8385 60.9818 10.7266 60.5078 10.7266C59.8307 10.7266 59.362 11.0495 59.1016 11.6953L59.1094 17.5H56.8516V12.1172C56.8516 11.6276 56.7552 11.2734 56.5625 11.0547C56.3698 10.8359 56.0417 10.7266 55.5781 10.7266C54.9375 10.7266 54.474 10.9922 54.1875 11.5234V17.5H51.9297V9.04688H54.0469ZM65.4375 13.1953C65.4375 12.3568 65.599 11.6094 65.9219 10.9531C66.2448 10.2969 66.7083 9.78906 67.3125 9.42969C67.9219 9.07031 68.6276 8.89062 69.4297 8.89062C70.5703 8.89062 71.5 9.23958 72.2188 9.9375C72.9427 10.6354 73.3464 11.5833 73.4297 12.7812L73.4453 13.3594C73.4453 14.6562 73.0833 15.6979 72.3594 16.4844C71.6354 17.2656 70.6641 17.6562 69.4453 17.6562C68.2266 17.6562 67.2526 17.2656 66.5234 16.4844C65.7995 15.7031 65.4375 14.6406 65.4375 13.2969V13.1953ZM67.6953 13.3594C67.6953 14.1615 67.8464 14.776 68.1484 15.2031C68.4505 15.625 68.8828 15.8359 69.4453 15.8359C69.9922 15.8359 70.4193 15.6276 70.7266 15.2109C71.0339 14.7891 71.1875 14.1172 71.1875 13.1953C71.1875 12.4089 71.0339 11.7995 70.7266 11.3672C70.4193 10.9349 69.987 10.7188 69.4297 10.7188C68.8776 10.7188 68.4505 10.9349 68.1484 11.3672C67.8464 11.7943 67.6953 12.4583 67.6953 13.3594Z" />
                    </svg>
                </a>
            }
            {section.dribbble !== '' &&
                <a href={section.dribbble} target="_blank" rel="noreferrer">
                <svg className="fill-current" width="93" height="24" viewBox="0 0 93 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M15.88 20.92C15.91 21.08 15.82 21.25 15.67 21.31C14.54 21.76 13.3 22 12.02 22C9.80999 22 7.76997 21.29 6.11997 20.07C5.97997 19.97 5.94 19.77 6.03 19.62C6.58 18.64 8.72995 15.49 13.48 13.73C13.66 13.66 13.86 13.75 13.92 13.93C15.11 17.12 15.67 19.82 15.88 20.92Z" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M21.82 13.89C21.36 16.35 19.98 18.49 18.05 19.95C17.84 20.11 17.54 19.99 17.49 19.74C17.28 18.66 16.77 16.33 15.79 13.56C15.72 13.35 15.86 13.12 16.08 13.09C18.57 12.79 20.75 13.27 21.57 13.49C21.74 13.55 21.85 13.72 21.82 13.89Z" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M21.5901 11.82C20.5701 11.64 17.97 11.26 15.31 11.55C15.15 11.57 15.01 11.48 14.94 11.33C14.9 11.24 14.87 11.15 14.83 11.06C14.67 10.69 14.5 10.31 14.33 9.93999C14.24 9.75999 14.33 9.53998 14.51 9.45998C17.31 8.24998 18.87 6.68998 19.48 5.98998C19.63 5.81998 19.8901 5.83 20.0301 6.01C21.1801 7.54 21.89 9.40998 22 11.43C22.01 11.68 21.8101 11.86 21.5901 11.82Z" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M18.44 4.79001C17.92 5.42001 16.46 6.91999 13.69 8.01999C13.53 8.08999 13.34 8.01999 13.25 7.85999C11.97 5.53999 10.61 3.58999 9.98 2.70999C9.83 2.49999 9.95003 2.2 10.2 2.16C10.78 2.06 11.39 2.01001 12.01 2.01001C14.43 2.01001 16.66 2.87 18.39 4.31C18.54 4.42 18.56 4.64001 18.44 4.79001Z" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M11.02 8.84C7.23002 9.79 3.87998 9.92001 2.65998 9.94001C2.42998 9.94001 2.26001 9.72001 2.32001 9.50001C3.04001 6.70001 4.95999 4.36001 7.48999 3.07001C7.63999 2.99001 7.83 3.04 7.93 3.18C8.45 3.9 9.85999 5.93001 11.24 8.32001C11.35 8.52001 11.25 8.78 11.02 8.84Z" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M12.92 11.6C13.01 11.79 12.9 12.02 12.7 12.09C8.27001 13.52 5.62001 17.07 4.82001 18.29C4.69001 18.49 4.41001 18.5 4.26001 18.32C2.86001 16.6 2.01001 14.63 2.01001 12.24V12.06C2.01001 11.86 2.17 11.7 2.37 11.71C3.63 11.76 7.74001 11.59 12.01 10.36C12.17 10.31 12.35 10.39 12.42 10.54C12.59 10.89 12.76 11.24 12.92 11.6Z" />
                    <path d="M33.0156 17.5V6.125H36.5156C37.5156 6.125 38.4089 6.35156 39.1953 6.80469C39.987 7.2526 40.6042 7.89323 41.0469 8.72656C41.4896 9.55469 41.7109 10.4974 41.7109 11.5547V12.0781C41.7109 13.1354 41.4922 14.0755 41.0547 14.8984C40.6224 15.7214 40.0104 16.3594 39.2188 16.8125C38.4271 17.2656 37.5339 17.4948 36.5391 17.5H33.0156ZM35.3594 8.02344V15.6172H36.4922C37.4089 15.6172 38.1094 15.3177 38.5938 14.7188C39.0781 14.1198 39.3255 13.263 39.3359 12.1484V11.5469C39.3359 10.3906 39.0964 9.51562 38.6172 8.92188C38.138 8.32292 37.4375 8.02344 36.5156 8.02344H35.3594ZM48.0234 11.1641C47.7161 11.1224 47.4453 11.1016 47.2109 11.1016C46.3568 11.1016 45.7969 11.3906 45.5312 11.9688V17.5H43.2734V9.04688H45.4062L45.4688 10.0547C45.9219 9.27865 46.5495 8.89062 47.3516 8.89062C47.6016 8.89062 47.8359 8.92448 48.0547 8.99219L48.0234 11.1641ZM51.5 17.5H49.2344V9.04688H51.5V17.5ZM49.1016 6.85938C49.1016 6.52083 49.2135 6.24219 49.4375 6.02344C49.6667 5.80469 49.9766 5.69531 50.3672 5.69531C50.7526 5.69531 51.0599 5.80469 51.2891 6.02344C51.5182 6.24219 51.6328 6.52083 51.6328 6.85938C51.6328 7.20312 51.5156 7.48438 51.2812 7.70312C51.0521 7.92188 50.7474 8.03125 50.3672 8.03125C49.987 8.03125 49.6797 7.92188 49.4453 7.70312C49.2161 7.48438 49.1016 7.20312 49.1016 6.85938ZM60.9844 13.3516C60.9844 14.7057 60.6953 15.763 60.1172 16.5234C59.5391 17.2786 58.7318 17.6562 57.6953 17.6562C56.7786 17.6562 56.0469 17.3047 55.5 16.6016L55.3984 17.5H53.3672V5.5H55.625V9.80469C56.1458 9.19531 56.8307 8.89062 57.6797 8.89062C58.7109 8.89062 59.5182 9.27083 60.1016 10.0312C60.6901 10.7865 60.9844 11.8516 60.9844 13.2266V13.3516ZM58.7266 13.1875C58.7266 12.3333 58.5911 11.7109 58.3203 11.3203C58.0495 10.9245 57.6458 10.7266 57.1094 10.7266C56.3906 10.7266 55.8958 11.0208 55.625 11.6094V14.9453C55.901 15.5391 56.401 15.8359 57.125 15.8359C57.8542 15.8359 58.3333 15.4766 58.5625 14.7578C58.6719 14.4141 58.7266 13.8906 58.7266 13.1875ZM70 13.3516C70 14.7057 69.7109 15.763 69.1328 16.5234C68.5547 17.2786 67.7474 17.6562 66.7109 17.6562C65.7943 17.6562 65.0625 17.3047 64.5156 16.6016L64.4141 17.5H62.3828V5.5H64.6406V9.80469C65.1615 9.19531 65.8464 8.89062 66.6953 8.89062C67.7266 8.89062 68.5339 9.27083 69.1172 10.0312C69.7057 10.7865 70 11.8516 70 13.2266V13.3516ZM67.7422 13.1875C67.7422 12.3333 67.6068 11.7109 67.3359 11.3203C67.0651 10.9245 66.6615 10.7266 66.125 10.7266C65.4062 10.7266 64.9115 11.0208 64.6406 11.6094V14.9453C64.9167 15.5391 65.4167 15.8359 66.1406 15.8359C66.8698 15.8359 67.349 15.4766 67.5781 14.7578C67.6875 14.4141 67.7422 13.8906 67.7422 13.1875ZM79.0156 13.3516C79.0156 14.7057 78.7266 15.763 78.1484 16.5234C77.5703 17.2786 76.763 17.6562 75.7266 17.6562C74.8099 17.6562 74.0781 17.3047 73.5312 16.6016L73.4297 17.5H71.3984V5.5H73.6562V9.80469C74.1771 9.19531 74.862 8.89062 75.7109 8.89062C76.7422 8.89062 77.5495 9.27083 78.1328 10.0312C78.7214 10.7865 79.0156 11.8516 79.0156 13.2266V13.3516ZM76.7578 13.1875C76.7578 12.3333 76.6224 11.7109 76.3516 11.3203C76.0807 10.9245 75.6771 10.7266 75.1406 10.7266C74.4219 10.7266 73.9271 11.0208 73.6562 11.6094V14.9453C73.9323 15.5391 74.4323 15.8359 75.1562 15.8359C75.8854 15.8359 76.3646 15.4766 76.5938 14.7578C76.7031 14.4141 76.7578 13.8906 76.7578 13.1875ZM82.7969 17.5H80.5312V5.5H82.7969V17.5ZM88.5547 17.6562C87.3151 17.6562 86.3047 17.276 85.5234 16.5156C84.7474 15.7552 84.3594 14.7422 84.3594 13.4766V13.2578C84.3594 12.4089 84.5234 11.651 84.8516 10.9844C85.1797 10.3125 85.6432 9.79688 86.2422 9.4375C86.8464 9.07292 87.5339 8.89062 88.3047 8.89062C89.4609 8.89062 90.3698 9.25521 91.0312 9.98438C91.6979 10.7135 92.0312 11.7474 92.0312 13.0859V14.0078H86.6484C86.7214 14.5599 86.9401 15.0026 87.3047 15.3359C87.6745 15.6693 88.1406 15.8359 88.7031 15.8359C89.5729 15.8359 90.2526 15.5208 90.7422 14.8906L91.8516 16.1328C91.513 16.612 91.0547 16.987 90.4766 17.2578C89.8984 17.5234 89.2578 17.6562 88.5547 17.6562ZM88.2969 10.7188C87.849 10.7188 87.4844 10.8698 87.2031 11.1719C86.9271 11.474 86.75 11.9062 86.6719 12.4688H89.8125V12.2891C89.8021 11.7891 89.6667 11.4036 89.4062 11.1328C89.1458 10.8568 88.776 10.7188 88.2969 10.7188Z" />
                </svg>
                </a>
            }
        </div>
    )
}

const LinksEditor = ({ section, index, updateSection, moveSection, deleteSection }) => {
    const githubRef = useRef()
    const demoRef = useRef()
    const dribbbleRef = useRef()

    const update = () => {
        let sectionNew = {
            ...section,
            github: githubRef.current.value,
            demo: demoRef.current.value,
            dribbble: dribbbleRef.current.value,
        }
        updateSection(index, sectionNew)
    }

    const Icon = () => {
        return (
            <div className="flex items-center space-x-2">
                <IconExtraSmall>
                    <Space tailwind={'text-white'} />
                </IconExtraSmall>
                <p className="text-white uppercase text-sm font-medium mt-0.5">Links</p>
            </div>
        )
    }

    return (
        <EditorLayout index={index} moveSection={moveSection} deleteSection={deleteSection} icon={<Icon />}>
            <div className="w-full flex flex-col space-y-2">
                <input 
                    type="text"
                    ref={githubRef} 
                    defaultValue={section.github} 
                    placeholder="GitHub" 
                    className="rounded-lg border-gray-200 dark:bg-gray-700 dark:border-gray-800 dark:ring-violet-500" 
                    onChange={update}
                />
                <input 
                    type="text"
                    ref={demoRef} 
                    defaultValue={section.demo} 
                    placeholder="Demo" 
                    className="rounded-lg border-gray-200 dark:bg-gray-700 dark:border-gray-800 dark:ring-violet-500" 
                    onChange={update}
                />
                <input 
                    type="text"
                    ref={dribbbleRef} 
                    defaultValue={section.dribbble} 
                    placeholder="Dribbble" 
                    className="rounded-lg border-gray-200 dark:bg-gray-700 dark:border-gray-800 dark:ring-violet-500" 
                    onChange={update}
                />
            </div>
        </EditorLayout>
    )
}

// Shared
const EditorLayout = ({ index, moveSection, deleteSection, children, icon }) => {
    const [showEditor, setShowEditor] = useState(true)

    return (
        <div className="w-full rounded-lg bg-gray-100 border border-gray-200 overflow-hidden">
            <div className="bg-blue-600 p-2 flex items-center justify-between">
                <button onClick={() => setShowEditor(!showEditor)}>
                    {icon}
                </button>
                <div className="flex items-center">
                    <button onClick={() => moveSection(index, 'up')}>
                        <IconSmall>
                            <ArrowUp tailwind={'text-white'} />
                        </IconSmall>
                    </button>
                    <button onClick={() => moveSection(index, 'down')}>
                        <IconSmall>
                            <ArrowDown tailwind={'text-white'} />
                        </IconSmall>
                    </button>
                    <button onClick={() => deleteSection(index)} className="pl-1">
                        <IconSmall>
                            <Close tailwind={'text-white'} />
                        </IconSmall>
                    </button>
                </div>
            </div>
            {showEditor &&
                <div className="p-4">
                    {children}
                </div>
            }
        </div>
    )
}

let sectionsTypes = {
    text: {
        type: 'text',
        value: '',
        style: {
            width: "md",
            size: "base",
            family: "sans",
            align: "left",
            weight: 'normal',
            opacity: '100'
        }
    },
    space: {
        type: 'space',
        size: '4',
        decorator: 'none'
    },
    asset: {
        type: 'asset',
        asset: undefined,
        width: "md"
    },
    tag: {
        type: 'tag',
        value: 'Tag...'
    },
    links: {
        type: 'links',
        github: '',
        demo: '',
        dribbble: ''
    }
}

export {
    sectionsTypes,
    TextSection, SpaceSection,
    TextEditor, SpaceEditor,
    AssetSection, AssetEditor,
    TagSection, TagEditor,
    LinksSection, LinksEditor
}