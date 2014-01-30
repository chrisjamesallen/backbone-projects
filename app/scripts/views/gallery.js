/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function($, _, Backbone, JST) {
    'use strict';

    var GalleryView = Backbone.View.extend({
        id: 'Gallery',
        template: JST['app/scripts/templates/gallery.ejs'],
        events: {
            'click .left': 'goBack',
            'click .right': 'goNext'
        },
        addListeners: function() {},
        setElements: function() {},
        render: function($parent) {
            this.$el.html(this.template());
            this.$el.appendTo($parent);
            this.$box = this.$('#Box');
            this.$navigation = this.$('#Navigation');
            this.$navigation.$left = this.$('.arrow.left');
            this.$navigation.$right = this.$('.arrow.right');
            this.$navigation.$left.hide();
            return this;
        },

        goBack: function() {

            this.$navigation.$right.show();
            this.$navigation.$left.hide();
            this.$box.removeClass();
            this.$box.addClass('image-one');
        },
        goNext: function() {
            this.$navigation.$right.hide();
            this.$navigation.$left.show();
            this.$box.removeClass();
            this.$box.addClass('image-two');
        }
    });

    // Backbone.extend()

    return GalleryView;
});
