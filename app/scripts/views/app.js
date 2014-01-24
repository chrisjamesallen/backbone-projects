/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function($, _, Backbone, JST) {
    'use strict';

    var AppView = Backbone.View.extend({
        id: 'App',
        template: JST['app/scripts/templates/app.ejs'],
        addListeners: function() {
            this.listenTo(window.app.routes, 'start', _.bind(this.render, this));
            $(window).on('resize', _.bind(this.resize, this));
        },
        initialize: function($parent) {
            this.addListeners();
            this.$el.appendTo($parent);

            return this;
        },
        render: function() {
            this.$el.html(this.template());
            this.$video = this.$('.video');
            this.resize();
            return this;
        },
        resize: function() {
            var aspect = 9 / 16;
            var w = _.min([$(window).width() * 0.75, 1000]);
            var h = w * aspect;
            this.$video.css({
                width: w,
                height: h
            });
        }
    });

    return AppView;
});
