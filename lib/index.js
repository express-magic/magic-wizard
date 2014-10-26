#!/usr/bin/env node
'use strict';

var fs       = require('fs')
  , path     = require('path')
  , inquirer = require('inquirer')
  , async    = require('async')
  , heroku   = require('magic-heroku')
  , log      = require( path.join('magic-log') )
  , host     = require( path.join(__dirname, 'host') )
  , cwd      = process.cwd()
  , config   = require(path.join(cwd, 'config') )
  , cli      = {}
;

cli.promptForAction = function promptForAction() {

  async.waterfall([
      heroku.add
    , cli.chooseHostAction
  ]
  , cli.promptForActionDone
  )
}

cli.chooseHostAction = function () {
  
    var promptArgs = [
      {
          name   : 'action'
        , message: 'Choose an Action'
        , type   : 'list'
        , choices: [
            { name : 'add Host', value: 'addHost' }
          , { name : 'update Host', value: 'updateHost'}
          , { name : 'update all Hosts', value: 'updateAllHosts' }
          , { name : 'remove Host' , value: 'removeHost' }
          , { name : 'commit changes', value: 'commit' }
          , { name : 'deploy to heroku', value: 'deploy' }
        ]
      }
    ];
    
    inquirer.prompt(promptArgs, function(args) {
      if (args.action === 'addHost') {
        host.add();
      } else if ( args.action === 'updateHost' ) {
        host.update();
      } else if ( args.action === 'updateAll') {
        host.updateAll();
      } else if ( args.action === 'removeHost' ) {
        host.remove();
      } else if ( args.action === 'commit' ) {
        log(args.action);
      } else if ( args.action === 'addHeroku' ) {
        log(args.action);
      } else if ( args.action === 'deploy' ) {
        log(args.action);
      } else {
        log('Action: ' + args.action + ' not found');
      }
    });
}

cli.host = host;

module.exports = cli;
