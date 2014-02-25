/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function($, _, Backbone, JST) {
    'use strict';

    var GalleryCreditsView = Backbone.View.extend({
        className: 'credits',
        template: JST['app/scripts/templates/gallery_credits.ejs'],
        render: function() {
            $(window).on('resize', _.bind(this.resize, this));
            this.$el.html(this.template());
            this.resize();
            return this;
        },
        resize: function() {
            this.$el.width($(window).width());
            this.$p = this.$('p');
            this.$('.cell').height($(window).height());
            this.$('.cell').width($(window).width());
            this.$el.css({
                'left': (this.model.collection.length - 1) * $(window).width(),
                'height': $(window).height()
            });
        },
        show: function() {
            this.$el.show();
            this.resize();
        },
        hide: function() {
            this.$el.hide();
        }
    });

    return GalleryCreditsView;
});
