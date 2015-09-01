var component = require('..');
var queue     = require('vdom-render-queue');
var App       = require('./components/App');

var render = queue(document.getElementById('app'), function() {
  return component(App, {name: 'Loren', render: function() {render();}});
});

render();

//TODO: get https://github.com/angular/zone.js working or wrap xhr etc