var c       = require('..');
var render  = require('./render');
var live    = require('vdom-live');

var App = {

  controller: {

    onAttach: function(el) {
      console.log('attached:', el);
    },

    onDetach: function(el) {
      console.log('detached:', el);
    },

    onClick: function() {
      console.log('click', this.state.count);
      if (!this.state.count) {
        this.state.count = 0;
      }
      this.state.count++;
    }

  },

  view: function(ctl) {
    return c('section', [
      c('h1', 'Hello '+(ctl.props.name || 'World')+'!'),
      c('button', 'Count: '+(ctl.state.count || '0')),
      c('button', {onclick: ctl.onClick.bind(ctl)}, 'Increment')
    ]);
  }

};

render(document.getElementById('app'), c.component(App, {name: 'Loren'}));
render(document.getElementById('app'), c.component(App, {name: 'James'}));

function raf() {
  render(document.getElementById('app'), c.component(App, {name: 'James'}));
  window.setTimeout(raf, 500);
}

//raf()

live(function(render) {
  render(c.component(App, {name: 'James'}));
  console.log('rendered');
});

//TODO: get https://github.com/unframework/vdom-live or https://github.com/angular/zone.js working or wrap xhr etc