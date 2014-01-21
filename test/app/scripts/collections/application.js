/*global test, Backbone*/

test.Collections = test.Collections || {};

(function () {
    'use strict';

    test.Collections.ApplicationCollection = Backbone.Collection.extend({

        model: test.Models.ApplicationModel

    });

})();
