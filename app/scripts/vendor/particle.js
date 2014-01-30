/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',

], function($, _, Backbone) {
    'use strict';

    var Particle = function(img, xVelocity, yVelocity) {
        this.position = {};

        // Create element and random velocity
        this.img = document.createElement('img');
        this.img.src = img;
        this.img.onload = _.bind(function(event) {
            // Randomly position
            this.position = {
                x: Math.floor($(window).width() - this.img.width) * Math.random(),
                y: Math.floor($(window).height() - this.img.height) * Math.random(),
                height: $(this.img).height(),
                width: $(this.img).width()
            };
        }, this);
        this.img.style.zIndex = 50000;
        this.img.style.position = 'fixed';
        // position offscreen to start
        this.img.style.left = '-1000px';
        this.img.style.top = '-1000px';

        this.xVelocity = xVelocity;
        this.yVelocity = yVelocity;

    };

    Particle.prototype.getElement = function() {
        return this.img;
    };

    Particle.prototype.getHeight = function() {
        return this.img.height;
    };

    Particle.prototype.getWidth = function() {
        return this.img.width;
    };

    Particle.prototype.update = function() {
        this.position.x += this.xVelocity;
        this.position.y += this.yVelocity;

        if (this.position.x > $(window).width() - this.getWidth()) {
            this.position.x = ($(window).width() - this.getWidth());
        }

        if (this.position.y > $(window).height() - this.getHeight()) {
            this.position.y = ($(window).height() - this.getHeight());
        }

        if (this.position.x <= 0 || this.position.x >= $(window).width() - this.getWidth()) {
            this.xVelocity *= -1;
        }

        if (this.position.y <= 0 || this.position.y >= $(window).height() - this.getHeight()) {
            this.yVelocity *= -1;
        }

        this.img.style.left = this.position.x + 'px';
        this.img.style.top = this.position.y + 'px';
    };

    Particle.prototype.remove = function(event) {
        $(this.getElement()).remove();
    };

    return Particle;
});
