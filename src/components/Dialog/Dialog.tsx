import { useState, useEffect, useRef, useLayoutEffect, ReactNode } from 'react';
import './dialog.scss';
import { Option } from './ContextMenu';

type PropsDialog={
  targetId:string,
  options?:Option[],
  classes?:{
    listWrapper:string,
    listItem:string
  },
  children?:ReactNode,
  isOpen?:boolean,
  onClose?:()=>void
}

const Dialog: React.FC<PropsDialog> =({ targetId, options, classes, isOpen, children, onClose })=>{
  const [contextData, setContextData]= useState({ visible:isOpen, posX: 0, posY: 0});
  const contextRef= useRef<HTMLDivElement>(null);

  useEffect(() => {
    const targetElement= document.getElementById(targetId)
    if(targetElement){
      const rect=targetElement.getBoundingClientRect()
      setContextData(prev=>({...prev, posX: rect.x, posY: rect.y}))
    }
  }, [targetId])

  useEffect(() => {
    setContextData(prev=>({...prev,visible:isOpen}))
  }, [isOpen])

  useLayoutEffect(() => {
    if(contextRef.current){
      if(contextData.posX + contextRef.current.offsetWidth > window.innerWidth){
        setContextData({ ...contextData, posX: contextData.posX - contextRef.current.offsetWidth})
      }
      if(contextData.posY + contextRef.current.offsetHeight > window.innerHeight){
        setContextData({ ...contextData, posY: contextData.posY - contextRef.current.offsetHeight})
      }
    }
  }, [contextData])

  return (
    <div ref={contextRef} className='dialog' style={{ display:`${contextData.visible ? 'block' : 'none'}`, left: contextData.posX, top: contextData.posY, zIndex:3 }}>
      {options && <div className={`optionsList ${classes?.listWrapper??''}`}>
        {options.map((option) => (
          <li key={option.key}
            className={`optionListItem ${classes?.listItem??''}`}
            onClick={()=>{
              option.onClick();
              // setContextData(prev=>({...prev,visible:false}))
            }}
          >
            {option.label}
          </li>
        ))}
      </div>}
      { children && 
        <div className={`optionsList ${classes?.listWrapper??''}`}>
          {children}
        </div>
      }
    </div>
  );
}

export default Dialog;