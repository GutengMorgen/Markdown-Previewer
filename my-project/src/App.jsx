import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
// import './App.css'
import './styles.css'

//import js files
// import * as selector from './Select';
import Testingselect from './TestingSelect';


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

function HandleSelectorModes({getRefBlank, refCurrentTextarea}){
  const refSelect = useRef(null);

  const handleChange = () => {
    //obtiene el div files que no contiene la clase hidden
    const currentFile = getRefBlank.current.querySelector('div:not(.hidden)');
    const value = refSelect.current.value;

    for (const textarea of currentFile.childNodes){

      if (value === 'one_view'){
        if(refCurrentTextarea.parentNode.id === currentFile.id && refCurrentTextarea !== textarea){
          //problablemente deberia clear una clase hidden solo para textarea
          textarea.classList.add('hidden');
        }
      }
      else if (value === 'side_by_side'){
        textarea.classList.remove('hidden');
      }
    }
  }


  return (
    <select id="modes" ref={refSelect} onChange={handleChange}>
      <option value="default" defaultValue>select a mode</option>
      <option value="one_view">one view</option>
      <option value="side_by_side">side by side</option>
      <option value="canvas" disabled>canvas</option>
    </select>
  )
}

HandleSelectorModes.propTypes = {
  getRefBlank: PropTypes.object,
  refCurrentTextarea: PropTypes.object
};


export default function App() {
  const refBlank = useRef(null);
  const [count, setCount] = useState(1);
  const [currentTextarea, setCurrentTextarea] = useState(null);

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
        <HandleSelectorModes getRefBlank={refBlank} refCurrentTextarea={currentTextarea}/>
      </div>
      <div id="selection">
        <button type='button' onClick={handleClickCreator}>+</button>
        <button type='button'>save</button>
        <button type='button'>load</button>
        <Testingselect getRef={refBlank}/>
      </div>
      <div id="blank" ref={refBlank}>
        <Files refSetCurrentTextarea={setCurrentTextarea}/>
      </div>
    </div>
  )
}