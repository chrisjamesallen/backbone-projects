/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/gallery_item_footer'
], function($, _, Backbone, JST, GalleryItemFooter) {
    'use strict';

    var GalleryitemView = Backbone.View.extend({
        template: JST['app/scripts/templates/gallery_item.ejs'],
        className: 'item',
        initialize: function() {
            $(window).on('resize', _.bind(this.resize, this));
            this.$el.html(this.template());
            this.resize();
            this.listenTo(this.model, 'change:saved', _.bind(this.render, this));
            return this;
        },
        render: function() {
            this.$el.html(this.template());
            this.$('.cell').empty().append(this.model.get('img'));
            this.addFooter();
            this.resize();
            return this;
        },

        addFooter: function() {
            this.footer = new GalleryItemFooter({
                model: this.model
            });
            this.footer.render().$el.appendTo(this.$el);
        },

        resize: function() {

            if (this.$('img').length) {
                var targetW = $(window).width() * 0.7;
                var boundaryW = $(window).width() * 0.9;
                var targetH = $(window).height() * 0.7;
                var w = this.$('img').width();
                var h = this.$('img').height();
                var aspect = w / h;
                this.$el.width($(window).width());
                //check if target height works to width
                if (targetH * aspect < boundaryW) {
                    //..use height target
                    this.$('img').width(targetH * aspect);
                    this.$('img').height(targetH);
                } else {
                    this.$('img').width(targetW);
                    this.$('img').height(targetW / aspect);
                }
            }

            var i = this.model.collection.indexOf(this.model);
            this.$el.css({
                'left': i * $(window).width(),
                'height': $(window).height()
            });
        }
    });

    return GalleryitemView;
});
