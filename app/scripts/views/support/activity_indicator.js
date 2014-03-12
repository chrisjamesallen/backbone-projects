window.ActivityIndicator = Backbone.View.extend({
  className: 'spinner',
  assets: {
    default: {
      white: "spinner-black.png",
      black: "spinner-white.png"
    }


  },
  initialize: function (args) {
    this.super('initialize');
    this.$el.hide();
    this.loading = $.Deferred();
    this.options = args;
    if (args.width && args.height) {
      this.setSize(args.width, args.height);
    }
    this.check_inverted();
    this.active();
    return this;
  },

  setSize: function (w, h) {
    this.$el.css({width: w, height: h});
  },

  checkInverted: function () {
    if (this.options.inverted) {
      this.$el.css('background-image', 'url(' + this.assets.default.white + ')');
    } else {
      this.$el.css('background-image', 'url(' + this.assets.default.black + ')');
    }
    this.$el.addClass('spin');
  },

  waited: function () {
    this.show();
  },

  show: function () {
    if (this.loading.state() === 'pending') {
      this.$el.fadeIn();
    }
    return this;
  },

  hide: function () {
    this.loading.resolve();
    this.$el.fadeOut();
  },

  force_hide: function () {
    this.loading.resolve();
    this.$el.hide();
  },

  center: function () {
    this.$el.css({top: '50%', left: '50%', 'text-align': 'center'});
    this.$el.css({'margin-left': -this.$el.width() * 0.5, 'margin-top': -this.$el.height() * 0.5 });
    return this;
  },

  active: function () {
    this.super('active');
  },

  on_resize: function(){

  },

  render: function () {
    _.delay(_.bind(this.waited, this), 1000);
    this.center();
    return this;
  },

  spin: function () {
    this.$el.addClass('spin');
    return  this;
  },

  leave: function () {
    this.super('leave');
  },

  destroy: function () {
  }

});
