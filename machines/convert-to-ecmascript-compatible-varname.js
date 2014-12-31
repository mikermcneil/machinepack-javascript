module.exports = {

  friendlyName: 'Convert to ecmascript compatible varname',
  description: 'Given a string of dash-delimited words, return a similar version of the string, but which is camel-cased and otherwise stripped of special characters, whitespace, etc. so that it is usable as an ECMAScript variable.',
  sync: true,

  inputs: {
    string: {
      description: "The string to convert.",
      example: 'foo-bar-baz',
      required: true
    }
  },

  defaultExit: 'success',

  exits: {
    error: {
      description: 'Unexpected error occurred.'
    },
    success: {
      example: 'fooBarBaz'
    }
  },

  fn: function (inputs, exits) {

    var convertToEcmascriptCompatibleVarname = require('convert-to-ecmascript-compatible-varname');

    var result = convertToEcmascriptCompatibleVarname(inputs.string);
    return exits.success(result);
  }
};
