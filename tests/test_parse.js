var GoogleSpreadsheet = require('google-spreadsheet');

var parse = require('../lib/parse');


main();

function main() {
    var sheet = new GoogleSpreadsheet('0AhdUvwJs9WNSdFRiYkdGcU9FT3RIdEhaM2F0VU8tRUE');

    parse(sheet, function(err, d) {
        if(err) return console.error(err);

        console.log(d.slice(10));
    });
}
