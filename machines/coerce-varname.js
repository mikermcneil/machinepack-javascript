module.exports = {

  friendlyName: 'Coerce variable name',


  description: 'Given a string, return a similar version of the string, but which is camel-cased and otherwise stripped of special characters, whitespace, etc. so that it is usable as an ECMAScript variable.',


  extendedDescription: '',


  sync: true,


  cacheable: true,


  inputs: {
    string: {
      description: "The string to convert.",
      example: 'foo-bar-baz',
      required: true
    },
    force: {
      description: 'Return a best guess varname even if the conversion fails?',
      extendedDescription: 'If `force` is enabled, a variable name is guaranteed, even if it is just "x".',
      example: false,
      defaultsTo: false
    }
  },


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

      // If `force` is not enabled, then handle this error.
      if (!inputs.force) {
        if (e.code === 'RESERVED') {
          return exits.collidesWithReservedWord(e);
        }
        return exits.error(e);
      }

      // Otherwise `force` is enabled so we need to keep trucking.
      //
      // We'll try a rougher guess, converting the provided string to
      // be alphanumeric.  In the absolute worst-case, use `x`.
      try {
        result = inputs.string.replace(/^[^a-zA-Z\$\_]/, '').replace(/^.[^a-zA-Z0-9]*/, '');
        result = result || 'x';

        // Now run `convertToEcmascriptCompatibleVarname` one more time in case
        // there is still a collision with a reserved word.
        try {
          result = convertToEcmascriptCompatibleVarname(result);
          return exits.success(result);
        }
        // If this doesn't work, just use `x`.
        catch (e2) {
          return exits.success('x');
        }
      }
      catch (e1) {
        return exits.error(e);
      }
    }

    return exits.success(result);
  }
};
