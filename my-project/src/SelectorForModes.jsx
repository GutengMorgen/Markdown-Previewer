import { useRef, useEffect } from "react";
import PropTypes from 'prop-types';
import './selectwithtable.css';


export default function HandleSelectorModes({getRefBlank, refCurrentTextarea, getSetShowCanvas}){
  const ContainerOptions = useRef(null), ContainerTrigger = useRef(null);

  const ChangeStyle = () => {
    //obtiene el div files que no contiene la clase hidden
    const currentFile = getRefBlank.current.querySelector('div:not(.hidden)');
    const OptionMaster = ContainerTrigger.current.firstChild;
    const value = OptionMaster.dataset.value;

    for (const textarea of currentFile.childNodes){
      if (value === 'oneView'){
        if(refCurrentTextarea.parentNode.id === currentFile.id && refCurrentTextarea !== textarea){
          //problablemente deberia clear una clase hidden solo para textarea
          textarea.classList.add('hidden');
        }
      }
      else if (value === '2Side'){
        textarea.classList.remove('hidden');
      }
    }
    
    if (value === 'canvas'){
      // console.log(currentFile);
      currentFile.classList.add('hidden');
      getSetShowCanvas(true);
    }
  }

  const handleClickOptions = (event) => {
    const currentOption = event.target;
    const OptionMaster = ContainerTrigger.current.firstChild;
    OptionMaster.textContent = currentOption.textContent;
    OptionMaster.dataset.value = currentOption.dataset.value;

    const selectedElement = ContainerOptions.current.querySelector('.selected');
    if (selectedElement) {
      selectedElement.classList.remove('selected');
    }

    currentOption.classList.add('selected');
    ContainerOptions.current.classList.remove('show');
    ChangeStyle();
  }

  const handleClickTrigger = () => {
    ContainerOptions.current.classList.toggle('show');
  }

  //agrega evento click para el documento
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!ContainerTrigger.current.contains(event.target) && !ContainerOptions.current.contains(event.target))
        ContainerOptions.current.classList.remove('show');
    }
    document.addEventListener('click', handleClickOutside);
  
    return () => {
      document.removeEventListener('click', handleClickOutside);
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
              <tr><th data-value="oneView" onClick={(event) => handleClickOptions(event)}>One view</th></tr>
              <tr><th data-value="2Side" onClick={(event) => handleClickOptions(event)}>Side by Side</th></tr>
              <tr><th data-value="canvas" onClick={(event) => handleClickOptions(event)}>Canvas</th></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

HandleSelectorModes.propTypes = {
  getRefBlank: PropTypes.object,
  refCurrentTextarea: PropTypes.object,
  getSetShowCanvas: PropTypes.func
};