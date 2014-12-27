#!/usr/bin/env node
'use strict';
var path     = require('path')
  , fs       = require('fs')
  , program  = require('commander')
  , execFile = require('child_process').execFile
  , spawn    = require('child_process').spawn
  , log      = require('magic-log')
  , cli      = require(path.join(__dirname, 'lib') )
;

module.exports = function xc() {
    
  program.version('0.0.1');

  if ( process.argv.length <= 2 ) {
    cli.promptForAction();
  }
  
  program
    .command('test')
    .description('test command')
    .action(function () {
      //log('nodegit:', nodegit);
      //for (var k in nodegit ) {
      //  log(nodegit[k]);
      //}
      //var s = nodegit.Submodule();
      //log(s);
    })
  ;

  program
    .command('*')
    .description('display help text')
    .action(printHelp)
  ;

  program.parse(process.argv);

  function printHelp() {
    console.log('help text');
  }

