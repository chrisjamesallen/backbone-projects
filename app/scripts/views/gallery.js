/*global define*/

define([
        'jquery',
        'underscore',
        'backbone',
        'templates',
        'collections/images',
        'views/gallery_item',
        'views/gallery_credits',
        'views/gallery_continue',
        'views/creatures'
    ],
    function($, _, Backbone, JST, Images, GalleryItem, GalleryCredits, GalleryContinue, Creatures) {
        'use strict';

        var GalleryView = Backbone.View.extend({
            id: 'Gallery',
            template: JST['app/scripts/templates/gallery.ejs'],
            events: {
                'click .left': 'goPreviousPage',
                'click .right': 'goNextPage',
                'click .view_gallery': 'goNextPage'
            },
            items: [],
            setListeners: function() {
                this.listenTo(this.images.collection, 'sync', _.bind(this.addViews, this));
                this.listenTo(this.images.collection, 'change:saved', _.bind(this.showButtons, this));
                this.listenTo(this.images.collection, 'change:selected', _.bind(this.showButtons, this));
                $(window).on('mousemove', _.debounce(_.bind(this.onIdle, this), 4000));
                $(window).on('mousemove', _.debounce(_.bind(this.onActive, this), 4000, true));
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

            addViews: function() {
                this.addGalleryViews();
                this.addCredits();
                this.addContinue();
                this.images.loadGallery();
                this.rePosition();
            },

            addGalleryViews: function() {
                console.log('collection json loaded.,..');
                _.each(this.images.collection.models, _.bind(function(item) {
                    var i = new GalleryItem({
                        model: item
                    });
                    this.items.push(i);
                    this.$box.append(i.$el);
                }, this));

            },

            addCredits: function() {
                this.credits = new GalleryCredits({
                    model: new Backbone.Model()
                });
                this.images.collection.push(this.credits.model);
                this.$box.append(this.credits.el);
                this.credits.render();
            },

            addContinue: function() {
                this.continue_ = new GalleryContinue({
                    model: new Backbone.Model()
                });
                this.images.collection.push(this.continue_.model);
                this.$box.append(this.continue_.el);
                this.continue_.render();
            },


            showButtons: function() {
                this.delegateEvents(this.events);
                this.stopListening(this.images.collection, 'change:saved');

                var i = this.images.getPageIndex();

                this.$navigation.$left.css({
                    'display': 'inline-block'
                });
                this.$navigation.$right.css({
                    'display': 'inline-block'
                });

                if (i <= 0) {
                    this.$navigation.$left.hide();
                } else {
                    if (!this.hasShowTitle) {
                        $('#Title h1, #note').css('opacity', 0);
                        _.delay(_.bind(this.hideTitle, this), 2000);
                        this.hasShowTitle = true;
                    }
                }

                if (i >= this.images.collection.length - 1) {
                    this.$navigation.$right.hide();
                }

            },

            hideTitle: function() {
                $('#Title').hide();
            },

            turnOnCreatures: function() {
                if (!Modernizr.touch) {
                    this.creatures = new Creatures();
                    _.delay(_.bind(function() {
                        $('.particle').css('opacity', 1);
                    }, this), 1000 );
                }
            },

            goPreviousPage: function(e) {
                if (e) e.preventDefault();
                //slide left 100% width
                //only go as far as collection saved length
                this.images.prevImage();
                this.rePosition();
            },

            goNextPage: function(e) {
                if (e) e.preventDefault();
                //slide right 100% width
                this.images.nextImage();
                this.rePosition();
            },

            showCredits: function() {

            },

            rePosition: function() {
                this.$box.css({
                    'left': -($(window).width() * _.max([this.images.getPageIndex(), 0])),
                    'height': $(window).height()
                });
            },

            onActive: function() {
                $('#Title, #Navigation, #Share, #continue, .footer').removeClass('hidden').addClass('visible');
            },

            onIdle: function() {
                $('#Title, #Navigation, #Share, #continue, .footer').removeClass('visible').addClass('hidden');
            }
        });

        // Backbone.extend()

        return GalleryView;
    });
