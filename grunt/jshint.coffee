
module.exports = ( grunt ) ->
    options = grunt.file.readJSON '.jslintrc'
    options.reporter = require 'jshint-stylish'

    options: options
    extension: ['src/**/*.js']
    test: ['test/**/*.js']

