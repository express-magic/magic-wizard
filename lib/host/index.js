'use strict';

var fs       = require('fs')
  , path     = require('path')
  , inquirer = require('inquirer')
  , rimraf   = require('rimraf')
  , async    = require('async')
  , exec     = require('child_process').exec
  , cwd      = process.cwd()
  , log      = require('magic-log')
  , git      = require('magic-git')
  , host     = {
      add   : require( path.join(__dirname, 'add') )
    , update: require( path.join(__dirname, 'udpate') )
    , remove: require( path.join(__dirname, 'remove') )
  }
  , gitUrl   = 'git@github.com:express-magic/magic-localhost'
;


module.exports = host;
