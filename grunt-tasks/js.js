module.exports = function (grunt, config, _, bower) {
  "use strict";
  // `config` vars set in `Gruntconfig.yml`

  var jsFiles = [
    config.jsDir + "*.{js,min.js}"
  ];

  var jsHintForce = true;
  if (grunt.option('noTestForce')) {
    jsHintForce = false;
  }

  grunt.registerTask("jsPrep", [
    "newer:babel",
    "newer:copy:js"
  ]);
  
  //grunt.registerTask('bowerMin', '', function () {
  //  var done = this.async();
  //  var bowerPaths;
  //  bower.commands.list({paths: true}).on('end', function (output) {
  //    bowerPaths = _.flattenDeep(_.values(output));
  //    var currentSetting = grunt.config.get('uglify.jsmin.src');
  //    var newSetting = currentSetting.concat(bowerPaths);
  //    grunt.config.set('uglify.jsmin.src', newSetting);
  //    grunt.task.run('uglify:jsmin');
  //    done(true);
  //  });
  //});
  
  //function getBowerPaths() {
  //  //var done = this.async();
  //  var bowerPaths;
  //  bower.commands.list({paths: true}).on('end', function (output) {
  //    bowerPaths = _.flattenDeep(_.values(output));
  //    console.log(bowerPaths);
  //    //done(true);
  //    return bowerPaths;
  //  });
  //}

  grunt.config.merge({
    watch: {
      js: {
        files: jsFiles,
        tasks: [
          "newer:copy:js",
          "shell:livereload",
          "newer:jshint:js"
        ]
      },
      babel: {
        files: "<%= babel.js.src %>",
        tasks: ["newer:babel:js"]
      }
    },
    copy: {
      js: {
        src: config.jsDir + "*.{js,js.map,min.js}",
        dest: config.jekyll.destination + ""
      }
    },
    uglify: {
      options: {
        sourcemap: true, // @todo fix js sourcemaps
        screwIe8: true,
        beautify: true
      },
      js: {
        src: config.jekyll.destination + "js/**/*.js",
        dest: config.jekyll.destination + "js/all.min.js"
      }
    },
    babel: {// https://github.com/babel/grunt-babel
      options: {
        sourceMap: true
      },
      js: {
        src: config.jsDir + "es6/**/*.{js,jsx}",
        dest: config.jekyll.destination + "js/compiled-from-es6.js"
      }
    },
    jshint: {
      options: {
        jshintrc: ".jshintrc",
        force: jsHintForce
      },
      js: {
        files: {
          src: jsFiles
        }
      }
    }
  });

};
