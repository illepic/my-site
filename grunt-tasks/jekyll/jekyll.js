module.exports = function (grunt, config) {
  "use strict";
  
  grunt.registerTask("jekyllBuild", [
    "shell:jekyllBuild"
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
    }
    
  });

};
