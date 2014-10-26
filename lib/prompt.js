'use strict';

var inquirer = require('inquirer')
  , prompt = {
    get: {
      git: {}
    }
  }
;

prompt.prepare = function(cb) {
  cb(null, {});
}

prompt.host.name = function (args, cb) {
  args = args || {};

  if ( args.hostname ) { return cb(null, args); }
  log('Please specify a name for the new host:');
  inquirer.prompt({
      name: 'hostname'
    , message: 'Hostname: '
  }, function(input) {
    if ( ! input || ! input.hostname ){
      return cb('Hostname can not be empty');
    }
    args.hostname = input.hostname;
    cb(null, args);
  } );
}

prompt.git.provider = function (args, cb) {
  if ( args.gitProvider || args.gitUrl ) { return cb(null, args); }
  inquirer.prompt({
      name: 'gitProvider'
    , type: 'list'
    , message: 'Choose your git provider:'
    , choices: [
        { name: 'git@github.com:' }
      , { name: 'https://github.com/' }
      , { name: 'git@bitbucket.org:' }
      , { name: 'https://bitbucket.org/'}
      , { name: 'custom'}
    ],
  }
  , function(input) {
    if ( ! input || ! input.gitProvider ) {
      return cb('Git Provider can not be empty');
    }
    args.gitProvider = input.gitProvider;

    cb(null, args);
  } );
}

prompt.git.url = function (args, cb) {
  if ( args.gitUrl ) { return cb(null, args); }
  if ( args.gitProvider !== 'custom' ) {
    return cb(null, args);
  }

  inquirer.prompt( {
      name: 'gitUrl'
    , message: 'Please input the full url to your repository'
  }
  , function(input) {
    if ( ! input || ! input.gitUrl ) {
      return cb(null, args);
    }
    args.gitUrl = input.gitUrl;
    cb(null, args);
  } );

}


prompt.git.user = function(args, cb) {
  if ( args.gitUser || args.gitUrl ) { return cb(null, args); }

  inquirer.prompt({
      name: 'gitUser'
    , message: 'Your git username:'
  }
  , function(input) {
    if ( ! input || ! input.gitUser ) {
      return cb('getGitUser failed: Git User can not be empty');
    }
    args.gitUser = input.gitUser;
    cb(null, args);
  } );
}

prompt.git.repository = function (args, cb) {
  if ( args.gitRepository || args.gitUrl ) { return cb(null, args); }

  inquirer.prompt({
      name: 'gitRepository'
    , message: 'The git repository to clone from:'
  }
  , function(input) {
    if ( ! input || ! input.gitRepository ) {
      return cb('getGitRepository failed: Git Repository can not be empty');
    }
    args.gitRepository = input.gitRepository;
    cb(null, args);
  } );
}

prompt.confirmation = function (args, cb) {
  inquirer.prompt( {
      name: 'confirm'
    , type: 'confirm'
    , message: args.confirmMessage || 'Confirm: '
    , default: false
  }, function (input) {
    args.confirm = ( input.confirm === true );
    cb(null, args);
  });
}

prompt.host.choose = function(args, cb) {
  async.waterfall(
    [
      readHostsDir
    , findHosts
    , choseHostPrompt
    ]
    , cb
  );
}
function choseHostPrompt(args, cb) {
  inquirer.prompt({
      name: 'hostname'
    , message: 'Choose a host:'
    , type: 'list'
    , choices: args.hosts
  }, function (input) {
    if ( ! input || ! input.hostname) {
      return cb('chooseHost failed: Need Hostname')
    }
    args.hostname = input.hostname;
    cb(null, args);
  } );
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
  console.log('filterHosts file = ' + file);
  fs.stat(filePath, function (err, stats) {
    if ( err ) { return log(err, 'error'); }
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

module.exports = prompt;