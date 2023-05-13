import { useEffect, useRef, useState } from "react";
import './canvasStyles.css';
import PropTypes from 'prop-types';

function dragElement(elmnt) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  const dragMouseDown = (e) => {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  };

  const elementDrag = (e) => {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  };

  const closeDragElement = () => {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  };
  
  elmnt.onmousedown = (e) => {
    if(e.button === 2){
      //causa un bug cuando hay muchos textareas en el canvas
      elmnt.style.top = (elmnt.offsetTop) + "px";
      elmnt.style.left = (elmnt.offsetLeft) + "px";
      elmnt.style.position = 'absolute';
      elmnt.style.cursor = 'grabbing';
      dragMouseDown(e);
      // console.log(elmnt.offsetTop);
    }
    
  }

  elmnt.onmouseup = elmnt.onmouseleave = () => {
    elmnt.style.cursor = 'default';
  }
}



//se esta ejecutando varias veces
const GetData = (getRefBlank, refContainer) => {

  useEffect(() => {
    const parentNode = getRefBlank;
    const actualNode = refContainer.current;

    //crear un script para poder manejar la data del selector de modos y selector de files
    for (const file of parentNode.children) {
      if (file.id.startsWith('file')) {
        for (const textarea of file.children) {
          file.removeChild(textarea);
          textarea.classList.add('textareasInCanvas');
          textarea.style.width = '20em';
          textarea.oncontextmenu = (e) => { e.preventDefault(); }
          actualNode.appendChild(textarea);
          dragElement(textarea);
        }
      }
    }
  }, [getRefBlank, refContainer]);
}

//intentar usar offsetWidth y offsetHeight
function handleClick(e, refMyDiv){
  const divRect = refMyDiv.getBoundingClientRect();
  const computedStyle = getComputedStyle(refMyDiv);
  const radius = 150; // ponerlos en porcentajes
  const plusPx = 200;
  const calc = divRect.left + refMyDiv.clientWidth - radius;
  const calcbottom = divRect.top + refMyDiv.clientHeight - radius;

  if(e.clientX >= calc){
    const currentWidth = parseInt(computedStyle.width); // Obtener el valor numérico actual de la anchura
    refMyDiv.style.width = (currentWidth + plusPx) + 'px'; // Establecer la nueva anchura con la unidad 'px'
  }
  else if(e.clientY >= calcbottom){
    const currentHeight = parseInt(computedStyle.height);
    refMyDiv.style.height = (currentHeight + plusPx) + 'px';
  }
}




export default function TestingCanvas({getRefBlank}){
  const refContainer = useRef(null);
  GetData(getRefBlank, refContainer);

  const [isDragging, setIsDragging] = useState(false);
  const [initialCoords, setInitialCoords] = useState({x: 0, y: 0});

  const HandleMouseInteraction = (e) => {
    switch (e.type) {
      case 'mousedown':
        if(e.button === 2){
          setInitialCoords({x: e.clientX, y: e.clientY});
          setIsDragging(true);
          refContainer.current.style.cursor = 'grabbing';
        }
      break;
  
      case 'mousemove': {
        if(!isDragging) return;
        const deltaX = initialCoords.x - e.clientX;
        const deltaY = initialCoords.y - e.clientY;
        getRefBlank.scrollLeft += deltaX;
        getRefBlank.scrollTop += deltaY;
        // update the coordinates
        setInitialCoords({x: e.clientX, y: e.clientY});
      }
      break;
  
      case 'mouseup':
        if(isDragging && e.button === 2){
          setIsDragging(false);
          refContainer.current.style.cursor = 'default';
        }
      break;
  
      case 'mouseleave':
        setIsDragging(false);
      break;
    }
  }
  
  // useEffect(() => {
  //   const element = document.getElementById("mydiv");
  //   dragElement(element);
    
  // }, []);

  return (
    <div id="canvas" className="canvasContainer" ref={refContainer} onClick={(e) => handleClick(e, refContainer.current)}
    onContextMenu={(e) => e.preventDefault()}
    onMouseDown={HandleMouseInteraction}
    onMouseMove={HandleMouseInteraction}
    onMouseUp={HandleMouseInteraction}
    onMouseLeave={HandleMouseInteraction}
    >
      {/* <div id="mydiv">
        <div id="mydivheader">Click here to move</div>
        <p>Move</p>
        <p>this</p>
        <p>DIV</p>
      </div> */}
    </div>    
  )
}

TestingCanvas.propTypes = {
  getRefBlank: PropTypes.object
}