import { useCallback, useEffect} from "react";


export function useKeyEvent(callback:(keyboardEvent:KeyboardEvent)=>void,on:"keyup"|"keydown"="keyup") {
  const handleKey = useCallback( (keyboardEvent:KeyboardEvent) => { callback(keyboardEvent); }, [callback] );

  useEffect(() => {
    document.addEventListener(on, handleKey);
    return () => {
      document.removeEventListener(on, handleKey);
    };
  }, [handleKey,on]);

}

/** https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript */
export function getParameterByName(name:string, url = window.location.href) {
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
