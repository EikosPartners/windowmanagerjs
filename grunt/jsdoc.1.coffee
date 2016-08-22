module.exports =
    dist:
        src: ['src/**/*.js', 'README.md']
        dest: 'docs'
        options:
            recurse: true
            private: true
            template: "node_modules/minami"
