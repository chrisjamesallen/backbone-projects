/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function($, _, Backbone, JST) {
    'use strict';

    var GalleryitemView = Backbone.View.extend({
        template: JST['app/scripts/templates/GalleryItem.ejs'],
        className: 'item',
        initialize: function() {
            $(window).on('resize', _.bind(this.resize, this));
            this.listenTo(this.model, 'change:saved', _.bind(this.render, this));
            return this;
        },
        render: function() {
            this.$el.append(this.model.get('img'));
            this.resize();
            return this;
        },

        resize: function() {
            this.$el.width($(window).width());
        }
    });

    return GalleryitemView;
});
