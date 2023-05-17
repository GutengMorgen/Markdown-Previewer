export default function(element, parent) {
  let initialX, initialY;

  element.onmousedown = (e) => {

    if(e.button !== 2) return;

    if(parent === null)
    {
      element.style.top = (element.offsetTop) + "px";
      element.style.left = (element.offsetLeft) + "px";
      element.style.position = 'absolute';
    }

    element.style.cursor = 'grabbing';
    initialX = e.clientX;
    initialY = e.clientY;

    e.stopPropagation();
    e.preventDefault();
    document.addEventListener('mousemove', elementDrag);
    document.addEventListener('mouseup', closeDragElement);
  };

  const elementDrag = (e) => {
    e.preventDefault();
    const deltaX = initialX - e.clientX;
    const deltaY = initialY - e.clientY;

    if(parent === null)
    {
      element.style.top = (element.offsetTop - deltaY) + "px";
      element.style.left = (element.offsetLeft - deltaX) + "px";
    }
    else
    {
      parent.scrollLeft += deltaX;
      parent.scrollTop += deltaY;
    }

    initialX = e.clientX;
    initialY = e.clientY;
  };

  const closeDragElement = () => {
    document.removeEventListener('mouseup', closeDragElement);
    document.removeEventListener('mousemove', elementDrag);
    element.style.cursor = 'auto';
  };

  element.oncontextmenu = (e) => e.preventDefault();
}

/*implementa limites*/
/*
export default function(element, parent, container){
  let initialX, initialY;

  const elementRect = element.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();
  const maxX = containerRect.width - elementRect.width;
  const maxY = containerRect.height - elementRect.height;

  element.onmousedown = (e) => {

    if(e.button !== 2) return;

    if(parent === null)
    {
      element.style.top = (element.offsetTop) + "px";
      element.style.left = (element.offsetLeft) + "px";
      element.style.position = 'absolute';
    }

    element.style.cursor = 'grabbing';
    initialX = e.clientX;
    initialY = e.clientY;

    e.stopPropagation();
    e.preventDefault();
    document.addEventListener('mousemove', elementDrag);
    document.addEventListener('mouseup', closeDragElement);
  };

  const elementDrag = (e) => {
    e.preventDefault();
    const deltaX = initialX - e.clientX;
    const deltaY = initialY - e.clientY;

    if(parent === null)
    {
      let left = element.offsetLeft - (initialX - e.clientX);
      let top = element.offsetTop - (initialY - e.clientY);
      if (left < 0)
      {
        left = 0;
      }
      else if (left > maxX)
      {
        left = maxX;
      }
      if (top < 0)
      {
        top = 0;
      }
      else if (top > maxY)
      {
        top = maxY;
      }
      element.style.left = `${left}px`;
      element.style.top = `${top}px`;
    }
    else
    {
      parent.scrollLeft += deltaX;
      parent.scrollTop += deltaY;
    }

    initialX = e.clientX;
    initialY = e.clientY;
  };

  const closeDragElement = () => {
    document.removeEventListener('mouseup', closeDragElement);
    document.removeEventListener('mousemove', elementDrag);
    element.style.cursor = 'auto';
  };

  element.oncontextmenu = (e) => e.preventDefault();
}
*/