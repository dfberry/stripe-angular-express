'use strict';
var config = require('./config.json')
    , app = require('./server')
    , logging = true

var server = app(logging).listen(config.port.stage, function(){
    console.log("listening on port " + config.port.stage);
});