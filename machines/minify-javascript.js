module.exports = {

  identity: 'minify-javascript',
  friendlyName: 'Minify javascript',
  description: 'Minify a javascript string.',
  cacheable: true,

  inputs: {
    javascript: {
      description: "The Javascript code to minify.",
      example: 'var z = 123;\\nfunction abcz(a, b, c){\\nalert(a, b, c, z);}\\n',
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
      example: 'function abcz(a,c,n){alert(a,c,n,z)}var z=123;'
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
