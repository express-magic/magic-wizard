'use strict';

var fs    = require('fs')
  , exec  = require('child_process').exec
  , log   = require('magic-log')
  , async = require('async');
;

async.series([
    gitCheckoutHeroku
  , gitIgnore
  , gitAdd
  , gitCommit
  , gitPush
  , gitCheckoutMaster
  ],
  cleanUp
);

function gitCheckoutHeroku(cb) {
  exec('git checkout heroku', function (err, stdout, stderr) {
    execCb(cb, err, stdout, stderr);
  });
}

function gitIgnore(cb) {
  var gitignore = path.join(__dirname,'.gitignore');

  fs.readFile(gitignore, function (err, contents) {
    var content = contents.toString().replace('hosts', 'hosts/*/.git');
    fs.writeFile(gitignore, content, function (err, results) {
      execCb(cb, err, results);
    });
  });
}

function gitAdd(cb) {
  exec('git add .', function (err, stdout, stderr) {
    execCb(cb, err, stdout, stderr);
  });
}
function gitCommit(cb) {
  exec('git commit -m "deploy"', function (err, stdout, stderr) {
    execCb(cb, err, stdout, stderr);
  });
}

function gitPush(cb) {
  exec('git push heroku heroku:master', function (err, stdout, stderr) {
    execCb(cb, err, stdout, stderr);
  });
}

function gitCheckoutMaster(cb) {
  exec('git checkout master', function (err, stdout, stderr) {
    execCb(cb, err, stdout, stderr);
  });
}

function cleanUp(err, results) {
  console.log('cleanup called');
  if (err) { log(err, 'error'); }
  exec('git branch -d heroku', function (err, stdout, stderr) {
    execCb(cb, err, stdout, stderr);
  });
}

function execCb(cb, err, stdout, stderr) {
  err = err || stderr;
  if ( err ) { log(err, 'error'); }
  if ( stdout ) { log(stdout); }
  if ( stderr ) { log(stderr, 'error'); }

  cb(err, stdout);
}

//git checkout -b heroku
//.gitignore replace hosts with hosts/*/.git
//git add . 
//git commit -m 'deploy for heroku'
//git push heroku heroku:master
//git checkout master
//git branch -d heroku
