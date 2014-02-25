/*global app, Backbone, JST*/

app.Views = app.Views || {};

(function () {
    'use strict';

    app.Views.GalleryCreditsView = Backbone.View.extend({

        template: JST['app/scripts/templates/gallery_credits.ejs']

    });

})();
