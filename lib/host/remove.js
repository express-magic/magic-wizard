'use strict';

var async = require('async')
  , path     = require('path')
  , log   = require('magic-log')
  , prompt = require(path.join(__dirname, '..', 'prompt'))
;

module.exports = function (cb) {
  async.waterfall(
    [
      , prompt.host.choose
      , filterArgs
      , prompt.confirmation
      , rmHost
    ]
    , cb
  );
}

function filterArgs(args, cb) {
  args.confirmMessage = 'Do you really want to delete ' + args.hostname + '?';
  cb(null, args);
}

function rmHost(args, cb) {
  log('rmhost args = ');
  log(args);
  var hostPath = path.join(cwd, 'hosts', args.hostname);

  rimraf(hostPath, function (err) {
    cb(err, args);
  });
}
