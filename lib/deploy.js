'use strict';

var fs     = require('fs')
  , exec   = require('child_process').exec
  , log    = require('magic-log')
  , async  = require('async')
  , xc     = require('magic-xc')
  , heroku = require('magic-heroku')
;

heroku.deploy(afterDeploy);

function afterDeploy (err, results) {
  log('deployed to heroku');
  if (err) { log(err, 'error'); }
  if (results) { log(results, 'success'); }
}
