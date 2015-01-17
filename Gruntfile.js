module.exports = function(grunt) {
  "use strict";
  var jsFiles = ["Gruntfile.js", "src/**/*.js"];

  grunt.initConfig({
    jshint: {
      all: jsFiles,
      options: {
        jshintrc: ".jshintrc",
        jshintignore: ".jshintignore"
      }
    },
    watch: {
      css: {
        options: {
          livereload: true
        },
        files: ["src/**/*.css"]

      },
      js: {
        options: {
          livereload: true
        },
        files: ["src/**/*.js"]
      }
    },
    jsbeautifier: {
      js: {
        src: jsFiles,
        options: {
          config: "jsbeautifier.json"
        }
      },
      json: {
        fileTypes: [".json"],
        src: ["bower.json", "package.json", "jsbeautifier.json"],
        options: {
          config: "jsbeautifier.json"
        }
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-jsbeautifier");
  grunt.loadNpmTasks("grunt-contrib-watch");

  /*
  grunt.loadTasks = "tasks";
  require("matchdep").filterAll("grunt-*").forEach(grunt.loadNpmTasks);
  */

  grunt.registerTask("default", ["jsbeautifier", "jshint"]);
};
