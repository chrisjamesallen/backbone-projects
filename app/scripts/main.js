/*global require*/
'use strict';
window.app = {

};

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

    modernizr: {
      exports: 'Modernizr'
    },

    jqueryhelper: {
      deps: ['jquery'],
      exports: 'Modernizr'
    }

  },
  paths: {
    jquery: '../bower_components/jquery/jquery',
    jqueryhelper: 'support/plugins-jquery',
    backbone: '../bower_components/backbone/backbone',
    underscore: '../bower_components/underscore/underscore',
    bootstrap: 'vendor/bootstrap',
    modernizr: '../bower_components/modernizr/modernizr'
  }
});

require([
  'backbone',
  'jqueryhelper',
  'support/base_view',
  'routes/router',
  'views/app'
], function ( Backbone, Support1, Support2, Router, App, AppSound) {
  window.app.vent = _.extend({}, Backbone.Events);
  window.app.routes = new Router();
  window.app.view = new App($('#Container'));
  Backbone.history.start();
});