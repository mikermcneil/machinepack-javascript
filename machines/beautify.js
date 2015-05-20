module.exports = {


  friendlyName: 'Beautify',


  description: 'Beautify a JavaScript code string.',


  cacheable: true,


  sync: true,


  inputs: {

    code: {
      description: "The JavaScript code to beautify.",
      example: 'alert(\n"hi it\'s me" + \n\' and i sure am messy")\nvar x   =1+1;\n',
      required: true
    },

    useTabs: {
      friendlyName: 'Use tabs?',
      description: 'Whether to use tabs instead of spaces (defaults to 2 spaces)',
      example: false,
      defaultsTo: false
    },

    numSpaces: {
      friendlyName: '# of spaces',
      description: 'The number of spaces that should represent an indentation.',
      extendedDescription: 'This input is ignored if the `useTabs` input is enabled.',
      example: 2,
      defaultsTo: 2
    },



    // TODO: add a subset of these as additional optional inputs and map them to the underlying jsbeautify opts
    // (our should be camel-cased of course)
    //
    // (from https://www.npmjs.com/package/js-beautify)
    // ====================================================================================================================

    //   {
    // Already taken care of:
    //     "indent_size": 4,
    //     "indent_char": " ",
    //     "indent_with_tabs": false,  --> wtf why is this also here?

    // probably don't need:
    //     "indent_level": 0,  --> ?
    //     "break_chained_methods": false,     --> ?
    //     "eval_code": false,                 --> ?
    //     "unescape_strings": false,          --> ?
    //     "wrap_line_length": 0,              --> ?
    //     "wrap_attributes": "auto",          --> ?
    //     "wrap_attributes_indent_size": 4    --> ?
    //     "max_preserve_newlines": 10,  --> Maximum number of line breaks to be preserved in one chunk
    //     "preserve_newlines": true,  --> Whether existing line breaks should be preserved
    //     "jslint_happy": false,  --> If true, then jslint-stricter mode is enforced
    //     "space_after_anon_function": false, --> ?
    //     "keep_array_indentation": false,    --> ?
    //     "keep_function_indentation": false, --> ?
    //     "space_before_conditional": true,   --> Should the space before conditional statement be added, "if(true)" vs "if (true)"

    // maybe add as inputs (but not necessarily 1-to-1 w/ js-beautify opts)
    //     "brace_style": "collapse",          --> ("collapse" | "expand" | "end-expand" | "expand-strict") -- put braces on the same line as control statements (default), or put braces on own line (Allman / ANSI style), or just put end braces on own line.,
    // }

  },


  exits: {

    success: {
      variableName: 'beautifiedCode',
      example: 'alert("hi it\'s me" + \n" and i sure am messy");\nvar x = 1+1;\n',
      description: 'Done.',
    },

  },


  fn: function (inputs,exits) {
    var beautify = require('js-beautify').js;
    return exits.success(beautify(inputs.code, {
      indent_size: inputs.numSpaces,
      indent_char: ' ',
      indent_with_tabs: inputs.useTabs
    }));
  },


};
