/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'collections/images',
    'views/GalleryItem',
    'views/creatures'

], function($, _, Backbone, JST, Images, GalleryItem, Creatures) {
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
            this.listenTo(this.images.collection, 'change:selected', _.bind(this.showButtons, this));
            $(window).on('resize', _.bind(this.rePosition, this));
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

            var i = this.images.getPageIndex();

            this.$navigation.$left.show();
            this.$navigation.$right.show();

            if (i <= 0) {
                this.$navigation.$left.hide();
                $('#Title h1').css('opacity', 1);
            } else {
                $('#Title h1').css('opacity', 0);
            }

            if (i >= this.images.collection.length - 1) {
                this.$navigation.$right.hide();
            }

            // if (!this.creatures && i > 0) {
            //     this.turnOnCreatures();
            // }
        },

        turnOnCreatures: function() {
            if (!Modernizr.touch) {
                this.creatures = new Creatures();
                _.delay(_.bind(function() {
                    $('.particle').css('opacity', 1);
                }, this), 1000 );
            }
        },

        goPreviousPage: function() {
            //slide left 100% width
            //only go as far as collection saved length
            this.images.prevImage();
            this.rePosition();
        },

        goNextPage: function() {
            //slide right 100% width
            this.images.nextImage();
            this.rePosition();

        },

        rePosition: function() {
            this.$box.css({
                'left': -($(window).width() * _.max([this.images.getPageIndex(), 0]))
            });
        }
    });

    // Backbone.extend()

    return GalleryView;
});
