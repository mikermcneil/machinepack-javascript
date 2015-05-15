module.exports = {

  friendlyName: 'Minify',
  description: 'Minify a string of JavaScript code.',
  sync: true,

  inputs: {
    javascript: {
      description: "The Javascript code string to minify.",
      example: 'var z = 123;\\nfunction abcz(a, b, c){\\nalert(a, b, c, z);}\\n',
      required: true
    }
  },

  defaultExit: 'success',

  exits: {
    error: {
      description: 'Unexpected error occurred.'
    },
    success: {
      example: 'function abcz(a,c,n){alert(a,c,n,z)}var z=123;'
    }
  },

  fn: function(inputs, exits) {

    var UglifyJS = require('uglify-js');

    return exits.success(UglifyJS.minify(inputs.javascript, {fromString: true}).code);
  }

};
