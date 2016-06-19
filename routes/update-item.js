var express = require('express');
var fs = require('fs');
var isContained = require('../condition/is-exist-id');
var isType = require('../condition/is-type');

var router = express.Router();
var fixturesFile = './fixtures.json';

router.put('/:id', function (req, res) {
    var id = req.params.id;
    updateData(res, req, id);
});

function updateData(res, req, id){
    fs.readFile(fixturesFile, 'UTF-8', function (err, data) {
        var items = JSON.parse(data);

        isContained(items, res, id);

        if (false === isType(req.body.barcode, req.body.name, req.body.unit, req.body.price, res))
            return;

        for (var i = 0; i < items.length; i++) {
            if (items[i].id === parseInt(id)) {
                items[i]  = {
                    id: items[i].id,
                    barcode: req.body.barcode,
                    name: req.body.name,
                    unit: req.body.unit,
                    price: req.body.price
                };
                writeData(items, res, req, items[i].id);
                break;
            }
        }
    });
}

function writeData(items, res, req, id) {
    fs.writeFile(fixturesFile, JSON.stringify(items), function () {
        res.status(201).json({
            id: id,
            barcode: req.body.barcode,
            name: req.body.name,
            unit: req.body.unit,
            price: req.body.price
        });
    });
}

module.exports = router;
