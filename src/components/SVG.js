import React from 'react'

const Temp = (props) => {
    return (
        <svg className={'fill-current w-full h-full ' + props.tailwind} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 4C0 1.79086 1.79086 0 4 0H28C30.2091 0 32 1.79086 32 4V28C32 30.2091 30.2091 32 28 32H4C1.79086 32 0 30.2091 0 28V4Z" />
        </svg>
    )
}

const Logo = (props) => {
    return (
        <svg className={'fill-current w-full h-full ' + props.tailwind} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.5 7.98989V24.0101C4.5 27.113 8.21614 28.667 10.3895 26.4729L14.2982 22.5269L11.9213 20.1847C9.58034 17.8778 9.58034 14.1222 11.9213 11.8153L14.2982 9.47306L10.3895 5.5271C8.21614 3.33299 4.5 4.88695 4.5 7.98989Z" />
            <path d="M22.8761 18.404L26.5473 22.0218C27.1573 22.6229 27.5 23.4382 27.5 24.2883C27.5 27.1439 23.9964 28.574 21.9473 26.5548L13.6761 18.404C12.3288 17.0763 12.3288 14.9237 13.6761 13.596L21.9473 5.44524C23.9964 3.426 27.5 4.85611 27.5 7.71174C27.5 8.56184 27.1573 9.37713 26.5473 9.97824L22.8761 13.596C21.5288 14.9237 21.5288 17.0763 22.8761 18.404Z" />
        </svg>
    )
}

const Key = (props) => {
    return (
        <svg className={'fill-current w-full h-full ' + props.tailwind} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path opacity="0.4" d="M26.3867 5.62667C22.44 1.69333 16.04 1.69333 12.12 5.62667C9.35999 8.36 8.53333 12.2933 9.59999 15.76L3.33333 22.0267C2.89332 22.48 2.58666 23.3733 2.67999 24.0133L3.07999 26.92C3.22666 27.88 4.11999 28.7867 5.07999 28.92L7.98666 29.32C8.62666 29.4133 9.51999 29.12 9.97333 28.6533L11.0667 27.56C11.3333 27.3067 11.3333 26.88 11.0667 26.6133L8.47999 24.0267C8.09333 23.64 8.09333 23 8.47999 22.6133C8.86666 22.2267 9.50666 22.2267 9.89333 22.6133L12.4933 25.2133C12.7467 25.4667 13.1733 25.4667 13.4267 25.2133L16.2533 22.4C19.7067 23.48 23.64 22.64 26.3867 19.9067C30.32 15.9733 30.32 9.56 26.3867 5.62667ZM19.3333 16C17.4933 16 16 14.5067 16 12.6667C16 10.8267 17.4933 9.33333 19.3333 9.33333C21.1733 9.33333 22.6667 10.8267 22.6667 12.6667C22.6667 14.5067 21.1733 16 19.3333 16Z" />
            <path d="M19.3333 16C21.1743 16 22.6667 14.5076 22.6667 12.6666C22.6667 10.8257 21.1743 9.33331 19.3333 9.33331C17.4924 9.33331 16 10.8257 16 12.6666C16 14.5076 17.4924 16 19.3333 16Z" />
        </svg>
    )
}

const Message = (props) => {
    return (
        <svg className={'fill-current w-full h-full ' + props.tailwind} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path opacity="0.4" d="M23.9734 14.3867V19.72C23.9734 20.0667 23.96 20.4 23.92 20.72C23.6133 24.32 21.4933 26.1067 17.5867 26.1067H17.0533C16.72 26.1067 16.4 26.2667 16.2 26.5333L14.6 28.6667C13.8934 29.6133 12.7467 29.6133 12.04 28.6667L10.44 26.5333C10.2667 26.3067 9.88001 26.1067 9.58667 26.1067H9.05335C4.80002 26.1067 2.66667 25.0533 2.66667 19.72V14.3867C2.66667 10.48 4.46668 8.36001 8.05335 8.05334C8.37335 8.01334 8.70668 8 9.05335 8H17.5867C21.84 8 23.9734 10.1333 23.9734 14.3867Z" />
            <path d="M13.32 18.6667C12.5733 18.6667 11.9866 18.0667 11.9866 17.3333C11.9866 16.6 12.5866 16 13.32 16C14.0533 16 14.6533 16.6 14.6533 17.3333C14.6533 18.0667 14.0666 18.6667 13.32 18.6667Z" />
            <path d="M17.9867 18.6667C17.24 18.6667 16.6533 18.0667 16.6533 17.3333C16.6533 16.6 17.2533 16 17.9867 16C18.72 16 19.32 16.6 19.32 17.3333C19.32 18.0667 18.72 18.6667 17.9867 18.6667Z" />
            <path d="M8.66666 18.6667C7.91999 18.6667 7.33333 18.0667 7.33333 17.3333C7.33333 16.6 7.93333 16 8.66666 16C9.4 16 9.99999 16.6 9.99999 17.3333C9.99999 18.0667 9.4 18.6667 8.66666 18.6667Z" />
            <path d="M29.3067 9.05333V14.3867C29.3067 18.3067 27.5067 20.4133 23.92 20.72C23.96 20.4 23.9733 20.0667 23.9733 19.72V14.3867C23.9733 10.1333 21.84 7.99999 17.5867 7.99999H9.05333C8.70666 7.99999 8.37333 8.01333 8.05333 8.05333C8.36 4.46667 10.48 2.66666 14.3867 2.66666H22.92C27.1733 2.66666 29.3067 4.8 29.3067 9.05333Z" />
        </svg>
    )
}

const Shield = (props) => {
    return (
        <svg className={'fill-current w-full h-full ' + props.tailwind} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path opacity="0.4" d="M24.44 7.55999L8.78664 23.2133C8.19998 23.8 7.2133 23.72 6.7333 23.0266C5.07996 20.6133 4.10663 17.76 4.10663 14.8266V8.97332C4.10663 7.87998 4.9333 6.63999 5.94664 6.22665L13.3733 3.18666C15.0533 2.49332 16.92 2.49332 18.6 3.18666L23.9866 5.38665C24.88 5.74665 25.1066 6.89332 24.44 7.55999Z" />
            <path d="M25.6933 9.38667C26.56 8.65333 27.88 9.27999 27.88 10.4133V14.8266C27.88 21.3466 23.1467 27.4533 16.68 29.24C16.24 29.36 15.76 29.36 15.3067 29.24C13.4134 28.7066 11.6533 27.8133 10.1467 26.64C9.50665 26.1467 9.44001 25.2133 10 24.64C12.9067 21.6667 21.4133 13 25.6933 9.38667Z" />
        </svg>
    )
}

const Settings = (props) => {
    return (
        <svg className={'fill-current w-full h-full ' + props.tailwind} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path opacity="0.4" d="M2.66666 17.1734V14.8267C2.66666 13.4401 3.79999 12.2934 5.19999 12.2934C7.61332 12.2934 8.59999 10.5867 7.38666 8.49339C6.69332 7.29339 7.10666 5.73339 8.31999 5.04006L10.6267 3.72006C11.68 3.09339 13.04 3.46672 13.6667 4.52006L13.8133 4.77339C15.0133 6.86672 16.9867 6.86672 18.2 4.77339L18.3467 4.52006C18.9733 3.46672 20.3333 3.09339 21.3867 3.72006L23.6933 5.04006C24.9067 5.73339 25.32 7.29339 24.6267 8.49339C23.4133 10.5867 24.4 12.2934 26.8133 12.2934C28.2 12.2934 29.3467 13.4267 29.3467 14.8267V17.1734C29.3467 18.5601 28.2133 19.7067 26.8133 19.7067C24.4 19.7067 23.4133 21.4134 24.6267 23.5067C25.32 24.7201 24.9067 26.2667 23.6933 26.9601L21.3867 28.2801C20.3333 28.9067 18.9733 28.5334 18.3467 27.4801L18.2 27.2267C17 25.1334 15.0267 25.1334 13.8133 27.2267L13.6667 27.4801C13.04 28.5334 11.68 28.9067 10.6267 28.2801L8.31999 26.9601C7.10666 26.2667 6.69332 24.7067 7.38666 23.5067C8.59999 21.4134 7.61332 19.7067 5.19999 19.7067C3.79999 19.7067 2.66666 18.5601 2.66666 17.1734Z" />
            <path d="M16 20.3333C18.3932 20.3333 20.3333 18.3932 20.3333 16C20.3333 13.6068 18.3932 11.6667 16 11.6667C13.6068 11.6667 11.6667 13.6068 11.6667 16C11.6667 18.3932 13.6068 20.3333 16 20.3333Z" />
        </svg>
    )
}

const Folder = (props) => {
    return (
        <svg className={'fill-current w-full h-full ' + props.tailwind} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M29.3333 14.7599V22.1999C29.3333 26.1333 26.1333 29.3333 22.2 29.3333H9.79999C5.86666 29.3333 2.66666 26.1333 2.66666 22.1999V12.5866H28.9867C29.1867 13.1866 29.2933 13.7999 29.32 14.4533C29.3333 14.5466 29.3333 14.6666 29.3333 14.7599Z" />
            <path opacity="0.4" d="M28.9867 12.5867H2.66666V8.55999C2.66666 5.30666 5.30666 2.66666 8.55999 2.66666H11.6667C13.84 2.66666 14.52 3.37332 15.3867 4.53332L17.2533 7.01332C17.6667 7.55999 17.72 7.63999 18.4933 7.63999H22.2133C25.3733 7.62666 28.0667 9.70666 28.9867 12.5867Z" />
        </svg>
    )
}

const Image = (props) => {
    return (
        <svg className={'fill-current w-full h-full ' + props.tailwind} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path opacity="0.4" d="M29.3333 10.4133V18.5333L27.16 16.6667C26.12 15.7733 24.44 15.7733 23.4 16.6667L17.8533 21.4267C16.8133 22.32 15.1333 22.32 14.0933 21.4267L13.64 21.0533C12.6933 20.2267 11.1867 20.1467 10.12 20.8667L3.55999 25.2667L3.41332 25.3733C2.91999 24.3067 2.66666 23.04 2.66666 21.5867V10.4133C2.66666 5.55999 5.55999 2.66666 10.4133 2.66666H21.5867C26.44 2.66666 29.3333 5.55999 29.3333 10.4133Z" />
            <path d="M12 13.84C13.7526 13.84 15.1733 12.4192 15.1733 10.6667C15.1733 8.91407 13.7526 7.49332 12 7.49332C10.2474 7.49332 8.82666 8.91407 8.82666 10.6667C8.82666 12.4192 10.2474 13.84 12 13.84Z" />
            <path d="M29.3333 18.5333V21.5867C29.3333 26.44 26.44 29.3333 21.5867 29.3333H10.4133C7.01333 29.3333 4.56 27.9067 3.41333 25.3733L3.56 25.2667L10.12 20.8667C11.1867 20.1467 12.6933 20.2267 13.64 21.0533L14.0933 21.4267C15.1333 22.32 16.8133 22.32 17.8533 21.4267L23.4 16.6667C24.44 15.7733 26.12 15.7733 27.16 16.6667L29.3333 18.5333Z" />
        </svg>
    )
}

const Video = (props) => {
    return (
        <svg className={'fill-current w-full h-full ' + props.tailwind} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path opacity="0.4" d="M29.3334 10.4133V21.5867C29.3334 26.44 26.44 29.3333 21.5867 29.3333H10.4134C5.56002 29.3333 2.66669 26.44 2.66669 21.5867V10.4133C2.66669 9.73332 2.72002 9.07999 2.84002 8.47999C3.52002 4.81332 6.22669 2.67999 10.36 2.66666H21.64C25.7734 2.67999 28.48 4.81332 29.16 8.47999C29.28 9.07999 29.3334 9.73332 29.3334 10.4133Z" />
            <path d="M29.3334 10.4133V10.48H2.66669V10.4133C2.66669 9.73332 2.72002 9.07999 2.84002 8.47999H10.36V2.66666H12.36V8.47999H19.64V2.66666H21.64V8.47999H29.16C29.28 9.07999 29.3334 9.73332 29.3334 10.4133Z" />
            <path d="M19.2533 16.96L16.48 15.36C15.4533 14.7733 14.4667 14.6933 13.6933 15.1333C12.92 15.5733 12.4933 16.48 12.4933 17.6533V20.8533C12.4933 22.0266 12.92 22.9333 13.6933 23.3733C14.0267 23.56 14.4 23.6533 14.7867 23.6533C15.32 23.6533 15.8933 23.48 16.48 23.1466L19.2533 21.5466C20.28 20.96 20.84 20.1333 20.84 19.24C20.84 18.3466 20.2667 17.56 19.2533 16.96Z" />
        </svg>
    )
}

const Close = (props) => {
    return (
        <svg className={'fill-current w-full h-full ' + props.tailwind} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path opacity="0.4" d="M16 29.3333C23.3638 29.3333 29.3334 23.3638 29.3334 16C29.3334 8.63619 23.3638 2.66666 16 2.66666C8.63622 2.66666 2.66669 8.63619 2.66669 16C2.66669 23.3638 8.63622 29.3333 16 29.3333Z" />
            <path d="M17.4133 16L20.48 12.9333C20.8666 12.5466 20.8666 11.9066 20.48 11.52C20.0933 11.1333 19.4533 11.1333 19.0666 11.52L16 14.5866L12.9333 11.52C12.5466 11.1333 11.9066 11.1333 11.52 11.52C11.1333 11.9066 11.1333 12.5466 11.52 12.9333L14.5866 16L11.52 19.0666C11.1333 19.4533 11.1333 20.0933 11.52 20.48C11.72 20.68 11.9733 20.7733 12.2266 20.7733C12.48 20.7733 12.7333 20.68 12.9333 20.48L16 17.4133L19.0666 20.48C19.2666 20.68 19.52 20.7733 19.7733 20.7733C20.0266 20.7733 20.28 20.68 20.48 20.48C20.8666 20.0933 20.8666 19.4533 20.48 19.0666L17.4133 16Z" />
        </svg>
    )
}

const Plus = (props) => {
    return (
        <svg className={'fill-current w-full h-full ' + props.tailwind} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M24 17H8C7.45333 17 7 16.5467 7 16C7 15.4533 7.45333 15 8 15H24C24.5467 15 25 15.4533 25 16C25 16.5467 24.5467 17 24 17Z" />
            <path d="M16 25C15.4533 25 15 24.5467 15 24V8C15 7.45333 15.4533 7 16 7C16.5467 7 17 7.45333 17 8V24C17 24.5467 16.5467 25 16 25Z" />
        </svg>
    )
}

const Text = (props) => {
    return (
        <svg className={'fill-current w-full h-full ' + props.tailwind} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M30.32 3.408C29.856 2.736 29.264 2.144 28.592 1.68C27.072 0.576 25.088 0 22.704 0H9.296C8.976 0 8.656 0.016 8.352 0.048C3.104 0.384 0 3.792 0 9.296V22.704C0 25.088 0.576 27.072 1.68 28.592C2.144 29.264 2.736 29.856 3.408 30.32C4.72 31.28 6.384 31.84 8.352 31.968C8.656 31.984 8.976 32 9.296 32H22.704C28.528 32 32 28.528 32 22.704V9.296C32 6.912 31.424 4.928 30.32 3.408ZM26.8 11.04C26.8 11.696 26.256 12.24 25.6 12.24C24.944 12.24 24.4 11.696 24.4 11.04V9.152C24.4 8.64 23.984 8.224 23.472 8.224H17.2V23.776H20.048C20.704 23.776 21.248 24.32 21.248 24.976C21.248 25.632 20.704 26.176 20.048 26.176H11.952C11.296 26.176 10.752 25.632 10.752 24.976C10.752 24.32 11.296 23.776 11.952 23.776H14.8V8.224H8.528C8.016 8.224 7.6 8.64 7.6 9.152V11.04C7.6 11.696 7.056 12.24 6.4 12.24C5.744 12.24 5.2 11.696 5.2 11.04V9.152C5.2 7.312 6.688 5.824 8.528 5.824H23.456C25.296 5.824 26.784 7.312 26.784 9.152V11.04H26.8Z" />
        </svg>
    )
}

const ArrowUp = (props) => {
    return (
        <svg className={'fill-current w-full h-full ' + props.tailwind} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path opacity="0.4" d="M21.5867 2.66666H10.4134C5.56002 2.66666 2.66669 5.55999 2.66669 10.4133V21.5733C2.66669 26.44 5.56002 29.3333 10.4134 29.3333H21.5734C26.4267 29.3333 29.32 26.44 29.32 21.5867V10.4133C29.3334 5.55999 26.44 2.66666 21.5867 2.66666Z" />
            <path d="M20.7066 18.9467C20.4533 18.9467 20.2 18.8533 20 18.6533L16 14.6533L12 18.6533C11.6133 19.04 10.9733 19.04 10.5866 18.6533C10.2 18.2667 10.2 17.6267 10.5866 17.24L15.2933 12.5333C15.68 12.1466 16.32 12.1466 16.7066 12.5333L21.4133 17.24C21.8 17.6267 21.8 18.2667 21.4133 18.6533C21.2133 18.8533 20.96 18.9467 20.7066 18.9467Z" />
        </svg>
    )
}

const ArrowDown = (props) => {
    return (
        <svg className={'fill-current w-full h-full ' + props.tailwind} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path opacity="0.4" d="M21.5867 2.66666H10.4134C5.56002 2.66666 2.66669 5.55999 2.66669 10.4133V21.5733C2.66669 26.44 5.56002 29.3333 10.4134 29.3333H21.5734C26.4267 29.3333 29.32 26.44 29.32 21.5867V10.4133C29.3334 5.55999 26.44 2.66666 21.5867 2.66666Z" />
            <path d="M16 19.88C15.7466 19.88 15.4933 19.7867 15.2933 19.5867L10.5866 14.88C10.2 14.4933 10.2 13.8533 10.5866 13.4667C10.9733 13.08 11.6133 13.08 12 13.4667L16 17.4667L20 13.4667C20.3866 13.08 21.0266 13.08 21.4133 13.4667C21.8 13.8533 21.8 14.4933 21.4133 14.88L16.7066 19.5867C16.5066 19.7867 16.2533 19.88 16 19.88Z" />
        </svg>
    )
}

const Tick = (props) => {
    return (
        <svg className={'fill-current w-full h-full ' + props.tailwind} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.7153 0H9.30063C3.47373 0 0 3.472 0 9.296V22.688C0 28.528 3.47373 32 9.30063 32H22.6993C28.5262 32 31.9999 28.528 31.9999 22.704V9.296C32.016 3.472 28.5422 0 22.7153 0ZM23.6598 12.32L14.5833 21.392C14.3592 21.616 14.055 21.744 13.7348 21.744C13.4147 21.744 13.1105 21.616 12.8864 21.392L8.35616 16.864C7.89193 16.4 7.89193 15.632 8.35616 15.168C8.82039 14.704 9.58878 14.704 10.053 15.168L13.7348 18.848L21.9629 10.624C22.4272 10.16 23.1956 10.16 23.6598 10.624C24.124 11.088 24.124 11.84 23.6598 12.32Z" />
        </svg>
    )
}

const Dashboard = (props) => {
    return (
        <svg className={'fill-current w-full h-full ' + props.tailwind} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.65335 2.66666H7.12002C4.20002 2.66666 2.66669 4.19999 2.66669 7.10666V9.63999C2.66669 12.5467 4.20002 14.08 7.10669 14.08H9.64002C12.5467 14.08 14.08 12.5467 14.08 9.63999V7.10666C14.0934 4.19999 12.56 2.66666 9.65335 2.66666Z" />
            <path d="M24.8934 17.9066H22.36C19.4534 17.9066 17.92 19.44 17.92 22.3466V24.88C17.92 27.7866 19.4534 29.32 22.36 29.32H24.8934C27.8 29.32 29.3334 27.7866 29.3334 24.88V22.3466C29.3334 19.44 27.8 17.9066 24.8934 17.9066Z" />
            <g opacity="0.4">
            <path d="M24.8934 2.66666H22.36C19.4534 2.66666 17.92 4.19999 17.92 7.10666V9.63999C17.92 12.5467 19.4534 14.08 22.36 14.08H24.8934C27.8 14.08 29.3334 12.5467 29.3334 9.63999V7.10666C29.3334 4.19999 27.8 2.66666 24.8934 2.66666Z" />
            <path d="M9.65335 17.9066H7.12002C4.20002 17.9066 2.66669 19.44 2.66669 22.3466V24.88C2.66669 27.8 4.20002 29.3333 7.10669 29.3333H9.64002C12.5467 29.3333 14.08 27.8 14.08 24.8933V22.36C14.0934 19.44 12.56 17.9066 9.65335 17.9066Z" />
            </g>
        </svg>
    )
}

const CirclePlus = (props) => {
    return (
        <svg className={'fill-current w-full h-full ' + props.tailwind} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path opacity="0.4" d="M16 29.3333C23.3638 29.3333 29.3333 23.3638 29.3333 16C29.3333 8.63619 23.3638 2.66666 16 2.66666C8.63616 2.66666 2.66663 8.63619 2.66663 16C2.66663 23.3638 8.63616 29.3333 16 29.3333Z" />
            <path d="M21.3333 15H17V10.6667C17 10.12 16.5466 9.66666 16 9.66666C15.4533 9.66666 15 10.12 15 10.6667V15H10.6666C10.12 15 9.66663 15.4533 9.66663 16C9.66663 16.5467 10.12 17 10.6666 17H15V21.3333C15 21.88 15.4533 22.3333 16 22.3333C16.5466 22.3333 17 21.88 17 21.3333V17H21.3333C21.88 17 22.3333 16.5467 22.3333 16C22.3333 15.4533 21.88 15 21.3333 15Z" />
        </svg>
    )
}

const CircleDots = (props) => {
    return (
        <svg className={'fill-current w-full h-full ' + props.tailwind} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path opacity="0.4" d="M16 29.3333C23.3638 29.3333 29.3333 23.3638 29.3333 16C29.3333 8.63619 23.3638 2.66666 16 2.66666C8.63616 2.66666 2.66663 8.63619 2.66663 16C2.66663 23.3638 8.63616 29.3333 16 29.3333Z" />
            <path d="M16 17.3333C15.2533 17.3333 14.6666 16.7333 14.6666 16C14.6666 15.2667 15.2666 14.6667 16 14.6667C16.7333 14.6667 17.3333 15.2667 17.3333 16C17.3333 16.7333 16.7466 17.3333 16 17.3333Z" />
            <path d="M21.3333 17.3333C20.5867 17.3333 20 16.7333 20 16C20 15.2667 20.6 14.6667 21.3333 14.6667C22.0667 14.6667 22.6667 15.2667 22.6667 16C22.6667 16.7333 22.08 17.3333 21.3333 17.3333Z" />
            <path d="M10.6667 17.3333C9.92004 17.3333 9.33337 16.7333 9.33337 16C9.33337 15.2667 9.93337 14.6667 10.6667 14.6667C11.4 14.6667 12 15.2667 12 16C12 16.7333 11.4134 17.3333 10.6667 17.3333Z" />
        </svg>
    )
}

const Space = (props) => {
    return (
        <svg className={'fill-current w-full h-full ' + props.tailwind} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 15V9C22 7.34 20.66 6 19 6H5C3.34 6 2 7.34 2 9V15C2 16.66 3.34 18 5 18H19C20.66 18 22 16.66 22 15Z" />
            <path d="M5.92923 19.5H18.0692C18.3892 19.5 18.6192 19.79 18.5592 20.1C18.2892 21.58 17.4192 22 15.3292 22H8.66923C6.56923 22 5.70923 21.58 5.43923 20.1C5.37923 19.79 5.60923 19.5 5.92923 19.5Z" />
            <path d="M8.66923 2H15.3292C17.4292 2 18.2892 2.42 18.5592 3.9C18.6192 4.21 18.3792 4.5 18.0692 4.5H5.92923C5.60923 4.5 5.37923 4.21 5.43923 3.9C5.70923 2.42 6.56923 2 8.66923 2Z" />
        </svg>
    )
}

export {
    Temp,
    Logo,
    Key,
    Message,
    Shield,
    Settings,
    Folder,
    Image,
    Video,
    Close,
    Plus,
    Text,
    ArrowUp,
    ArrowDown,
    Tick,
    Dashboard,
    CirclePlus,
    CircleDots,
    Space
}