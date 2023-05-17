import { useRef, useEffect } from "react";
import PropTypes from 'prop-types';
import './selectwithtable.css';

function DeleteCanvas(RefBlank, SetShowCanvas){
  const canvas = RefBlank.firstElementChild;
  for(const files of canvas.childNodes){
    // console.log(files);
    files.classList.remove('filesInCanvas');
    for(const textarea of files.childNodes){
      textarea.style = '';
    }
    canvas.removeChild(files);
    RefBlank.appendChild(files);
  }
  SetShowCanvas(false);
  //no es necesari, no entiendo porque
  // RefBlank.removeChild(canvas);
}


export default function HandleSelectorModes({RefBlank, CurrentTextarea, SetShowCanvas, ShowCanvas}){
  const ContainerOptions = useRef(null), ContainerTrigger = useRef(null);

  const ChangeStyle = () => {
    //obtiene el div files que no contiene la clase hidden
    const currentFile = RefBlank.current.querySelector('div:not(.hidden)');
    const OptionMaster = ContainerTrigger.current.firstChild;
    const value = OptionMaster.dataset.value;

    if (value === 'oneView'){
      if(ShowCanvas) DeleteCanvas(RefBlank.current, SetShowCanvas);
      
      for(const textarea of currentFile.childNodes){
        if(CurrentTextarea !== textarea && CurrentTextarea.parentNode.id === currentFile.id)
          textarea.classList.add('hidden');
        
        textarea.classList.add('oneView');
      }
    }
    
    else if (value === '2Side'){
      if(ShowCanvas) DeleteCanvas(RefBlank.current, SetShowCanvas);
      
      for(const textarea of currentFile.childNodes){
        textarea.classList.remove('oneView');
        textarea.classList.remove('hidden');
      }
    }
    
    else if (value === 'canvas'){
      currentFile.classList.add('hidden');
      SetShowCanvas(true);
    }
    

    /*for (const textarea of currentFile.childNodes){
      if (value === 'oneView'){
        if(ShowCanvas)
          DeleteCanvas(RefBlank.current, SetShowCanvas);
        
        if(CurrentTextarea.parentNode.id === currentFile.id && CurrentTextarea !== textarea){
          textarea.classList.add('hidden');
        }
        textarea.classList.add('oneView');
      }
      
      else if (value === '2Side'){
        if(ShowCanvas)
          DeleteCanvas(RefBlank.current, SetShowCanvas);
        
        textarea.classList.remove('hidden');
        textarea.classList.remove('oneView');
      }
    }*/
    

    /*pasos para deshabilitar el canvas*/
    //1. obtener el div canvas
    //obtener la referencia de blank
    //recorrer todos los elementos del div canvas
    //quitarles la clase filesInCanvas
    //usar removeChild
    //usar blank.appendChild


    //darles la clase hidden

    /**/
  }

  const handleClickOptions = (e) => {
    const currentOption = e.target;
    const OptionMaster = ContainerTrigger.current.firstChild;
    OptionMaster.textContent = currentOption.textContent;
    OptionMaster.dataset.value = currentOption.dataset.value;

    const selectedElement = ContainerOptions.current.querySelector('.selected');
    if (selectedElement) selectedElement.classList.remove('selected');

    currentOption.classList.add('selected');
    ContainerOptions.current.classList.remove('show');
    ChangeStyle();
  }

  const handleClickTrigger = () => {
    ContainerOptions.current.classList.toggle('show');
  }

  //agrega evento click para el documento
  useEffect(() => {
    document.onclick = (e) => {
      if (!ContainerTrigger.current.contains(e.target) && !ContainerOptions.current.contains(e.target))
        ContainerOptions.current.classList.remove('show');
    }
  
    return () => {
      document.onclick = null;
    };
  }, []);

  return (
    <div className="selector_wrapper2">
      <div id="select_trigger" onClick={handleClickTrigger} ref={ContainerTrigger}>
        <span id="trigger" data-value="side2">Select a mode</span>
      </div>
      <div id="select_options" ref={ContainerOptions}>
        <div id="container_options">
          <table id="mytable">
            <tbody>
              <tr><th data-value="oneView" onClick={(e) => handleClickOptions(e)}>One view</th></tr>
              <tr><th data-value="2Side" onClick={(e) => handleClickOptions(e)}>Side by Side</th></tr>
              <tr><th data-value="canvas" onClick={(e) => handleClickOptions(e)}>Canvas</th></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

HandleSelectorModes.propTypes = {
  RefBlank: PropTypes.object,
  CurrentTextarea: PropTypes.object,
  ShowCanvas: PropTypes.bool,
  SetShowCanvas: PropTypes.func
};