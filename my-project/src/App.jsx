import { useRef, useState } from 'react';
import './styles.css';
import './selectwithtable.css';
import './canvasStyles.css';

import SelectFiles from './SelectFiles';
import SelectModes from './SelectModes';
import CanvasJSX from './canvas';
import CreateButton from './CreateButton';

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
        <p><CreateButton refBlank={refBlank} SetCurrentTextarea={setCurrentTextarea} IsCanvas={isCanvas} SetIsCreate={setIsCreate}/></p>
        <p><button type='button' className='defaultButton'>Save</button></p>
        <p><button type='button' className='defaultButton'>Load</button></p>
        <SelectFiles RefBlank={refBlank} IsCanvas={isCanvas} IsCreate={isCreate} SetIsCreate={setIsCreate}/>
      </div>
      <div id="blank" ref={refBlank}>
        <CanvasJSX RefBlank={refBlank} SetCurrentTextarea={setCurrentTextarea} IsCanvas={isCanvas}/>
      </div>
    </div>
  )
}