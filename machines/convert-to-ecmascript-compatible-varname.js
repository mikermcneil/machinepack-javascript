module.exports = {

  friendlyName: 'Convert to ecmascript compatible varname',
  description: 'Given a string of dash-delimited words, return a similar version of the string, but which is camel-cased and otherwise stripped of special characters, whitespace, etc. so that it is usable as an ECMAScript variable.',
  sync: true,

  inputs: {
    string: {
      description: "The string to convert.",
      example: 'foo-bar-baz',
      required: true
    },
    force: {
      description: 'Return a best guess varname even if the conversion fails?',
      example: true,
      defaultsTo: false
    }
  },

  defaultExit: 'success',

  exits: {
    error: {
      description: 'Unexpected error occurred.'
    },
    collidesWithReservedWord: {
      description: 'The specified string cannot be coerced into a valid ECMAScript 5.1-compatible variable name because it would collide with a JavaScript reserved word, or is otherwise invalid.'
    },
    success: {
      example: 'fooBarBaz'
    }
  },

  fn: function (inputs, exits) {

    var convertToEcmascriptCompatibleVarname = require('convert-to-ecmascript-compatible-varname');

    var result;
    try {
      result = convertToEcmascriptCompatibleVarname(inputs.string);
    }
    catch (e) {
      if (!inputs.force) {
        if (e.code === 'RESERVED') {
          return exits.collidesWithReservedWord(e);
        }
        return exits.error(e);
      }
      // If `force` is enabled, try a rougher guess and convert the provided string to be alphanumeric.
      try {
        result = inputs.string.replace(/^[^a-zA-Z\$\_]/, '').replace(/^.[^a-zA-Z0-9]*/, '');
        result = result || 'x';
        return exits.success(result);
      }
      catch (e1) {
        return exits.error(e);
      }
    }
    return exits.success(result);
  }
};
