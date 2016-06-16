var express = require('express');
var fs = require('fs');
var isType = require('../condition/is-type');

var router = express.Router();
var maxId = 0;

fs.readFile('./condition/max-id.json','UTF-8', function (err, data){
    if(err){
        return;
    }
    var maxIdObject = JSON.parse(data);
    maxId = maxIdObject.maxId;
});

router.post('/', function (req, res) {
    fs.readFile('./fixtures.json', 'UTF-8', function (err, data) {
        var items = JSON.parse(data);

        if (false === isType(req.body.barcode, req.body.name, req.body.unit, req.body.price, res))
            return;

        maxId++;

        if (items.length === 0) {
            items.push({
                id: 1, barcode: req.body.barcode,
                name: req.body.name, unit: req.body.unit, price: req.body.price, nextId: maxId + 1
            });
        } else {
            items.push({
                id: maxId, barcode: req.body.barcode,
                name: req.body.name, unit: req.body.unit, price: req.body.price, nextId: maxId + 1
            });
        }
        
        fs.writeFile('./fixtures.json', JSON.stringify(items), function () {
            res.status(200).json({
                id: maxId, barcode: req.body.barcode, name: req.body.name,
                unit: req.body.unit, price: req.body.price
            });
        });

        fs.writeFile('./condition/max-id.json',JSON.stringify({maxId:maxId}));
    });
});

module.exports = router;