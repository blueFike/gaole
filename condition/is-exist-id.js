function isContained(items, res, id) {
    var isContained = false;

    items.forEach(function (element) {
        if (element.id === parseInt(id))
            isContained = true;
    });

    if (isContained === false) {
        res.status(404).send("");

        return false;
    }
}

module.exports = isContained;