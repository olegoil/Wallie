module.exports = function (config) {
    'use strict';

    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['requirejs', 'mocha', 'chai'],

        files: [
            { pattern: 'karma.test.js', included: true },
            { pattern: 'tmp-browser/**/*.js', included: false }
        ],

        // list of files to exclude
        exclude: [],

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress'],

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values:
        // config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true,

        client: {
            mocha: {
                reporter: 'html', // change Karma's debug.html to the mocha web reporter
                ui: 'bdd'
            }
        }

    });
};