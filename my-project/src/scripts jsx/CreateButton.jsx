import { useState, useCallback } from "react";
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import dragElement from "../scripts js/dragElement";
import { marked } from 'marked';

export default function CreateButton(props){
  const [divs, setDivs] = useState([]);

  function handleClick() {
    const newDiv = {
      id: divs.length + 1,
      content: ''
    }
    setDivs([...divs, newDiv]);
    props.SetIsCreate(true);
  }

  marked.setOptions({
    headerIds: false,
    mangle: false,
    breaks: true
  });

  function renderMarkdown(content){
    return {__html: marked(content)}
  }

    
  const handleContentChange = useCallback((index, e) => {
    const updateDivs = [...divs];
    updateDivs[index].content = e.target.value;
    setDivs(updateDivs);
  }, [divs]);

  return (
    <div>
    <p><button className='defaultButton' onClick={handleClick}>New</button></p>
    {divs.map((div, index) => (
      createPortal(
        <div
          key={div.id}
          className={props.IsCanvas ? "filesInCanvas" : "filesOutCanvas"}
          id={`file${div.id}`}
        >
          <textarea
            id="editor"
            placeholder={`editor ${div.id}`}
            value={div.content}
            onChange={(e) => handleContentChange(index, e)}
            onClick={(e) => props.SetCurrentTextarea(e.target)}
            onMouseEnter={(e) => dragElement(e.target, null, props.IsCanvas)}
            onMouseLeave={(e) => dragElement(e.target, null, props.IsCanvas)}

            style={props.IsCanvas ? {width: '22em', height: '22em', padding: '1em'} : {}}
          ></textarea>
          <div
            id="preview"
            dangerouslySetInnerHTML={renderMarkdown(div.content)}
            onClick={(e) => props.SetCurrentTextarea(e.target)}
            onMouseEnter={(e) => dragElement(e.target, null, props.IsCanvas)}
            onMouseLeave={(e) => dragElement(e.target, null, props.IsCanvas)}
            
            style={props.IsCanvas ? {width: '293px', height: '293px', padding: '0 14px'} : {}}
          ></div>
        </div>,
        props.refBlank.current.firstElementChild
      )
    ))}
    </div>
  )
}


CreateButton.propTypes = {
  refBlank: PropTypes.object,
  SetCurrentTextarea: PropTypes.func,
  IsCanvas: PropTypes.bool,
  SetIsCreate: PropTypes.func
}