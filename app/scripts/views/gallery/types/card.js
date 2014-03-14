/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/gallery/types/card_image',
], function($, _, Backbone, JST, CardImage) {
    'use strict';

    var PostCard = Backbone.View.extend({
        className: 'item',
        template: JST['app/scripts/templates/gallery_item_card.ejs'],
        events_active: {
            //'mouseenter': 'showFooter',
            // 'mouseleave': 'hideFooter'
        },


        initialize: function() {
            this.super('initialize');
            this.$el.addClass('card');
            if (this.model.get('hasImage')) {
                this.image = new CardImage({
                    'model': this.model
                });
                this.addChild(this.image);
            }

            this.addListener(this.model, 'change:selected', this.checkSelected);
            this.active();
            return this;
        },

        active: function() {
            this.super('active');
        },

        in_active: function() {
            this.super('in_active');
        },

        checkSelected: function() {

        },

        render: function() {
            this.super('render');
            this.$el.hidden();
            this.renderChildren();
            this.$title = this.$('.title');
            this.onResize();
            this.defer(this.onResize);
            this.delegateEvents(this.events_active);
            this.defer(this.transitionIn, 1000);
            return this;
        },

        onResize: function() {
            var i = this.model.collection.indexOf(this.model);
            this.$title.center();
            this.$el.width($(window).width());
            this.$el.css({
                'left': i * $(window).width()
            });
        },

        transitionIn: function() {
            this.onResize();
            this.$el.opacity(1);
        },

        transition_out: function() {}

    });


    return PostCard;
});
