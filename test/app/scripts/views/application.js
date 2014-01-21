/*global test, Backbone, JST*/

test.Views = test.Views || {};

(function () {
    'use strict';

    test.Views.ApplicationView = Backbone.View.extend({

        template: JST['app/scripts/templates/application.ejs']

    });

})();
