var express = require('express');
var wagner = require('wagner-core');
var path = require('path');

require('./dependencies')(wagner);

var app = express();

app.use(require('morgan')());

app.get(['/'], function (req, res) {
  res.sendFile(path.join(__dirname + '/../public/default.html'));
});
app.use('/api/v1', require('./api')(wagner));
app.use('/public', express.static(__dirname + '/../public', { maxAge: 4 * 60 * 60 * 1000 /* 2hrs */ }));

app.listen(3000);
console.log('Listening on port 3000!');