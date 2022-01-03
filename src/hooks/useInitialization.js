import { useEffect } from 'react';
import { useWindowResizeHandler } from 'src/hooks/useWindowResizeHandler';

import { injectRenderer } from '../services/3d/renderer';

export const useInitialization = () => {
  const resizeHandler = useWindowResizeHandler();

  useEffect(() => {
    window.addEventListener('resize', resizeHandler);

    document.onselectstart = () => false;

    injectRenderer();
    resizeHandler();    

    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, [resizeHandler]);
}