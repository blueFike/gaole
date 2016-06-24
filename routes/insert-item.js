var express = require('express');
var fs = require('fs');
var isType = require('../condition/is-type');

var router = express.Router();
var maxIdFile = './condition/max-id.json';
var fixturesFile = './fixtures.json';
var maxId = 0;

fs.stat(maxIdFile, function (err, stat, next) {
    var fileFound = stat && stat.isFile();
    if (fileFound) {
        var data = fs.readFileSync(maxIdFile, 'UTF-8');
        var maxIdObject = JSON.parse(data);
        maxId = maxIdObject.maxId;
    } else {
        return next(err);
    }
});

router.post('/', function (req, res, next) {
    insertData(res, req, next);
});

function insertData(res, req, next) {
    fs.readFile(fixturesFile, 'UTF-8', function (err, data) {
        if (err) return next(err);

        var items = JSON.parse(data);
        var item = {
            id: maxId,
            barcode: req.body.barcode,
            name: req.body.name,
            unit: req.body.unit,
            price: req.body.price
        };
        var wrongType = isType(req.body.barcode, req.body.name,
            req.body.unit, req.body.price, res);
        if (false === wrongType)
            return;

        maxId++;

        if (items.length === 0) {
            items.push({
                id: 1,
                barcode: req.body.barcode,
                name: req.body.name,
                unit: req.body.unit,
                price: req.body.price
            });
        } else {
            items.push(item);
        }
        writeData(items, item, res, next);
        writeMaxId(maxId);
    });
}

function writeData(items, item, res, next) {
    fs.writeFile(fixturesFile, JSON.stringify(items), function (err) {
        if (err) return next(err);

        res.status(200).json(item);
    });
}

function writeMaxId(maxId) {
    fs.writeFile(maxIdFile, JSON.stringify({maxId: maxId}));
}

module.exports = router;
