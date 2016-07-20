module.exports =
    options:
        sourceMap: false
        compact: false
        presets: ['es2015']
        plugins: ["transform-es2015-modules-umd", "transform-object-assign", "transform-es2015-parameters"]
    dist:
        files:
            'build/<%= package.name %>.js': ['build/<%= package.name %>.js']