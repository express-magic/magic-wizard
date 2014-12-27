'use strict';

var inquirer = require('inquirer')
  , fs       = require('fs')
  , async    = require('async')
  , log      = require('magic-log')
  , prompt  = require('magic-prompt')
  , path     = require('path')
  , cwd      = process.cwd()
  , XC       = require('magic-xc')
  , xc       = new XC({cwd: cwd})
;

exports.host = {};
exports.git = {};
exports.remote = {};

exports.prepare = function(cb) {
  cb(null, {});
}

exports.host.name = function (args, cb) {
  args = args || {};

  if ( args.hostname ) { return cb(null, args); }
  log('Please specify a name for the new host:');
  prompt.input({
      name: 'hostname'
    , message: 'Hostname: '
  }, function(err, input) {
    if ( ! input || ! input.hostname ){
      return cb('Hostname can not be empty');
    }
    args.hostname = input.hostname;
    cb(null, args);
  } );
}


exports.git.provider = function (args, cb) {
  if ( args.gitProvider || args.gitUrl ) { return cb(null, args); }
  prompt.choice({
      name: 'gitProvider'
    , type: 'list'
    , message: 'Choose your git provider:'
    , choices: [
        { name: 'git@github.com:' }
      , { name: 'git@bitbucket.org:' }
      , { name: 'custom'}
    ]
    , isRequired: true
    , errorMsg: 'Git Provider can not be empty'
  }
  , function(err, gitProvider) {
    if ( err || ! gitProvider ) { log.error(err); }

    args.gitProvider = input.gitProvider;

    cb(null, args);
  } );
}

exports.git.url = function (args, cb) {
  if ( args.gitUrl ) { return cb(null, args); }
  if ( args.gitProvider !== 'custom' ) {
    return cb(null, args);
  }

  prompt.input( {
      name: 'gitUrl'
    , message: 'Please input the full url to your repository'
  }
  , function(err, input) {
    if ( ! input || ! input.gitUrl ) {
      return cb(null, args);
    }
    args.gitUrl = input.gitUrl;
    cb(null, args);
  } );

}


exports.git.user = function(args, cb) {
  if ( args.gitUser || args.gitUrl ) { return cb(null, args); }

  prompt.input({
      name: 'gitUser'
    , message: 'Your git username:'
    , isRequired: true
  }
  , function(err, input) {
    if ( ! input || ! input.gitUser ) {
      return cb('getGitUser failed: Git User can not be empty');
    }
    args.gitUser = input.gitUser;
    cb(null, args);
  } );
}

exports.git.repository = function (args, cb) {
  if ( args.gitRepository || args.gitUrl ) { return cb(null, args); }
  prompt.input({
      name: 'gitRepository'
    , message: 'The git repository to clone from:'
    , isRequired: true
  }
  , function(err, input) {
    if ( ! input || ! input.gitRepository ) {
      return cb('getGitRepository failed: Git Repository can not be empty');
    }
    args.gitRepository = input.gitRepository;
    cb(null, args);
  } );
}

exports.host.choose = function(args, cb) {
  async.waterfall(
    [
      readHostsDir
    , findHosts
    , chooseHostPrompt
    ]
    , cb
  );
}


function readHostsDir(cb) {
  var args = {};

  fs.readdir(path.join(cwd, 'hosts'), function (err, files) {
    if ( err ) {
      return cb(err);
    }
    args.files = files;
    cb(err, args);
  } );
}

function findHosts(args, cb) {
  args.hosts = [];

  async.map(args.files, filterHosts, function(err, hosts) {
    args.hosts = hosts;
    cb(null, args);
  } );
}

function filterHosts(file, cb) {
  var filePath = path.join(cwd, 'hosts', file);
  log('filterHosts file = ' + file);
  fs.stat(filePath, function (err, stats) {
    if ( err ) { return log.error(err); }
    if ( stats.isDirectory() ) {
      fs.exists(path.join(filePath, 'package.json'), function (exists) {
        if ( exists ) { 
          cb(null, file);
        } else {
          cb(null, null);
        }
      } );
    } else {
      cb(null, null);
    }
  } );
}

function chooseHostPrompt(args, cb) {
  prompt.choice({
      name: 'hostname'
    , message: 'Choose a host:'
    , type: 'list'
    , choices: args.hosts
    , isRequired: true
  }, function (err, input) {
    if ( ! input || ! input.hostname) {
      return cb('chooseHost failed: Need Hostname')
    }
    args.hostname = input.hostname;
    cb(null, args);
  } );
}

exports.confirmation = prompt.confirmation;

