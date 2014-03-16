/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'views/gallery/types/shared/footer',
  'views/gallery/types/card_image',
], function ($, _, Backbone, JST, GalleryItemFooter, CardImage) {
  'use strict';

  var Picture = Backbone.View.extend({
    className: 'item',
    template: JST['app/scripts/templates/gallery_item_picture.ejs'],
    events_active: {
      //'mouseenter': 'showFooter',
      // 'mouseleave': 'hideFooter'
    },

    initialize: function () {
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

    active: function () {
      this.super('active');
    },

    in_active: function () {
      this.super('in_active');
    },

    checkSelected: function () {
      if (this.model.get('selected')) {
        this.showFooter();
      } else {
        this.hideFooter();
      }
    },

    addFooter: function () {
      this.footer = new GalleryItemFooter({
        model: this.model
      });
      this.footer.render().$el.appendTo(this.$el);
    },

    showFooter: function () {
      this.footer.$('h6').removeClass('hidden').addClass('visible');
    },


    render: function () {
      this.super('render');
      this.$el.hidden();
      this.renderChildren();
      this.$title = this.$('.title');
      this.onResize();
      this.addFooter();
      this.defer(this.onResize);
      this.delegateEvents(this.events_active);
      this.defer(this.transitionIn, 1000);
      return this;
    },

    onResize: function () {
      var i = this.model.collection.indexOf(this.model);
      this.$el.width($(window).width());
      this.$el.css({
        'left': i * $(window).width()
      });
    },

    transitionIn: function () {
      this.onResize();
      this.$el.opacity(1);
    },

    transition_out: function () {
    }

  });


  return Picture;
});
