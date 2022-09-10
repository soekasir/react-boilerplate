import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";


export function useKeyEvent(callback:(keyboardEvent:KeyboardEvent)=>void,on:"keyup"|"keydown"="keyup") {
  const handleKey = useCallback( (keyboardEvent:KeyboardEvent) => { callback(keyboardEvent); }, [callback] );

  useEffect(() => {
    document.addEventListener(on, handleKey);
    return () => {
      document.removeEventListener(on, handleKey);
    };
  }, [handleKey,on]);

}

export const useStickyElement = (
  {
    closingElement
  }:
  {
    closingElement?:React.RefObject<HTMLDivElement>
  }
) => {
  const [isSticky, setIsSticky] = useState(false);
  const elementSticky = useRef<HTMLDivElement>(null);

  const toggleSticky = useCallback(
    (domRect:DOMRect,botDomRect?:DOMRect) => {
      if(botDomRect){
        if (domRect.top<=0 && botDomRect.top>0 && !isSticky ) {
          setIsSticky(true);
        }
        if (domRect.top>0 && isSticky) {
          setIsSticky(false);
        }
        if (botDomRect.top<0 && domRect.top<=0 && isSticky) {
          setIsSticky(false);
        }
      }
      if(!botDomRect){
        if (domRect.top<=0 && !isSticky ) {
          setIsSticky(true);
        }
        if (domRect.top>0 && isSticky) {
          setIsSticky(false);
        }
      }
    },
    [isSticky]
  );

  
  useEffect(() => {
    const handleScroll = () => {
      if(elementSticky.current && !closingElement){
        toggleSticky(elementSticky.current.getBoundingClientRect());
      }
      if(elementSticky.current && closingElement?.current){
        toggleSticky(elementSticky.current.getBoundingClientRect(),closingElement.current.getBoundingClientRect());
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  },[toggleSticky]);

  return [ elementSticky, isSticky ] as [React.RefObject<HTMLDivElement>,boolean];
};

export const Sticky = (
  {
    children,
    closingElement
  }:
  {
    children:ReactNode,
    closingElement?:React.RefObject<HTMLDivElement>
  }
) => {
  const [ elementSticky, isSticky ]=useStickyElement({closingElement});
  return (
    <>
      {isSticky && (
        <div style={{
          position: "fixed",
          top: 0,
          left: elementSticky.current?.offsetLeft,
          width: elementSticky.current?.clientWidth,
          zIndex:999
        }}>
          {children}
        </div>
      )}
      <div ref={elementSticky}>
        {children}
      </div>
    </>
  );
};

export const useTokenQwee=()=>{
  const [searchParams] = useSearchParams();
  return searchParams.get("qwee");
}

/** https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript */
function getParameterByName(name:string, url = window.location.href) {
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

export const getTokenQwee=()=>{
  return getParameterByName('qwee');
}