/*global define*/

define([
    'underscore',
    'backbone'
], function(_, Backbone) {
    'use strict';

    var ImageModel = Backbone.Model.extend({
        defaults: {
            url: '',
            img: '',
            saved: false,
            selected: false
        },
        backgroundload: function() {
            //take url and make fetch
            var $img = $('<img>');
            this.set('img', $img);
            $img.load(_.bind(this.loaded, this));
            $img.attr('src', this.get('url'));
        },

        load: function() {
            //Some ajax

        },
        loaded: function() {
            //call out loaded
            this.set('saved', true);
        },
        onChange: function() {
            console.log('model change');
        }

    });
    window.Image = ImageModel;

    return ImageModel;
});