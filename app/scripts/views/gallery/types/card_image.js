/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
], function($, _, Backbone, JST) {
    'use strict';

    var CardImage = Backbone.View.extend({
        className: 'image',
        template: JST['app/scripts/templates/gallery_item_card_image.ejs'],
        DEFAULT_ASPECT: (9 / 14),


        initialize: function() {
            this.super('initialize');
            this.spinner = new ActivityIndicator({
                inverted: false,
                use_creatures: false,
                width: 20,
                height: 20
            });
            this.addChild(this.spinner);
            this.active();
            return this;
        },

        active: function() {
            this.super('active');
            this.addListener(this.model, 'change:selected', this.checkSelected);
            this.addListener(this.model, 'change:saved', this.onImageLoad);
        },

        in_active: function() {
            this.super('in_active');
        },

        render: function() {
            this.super('render');
            this.spinner.center();
            this.onResize();
            this.defer(this.onResize);
            this.set('loaded', false);
            this.renderChildren();
            return this;
        },

        checkSelected: function() {
            if (this.model.get('selected')) {

            }
        },

        onImageLoad: function() {
            this.spinner.hide();
          var $image = this.$image = this.model.get('img');
          var aspect = $image[0].width /  $image[0].height;
          console.log('on image load', aspect);
          this.set('aspect', aspect);
            $image.appendTo(this.$el);
            $image.width('100%').height('100%');
            this.onResize();
            this.defer(this.onResize);
            this.removeListener(this.$image, 'load');
            this.checkSelected();
        },

//        onResize: function() {
//            this.$el.height(this.$el.width() * (this.get('aspect') || this.DEFAULT_ASPECT));
//            this.$el.center();
//        }  ,

      onResize: function() {
        this.$el.height(this.$el.width() * (this.get('aspect') || this.DEFAULT_ASPECT));
        if (this.$('img').length) {
          var targetW = $(window).width() * 0.85;
          var boundaryW = $(window).width() * 0.9;
          var targetH = $(window).height() * 0.7;
          var w = this.$('img').width();
          var h = this.$('img').height();
          var aspect = this.get('aspect');

          //check if target height works to width
          if (targetH * aspect < boundaryW) {
            //..use height target
            this.$el.width(targetH * aspect);
            this.$el.height(targetH);
          } else {
            this.$el.width(targetW);
            this.$el.height(targetW / aspect);
          }
        }
        this.$el.center();
      }


    });

  return CardImage;
});
