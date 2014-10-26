'use strict';

var async   = require('async')
  , path    = require('path')
  , log     = require('magic-log')
  , prompt  = require(path.join(__dirname, '..', 'prompt') )
  , hostDir = path.join(process.cwd(), 'hosts')
  , XC      = require('magic-xc')
  , xc      = new XC({cwd: hostDir})
  
  , git     = {}
;

module.exports = function(cb) {
  async.waterfall( 
    [
      prompt.host.name
    , prompt.git.provider
    , prompt.git.url
    , prompt.git.user
    , prompt.git.repository
    , prepare
    , git.add
    , git.commit
    ]
    , cb
  );
}

function prepare(args, cb) {
  var host = args.hostname
    , prov = args.gitProvider
    , user = args.gitUser
    , repo = args.gitRepository
    , url  = args.gitUrl || prov + user + '/' + repo
  ;
  
  cb(null, {host: host, url: url});
}

git.add = function(args, cb) {
  var cmd = 'git add ' + hostDir + '/' + args.host;
  xc(cmd, cb);
}
git.commit = function(args, cb) {
  var cmd = 'git commit -m "added host ' + args.host + '"';
  xc(cmd, cb);
}
