'use strict';

var path     = require('path')
  , host     = {
      add   : require( path.join(__dirname, 'add') )
    , update: require( path.join(__dirname, 'update') )
    , remove: require( path.join(__dirname, 'remove') )
    , stage: require( path.join(__dirname, 'stage') )
    , deploy: require( path.join(__dirname, 'deploy') )
    , save: require( path.join(__dirname, 'save') )
  }
;


module.exports = host;
