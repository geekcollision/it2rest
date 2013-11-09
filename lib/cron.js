var fs = require('fs');

var async = require('async');
var GoogleSpreadsheet = require('google-spreadsheet');
var CronJob = require('cron').CronJob;

var parse = require('./parse');


module.exports = init;

function init(config, cb) {
    writeJSON(config.spreadsheet, cb);

    if(config.cron) new CronJob(config.cron, writeJSON.bind(null, config.spreadsheet, cb), null, true);
}

function writeJSON(sheet, cb) {
    cb = cb || noop;

    // it takes a couple of tries to get results for some reason (buggy lib?)

    var tries = 5;
    var count = 0;

    async.whilst(function() {
        return count < tries;
    }, function(cb) {
        parse(new GoogleSpreadsheet(sheet), function(err, d) {
            if(err) return setTimeout(cb, 500);

            count = tries;
            fs.writeFile('./public/data.json', JSON.stringify(d), cb);
        });
    }, cb);
}

function noop() {}
