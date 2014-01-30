/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var StickersView = Backbone.View.extend({
        template: JST['app/scripts/templates/stickers.ejs']
    });

    return StickersView;
});