var controllers = require('./mini_controller');
var directives = require('./mini_directives');

var _ = require('underscore');

var components = angular.module('mini-app.components', ['ng']);

_.each(directives, function(directive, name) {
  components.directive(name, directive);
});

_.each(controllers, function(controller, name) {
  components.controller(name, controller);
});

var app = angular.module('mini-app', ['mini-app.components', 'ngRoute']);

