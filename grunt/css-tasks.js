module.exports = function (grunt, options) {
  "use strict";
  grunt.registerTask('compileCSS', [
    'shell:css' 
  ]);
  return {
    "watch": {
      "files": ["source/scss/**/*.scss"],
      "tasks": ["shell:css"]
    },
    "shell": {
      "command": "bundle exec compass compile"
    },
    "scsslint": {
      options: {
        bundleExec: true,
        config: '.scss-lint.yml',
        force: true,
        //maxBuffer: 999999,
        //reporterOutput: 'scss-lint-report.xml',
        colorizeOutput: true,
        compact: true
      },
      src: 'source/scss/**/*.scss'
    }
  };
};
