/*global define*/
define([
        'jquery',
        'underscore',
        'backbone',
        'templates',
        'collections/images',
        'views/gallery/types/card',
        'views/gallery/types/image',
        'views/gallery/types/video',
        'views/gallery/credits',
        'views/gallery/continue',
        'views/creatures'
    ],
    function($, _, Backbone, JST, Images, GalleryCard, GalleryImage, GalleryVideo, GalleryCredits, GalleryContinue, Creatures) {
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

            addListeners: function() {
                this.listenTo(this.images.collection, 'sync', _.bind(this.onSync, this));
                this.listenTo(this.images.collection, 'change:saved', _.bind(this.showButtons, this));
                this.listenTo(this.images.collection, 'change:selected', _.bind(this.showButtons, this));
                if (Modernizr.touch) {
                    $(window).on('mousemove', _.debounce(_.bind(this.onIdle, this), 2000));
                    $(window).on('mousemove', _.debounce(_.bind(this.onActive, this), 2000, true));
                }
            },

            render: function($parent) {
                this.super('render');
                this.undelegateEvents();
                this.$el.appendTo($parent);
                this.images = new Images();
                this.$box = this.$('#Box');
                this.$navigation = this.$('#Navigation');
                this.$navigation.$left = this.$('.arrow.left');
                this.$navigation.$right = this.$('.arrow.right');
                this.$navigation.$left.hide();
                this.addListeners();
                this.images.fetch();
                this.onActive();
                this.onResize();
                window.gallery = this;
                return this;
            },

            onSync: function() {
                this.addGalleryViews();
                this.addCredits();
                // this.addContinue();
                this.images.loadGallery();
            },

            addGalleryViews: function() {
                _.each(this.images.collection.models, _.bind(function(item) {
                    var i;
                    var View;
                    switch (item.get('type')) {
                        case 'card':
                            {
                                View = GalleryCard;
                                i = new View({
                                    model: item
                                });
                                this.items.push(i);
                                this.$box.append(i.render().$el);
                                break;
                            }
                        case 'video':
                            {
                                View = GalleryVideo;
                                i = new View({
                                    model: item
                                });
                                this.items.push(i);
                                this.$box.append(i.render().$el);
                                break;
                            }
                        default:
                            {
                                View = GalleryImage;
                                i = new View({
                                    model: item
                                });
                                this.items.push(i);
                                this.$box.append(i.$el);
                                break;
                            }
                    }


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


                if (i >= this.images.collection.length - 1) {
                    this.$navigation.$right.hide();
                }
                if (i <= 0) {
                    this.$navigation.$left.hide();
                }

            },



            turnOnCreatures: function() {
                if (!Modernizr.touch) {
                    this.creatures = new Creatures();
                    _.delay(_.bind(function() {
                        $('.particle').css('opacity', 1);
                    }, this), 1000);
                }
            },

            goPreviousPage: function(e) {
                if (e) e.preventDefault();
                //slide left 100% width
                //only go as far as collection saved length
                this.images.prevImage();
                this.onResize();
            },

            goNextPage: function(e) {
                if (e) e.preventDefault();
                //slide right 100% width
                this.images.nextImage();
                this.onResize();
            },

            onResize: function() {
                this.$box.css({
                    'left': -($(window).width() * _.max([this.images.getPageIndex(), 0])),
                    'height': $(window).height()
                });
            },

            onActive: function() {
                $('#Title, #Navigation, #Share, #continue').removeClass('hidden').addClass('visible');
            },

            onIdle: function() {
                $('#Title, #Navigation, #Share, #continue').removeClass('visible').addClass('hidden');
            }
        });


        return GalleryView;
    });
