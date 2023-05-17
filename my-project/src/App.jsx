import { useRef, useState } from 'react';
import './all styles/styles.css';
import './all styles/selectwithtable.css';
import './all styles/canvasStyles.css';

import SelectFiles from './scripts jsx/SelectFiles';
import SelectModes from './scripts jsx/SelectModes';
import CanvasJSX from './scripts jsx/canvas';
import CreateButton from './scripts jsx/CreateButton';

export default function App() {
  const refBlank = useRef(null);
  const [currentTextarea, setCurrentTextarea] = useState(null);
  const [isCanvas, setIsCanvas] = useState(false);
  const [isCreate, setIsCreate] = useState(false);

  return (
    <div className='Container'>
      <div id="bar">
        <SelectModes RefBlank={refBlank} CurrentTextarea={currentTextarea} SetIsCanvas={setIsCanvas}/>
      </div>
      <div id="selection">
        <CreateButton refBlank={refBlank} SetCurrentTextarea={setCurrentTextarea} IsCanvas={isCanvas} SetIsCreate={setIsCreate}/>
        {/* <p><button type='button' className='defaultButton'>Save</button></p>
        <p><button type='button' className='defaultButton'>Load</button></p> */}
        <SelectFiles RefBlank={refBlank} IsCanvas={isCanvas} IsCreate={isCreate} SetIsCreate={setIsCreate}/>
      </div>
      <div id="blank" ref={refBlank}>
        <CanvasJSX RefBlank={refBlank} SetCurrentTextarea={setCurrentTextarea} IsCanvas={isCanvas}/>
      </div>
    </div>
  )
}