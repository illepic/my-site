module.exports = function (grunt) {
  "use strict";
  var _ = require("lodash");
  var config = grunt.file.readYAML("Gruntconfig.yml");
  if (grunt.file.exists("Gruntconfig--custom.yml")) {
    var customConfigOverrides = grunt.file.readYAML("Gruntconfig--custom.yml");
    _.extend(config, customConfigOverrides);
  }
  config.jekyll = grunt.file.readYAML("_config.yml");

  // Begin Config

  // Begin Modular Config
  require('./grunt-tasks/pattern-lab/pattern-lab.js')(grunt, config);
  require('./grunt-tasks/jekyll/jekyll.js')(grunt, config);
  require('./grunt-tasks/optimize.js')(grunt, config);
  //require('./grunt-tasks/compass/compass.js')(grunt, config);
  require('./grunt-tasks/libsass/libsass.js')(grunt, config);
  require('./grunt-tasks/jshint/jshint.js')(grunt, config);
  //require('./grunt-tasks/drupal7/drupal7.js')(grunt, config);
  require('./grunt-tasks/icons/icons.js')(grunt, config);
  require('./grunt-tasks/regression-qa/regression-qa.js')(grunt, config);
  // End Modular Config

  // Begin Misc Config
  grunt.config.merge({
    concurrent: {
      options: {
        logConcurrentOutput: true
      },
      dev: {
        tasks: [
          "watch",
          "connect"
        ]
      }
    },
    bump: {// https://github.com/vojtajina/grunt-bump
      options: {
        commit: true,
        commitMessage: 'Release v%VERSION%',
        commitFiles: ['-a'],
        createTag: true,
        tagName: 'v%VERSION%',
        tagMessage: 'Version %VERSION%',
        push: false,
        pushTo: 'origin',
        gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d'
      }
    },
    shell: {
      bowerInstall: {
        command: "bower install"
      },
      bundleInstall: {
        command: "bundle install"
      }
    }
  });
  // End Misc Config


// End Config

// Begin Task Aliases
  grunt.registerTask("compile", [
    //"validate",
    "stylesCompile",
    "jekyllBuild",
    "newer:responsive_images",
    //"plBuild",
    //"icons-build",
    //"pattern_lab_component_builder",
    "shell:livereload"
  ]);
  grunt.registerTask("build", "compile");
  grunt.registerTask("b", "build");

  grunt.registerTask("validate", [
    "jsonlint",
    "jshint",
    "scsslint"
  ]);

  grunt.registerTask("rebuild", [
    "shell:cleanDest",
    "shell:bowerInstall",
    "compile"
  ]);
  
  // this is ran if you do either `grunt default` or `grunt`
  grunt.registerTask("default", [
    "compile",
    "watch"
  ]);
// End Task Aliases

  require('time-grunt')(grunt); // shows how long grunt tasks take ~ https://github.com/sindresorhus/time-grunt
  require("load-grunt-tasks")(grunt);

};
