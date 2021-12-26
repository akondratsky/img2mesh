import { useEffect } from "preact/hooks"
import { windowResizeHandler } from '../services/windowResizeHandler';

import { injectRenderer } from "../services/renderer";

export const useInitialization = () => {
  useEffect(() => {
    // TODO: check WebGL support

    window.addEventListener('resize', windowResizeHandler);

    document.onselectstart = () => false;
    
    injectRenderer();
    windowResizeHandler();

    return () => {
      window.removeEventListener('resize', windowResizeHandler);
    };
  }, []);
}