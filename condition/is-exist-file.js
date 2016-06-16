var fs = require("fs");

fs.stat('./fixtures.json', function(err, stat){
    var fileNotFound = !(stat && stat.isFile());
    if (fileNotFound) {
        initFile('./fixtures.json',"[]");
        initFile('./condition/max-id.json',JSON.stringify({"maxId":0}));
    }
});

function initFile(filePath,data){
    fs.open(filePath, 'w+', function (err, fd) {
        if (err)
            throw err;
        fs.write(fd, data, 0, 'utf8', function (err) {
            if (err)
                throw err;
        });
    });
}