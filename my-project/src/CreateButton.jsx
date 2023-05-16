import { useState } from "react";
import PropTypes from 'prop-types';
import dragElement from "./dragElement";

export default function CreateButton(props){
  const [count, setCount] = useState(1);

  function HandleClickButtonInside() {
    setCount(count + 1);

    const canvas = props.refBlank.current.firstElementChild;

    const lastChild = canvas.lastElementChild;
    const clone = lastChild.cloneNode(true);
    clone.id = `file${count}`;

    for(const textarea of clone.childNodes){

      textarea.onclick = (e) => props.SetCurrentTextarea(e.target);
      textarea.placeholder = `${textarea.id} ${count}`;
      textarea.value = null;
      if(props.IsCanvas){
        textarea.style = 'width: 22em; height: 22em';
        dragElement(textarea, null, true);
      }
      else{
        clone.classList.add('filesOutCanvas');
      }
      
    }
    canvas.appendChild(clone);
    
    props.SetIsCreate(true);
  }

  return (
    <button onClick={HandleClickButtonInside} className='defaultButton'>New</button>
  );
}

CreateButton.propTypes = {
  refBlank: PropTypes.object,
  SetCurrentTextarea: PropTypes.func,
  IsCanvas: PropTypes.bool,
  SetIsCreate: PropTypes.func

}