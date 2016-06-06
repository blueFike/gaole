var express = require('express');

var router = express.Router();
var fs = require('fs');

router.delete('/:id', function (req, res) {
    var id = req.params.id;
    
    fs.readFile('./fixtures.json', 'UTF-8', function (err, data) {
        var items = JSON.parse(data);
        var isContained = false;

        for (var i = 0; i < items.length; i++) {
            if (items[i].id === parseInt(id)) {
                items.splice(i, 1);
                isContained = true;
            }
        }

        fs.writeFile('./fixtures.json', JSON.stringify(items), function (err, data) {
            if (isContained === false) {
                res.status(404).send("");
            } else {
                res.status(204).send("");
            }
        });
    });
});

module.exports = router;



