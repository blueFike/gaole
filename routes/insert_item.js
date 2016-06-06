var express = require('express');
var fs = require('fs');
var isType = require('../condition/isType');

var router = express.Router();
var nextId = 0;

router.post('/', function (req, res) {
    nextId++;
    fs.readFile('./fixtures.json', 'UTF-8', function (err, data) {
        var items = JSON.parse(data);

        if (false === isType(req.body.barcode, req.body.name, req.body.unit, req.body.price, res))
            return;

        if (items.length === 0) {
            items.push({
                id: 1, barcode: req.body.barcode,
                name: req.body.name, unit: req.body.unit, price: req.body.price, nextId: nextId + 1
            });
        } else {
            items.push({
                id: nextId, barcode: req.body.barcode,
                name: req.body.name, unit: req.body.unit, price: req.body.price, nextId: nextId + 1
            });
        }

        fs.writeFile('./fixtures.json', JSON.stringify(items), function (err, data) {
            res.status(201).json({
                id: nextId,
                barcode: req.body.barcode, name: req.body.name,
                unit: req.body.unit, price: req.body.price
            });
        });
    });
});

module.exports = router;


