window.LOVE.Views.CoverVideoPlayer = Backbone.View.extend({
  className: 'player',
  template: JST['index/covers/cover_video_player'],
  DEFAULT_ASPECT: (9 / 14),

  initialize: function () {
    this.super('initialize');
    this.spinner = new ActivityIndicator({inverted: false, use_creatures: false, width: 20, height: 20});
    this.addChild(this.spinner);
    this.active();
    return this;
  },

  listen: function () {
    this.super('listen');
  },

  active: function () {
    this.super('active');
  },

  in_active: function () {
    this.super('in_active');
  },

  render: function () {
    this.super('render');
    this.$el.absolute();
    this.$iframe = this.$('iframe');
    this.$iframe.opacity(0);
    this.spinner.center().spin().show();
    this.defer(this.on_resize);
    this.add_listener(this.$iframe, 'load', this.on_vimeo_load);
    this.render_children();
    return this;
  },

  on_vimeo_load: function () {
    this.$iframe.animate({'opacity': 1});
    this.on_resize();
    this.spinner.hide();
  },

  on_resize: function () {
    this.$el.height(this.$el.width() * this.DEFAULT_ASPECT);
    this.$el.center();
  },

  transition_in: function () {
  },

  transition_out: function () {
  }

});
