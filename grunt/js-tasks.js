module.exports = function(grunt, options) {
  "use strict";
  var files = [
    'Gruntfile.js',
    'grunt/*.js',
    '<%= theme %>js/*.js',
    '!<%= theme %>js/*.min.js'
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
