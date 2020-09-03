const webpackConfig = require('./webpack.config.js');

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    webpack: {
      myConfig: Object.assign(webpackConfig, { stats: false }),
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-webpack');

  // Default task(s).
  grunt.registerTask('default', ['webpack']);

};