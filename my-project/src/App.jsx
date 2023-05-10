import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
// import './App.css'
import './styles.css'


function Select(){



  return (
    <div>
      <select id="myselect">
        <option value="" disabled>files:</option>
        <option value="editor">editor</option>
        <option value="preview">preview</option>
      </select>
    </div>
  )
}


function HandleModes({text, item1, item2}){
  const refSelect = useRef(null);

  const handleChange = () => {
    // console.log(refSelect.current.value);
    const value = refSelect.current.value;

    if(value === 'side_by_side'){
      item1.current.style.display = 'inline-block';
      item2.current.style.display = 'inline-block';
    }
    else if (value === 'one_view'){
      if(text === item1.current){
        item2.current.style.display = 'none';
      }
      else if (text === item2.current){
        item1.current.style.display = 'none';
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

HandleModes.propTypes = {
  text: PropTypes.object,
  item1: PropTypes.object,
  item2: PropTypes.object
};


function App() {
  const refEditor = useRef(null);
  const refPreview = useRef(null);
  const [currentTextarea, setCurrentTextarea] = useState(null);

  const handleSelect = (event) => {
    setCurrentTextarea(event.target);
    // console.log('heil hitler', event.target);
  }

  return (
    <div className='Container'>
      <div id="bar">
        <span>bar</span>
        <HandleModes text={currentTextarea} item1={refEditor} item2={refPreview}/>
      </div>
      <div id="selection">
        <span>select</span>
        <button type='button'>save</button>
        <button type='button'>load</button>
        <Select/>
      </div>
      <div id="template">
        <textarea id="editor" ref={refEditor} onSelect={handleSelect}></textarea>
        <textarea id="preview" ref={refPreview} onSelect={handleSelect}></textarea>
      </div>
    </div>
  )
}

export default App
