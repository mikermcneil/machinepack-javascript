/**
 * Module dependencies
 */

var Uglify = require('uglify-js');

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
      var jsp = Uglify.parser;
      var pro = Uglify.uglify;

      // parse code and get the initial AST
      var ast = jsp.parse(inputs.javascript);
      // get a new AST with mangled names
      ast = pro.ast_mangle(ast);
      // get an AST with compression optimizations
      ast = pro.ast_squeeze(ast);
      // compressed code here
      var finalCode = pro.gen_code(ast);
      return exits.success(finalCode);
    } catch (e) {
      return exits.error(e);
    }
  }

};
