export default function(element, ContainerOptions, ContainerTrigger) {

  ContainerTrigger.firstElementChild.textContent = element.textContent;
  //puede causar bugs
  ContainerTrigger.firstElementChild.dataset.value = element.dataset.value;

  const selectedElement = ContainerOptions.querySelector('.selected');
  if (selectedElement) selectedElement.classList.remove('selected');

  element.classList.add('selected');
  ContainerOptions.classList.remove('show');


  document.addEventListener('mousedown', (e) => {
    if (!ContainerTrigger.contains(e.target) && !ContainerOptions.contains(e.target))
      ContainerOptions.classList.remove('show');
  });
  
  document.addEventListener('mouseup', () => {
    document.onmousedown = null;
    document.onmouseup = null;
  });
}