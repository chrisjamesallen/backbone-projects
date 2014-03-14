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
            this.$p = this.$('.s1');
            this.$('.cell').height($(window).height());
            this.$('.cell').width($(window).width());
            var i = this.model.collection.indexOf(this.model);
            this.$el.css({
                'left': (i) * $(window).width(),
                'height': $(window).height()
            });
            this.$p.center();
        },
        onResize: function() {

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
