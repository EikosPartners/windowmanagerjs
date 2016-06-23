module.exports =
    build:
        expand: true
        flatten: true
        src: ['build/<%= package.name %>.js']
        dest: 'example/app/Scripts'
        filter: 'isFile'
    release:
        expand: true
        flatten: true
        src: ['build/<%= package.name %>.js', 'build/<%= package.name %>.min.js']
        dest: 'dist'
        filter: 'isFile'
