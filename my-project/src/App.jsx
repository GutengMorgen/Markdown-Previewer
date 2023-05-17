import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
// import './App.css';
import './styles.css';

//import js files
import Testingselect from './TestingSelect';
import SelectorForModes from './SelectorForModes';
import TestingCanvas from './canvas';
import CreateButton from './CreateButton';


function Files({SetCurrentTextarea}) {

  return (
    <div className='files' id="file0">
      <textarea id="editor" placeholder='editor 0' onClick={(e) => SetCurrentTextarea(e.target)}></textarea>
      <textarea id="preview" placeholder='preview 0' onClick={(e) => SetCurrentTextarea(e.target)} readOnly></textarea>
    </div>
  )
}
Files.propTypes = {
  SetCurrentTextarea: PropTypes.func
}

export default function App() {
  const refBlank = useRef(null);
  const [currentTextarea, setCurrentTextarea] = useState(null);
  const [showCanvas, setShowCanvas] = useState(false);

  return (
    <div className='Container'>
      <div id="bar">
        <SelectorForModes RefBlank={refBlank} CurrentTextarea={currentTextarea} SetShowCanvas={setShowCanvas} ShowCanvas={showCanvas}/>
      </div>
      <div id="selection">
        <CreateButton refBlank={refBlank} SetCurrentTextarea={setCurrentTextarea} ShowCanvas={showCanvas}/>
        <button type='button'>save</button>
        <button type='button'>load</button>
        <Testingselect RefBlank={refBlank} ShowCanvas={showCanvas}/>
      </div>
      <div id="blank" ref={refBlank}>
        <Files SetCurrentTextarea={setCurrentTextarea}/>
        {showCanvas ? <TestingCanvas getRefBlank={refBlank.current}/> : null}
      </div>
    </div>
  )
}