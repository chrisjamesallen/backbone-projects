/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
], function ($, _, Backbone, JST) {
  'use strict';

  var Player = Backbone.View.extend({
    className: 'player',
    template: JST['app/scripts/templates/gallery_item_video_player.ejs'],
    DEFAULT_ASPECT: (9 / 14),


    initialize: function () {
      this.super('initialize');
      this.spinner = new ActivityIndicator({inverted: false, use_creatures: true, width: 20, height: 20});
      this.addChild(this.spinner);
      this.active();
      return this;
    },

    active: function () {
      this.super('active');
      this.addListener(this.model,'change:selected',this.checkSelected);
    },

    in_active: function () {
      this.super('in_active');
    },

    render: function () {
      this.super('render');
      this.$iframe = this.$('iframe');
      this.$iframe.opacity(0);
      this.spinner.center();
      this.onResize();
      this.defer(this.onResize);
      this.set('loaded',false);
      this.addListener(this.$iframe, 'load', this.on_vimeo_load);
      this.renderChildren();
      return this;
    },

    checkSelected: function(){
      if(this.model.get('selected')){
        if(this.$iframe){
          var url = this.$iframe.attr('src');
          this.$iframe.attr('src', url + '&autoplay=true' )
        }
      }
    },

    on_vimeo_load: function () {
      this.$iframe.animate({'opacity': 1});
      this.onResize();
      this.spinner.hide();
      this.removeListener(this.$iframe, 'load');
      this.checkSelected();
    },

    onResize: function () {
      this.$el.height(this.$el.width() * this.DEFAULT_ASPECT);
      this.$el.center();
    },

    transition_in: function () {
    },

    transition_out: function () {
    }

  });


  return Player;
});
