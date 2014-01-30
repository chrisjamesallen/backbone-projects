/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'collections/images',
    'views/GalleryItem'
], function($, _, Backbone, JST, Images, GalleryItem) {
    'use strict';

    var GalleryView = Backbone.View.extend({
        id: 'Gallery',
        template: JST['app/scripts/templates/gallery.ejs'],
        events: {
            'click .left': 'goPreviousPage',
            'click .right': 'goNextPage'
        },
        items: [],
        setListeners: function() {
            this.listenTo(this.images.collection, 'sync', _.bind(this.addGalleryViewsAndLoad, this));
            this.listenTo(this.images.collection, 'change:saved', _.bind(this.showButtons, this));
        },
        setElements: function() {
            this.$el.html(this.template());
            this.$box = this.$('#Box');
            this.$navigation = this.$('#Navigation');
            this.$navigation.$left = this.$('.arrow.left');
            this.$navigation.$right = this.$('.arrow.right');
            this.$navigation.$left.hide();

        },
        render: function($parent) {
            this.undelegateEvents();
            this.$el.appendTo($parent);
            this.setElements();
            this.images = new Images();
            this.setListeners();
            this.images.fetch();
            window.gallery = this;
            return this;
        },

        addGalleryViewsAndLoad: function() {
            console.log('collection json loaded.,..');
            _.each(this.images.collection.models, _.bind(function(item) {
                var i = new GalleryItem({
                    model: item
                });
                this.items.push(i);
                this.$box.append(i.$el);
            }, this));
            this.images.loadGallery();
        },


        showButtons: function() {
            this.delegateEvents(this.events);
            this.stopListening(this.images.collection, 'change:saved');

            var i = this.images.getPage();
            this.$navigation.$left.show();
            this.$navigation.$right.show();

            if (!i) {
                this.$navigation.$left.hide();
            }

            if (i > this.images.collection.length) {
                this.$navigation.$right.hide();
            }
        },

        goPreviousPage: function() {
            //slide left 100% width
            //only go as far as collection saved length
            this.images.prevImage();
            this.$box.css({
                'left': $(window).width() * this.images.getPageIndex()
            });
        },

        goNextPage: function() {
            //slide right 100% width
            this.images.nextImage();
            this.$box.css({
                'left': -($(window).width() * this.images.getPageIndex())
            });

        }
    });

    // Backbone.extend()

    return GalleryView;
});
