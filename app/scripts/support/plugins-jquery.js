(function($) {

    var css3Table = {};
    var css3ref = {
        'duration': '',
        'ease': '',
        'filter': '',

        'appearance': '',
        'backface-visibility': '',
        'perspective': '',
        'perspective-origin': '',
        'transform': '',
        'transform-origin': '',
        'transform-origin-x': '',
        'transform-origin-y': '',
        'transform-origin-z': '',
        'transform-style': '',
        'transition': '',
        'transition-delay': '',
        'transition-duration': '',
        'transition-property': '',
        'transition-timing-function': ''
    };

    function init() {
        $.usecss2 = false;
        var prefix = browserPrefix('transform');
    }

    function suspendCSS3(obj, jumpToCurrent) {

        // Get old values and set to zero duration
        var $this = $(obj);

        return $this.each(function() {

            var $that = $(this);
            var currentCss = {};
            var animationCss = $that.data('animationCss');
            convertToCorrectCss3Prefix(animationCss);


            $that.css3({
                'transition-duration': '0s',
                'transition': '0s'
            });

            for (var prop in animationCss) {
                // currentCss[prop] = $that.css_(prop);
            }

            $that.css3(currentCss);

        });
    }

    $.prototype.suspendCSS3 = function() {

        var $this = $(this);
        return $this.each(function() {

            var $that = $(this);
            var currentCss = {};
            var animationCss = $that.data('animationCss');
            convertToCorrectCss3Prefix(animationCss);

            $that.css3({
                'animation-duration': '0s'
            });
            $that.css3({
                'transition-duration': '0s'
            });

            for (var prop in animationCss) {
                // currentCss[prop] = $that.css_(prop);
            }

            $that.css3(currentCss);

        });

    };


    function convertToCorrectCss3Prefix(cssobj) {

        var a = cssobj;
        for (key in a) {
            if (css3ref[key]) {
                cssobj[css3ref[key]] = a[key];
                delete a[key];
            }
        }
        return cssobj;
    }

    function setDurationFromOptions(obj, duration) {
        //  console.warn('setDurationFromOptions' + ''+ duration);
        $(obj).css3({
            'transition-duration': duration + 'ms'
        });
    }

    function setEasing(obj, kind) {

        var $this = $(obj);
        var a_ = 'cubic-bezier(';
        //CUBIC_BEZIER_OPEN
        var a__ = ')';
        var easing = {
            // Penner equation approximations from Matthew Lein's Ceaser: http://matthewlein.com/ceaser/
            //simpler
            linear: a_ + '0.250, 0.250, 0.750, 0.750' + a__,
            ease: a_ + '0.250, 0.100, 0.250, 1.000' + a__,
            easeIn: a_ + '0.420, 0.000, 1.000, 1.000' + a__,
            easeOut: a_ + '0.000, 0.000, 0.580, 1.000' + a__,
            easeInOut: a_ + '0.420, 0.000, 0.580, 1.000' + a__,
            //more intensive
            easeInQuad: a_ + '0.550, 0.085, 0.680, 0.530' + a__,
            easeInCubic: a_ + '0.550, 0.055, 0.675, 0.190' + a__,
            easeInQuart: a_ + '0.895, 0.030, 0.685, 0.220' + a__,
            easeInQuint: a_ + '0.755, 0.050, 0.855, 0.060' + a__,
            easeInSine: a_ + '0.470, 0.000, 0.745, 0.715' + a__,
            easeInExpo: a_ + '0.950, 0.050, 0.795, 0.035' + a__,
            easeInCirc: a_ + '0.600, 0.040, 0.980, 0.335' + a__,
            easeInBack: a_ + '0.600, 0.0, 0.735, 0.045' + a__,
            /* -0.280 */
            easeOutQuad: a_ + '0.250, 0.460, 0.450, 0.940' + a__,
            easeOutCubic: a_ + '0.215, 0.610, 0.355, 1.000' + a__,
            easeOutQuart: a_ + '0.165, 0.840, 0.440, 1.000' + a__,
            easeOutQuint: a_ + '0.230, 1.000, 0.320, 1.000' + a__,
            easeOutSine: a_ + '0.390, 0.575, 0.565, 1.000' + a__,
            easeOutExpo: a_ + '0.190, 1.000, 0.220, 1.000' + a__,
            easeOutCirc: a_ + '0.075, 0.820, 0.165, 1.000' + a__,
            easeOutBack: a_ + '0.175, 0.885, 0.320, 1.275' + a__,
            easeInOutQuad: a_ + '0.455, 0.030, 0.515, 0.955' + a__,
            easeInOutCubic: a_ + '0.645, 0.045, 0.355, 1.000' + a__,
            easeInOutQuart: a_ + '0.770, 0.000, 0.175, 1.000' + a__,
            easeInOutQuint: a_ + '0.860, 0.000, 0.070, 1.000' + a__,
            easeInOutSine: a_ + '0.445, 0.050, 0.550, 0.950' + a__,
            easeInOutExpo: a_ + '1.000, 0.000, 0.000, 1.000' + a__,
            easeInOutCirc: a_ + '0.785, 0.135, 0.150, 0.860' + a__,
            easeInOutBack: a_ + '0.680, 0.0, 0.265, 1.0' + a__
            /*.,-0.550,., 1.550*/
        };
        /* If undefined, this will simply take out inline function. neat eh? */
        if (kind) {
            var targ = easing[kind];
            $this.css3({
                'transition-timing-function': targ
            });

        }

    }


    function browserPrefix(prop) {
        var prefixes = ['Moz', 'Webkit', 'Khtml', '0', 'ms'],
            elem = document.createElement('div'),
            upper = prop.charAt(0).toUpperCase() + prop.slice(1),
            pref = "";
        for (var len = prefixes.length; len--;) {
            if ((prefixes[len] + upper) in elem.style) {
                pref = (prefixes[len]);
            }
        }
        if (prop in elem.style) {
            pref = (prop);
        }
        return '-' + pref.toLowerCase() + '-';
    }


    function cssTableLookup(prefix) {

        for (key in css3ref) {
            if (key == 'duration') {

                css3ref[key] = prefix + 'transition-' + key;
                css3Table[prefix + 'transition-' + key] = '';

            } else {
                css3ref[key] = prefix + '' + key;
                css3Table[prefix + '' + key] = '';
            }

        }
        return css3Table;
    }





    /*
   JQUERY OVERIDES
   */

    $.prototype.animate_ = $.prototype.animate;

    $.prototype.animate = function(cssobj, opts) {
        var time = $(this).duration() || 500;
        var $this = $(this);
        time = cssobj.duration = (opts && opts.duration) ? opts.duration : time;
        // Fallback css2 if not possible
        if ((opts && opts.usecss2) || $.usecss2) {
            (opts) ? $this.animate_(cssobj, opts) : $this.animate_(cssobj);
            return this;
        }
        // allow use of css3 in replace of jquery computed animation
        $this.delay(0).queue(function() {
            var $this = $(this);
            if (!$this.data("animationCss")) $this.data("animationCss", cssobj);
            //suspendCSS3($this, cssobj);
            if (opts) {
                if (opts.easing) setEasing($this, opts.easing);
                if (opts.duration != undefined) {
                    time = opts.duration;
                }
            }
            setDurationFromOptions($this, time);

            $this.css3(cssobj);
            $this.data("animationCss", cssobj);
            $this.dequeue();
        });

        return this.queue(function(next, hooks) {
            var timeout = setTimeout(next, time);
            hooks.stop = function() {
                clearTimeout(timeout);
            };
        });
    };


    $.prototype.css_ = $.prototype.css;

    $.prototype.css = function(a, b) {

        var $this = $(this);

        if ($.usecss2) {
            return (b) ? $this.css_(a, b) : $this.css_(a);
        }

        if (typeof a !== "object" && b == undefined) {
            return $this.css_(a);
        }

        $this.css3(a, b);

        return this;
    };

    var str = 'string';

    $.prototype.css3 = function(a, b) {

        var $this = $(this);

        if (typeof a == str) {
            if (typeof b == str || typeof b == "number") {
                var key = (css3ref[a]) ? css3ref[a] : a;
                return $this.css_(key, b);
            }
            var key = (css3ref[a]) ? css3ref[a] : a;
            return $this.css_(a);
        }

        for (key in a) {
            if (css3ref[key]) {
                a[css3ref[key]] = a[key];
                delete a[key];
            }
        }
        $this.css_(a, b);

        return this;
    };


    $.prototype.suspend = function() {
        this.suspendCSS3();
        return this;
    };

    $.prototype.clearQueue_ = $.prototype.clearQueue;

    $.prototype.clearQueue = function() {
        this.suspendCSS3();
        this.clearQueue_();
        return this;
    };

    init();

})(jQuery);









(function($) {



    $.prototype.checkPositionType = function() {
        if ($(this).css('position') === 'static') {
            $(this).css('position', 'relative');
        }
        if ($(this).css('left') === 'auto') {
            $(this).css('left', 0);
        }
        if ($(this).css('top') === 'auto') {
            $(this).css('top', 0);
        }
        return $(this);
    };

    $.prototype.moveTo = function(x, y) {
        $(this).checkPositionType();
        $(this).css({
            left: x,
            top: y
        });
        return $(this);
    };

    $.prototype.absolute = function() {
        $(this).css('position', 'absolute');
        return $(this);
    };

    $.prototype.fixed = function() {
        $(this).css('position', 'fixed');
        return $(this);
    };

    $.prototype.cursor = function(cursor) {
        $(this).css('cursor', cursor);
        return $(this);
    };

    $.prototype.fadeIn = function() {
        $(this).css({
            'opacity': 0
        }).animate({
            'opacity': 1
        });
        $(this).css('display', 'inline-block');
        return $(this);
    };

    $.prototype.fadeOut = function() {
        $(this).animate({
            'opacity': 0
        }).queue(function() {
            $(this).css('display', 'none');
        });
        return $(this);
    };

    $.prototype.color = function(color) {
        $(this).css('color', color);
        return $(this);
    };

    $.prototype.background = function(background) {
        $(this).css('background', background);
        return $(this);
    };

    $.prototype.relative = function() {
        $(this).css('position', 'relative');
        return $(this);
    };

    $.prototype.float = function(float) {
        $(this).css('float', float);
        $(this).css('position', 'relative');
        return $(this);
    };

    $.prototype.moveLeft = function(x) {
        $(this).checkPositionType();
        if (x === undefined) {
            x = $(this).width();
        }
        $(this).css({
            left: "-=" + x
        });
        return $(this);
    };

    $.prototype.moveRight = function(x) {
        $(this).checkPositionType();
        if (x === undefined) {
            x = $(this).width();
        }
        $(this).css({
            left: "+=" + x
        });
        return $(this);
    }

    $.prototype.moveDown = function(y) {
        $(this).checkPositionType();
        if (y === undefined) {
            y = $(this).height();
        }
        $(this).css({
            top: "+=" + y
        });
        return $(this);
    };


    $.prototype.moveBy = function(x, y) {
        $(this).checkPositionType();
        $(this).css({
            top: "+=" + y,
            left: "+=" + x
        });
        return $(this);
    };

    $.prototype.margin = function(margin) {
        $(this).css({
            'margin': margin.join(' ')
        });
        return $(this);
    };

    $.prototype.moveUp = function(y) {
        $(this).checkPositionType();
        if (y === undefined) {
            y = $(this).height();
        }
        $(this).css({
            top: "-=" + y
        });
        return $(this);
    };

    $.prototype.left = function(x) {
        $(this).checkPositionType();
        $(this).css({
            left: x
        });
        $(this).css({
            left: '+=' + $(this).origin().x
        });
        return $(this);
    };

    $.prototype.top = function(y) {
        $(this).checkPositionType();
        $(this).css({
            top: y
        });
        $(this).css({
            top: '+=' + $(this).origin().y
        });
        return $(this);
    };

    $.prototype.bottom = function(y) {
        $(this).checkPositionType();
        $(this).css({
            bottom: y,
            top: 'auto'
        });
        $(this).css({
            bottom: '+=' + $(this).origin().y
        });
        return $(this);
    };

    $.prototype.center = function(axis) {
        $(this).checkPositionType();
        $(this).suspendCSS3();
        if (!axis) {
            $(this).css({
                top: '50%',
                left: '50%'
            });
            $(this).css({
                top: '+=' + $(this).origin().y,
                left: '+=' + $(this).origin().x
            });
        }
        if (axis === 'x') {
            $(this).css({
                left: '50%'
            });
            $(this).css({
                left: '+=' + $(this).origin().x
            });
        }
        if (axis === 'y') {
            $(this).css({
                top: '50%'
            });
            $(this).css({
                top: '+=' + $(this).origin().y
            });
        }
        return $(this);
    };

    $.prototype.duration = function(y) {
        $(this).data('duration', y);
        return (y === undefined) ? $(this).data('duration') : $(this);
    };

    $.prototype.setDuration = function(y) {
        $(this).data('duration', y);
        $(this).css({
            'duration': y + "ms"
        });
        return (y === undefined) ? $(this).data('duration') : $(this);
    };

    $.prototype.toCss = function(className) {
        var css = $(this).attr('style').split(';');
        var stream = className + "{\n ";
        _.each(css, function(item, index, list) {
            if (item) {
                stream += item + ";\n "
            }
        });
        stream += "}";
        if (!$.sheet) $.sheet = "";
        $.sheet += stream + "\n\n\n";
        //console.log(stream);
        return stream;
    };


    $.prototype.color = function(a) {
        $(this).css({
            'color': a
        });
        return $(this);
    };

    $.prototype.index = function(a) {
        $(this).css({
            'z-index': a
        });
        return $(this);
    };

    $.prototype.textAlign = function(a) {
        $(this).css({
            'text-align': a
        });
        return $(this);
    };

    $.prototype.lineHeight = function(a) {
        $(this).css({
            'line-height': a + 'px'
        });
        return $(this);
    };

    $.prototype.putIn = function($el) {
        $(this).appendTo($el);
        return $(this);
    };

    $.prototype.mask = function(url) {
        $(this).css({
            '-webkit-mask-box-image': 'url(' + url + ')'
        });
        return $(this);
    };

    $.prototype.display = function(display) {
        $(this).css({
            'display': display
        });
        return $(this);
    };

    $.prototype.opacity = function(val) {
        $(this).css({
            'opacity': val
        }); //'pointer-events': (!val)? 'none': 'all' });
        return $(this);
    };

    $.prototype.origin = function(x, y) {

        var offset = {};
        if (x === undefined) {
            //get
            var origin = $(this).data('origin');
            if (!origin) {
                $(this).data('origin', {
                    "x": 0.5,
                    "y": 0.5
                });
                origin = $(this).data('origin');
            }
            offset.x = -origin.x * $(this).width();
            offset.y = -origin.y * $(this).height();
        } else {
            //set
            $(this).data('origin', {
                "x": x,
                "y": y
            });
        }
        return (x === undefined) ? offset : $(this);
    };

    $.prototype.visible = function() {
        $(this).removeClass('hidden');
        if ($(this).css('display') === 'none') {
            $(this).css('display', 'inline');
        }
        return $(this);
    };

    $.prototype.hidden = function() {
        $(this).addClass('hidden');
        return $(this);
    };


    $.extend({
        replaceTag: function(currentElem, newTagObj, keepProps) {
            var $currentElem = $(currentElem);
            var i, $newTag = $(newTagObj).clone();
            if (keepProps) { //{{{
                newTag = $newTag[0];
                newTag.className = currentElem.className;
                $.extend(newTag.classList, currentElem.classList);
                $.extend(newTag.attributes, currentElem.attributes);
            } //}}}
            $currentElem.wrapAll($newTag);
            $currentElem.contents().unwrap();
            return node;
        }
    });

    $.fn.extend({
        replaceTag: function(newTagObj, keepProps) {
            this.each(function() {
                jQuery.replaceTag(this, newTagObj, keepProps);
            });
        }
    });

})(jQuery);
