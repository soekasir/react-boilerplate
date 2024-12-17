import { ReactNode } from "react"

interface SwitchDisplayProps{
  options:{
    condition:boolean,
    element:ReactNode
  }[]
}

export const SwitchDisplay=({ options }:SwitchDisplayProps)=>{

  return <>
    {options.map((option)=>(
      <div style={{ display: option.condition?'inherit':'none'}}>
        {option.element}
      </div>
    ))}
  </>
  
}