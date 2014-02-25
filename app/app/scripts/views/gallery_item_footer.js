/*global app, Backbone, JST*/

app.Views = app.Views || {};

(function () {
    'use strict';

    app.Views.GalleryItemFooterView = Backbone.View.extend({

        template: JST['app/scripts/templates/gallery_item_footer.ejs']

    });

})();
