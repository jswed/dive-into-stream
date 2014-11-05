var fs = require('fs');
var through = require('through');
var txt = fs.createReadStream('text.txt');

var split = through(function (data) {
    var that = this;
    var splits = data.toString().split('\n');
    splits.forEach(function (line) {
        that.queue(line);
    });
});

setTimeout(function () {
    txt.pipe(split).on('data', function (chunck) {
        console.log('Data:' + chunck);
    });
}, 10);
