function isType(barcode, name, unit, price, res) {
    var isContained = false;

    if ((typeof barcode == "string") && (typeof name == "string")
        && (typeof unit == "string") && (typeof price == "number")) {
        isContained = true;
    }

    if (isContained === false) {
        res.status(401).send("");

        return false;
    }
}

module.exports = isType;
