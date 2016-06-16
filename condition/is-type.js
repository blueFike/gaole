function isType(barcode, name, unit, price, res) {
    var isContained = false;

    if ((typeof barcode == "string") && (typeof name == "string")
        && (typeof unit == "string") && (typeof price == "number")) {
        isContained = true;
    }

    if (isContained === false) {
        res.status(400).send("");

        return false;
    }

    return true;
}

module.exports = isType;
