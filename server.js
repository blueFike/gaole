var express = require("express");
var bodyParser = require('body-parser');

var file = require("./condition/is-exist-file");
var routeItems = require("./routes/get-items");
var routeItem = require("./routes/get-item");
var routeInsertItem = require("./routes/insert-item");
var routeDeleteItem = require("./routes/delete-item");
var routeUpdateItem = require("./routes/update-item");

var app = express();
                    
app.use(bodyParser.json());
app.use('/items', routeItems);
app.use('/items', routeItem);
app.use('/items', routeInsertItem);
app.use('/items', routeDeleteItem);
app.use('/items', routeUpdateItem);


app.listen(3000);

module.exports = app;