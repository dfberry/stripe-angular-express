/* comment */
var controllers = require('./controllers');
var directives = require('./directives');
var services = require('./services');
var models = require('./models');
var appconfig = require('./config');
var appconst = require('./const');

var _ = require('underscore');

var components = angular.module('stripe-app.components', ['ng']);

console.log();

_.each(controllers, function(controller, name) {
  components.controller(name, controller);
});

_.each(directives, function(directive, name) {
  components.directive(name, directive);
});

_.each(services, function(factory, name) {
  components.factory(name, factory);
});

_.each(appconfig, function(factory, name) {
  components.factory(name, factory);
});


_.each(appconst, function(factory, name) {
  components.factory(name, factory);
});

_.each(models, function(factory, name) {
  components.factory(name, factory);
});


var app = angular.module('stripe-app', ['stripe-app.components', 'ngRoute']);

