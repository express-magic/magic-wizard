'use strict';

var async   = require('async')
  , path    = require('path')
  , log     = require('magic-log')
  , git     = require('magic-git')
  , prompt  = require(path.join(__dirname, '..', 'prompt') )
  , hostDir = path.join(process.cwd(), 'hosts')
  , XC      = require('magic-xc')
  , xc      = new XC({cwd: hostDir})
;

module.exports = function(cb) {
  async.waterfall( 
    [
      prepare
    , prompt.host.name // sets args.hostname
    , prompt.git.provider
    , prompt.git.url
    , prompt.git.user
    , prompt.git.repository 
    , prepareGit
    , git.submodule.add
//  , rmGitDir
    , prepareGitCommitPrompt
//  , prompt.git.getCommitMessage
    , prompt.confirmation
    , git.add
    , git.commit
    , prepareGitPushPrompt
    , prompt.confirmation
    , git.push
    ]
    , cb
  );
}

function prepare(cb) {
  cb(null, {}); //initialize the args object for all following functions
}

function prepareGit(args, cb) {
  var host = args.hostname
    , prov = args.gitProvider
    , user = args.gitUser
    , repo = args.gitRepository
    , url  = args.gitUrl || prov + user + '/' + repo
  ;
  cb(null, {hostname: host, url: url});
}

//unused
function rmGitDir(args, cb) {
  var cmd = 'rm ' + args.hostname + '/.git -rf';
  xc(cmd, args, cb);
}

function prepareGitCommitPrompt(args, cb) {
  args.message = 'Do you want to commit this host to your local git repository?';
  args.name = 'confirmCommit';
  cb(null, args);
}

function prepareGitPushPrompt(args, cb) {
  args.message = 'Do you want to push this host to your online git repository?';
  args.name = 'confirmPush';
  cb(null, args);
}

