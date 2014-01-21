/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'modernizr',
    'templates',
    'soundmanager'
], function($, _, Backbone, Modernizr, JST, soundManager) {
    'use strict';

    var SoundView = Backbone.View.extend({
        template: JST['app/scripts/templates/sound.ejs'],
        initialize: function() {
            soundManager.setup({
                useFlashBlock: true, // optional - if used, required flashblock.css
                url: 'vendor/swf/' // required: path to directory containing SM2 SWF files
            });

            soundManager.setup({
                preferFlash: false,
                onready: function() {
                    if (!Modernizr.touch) {
                        window.song = soundManager.createSound({
                            url: 'sound/miley.mp3'
                        });
                        window.song.play();
                    }
                }
            });
        }
    });

    return SoundView;
});
