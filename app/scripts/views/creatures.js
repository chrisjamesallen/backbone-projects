/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var CreaturesView = Backbone.View.extend({
        template: JST['app/scripts/templates/creatures.ejs']
    });

    return CreaturesView;
});