/*global require*/
'use strict';

require.config({
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        },
        soundmanager: {
            exports: 'soundManager'
        },
        modernizr: {
            exports: 'Modernizr'
        }

    },
    paths: {
        jquery: '../bower_components/jquery/jquery',
        backbone: '../bower_components/backbone/backbone',
        underscore: '../bower_components/underscore/underscore',
        bootstrap: 'vendor/bootstrap',
        soundmanager: '../bower_components/soundmanager/script/soundmanager2-nodebug-jsmin',
        modernizr: '../bower_components/modernizr/modernizr'
    }
});

require([
    'backbone',
    'routes/router',
    'views/app',
], function(Backbone, Router, App) {

    window.app = {};
    window.app.routes = new Router();
    window.app.view = new App($('#Container'));
    Backbone.history.start();
});
