var express = require('express');
var fs = require('fs');
var isContained = require('../condition/isExistId');
var isType = require('../condition/isType');

var router = express.Router();

router.put('/:id', function (req, res) {
    var id = req.params.id;

    fs.readFile('./fixtures.json', 'UTF-8', function (err, data) {
        var items = JSON.parse(data);

        isContained(items, res, id);
        isType(req.body.barcode, req.body.name, req.body.unit, req.body.price, res);

        for (var i = 0; i < items.length; i++) {
            if (items[i].id === parseInt(id)) {
                items[i] = {
                    id: items[i].id, barcode: req.body.barcode,
                    name: req.body.name, unit: req.body.unit, price: req.body.price, nextId: items[i].nextId
                };
                fs.writeFile('./fixtures.json', JSON.stringify(items), function (err, data) {
                    res.status(201).json({
                        id: items[i].id, barcode: req.body.barcode,
                        name: req.body.name, unit: req.body.unit, price: req.body.price, nextId: items[i].nextId
                    });
                });
                break;
            }
        }
    });
});

module.exports = router;


