import { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ScrollToElement from "./ScrollToElement";
import protoType from './protoTypex';

export default function SelectFiles({RefBlank, IsCanvas, IsCreate, SetIsCreate}){

  const [groups, setGroups] = useState([]);
  const ContainerTrigger = useRef(null), ContainerOptions = useRef(null);
  useEffect (() => {
      const handleClickOptions = (e) => {
        protoType(e.target, ContainerOptions.current, ContainerTrigger.current);

        const file_id = e.target.getAttribute('data-file-id');
        const file = RefBlank.current.firstElementChild.querySelector(`#${file_id}`);

        if (file) {
          const textarea_id = e.target.dataset.id;
          const textarea = file.querySelector(`#${textarea_id}`);
          if (textarea) ScrollToElement(textarea, RefBlank.current);
          else ScrollToElement(file, RefBlank.current);
        }
      }

      const arrFiles = RefBlank.current.firstElementChild.childNodes;
      const optiongroups = Array.from(arrFiles).map(i => 
        <tbody key={i.id}>
          <tr>
            <th colSpan={2} data-id='file' data-file-id={i.id} onClick={IsCanvas ? null : handleClickOptions}>{i.id}</th>
          </tr>
          <tr>
            <td data-id="editor" data-file-id={i.id} onClick={IsCanvas ? handleClickOptions : null}>Editor</td>
            <td data-id="preview" data-file-id={i.id} onClick={IsCanvas ? handleClickOptions : null}>Preview</td>
          </tr>
        </tbody>
      )
      setGroups(optiongroups);
      SetIsCreate(false);
    
  }, [RefBlank, IsCanvas, IsCreate, SetIsCreate]);

  const handleClickTrigger = () => ContainerOptions.current.classList.toggle('show');

  return (
    <div className="selector_wrapper">
        <div id="select_trigger2" ref={ContainerTrigger} onClick={handleClickTrigger}>
          <span id="trigger2">List</span>
        </div>
        <div id="select_options2" ref={ContainerOptions}>
          <div id="container_options">
            <table id='mytable'>
            {groups}
            </table>
          </div>
        </div>
    </div>
  );
}

SelectFiles.propTypes = {
  RefBlank: PropTypes.object,
  IsCanvas: PropTypes.bool,
  IsCreate: PropTypes.bool,
  SetIsCreate: PropTypes.func
}