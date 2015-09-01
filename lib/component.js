var
  createElement = require('virtual-dom/create-element'),
  diff          = require('virtual-dom/diff'),
  patch         = require('virtual-dom/patch')
;

/**
 * Component
 * @param   {{controller: Object, view: function()}}  component
 * @param   {{}}                                      props
 * @constructor
 */
function Component(component, props) {

  this.el     = null;
  this.vel    = null;

  //initialise the controller, props and state
  this.controller = Object.create(component.controller || {});
  this.controller.props = props || {};
  this.controller.state = {};

  //initialise the view
  this.view = component.view;

  //initialise the controller
  if (typeof(this.controller.onInit) === 'function') {
    this.controller.onInit();
  }

}

Component.prototype.name = 'Component';
Component.prototype.type = 'Widget';

/**
 * Called when the component is being created for the first time
 * @returns {HTMLElement}
 */
Component.prototype.init = function() {

  this.vel  = this.render();
  this.el   = createElement(this.vel);

  if (typeof(this.controller.onAttach) === 'function') {
    this.controller.onAttach(this.el);
  }

  return this.el;
};

/**
 * Called when the component is being updated
 * @returns {HTMLElement|null} When a new element is returned the old element is replaced
 */
Component.prototype.update = function(previousComponent, previousElement){

  //persist the controller state
  this.controller.state = previousComponent.controller.state;

  this.vel  = this.render();
  this.el   = patch(previousElement, diff(previousComponent.vel, this.vel));

  //the element has changed so mount the new element
  if (this.el !== previousElement) {
    if (typeof(this.controller.onAttach) === 'function') {
      this.controller.onAttach(this.el);
    }
  }

  //TODO: decide whether to render again - return
  return null;
};

/**
 * Called when the widget is being removed from the dom
 */
Component.prototype.destroy = function(domNode){

  if (typeof(this.controller.onDetach) === 'function') {
    this.controller.onDetach(domNode);
  }

  this.el   = null;
  this.vel  = null;

};

Component.prototype.render = function() {
  return this.view(this.controller);
};

module.exports = Component;