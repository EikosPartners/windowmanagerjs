module.exports =
    options:
        sourceMap: false
        compact: false
        presets: ["es2015-loose"]
        plugins: [
            "transform-es2015-modules-umd",
            "transform-object-assign"
        ]
    dist:
        files:
            'build/<%= package.name %>.js': ['build/<%= package.name %>.js']