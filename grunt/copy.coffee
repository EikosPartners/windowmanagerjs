module.exports =
    release:
        expand: true
        flatten: true
        src: ['build/<%= package.name %>.js', 'build/<%= package.name %>.min.js']
        dest: 'dist'
        filter: 'isFile'
