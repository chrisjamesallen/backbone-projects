/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'views/gallery/types/shared/footer',
  'views/gallery/types/player'
], function ($, _, Backbone, JST, GalleryItemFooter, VideoPlayer) {
  'use strict';

  var PostVideo = Backbone.View.extend({
    className: 'item',
    template: JST['app/scripts/templates/gallery_item_video.ejs'],
    DEFAULT_ASPECT: (9 / 14),
    events_active: {
      'mouseenter': 'showFooter',
      'mouseleave': 'hideFooter'
    },


    initialize: function () {
      this.super('initialize');
      this.$el.addClass('video');
      this.player = new VideoPlayer({'model': this.model});
      this.addChild(this.player);
      this.active();
      return this;
    },

    active: function () {
      this.super('active');
    },

    in_active: function () {
      this.super('in_active');
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

    hideFooter: function () {
      this.footer.$('h6').removeClass('visible').addClass('hidden');
    },

    render: function () {
      this.super('render');
      this.addFooter();
      this.renderChildren();
      this.onResize();
      this.delegateEvents(this.events_active);
      return this;
    },

    onResize: function () {
      var i = this.model.collection.indexOf(this.model);
      this.$el.width($(window).width());
      this.$el.css({
        'left': i * $(window).width(),
        'height': $(window).height()
      });
    },

    transition_in: function () {
    },

    transition_out: function () {
    }

  });


  return PostVideo;
});
