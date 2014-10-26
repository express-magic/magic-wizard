'use strict';

var fs       = require('fs')
  , path     = require('path')
  , inquirer = require('inquirer')
  , rimraf   = require('rimraf')
  , async    = require('async')
  , exec     = require('child_process').exec
  , cwd      = process.cwd()
  , log      = require('magic-log')
  , host     = {
      add   : require( path.join(__dirname, 'add') )
    , update: require( path.join(__dirname, 'update') )
    , remove: require( path.join(__dirname, 'remove') )
  }
  , gitUrl   = 'git@github.com:express-magic/magic-localhost'
;


module.exports = host;
