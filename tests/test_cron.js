var config = require('../config');
var cron = require('../lib/cron');


main();

function main() {
    cron(config, function(err, d) {
        if(err) return console.error(err);

        console.log('ok');
    });
}
