'use strict';

var dbm;
var type;
var seed;
var fs = require('fs');
var path = require('path');

exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db, callback) {
  var filePath = path.join(__dirname, 'sqls', '20240620061439-initial-schema-up.sql');
  fs.readFile(filePath, { encoding: 'utf-8' }, function(err, data) {
    if (err) return callback(err);
    db.runSql(data, callback);
  });
};

exports.down = function(db, callback) {
  var filePath = path.join(__dirname, 'sqls', '20240620061439-initial-schema-down.sql');
  fs.readFile(filePath, { encoding: 'utf-8' }, function(err, data) {
    if (err) return callback(err);
    db.runSql(data, callback);
  });
};

exports._meta = {
  "version": 1
};
