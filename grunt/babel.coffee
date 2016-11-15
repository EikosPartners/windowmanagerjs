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
            'dist/<%= package.name %>.js': ['dist/<%= package.name %>.js']