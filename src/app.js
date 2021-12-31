import React, { useCallback} from 'react';
import { useControls } from './hooks/useControls';
import { useInitialization } from './hooks/useInitialization';
import { rerenderScene } from 'src/services/converter/rerenderScene';

import { image2matrixData } from 'src/convert/image2matrixData';
import { file2image } from 'src/convert/file2image';
import { state, IMAGE_MATRIX_DATA } from 'src/services/state';

export const App = () => {
  useInitialization();
  useControls({
    onChange: (opts) => console.log(opts)
  });

  const fileChangeHandler = useCallback(async (e) => {
		const image = await file2image(e.target.files[0]);
    const matrixData = image2matrixData(image);

    state.set(IMAGE_MATRIX_DATA, matrixData);

    rerenderScene();
  }, []);

  return (
    <div id="app">
      <div id="content3d" />
      <div className="control-panel">
        <input type="file" onChange={fileChangeHandler} />
        <button type="button" onClick={() => {} /*export2fusion*/}>
          EXPORT TO FUSION360
        </button>
      </div>
    </div>
  );
};
