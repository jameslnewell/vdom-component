var Component = require('./lib/component');

module.exports = function(module, props) {
  return new Component(module, props);
};

module.exports.widgetise = function(module) {
  return new Component(module);
};