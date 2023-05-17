import { useEffect, useRef, useCallback } from "react";
import PropTypes from 'prop-types';
import dragElement from "./dragElement";

function GetData(refCanvas, RefBlank ,enableCanvas) {
  for(const file of refCanvas.children) {
    for(const textarea of file.children) {

      if(enableCanvas){
        RefBlank.style.overflow = 'auto';
        file.classList.remove('filesOutCanvas');
        file.classList.add('filesInCanvas');
        
        textarea.classList.remove('hidden');
        textarea.classList.remove('oneView');
        textarea.style = 'width: 22em; height: 22em';
      }
      else{
        RefBlank.style.overflow = 'hidden';

        file.classList.remove('filesInCanvas');
        file.classList.add('filesOutCanvas');

        textarea.style = '';
      }
      dragElement(textarea, null, enableCanvas);
    }
  }
}

export default function Canvas({RefBlank, SetCurrentTextarea, IsCanvas}){
  const refCanvas = useRef(null);

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
        <textarea id="editor" placeholder='editor 0' onClick={(e) => {SetCurrentTextarea(e.target)}}></textarea>
        <textarea id="preview" placeholder='preview 0' onClick={(e) => {SetCurrentTextarea(e.target)}} readOnly></textarea>
      </div>
    </div>
  )
}

Canvas.propTypes = {
  RefBlank: PropTypes.object,
  SetCurrentTextarea: PropTypes.func,
  IsCanvas: PropTypes.bool
}