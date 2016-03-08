'use strict';
var config = require('./config.json')
    , app = require('./server');

var server = app().listen(config.port.stage, function(){
    console.log("listening on port " + config.port.stage);
});