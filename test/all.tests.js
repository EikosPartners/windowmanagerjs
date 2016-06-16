require.config({
    paths: {
        boot: '../lib/jasmine/boot',
        'jasmine-html': '../lib/jasmine/jasmine-html',
        jasmine: '../lib/jasmine/jasmine',
        'scalejs.windowfactory-openfin': '../build/scalejs.windowfactory-openfin'
    },
    shim: {
        jasmine: {
            exports: 'window.jasmineRequire'
        },
        'jasmine-html': {
            deps: [
                'jasmine'
            ],
            exports: 'window.jasmineRequire'
        },
        boot: {
            deps: [
                'jasmine',
                'jasmine-html'
            ],
            exports: 'window.jasmineRequire'
        }
    },
    scalejs: {
        extensions: [
            'scalejs.windowfactory-openfin'
        ]
    }
});

require(['boot'], function () {
    require ([
        './scalejs.windowfactory-openfin.test'
    ], function () {
        window.onload();
    });
});
