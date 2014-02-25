/*global app, Backbone, JST*/

app.Views = app.Views || {};

(function () {
    'use strict';

    app.Views.GalleryCreditsJsView = Backbone.View.extend({

        template: JST['app/scripts/templates/gallery_credits.js.ejs']

    });

})();
