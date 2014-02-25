/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function($, _, Backbone, JST) {
    'use strict';

    var GalleryItemFooterView = Backbone.View.extend({
        className: 'footer',
        template: JST['app/scripts/templates/gallery_item_footer.ejs'],
        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });

    return GalleryItemFooterView;
});
