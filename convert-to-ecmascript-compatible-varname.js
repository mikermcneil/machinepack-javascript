module.exports = {

  id: 'convert-to-ecmascript-compatible-varname',
  description: 'Given a string of dash-delimited words, return a similar version of the string, but which is camel-cased and otherwise stripped of special characters, whitespace, etc. so that it is usable as an ECMAScript variable.',

  // Whether this machine is referentially transparent
  // (i.e. read-only and free of side effects)
  noSideEffects: true,

  inputs: {
    string: {
      example: 'foo-bar-baz'
    }
  },

  exits: {
    error: {
      example: undefined
    },
    success: {
      example: 'fooBarBaz'
    }
  },

  fn: function (inputs, xit) {
    return xit.success(
      inputs.string.replace(/-([a-z])/g, function ($all, $1) {
      return $1.toUpperCase();
      })
    );
  }
};

