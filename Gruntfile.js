module.exports = function (grunt) {
  "use strict";
  var _ = require("lodash");
  var bower = require("bower");
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
  require('./grunt-tasks/libsass/libsass.js')(grunt, config);
  require('./grunt-tasks/js.js')(grunt, config, _, bower);
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
    },
    browserSync: {
      dev: {
        options: {
          proxy: "mysite.dev", // you must set URL to your localhost here 
          //tunnel: true, // tunnel your localhost out to the internet ~ http://localtunnel.me
          //reloadDelay: 500,
          watchTask: true
        },
        bsFiles: {
          src: "public/css/style.css"
        }
      }
    }
  });
  // End Misc Config


// End Config

// Begin Task Aliases
  grunt.registerTask("compile", [
    //"validate",
    "icons-build",
    "jsPrep",
    "stylesCompile",
    "jekyllBuild",
    "newer:responsive_images",
    "plBuild",
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
    "browserSync",
    "watch"
  ]);
// End Task Aliases

  require('time-grunt')(grunt); // shows how long grunt tasks take ~ https://github.com/sindresorhus/time-grunt
  require("load-grunt-tasks")(grunt);

};
