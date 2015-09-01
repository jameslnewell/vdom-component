var h = require('virtual-dom/h');
var queue = require('vdom-render-queue');
var component = require('../..');

// --- define the component ---

var App = {

  controller: {

    onInit: function() {
      this.state.count = 0;
    },

    onClick: function() {
      this.state.count++;
      this.props.render(); //TODO: will address rendering in a future component
    }

  },

  view: function(ctl) {
    return h('div', [
      h('span', ['Clicked ', ctl.state.count, ' times!']),
      h('button', {onclick: ctl.onClick.bind(ctl)}, 'Increment')
    ]);
  }

};

// --- render the component ---

var render = queue(document.getElementById('app'), function() {
  return component(App, {render: render});
});

render();
