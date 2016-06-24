var express = require('express');
var fs = require('fs');
var router = express.Router();

router.delete('/:id', function (req, res, next) {
    var id = req.params.id;

    fs.readFile('./fixtures.json', 'UTF-8', function (err, data) {
        if (err) return next(err);

        var items = JSON.parse(data);
        var isContained = false;

        for (var i = 0; i < items.length; i++) {
            if (items[i].id === parseInt(id)) {
                items.splice(i, 1);
                isContained = true;
            }
        }

        if (isContained === false) {
            res.status(404).send("");
        } else {
            fs.writeFile('./fixtures.json', JSON.stringify(items), function (err, data) {
                if (err) return next(err);
            });
            
            res.status(204).send("");
        }
    });
});

module.exports = router;
