import React, { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { IconLarge } from './Icons';
import { ButtonLarge } from './Buttons';

export const Popup = ({ setPopupOpen, icon, title, children }) => {
    const node = useRef();
  
    const handleOutsideClick = e => {
      if (node.current.contains(e.target)) {
        return;
      }
      setPopupOpen(false);
    };
  
    useEffect(() => {
        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    });
    
    return (
        <div className="w-full h-screen absolute top-0 left-0 flex items-center justify-center z-50">
            <motion.div 
                ref={node} 
                className={`relative w-full bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden z-50 dark:bg-myGray-800 dark:border-myGray-700`} 
                style={{ maxWidth: '384px' }}
                initial={{ y: 100 }} 
                animate={{ y: 0 }} 
            >
                {/* Header */}
                {(icon || title) &&
                    <div className="p-8 flex flex-col space-y-4 items-center">
                        <IconLarge>
                            { icon }
                        </IconLarge>
                        <p>{ title }</p>
                    </div>
                }
                {/* Content */}
                <div>
                    {children}
                </div>
                {/* Footer */}
                <div className="px-8 pt-2 pb-4 flex flex-col">
                    <button onClick={() => setPopupOpen(false)}>
                        <ButtonLarge text={'Close'} tailwind={'text-gray-400 hover:bg-gray-100 dark:hover:bg-myGray-700'} />
                    </button>
                </div>
            </motion.div>
        </div>
    )
}