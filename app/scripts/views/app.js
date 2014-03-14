/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/gallery'

], function($, _, Backbone, JST, Gallery) {
    'use strict';

    var AppView = Backbone.View.extend({
        id: 'App',
        template: JST['app/scripts/templates/app.ejs'],
        addListeners: function() {
            this.listenTo(window.app.routes, 'start', _.bind(this.render, this));
        },
        initialize: function($parent) {
            this.addListeners();
            this.$el.appendTo($parent);
            this.gallery = new Gallery();
            return this;
        },
        render: function() {
            this.super('render');
            this.gallery.active();
            this.gallery.$el.appendTo(this.$('#Gallery-container'));
            this.defer(this.addGallery);
            return this;
        },
        addGallery: function() {
            this.gallery.render();
        }

    });

    return AppView;
});
