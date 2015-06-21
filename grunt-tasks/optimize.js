module.exports = function (grunt, config) {
  "use strict";

  grunt.registerTask("optimize", [
    "imagemin"
  ]);

  grunt.config.merge({

    imagemin: {
      dest: {
        files: [{
          expand: true,
          cwd: config.jekyll.destination,
          src: "**/*.{jpg,jpeg,gif,png}",
          dest: config.jekyll.destination
        }]
      }
    },

    responsive_images: {
      all: {
        options: {
          separator: "--",
          sizes: [
            {
              name: "w800",
              width: "800px",
              quality: 80,
              upscale: false
            },
            {
              name: "w1200",
              width: "1200px",
              upscale: false
            },
            {
              name: "w2000",
              width: "2000px",
              upscale: false
            }
          ]
        },
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
