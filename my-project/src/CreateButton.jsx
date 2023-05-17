import { useState } from "react";
import PropTypes from 'prop-types';
import dragElement from "./dragElement";

const otherFunction = (props, count) => {
  const parentNode = props.refBlank.current;
  const lastChild = parentNode.lastElementChild;
  //clona el primer div file
  const clone = lastChild.cloneNode(true);

  //oculta el ultimo div
  lastChild.classList.add('hidden');

  //agrega configuracion extra
  clone.classList.add('files');
  clone.id = `file${count}`;
  
  //agrega configuracion para los textarea
  for(const textarea of clone.childNodes){
    textarea.placeholder = `${textarea.id} ${count}`;
    textarea.value = null;
    textarea.onclick = (e) => props.SetCurrentTextarea(e.target);
  }
  props.refBlank.current.appendChild(clone);
}

const newFunction = (props, count) => {

  const parentNode = props.refBlank.current;
  const canvas = parentNode.firstElementChild;

  const lastChild = canvas.lastElementChild;
  const clone = lastChild.cloneNode(true);

  clone.id = `file${count}`;
  
  //agrega configuracion para los textarea
  for(const textarea of clone.childNodes){
    
    /* para que no copie las modificaciones cuando se arrastra los textarea (mejor usar una clase) */
    textarea.style.top = '';
    textarea.style.left = '';
    textarea.style.position = '';
    /*****************/

    textarea.placeholder = `${textarea.id} ${count}`;
    textarea.value = null;
    textarea.onclick = (e) => props.SetCurrentTextarea(e.target);
    dragElement(textarea, null);
  }
  canvas.appendChild(clone);
}

export default function CreateButton(props){
  const [count, setCount] = useState(1);

  function HandleClickButtonInside() {
    setCount(count + 1);

    if(!props.ShowCanvas)
      otherFunction(props, count);
    else
      newFunction(props, count);
  }

  return (
    <button onClick={HandleClickButtonInside}>+</button>
  );
}

CreateButton.propTypes = {
  refBlank: PropTypes.object,
  SetCurrentTextarea: PropTypes.func,
  ShowCanvas: PropTypes.bool
}