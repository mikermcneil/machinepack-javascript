module.exports = {

  identity: 'minify-javascript',
  friendlyName: 'Minify javascript',
  description: 'Minify a javascript string.',
  cacheable: true,

  inputs: {
    javascript: {
      example: '//... JS code here',
      required: true
    }
  },

  defaultExit: 'success',
  catchallExit: 'error',

  exits: {
    error: {
      example: undefined
    },
    success: {
      example: ''
    }
  },

  fn: function(inputs, exits) {


    var UglifyJS = require('uglify-js');

    try {
      return exits.success(UglifyJS.minify(inputs.javascript, {fromString: true}).code);
    } catch (e) {
      return exits.error(e);
    }
  }

};
