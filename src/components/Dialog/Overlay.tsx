import { useState, useEffect, useRef,useLayoutEffect, ReactNode } from 'react';
import './dialog.scss';

export interface Option{
  key:string,
  label:string,
  onClick:()=>void
}

interface OverlayProps{
  targetId:string
  options?:Option[]
  classes?:{
    listWrapper:string,
    listItem:string
  }
  children?:ReactNode
}

const Overlay: React.FC<OverlayProps> =({ targetId, options, classes, children })=>{
  const [contextData, setContextData]= useState({ visible:false, posX: 0, posY: 0});
  const contextRef= useRef<HTMLDivElement>(null);

  useEffect(() => {
    const contextMenuEventHandler= (event:any) => {
      const targetElement= document.getElementById(targetId)
      if(targetElement && targetElement.contains(event.target)){
        event.preventDefault();
        setContextData({ visible: true, posX: event.pageX, posY: event.pageY })
      }else if(contextRef.current && !contextRef.current.contains(event.target)){
        setContextData(prev=>({ ...prev, visible: false }))
      }
    }

    document.addEventListener('click', contextMenuEventHandler)
    return () => {
      document.removeEventListener('clik', contextMenuEventHandler)
    }
  }, [targetId])

  // handle klick dipojok kiri bawah
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
    <div ref={contextRef} className='overlay' style={{ display:`${contextData.visible ? 'block' : 'none'}`, left: contextData.posX, top: contextData.posY, zIndex:2}}>
      {options && <div className={`optionsList ${classes?.listWrapper??''}`}>
        {options.map((option) => (
          <li key={option.key}
            className={`optionListItem ${classes?.listItem??''}`}
            onClick={()=>{
              option.onClick();
              setContextData(prev=>({...prev,visible:false}))
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

export default Overlay;