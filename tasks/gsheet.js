var async = require('async');
var sugar = require('object-sugar');
var GoogleSpreadsheet = require('google-spreadsheet');

var parse = require('../lib/parse');
var sheet = require('../config').spreadsheet;

var Company = require('../models').Company;


module.exports = function(cb) {
    sugar.removeAll(Company, function(err) {
        if(err) return cb(err);

        loadSheet(sheet, function(err, data) {
            if(err) return cb(err);

            async.each(data, sugar.create.bind(null, Company), cb);
        });
    });
};

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

