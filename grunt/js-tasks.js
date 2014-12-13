module.exports = function(grunt, options) {
  "use strict";
  var files = [
    'Gruntfile.js',
    'grunt/*.js',
    'source/js/*.js',
    '!source/js/*.min.js',
    '!source/js/vendor/*.js'
  ];
  return {
    "jshint": {
      "src": files
    },
    "watch": {
      "files": files,
      "tasks": [
        'newer:jshint:js'
      ]
    }
  };
};
