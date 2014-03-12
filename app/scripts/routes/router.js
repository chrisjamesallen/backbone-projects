/*global define*/

define([
    'jquery',
    'backbone',
    'views/app'
], function($, Backbone, App) {
    'use strict';
    //TODO add actual useable routes here
    var RouterRouter = Backbone.Router.extend({
        routes: {
            '': 'default'
        },

        default: function() {
            this.trigger('start');
        }
    });

    return RouterRouter;
});
