
export default function (Element, RefBlank){
  const padding = 5;

  RefBlank.scrollLeft = Element.offsetLeft - padding;
  RefBlank.scrollTop = Element.offsetTop - padding;
}