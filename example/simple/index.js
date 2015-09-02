var h = require('virtual-dom/h');
var queue = require('vdom-render-queue');
var component = require('../..');

// --- define the component ---

var App = {

  controller: {

    $init: function() {
      this.state.count = 0;
    },

    onClick: function() {
      this.state.count++;
    },

    render: function() {
      return h('div', [
        h('span', {'g-xs': 'cols:6'}, ['Clicked ', ctl.state.count, ' times!']),
        h('button', {onclick: this.onClick.bind(this)}, 'Increment')
      ]);
    }

  }

};

// --- render the component ---

var render = queue(document.getElementById('app'), function() {
  return component(App);
});

//render the game at 60fps - TODO: find a better way of rendering
function loop() {
  render();
  setTimeout(loop, 16.6666666667);
}

loop();