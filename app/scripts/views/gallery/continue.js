/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function($, _, Backbone, JST) {
    'use strict';

    var GalleryContinueView = Backbone.View.extend({
        className: 'continue',
        template: JST['app/scripts/templates/gallery_continue.ejs'],
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
            var i = this.model.collection.indexOf(this.model);
            this.$el.css({
                'left': (i) * $(window).width(),
                'height': $(window).height()
            });
        },
    });

    return GalleryContinueView;
});
