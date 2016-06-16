var express = require('express');
var fs = require('fs');
var isContained = require('../condition/is-exist-id');

var router = express.Router();

router.get('/:id', function (req, res) {
    var id = req.params.id;

    fs.readFile('./fixtures.json', 'UTF-8', function (err, data) {
        var items = JSON.parse(data);

        if (false === isContained(items, res, id))
            return;
        
        for (var i = 0; i < items.length; i++) {
            if (items[i].id === parseInt(id)) {
                res.status(200).json({
                    id: items[i].id, barcode: items[i].barcode, name: items[i].name,
                    unit: items[i].unit, price: items[i].price
                });
                break;
            }
        }
    });
});

module.exports = router;

