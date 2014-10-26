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
    , remove: require( path.join(__dirname, 'remove') )
    , save: require( path.join(__dirname, 'save') )
    , gitUrl: 'git@github.com:express-magic/magic-localhost'
  }
;


module.exports = host;
