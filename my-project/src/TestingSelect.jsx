import { useRef, useEffect, useState, useCallback } from 'react';
import './selectwithtable.css';
import PropTypes from 'prop-types';


function nigger (currentOption, currentFile) {
  const editor = currentFile.querySelector('#editor');
  const preview = currentFile.querySelector('#preview');

  switch (currentOption.dataset.id) {
    case 'editor':
      if(editor.classList.contains('hidden')){
        editor.classList.remove('hidden');
        preview.classList.add('hidden');
      }
      else{
        preview.classList.add('hidden');
      }
    break;

    case 'preview':
      if(preview.classList.contains('hidden')){
        preview.classList.remove('hidden');
        editor.classList.add('hidden');
      }
      else{
        editor.classList.add('hidden');
      }
    break;
  
    default:
      if(preview.classList.contains('hidden') || editor.classList.contains('hidden')){
        editor.classList.remove('hidden');
        preview.classList.remove('hidden');
      }
    break;
  }

  // console.log(currentOption);
}

export default function MyTest({getRef}){
  const [groups, setGroups] = useState([]);
  const ContainerTrigger = useRef(null), ContainerOptions = useRef(null);

  const handleClickOptions = useCallback((event) => {
    const currentOption = event.target;
    ContainerTrigger.current.firstChild.textContent = currentOption.textContent;

    //usar querySelectorAll si aparece algun bug
    const selectedElement = ContainerOptions.current.querySelector('.selected');
    if (selectedElement) selectedElement.classList.remove('selected');

    currentOption.classList.add('selected');
    ContainerOptions.current.classList.remove('show');


    const getFileId = currentOption.closest('tbody').getAttribute('data-file-id');
    const handleChildNodes = () => {
      for(const children of getRef.current.childNodes){
        if(children.id === getFileId){
          // console.log(children);
          children.classList.remove('hidden');
  
          //modificar
          // children.querySelector('#editor').select();
          // console.log(children.childNodes);
          // console.log(currentOption.dataset.id)
          
          
          nigger(currentOption, children);
        }
        else{
          children.classList.add('hidden');
        }
      }
    }
    handleChildNodes();

  }, [getRef]);

  useEffect (() => {
    const observer = new MutationObserver(handleMutation);
    const config = { childList: true };
    observer.observe(getRef.current, config);

    function handleMutation(mutationList) {
      for (let mutation of mutationList){
        if (mutation.type === 'childList'){
          UpdateOptions();
          break;
        }
      }
    }

    function UpdateOptions() {
      const arrFiles = getRef.current.childNodes;
      const optiongroups = Array.from(arrFiles).map(i => 
          <tbody key={i.id} data-file-id={i.id}>
            <tr>
              <th colSpan={2} onClick={(event) => handleClickOptions(event)} data-id='general'>{i.id}</th>
            </tr>
            <tr>
              <td onClick={(event) => handleClickOptions(event)} data-id="editor">Editor</td>
              <td onClick={(event) => handleClickOptions(event)} data-id="preview">Preview</td>
            </tr>
          </tbody>
        )
      
      setGroups(optiongroups);
    }

    return () => {
      observer.disconnect();
    }

  }, [getRef, handleClickOptions]);

  const handleTriggerClick = () => ContainerOptions.current.classList.toggle('show');

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
    <div className="selector_wrapper">
        <div id="select_trigger" onClick={handleTriggerClick} ref={ContainerTrigger}>
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
  getRef: PropTypes.object
}