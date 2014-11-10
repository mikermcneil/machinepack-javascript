module.exports = {

  identity: 'convert-to-ecmascript-compatible-varname',
  friendlyName: 'Convert to ecmascript compatible varname',
  description: 'Given a string of dash-delimited words, return a similar version of the string, but which is camel-cased and otherwise stripped of special characters, whitespace, etc. so that it is usable as an ECMAScript variable.',
  cacheable: true,

  inputs: {
    string: {
      example: 'foo-bar-baz',
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
      example: 'fooBarBaz'
    }
  },

  fn: function (inputs, exits) {

    var result;
    try {
      result = require('convert-to-ecmascript-compatible-varname')(inputs.string);
    }
    catch (e) {
      return exits.error();
    }

    return exits.success(result);
  }
};
