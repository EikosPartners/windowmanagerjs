module.exports = ( grunt ) ->
    options:
        banner: grunt.file.read('src/setup.js', {encoding: "utf-8"}) + "\n"
    dist:
        src: ['src/geometry.js','src/runtimes/**/*', 'src/scalejs.windowfactory.js']
        dest: 'build/<%= package.name %>.js'