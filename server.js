var express = require('express');
var app = express(); 

require('./server/routes/index');

app.use(express.static(__dirname)); 
app.use(require('./server/routes'));

app.listen(8001); 
console.log('Server started at localhost:8001');

module.exports = app;
