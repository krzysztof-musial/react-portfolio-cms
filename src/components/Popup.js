import React, { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Popup({ setPopupOpen, children, size }) {
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
        <motion.div 
            className="w-full h-screen absolute top-0 left-0 flex items-center justify-center z-50" 
            initial={{ background: 'rgba(0,0,0,0)' }} 
            animate={{ background: 'rgba(0,0,0,.05)' }}
        >
            <motion.div 
                ref={node} 
                className={`relative w-full max-w-${size || 'sm'} bg-white rounded-3xl shadow-2xl overflow-hidden z-50`} 
                initial={{ y: 100 }} 
                animate={{ y: 0 }} 
            >
              {children}
            </motion.div>
        </motion.div>
    )
}
