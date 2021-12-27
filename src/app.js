import React, { useCallback} from 'react';
import { useControls } from './hooks/useControls';
import { useInitialization } from './hooks/useInitialization';
import { readImage, getImageData, drawLines, export2fusion } from './services/converter';

export const App = () => {
  useInitialization();
  useControls({
    onChange: (opts) => console.log(opts)
  });

  const fileChangeHandler = useCallback(async (e) => {
		const file = e.target.files[0];
		const image = await readImage(file);
		// TODO: resetGUIOptions()
		getImageData(image);
    drawLines();
  }, []);

  return (
    <div id="app">
      <div id="content3d" />
      <div class="control-panel" style={{ position: 'absolute', backgroundColor: '#fff' }}>
        <input type="file" onChange={fileChangeHandler} />
        <button type="button" onClick={export2fusion}>
          EXPORT TO FUSION360
        </button>
      </div>
    </div>
  );
};
