import { useRef } from "react";
import PropTypes from 'prop-types';
import protoType from '../scripts js/protoTypex';
import ScrollToElement from "../scripts js/ScrollToElement";

function ChangeStyle(CurrentTextarea, actualFile, ContainerTrigger, SetIsCanvas) {

  const value = ContainerTrigger.current.firstElementChild.getAttribute('data-value');
  
  SetIsCanvas(value === 'canvas');

  for(const textarea of actualFile.children){
    textarea.classList.toggle('hidden', value === 'oneView' && CurrentTextarea !== textarea);
    textarea.classList.toggle('oneView', value === 'oneView' && CurrentTextarea === textarea);
  }
}

export default function SelectModes({RefBlank, CurrentTextarea, SetIsCanvas}){
  const ContainerOptions = useRef(null), ContainerTrigger = useRef(null);

  const handleClickOptions = (e) => {
    protoType(e.target, ContainerOptions.current, ContainerTrigger.current);
    
    if(CurrentTextarea !== null) {
      const actualFile = CurrentTextarea.parentNode;
      ChangeStyle(CurrentTextarea, actualFile, ContainerTrigger, SetIsCanvas);
      
      setTimeout(() => { //solucion de mierda
        ScrollToElement(actualFile, RefBlank.current);
      }, 300);
    }
    else{
      alert('Select any textarea');
    }
  }

  const handleClickTrigger = () => ContainerOptions.current.classList.toggle('show');

  return (
    <div className="selector_wrapper2">
      <div id="select_trigger" ref={ContainerTrigger} onClick={handleClickTrigger}>
        <span id="trigger" data-value="2Side">Modes</span>
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

SelectModes.propTypes = {
  RefBlank: PropTypes.object,
  CurrentTextarea: PropTypes.object,
  SetIsCanvas: PropTypes.func
};