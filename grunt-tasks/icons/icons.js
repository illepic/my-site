module.exports = function (grunt, config) {
  "use strict";

  grunt.config.merge({
    webfont: {
      icons: {
        src: 'source/images/icons/src/*.svg',
        dest: 'source/images/icons/output/fonts',
        destCss: 'scss/00-config/',
        options: {
          engine: "node",
          stylesheet: 'scss',
          relativeFontPath: '../images/icons/output/fonts/',
          template: 'source/images/icons/templates/icons.template.css',
          htmlDemo: true,
          htmlDemoTemplate: 'source/images/icons/templates/icons.html',
          destHtml: 'source/images/icons/output/',
          hashes: false,
          syntax: 'bem',
          templateOptions: {
            baseClass: 'icon',
            classPrefix: 'icon--'
          }
        }
      }
    },
    watch: {
      files: [
        'source/images/icons/src/**/*'
      ],
      tasks: ['icons-build']
    }
  });

  grunt.registerTask('icons-cleanup', function() {
    grunt.file.copy('source/images/icons/output/icons.html', 'pattern-lab/source/_patterns/00-atoms/04-images/icons.mustache');
    if (grunt.file.exists('source/images/icons/output/icons.html')) {
      grunt.file.delete('source/images/icons/output/icons.html');
    }
  });
  grunt.registerTask("icons-build", ['webfont:icons', 'icons-cleanup']);

};
