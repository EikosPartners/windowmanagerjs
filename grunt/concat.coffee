module.exports = ( grunt ) ->
    #options:
        #banner: grunt.file.read('src/setup.js', {encoding: "utf-8"}) + "\n"
    dist:
        src: ['src/EventHandler.js', 'src/setup.js', 'src/geometry.js', 'src/runtimes/**/*', 'src/scalejs.windowfactory.js']
        dest: 'dist/<%= package.name %>.js'