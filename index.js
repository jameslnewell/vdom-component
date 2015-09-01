var h = require('virtual-dom/h');
var Component = require('./lib/component');

module.exports = h;
module.exports.component = function(module, props) {
  return new Component(module, props);
};