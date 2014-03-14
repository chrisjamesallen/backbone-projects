/*global define*/
define([
    'jquery',
    'underscore',
    'backbone'
], function($, _, Backbone) {

    _.extend(Backbone.View.prototype, {
        template: _.template(''),
        super: function(fn, args) {
            var fn_ = this.constructor.__super__[fn];
            if (fn_) {
                this.constructor.__super__[fn].apply(this, args);
            }
        },

        initialize: function(args) {
            this.childViews = [];
            this.state = this.state || (args && args.state) || new Backbone.Model();
        },

        get: function(key, value) {
            return this.state.get(key);
        },

        set: function(key, value) {
            return this.state.set(key, value);
        },

        listen: function() {
            this.addListener(this.state, 'change', this.onChange);
            this.addListener(window.app.vent, 'window:resize', this.onResize);
        },

        active: function() {
            this.set('active', true);
            this.addListener(this.state, 'change', this.onChange);
            this.addListener(window.app.vent, 'window:resize', this.onResize);
        },

        inActive: function() {
            this.set('active', false);
        },

        addListener: function(obj, key, method, context) {
            this.listeners = this.listeners || [];
            var listener = {};
            listener.obj = obj;
            listener.key = key;
            listener.callback = _.bind(method, context || this);
            this.listeners.push(listener);
            if (obj instanceof jQuery) {
                obj.on(key, listener.callback);
                listener.isJquerySelector = true;
            } else {
                this.listenTo(obj, key, listener.callback);
            }
        },

        removeAllListeners: function() {
            var self = this;
            this.undelegateEvents();
            _.each(this.listeners, function(listener, index, list) {
                self.destroyListener(listener);
            });
            this.stopListening();
        },

        removeListener: function(obj, key) {
            var l, self;
            self = this;
            if (key) {
                l = _.findWhere(this.listeners, {
                    'obj': obj,
                    'key': key
                });
            } else {
                l = _.findWhere(this.listeners, {
                    'obj': obj
                });
            }
            if (obj instanceof jQuery) {
                l = _.findWhere(this.listeners, {
                    'key': key
                });
                l = _.filter(this.listeners, function(i) {
                    if (i.obj instanceof jQuery) {
                        return i.obj.is(obj);
                    }
                });
            }
            _.each(l, function(item) {
                self.destroyListener(item);
            })
        },

        destroyListener: function(listener) {
            if (listener.isJquerySelector) {
                listener.obj.off(listener.key, listener.callback);
            } else {
                this.stopListening(listener.obj, listener.key, listener.callback);
            }
            this.listeners = _.without(this.listeners, listener);
        },

        onChange: function() {
            // called on state change
        },

        destroy: function() {
            this.stopListening();
            this.removeAllChildViews();
            this.parentView.childViews = _.without(this.parentView.childViews, this);
            this.remove();
            this.destroyed = true;
        },

        render: function() {
            this.$el.html(this.template((this.model) ? this.model.toJSON() : this));
            return this;
        },

        renderChildren: function() {
            _.each(this.childViews, _.bind(function(a) {
                //check if already in dom
                if (!jQuery.contains($('body').get(0), a.$el.get(0))) {
                    a.$el.appendTo(this.$el);
                }
                a.render();
            }, this));
        },

        leave: function(transition) {
            var deferred;
            deferred = this.transitionOut(transition);
            deferred.done(_.bind(function() {
                this.destroy();
            }, this));

            return deferred;
        },

        transitionOut: function(transition) {
            return new $.Deferred().resolve();
        },

        addChild: function(view) {
            if (!_.contains(this.childViews, view)) {
                this.childViews.push(view);
                view.parentView = this;
                //check if already in dom
                if (!jQuery.contains($('body').get(0), view.$el.get(0))) {
                    view.$el.appendTo(this.$el);
                }
            }
        },

        defer: function(fn, delay) {
            if (delay) {
                _.delay(_.bind(fn, this), delay);
            } else {
                _.defer(_.bind(fn, this));
            }
        },

        renderChild: function(view) {
            this.addChild(view);
            view.render();
        },

        removeChild: function(view, removeFn) {
            var viewIndex = _.indexOf(this.childViews, view);
            if (viewIndex) {
                this.childViews.splice(viewIndex, 1);
                if (removeFn) {
                    removeFn(view);
                } else {
                    view.destroy();
                }
            }
        },

        removeAllChildViews: function() {
            _.each(this.childViews, function(childView) {
                childView.destroy();
            });
        },

        onResize: function() {

        },

        reposition: function() {

        }

    });


    _.extend(Backbone.Collection.prototype, {
        super: function(fn) {
            this.constructor.__super__[fn].apply(this, arguments.callee.caller.arguments);
        },
        initialize: function() {
            this.state = new Backbone.Model();
            return this;
        }
    });


    _.extend(Backbone.Model.prototype, {
        super: function(fn) {
            this.constructor.__super__[fn].apply(this, arguments.callee.caller.arguments);
        }
    });
});
