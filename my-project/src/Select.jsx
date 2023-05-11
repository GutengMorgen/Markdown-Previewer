import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export function MySelect({getRef}){
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const observer = new MutationObserver(handleMutation);

    const config = { childList: true };

    observer.observe(getRef.current, config);

    function handleMutation(mutationList) {
      for (let mutation of mutationList){
        if(mutation.type === 'childList'){
          UpdateOptions();
          break;
        }
      }
    }


    function UpdateOptions() {
      const arrFiles = getRef.current.childNodes;
      const optiongroups = Array.from(arrFiles).map(i => <optgroup key={i.id} label={i.id}>
        <option value="Editor" data-parent={i.id}>{i.childNodes[0].id}</option>
        <option value="Preview" data-parent={i.id}>{i.childNodes[1].id}</option>
        </optgroup>);

      setGroups(optiongroups);
      // console.log(arrFiles);
    }

    return () => {
      observer.disconnect();
    }
  }, [getRef]);
  

  const handleChangeSelect = (event) => {
    console.log(event.target.dataset.parent);
  }

  return (
    <div>
      <select id="myselect" onChange={handleChangeSelect}>
        {groups}
      </select>
    </div>
  )
}

MySelect.propTypes = {
  getRef: PropTypes.object
}