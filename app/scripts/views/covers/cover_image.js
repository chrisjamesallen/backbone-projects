window.LOVE.Views.CoverImage = Backbone.View.extend({
  className: 'image',

  initialize: function () {
    this.super('initialize');
    //spinner ommitted for now...
    //this.spinner = new ActivityIndicator({inverted: false, use_creatures: true,  width: 50, height: 50});
    //this.addChild(this.spinner);
    return this;
  },

  active: function () {
    this.super('active');
    var url = this.model.get('cover').preview_image.large;
    this.model.set('url', url );
    this.$image = $('<img>').on('load', _.bind(function(){ this.set('loaded', true); this.transition_in();  }, this));
    this.$image.attr('src',  this.model.get('url'));
  },

  in_active: function () {
    this.super('in_active');
  },

  render: function () {
    this.super('render');
    this.active();
    this.render_children();
    return this;
  },

  on_resize: function () {
  },

  transition_in: function () {
    var self = this;
    this.$el.css('background-image', 'url('+this.model.get('url')+')');
    this.$el.opacity(0);
    self.set('ready',true);
    this.$el.animate({'opacity':1}).queue(function(){
    });
    //this.spinner.$el.hide();
  },

  transition_out: function () {
  }

});
