window.LOVE.Views.IndexCover = Backbone.View.extend({
  template: JST['index/covers/cover'],
  id: 'Cover',

  initialize: function () {
    this.super('initialize');
    var hasCover = !_.isEmpty(window.LOVE.Data.Cover);
    var hasVideo = window.LOVE.Data.Cover && window.LOVE.Data.Cover.cover.vimeo_id;
    var hasPost = window.LOVE.Data.Cover && window.LOVE.Data.Cover.cover.path;
    if (hasCover) {
      this.set('has_cover', true);
    }
    if (hasVideo) {
      this.set('has_video', true);
    }
    if (hasPost) {
      this.set('has_post', true);
    }
    this.model = new Backbone.Model(window.LOVE.Data.Cover);
    this.image = new window.LOVE.Views.CoverImage({'model': this.model});
    this.video = new window.LOVE.Views.CoverVideoPlayer({'model': this.model});
    return this;
  },

  active: function () {
    this.super('active');
    if (this.get('has_cover')) {
      this.load_background();
    } else {
      this.set('failed', true);
      this.$el.hide();
      this.in_active();
    }
  },


  render: function () {
    if (this.get('has_cover')) {
      this.super('render');
      this.defer(this.render_children);
      this.$el.opacity(0);
      this.$title = this.$('.title').center();
      this.$title.hide();
      this.on_resize();
    }
    return this;
  },

  load_background: function () {
    this.addChild(this.image);
    this.add_listener(this.image.state, 'change:ready', this.on_background_ready);
    this.image.render();
    this.$el.show();
  },

  on_background_ready: function () {
    if (this.image.state.get('ready')){
      this.set('ready', true);
      this.transition_in();
    }

    if (this.get('has_video')) {
      this.load_video();
    }

  },

  load_video: function () {
    this.addChild(this.video);
    this.video.render();
  },

  on_resize: function () {
    if (this.get('active')) {
      this.$title.center();
      this.$el.height($(window).height());
    }
  },

  transition_in: function () {
    if ( this.get('has_post') && !this.get('has_video') ) {
      this.$title.show().center().opacity(0).delay(2000).animate({'opacity': 1});
    }
    this.$el.show().opacity(0).animate({'opacity': 1});
  },

  transition_out: function () {
    this.$el.animate({'opacity': 0});
  }

})
;
