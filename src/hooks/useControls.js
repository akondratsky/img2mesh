import dat from 'dat.gui';
import { useCallback, useEffect, useRef } from 'react';
import { state, OPTIONS } from 'src/services/state';
import { rerenderScene } from 'src/services/converter'

const defaultOptions = {
  pixelFactor: 1,	// pixel step over in the image
  maxHeight: 1, // max mesh height in mms for brightest image color
  isInvert: false, // true to invert height values (dark == highest)
  isSmooth: true, //turn on smoothing
  isAbsolute: false
};

export const useControls = ({ onChange }) => {
  const guiRef = useRef(null);
  const optionsRef = useRef(defaultOptions);

  const changeHandler = useCallback(() => {
    state.set(OPTIONS, optionsRef.current);
    rerenderScene();
  }, []);

  useEffect(() => {
    const gui = new dat.GUI();
    const opts = { ...defaultOptions };

    gui.add(opts, 'pixelFactor', 1.00, 50.00, 5.00)
      .name('Pixel Factor')
      .step(1)
      .onChange(changeHandler);
    gui.add(opts, 'maxHeight', 1.00, 500.00, 5.00)
      .name('Max Height (mm)')
      .step(0.1)
      .onChange(changeHandler);
    gui.add(opts, 'isInvert')
      .name('Invert Heights')
      .onChange(changeHandler);
    gui.add(opts, 'isSmooth')
      .name('Smooth')
      .onChange(changeHandler);
    gui.add(opts, 'isAbsolute')
      .name('Absolute (B&W)')
      .onChange(changeHandler);

    guiRef.current = gui;
    optionsRef.current = opts;

    changeHandler();
  }, [changeHandler]);
};
