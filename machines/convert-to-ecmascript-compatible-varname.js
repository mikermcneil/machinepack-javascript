module.exports = {

  identity: 'convert-to-ecmascript-compatible-varname',
  friendlyName: 'Convert to ecmascript compatible varname',
  description: 'Given a string of dash-delimited words, return a similar version of the string, but which is camel-cased and otherwise stripped of special characters, whitespace, etc. so that it is usable as an ECMAScript variable.',
  cacheable: true,

  inputs: {
    string: {
      description: "The string to convert.",
      example: 'foo-bar-baz',
      required: true
    }
  },

  defaultExit: 'success',
  catchallExit: 'error',

  exits: {
    error: {
      example: 'Error: The string "" cannot be converted into an ECMAScript 5.1-compatible variable name.'
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
      var err = '';
      try {
        err = e.stack || e.message || e.name;
      }
      catch (_e){
        err = e+'';
      }
      return exits.error(err);
    }

    return exits.success(result);
  }
};
