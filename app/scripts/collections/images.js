/*global define*/

define([
  'underscore',
  'backbone',
  'models/image'
], function (_, Backbone, ImageModel) {
  'use strict';

  var Images = Backbone.Model.extend({
    defaults: {
      images_saved: 0
    },

    initialize: function () {
      this.collection = new Backbone.Collection([], {
        model: ImageModel,
        url: (!Modernizr.touch) ? 'scripts/templates/data.json' : 'scripts/templates/data_mobile.json'
      });
      this.collection.parse = this.parse;

      this.listenTo(this.collection, 'change:saved', _.bind(this.savedImage, this));
    },


    parse: function (response) {
      this.title = response.title;
      return response.assets;
    },

    //public
    fetch: function () {
      this.collection.fetch();
    },

    //public
    loadGallery: function () {
      this.loadAnImage();
    },

    loadAnImage: function () {
      var nextItem = this.collection.findWhere({
        'saved': false
      });
      if (nextItem) {
        nextItem.backgroundload();
      }
    },

    savedImage: function () {
      this.set('saved', (this.get('images_saved')) + 1);
      this.loadAnImage();
    },

    nextImage: function () {
      this.changeImageSelected(1);
    },

    prevImage: function () {
      this.changeImageSelected(-1);
    },

    getPage: function () {
      return this.collection.findWhere({
        'selected': true
      });
    },

    getPageIndex: function () {
      return this.collection.indexOf(this.getPage());
    },

    changeImageSelected: function (direction) {
      var selected = this.getPage();
      //deselect
      if (_.isEmpty(selected)) {
        selected = this.collection.first();
      } else {
        selected.set('selected', false);
      }

      //assign
      selected = this.collection.models[(this.collection.indexOf(selected) + direction)];
      if (_.isEmpty(selected)) {
        selected = this.collection.first();
      }
      selected.set('selected', true);
      return selected;
    },

    onChange: function () {

    }
  });
  window.Images = Images;
  return Images;
});
