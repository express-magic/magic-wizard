'use strict';

var async  = require('async')
  , path   = require('path')
  , log    = require('magic-log')
  , prompt = require('magic-prompt')
  , remote = require(path.join(__dirname));
  , update = {}
;


module.exports = function() {
  async.waterfall(
    [
      
    , filterArgs
    , prompt.confirmation
    ]
    , function (err, results) {
      log('host updated.');
      if (err) { log.error(err); }
    }
  );
}


