/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/gallery',
    'views/creatures'
], function($, _, Backbone, JST, Gallery, Creatures) {
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
            if (Modernizr.touch) {
                this.creatures = new Creatures();
            }
            return this;
        },
        setElements: function() {
            //this.$title = this.$('#Title');
        },
        render: function() {
            this.$el.html(this.template());
            this.setElements();
            //this.$title.hide();

            // Inject gallery
            this.gallery.render(this.$('#Gallery-container'));
            return this;
        }
    });

    return AppView;
});