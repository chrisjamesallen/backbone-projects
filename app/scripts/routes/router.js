/*global define*/

define([
    'jquery',
    'backbone',
    'views/app'
], function($, Backbone, App) {
    'use strict';

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
