/**
 * Module dependencies
 */

var UglifyJS = require('uglify-js');

module.exports = {

  id: 'minify-javascript',
  description: 'Minify a javascript string.',

  // Whether this machine is referentially transparent
  // (i.e. read-only and free of side effects)
  noSideEffects: true,

  inputs: {
    javascript: {
      type: 'string',
      example: '//... JS code here'
    }
  },

  exits: {
    error: {
      example: undefined
    },
    success: {
      example: ''
    }
  },

  fn: function(inputs, exits) {
    try {
      return exits.success(UglifyJS.minify(inputs.javascript, {fromString: true}).code);
    } catch (e) {
      return exits.error(e);
    }
  }

};
