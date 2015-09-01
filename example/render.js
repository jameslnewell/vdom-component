
var
  createElement = require('virtual-dom/create-element'),
  diff          = require('virtual-dom/diff'),
  patch         = require('virtual-dom/patch')
;

var prevVDOM, patches, oldEl;
function render(el, vtree) {
  oldEl = oldEl || el;
  var newEl;

  if (prevVDOM) {

    //patch the element
    newEl = patch(oldEl, diff(prevVDOM, vtree));

  } else {

    //replace the element (because we don't know what state it is in)
    newEl = createElement(vtree);
    oldEl.parentNode.replaceChild(newEl, oldEl);

  }

  oldEl = newEl;
  prevVDOM = vtree;
}

module.exports = render;

//TODO: Use https://github.com/azer/html-patcher instead