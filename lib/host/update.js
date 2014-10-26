'use strict';

var async  = require('async')
  , log    = require('magic-log')
  , prompt = require(path.join(__dirname, '..', 'prompt'))
  , update = {}
;

module.exports = function() {
  async.waterfall(
    [
      prompt.host.choose
    , filterArgs
    , prompt.confirmation
//    , git.update
    ]
    , function (err, results) {
      log('host updated.');
      if (err) { log(err, 'error'); }
    }
  );
}


function filterArgs(args, cb) {
  args.confirmMessage = 'Update ' + args.hostname + '?';
  cb(null, args);
}