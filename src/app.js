import React, { useCallback } from 'react';
import { useOptions } from './hooks/useOptions';
import { useInitialization } from './hooks/useInitialization';
import { rerenderScene } from 'src/services/3d/rerenderScene';

import { image2imageData } from 'src/convert/image2imageData';
import { file2image } from 'src/convert/file2image';
import { state, IMAGE_DATA } from 'src/services/state';

import { exportPlane } from 'src/export/plane';
import { exportPlane2obj } from 'src/export/plane2obj';

export const App = () => {
  useInitialization();
  useOptions({
    onChange: (opts) => console.log(opts)
  });

  const fileChangeHandler = useCallback(async (e) => {
    const image = await file2image(e.target.files[0]);
    const imageData = image2imageData(image);

    state.set(IMAGE_DATA, imageData);

    rerenderScene({ fitView: true });
  }, []);

  return (
    <div id="app">
      <div id="content3d" />
      <div className="control-panel">
        <input type="file" onChange={fileChangeHandler} />
        <button type="button" onClick={exportPlane}>
          EXPORT PLANE
        </button>
        <button type="button" onClick={exportPlane2obj}>
          EXPORT BOX
        </button>
      </div>
    </div>
  );
};
