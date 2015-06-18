module.exports = function (grunt, config) {
  "use strict";

  grunt.registerTask("jekyllBuild", [
    "shell:jekyllBuild"
  ]);
  
  grunt.registerTask("img", [
    "responsive_images"
  ]);

  grunt.config.merge({

    shell: {
      jekyllBuild: {
        command: "bundle exec jekyll build"
      }
    },

    watch: {
      jekyll: {
        files: [
          "**/*.{md,html}",
          "!**/{readme,README}.md",
          "!node_modules/**",
          "!bower_components/**"
        ],
        tasks: [
          "shell:jekyllBuild",
          "shell:livereload"
        ]
      }
    },

    responsive_images: {
      options: {
        separator: "--",
        sizes: [
          {
            name: "w800",
            width: "800px",
            quality: 80
          },
          {
            name: "w1200",
            width: "1200px"
          }
        ]
      },
      all: {
        files: [
          {
            expand: true,
            src: ["img/**/*.jpg"],
            dest: config.jekyll.destination,
            rename: function (dest, src) {
              var path = src.split('/');
              var file = path.pop();
              var newDest = dest + "/" + path.join('/') + "/generated/" + file;
              grunt.log.debug("src file: " + src);
              grunt.log.debug("dest file: " + newDest);
              return newDest;
            }
          }
        ]
      }
    }


  });

};
