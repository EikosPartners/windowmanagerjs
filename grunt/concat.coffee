module.exports = ( grunt ) ->
    #options:
        #banner: grunt.file.read('src/setup.js', {encoding: "utf-8"}) + "\n"
    dist:
        src: ['src/EventHandler.js', 'src/header.js', 'src/geometry.js', 'src/runtimes/**/*', 'src/footer.js']
        dest: 'dist/<%= package.name %>.js'