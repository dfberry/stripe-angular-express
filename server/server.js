'use strict';

var express = require('express');
var wagner = require('wagner-core');
var path = require('path');

require('./dependencies')(wagner);
require('./models')(wagner);

module.exports = function(logging) {
  var app = express();
  
  if(logging){
    app.use(require('morgan')('combined'));
  }

    app.get(['/'], function (req, res) {
        res.sendFile(path.join(__dirname + '/../public/default.html'));
    });
    
    app.get(['/charge'], function (req, res){

    });
    
    app.use('/api/v1', require('./api')(wagner));
    app.use('/public', express.static(__dirname + '/../public', {   maxAge: 4 * 60 * 60 * 1000 /* 2hrs */ }));

  return app;
};






