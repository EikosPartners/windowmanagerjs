module.exports = ( grunt ) ->
    options = grunt.file.readJSON 'jsdoc.json'

    dist:
        src: []
        dest: "docs"
        options:
            configure: "jsdoc.json"
