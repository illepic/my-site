module.exports = function (grunt, config) {
  "use strict";

  grunt.registerTask("jekyllBuild", [
    "shell:jekyllBuild"
    //"newer:responsive_images"
  ]);

  grunt.registerTask("img", [
    "responsive_images"
  ]);

  grunt.registerTask("deploy", [
    "build",
    "optimize",
    "shell:rsyncProd"
  ]);

  grunt.registerTask("deployDev", [
    "build",
    "optimize",
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
        command: "rsync --recursive --update --delete  --progress --human-readable  --log-file=rsync-log.txt " + config.jekyll.destination + " evlove@evanlovely.com:/home/evlove/www/dev.evanlovely.com/public/"
      },
      rsyncProd: {
        command: "rsync --recursive --update --delete  --progress --human-readable --log-file=rsync-log.txt " + config.jekyll.destination + " evlove@evanlovely.com:/home/evlove/www/evanlovely.com/public/"
      }
    },

    watch: {
      jekyll: {
        files: [
          config.jekyll.source + "**/*.{md,html}",
          "!**/{readme,README}.md"
        ],
        tasks: [
          "shell:jekyllBuild",
          "shell:livereload"
        ]
      }
    }

  });

};
