const webpackConfig = require('./webpack.config.js');

module.exports = function(grunt) {
  grunt.initConfig({
    aws: grunt.file.readJSON(process.env.HOME + '/.aws/grunt-aws.json'),
    webpack: {
      myConfig: Object.assign(webpackConfig, { stats: false }),
    },
    s3: {
      options: {
        accessKeyId: '<%= aws.accessKeyId %>',
        secretAccessKey: '<%= aws.secretAccessKey %>',
        bucket: '<%= aws.bucket %>'
      },
      bundle: {
        src: './public/bundle.js',
        dest: 'sdc-booking-service/js/bundle.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-webpack');
  grunt.loadNpmTasks('grunt-aws');
  grunt.registerTask('default', ['webpack', 's3']);
};
