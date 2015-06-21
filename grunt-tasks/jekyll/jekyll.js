module.exports = function (grunt, config) {
  "use strict";

  grunt.registerTask("jekyllBuild", [
    "shell:jekyllBuild",
    "img"
  ]);

  grunt.registerTask("img", [
    "responsive_images"
  ]);

  grunt.registerTask("deploy", [
    "build",
    "shell:rsyncProd"
  ]);
  
  grunt.registerTask("deployDev", [
    "build",
    "shell:rsyncDev"
  ]);

  grunt.config.merge({

    shell: {
      jekyllBuild: {
        command: "bundle exec jekyll build"
      },
      cleanDest: {
        command: "rm -rf " + config.jekyll.destination + " && mkdir " + config.jekyll.destination
      },
      rsyncDev: {
        command: "rsync --recursive --update --delete  --progress --human-readable --quiet  --log-file=rsync-log.txt " + config.jekyll.destination + " evlove@evanlovely.com:/home/evlove/www/dev.evanlovely.com/public/"
      },
      rsyncProd: {
        command: "rsync --recursive --update --delete  --progress --human-readable --quiet  --log-file=rsync-log.txt " + config.jekyll.destination + " evlove@evanlovely.com:/home/evlove/www/evanlovely.com/public/"
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
          "jekyllBuild",
          "shell:livereload"
        ]
      }
    },

    //imagemin: {},

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
