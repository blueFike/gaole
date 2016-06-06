var fs = require("fs");

fs.open('./fixtures.json', 'w+', function (err, fd) {
    if (err)
        throw e;
    fs.write(fd, "[]", 0, 'utf8', function (err) {
        if (err)
            throw err;
    });
});