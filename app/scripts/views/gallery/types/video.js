/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/gallery/types/shared/footer'
], function($, _, Backbone, JST, GalleryItemFooter) {
    'use strict';

    var GalleryItemView = Backbone.View.extend({
        template: JST['app/scripts/templates/gallery_item.ejs'],
        className: 'item',
        events: {
            'mouseenter .cell img': 'showFooter',
            'mouseleave .cell img': 'hideFooter'
        },

        initialize: function() {
            $(window).on('resize', _.bind(this.resize, this));
            this.$el.html(this.template());
            this.resize();
            this.listenTo(this.model, 'change:saved', _.bind(this.render, this));
            return this;
        },

        render: function() {
            this.$el.html(this.template());
            this.$cell = this.$('.cell');
            this.$cell.empty().addClass('hidden');
            this.$cell.append(this.model.get('img'));
            _.defer(_.bind(function() {
                this.$cell.addClass('visible');
                this.$cell.removeClass('hidden');
            }, this));
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

        showFooter: function() {
            this.footer.$('h6').removeClass('hidden').addClass('visible');
        },

        hideFooter: function() {
            this.footer.$('h6').removeClass('visible').addClass('hidden');
        },

        resize: function() {
            if(this.$('img').length) {
                var targetW = $(window).width() * 0.85;
                var boundaryW = $(window).width() * 0.9;
                var targetH = $(window).height() * 0.85;
                var w = this.$('img').width();
                var h = this.$('img').height();
                var aspect = w / h;

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
            this.$el.width($(window).width());
            this.$el.css({
                'left': i * $(window).width(),
                'height': $(window).height()
            });
        }
    });

    return GalleryItemView;
});
