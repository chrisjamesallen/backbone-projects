/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'vendor/particle'

], function($, _, Backbone, Particle) {
    'use strict';

    var ParticleController = function(particles) {
        var minParticles = 4;
        var maxParticles = 9;
        var NUM_PARTICLES = Math.floor(Math.random() * (maxParticles - minParticles) + minParticles);
        NUM_PARTICLES = 5;
        this.activeParticles = [];
        this.particleImages = _.shuffle(particles) || [];
        this.xVelocityMax = 2;
        this.xVelocityMin = 1;
        this.yVelocityMax = 2;
        this.yVelocityMin = 1;

        for (var i = 0; i < NUM_PARTICLES; i++) {

            // Random velocity
            var xVelocity = Math.round(Math.random() * (this.xVelocityMax - this.xVelocityMin) + this.xVelocityMin);
            var yVelocity = Math.round(Math.random() * (this.yVelocityMax - this.yVelocityMin) + this.yVelocityMin);

            // Select a random image
            // var image = this.particleImages[ Math.floor( Math.random() * this.particleImages.length ) ];

            var image = this.particleImages[i];
            var side = (_.random(0, 1)) ? -1 : 1;
            var particle = new Particle(image, xVelocity * side, yVelocity * side);

            this.activeParticles.push(particle);

            particle.getElement().onclick = this.remove.bind(this, particle);
        }

        this.$el = $('<div></div>').addClass('flakes');

        // Begin update loop

        return this;
    };

    ParticleController.prototype = {

        render: function($el) {
            var TIMER_INTERVAL = 50; // in ms

            for (var i = 0; i < this.activeParticles.length; i++) {
                var particle = this.activeParticles[i];
                this.$el.append(particle.img);
            }
            (function(thisRef) {
                thisRef.timer = setInterval(function() {
                    thisRef.update();
                }, TIMER_INTERVAL);
            })(this);

        },

        remove: function(particle) {
            particle.remove();

            var arrayIndex = this.activeParticles.indexOf(particle);
            if (arrayIndex !== -1) {
                this.activeParticles.splice(arrayIndex, 1);
            }
        },

        update: function() {
            if (this.activeParticles.length > 0) {
                for (var i = 0; i < this.activeParticles.length; i++) {
                    // Remove any particles that are out of bounds
                    var particle = this.activeParticles[i];
                    if (particle.position.x + particle.position.width < 0 || particle.position.x > $(window).width() || (particle.position.y + particle.position.height) < 0 || particle.position.y > $(window).height()) {
                        this.remove(particle);
                        return;
                    }
                    particle.update();
                }
            } else {
                clearInterval(this.timer);
            }
        },

        stop: function() {
            clearInterval(this.timer);
        }

    };

    return ParticleController;

});
