var express = require("express");
var bodyParser = require('body-parser');

var file = require("./condition/isExistFile");
var routeItems = require("./routes/get_items");
var routeItem = require("./routes/get_item");
var routeInsertItem = require("./routes/insert_item");
var routeDeleteItem = require("./routes/delete_item");
var routeUpdateItem = require("./routes/update_item");

var app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/items', routeItems);
app.use('/items', routeItem);
app.use('/items', routeInsertItem);
app.use('/items', routeDeleteItem);
app.use('/items', routeUpdateItem);


app.listen(3000);

module.exports = app;