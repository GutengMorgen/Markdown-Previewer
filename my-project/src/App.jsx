import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
// import './App.css';
import './styles.css';
//import js files
import Testingselect from './TestingSelect';
import SelectorForModes from './SelectorForModes';
import TestingCanvas from './canvas';


function handleSelectTextarea (e, setCurrentTextarea) {
  setCurrentTextarea(e.target);
}

function Files({refSetCurrentTextarea}) {

  return (
    <div className='files' id="file0">
      <textarea id="editor" placeholder='editor 0' onClick={(e) => handleSelectTextarea(e, refSetCurrentTextarea)}></textarea>
      <textarea id="preview" placeholder='preview 0' onClick={(e) => handleSelectTextarea(e, refSetCurrentTextarea)}></textarea>
    </div>
  )
}
Files.propTypes = {
  refSetCurrentTextarea: PropTypes.func
}

export default function App() {
  const refBlank = useRef(null);
  const [count, setCount] = useState(1);
  const [currentTextarea, setCurrentTextarea] = useState(null);
  const [showCanvas, setShowCanvas] = useState(false);

  //clona el div file
  const handleClickCreator = () => {
    setCount(count + 1);
    //creo que seria mejor crear los div en vez de clonarlos
    const lastChild = refBlank.current.lastElementChild;
    //clona el primer div file
    const clone = lastChild.cloneNode(true);

    //oculta el ultimo div
    lastChild.classList.add('hidden');

    //agrega configuracion extra
    clone.classList.add('files');
    clone.id = `file${count}`;
    //agrega configuracion para los textarea
    for(const textarea of clone.childNodes){
      textarea.placeholder = `${textarea.id} ${count}`;
      textarea.value = null;
      textarea.addEventListener('click', (e) => handleSelectTextarea(e, setCurrentTextarea));
    }
    refBlank.current.appendChild(clone);
  }


  return (
    <div className='Container'>
      <div id="bar">
        <SelectorForModes getRefBlank={refBlank} refCurrentTextarea={currentTextarea} getSetShowCanvas={setShowCanvas}/>
      </div>
      <div id="selection">
        <button type='button' onClick={handleClickCreator}>+</button>
        <button type='button'>save</button>
        <button type='button'>load</button>
        <Testingselect getRef={refBlank}/>
      </div>
      <div id="blank" ref={refBlank}>
        <Files refSetCurrentTextarea={setCurrentTextarea}/>
        {showCanvas ? <TestingCanvas/> : null}
      </div>
    </div>
  )
}