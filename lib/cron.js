var fs = require('fs');

var GoogleSpreadsheet = require('google-spreadsheet');
var CronJob = require('cron').Cronjob;

var parse = require('./parse');


module.exports = init;

function init(config, cb) {
    writeJSON(config.spreadsheet, cb);

    if(config.cron) new Cronjob(config.cron,
        writeJSON.bind(undefined, config.spreadsheet, cb), null, true);
}

function writeJSON(sheet, cb) {
    cb = cb || noop;

    parse(new GoogleSpreadsheet(sheet), function(err, d) {
        // TODO: in case this fails, try again (max 5 times)
        if(err) return cb(err);

        fs.writeFile('../public/data.json', JSON.stringify(d), cb);
    });
}

function noop() {}
