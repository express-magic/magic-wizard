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
      cli.chooseHostAction
  ]
  , cli.promptForActionDone
  );
}

cli.chooseHostAction = function () {
  
    var promptArgs = [
      {
          name   : 'action'
        , message: 'Choose an Action'
        , type   : 'list'
        , choices: [
            { name : 'add Host', value: 'addHost' }
          , { name : 'save Host (git commit)', value: 'saveHost'}
          //, { name : 'save all Hosts', value: 'updateAllHosts' }
          , { name : 'remove Host' , value: 'removeHost' }
          , { name : 'commit changes', value: 'commit' }
          , { name : 'deploy to heroku', value: 'deploy' }
        ]
      }
    ];
    
    inquirer.prompt(promptArgs, function(args) {
      if (args.action === 'addHost') {
        host.add(function (err, results) {
          if (err) { log(err, 'error'); }

          log('host added, results:');
          log(results);
        });
      } else if ( args.action === 'saveHost' ) {
        host.save();
      } else if ( args.action === 'removeHost' ) {
        host.remove();
      } else if ( args.action === 'commit' ) {
        log(args.action);
      } else if ( args.action === 'addHeroku' ) {
        log(args.action);
      } else if ( args.action === 'deploy' ) {
        log(args.action);
      } else {
        log('Wizard Error: Action: ' + args.action + ' not found');
      }
    });
}

cli.host = host;

module.exports = cli;
