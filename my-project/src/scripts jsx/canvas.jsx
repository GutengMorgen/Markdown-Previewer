import { useEffect, useRef, useCallback, useState } from "react";
import PropTypes from 'prop-types';
import dragElement from "../scripts js/dragElement";
import {  marked } from 'marked';

function GetData(refCanvas, RefBlank ,enableCanvas) {
  for(const file of refCanvas.children) {
    for(const textarea of file.children) {

      if(enableCanvas){
        RefBlank.style.overflow = 'auto';
        file.classList.remove('filesOutCanvas');
        file.classList.add('filesInCanvas');
        
        textarea.classList.remove('hidden');
        textarea.classList.remove('oneView');
        if(textarea.tagName === 'TEXTAREA')
          textarea.style = 'width: 22em; height: 22em';
        else
          textarea.style = 'width: 293px; height: 293px';
      }
      else{
        RefBlank.style.overflow = 'hidden';

        file.classList.remove('filesInCanvas');
        file.classList.add('filesOutCanvas');

        textarea.style = '';
        textarea.onMouseEnter = null;
        textarea.onMouseLeave = null;
      }
      dragElement(textarea, null, enableCanvas);
    }
  }
}

export default function Canvas({RefBlank, SetCurrentTextarea, IsCanvas}){
  const refCanvas = useRef(null);
  const [markdownText, setMarkdownText] = useState(`# Welcome to my React Markdown Previewer!

  ## This is a sub-heading...
  ### And here's some other cool stuff:
  
  Heres some code, \`<div></div>\`, between 2 backticks.
  
  \`\`\`
  // this is multi-line code:
  
  function anotherExample(firstLine, lastLine) {
    if (firstLine == '\\\`\\\`\\\`' && lastLine == '\\\`\\\`\\\`') {
      return multiLineCode;
    }
  }
  \`\`\`
  
  You can also make text **bold**... whoa!
  Or _italic_.
  Or... wait for it... **_both!_**
  And feel free to go crazy ~~crossing stuff out~~.
  
  There's also [links](https://www.freecodecamp.org), and
  > Block Quotes!
  
  And if you want to get really crazy, even tables:
  
  Wild Header | Crazy Header | Another Header?
  ------------ | ------------- | -------------
  Your content can | be here, and it | can be here....
  And here. | Okay. | I think we get it.
  
  - And of course there are lists.
    - Some are bulleted.
       - With different indentation levels.
          - That look like this.
  
  
  1. And there are numbered lists too.
  1. Use just 1s if you want!
  1. And last but not least, let's not forget embedded images:
  
  ![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)`);
  
  const convertedText = marked(markdownText);

  const handleInputChange = (event) => {
    setMarkdownText(event.target.value);
  };

  const reSizeElement = useCallback((e, refContainer) => {
    const divRect = refContainer.current.getBoundingClientRect();
    const umbral = 200;
    const calc = divRect.left + refContainer.current.clientWidth - umbral;
    const calcbottom = divRect.top + refContainer.current.clientHeight - umbral;

    if (e.clientX >= calc) {
      const currentWidth = refContainer.current.offsetWidth;
      refContainer.current.style.width = (currentWidth + umbral) + 'px';
    } else if (e.clientY >= calcbottom) {
      const currentHeight = refContainer.current.offsetHeight;
      refContainer.current.style.height = (currentHeight + umbral) + 'px';
    }
  }, []);


  useEffect(() => {

    GetData(refCanvas.current, RefBlank.current, IsCanvas);
    dragElement(refCanvas.current, RefBlank.current, IsCanvas);
    
  }, [RefBlank, IsCanvas]);

  return (
    <div id="canvas" className="canvasContainer" ref={refCanvas} onClick={(e) => reSizeElement(e, refCanvas)}>
      <div className='filesOutCanvas' id="file0">
        <textarea id="editor" placeholder='editor 0' onClick={(e) => {SetCurrentTextarea(e.target)}} value={markdownText} onChange={handleInputChange}></textarea>
        <div id='preview' onClick={(e) => {SetCurrentTextarea(e.target)}} dangerouslySetInnerHTML={{ __html: convertedText }}/>
      </div>
    </div>
  )
}

Canvas.propTypes = {
  RefBlank: PropTypes.object,
  SetCurrentTextarea: PropTypes.func,
  IsCanvas: PropTypes.bool
}
