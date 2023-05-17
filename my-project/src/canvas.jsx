import { useEffect, useRef } from "react";
import './canvasStyles.css';
import PropTypes from 'prop-types';
import dragElement from "./dragElement";

//se esta ejecutando varias veces
const GetData = (getRefBlank, refContainer) => {

  useEffect(() => {
    const parentNode = getRefBlank;
    const actualNode = refContainer.current;

    //crear un script para poder manejar la data del selector de modos y selector de files
    for (const file of parentNode.children) {
      if (file.id.startsWith('file')) {

        parentNode.removeChild(file);

        for (const textarea of file.children) {

          textarea.style = 'width: 22em; height: 22em; resize: both; z-index: 1;';
          dragElement(textarea, null);
        }
        file.classList.remove('hidden');
        file.classList.add('filesInCanvas');
        actualNode.appendChild(file);
      }
    }
  }, [getRefBlank, refContainer]);
}

//intentar usar offsetWidth y offsetHeight
function handleClick(e, refMyDiv){
  const divRect = refMyDiv.getBoundingClientRect();
  const computedStyle = getComputedStyle(refMyDiv);
  const umbral = 200; // ponerlos en porcentajes
  const calc = divRect.left + refMyDiv.clientWidth - umbral;
  const calcbottom = divRect.top + refMyDiv.clientHeight - umbral;

  if(e.clientX >= calc){
    const currentWidth = parseInt(computedStyle.width); // Obtener el valor numérico actual de la anchura
    refMyDiv.style.width = (currentWidth + umbral) + 'px'; // Establecer la nueva anchura con la unidad 'px'
  }
  else if(e.clientY >= calcbottom){
    const currentHeight = parseInt(computedStyle.height);
    refMyDiv.style.height = (currentHeight + umbral) + 'px';
  }
}

export default function TestingCanvas({getRefBlank}){
  const refContainer = useRef(null);
  GetData(getRefBlank, refContainer);

  useEffect(() => {
    dragElement(refContainer.current, getRefBlank);
  }, [getRefBlank]);

  return (
    <div id="canvas" className="canvasContainer" ref={refContainer} 
    onClick={(e) => handleClick(e, refContainer.current)}
    />
  )
}

TestingCanvas.propTypes = {
  getRefBlank: PropTypes.object
}