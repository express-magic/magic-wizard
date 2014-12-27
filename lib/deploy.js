'use strict';

var fs     = require('fs')
  , path   = require('path')
  , log    = require('magic-log')
  , remote = require(path.join(__dirname, 'remote'))
;

function deploy(cb) {
  
  //this will be the place to hook in other deploy possibilities,
  //nodejitsu comes to mind.
  remote.deploy(cb);
}

module.exports = deploy;
