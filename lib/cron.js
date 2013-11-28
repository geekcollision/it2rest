var fs = require('fs');

var async = require('async');
var sugar = require('object-sugar');
var GoogleSpreadsheet = require('google-spreadsheet');
var CronJob = require('cron').CronJob;

var parse = require('./parse');

var Company = require('../models').Company;


module.exports = init;

function init(config, cb) {
    loadData(config.spreadsheet, cb);

    if(config.cron) new CronJob(config.cron, loadData.bind(null, config.spreadsheet, cb), null, true);
}

function loadData(sheet, cb) {
    sugar.removeAll(Company, function(err) {
        if(err) return cb(err);

        loadSheet(sheet, function(err, data) {
            if(err) return cb(err);

            async.each(data, sugar.create.bind(null, Company));
        });
    });
}

function loadSheet(sheet, cb) {
    // it takes a couple of tries to get results for some reason (buggy lib?)
    var tries = 5;
    var count = 0;
    var data;

    async.whilst(function() {
        return count < tries;
    }, function(cb) {
        parse(new GoogleSpreadsheet(sheet), function(err, d) {
            if(err) return setTimeout(cb, 500);

            count = tries;

            data = d;

            cb();
        });
    }, function() {
        cb(null, data);
    });
}
