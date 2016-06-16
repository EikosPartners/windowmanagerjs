
module.exports = ( grunt ) ->

    path = require 'path'

    jasmine:
        src: [
            'http://jasmine.github.io/2.0/lib/boot.js',
            'http://jasmine.github.io/2.0/lib/jasmine-html.js',
            'http://jasmine.github.io/2.0/lib/jasmine.js',
            'http://jasmine.github.io/2.0/lib/jasmine.css'
        ]
        dest: path.resolve process.cwd(), 'lib', 'jasmine'

