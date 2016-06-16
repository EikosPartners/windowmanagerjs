define([
    'scalejs!core', 'scalejs!application'
], function(
    core
) {
    var windowfactory = core.windowfactory;

    // For deeper testing, log to console
    console.log('core.windowfactory: ', windowfactory);

    describe('core.windowfactory', function() {

        it('is defined', function() {
            expect(windowfactory).toBeDefined();
        });

    });
});

