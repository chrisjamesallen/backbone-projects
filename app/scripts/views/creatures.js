/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'vendor/particle_controller',
], function($, _, Backbone, JST, ParticleController) {
    'use strict';

    var CreaturesView = Backbone.View.extend({
        template: JST['app/scripts/templates/creatures.ejs'],
        urls: [
            'images/creatures/1.png',
            'images/creatures/2.png',
            'images/creatures/3.png',
            'images/creatures/4.png',
            'images/creatures/5.png',
            'images/creatures/6.png',
            'images/creatures/7.png',
            'images/creatures/8.png',
            'images/creatures/9.png',
            'images/creatures/10.png',
            'images/creatures/11.png',
            'images/creatures/12.png',
            'images/creatures/13.png',
            'images/creatures/14.png',
            'images/creatures/15.png'
        ],
        initialize: function() {
            this.controller = new ParticleController(this.urls);
            this.controller.$el.appendTo($('body'));
            this.controller.render();
        },

        render: function() {

        }
    });

    return CreaturesView;
});
