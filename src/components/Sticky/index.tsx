import { ReactNode, useCallback, useEffect, useRef, useState } from "react";

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