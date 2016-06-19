var express = require('express');
var router = express.Router();
var fs = require('fs');

router.get('/', function (req, res) {
    readData(res, res);
});

function readData(res, res) {
    fs.readFile('./fixtures.json', 'UTF-8', function (err, data) {
        var items = JSON.parse(data);

        if (err) {
            res.status(500).send(err);
            return;
        }

        if (data == null) {
            res.status(404).send("");
            return;
        }

        res.status(200).json(itemsInfo(items));
    });
}

function itemsInfo(items) {
    var goods = [];
    for (var i = 0; i < items.length; i++) {
        goods.push({
            id: items[i].id, barcode: items[i].barcode, name: items[i].name,
            unit: items[i].unit, price: items[i].price
        });
    }

    return goods;
}

module.exports = router;
