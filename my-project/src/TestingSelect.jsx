import { useRef, useEffect, useState } from 'react';
import './selectwithtable.css';
import PropTypes from 'prop-types';


function nigger (currentOption, currentFile) {
  const editor = currentFile.querySelector('#editor');
  const preview = currentFile.querySelector('#preview');

  switch (currentOption.dataset.id) {
    case 'editor':
      if(editor.classList.contains('hidden')){
        editor.classList.remove('hidden');
        editor.classList.add('oneView');
        preview.classList.add('hidden');
      }
      else{
        preview.classList.add('hidden');
        editor.classList.add('oneView');
      }
    break;

    case 'preview':
      if(preview.classList.contains('hidden')){
        preview.classList.remove('hidden');
        preview.classList.add('oneView');
        editor.classList.add('hidden');
      }
      else{
        editor.classList.add('hidden');
        preview.classList.add('oneView');
      }
    break;
  
    default:
      if(preview.classList.contains('hidden') || editor.classList.contains('hidden')){
        editor.classList.remove('hidden');
        preview.classList.remove('hidden');
        editor.classList.remove('oneView');
        preview.classList.remove('oneView');
      }
    break;
  }
  // console.log(currentOption);
}

function HandleNigger(e, RefBlank, ContainerTrigger, ContainerOptions) {
  const currentOption = e.target;
  ContainerTrigger.firstChild.textContent = currentOption.textContent;

  const selectedElement = ContainerOptions.querySelector('.selected');
  if (selectedElement) selectedElement.classList.remove('selected');

  currentOption.classList.add('selected');
  ContainerOptions.classList.remove('show');


  const getFileId = currentOption.getAttribute('data-file-id');
  const handleChildNodes = () => {
    for(const children of RefBlank.childNodes){
      if(children.id === getFileId){
        children.classList.remove('hidden');
        nigger(currentOption, children);
      }
      else{
        children.classList.add('hidden');
      }
    }
  }
  handleChildNodes();
}

export default function MyTest({RefBlank, ShowCanvas}){
  const [groups, setGroups] = useState([]);
  const ContainerTrigger = useRef(null), ContainerOptions = useRef(null);

  useEffect (() => {
    const observer = new MutationObserver(handleMutation);
    const config = { childList: true };
    observer.observe(RefBlank.current, config);

    function handleMutation(mutationList) {
      for (let mutation of mutationList){
        if (mutation.type === 'childList'){
          UpdateOptions();
          break;
        }
      }
    }

    function UpdateOptions() {
      const arrFiles = RefBlank.current.childNodes;

      const optiongroups = Array.from(arrFiles).map(i => 
        <tbody key={i.id}>
          <tr>
            <th colSpan={2} onClick={(e) => HandleNigger(e, RefBlank.current ,ContainerTrigger.current, ContainerOptions.current)}
            data-id='general' data-file-id={i.id}>{i.id}</th>
          </tr>
          <tr>
            <td onClick={(e) => HandleNigger(e, RefBlank.current, ContainerTrigger.current, ContainerOptions.current)}
            data-id="editor" data-file-id={i.id}>Editor</td>
            <td onClick={(e) => HandleNigger(e, RefBlank.current, ContainerTrigger.current, ContainerOptions.current)}
            data-id="preview" data-file-id={i.id}>Preview</td>
          </tr>
        </tbody>
      )
      setGroups(optiongroups);
    }

    /*************agrega evento click para el documento***********/
    document.onclick = (e) => {
      if (!ContainerTrigger.current.contains(e.target) && !ContainerOptions.current.contains(e.target))
        ContainerOptions.current.classList.remove('show');
    }
    /*************agrega evento click para el documento***********/

    return () => {
      observer.disconnect();
      document.onclick = null;
    }

  }, [RefBlank, ShowCanvas]);

  function handleTriggerClick() {
    //solucion de mierda
    if(!ShowCanvas)
      ContainerOptions.current.classList.toggle('show');
    else
      ContainerOptions.current.classList.remove('show');
  }

  return (
    <div className="selector_wrapper">
        <div id="select_trigger" ref={ContainerTrigger}  onClick={handleTriggerClick}>
          <span id="trigger">Select a file</span>
        </div>
        <div id="select_options" ref={ContainerOptions}>
          <div id="container_options">
            <table id='mytable'>
            {groups}
            </table>
          </div>
        </div>
    </div>
  );
}

MyTest.propTypes = {
  RefBlank: PropTypes.object,
  ShowCanvas: PropTypes.bool
}