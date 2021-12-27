import dat from 'dat.gui';
import { useCallback, useEffect, useRef } from 'react';
import { optionsService } from '../services/options';
import { drawLines } from '../services/converter'

const defaultOptions = {
  pixelStep: 5,	// pixel step over in the image
  maxHeight: 5, // max mesh height in mms for brightest image color
  isInvert: false, // true to invert height values (dark == highest)
  isSmooth: true, //turn on smoothing
  isAbsolute: false
};

export const useControls = ({ onChange }) => {
  const guiRef = useRef(null);
  const optionsRef = useRef(defaultOptions);

  const changeHandler = useCallback(() => {
    optionsService.update(optionsRef.current);
    drawLines();
  }, []);

  useEffect(() => {
    const gui = new dat.GUI();
    const opts = { ...defaultOptions };

    gui.add(opts, 'pixelStep', 1.00, 50.00, 5.00)
      .name('Pixels to Skip')
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

  const resetOptions = useCallback(() => {

  }, []);

  return {
    resetOptions
  }
};
