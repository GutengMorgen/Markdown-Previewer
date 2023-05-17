
export default function (Element, RefBlank){
  const padding = 4;

  RefBlank.scrollLeft = Element.offsetLeft - padding;
  RefBlank.scrollTop = Element.offsetTop - padding;
}