import { useRef, useEffect, useState } from 'react';
import './customSelectStyle.css';
import PropTypes from 'prop-types';


export default function MyTest({getRef}){
  const [groups, setGroups] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const select_trigger = useRef(null), triggerRef = useRef(null),
        optionsRef = useRef(null), selectOptionsRef = useRef(null);
  
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

      const optiongroups = Array.from(arrFiles).map(i => <span key={i.id} className="option" data-parent={i.id}>{i.id}</span>)
      
      setGroups(optiongroups);
    }

    return () => {
      observer.disconnect();
    }

  }, [getRef]);

  function handleTriggerClick() {
    const selectOptions = selectOptionsRef.current;
    const options = optionsRef.current.querySelectorAll('.option');

    selectOptions.classList.toggle('show');

    options.forEach(option => {
      option.addEventListener('click', () => {
        triggerRef.current.dataset.value = option.dataset.value;
        triggerRef.current.dataset.amount = option.dataset.amount;
        triggerRef.current.textContent = option.textContent;

        if (selectedOption) selectedOption.classList.remove('selected');
        option.classList.add('selected');
        setSelectedOption(option);

        selectOptions.classList.remove('show');

        for(const children of getRef.current.childNodes){
          if(children.id === option.dataset.parent){
            // console.log(children);
            children.classList.remove('hidden');

            //modificar
            children.querySelector('#editor').select();
          }
          else{
            children.classList.add('hidden');
          }
        }
      })
    });
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (!select_trigger.current.contains(event.target))
        selectOptionsRef.current.classList.remove('show');
    }
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="selector_wrapper">
        <div id="select_trigger" onClick={handleTriggerClick} ref={select_trigger}>
          <span id="trigger" data-value="random" ref={triggerRef}>Select a file</span>
        </div>
        <div id="select_options" ref={selectOptionsRef}>
          <div id="container_options" ref={optionsRef}>
            {groups}
          </div>
        </div>
    </div>
  );
}

MyTest.propTypes = {
  getRef: PropTypes.object
}