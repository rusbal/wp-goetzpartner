/**
 * This script is extracted from foot/main.js
 * It is extracted to have a smaller file to edit.
 *
 * Created by rsusbal on 24/11/2016.
 */

jQuery(document).ready(function($) {
    //Cache variables
    var $document = $(document),
        $window = $(window),
        $html = $("html"),
        $body = $("body"),
        $page = $("#page");

    /*!- Custom resize function*/
    var dtResizeTimeout;
    if(dtGlobals.isMobile && !dtGlobals.isWindowsPhone){
        $window.bind("orientationchange", function(event) {
            clearTimeout(dtResizeTimeout);
            dtResizeTimeout = setTimeout(function() {
                $window.trigger( "debouncedresize" );
            }, 200);
        });
    }else{
        $window.on("resize", function() {
            clearTimeout(dtResizeTimeout);
            dtResizeTimeout = setTimeout(function() {
                $window.trigger( "debouncedresize" );
            }, 200);
        });
    }
    /* #Retina images using srcset polyfill
     ================================================== */
    //Layzy img loading
    $.fn.layzrInitialisation = function(container) {
        return this.each(function() {
            var $this = $(this);

            var layzr = new Layzr({
                container: container,
                selector: '.lazy-load',
                attr: 'data-src',
                attrSrcSet: 'data-srcset',
                retinaAttr: 'data-src-retina',
                hiddenAttr: 'data-src-hidden',
                threshold: 30,
                before: function() {
                    // For fixed-size images with srcset; or have to be updated on window resize.
                    this.setAttribute("sizes", this.width+"px");
                },
                callback: function() {

                    this.classList.add("is-loaded");
                    var $this =  $(this);
                    // $this.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(e) {
                    setTimeout(function(){
                        $this.parent().removeClass("layzr-bg");
                    }, 350)
                    //});
                }
            });
        });
    };
    $(".layzr-loading-on, .vc_single_image-img").layzrInitialisation();

    /*Call visual composer function for preventing full-width row conflict */
    if($('div[data-vc-stretch-content="true"]').length > 0 && $('div[data-vc-full-width-init="false"]').length > 0){
        vc_rowBehaviour();

    }



    /* #Custom touch events
     ================================================== */

    /* !(we need to add swipe events here) */

    dtGlobals.touches = {};
    dtGlobals.touches.touching = false;
    dtGlobals.touches.touch = false;
    dtGlobals.touches.currX = 0;
    dtGlobals.touches.currY = 0;
    dtGlobals.touches.cachedX = 0;
    dtGlobals.touches.cachedY = 0;
    dtGlobals.touches.count = 0;
    dtGlobals.resizeCounter = 0;

    $document.on("touchstart",function(e) {
        if (e.originalEvent.touches.length == 1) {
            dtGlobals.touches.touch = e.originalEvent.touches[0];

            // caching the current x
            dtGlobals.touches.cachedX = dtGlobals.touches.touch.pageX;
            // caching the current y
            dtGlobals.touches.cachedY = dtGlobals.touches.touch.pageY;
            // a touch event is detected
            dtGlobals.touches.touching = true;

            // detecting if after 200ms the finger is still in the same position
            setTimeout(function() {

                dtGlobals.touches.currX = dtGlobals.touches.touch.pageX;
                dtGlobals.touches.currY = dtGlobals.touches.touch.pageY;

                if ((dtGlobals.touches.cachedX === dtGlobals.touches.currX) && !dtGlobals.touches.touching && (dtGlobals.touches.cachedY === dtGlobals.touches.currY)) {
                    // Here you get the Tap event
                    dtGlobals.touches.count++;
                    //console.log(dtGlobals.touches.count)
                    $(e.target).trigger("tap");
                }
            },200);
        }
    });

    $document.on("touchend touchcancel",function (e){
        // here we can consider finished the touch event
        dtGlobals.touches.touching = false;
    });

    $document.on("touchmove",function (e){
        dtGlobals.touches.touch = e.originalEvent.touches[0];

        if(dtGlobals.touches.touching) {
            // here you are swiping
        }
    });

    $document.on("tap", function(e) {
        $(".dt-hovered").trigger("mouseout");
    });


// jquery.event.move
//
// 1.3.6
//
// Stephen Band
//
// Triggers 'movestart', 'move' and 'moveend' events after
// mousemoves following a mousedown cross a distance threshold,
// similar to the native 'dragstart', 'drag' and 'dragend' events.
// Move events are throttled to animation frames. Move event objects
// have the properties:
//
// pageX:
// pageY:   Page coordinates of pointer.
// startX:
// startY:  Page coordinates of pointer at movestart.
// distX:
// distY:  Distance the pointer has moved since movestart.
// deltaX:
// deltaY:  Distance the finger has moved since last event.
// velocityX:
// velocityY:  Average velocity over last few events.


    (function (module) {
        if (typeof define === 'function' && define.amd) {
            // AMD. Register as an anonymous module.
            define(['jquery'], module);
        } else {
            // Browser globals
            module(jQuery);
        }
    })(function(jQuery, undefined){

        var // Number of pixels a pressed pointer travels before movestart
            // event is fired.
            threshold = 6,

            add = jQuery.event.add,

            remove = jQuery.event.remove,

            // Just sugar, so we can have arguments in the same order as
            // add and remove.
            trigger = function(node, type, data) {
                jQuery.event.trigger(type, data, node);
            },

            // Shim for requestAnimationFrame, falling back to timer. See:
            // see http://paulirish.com/2011/requestanimationframe-for-smart-animating/
            requestFrame = (function(){
                return (
                    window.requestAnimationFrame ||
                    window.webkitRequestAnimationFrame ||
                    window.mozRequestAnimationFrame ||
                    window.oRequestAnimationFrame ||
                    window.msRequestAnimationFrame ||
                    function(fn, element){
                        return window.setTimeout(function(){
                            fn();
                        }, 25);
                    }
                );
            })(),

            ignoreTags = {
                textarea: true,
                input: true,
                select: true,
                button: true
            },

            mouseevents = {
                move: 'mousemove',
                cancel: 'mouseup dragstart',
                end: 'mouseup'
            },

            touchevents = {
                move: 'touchmove',
                cancel: 'touchend',
                end: 'touchend'
            };


        // Constructors

        function Timer(fn){
            var callback = fn,
                active = false,
                running = false;

            function trigger(time) {
                if (active){
                    callback();
                    requestFrame(trigger);
                    running = true;
                    active = false;
                }
                else {
                    running = false;
                }
            }

            this.kick = function(fn) {
                active = true;
                if (!running) { trigger(); }
            };

            this.end = function(fn) {
                var cb = callback;

                if (!fn) { return; }

                // If the timer is not running, simply call the end callback.
                if (!running) {
                    fn();
                }
                // If the timer is running, and has been kicked lately, then
                // queue up the current callback and the end callback, otherwise
                // just the end callback.
                else {
                    callback = active ?
                        function(){ cb(); fn(); } :
                        fn ;

                    active = true;
                }
            };
        }


        // Functions

        function returnTrue() {
            return true;
        }

        function returnFalse() {
            return false;
        }

        function preventDefault(e) {
            e.preventDefault();
        }

        function preventIgnoreTags(e) {
            // Don't prevent interaction with form elements.
            if (ignoreTags[ e.target.tagName.toLowerCase() ]) { return; }

            e.preventDefault();
        }

        function isLeftButton(e) {
            // Ignore mousedowns on any button other than the left (or primary)
            // mouse button, or when a modifier key is pressed.
            return (e.which === 1 && !e.ctrlKey && !e.altKey);
        }

        function identifiedTouch(touchList, id) {
            var i, l;

            if (touchList.identifiedTouch) {
                return touchList.identifiedTouch(id);
            }

            // touchList.identifiedTouch() does not exist in
            // webkit yet… we must do the search ourselves...

            i = -1;
            l = touchList.length;

            while (++i < l) {
                if (touchList[i].identifier === id) {
                    return touchList[i];
                }
            }
        }

        function changedTouch(e, event) {
            var touch = identifiedTouch(e.changedTouches, event.identifier);

            // This isn't the touch you're looking for.
            if (!touch) { return; }

            // Chrome Android (at least) includes touches that have not
            // changed in e.changedTouches. That's a bit annoying. Check
            // that this touch has changed.
            if (touch.pageX === event.pageX && touch.pageY === event.pageY) { return; }

            return touch;
        }


        // Handlers that decide when the first movestart is triggered

        function mousedown(e){
            var data;

            if (!isLeftButton(e)) { return; }

            data = {
                target: e.target,
                startX: e.pageX,
                startY: e.pageY,
                timeStamp: e.timeStamp
            };

            add(document, mouseevents.move, mousemove, data);
            add(document, mouseevents.cancel, mouseend, data);
        }

        function mousemove(e){
            var data = e.data;

            checkThreshold(e, data, e, removeMouse);
        }

        function mouseend(e) {
            removeMouse();
        }

        function removeMouse() {
            remove(document, mouseevents.move, mousemove);
            remove(document, mouseevents.cancel, mouseend);
        }

        function touchstart(e) {
            var touch, template;

            // Don't get in the way of interaction with form elements.
            if (ignoreTags[ e.target.tagName.toLowerCase() ]) { return; }

            touch = e.changedTouches[0];

            // iOS live updates the touch objects whereas Android gives us copies.
            // That means we can't trust the touchstart object to stay the same,
            // so we must copy the data. This object acts as a template for
            // movestart, move and moveend event objects.
            template = {
                target: touch.target,
                startX: touch.pageX,
                startY: touch.pageY,
                timeStamp: e.timeStamp,
                identifier: touch.identifier
            };

            // Use the touch identifier as a namespace, so that we can later
            // remove handlers pertaining only to this touch.
            add(document, touchevents.move + '.' + touch.identifier, touchmove, template);
            add(document, touchevents.cancel + '.' + touch.identifier, touchend, template);
        }

        function touchmove(e){
            var data = e.data,
                touch = changedTouch(e, data);

            if (!touch) { return; }

            checkThreshold(e, data, touch, removeTouch);
        }

        function touchend(e) {
            var template = e.data,
                touch = identifiedTouch(e.changedTouches, template.identifier);

            if (!touch) { return; }

            removeTouch(template.identifier);
        }

        function removeTouch(identifier) {
            remove(document, '.' + identifier, touchmove);
            remove(document, '.' + identifier, touchend);
        }


        // Logic for deciding when to trigger a movestart.

        function checkThreshold(e, template, touch, fn) {
            var distX = touch.pageX - template.startX,
                distY = touch.pageY - template.startY;

            // Do nothing if the threshold has not been crossed.
            if ((distX * distX) + (distY * distY) < (threshold * threshold)) { return; }

            triggerStart(e, template, touch, distX, distY, fn);
        }

        function handled() {
            // this._handled should return false once, and after return true.
            this._handled = returnTrue;
            return false;
        }

        function flagAsHandled(e) {
            e._handled();
        }

        function triggerStart(e, template, touch, distX, distY, fn) {
            var node = template.target,
                touches, time;

            touches = e.targetTouches;
            time = e.timeStamp - template.timeStamp;

            // Create a movestart object with some special properties that
            // are passed only to the movestart handlers.
            template.type = 'movestart';
            template.distX = distX;
            template.distY = distY;
            template.deltaX = distX;
            template.deltaY = distY;
            template.pageX = touch.pageX;
            template.pageY = touch.pageY;
            template.velocityX = distX / time;
            template.velocityY = distY / time;
            template.targetTouches = touches;
            template.finger = touches ?
                touches.length :
                1 ;

            // The _handled method is fired to tell the default movestart
            // handler that one of the move events is bound.
            template._handled = handled;

            // Pass the touchmove event so it can be prevented if or when
            // movestart is handled.
            template._preventTouchmoveDefault = function() {
                e.preventDefault();
            };

            // Trigger the movestart event.
            trigger(template.target, template);

            // Unbind handlers that tracked the touch or mouse up till now.
            fn(template.identifier);
        }


        // Handlers that control what happens following a movestart

        function activeMousemove(e) {
            var timer = e.data.timer;

            e.data.touch = e;
            e.data.timeStamp = e.timeStamp;
            timer.kick();
        }

        function activeMouseend(e) {
            var event = e.data.event,
                timer = e.data.timer;

            removeActiveMouse();

            endEvent(event, timer, function() {
                // Unbind the click suppressor, waiting until after mouseup
                // has been handled.
                setTimeout(function(){
                    remove(event.target, 'click', returnFalse);
                }, 0);
            });
        }

        function removeActiveMouse(event) {
            remove(document, mouseevents.move, activeMousemove);
            remove(document, mouseevents.end, activeMouseend);
        }

        function activeTouchmove(e) {
            var event = e.data.event,
                timer = e.data.timer,
                touch = changedTouch(e, event);

            if (!touch) { return; }

            // Stop the interface from gesturing
            e.preventDefault();

            event.targetTouches = e.targetTouches;
            e.data.touch = touch;
            e.data.timeStamp = e.timeStamp;
            timer.kick();
        }

        function activeTouchend(e) {
            var event = e.data.event,
                timer = e.data.timer,
                touch = identifiedTouch(e.changedTouches, event.identifier);

            // This isn't the touch you're looking for.
            if (!touch) { return; }

            removeActiveTouch(event);
            endEvent(event, timer);
        }

        function removeActiveTouch(event) {
            remove(document, '.' + event.identifier, activeTouchmove);
            remove(document, '.' + event.identifier, activeTouchend);
        }


        // Logic for triggering move and moveend events

        function updateEvent(event, touch, timeStamp, timer) {
            var time = timeStamp - event.timeStamp;

            event.type = 'move';
            event.distX =  touch.pageX - event.startX;
            event.distY =  touch.pageY - event.startY;
            event.deltaX = touch.pageX - event.pageX;
            event.deltaY = touch.pageY - event.pageY;

            // Average the velocity of the last few events using a decay
            // curve to even out spurious jumps in values.
            event.velocityX = 0.3 * event.velocityX + 0.7 * event.deltaX / time;
            event.velocityY = 0.3 * event.velocityY + 0.7 * event.deltaY / time;
            event.pageX =  touch.pageX;
            event.pageY =  touch.pageY;
        }

        function endEvent(event, timer, fn) {
            timer.end(function(){
                event.type = 'moveend';

                trigger(event.target, event);

                return fn && fn();
            });
        }


        // jQuery special event definition

        function setup(data, namespaces, eventHandle) {
            // Stop the node from being dragged
            //add(this, 'dragstart.move drag.move', preventDefault);

            // Prevent text selection and touch interface scrolling
            //add(this, 'mousedown.move', preventIgnoreTags);

            // Tell movestart default handler that we've handled this
            add(this, 'movestart.move', flagAsHandled);

            // Don't bind to the DOM. For speed.
            return true;
        }

        function teardown(namespaces) {
            remove(this, 'dragstart drag', preventDefault);
            remove(this, 'mousedown touchstart', preventIgnoreTags);
            remove(this, 'movestart', flagAsHandled);

            // Don't bind to the DOM. For speed.
            return true;
        }

        function addMethod(handleObj) {
            // We're not interested in preventing defaults for handlers that
            // come from internal move or moveend bindings
            if (handleObj.namespace === "move" || handleObj.namespace === "moveend") {
                return;
            }

            // Stop the node from being dragged
            add(this, 'dragstart.' + handleObj.guid + ' drag.' + handleObj.guid, preventDefault, undefined, handleObj.selector);

            // Prevent text selection and touch interface scrolling
            add(this, 'mousedown.' + handleObj.guid, preventIgnoreTags, undefined, handleObj.selector);
        }

        function removeMethod(handleObj) {
            if (handleObj.namespace === "move" || handleObj.namespace === "moveend") {
                return;
            }

            remove(this, 'dragstart.' + handleObj.guid + ' drag.' + handleObj.guid);
            remove(this, 'mousedown.' + handleObj.guid);
        }

        jQuery.event.special.movestart = {
            setup: setup,
            teardown: teardown,
            add: addMethod,
            remove: removeMethod,

            _default: function(e) {
                var event, data;

                // If no move events were bound to any ancestors of this
                // target, high tail it out of here.
                if (!e._handled()) { return; }

                function update(time) {
                    updateEvent(event, data.touch, data.timeStamp);
                    trigger(e.target, event);
                }

                event = {
                    target: e.target,
                    startX: e.startX,
                    startY: e.startY,
                    pageX: e.pageX,
                    pageY: e.pageY,
                    distX: e.distX,
                    distY: e.distY,
                    deltaX: e.deltaX,
                    deltaY: e.deltaY,
                    velocityX: e.velocityX,
                    velocityY: e.velocityY,
                    timeStamp: e.timeStamp,
                    identifier: e.identifier,
                    targetTouches: e.targetTouches,
                    finger: e.finger
                };

                data = {
                    event: event,
                    timer: new Timer(update),
                    touch: undefined,
                    timeStamp: undefined
                };

                if (e.identifier === undefined) {
                    // We're dealing with a mouse
                    // Stop clicks from propagating during a move
                    add(e.target, 'click', returnFalse);
                    add(document, mouseevents.move, activeMousemove, data);
                    add(document, mouseevents.end, activeMouseend, data);
                }
                else {
                    // We're dealing with a touch. Stop touchmove doing
                    // anything defaulty.
                    e._preventTouchmoveDefault();
                    add(document, touchevents.move + '.' + e.identifier, activeTouchmove, data);
                    add(document, touchevents.end + '.' + e.identifier, activeTouchend, data);
                }
            }
        };

        jQuery.event.special.move = {
            setup: function() {
                // Bind a noop to movestart. Why? It's the movestart
                // setup that decides whether other move events are fired.
                add(this, 'movestart.move', jQuery.noop);
            },

            teardown: function() {
                remove(this, 'movestart.move', jQuery.noop);
            }
        };

        jQuery.event.special.moveend = {
            setup: function() {
                // Bind a noop to movestart. Why? It's the movestart
                // setup that decides whether other move events are fired.
                add(this, 'movestart.moveend', jQuery.noop);
            },

            teardown: function() {
                remove(this, 'movestart.moveend', jQuery.noop);
            }
        };

        add(document, 'mousedown.move', mousedown);
        add(document, 'touchstart.move', touchstart);

        // Make jQuery copy touch event properties over to the jQuery event
        // object, if they are not already listed. But only do the ones we
        // really need. IE7/8 do not have Array#indexOf(), but nor do they
        // have touch events, so let's assume we can ignore them.
        if (typeof Array.prototype.indexOf === 'function') {
            (function(jQuery, undefined){
                var props = ["changedTouches", "targetTouches"],
                    l = props.length;

                while (l--) {
                    if (jQuery.event.props.indexOf(props[l]) === -1) {
                        jQuery.event.props.push(props[l]);
                    }
                }
            })(jQuery);
        };
    });

    /* !Animation Core */

    /*
     * Viewport - jQuery selectors for finding elements in viewport
     *
     * Copyright (c) 2008-2009 Mika Tuupola
     *
     * Licensed under the MIT license:
     *   http://www.opensource.org/licenses/mit-license.php
     *
     * Project home:
     *  http://www.appelsiini.net/projects/viewport
     *
     */

    $.belowthefold = function(element, settings) {
        var fold = $window.height() + $window.scrollTop();
        return fold <= $(element).offset().top - settings.threshold;
    };
    $.abovethetop = function(element, settings) {
        var top = $window.scrollTop();
        return top >= $(element).offset().top + $(element).height() - settings.threshold;
    };
    $.rightofscreen = function(element, settings) {
        var fold = $window.width() + $window.scrollLeft();
        return fold <= $(element).offset().left - settings.threshold;
    };
    $.leftofscreen = function(element, settings) {
        var left = $window.scrollLeft();
        return left >= $(element).offset().left + $(element).width() - settings.threshold;
    };
    $.inviewport = function(element, settings) {
        return !$.rightofscreen(element, settings) && !$.leftofscreen(element, settings) && !$.belowthefold(element, settings) && !$.abovethetop(element, settings);
    };

    $.extend($.expr[':'], {
        "below-the-fold": function(a, i, m) {
            return $.belowthefold(a, {threshold : 0});
        },
        "above-the-top": function(a, i, m) {
            return $.abovethetop(a, {threshold : 0});
        },
        "left-of-screen": function(a, i, m) {
            return $.leftofscreen(a, {threshold : 0});
        },
        "right-of-screen": function(a, i, m) {
            return $.rightofscreen(a, {threshold : 0});
        },
        "in-viewport": function(a, i, m) {
            return $.inviewport(a, {threshold : -30});
        }
    });


    // !- Animation "onScroll" loop
    function doAnimation() {
        if(!dtGlobals.isMobile){
            if($(".animation-at-the-same-time").length > 0 || $(".animate-element").length > 0){
                var j = -1;
                $(".animation-at-the-same-time:in-viewport").each(function () {
                    var $this = $(this),
                        $thisElem = $this.find(".animate-element");
                    //if (!$thisElem.hasClass("start-animation") && !$thisElem.hasClass("animation-triggered")) {
                    $thisElem.addClass("animation-triggered");
                    $this.find(".animate-element:not(.start-animation)").addClass("start-animation");
                    //};
                });
                $(".animate-element:not(.start-animation):in-viewport").each(function () {
                    var $this = $(this);
                    if (!$this.parents(".animation-at-the-same-time").length > 0) {

                        if (!$this.hasClass("start-animation") && !$this.hasClass("animation-triggered")) {
                            $this.addClass("animation-triggered");
                            j++;
                            setTimeout(function () {
                                $this.addClass("start-animation");
                                if($this.hasClass("skills")){
                                    $this.animateSkills();
                                };
                            }, 200 * j);
                        };
                    };
                });
            }
        }
        else {
            $(".skills").animateSkills();
        };
    };


    // !- Fire animation
    setTimeout(function() {
        doAnimation();
    }, 50);

    if (!dtGlobals.isMobile ){
        $window.on("scroll", function () {
            doAnimation();
        });
    };


    /* #Check if element exists
     ================================================== */
    $.fn.exists = function() {
        if ($(this).length > 0) {
            return true;
        } else {
            return false;
        }
    }

    /* !- Check if element is loaded */
    $.fn.loaded = function(callback, jointCallback, ensureCallback){
        var len	= this.length;
        if (len > 0) {
            return this.each(function() {
                var	el		= this,
                    $el		= $(el),
                    blank	= "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";

                $el.on("load.dt", function(event) {
                    $(this).off("load.dt");
                    if (typeof callback == "function") {
                        callback.call(this);
                    }
                    if (--len <= 0 && (typeof jointCallback == "function")){
                        jointCallback.call(this);
                    }
                });

                if (!el.complete || el.complete === undefined) {
                    el.src = el.src;
                } else {
                    $el.trigger("load.dt")
                }
            });
        } else if (ensureCallback) {
            if (typeof jointCallback == "function") {
                jointCallback.call(this);
            }
            return this;
        }
    };



    /* #Photo slider core
     ================================================== */
// ;(function($){
    $.fn.exists = function() {
        if ($(this).length > 0) {
            return true;
        } else {
            return false;
        }
    }

    $.fn.loaded = function(callback, jointCallback, ensureCallback){
        var len = this.length;
        if (len > 0) {
            return this.each(function() {
                var el    = this,
                    $el  = $(el),
                    blank = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";

                $el.on("load.dt", function(event) {
                    $(this).off("load.dt");
                    if (typeof callback == "function") {
                        callback.call(this);
                    }
                    if (--len <= 0 && (typeof jointCallback == "function")){
                        jointCallback.call(this);
                    }
                });

                if (!el.complete || el.complete === undefined) {
                    el.src = el.src;
                } else {
                    $el.trigger("load.dt")
                }
            });
        } else if (ensureCallback) {
            if (typeof jointCallback == "function") {
                jointCallback.call(this);
            }
            return this;
        }
    };

    $.rsCSS3Easing = {
        easeOutSine: 'cubic-bezier(0.390, 0.575, 0.565, 1.000)',
        easeInOutSine: 'cubic-bezier(0.445, 0.050, 0.550, 0.950)'
    };

    $.extend(jQuery.easing, {
        easeInOutSine: function (x, t, b, c, d) {
            return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
        },
        easeOutSine: function (x, t, b, c, d) {
            return c * Math.sin(t/d * (Math.PI/2)) + b;
        },
        easeOutCubic: function (x, t, b, c, d) {
            return c*((t=t/d-1)*t*t + 1) + b;
        }
    });

    $.thePhotoSlider = function(element, settings) {
        var self = $(element).data("thePhotoSlider");

        if (!self) {
            this._init(element, settings);
        }
        else {
            self.update();
        };
    };

    $.thePhotoSlider.defaults = {
        mode: {
            type: "slider"
        },
        responsive: true,
        height: false,
        width: false,
        sidePaddings: 0,
        storeHTML: false,
        autoPlay: false,
        threshold: 20,
        resizeImg: false,
        imageScaleMode:"none",
        imageAlignCenter:false,
        collapsePoint: 700,
        transformEnable: true,
        calcAutoHeight :false,
        columBasedResize: false,
        resizeHeight: false
    };

    $.thePhotoSlider.prototype = {
        _init: function(element, settings) {
            var self = this;
            self.st = $.extend({}, $.thePhotoSlider.defaults, settings);
            self.ev = $(self);

            self.autoPlay = {
                enabled: false,
                delay: 2000,
                loop: true
            };

            self.currSlide = 0;
            self.noSlide = true;
            self.lockLeft = true;
            self.lockRight = true;

            self.sliderLock = false;
            self.lockTimeout = false;

            self.wrap = {};
            self.wrap.$el = $(element);
            self.wrap.width = 0;
            self.wrap.height = false;
            self.wrap.$el.data("thePhotoSlider", self);

            self.viewport = self.wrap.$el.find(".ts-viewport");

            self.cont = {};
            self.cont.$el = self.viewport.find(".ts-cont");
            self.cont.width = 0;
            self.cont.startX = 0;
            self.cont.instantX = 0;

            self.slides = {};
            self.slides.$items = self.cont.$el.children();
            self.slides.number = self.slides.$items.length;
            self.slides.position = [];
            self.slides.width = [];
            self.slides.isLoaded = [];

            self.drag = {};
            self.drag.isMoving = false;
            self.drag.startX = 0;
            self.drag.startY = 0;
            self.drag.offsetX = 0;
            self.drag.offsetY = 0;
            self.drag.lockX = false;
            self.drag.lockY = false;

            self.features = {};
            self._featureDetection();

            if (self.st.storeHTML) self.origHTML = self.wrap.$el.html();
            self._buildHTML();

            self._calcSliderSize();
            self._resizeImage();
            if (!self.wrap.height) self.wrap.$el.addClass("ts-autoHeight");

            self._setSliderWidth();
            self._adjustSlides();
            self._setSliderHeight();

            /* if (self.st.mode.type === "centered") */ self.slideTo(0, true);

            if (!self.noSlide) self._bindEvents();

            setTimeout(function() {
                self.wrap.$el.addClass("ts-ready");
                self.ev.trigger("sliderReady");
            }, 20);

            if (self.st.responsive) {
                if (!("onorientationchange" in window)) {
                    var dtResizeTimeout;

                    $(window).on("resize", function(e) {
                        clearTimeout(dtResizeTimeout);
                        dtResizeTimeout = setTimeout(function() {
                            self.update();
                        }, 200);
                    });
                }
                else {
                    var scrOrientation = window.orientation;

                    $(window).on("orientationchange", function(e) {
                        var tempOrientation = window.orientation;

                        if (tempOrientation !== scrOrientation) {
                            scrOrientation = tempOrientation;
                            self.update();
                        };
                    });
                };
            };

            if(self.st.autoPlay.enabled) {
                self.play();
            };
        },

        _featureDetection: function() {
            var self = this,
                tempStyle = document.createElement('div').style,
                vendors = ['webkit','Moz','ms','O'],
                tempV;
            self.features.vendor = '';


            for (i = 0; i < vendors.length; i++ ) {
                tempV = vendors[i];
                if (!self.features.vendor && (tempV + 'Transform') in tempStyle ) {
                    self.features.vendor = "-"+tempV.toLowerCase()+"-";
                }
            }

            if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1 && !('ontouchstart' in window)) {
                self.features.css3d = Modernizr.csstransforms3d;
                //self.features.css3d = false;
            }
            else if (typeof Modernizr != "undefined") {
                self.features.css3d = Modernizr.csstransforms3d;
                //self.features.css3d = false;
            }

        },

        _buildHTML: function() {
            var self = this;

            if (self.st.mode.type === "centered") {
                self.wrap.$el.addClass("ts-centered");
            };

            if (self.st.mode.type === "slider") {
                self.slides.$items.addClass("ts-slide");
            }
            else if (self.st.mode.type === "scroller" || self.st.mode.type === "centered" || self.st.mode.type === "carousel") {
                self.slides.$items.addClass("ts-cell");
            };
        },

        _calcSliderSize: function() {
            var self = this,
                typeofWidth = typeof self.st.width,
                typeofHeight = typeof self.st.height,
                tempWidth = false,
                tempHeight = false;

            self.wrap.width = self.wrap.$el.width();

            if (typeofWidth === "function") {
                tempWidth = self.st.width(this);
            }
            else if (typeofWidth === "number") {
                tempWidth = self.st.width;
            };

            if (typeofHeight === "function") {
                tempHeight = self.st.height(this);
            }
            else if (typeofHeight === "number") {
                tempHeight = self.st.height;
            };

            if (tempHeight && !tempWidth) {
                // Calculate once or on resize (if typeofHeight === "function")
                self.wrap.height = tempHeight;
            }
            else if (tempHeight && tempWidth) {
                // Calculate on resize
                self.wrap.height = ( tempHeight * self.wrap.width ) / tempWidth;
            }
            else {
                // Calculate on every slide change and resize
                self.wrap.height = false;
            };
        },

        _resizeImage:function() {

            var self = this;
            var $slide = $(self.slides.$items[i]);

            if (self.st.resizeImg === true) {
                self.cont.width = 0;
                self.slides.$items.each(function(i) {
                    var $slide = $(self.slides.$items[i]),
                        tempCSS = {};
                    var img = $slide.find("img");
                    var classToFind = 'rsMainSlideImage';
                    var isVideo;
                    var imgAlignCenter = self.st.imageAlignCenter,
                        imgScaleMode = self.st.imageScaleMode,
                        tempEl;

                    if(!img) {
                        return;
                    }

                    var baseImageWidth = parseInt(img.attr("width")),
                        baseImageHeight = parseInt(img.attr("height"));


                    //slideObject.isRendered = true;
                    if(imgScaleMode === 'none') {
                        return;
                    }
                    var containerWidth = self.wrap.width,
                        containerHeight = self.wrap.height,
                        hRatio,
                        vRatio,
                        ratio,
                        nWidth,
                        nHeight,
                        cssObj = {};

                    if(imgScaleMode === 'fit-if-smaller') {
                        if(baseImageWidth > containerWidth || baseImageHeight > containerHeight) {
                            imgScaleMode = 'fit';
                        }
                    }
                    if(imgScaleMode === 'fill' || imgScaleMode === 'fit') {
                        hRatio = containerWidth / baseImageWidth;
                        vRatio = containerHeight / baseImageHeight;

                        if (imgScaleMode  == "fill") {
                            ratio = hRatio > vRatio ? hRatio : vRatio;
                        } else if (imgScaleMode  == "fit") {
                            ratio = hRatio < vRatio ? hRatio : vRatio;
                        } else {
                            ratio = 1;
                        }

                        nWidth = Math.ceil(baseImageWidth * ratio, 10);
                        nHeight = Math.ceil(baseImageHeight * ratio, 10);
                    } else {
                        nWidth = baseImageWidth;
                        nHeight = baseImageHeight;

                    }
                    if(imgScaleMode !== 'none') {
                        cssObj.width = nWidth;
                        cssObj.height = nHeight;

                    }
                    if (imgAlignCenter) {
                        cssObj.marginLeft = Math.floor((containerWidth - nWidth) / 2);
                        cssObj.marginTop = Math.floor((containerHeight - nHeight) / 2);
                    }
                    img.css(cssObj);
                })
            }
        },

        _setSliderWidth: function() {
            var self = this;

            if (self.st.mode.type !== "centered") {
                self.viewport.css({
                    width: self.wrap.width
                });
            }
            else if (self.wrap.width > self.st.collapsePoint) {
                self.wrap.$el.removeClass("ts-collapsed");
            }
            else {
                self.wrap.$el.addClass("ts-collapsed");
            };
        },

        _setSliderHeight: function() {
            var self = this;

            if (typeof self.wrap.height === "number") {
                // Fixed & proportional height
                self.viewport.css({
                    height: self.wrap.height
                });
            }
            else if (self.st.mode.type === "scroller" || self.st.mode.type === "centered" || self.st.mode.type === "carousel") {
                // Auto height; scroller and centered only
                //Aply responsive height
                if(self.st.resizeHeight){
                    var articleHeights = $(self.viewport).find("article").map(function() {
                        return $(this).height();
                    }).get();

                    // Math.max takes a variable number of arguments
                    // `apply` is equivalent to passing each height as an argument
                    var maxHeight = Math.max.apply(null, articleHeights);
                    self.viewport.css({
                        height: maxHeight
                    });
                    $(self.slides.$items).css({
                        height: maxHeight
                    });
                }
                if (self.viewport.css("height") === "0px" || self.viewport.css("height") == 0 || !self.viewport.css("height")) {
                    self.viewport.css({
                        height: Math.max.apply(null, self.slides.height)
                    });
                };
            }
            else if (self.slides.isLoaded[self.currSlide]) {
                // Auto height; current slide is loaded
                var jsHeight = $(self.slides.$items[self.currSlide]).height();

                if (jsHeight > 0) {
                    self.viewport.css({
                        height: jsHeight
                    });
                }
                else {
                    // !This will cause "collapsed" slider
                    self.viewport.css({
                        height: "auto"
                    });
                };
            }
            else {
                // Auto height; current slide is NOT loaded
                var jsHeight = $(self.slides.$items[self.currSlide]).height();

                if (jsHeight > 0) {
                    self.viewport.css({
                        height: jsHeight
                    });
                }
                else {
                    // !This will cause "collapsed" slider
                    self.viewport.css({
                        height: auto
                    });
                };
                // !What this doing here (instead of _adjustSlides)
                /*
                 self.slides.$items[self.currSlide].find("img").loaded(false, function() {
                 $(self.slides.$items[self.currSlide]).addClass("ts-loaded");
                 self._setSliderHeight();
                 }, true);
                 */
            };
        },

        _adjustSlides: function() {
            var self = this;

            if (self.st.mode.type === "slider") {
                self.cont.width = 0;

                self.slides.$items.each(function(i) {
                    var $slide = $(self.slides.$items[i]),
                        tempCSS = {};

                    self.slides.position[i] = - self.cont.width - self.st.sidePaddings/2;
                    self.cont.width = self.cont.width + self.wrap.width + self.st.sidePaddings;
                    //if (self.wrap.height) tempCSS.height = self.wrap.height;
                    tempCSS.left = -self.slides.position[i];

                    if (!self.slides.isLoaded[i]) {
                        $slide.find("img").loaded(false, function() {
                            self.slides.isLoaded[i] = true;
                            $slide.addClass("ts-loaded");
                        }, true);
                    } else {
                    };

                    $slide.css(tempCSS);
                });
            }
            else if (self.st.mode.type === "centered") {
                self.cont.width = 0;
                self.slides.contRatio = [];
                self.slides.ratio = [];

                if (self.st.mode.lsMinW || self.st.mode.lsMaxW) {
                    var lsMinW = self.wrap.width/100 * self.st.mode.lsMinW,
                        lsMaxW = self.wrap.width/100 * self.st.mode.lsMaxW;
                };

                if (self.st.mode.ptMinW || self.st.mode.ptMaxW) {
                    var ptMinW = self.wrap.width/100 * self.st.mode.ptMinW,
                        ptMaxW = self.wrap.width/100 * self.st.mode.ptMaxW;
                };

                self.slides.$items.each(function(i) {
                    var $slide = $(self.slides.$items[i]),
                        tempCSS = {};

                    var dataWidth = $slide.attr("data-width") ? parseFloat($slide.attr("data-width")) : $slide.width(),
                        dataHeight = $slide.attr("data-height") ? parseFloat($slide.attr("data-height")) : $slide.height();


                    if (!self.slides.contRatio[i]) {
                        self.slides.contRatio[i] =  dataWidth / dataHeight;

                        if (self.slides.contRatio[i] > 1) {
                            $slide.addClass("ts-ls");
                        }
                        else {
                            $slide.addClass("ts-pt");
                        };
                    };

                    if (self.wrap.width > self.st.collapsePoint) {
                        dataHeight = self.wrap.height;
                        dataWidth = self.wrap.height * self.slides.contRatio[i];

                        if ((lsMinW || lsMaxW) && (dataWidth > dataHeight)) {
                            if (lsMinW === lsMaxW || dataWidth > lsMaxW) {
                                dataWidth = lsMaxW;
                            }
                            else if (dataWidth < lsMinW) {
                                dataWidth = lsMinW;
                            };
                        }
                        else if ((ptMinW || ptMaxW) && (dataWidth <= dataHeight)) {
                            if (ptMinW === ptMaxW || dataWidth > ptMaxW) {
                                dataWidth = ptMaxW;
                            }
                            else if (dataWidth < ptMinW) {
                                dataWidth = ptMinW;
                            };
                        };

                        self.slides.ratio[i] = dataWidth / dataHeight;

                        tempCSS.height = self.wrap.height;
                        tempCSS.width = self.slides.width[i] = dataWidth;

                        self.slides.position[i] = - self.cont.width;
                        self.cont.width = self.cont.width + self.slides.width[i] + self.st.sidePaddings;
                        tempCSS.left = -self.slides.position[i];
                    }
                    else {
                        dataHeight = tempCSS.height = self.wrap.height;
                        dataWidth = self.slides.width[i] = tempCSS.width = self.wrap.width;
                        self.slides.ratio[i] = dataWidth / dataHeight;

                        self.slides.position[i] = - self.cont.width;
                        self.cont.width = self.cont.width + self.slides.width[i];

                        tempCSS.left = -self.slides.position[i];
                    };

                    // Adjust position to slide center
                    self.slides.position[i] = self.slides.position[i] - (self.slides.width[i]/2);


                    if (self.slides.ratio[i] > self.slides.contRatio[i]) {
                        $slide.removeClass("ts-narrow");
                        $slide.addClass("ts-wide");
                    }
                    else {
                        $slide.removeClass("ts-wide");
                        $slide.addClass("ts-narrow");
                    };

                    if (!self.slides.isLoaded[i]) {
                        $slide.find("img").loaded(false, function() {
                            self.slides.isLoaded[i] = true;
                            $slide.addClass("ts-loaded");
                        }, true);
                    }
                    else {
                    };

                    $slide.css(tempCSS);

                });
            }
            else if (self.st.mode.type === "scroller") {
                self.cont.width = 0;
                self.slides.ratio = [];
                if (!(typeof self.wrap.height === "number")) {
                    self.slides.height = [];
                }
                //determine if max-width has %
                if(typeof self.slides.$items.parents(".slider-wrapper").attr("data-max-width") != "undefined"){
                    var dataMaxWidth = (self.slides.$items.parents(".slider-wrapper").width() * parseFloat(self.slides.$items.parents(".slider-wrapper").attr("data-max-width")))/100;

                }

                self.slides.$items.each(function(i) {
                    var $slide = $(self.slides.$items[i]),
                        tempCSS = {};

                    var dataWidth = $slide.attr("data-width") ? parseFloat($slide.attr("data-width")) : $slide.width(),
                        dataHeight = $slide.attr("data-height") ? parseFloat($slide.attr("data-height")) : $slide.height();

                    if(dataWidth > dataMaxWidth){
                        var dataWidth = dataMaxWidth;
                    }

                    if (dataWidth > 0 && dataHeight > 0) {
                        self.slides.ratio[i] =  dataWidth / dataHeight;
                    }
                    else {
                        self.slides.ratio[i] = 1;
                    };


                    if (typeof self.wrap.height === "number") {
                        // Fixed & proportional height
                        self.slides.width[i] = self.wrap.height * self.slides.ratio[i];

                        tempCSS.width = self.slides.width[i];
                        tempCSS.height = self.slides.width[i] / self.slides.ratio[i];
                    }
                    else if (dataWidth > 0 && dataHeight > 0) {
                        // Auto height;
                        if (!self.slides.width[i]) tempCSS.width = self.slides.width[i] = dataWidth;
                        if (!self.slides.height[i] && !self.st.resizeHeight) {
                            tempCSS.height = "100%";
                        };
                        self.slides.height[i] = dataHeight;
                    }
                    else {
                        // Auto height;
                        $slide.css("height", "auto");

                        self.slides.width[i] = $slide.width();
                        self.slides.height[i] = $slide.height();

                        tempCSS.height = "100%";
                    };
                    if(self.st.columBasedResize) {
                        self.slides.width[i] = $slide.width();

                    }
                    self.slides.position[i] = - self.cont.width;
                    self.cont.width = self.cont.width + self.slides.width[i];
                    if (i < self.slides.number - 1) self.cont.width += self.st.sidePaddings
                    tempCSS.left = -self.slides.position[i] //+ self.st.sidePaddings/2;


                    if (!self.slides.isLoaded[i]) {
                        $slide.find("img").loaded(false, function() {
                            self.slides.isLoaded[i] = true;
                            $slide.addClass("ts-loaded");
                        }, true);
                    }
                    else {
                    };

                    $slide.css(tempCSS);
                });
            }
            else if (self.st.mode.type === "carousel") {
                self.cont.width = 0;

                var perView =  self.st.mode.perView,
                    minWidth = self.st.mode.minWidth,
                    cellWidth = self.wrap.width/perView;

                while (cellWidth < minWidth && perView > 0.31) {
                    perView--;
                    if (perView < 1) perView = 1;
                    cellWidth = self.wrap.width/perView;
                };

                self.perView = perView;
                //self.st.sidePaddings = 0;

                self.slides.$items.each(function(i) {
                    var $slide = $(self.slides.$items[i]),
                        tempCSS = {};

                    self.slides.position[i] = - self.cont.width;
                    self.cont.width = self.cont.width + cellWidth;
                    tempCSS.width = cellWidth - self.st.sidePaddings;
                    tempCSS.left = -self.slides.position[i] + self.st.sidePaddings/2;

                    $slide.css(tempCSS);
                });
            };

            // Adjusting slides conteiner position and updating navigation
            if ( (self.st.mode.type !== "centered") && (self.cont.width <= self.wrap.width) ) {
                self.noSlide = true;
                self._transitionStart(0, 0, "easeInOutSine", true);
                self.cont.$el.css( "left", (self.wrap.width - self.cont.width) / 2 );

                self.lockLeft = true;
                self.lockRight = true;
                self.ev.trigger("updateNav");
            }
            else if ( (self.st.mode.type === "centered") && (self.slides.number < 2) /* && (self.cont.width <= self.wrap.width / 2) */ ) {
                self.noSlide = true;
                self._transitionStart(0, 0, "easeInOutSine", true);
                self.cont.$el.css( "left", -(self.cont.width) / 2 );

                self.lockLeft = true;
                self.lockRight = true;
                self.ev.trigger("updateNav");
            }
            else {
                self.noSlide = false;
                self.cont.$el.css( "left", "" );

                if (self.lockRight) {
                    self.lockLeft = false;
                    self.lockRight = true;
                    self.ev.trigger("lockRight").trigger("updateNav");
                }
                else if ( self.currSlide <= 0 ) {
                    self.lockLeft = true;
                    self.lockRight = false;
                    self.ev.trigger("lockLeft").trigger("updateNav");
                }
                else if ( self.currSlide > 0 ) {
                    self.lockLeft = false;
                    self.lockRight = false;
                    self.ev.trigger("updateNav");
                };
            };
        },

        _unifiedEvent: function(event) {
            if (event.originalEvent.touches !== undefined && event.originalEvent.touches[0]) {
                event.pageX = event.originalEvent.touches[0].pageX;
                event.pageY = event.originalEvent.touches[0].pageY;
            }
            return event;
        },

        _unifiedX: function() {
            var self = this,
                coord = 0,
                css3dTransform = self.cont.$el.css("transform");

            if (css3dTransform) {
                var css3dArray = css3dTransform.split(", ");
            }

            if (self.features.css3d && css3dTransform !== "none" && css3dArray[0] === "matrix(1") {
                coord = parseFloat(css3dArray[4]);
            }
            else if (self.features.css3d && css3dTransform !== "none" && css3dArray[0] === "matrix3d(1") {
                coord = parseFloat(css3dArray[12]);
            }
            else {
                //coord = self.cont.$el.position().left;
                coord = parseFloat(self.cont.$el.css("left"));
            };

            return coord;
        },

        _bindEvents: function() {
            var self = this;
            if(self.st.transformEnable){
                self.wrap.$el.on("mousedown.theSlider touchstart.theSlider", function(event) {
                    if (event.type != "touchstart") event.preventDefault();

                    self._onStart( self._unifiedEvent(event) );

                    $(document).on("mousemove.theSlider touchmove.theSlider", function(event) {
                        self._onMove( self._unifiedEvent(event) );
                    });
                    $(document).on("mouseup.theSlider mouseleave.theSlider touchend.theSlider touchcancel.theSlider", function(event) {
                        $(document).off("mousemove.theSlider mouseup.theSlider mouseleave.theSlider touchmove.theSlider touchend.theSlider touchcancel.theSlider");
                        self._onStop( self._unifiedEvent(event) );
                    });
                });
            }
        },

        _unbindEvents: function() {
            var self = this;

            self.wrap.$el.off("mousedown.theSlider touchstart.theSlider");
            $(document).off("mousemove.theSlider mouseup.theSlider mouseleave.theSlider touchmove.theSlider touchend.theSlider touchcancel.theSlider");
        },

        _onStart: function(event) {
            var self = this;

            if (!self.drag.isMoving && !self.sliderLock) {
                //self._transitionEnd();

                self.drag.isMoving = true;
                self.drag.startX = event.pageX;
                self.drag.startY = event.pageY;
                self.cont.startX = self._unifiedX();

                self.drag.offsetX = 0;
                self.drag.offsetY = 0;
                self.drag.lockX = false;
                self.drag.lockY = false;
            }
            else {
                //self._transitionCancel();
            };
        },

        _onMove: function(event) {
            var self = this,
                coord = 0;
            //self.pause();
            self.ev.trigger('psOnMove');
            if (self.drag.isMoving) {
                self.drag.offsetX = event.pageX - self.drag.startX;
                self.drag.offsetY = event.pageY - self.drag.startY;

                if ( (Math.abs(self.drag.offsetX) >= self.st.threshold-1) && (Math.abs(self.drag.offsetX) > Math.abs(self.drag.offsetY)) && !self.drag.lockX ) {
                    self.drag.lockX = false;
                    self.drag.lockY = true;
                    if (event.type == "touchmove") self.drag.offsetY = 0;
                }
                else if( (Math.abs(self.drag.offsetY) >= self.st.threshold-1) && (Math.abs(self.drag.offsetX) < Math.abs(self.drag.offsetY)) && !self.drag.lockY ) {
                    self.drag.lockX = true;
                    self.drag.lockY = false;
                    if (event.type == "touchmove") self.drag.offsetX = 0;
                };

                if (self.drag.lockX && event.type == "touchmove") self.drag.offsetX = 0;
                else if (self.drag.lockY && event.type == "touchmove") self.drag.offsetY = 0;

                if (self.drag.lockY) event.preventDefault();

                self.cont.instantX = self.cont.startX + self.drag.offsetX;

                if ( self.cont.instantX < 0 && self.cont.instantX > -self.cont.width + self.viewport.width()) {
                    coord = self.cont.instantX;
                }
                else if (self.cont.instantX >= 0) {
                    coord = self.cont.instantX/4;
                }
                else {
                    coord = (-self.cont.width + self.viewport.width()) + ((self.cont.width - self.viewport.width() + self.cont.instantX) / 4);
                };

                self._doDrag(coord);
            };


            if (self.st.autoPlay.enabled) {
                self.pause();
            };
        },

        _onStop: function(event) {
            var self = this;
            //self.pause()
            self.ev.trigger('psOnStop');

            if (self.drag.isMoving) {
                self.cont.instantX = self.cont.startX + self.drag.offsetX;

                if (Math.abs(self.drag.offsetX) > self.st.threshold) {
                    self.wrap.$el.addClass("ts-interceptClicks");
                    self.wrap.$el.one("click.preventClick", function(e) {
                        e.preventDefault();
                        e.stopImmediatePropagation();
                        e.stopPropagation();
                    });
                    window.setTimeout(function() {
                        self.wrap.$el.off('click.preventClick');
                        self.wrap.$el.removeClass("ts-interceptClicks");
                    }, 301);
                };

                self._autoAdjust();
                self._setSliderHeight();

                self.cont.startX = 0;
                self.cont.instantX = 0;

                self.drag.isMoving = false;
                self.drag.startX = 0;
                self.drag.startY = 0;
                self.drag.offsetX = 0;
                self.drag.offsetY = 0;
                self.drag.lockX = false;
                self.drag.lockY = false;
            };

            if(self.st.autoPlay.enabled) {
                self.play();
            }

            return false;
        },

        _doDrag: function(coord) {
            var self = this;
            //	self.pause();
            if(self.st.transformEnable){
                if (self.features.css3d) {
                    var tempCSS = {};

                    tempCSS[self.features.vendor+"transform"] = "translate3d("+coord+"px,0,0)";
                    tempCSS["transform"] = "translate3d("+coord+"px,0,0)";
                    tempCSS[self.vendor+"transition"] = "";
                    tempCSS["transition"] = "";

                    self.cont.$el.css(tempCSS);
                }
                else {
                    self.cont.$el.css({
                        "left": coord
                    });
                };
            }
        },

        _calcCurrSlide: function(coord) {
            var self = this,
                tempCurrSlide = self.slides.number - 1;

            self.slides.$items.each(function(i) {
                if ( coord > self.slides.position[i] ) {
                    tempCurrSlide = i-1;
                    return false;
                };
            });
            if (tempCurrSlide < 0) tempCurrSlide = 0;

            return tempCurrSlide;
        },

        _isRightExceed: function(coord) {
            var self = this,
                edge = 0;

            if (self.st.mode.type === "centered") {
                edge = self.slides.position[self.slides.number - 1];
            }
            else {
                edge = -self.cont.width + self.viewport.width();
            };

            if (coord < edge) {
                return true;
            }
            else {
                return false;
            };
        },

        _autoAdjust: function() {
            var self = this,
                adjustTo = 0,
                duration = 0,
                tempCurrSlide = self.slides.number - 1;

            /*
             if (self.drag.offsetX == 0) {
             console.log("No movement. Canceling _autoAdjust.");
             return false;
             }
             */

            if (self.cont.instantX >= 0) {
                // leftmost edge reached
                adjustTo = self.slides.position[0];
                self.currSlide = 0;

                self.lockLeft = true;
                self.lockRight = false;
                self.ev.trigger("lockLeft").trigger("updateNav");
            }
            else if ( self._isRightExceed(self.cont.instantX) ) {
                // rightmost edge reached
                if (self.st.mode.type === "centered") {
                    adjustTo = self.slides.position[self.slides.number-1];
                }
                else {
                    adjustTo = -self.cont.width + self.viewport.width();
                };

                self.currSlide = self._calcCurrSlide(adjustTo);

                self.lockLeft = false;
                self.lockRight = true;
                self.ev.trigger("lockRight").trigger("updateNav");
            }
            else {
                // autoadjust to closest slide
                if (self.drag.offsetX < -self.st.threshold) {
                    // flick from right to left
                    tempCurrSlide = self._calcCurrSlide(self.cont.instantX) + 1;

                    if (self._isRightExceed(self.slides.position[tempCurrSlide])) {
                        adjustTo = -self.cont.width + self.viewport.width();

                        for ( i = tempCurrSlide; i >= 0; i-- ) {
                            if (!self._isRightExceed(self.slides.position[i])) {
                                tempCurrSlide = i;
                                break;
                            }
                        }

                        self.lockLeft = false;
                        self.lockRight = true;
                        self.ev.trigger("lockRight").trigger("updateNav");
                    }
                    else {
                        adjustTo = self.slides.position[tempCurrSlide];

                        if  ( tempCurrSlide < self.slides.number - 1 ) {
                            self.lockLeft = false;
                            self.lockRight = false;
                            self.ev.trigger("updateNav");
                        }
                        else {
                            self.lockLeft = false;
                            self.lockRight = true;
                            self.ev.trigger("lockRight").trigger("updateNav");
                        };
                    };

                    self.currSlide = tempCurrSlide;
                }
                else if (self.drag.offsetX > self.st.threshold) {
                    // flick from left to right
                    self.currSlide = self._calcCurrSlide(self.cont.instantX);
                    adjustTo = self.slides.position[self.currSlide];

                    if ( self.currSlide > 0 ) {
                        self.lockLeft = false;
                        self.lockRight = false;
                        self.ev.trigger("updateNav");
                    }
                    else {
                        self.lockLeft = true;
                        self.lockRight = false;
                        self.ev.trigger("lockLeft").trigger("updateNav");
                    };
                }
                else {
                    // flick cenceled, since it's to short
                    adjustTo = self.cont.startX;
                };

            };


            //duration = Math.sqrt(Math.abs(self.cont.instantX - adjustTo)) * 15 + 50;
            // duration = Math.abs(self.cont.instantX - adjustTo)/2 + 100;
            duration = Math.sqrt(Math.abs(self.cont.instantX - adjustTo)) * 10 + 100;
            self._transitionStart(adjustTo, duration, "easeOutSine");
        },

        _transitionStart: function(coord, duration, easing, justSet) {
            var self = this,
                tempCSS = {},
                cssEasing = $.rsCSS3Easing[easing];

            self._transitionEnd();
            self.ev.trigger("beforeTransition");

            if (justSet) {
                if(self.st.transformEnable){
                    if (self.features.css3d) {
                        tempCSS[self.features.vendor+"transform"] = "translate3d("+coord+"px,0,0)";
                        tempCSS["transform"] = "translate3d("+coord+"px,0,0)";
                    }
                    else {
                        //console.log("and, here's the issue");
                        tempCSS.left = coord;
                    };
                }

                self.cont.$el.css(tempCSS);
                return false;
            }

            self.ev.trigger("beforeTransition");

            self.sliderLock = true;
            clearTimeout(self.lockTimeout);
            self.lockTimeout = setTimeout(function() {
                self.sliderLock = false;
                self.ev.trigger("afterTransition");
            }, duration);
            if(self.st.transformEnable){
                if (self.features.css3d) {
                    tempCSS[self.features.vendor+"transform"] = "translate3d("+coord+"px,0,0)";
                    tempCSS["transform"] = "translate3d("+coord+"px,0,0)";
                    tempCSS[self.features.vendor+"transition"] = "all "+duration+"ms "+cssEasing;
                    tempCSS["transition"] = "all "+duration+"ms "+cssEasing;

                    self.cont.$el.css(tempCSS);

                    self.cont.$el.one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend", function() {
                        //self.sliderLock = false;
                        //console.log("Release slider. sliderLock: "+self.sliderLock);

                        //self._transitionEnd();
                    });
                }
                else {
                    //self.sliderLock = false;
                    //console.log("Release slider. sliderLock: "+self.sliderLock);
                    self.cont.$el.animate({
                        "left": coord
                    }, duration, easing);
                };
            }
        },

        _transitionEnd: function() {
            var self = this;
            self.ev.trigger('psTransitionEnd');
            if(self.st.transformEnable){
                if (self.features.css3d) {
                    var tempCSS = {};
                    tempCSS[self.vendor+"transition"] = "";
                    tempCSS["transition"] = "";

                    self.cont.$el.css(tempCSS);
                }
                else {
                    self.cont.$el.stop();
                };
            }
        },

        _transitionCancel: function() {
            var self = this,
                coord = self.cont.$el.position().left,
                tempCSS = {};

            tempCSS[self.vendor+"transition"] = "";
            tempCSS["transition"] = "";

            self.cont.$el.off("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend");
            if(self.st.transformEnable){
                if (self.features.css3d) {
                    var str = self.cont.$el.css("transform"),
                        result = str.split(", ");

                    coord = result[4];

                    tempCSS[self.features.vendor+"transform"] = "translate3d("+coord+"px,0,0)";
                    tempCSS["transform"] = "translate3d("+coord+"px,0,0)";

                    self.cont.$el.css(tempCSS);
                }
                else {
                    self.cont.$el.stop();
                    self.cont.$el.animate({
                        "left": coord
                    }, duration, easing);
                };
            }
        },

        pause: function() {
            var self = this;
            self.ev.trigger('autoPlayPause');
            self._autoPlayRunning = false;
            if( self._autoPlayTimeout) {
                clearTimeout(self._autoPlayTimeout);
                self._autoPlayTimeout = null;
            }

        },

        slideTo: function(slideID, justSet) {
            var self = this,
                slideToX = self.slides.position[slideID],
                duration = 0,
                oldID = self.currSlide;
            self.pause();
            self.ev.trigger('psBeforeAnimStart');

            if (self.noSlide) return false;

            self._transitionEnd();

            if (slideToX >= self.slides.position[0]) {
                // leftmost edge reached
                self.currSlide = 0;

                self.lockLeft = true;
                self.lockRight = false;
                self.ev.trigger("lockLeft").trigger("updateNav");
            }
            else if ( self._isRightExceed(slideToX) || slideID >= self.slides.number - 1 ) {
                // rightmost edge reached
                if (self.st.mode.type === "centered") {
                    slideToX = self.slides.position[slideID];
                    self.currSlide = slideID;
                }
                else {
                    slideToX = -self.cont.width + self.viewport.width();
                    self.currSlide = self._calcCurrSlide(slideToX);
                };

                self.lockLeft = false;
                self.lockRight = true;
                self.ev.trigger("lockRight").trigger("updateNav");
            }
            else {
                self.currSlide = slideID;

                self.lockLeft = false;
                self.lockRight = false;
                self.ev.trigger("updateNav");
            };

            //duration = Math.abs(self.slides.position[oldID] - slideToX)/2 + 100;
            duration = Math.sqrt(Math.abs(self.slides.position[oldID] - slideToX)) * 10 + 100;
            self._transitionStart(slideToX, duration, "easeInOutSine", justSet);

            if ( /*$(".auto-play-btn").hasClass('paused')*/self.st.autoPlay.enabled) {
                self.play();
            }
            if(self.st.calcAutoHeight){
                self._setSliderHeight();
            }
        },
        // stopAutoPlay: function() {
        // 	var self = this;
        // 	self._autoPlayPaused = self._autoPlayEnabled = false;
        // 	self.pause();
        // },
        startPlay: function() {
            var self = this;
            self.ev.trigger('autoPlayPlay');
            if (self.currSlide + 1 <= self.slides.number - 1 && !self.lockRight) {
                self.slideTo(self.currSlide + 1);
            }
            else if (self.currSlide >= self.slides.number-1 && self.st.autoPlay.loop) {
                self.slideTo(0);
            }
            else if (self.lockRight && self.st.autoPlay.loop) {
                self.slideTo(0);
            }
            // if(self.st.calcAutoHeight){
            // 	self._setSliderHeight();
            // }

            /*
             if (self.st.mode.type === "centered") {
             slideToX = self.slides.position[slideID];
             self.currSlide = slideID;
             }
             else {
             slideToX = -self.cont.width + self.viewport.width();
             self.currSlide = self._calcCurrSlide(slideToX);
             };
             */
        },

        play: function() {
            var self = this;
            self.ev.trigger('autoPlayPlay');
            self._autoPlayRunning = true;
            if(self._autoPlayTimeout) {
                clearTimeout(self._autoPlayTimeout);
            }
            self._autoPlayTimeout = setTimeout( function() {
                self.startPlay();
            }, self.st.autoPlay.delay );
        },

        slideNext: function() {
            var self = this;

            if (self.currSlide + 1 <= self.slides.number - 1) {
                self.slideTo(self.currSlide + 1);
            }
            else {
                return false;
            };
        },

        slidePrev: function() {
            var self = this;

            if (self.currSlide - 1 >= 0) {
                self.slideTo(self.currSlide - 1);
            }
            else if (self.currSlide == 0 && self.lockLeft == false) {
                self.slideTo(self.currSlide);
            }
            else {
                return false;
            };
        },

        update: function() {
            var self = this;

            self._calcSliderSize();
            self._resizeImage();
            self._setSliderWidth();
            self._adjustSlides();
            self._setSliderHeight();
            self._doDrag();

            if (self.noSlide) {
                self.slideTo(0, true);
                self._unbindEvents();
            }
            else {
                self.slideTo(self.currSlide, true);
                self._bindEvents();
            }
        }
    };

    $.fn.thePhotoSlider = function(settings) {
        return this.each(function() {
            new $.thePhotoSlider(this, settings);
        });
    };

// })(jQuery);


    /* #Shortcodes scroller
     ================================================== */
// jQuery(document).ready(function($) {
    $.fn.scrollerSlideSize = function() {

        return this.each(function() {
            //var $this = $(this);
            //$(".fullwidth-slider .fs-entry").not(".text-on-img .fullwidth-slider .fs-entry").each(function(i) {
            var $this = $(this),
                $img = $this.find("img").eq(0),
                imgW = parseInt($img.attr("width")),
                imgH = parseInt($img.attr("height")),
                $container = $this.parents(".slider-wrapper"),
                $containerWidth = $container.width(),
                $maxWidth = $container.attr("data-max-width"),
                sideSpace = parseInt($container.attr("data-padding-side"));



            var leftPadding = parseInt($img.parents(".wf-td").eq(0).css("paddingLeft")),
                rightPadding = parseInt($img.parents(".wf-td").eq(0).css("paddingRight")),
                addedW = 0;

            if (leftPadding > 0 && rightPadding > 0) addedW = leftPadding + rightPadding;


            //determine if max width has px or %
            if(typeof $maxWidth != "undefined"){
                var dataMaxWidth = ($containerWidth * parseFloat($maxWidth))/100 - addedW - sideSpace;
            }

            if(imgW > dataMaxWidth){
                var colmnW = dataMaxWidth;
            }else{
                var colmnW = parseInt($img.attr("width"));
                if (!$img.exists()) colmnW = 280;
            }


            $this.attr("data-width", colmnW + addedW).css({
                width: colmnW + addedW,
                opacity: 1
            });


            var $imgPar = $img.parent("a, .rollover-video"),
                imgParW = $imgPar.width(),
                imgParH = (imgH * imgParW) / imgW;

            $img.parent("a, .rollover-video").css({
                height: imgParH
            });
            $(".fs-entry-content:not(.buttons-on-img)", $this).css("opacity", "1");
        })
    }
    $(".fullwidth-slider .fs-entry").not(".text-on-img .fullwidth-slider .fs-entry").scrollerSlideSize()
    //$(".fullwidth-slider .fs-entry").not(".text-on-img .fullwidth-slider .fs-entry").find("article").css("height", "100%");



    $window.on("debouncedresize", function( event ) {
        $(".fullwidth-slider .fs-entry").not(".text-on-img .fullwidth-slider .fs-entry").scrollerSlideSize();
        //$(".fullwidth-slider .fs-entry").not(".text-on-img .fullwidth-slider .fs-entry").find("article").css("height", "100%");
        $(".fullwidth-slider").find(".ts-wrap").each(function(){
            var scroller = $(this).data("thePhotoSlider");
            if(typeof scroller!= "undefined"){
                scroller.update();
            };
        });


        $(".text-on-img .fullwidth-slider .fs-entry, .description-on-hover .fs-entry, .dt-photos-shortcode .fs-entry").each(function() {
            var $this = $(this);

            $(".rollover-project", $this).css({
                "width": $this.attr("data-width"),
                "height": $this.attr("data-height")
            });
        });

    });

    //$(".slider-wrapper:not(.enable-mobile-arrows)").on( "touchmove", doStuff );



    $.fn.shortcodesScroller = function() {
        var $el = $(this),
            slides = {},
            thumbs = "";

        slides.$items = $el.children(".fs-entry"),
            slides.count = slides.$items.length;

        $el.addClass("ts-cont");
        $el.wrap('<div class="ts-wrap"><div class="ts-viewport"></div></div>');

        var scroller = $el.parents(".ts-wrap"),
            $this_par = $el.parents(".slider-wrapper"),
            windowW = $window.width(),
            paddings = $this_par.attr("data-padding-side") ? parseInt($this_par.attr("data-padding-side")) : 0,
            $sliderAutoslide = ( 'true' === $this_par.attr("data-autoslide") ) ? true : false,
            $sliderAutoslideDelay = $this_par.attr("data-delay") && parseInt($this_par.attr("data-delay")) > 999 ? parseInt($this_par.attr("data-delay")) : 5000,
            $sliderLoop = ( 'true' === $this_par.attr("data-loop") ) ? true : false,
            $enableTransform = dtGlobals.isMobile && !$this_par.hasClass("enable-mobile-arrows") ? false : true,
            $colmnResize = $this_par.hasClass("resize-by-browser-width") ? false : true,
            $resizeHeight = typeof $this_par.attr("data-max-width") != "undefined" ? true : false;


        var $sliderData = scroller.thePhotoSlider({
            mode: {
                type: "scroller"
            },
            columBasedResize: $resizeHeight,
            //resizeImg: false,
            //imageScaleMode: "fill",
            resizeHeight: $resizeHeight,
            sidePaddings: paddings,
            autoPlay: {
                enabled: $sliderAutoslide,
                delay: $sliderAutoslideDelay,
                loop: $sliderLoop
            },
            transformEnable: $enableTransform
        }).data("thePhotoSlider");

        $(".prev", $this_par).click(function() {
            if (!$sliderData.noSlide) $sliderData.slidePrev();
        });
        $(".next", $this_par).click(function() {
            if (!$sliderData.noSlide) $sliderData.slideNext();
        });

        $sliderData.ev.on("updateNav sliderReady", function() {
            if ($sliderData.lockRight) {
                $(".next", $this_par).addClass("disabled");
            } else {
                $(".next", $this_par).removeClass("disabled");
            };

            if ($sliderData.lockLeft) {
                $(".prev", $this_par).addClass("disabled");
            } else {
                $(".prev", $this_par).removeClass("disabled");
            };
            if ($sliderData.lockRight && $sliderData.lockLeft) {
                $this_par.addClass("hide-arrows");
            };
        });

        scroller.hover(
            function() {
                if($sliderAutoslide) {
                    $sliderData._autoPlayPaused = false;
                    $sliderData.pause();
                    $sliderData._pausedByHover = true;
                }
            },
            function() {
                if($sliderAutoslide) {
                    $sliderData._pausedByHover = false;
                    if(!$sliderData._pausedByClick){
                        $sliderData.play();
                    }
                }
            }
        );
    };

    $(".slider-wrapper .blog-media").css({
        "height": ""
    });

    $(".fullwidth-slider ul.clearfix").each(function(){
        $(this).shortcodesScroller();
    });

    var $sliderWrapper = $(".slider-wrapper");

    $sliderWrapper.css("visibility", "visible");

    $sliderWrapper.each(function(){
        var $this = $(this),
            $thisUl = $this.find(".ts-wrap").data("thePhotoSlider");

        $this.append('<a href="#" class="auto-play-btn"></a>');

        $this.on("mouseenter", function(e) {
            $this.addClass("show-arrows");
        });
        $this.on("mouseleave", function(e) {
            //setTimeout(function(){
            $this.removeClass("show-arrows");
            //}, 200);
        });

        if( $thisUl.st.autoPlay.enabled ){
            $(".auto-play-btn", $this).addClass("paused");
        }
        $(".auto-play-btn", $this).on("click", function(e){
            e.preventDefault();
            var $this = $(this);
            if( $this.hasClass("paused")){
                $this.removeClass("paused");
                $thisUl._pausedByClick = true;
                if (!$thisUl.noSlide) $thisUl.pause();
                $thisUl.st.autoPlay.enabled = false;
            }else{
                $this.addClass("paused");
                $thisUl._pausedByClick = false;
                if (!$thisUl.noSlide) $thisUl.play();
                $thisUl.st.autoPlay.enabled = true;
            }
        });

    });


    //Scroller slideshow

    $.fn.postTypeScroller = function() {
        var $el = $(this),
            slides = {},
            thumbs = "";

        slides.$items = $el.children("li"),
            slides.count = slides.$items.length;

        $el.addClass("ts-cont");
        $el.wrap('<div class="ts-wrap"><div class="ts-viewport photoSlider-wrap"></div></div>');
        if($el.hasClass("shortcode-photo-slider")){
            $el.parents(".ts-wrap").addClass("shortcode-slider-wrap")
        }

        var $slider = $el.parents(".ts-wrap"),
            $this_par = $el,
            windowW = $window.width(),
            paddings = $this_par.attr("data-padding-side") ? parseInt($this_par.attr("data-padding-side")) : 0,
            $sliderAutoslideEnable = ( 'true' != $this_par.attr("data-paused") && typeof $this_par.attr("data-autoslide") != "undefined" ) ? true : false,
            $sliderAutoslide = ( 'true' === $this_par.attr("data-paused") ) ? false : true,
            $sliderAutoslideDelay = $this_par.attr("data-autoslide") && parseInt($this_par.attr("data-autoslide")) > 999 ? parseInt($this_par.attr("data-autoslide")) : 5000,
            $sliderLoop = (  typeof $this_par.attr("data-autoslide") != "undefined" ) ? true : false,
            $sliderWidth = $this_par.attr("data-width") ? parseInt($this_par.attr("data-width")) : 800,
            $sliderHight = $this_par.attr("data-height") ? parseInt($this_par.attr("data-height")) : 400,
            imgMode = $this_par.attr("data-img-mode") ? $this_par.attr("data-img-mode") : "fill";

        var $sliderData = $slider.thePhotoSlider({
            mode: {
                type: "slider"
            },
            height: $sliderHight,
            width: $sliderWidth,
            //sidePaddings: paddings,
            resizeImg: true,
            imageScaleMode: imgMode,
            imageAlignCenter:true,
            autoPlay: {
                enabled: $sliderAutoslideEnable,
                delay: $sliderAutoslideDelay,
                loop: $sliderLoop
            }
        }).data("thePhotoSlider");

        //Append slider navigation
        $('<div class="leftArrow"></div><div class="rightArrow"></div>').insertAfter($el);
        //Append slider play/pause btn
        if(typeof $this_par.attr("data-autoslide") != "undefined"){
            $('<div class="psPlay"></div>').insertAfter($el);
        }

        if( 'true' === $this_par.attr("data-paused") ){
            $(".psPlay", $slider).addClass("paused");
        };
        $(".psPlay", $slider).on("click", function(e){
            e.preventDefault();
            var $this = $(this);
            if( $this.hasClass("paused")){
                $this.removeClass("paused");
                if (!$sliderData.noSlide) $sliderData.play();
                $sliderData.st.autoPlay.enabled = true;
            }else{
                $this.addClass("paused");
                if (!$sliderData.noSlide) $sliderData.pause();
                $sliderData.st.autoPlay.enabled = false;
            }
        });

        $(".leftArrow", $slider).click(function() {
            if (!$sliderData.noSlide) $sliderData.slidePrev();
        });
        $(".rightArrow", $slider).click(function() {
            if (!$sliderData.noSlide) $sliderData.slideNext();
        });

        $sliderData.ev.on("updateNav sliderReady", function() {
            if ($sliderData.lockRight) {
                $(".rightArrow", $slider).addClass("disabled");
            } else {
                $(".rightArrow", $slider).removeClass("disabled");
            };

            if ($sliderData.lockLeft) {
                $(".leftArrow", $slider).addClass("disabled");
            } else {
                $(".leftArrow", $slider).removeClass("disabled");
            };
            if ($sliderData.lockRight && $sliderData.lockLeft) {
                $this_par.addClass("hide-arrows");
            };
        });

        // scroller.hover(
        // 	function() {
        // 		if($sliderAutoslide) {
        // 			$sliderData._autoPlayPaused = false;
        // 			$sliderData.pause();
        // 			$sliderData._pausedByHover = true;
        // 		}
        // 	},
        // 	function() {
        // 		if($sliderAutoslide) {
        // 			$sliderData._pausedByHover = false;
        // 			if(!$sliderData._pausedByClick){
        // 				$sliderData.play();
        // 			}
        // 		}
        // 	}
        // );
    };
    $("ul.photoSlider:not(.slider-masonry)").each(function(){
        $(this).postTypeScroller();
    });
    $("ul.photoSlider").css("visibility", "visible");



    $.fn.postTypeContentScroller = function() {
        var $el = $(this),
            slides = {},
            thumbs = "";

        slides.$items = $el.children("li"),
            slides.count = slides.$items.length;

        $el.addClass("ts-cont");
        $el.wrap('<div class="ts-wrap contentSlider-wrap"><div class="ts-viewport"></div></div>');
        // if($el.hasClass("shortcode-photo-slider")){
        // 	$el.parents(".ts-wrap").addClass("shortcode-slider-wrap")
        // }

        var $slider = $el.parents(".ts-wrap"),
            $this_par = $el,
            windowW = $window.width(),
            paddings = $this_par.attr("data-padding-side") ? parseInt($this_par.attr("data-padding-side")) : 0,
            $sliderAutoslideEnable = ( 'true' != $this_par.attr("data-paused") && typeof $this_par.attr("data-autoslide") != "undefined" ) ? true : false,
            $sliderAutoslide = ( 'true' === $this_par.attr("data-paused") ) ? false : true,
            $sliderAutoslideDelay = $this_par.attr("data-autoslide") && parseInt($this_par.attr("data-autoslide")) > 999 ? parseInt($this_par.attr("data-autoslide")) : 5000,
            $sliderLoop = (  typeof $this_par.attr("data-autoslide") != "undefined" ) ? true : false,
            $sliderWidth = $this_par.attr("data-width") ? parseInt($this_par.attr("data-width")) : 800,
            $sliderHight = $this_par.attr("data-height") ? parseInt($this_par.attr("data-height")) : 400,
            imgMode = $this_par.attr("data-img-mode") ? $this_par.attr("data-img-mode") : "none";

        var $sliderData = $slider.thePhotoSlider({
            mode: {
                type: "slider"
            },
            height: "auto",
            // width: false,
            //sidePaddings: paddings,
            resizeImg: true,
            imageScaleMode: "none",
            imageAlignCenter:true,
            calcAutoHeight: true,
            autoPlay: {
                enabled: $sliderAutoslideEnable,
                delay: $sliderAutoslideDelay,
                loop: $sliderLoop
            }
        }).data("thePhotoSlider");

        //Append slider navigation
        $('<div class="leftArrow"></div><div class="rightArrow"></div>').insertAfter($el);


        $(".leftArrow", $slider).click(function() {
            if (!$sliderData.noSlide) $sliderData.slidePrev();
        });
        $(".rightArrow", $slider).click(function() {
            if (!$sliderData.noSlide) $sliderData.slideNext();
        });

        $sliderData.ev.on("updateNav sliderReady", function() {
            if ($sliderData.lockRight) {
                $(".rightArrow", $slider).addClass("disabled");
            } else {
                $(".rightArrow", $slider).removeClass("disabled");
            };

            if ($sliderData.lockLeft) {
                $(".leftArrow", $slider).addClass("disabled");
            } else {
                $(".leftArrow", $slider).removeClass("disabled");
            };
            if ($sliderData.lockRight && $sliderData.lockLeft) {
                $this_par.addClass("hide-arrows");
            };
        });

        //Bullets
        var itemHTML = '<div class="psBullet"></div>';

        $this_par.addClass('psWithBullets');
        var out = '<div class="psNav psBullets">';
        for(var i = 0; i < $sliderData.slides.$items.length; i++) {
            out += itemHTML;
        }
        $sliderData._controlNav = out = $(out + '</div>');
        out.appendTo($slider);


        $sliderData.ev.on("sliderReady beforeTransition", function() {


            $sliderData._controlNav.find(".psBullet").removeClass("act");
            $sliderData._controlNav.find(".psBullet").eq($sliderData.currSlide).addClass("act");

        });
        $sliderData._controlNav.find(".psBullet").each(function(i) {
            $(this).on("click", function(event) {
                var $this = $(this);
                if ($this.parents(".ts-wrap").hasClass("ts-interceptClicks")) return;
                $sliderData.slideTo(i);
                //$sliderData.update();
            });
        });



    }
    $(".slider-content").each(function(){
        $(this).postTypeContentScroller();
    });
    $(".slider-content").css("visibility", "visible");
// })


    /* #Header
     ================================================== */

    // var $document = $(document),
    // 	$window = $(window),
    // 	$html = $("html"),
    // 	$body = $("body"),
    var $overlayHeader = $(".overlay-navigation"),
        $stickyHeader = $(".sticky-header"),
        $mainSlider = $("#main-slideshow, .photo-scroller"),
        $leftHeader = $(".header-side-left").length > 0,
        $rightHeader = $(".header-side-right").length > 0,
        $main = $("#main, #main-slideshow, .photo-scroller, .page-title, .fancy-header, .footer"),
        $topHeader = $(".floating-logo.side-header-menu-icon .branding, .side-header-h-stroke, #phantom"),
        $sideHeader = $(".side-header"),
        $movesideHeader = $(".move-header-animation").length > 0,
        $onePage = $(".page-template-template-microsite").length > 0,
        dtScrollTimeout;
    if($(".side-header-v-stroke").length > 0){
        var $sideHeaderW = $sideHeader.width() - $(".side-header-v-stroke").width(),
            $delay = 200;
    }else{
        var $sideHeaderW = $sideHeader.width(),
            $delay = 0;
    }

    /* !-overlap header for webkit*/
    $overlapContent = $(".overlap #content");
    if ( !$.browser.webkit || dtGlobals.isMobile ){
    }else{
        $overlapContent.find(">:first-child").css({
            position: "relative",
            "z-index": "4"
        });
        if( $overlapContent.find(">:first-child").height() < 36 ){
            $overlapContent.find("> :nth-child(2)").css({
                position: "relative",
                "z-index": "4"
            })
        };
    };


    $.closeSideHeader = function(){
        $page.removeClass("show-header");
        $page.addClass("closed-header");
        $body.removeClass("show-sticky-header");
        //$(".mobile-sticky-header-overlay, .dt-mobile-menu-icon, .menu-toggle").removeClass("active");
        $(".sticky-header-overlay").removeClass("active");
        if($movesideHeader){
            if($leftHeader){
                $sideHeader.velocity({
                    translateX : -100 + "%"
                }, 400);
            }else{
                $sideHeader.velocity({
                    translateX : 100 + "%"
                }, 400);
            }
            $main.velocity({
                translateX : ""
            }, 400, function() {
                $main.css({
                    "transform": "none"
                });
            });
            $topHeader.velocity({
                translateX : ""
            }, 400);

        };
    }
    $.closeMobileHeader = function(){
        $page.removeClass("show-mobile-header");
        $page.addClass("closed-mobile-header");
        $body.removeClass("show-sticky-mobile-header show-overlay-mobile-header").addClass("closed-overlay-mobile-header");
        $(".mobile-sticky-header-overlay, .dt-mobile-menu-icon, .menu-toggle").removeClass("active");
        //$(".sticky-header-overlay").removeClass("active");

    }


    /*!-Show Hide side header*/
    if($stickyHeader.length > 0 || $overlayHeader.length > 0 ) {
        $('<div class="lines-button x"><span class="lines"></span></div>').appendTo(".menu-toggle");
        if($stickyHeader.length > 0) {
            $body.append('<div class="sticky-header-overlay"></div>');
            if(!$(".side-header-h-stroke").length > 0 && !$(".header-under-side-line").length > 0 && $(".mixed-header").length > 0){
                var mixedMenuToggle = $(".mixed-header").find(".menu-toggle").position().top;
                $(".mixed-header").find(".menu-toggle").clone(true).prependTo(".side-header").css({
                    top: mixedMenuToggle
                });
            }
        };
        /*hiding side header*/
        if($movesideHeader){
            if($leftHeader){
                $sideHeader.velocity({
                    translateX : -100 + "%"
                }, 0);
            }else if($rightHeader){
                $sideHeader.velocity({
                    translateX : 100 + "%"
                }, 0);
            }
        };

        if( $overlayHeader.length > 0 ) {
            $($sideHeader).append('<div class="hide-overlay"></div>');
            $('<div class="lines-button x"><span class="lines"></span></div>').appendTo(".hide-overlay");

        }

        var $hamburger = $(".menu-toggle .lines-button"),
            $menuToggle = $(".menu-toggle"),
            $overlay = $(".sticky-header-overlay");

        $hamburger.on("click", function (){
            if(!$(".header-under-side-line").length > 0){
                var $this = $(".side-header .menu-toggle");
            }else{
                var $this = $(".menu-toggle");
            }
            if ($this.hasClass("active")){
                $this.removeClass("active");
                $page.removeClass("show-header").addClass("closed-header");
                $this.parents("body").removeClass("show-sticky-header");
                $overlay.removeClass("active");
                $(".hide-overlay").removeClass("active");
                if($movesideHeader){
                    if($leftHeader){
                        $sideHeader.velocity({
                                translateX : -100 + "%"
                            },
                            {
                                duration: 400,
                                delay: $delay
                            });
                    }else{
                        $sideHeader.velocity({
                                translateX : 100 + "%"
                            },
                            {
                                duration: 400,
                                delay: $delay
                            } );
                    }
                    if(!$page.hasClass("boxed")){
                        $main.velocity({
                            translateX : ""
                        }, 400, function() {
                            $main.css({
                                "transform": "none"
                            });
                        });
                        $topHeader.velocity({
                            translateX : ""
                        }, 400);
                    }
                };

            }else{
                $menuToggle.removeClass("active");
                $this.addClass('active');
                $page.addClass("show-header").removeClass("closed-header");
                $this.parents("body").addClass("show-sticky-header");

                $overlay.addClass("active");
                $(".hide-overlay").addClass("active");
                if($movesideHeader){
                    if($leftHeader){
                        $sideHeader.velocity({
                            translateX : ""
                        }, 400);
                        if(!$page.hasClass("boxed")){
                            $main.velocity({
                                translateX : $sideHeaderW
                            }, {
                                duration: 400,
                                delay: $delay
                            });
                            $topHeader.velocity({
                                    translateX : $sideHeaderW
                                },
                                {
                                    duration: 400,
                                    delay: $delay
                                });
                        }
                    }else {
                        $sideHeader.velocity({
                            translateX : ""
                        }, 400);
                        if(!$page.hasClass("boxed")){
                            $main.velocity({
                                    translateX : -$sideHeaderW
                                },
                                {
                                    duration: 400,
                                    delay: $delay
                                });
                            $topHeader.velocity({
                                    translateX : -$sideHeaderW
                                },
                                {
                                    duration: 400,
                                    delay: $delay
                                } );
                        }
                    }
                }

            };
        });
        $overlay.on("click", function (){
            if($(this).hasClass("active")){
                $menuToggle.removeClass("active");
                $page.removeClass("show-header").addClass("closed-header");
                $body.removeClass("show-sticky-header");
                $overlay.removeClass("active");
                if($movesideHeader){
                    if($leftHeader){
                        $sideHeader.velocity({
                                translateX : -100 + "%"
                            },
                            {
                                duration: 400,
                                delay: $delay
                            });
                    }else{
                        $sideHeader.velocity({
                                translateX : 100 + "%"
                            },
                            {
                                duration: 400,
                                delay: $delay
                            });
                    }
                    $main.velocity({
                        translateX : ""
                    }, 400, function() {
                        $main.css({
                            "transform": "none"
                        });
                    });
                    $topHeader.velocity({
                        translateX : ""
                    }, 400);
                }
            }
        });
        $(".hide-overlay").on("click", function (){
            if($(this).hasClass("active")){
                $menuToggle.removeClass("active");
                $page.removeClass("show-header");
                $page.addClass("closed-header");
                $body.removeClass("show-sticky-header");
                $overlay.removeClass("active");
                if($movesideHeader){
                    if($leftHeader){
                        $sideHeader.velocity({
                                translateX : -100 + "%"
                            },
                            {
                                duration: 400,
                                delay: $delay
                            } );
                    }else{
                        $sideHeader.velocity({
                                translateX : 100 + "%"
                            },
                            {
                                duration: 400,
                                delay: $delay
                            });
                    }
                    $main.velocity({
                        translateX : ""
                    }, 400, function() {
                        $main.css({
                            "transform": "none"
                        });
                    });
                    $topHeader.velocity({
                        translateX : ""
                    }, 400);
                }
            }
        });
    };

    /* !- Right-side header + boxed layout */
    function ofX() {

        var $windowW = $window.width(),
            $boxedHeaderPos = ($windowW - $page.innerWidth())/2,
            $sideHeaderToggleExist = $(".side-header-menu-icon").length > 0;

        if ($body.hasClass("header-side-right") && $page.hasClass("boxed")) {
            if(!$stickyHeader.length > 0){
                $sideHeader.css({
                    right: $boxedHeaderPos
                });
            };
            if($sideHeaderToggleExist){
                $menuToggle.css({
                    right: $boxedHeaderPos
                });
                $(".branding").css({
                    left: $boxedHeaderPos
                });
            }
        };
        if ($body.hasClass("header-side-left") && $page.hasClass("boxed")) {

            if($sideHeaderToggleExist){

                $(".floating-logo .branding").css({
                    right: $boxedHeaderPos
                });
                $menuToggle.css({
                    left: $boxedHeaderPos
                });
            }
        };
        if($overlayHeader.length > 0 && $sideHeaderToggleExist  && $page.hasClass("boxed")){
            $menuToggle.css({
                right: $boxedHeaderPos
            });
            $(".floating-logo .branding").css({
                left: $boxedHeaderPos
            });

        }
    };

    ofX();
    $window.on("resize", function() {
        ofX();
    });


    /*Default scroll for mobile*/

    var position = 0;
    window.clickMenuToggle = function( $el, e ) {
        //$hamburger.on("click", function(e) {
        if($(".show-mobile-header").length > 0){
            var $menu = $(".dt-mobile-header");
        }else{
            var $menu = $sideHeader;
        }
        if(!$onePage) {
            if(!$html.hasClass("menu-open")) {
                position = dtGlobals.winScrollTop;
                $html.addClass("menu-open");

                if (!dtGlobals.isiOS) {
                    $body.css("margin-top", -position);
                }
                else {
                    $window.on("touchstart.dt", function(e) {
                        $window.off("touchmove.dt");

                        if ($menu[0].offsetHeight >= $menu[0].scrollHeight) {
                            $window.on("touchmove.dt", function(e) {
                                e.preventDefault();
                            });
                        }
                        else if ($menu[0].scrollTop <= 0) {
                            $menu[0].scrollTop += 1;
                        }
                        else if ($menu[0].scrollTop + $menu[0].offsetHeight >= $menu[0].scrollHeight) {
                            $menu[0].scrollTop -= 1;
                        };
                    });
                };
            }
            else {
                $html.removeClass("menu-open");

                if (!dtGlobals.isiOS) {
                    $body.css("margin-top", 0);
                    $window.scrollTop(position);
                }
                else {
                    $window.off("touchstart.dt");
                    $window.off("touchmove.dt");
                }
            };
        };
    };
    $body.on( 'click', '.menu-toggle .lines-button, .sticky-header-overlay, .hide-overlay, .dt-mobile-menu-icon, .dt-close-mobile-menu-icon span, .mobile-sticky-header-overlay, .floating-btn', function( e ) {
        clickMenuToggle( $( this ), e );
    });

    /*Side header scrollbar for desctop*/
    $(".side-header .header-bar").wrap("<div class='header-scrollbar-wrap'></div>");
    if($sideHeader.length > 0 && !dtGlobals.isMobile){
        $(".header-scrollbar-wrap").mCustomScrollbar({
            scrollInertia:150
        });

    };
    if($sideHeader.length > 0){
        if(!$(".mCSB_container").length > 0){
            $(".side-header .header-scrollbar-wrap .header-bar").wrap("<div class='mCSB_container'></div>");
        }
    }

    dtGlobals.desktopProcessed = false;
    dtGlobals.mobileProcessed = false;
    var headerBelowSliderExists = $(".floating-navigation-below-slider").exists(),
        bodyTransparent = $body.hasClass("transparent");

    $.headerBelowSlider = function(){
        if (headerBelowSliderExists) {
            var $header = $(".masthead:not(.side-header):not(#phantom)");

            if (window.innerWidth > dtLocal.themeSettings.mobileHeader.secondSwitchPoint && !dtGlobals.desktopProcessed) {
                dtGlobals.desktopProcessed = true;
                dtGlobals.mobileProcessed = false;

                if (bodyTransparent) {
                    $header.insertAfter("#main-slideshow, .photo-scroller").velocity({
                        translateY : -100 + '%'
                    }, 0, function() {

                    });
                    $header.css({
                        "visibility": "visible",
                        "opacity": 1,
                        "top" : "auto",
                        // "transform" : "translateY(-100%)",
                        // "-webkit-transform" : "translateY(-100%)"
                    });
                }
                else {
                    $header.insertAfter("#main-slideshow, .photo-scroller").css({
                        "visibility": "visible",
                        "opacity": 1
                    });
                };
            }
            else if (window.innerWidth <= dtLocal.themeSettings.mobileHeader.secondSwitchPoint && !dtGlobals.mobileProcessed) {
                dtGlobals.desktopProcessed = false;
                dtGlobals.mobileProcessed = true;

                $header.insertBefore("#main-slideshow, .photo-scroller").css({
                    "visibility": "visible",
                    "opacity": 1,
                    "transform": "",
                    "-webkit-transform" : ""
                });

                if(!$(".mobile-header-space").length > 0){
                    $("<div class='mobile-header-space'></div>").insertBefore($header);
                    $(".mobile-header-space").css({
                        height: $header.height()
                    });
                };
            };
        };
    };
    $.headerBelowSlider();


    var stickyMobileHeaderExists = $(".sticky-mobile-header").exists();

    $window.scroll(function () {
        if(headerBelowSliderExists && stickyMobileHeaderExists){
            if($body.hasClass("transparent")){
                var fixedHeadMobAfter = dtGlobals.winScrollTop > ($mainSlider.height() - $(".masthead:not(.side-header)").height());
            }else{
                var fixedHeadMobAfter = dtGlobals.winScrollTop > ($mainSlider.height());
            }
            if(fixedHeadMobAfter){
                $body.addClass("fixed-mobile-header");
            }else{
                $body.removeClass("fixed-mobile-header");
            }
        }
    })





    /* #Social icons svg
     ================================================== */
    /*!-svg icons array*/
    var icons = [
        '<g id="social-500px"><path d="M9.63,14.894c-0.984,0.068-1.756,0.847-1.756,1.771v2.645c0,0.358,0.373,0.358,0.495,0.358c0.328,0,0.495-0.121,0.495-0.358v-2.648c0-0.431,0.364-0.811,0.813-0.848c0.27-0.024,0.53,0.052,0.724,0.208c0.187,0.151,0.294,0.367,0.294,0.591c0,0.047-0.034,0.265-0.197,0.462c-0.191,0.227-0.464,0.341-0.823,0.341c-0.188,0-0.407,0.051-0.428,0.437c-0.014,0.159-0.038,0.425,0.315,0.472c0.35,0.043,0.712-0.017,1.055-0.179c0.601-0.276,1.006-0.812,1.057-1.399c0.042-0.507-0.162-1.004-0.561-1.364C10.717,15.034,10.187,14.846,9.63,14.894z"/><path d="M17.593,6.979c-1.642,0-2.977,1.411-2.977,3.146c0,1.735,1.335,3.146,2.977,3.146c1.643,0,2.979-1.412,2.979-3.146C20.572,8.391,19.235,6.979,17.593,6.979z M17.593,12.294c-1.12,0-2.031-0.973-2.031-2.169c0-1.195,0.911-2.167,2.031-2.167c1.121,0,2.033,0.972,2.033,2.167C19.626,11.321,18.714,12.294,17.593,12.294z"/><path d="M8.464,10.741C8.332,9.713,7.426,8.894,6.262,8.748C5.676,8.676,5.091,8.775,4.575,9.035v-1.02h2.917c0.356,0,0.362-0.355,0.364-0.487c0.003-0.171-0.035-0.296-0.117-0.379C7.64,7.046,7.515,7.046,7.468,7.046H4.061c-0.284,0-0.482,0.188-0.482,0.457v2.418c0,0.278,0.272,0.318,0.404,0.338l0.09,0.015c0.052,0.01,0.109,0.015,0.168,0.015c0.098,0,0.337-0.013,0.473-0.153c0.285-0.357,0.729-0.507,1.34-0.44c0.716,0.072,1.296,0.558,1.378,1.151c0.046,0.377-0.088,0.739-0.376,1.017c-0.295,0.286-0.72,0.45-1.165,0.45c-0.644,0-1.217-0.347-1.459-0.883c-0.062-0.143-0.176-0.215-0.338-0.215c-0.068,0-0.148,0.015-0.279,0.052c-0.124,0.038-0.295,0.106-0.361,0.257c-0.026,0.059-0.045,0.154,0.006,0.259c0.375,0.895,1.353,1.496,2.432,1.496c0.726,0,1.426-0.273,1.921-0.75C8.318,12.036,8.55,11.401,8.464,10.741z"/><path d="M14.407,10.125c0-1.734-1.337-3.146-2.979-3.146c-1.641,0-2.976,1.411-2.976,3.146c0,1.735,1.335,3.146,2.976,3.146C13.07,13.271,14.407,11.86,14.407,10.125z M11.428,12.294c-1.121,0-2.032-0.973-2.032-2.169c0-1.195,0.911-2.167,2.032-2.167c1.121,0,2.033,0.972,2.033,2.167C13.461,11.321,12.549,12.294,11.428,12.294z"/><path d="M16.013,15.422c-0.003-0.11-0.062-0.216-0.182-0.322c-0.125-0.112-0.387-0.251-0.603-0.068l-1.103,0.982l-1.092-0.98c-0.066-0.066-0.152-0.102-0.247-0.102c-0.141,0-0.257,0.086-0.341,0.161c-0.082,0.072-0.191,0.186-0.194,0.336c-0.002,0.092,0.036,0.175,0.117,0.251l1.068,0.956l-1.066,0.948c-0.034,0.033-0.113,0.11-0.113,0.241c0,0.158,0.113,0.277,0.201,0.355c0.074,0.063,0.188,0.147,0.33,0.147c0.133,0,0.22-0.074,0.269-0.115l1.071-0.969l1.086,0.96c0.042,0.055,0.136,0.118,0.262,0.118c0.153,0,0.275-0.091,0.361-0.166c0.117-0.113,0.174-0.223,0.173-0.336c-0.001-0.089-0.037-0.167-0.11-0.234l-1.076-0.959l1.076-0.956C15.931,15.64,16.016,15.558,16.013,15.422z"/></g>',
        '<g id="vk"><path d="M12.235 16.191c0.372 0 0.524-0.248 0.516-0.56c-0.017-1.17 0.438-1.797 1.258-0.978 c0.908 0.9 1.1 1.5 2.1 1.502c0.418 0 1.5 0 1.9 0c1.528 0 0.166-1.54-0.916-2.54c-1.024-0.952-1.071-0.979-0.189-2.123 c1.102-1.425 2.535-3.26 1.266-3.26c-0.246 0-0.072 0-2.428 0c-0.471 0-0.501 0.277-0.672 0.7 c-0.604 1.429-1.758 3.28-2.195 3.001c-0.46-0.295-0.248-1.3-0.213-3.038c0.014-0.459 0.01-0.774-0.694-0.94 c-1.92-0.447-3.578 0.431-2.9 0.537c0.954 0.2 0.9 2 0.6 2.98c-0.387 1.558-1.851-1.235-2.457-2.623 C7.25 8.5 7.2 8.3 6.7 8.277c-0.29 0-1.558 0-1.986 0c-0.382 0-0.569 0.177-0.434 0.531c0.133 0.3 1.7 3.8 3.4 5.8 c1.718 1.7 3.4 1.6 4.6 1.597H12.235L12.235 16.191z"/></g>',
        '<g id="tripedvisor"><path fill="none" d="M15.825 9.215c-1.584 0-2.873 1.291-2.873 2.874c0 1.6 1.3 2.9 2.9 2.876s2.873-1.292 2.873-2.876 C18.698 10.5 17.4 9.2 15.8 9.215z M15.879 13.729c-0.423 0-0.82-0.164-1.118-0.464c-0.299-0.301-0.465-0.697-0.465-1.121 c0-0.421 0.166-0.818 0.465-1.119c0.298-0.298 0.695-0.461 1.118-0.461c0.873 0 1.6 0.7 1.6 1.6 C17.464 13 16.8 13.7 15.9 13.729z"/><path fill="none" d="M8.26 9.251c-1.592 0-2.887 1.296-2.887 2.888c0 1.6 1.3 2.9 2.9 2.9 c1.591 0 2.886-1.299 2.886-2.887C11.146 10.5 9.9 9.3 8.3 9.251z M8.253 13.706c-0.421 0-0.816-0.163-1.113-0.461 c-0.3-0.296-0.462-0.691-0.462-1.114c0-0.419 0.164-0.814 0.462-1.113c0.297-0.296 0.693-0.457 1.113-0.462 c0.87 0 1.6 0.7 1.6 1.574S9.123 13.7 8.3 13.706z"/><path d="M8.253 10.556c-0.42 0.005-0.816 0.166-1.113 0.463c-0.299 0.299-0.462 0.694-0.462 1.113c0 0.4 0.2 0.8 0.5 1.1 c0.297 0.3 0.7 0.5 1.1 0.461c0.87 0 1.576-0.708 1.576-1.577S9.123 10.6 8.3 10.556z"/><path d="M15.879 10.563c-0.423 0-0.82 0.163-1.118 0.461c-0.299 0.301-0.465 0.698-0.465 1.119c0 0.4 0.2 0.8 0.5 1.1 c0.298 0.3 0.7 0.5 1.1 0.464c0.873 0 1.585-0.708 1.585-1.582S16.752 10.6 15.9 10.563z"/><path d="M20.172 8.047l-3.177 0.365c-0.042-0.013-0.085-0.021-0.127-0.034c-0.138-0.216-1.087-1.44-4.881-1.44 c-4.164 0-4.9 1.475-4.9 1.475l-3.165-0.35c0.339 0.3 1 1.3 1.1 1.733c-0.49 0.649-0.867 1.475-0.859 2.4 c0.016 1.8 0.7 3.9 3.7 4.338c1.375-0.019 2.048-0.344 3.064-1.133l1.109 2.461l1.169-2.439 c0.776 0.6 1.2 1 2.6 1.096c3.047-0.125 3.981-2.578 4.029-4.321c0.002-0.933-0.238-1.729-0.781-2.396 C19.256 9.3 19.9 8.4 20.2 8.047z M8.26 15.025c-1.592 0-2.887-1.299-2.887-2.887c0-1.592 1.295-2.888 2.887-2.888 c1.591 0 2.9 1.3 2.9 2.888C11.146 13.7 9.9 15 8.3 15.025z M15.825 14.965c-1.584 0-2.873-1.29-2.873-2.876 c0-1.583 1.289-2.874 2.873-2.874c1.586 0 2.9 1.3 2.9 2.874C18.698 13.7 17.4 15 15.8 14.965z"/></g>',
        '<g id="foursquare"><path d="M18.511 13.164l-5.351 5.353c-0.643 0.641-1.688 0.641-2.326 0L5.48 13.164c-0.639-0.645-0.639-1.688 0-2.329l5.354-5.354 c0.638-0.638 1.685-0.638 2.3 0l2.417 2.418l-3.631 3.631l-1.707-1.712c-0.239-0.24-0.57-0.377-0.907-0.377 c-0.339 0-0.667 0.137-0.907 0.375l-1.096 1.094c-0.243 0.243-0.378 0.565-0.378 0.909c0 0.3 0.1 0.7 0.4 0.906l3.707 3.7 c0.167 0.2 0.4 0.3 0.6 0.34l0.053 0.035l0.25 0.002c0.341 0 0.666-0.134 0.905-0.376l5.636-5.635h0.023 c0.689 0.7 0.7 1.6 0.1 2.333L18.511 13.164L18.511 13.164z"/><path d="M18.571 9.409l-6.367 6.373c-0.085 0.079-0.196 0.129-0.315 0.129l0 0c-0.002 0-0.002 0-0.004 0 c-0.017 0-0.034-0.002-0.048-0.005c-0.101-0.012-0.192-0.057-0.262-0.124l-3.547-3.558c-0.173-0.171-0.171-0.452 0-0.622 l1.049-1.048c0.083-0.081 0.195-0.128 0.311-0.129c0.117 0 0.2 0.1 0.3 0.131l2.191 2.195l5.009-5.009 c0.083-0.084 0.193-0.13 0.312-0.13c0.117 0 0.2 0 0.3 0.13l1.045 1.049c0.221 0.1 0.2 0.4 0.1 0.619L18.571 9.4 L18.571 9.409z"/></g>',
        '<g id="website"><path d="M8.639 10.095c0.251-0.252 0.53-0.46 0.827-0.625c1.654-0.912 3.778-0.425 4.8 1.187l-1.287 1.3 c-0.371-0.844-1.288-1.323-2.198-1.118c-0.342 0.077-0.67 0.249-0.936 0.512l-2.468 2.467c-0.75 0.748-0.75 2 0 2.7 c0.75 0.8 2 0.8 2.7 0l0.762-0.76c0.689 0.2 1.4 0.3 2.2 0.324l-1.679 1.682c-1.439 1.438-3.771 1.438-5.211 0 c-1.439-1.438-1.439-3.771 0-5.211L8.639 10.095z M12.557 6.177l-1.681 1.677c0.732-0.054 1.4 0.1 2.2 0.331l0.764-0.761 c0.75-0.749 1.97-0.749 2.7 0c0.75 0.8 0.8 2 0 2.717l-2.465 2.466c-0.753 0.752-1.974 0.744-2.719 0 c-0.173-0.174-0.323-0.393-0.417-0.604l-1.287 1.284c0.136 0.2 0.3 0.4 0.4 0.562c0.465 0.4 1.1 0.8 1.8 1 c0.882 0.2 1.9 0.1 2.644-0.354c0.298-0.16 0.577-0.369 0.828-0.621l2.47-2.465c1.437-1.439 1.437-3.773 0-5.21 c-1.479-1.438-3.761-1.438-5.292-0.008L12.557 6.177L12.557 6.177z"/></g>',
        '<g id="mail"><path d="M5 6.984v10.031h0.012h13.954H19V6.984H5z M17.414 8.134l-5.416 4.012L6.586 8.134H17.414 z M6.188 9.289l2.902 2.151L6.188 14.25V9.289z M6.2 15.864l3.842-3.719l1.957 1.45l1.946-1.442l3.834 3.712L6.2 15.864L6.2 15.864z M17.812 14.271l-2.916-2.824l2.916-2.159V14.271z"/></g>',
        '<g id="behance"><path d="M11.429 8.664c0.27 0.4 0.4 0.8 0.4 1.385c0 0.554-0.138 0.999-0.407 1.3 c-0.152 0.188-0.374 0.36-0.671 0.499c0.45 0.2 0.8 0.4 1 0.804c0.229 0.4 0.3 0.8 0.3 1.3 c0 0.535-0.133 1.021-0.39 1.397c-0.164 0.282-0.374 0.522-0.62 0.722c-0.282 0.217-0.61 0.363-0.992 0.5 c-0.381 0.076-0.794 0.128-1.236 0.128H4.836V7.694H9.07c1.156-0.03 1.9 0.4 2.4 0.97H11.429z M6.686 9.345v2.015h2.145 c0.382 0 0.694-0.078 0.931-0.227c0.241-0.149 0.36-0.417 0.36-0.804c0-0.422-0.159-0.707-0.475-0.841 C9.374 9.4 9 9.3 8.6 9.345l-1.92 0.017V9.345z M6.686 12.874v2.438h2.142c0.385 0 0.682-0.055 0.894-0.164 c0.387-0.201 0.581-0.573 0.581-1.137c0-0.479-0.188-0.812-0.563-0.984c-0.209-0.098-0.501-0.146-0.883-0.152L6.686 12.9 L6.686 12.874z M17.494 10.061c0.445 0.2 0.8 0.5 1.1 0.979c0.262 0.4 0.4 0.9 0.5 1.4 c0.041 0.3 0.1 0.7 0.1 1.312h-4.637c0.023 0.7 0.3 1.1 0.7 1.396c0.248 0.2 0.6 0.2 0.9 0.2 c0.383 0 0.688-0.104 0.924-0.309c0.133-0.104 0.188-0.164 0.289-0.354h1.734c-0.041 0.396-0.232 0.688-0.598 1.1 c-0.568 0.646-1.363 0.97-2.396 0.999c-0.848 0-1.596-0.271-2.236-0.812c-0.652-0.543-0.835-1.439-0.835-2.659 c0-1.144 0.147-2.012 0.735-2.621c0.584-0.611 1.344-0.916 2.275-0.916c0.559-0.023 1.1 0.1 1.5 0.293L17.494 10.061z M14.811 11.632c-0.232 0.256-0.328 0.775-0.391 1.198l3.064 0.034c-0.033-0.468-0.074-0.964-0.412-1.413 c-0.271-0.244-0.752-0.295-1.156-0.295c-0.438 0.003-0.818 0.203-1.113 0.477L14.811 11.632L14.811 11.632z M18.586 7.207h-4.707 v1.584h4.707V7.207z"/></g>',
        '<g id="stumbleupon"><path d="M12.719 10.35l0.917 0.499l1.456-0.477v-0.96c0-1.656-1.422-2.944-3.11-2.944 c-1.687 0-3.116 1.205-3.116 2.949c0 1.7 0 4.4 0 4.384c0 0.401-0.332 0.723-0.738 0.723c-0.409 0-0.74-0.318-0.74-0.723v-1.855 H5v1.896c0 1.7 1.4 3.1 3.2 3.034c1.71 0 3.096-1.336 3.121-2.991V9.517c0-0.396 0.331-0.718 0.74-0.718 c0.407 0 0.7 0.3 0.7 0.718v0.833H12.719z M16.573 11.918v1.943c0 0.396-0.33 0.719-0.738 0.7 c-0.41 0-0.737-0.32-0.737-0.723v-1.906l-1.459 0.478l-0.916-0.499v1.891c0.02 1.7 1.4 3.1 3.2 3.1 c1.719 0 3.117-1.362 3.117-3.032c0-0.025 0-1.887 0-1.887L16.573 11.918L16.573 11.918z"/></g>',
        '<g id="instagram"><rect x="3" y="3" display="none" opacity="0.7" fill="#27AAE1" enable-background="new    " width="16" height="16"/><path d="M15.121 11.582l3.023-0.032v4.181c0 1.334-1.095 2.42-2.437 2.42H8.283c-1.344 0-2.434-1.086-2.434-2.42v-4.173h3.097 c-0.08 0.677-0.096 0.745-0.056 1.052c0.233 1.8 1.8 2.6 3.2 2.652c1.672 0.1 2.703-0.996 3.123-2.927 c-0.045-0.729-0.017 0.085-0.017-0.752L15.121 11.582L15.121 11.582z M8.226 5.851C8.246 5.8 8.3 5.8 8.3 5.85h0.393 M8.279 5.85h7.431c1.343 0 2.4 1.1 2.4 2.421l0.002 2.33h-3.375c-0.527-0.672-1.499-1.71-2.784-1.674 c-1.755 0.048-2.28 1.089-2.663 1.727L5.85 10.56V8.271c0-0.816 0.317-2.02 1.821-2.419 M16.739 7.5 c0-0.191-0.155-0.342-0.345-0.342h-1.166c-0.19 0-0.34 0.15-0.34 0.342v1.181c0 0.2 0.1 0.3 0.3 0.343h1.164 c0.188 0 0.345-0.155 0.345-0.343V7.5l0.037 0.039V7.5z M10.207 12.054c0 1 0.8 1.8 1.8 1.9 c0.986 0 1.788-0.891 1.788-1.88c0-0.983-0.802-1.779-1.789-1.779c-1.029 0.011-1.867 0.823-1.867 1.779H10.207z"/></g>',
        '<g id="github"><path d="M15.604 5.666c-0.662 0.286-1.369 0.442-2.124 0.472C13 5.9 12.4 5.7 11.8 5.666c-1.562 0-3.112 1.052-3.177 2.8 c-0.047 1.3 0.5 2.2 1.6 2.788c-0.475 0.219-0.664 0.723-0.664 1.217c0 0.5 0.3 1 0.6 1.2 C9.041 14.2 8.4 14.9 8.4 15.889c0 3.2 7 3.3 7.004-0.136c0-1.271-0.875-2.188-3.03-2.538 c-0.852-0.118-1.304-1.413-0.046-1.647c1.803-0.296 3.015-1.998 2.38-3.867c0.269-0.04 0.537-0.105 0.801-0.196l0.097-1.818V5.666 H15.604z M12.002 14.818c0.982-0.02 1.6 0.3 1.6 0.951c0.014 0.674-0.539 0.979-1.482 0.9 c-1.049-0.003-1.643-0.292-1.664-0.986c0.004-0.549 0.484-0.861 1.631-0.902H12.002L12.002 14.818z M11.856 10 c-0.831 0.012-1.212-0.445-1.213-1.329c0-0.806 0.369-1.309 1.194-1.314c0.738-0.003 1.1 0.5 1.1 1.4 C13.041 9.5 12.6 10 11.8 9.98L11.856 9.96z"/></g>',
        '<g id="skype"><path d="M18.412 12.034c0-3.541-2.889-6.412-6.447-6.412c-0.353 0-0.7 0.028-1.038 0.083c-0.604-0.394-1.323-0.623-2.101-0.623 c-2.124 0-3.846 1.723-3.846 3.847c0 0.8 0.2 1.5 0.6 2.094c-0.053 0.33-0.079 0.667-0.079 1 c0 3.5 2.9 6.4 6.4 6.414c0.402 0 0.795-0.041 1.176-0.107c0.589 0.4 1.3 0.6 2 0.6 c2.126 0 3.849-1.725 3.849-3.848c0-0.803-0.246-1.551-0.668-2.167C18.391 12.6 18.4 12.3 18.4 12.034z M12.568 16.8 c-2.049 0.105-3.007-0.348-3.886-1.172c-0.98-0.918-0.587-1.969 0.213-2.021c0.798-0.053 1.3 0.9 1.7 1.2 c0.427 0.3 2 0.9 2.901-0.104c0.933-1.062-0.621-1.614-1.758-1.782C10.121 12.6 8.1 11.7 8.2 10 c0.159-1.729 1.468-2.617 2.847-2.742c1.757-0.159 2.9 0.3 3.8 1.037c1.046 0.9 0.5 1.89-0.187 2 c-0.664 0.079-1.411-1.468-2.874-1.49c-1.509-0.022-2.528 1.571-0.665 2.024c1.861 0.5 3.9 0.6 4.6 2.3 C16.455 14.8 14.6 16.7 12.6 16.76z"/></g>',
        '<g id="devian"><path d="M11.747 10.649c2.892-0.069 5.2 1.4 5.6 3.778l-2.893 0.058l-0.02-1.923c-0.629-0.337-0.83-0.45-1.492-0.523 l-0.035 3.913H20c-0.374-3.838-3.814-6.841-8.001-6.841c-0.073 0-0.146 0-0.216 0.001L11.8 7.1 c-0.66-0.056-1.126 0.276-1.757 0.629l-0.012 1.624C6.868 10.1 4.3 12.8 4 15.95h7.785v-5.301H11.747z M10.072 14.4 l-3.359 0.086c0.262-1.62 1.974-3.136 3.333-3.597L10.072 14.37z"/></g>',
        '<g id="pinterest"><path d="M8.317 13.361c0.703-1.242-0.227-1.515-0.372-2.416c-0.596-3.68 4.244-6.193 6.779-3.622 c1.754 1.8 0.6 7.256-2.229 6.687c-2.71-0.545 1.325-4.901-0.836-5.756c-1.757-0.696-2.689 2.126-1.856 3.5 c-0.489 2.411-1.541 4.682-1.114 7.708c1.381-1.002 1.847-2.924 2.228-4.924c0.695 0.4 1.1 0.9 2 0.9 c3.264 0.3 5.089-3.258 4.641-6.5c-0.396-2.872-3.259-4.335-6.313-3.992c-2.415 0.27-4.822 2.222-4.922 5 C6.211 11.7 6.7 13 8.3 13.361z"/></g>',
        '<g id="tumbler"><path d="M10.493 5.792c-0.073 0.618-0.211 1.126-0.41 1.526C9.884 7.7 9.6 8.1 9.3 8.35c-0.328 0.289-0.72 0.507-1.18 0.7 v1.71h1.285v4.198c0 0.5 0.1 0.9 0.2 1.252c0.111 0.3 0.3 0.5 0.6 0.828c0.289 0.2 0.6 0.4 1 0.6 c0.412 0.1 0.9 0.2 1.4 0.205c0.47 0 0.911-0.049 1.313-0.146c0.401-0.097 0.858-0.266 1.358-0.508v-1.896 c-0.586 0.396-1.176 0.589-1.771 0.589c-0.335 0-0.63-0.078-0.89-0.235c-0.195-0.117-0.331-0.281-0.405-0.479 c-0.068-0.196-0.106-0.641-0.106-1.336v-3.073h2.784V8.824H12.21V5.792H10.493z"/></g>',
        '<g id="vimeo"><path d="M17.732 9.417c-0.051 1.179-0.83 2.796-2.342 4.85c-1.561 2.144-2.878 3.215-3.959 3.258c-0.668 0-1.235-0.65-1.697-1.959 c-0.306-1.195-0.617-2.396-0.925-3.587c-0.34-1.373-0.678-1.984-1.085-1.984c-0.086 0-0.386 0.192-0.899 0.571L6.268 9.8 c0.565-0.526 1.15-1.036 1.66-1.576c0.754-0.688 1.321-1.053 1.7-1.088c0.893-0.091 1.4 0.5 1.6 1.9 c0.225 1.5 0.4 2.4 0.5 2.779c0.256 1.2 0.5 1.8 0.8 1.834c0.24 0 0.601-0.402 1.082-1.206 c0.481-0.802 0.739-1.413 0.772-1.834c0.066-0.689-0.188-1.037-0.772-1.037c-0.276 0-0.561 0.065-0.85 0.2 c0.565-1.953 1.645-2.901 3.232-2.846c1.198 0.1 1.8 0.9 1.7 2.447H17.732z"/></g>',
        '<g id="linkedin"><path d="M9.269 7.02c0 0.714-0.586 1.293-1.307 1.293c-0.722 0-1.307-0.579-1.307-1.293 c0-0.712 0.585-1.291 1.307-1.291C8.683 5.7 9.3 6.3 9.3 7.02H9.269z M9.061 9.279H6.873v7.392h2.188V9.279z M12.91 9.3 h-1.795l-0.027 7.392h2.044c0 0 0-2.742 0-3.879c0-1.04 0.775-1.79 1.7-1.665c0.824 0.1 1.1 0.6 1.1 1.7 c0 1.028-0.021 3.915-0.021 3.89h2.025c0 0 0.025-2.729 0.025-4.708c0-1.981-1.006-2.78-2.604-2.78 c-1.599 0-2.248 1.096-2.248 1.096v-1H12.91z"/></g>',
        '<g id="lastfm"><path d="M11.217 15.157l-0.538-1.458c0 0-0.87 0.972-2.177 0.972c-1.159 0-1.979-1.009-1.979-2.621c0-2.064 1.04-2.807 2.063-2.807 c1.475 0 1.9 1 2.3 2.185l0.538 1.678c0.535 1.6 1.5 2.9 4.4 2.938c2.082 0 3.488-0.638 3.488-2.318 c0-1.357-0.771-2.063-2.216-2.4l-1.071-0.233c-0.739-0.17-0.953-0.472-0.953-0.973c0-0.572 0.453-0.907 1.188-0.907 c0.808 0 1.2 0.3 1.3 1.023l1.681-0.201c-0.088-1.521-1.174-2.125-2.884-2.135c-1.512 0-2.987 0.571-2.987 2.4 c0 1.1 0.5 1.9 1.9 2.203l1.141 0.27c0.854 0.2 1.1 0.6 1.1 1.042c0 0.624-0.603 0.877-1.739 0.9 c-1.697 0-2.399-0.893-2.802-2.116l-0.555-1.677c-0.702-2.184-1.826-2.99-4.058-2.99c-2.467 0-3.771 1.562-3.771 4.2 c0 2.5 1.3 3.9 3.6 3.93c2.041-0.041 2.903-0.947 2.903-0.94h0.042V15.157z"/></g>',
        '<g id="forrst"><polygon points="11.404,15.574 9.438,13.961 10.031,13.381 11.404,14.055 11.404,10.815 12.492,10.815 12.492,12.521 14.07,12.043 14.365,12.904 12.596,13.67 12.596,14.715 15.158,13.766 15.548,14.625 12.596,16.053 12.596,17.771 17.913,17.771 12,4.229 6.087,17.771 11.404,17.771 "/></g>',
        '<g id="flickr"><circle cx="8.3" cy="12" r="2.8"/><circle cx="15.7" cy="12" r="2.8"/></g>',
        '<g id="delicious"><path d="M16.553 6H7.457C6.652 6 6 6.7 6 7.454v9.089c0 0.9 0.6 1.5 1.4 1.455h9.095c0.806 0 1.458-0.651 1.458-1.455 V7.454C18.014 6.7 17.4 6 16.6 6H16.553z M16.906 16.327c0 0.252-0.344 0.605-0.594 0.582H12V12H7.219L7.188 7.8 c0-0.251 0.407-0.646 0.656-0.646H12v4.844h4.938L16.906 16.327L16.906 16.327z"/></g>',
        '<g id="rss"><path d="M9.258 16.374c0 0.894-0.728 1.62-1.625 1.62s-1.625-0.729-1.625-1.62c0-0.896 0.729-1.618 1.625-1.618 c0.898-0.027 1.7 0.7 1.7 1.618H9.258z M6.007 10.099v2.4c3.026 0 5.4 2.5 5.6 5.496h2.408 c-0.075-4.356-3.594-7.841-7.949-7.896H6.007z M6.007 8.419c2.556 0 5 1 6.8 2.812c1.812 1.9 2.8 4.2 2.8 6.751H18 C17.982 11.4 12.6 6 6 6.005L6.007 8.419L6.007 8.419z"/></g>',
        '<g id="you-tube"><path d="M18.877 9.35c-0.22-1.924-0.96-2.189-2.438-2.292c-2.101-0.147-6.781-0.147-8.88 0C6.084 7.2 5.3 7.4 5.1 9.3 c-0.163 1.429-0.164 3.9 0 5.298c0.22 1.9 1 2.2 2.4 2.294c2.099 0.1 6.8 0.1 8.9 0 c1.477-0.104 2.217-0.369 2.437-2.294C19.041 13.2 19 10.8 18.9 9.35z M9.69 15.335v-6.65l5.623 3.324L9.69 15.335z"/></g>',
        '<g id="dribbble"><path d="M12.012 5C8.139 5 5 8.1 5 12c0 3.8 3.1 7 7 7C15.861 19 19 15.9 19 12c0.025-3.857-3.075-7-7.012-7H12.012 z M17.787 11.674c-1.506-0.246-2.889-0.259-4.15-0.043c-0.145-0.329-0.291-0.656-0.447-0.979c1.352-0.583 2.438-1.376 3.244-2.378 c0.787 1 1.3 2.1 1.4 3.401L17.787 11.674L17.787 11.674z M15.54 7.456c-0.701 0.907-1.671 1.624-2.91 2.1 c-0.595-1.086-1.273-2.143-2.038-3.173c0.455-0.115 0.928-0.185 1.42-0.185c1.331-0.066 2.5 0.4 3.5 1.18L15.54 7.456z M9.398 6.847c0.779 1 1.5 2.1 2.1 3.138c-1.419 0.418-3.115 0.631-5.073 0.688c0.405-1.743 1.56-3.118 3.037-3.826H9.398 z M6.217 12c0-0.052 0.007-0.1 0.01-0.151c2.247-0.004 4.187-0.263 5.812-0.771c0.136 0.3 0.3 0.6 0.4 0.8 c-1.975 0.615-3.603 1.877-4.868 3.781C6.725 14.7 6.2 13.4 6.2 12H6.217z M8.458 16.6 c1.15-1.799 2.619-2.971 4.437-3.512c0.543 1.4 1 2.8 1.2 4.354c-0.646 0.246-1.348 0.39-2.077 0.4 c-1.329-0.055-2.571-0.546-3.555-1.273L8.458 16.593z M15.229 16.807c-0.258-1.371-0.636-2.716-1.121-4.021 c1.094-0.157 2.305-0.112 3.6 0.112c-0.273 1.634-1.23 3.009-2.516 3.908H15.229L15.229 16.807z"/></g>',
        '<g id="google"><path d="M19.02 10.145h-1.953l0.021 1.958h-1.344l-0.021-1.937l-1.854-0.019l-0.023-1.258l1.896-0.008V6.864h1.343V8.86 l1.938 0.042v1.243H19.02z M13.254 15.303c0 1.217-1.107 2.698-3.899 2.698c-2.043 0-3.748-0.884-3.748-2.364 c0-1.146 0.725-2.624 4.107-2.624c-0.5-0.412-0.625-0.985-0.318-1.604c-1.98 0-2.995-1.166-2.995-2.645 c0-1.447 1.076-2.762 3.271-2.762c0.557 0 3.5 0 3.5 0l-0.809 0.823h-0.923c0.651 0.4 1 1.1 1 2 c0 0.778-0.427 1.407-1.036 1.874c-1.085 0.838-0.807 1.4 0.3 2.133c1.091 0.8 1.5 1.5 1.5 2.48L13.254 15.3 L13.254 15.303z M10.863 8.771C10.712 7.8 10 7.1 9.1 7.068c-0.872-0.021-1.457 0.687-1.307 1.6 c0.151 0.9 0.9 1.6 1.9 1.562c0.848 0.1 1.305-0.531 1.201-1.458L10.863 8.771z M11.544 15.5 c0-0.707-0.78-1.379-2.087-1.379c-1.178-0.017-2.179 0.615-2.179 1.354c0 0.7 0.8 1.4 2 1.4 c1.56-0.031 2.338-0.553 2.338-1.334H11.544z"/></g>',
        '<g id="twitter"><path d="M18.614 6.604c-0.556 0.325-1.171 0.561-1.822 0.688c-0.526-0.551-1.271-0.896-2.099-0.896 c-1.586 0-2.875 1.269-2.875 2.83c0 0.2 0 0.4 0.1 0.646c-2.385-0.119-4.5-1.247-5.916-2.959 C5.729 7.3 5.6 7.8 5.6 8.336c0 1 0.5 1.9 1.3 2.354c-0.47-0.014-0.912-0.141-1.3-0.354c0 0 0 0 0 0 c0 1.4 1 2.5 2.3 2.774c-0.241 0.062-0.495 0.102-0.756 0.102c-0.186 0-0.365-0.02-0.541-0.055 c0.365 1.1 1.4 1.9 2.7 1.971c-0.982 0.756-2.222 1.208-3.567 1.208c-0.232 0-0.461-0.016-0.686-0.04 c1.271 0.8 2.8 1.3 4.4 1.272c5.286 0 8.171-4.312 8.171-8.055c0-0.123-0.003-0.246-0.009-0.367 C18.127 8.8 18.6 8.3 19 7.72c-0.516 0.225-1.068 0.378-1.648 0.446C17.943 7.8 18.4 7.3 18.6 6.604z"/></g>',
        '<g id="facebook"><path d="M14.545 11.521l-1.74 0.002l0.052 6.648h-2.453l0.014-6.648H8.824V9.421h1.592l-0.001-1.236 c0-1.713 0.485-2.756 2.592-2.756h1.758V7.53h-1.098c-0.824 0-0.863 0.293-0.863 0.84l-0.004 1.051h1.975L14.545 11.521z"/></g>',
        '<g id="xing"><polygon points="18.2,5 15.3,5 10.6,13.4 13.7,19 16.6,19 13.4,13.4"/><polygon points="9.5,7.6 6.6,7.6 8.2,10.3 5.8,14.6 8.7,14.6 11.2,10.3"/></g>',
        '<g id="odnoklassniki"><path d="M12.001 12.212c1.819 0 3.299-1.542 3.299-3.442c0-1.897-1.479-3.442-3.299-3.442c-1.822 0-3.302 1.544-3.302 3.4 C8.699 10.7 10.2 12.2 12 12.212z M12.001 7.346c0.753 0 1.4 0.6 1.4 1.424c0 0.788-0.612 1.426-1.365 1.4 s-1.367-0.638-1.367-1.426C10.634 8 11.2 7.3 12 7.346z"/><path d="M15.557 12.802c-0.285-0.47-0.883-0.613-1.334-0.315c-1.353 0.888-3.094 0.886-4.444 0 c-0.454-0.298-1.049-0.155-1.333 0.315c-0.286 0.473-0.149 1.1 0.3 1.393c0.597 0.4 1.2 0.7 1.9 0.826l-1.847 1.9 c-0.376 0.393-0.376 1 0 1.426c0.19 0.2 0.4 0.3 0.7 0.295c0.25 0 0.498-0.101 0.685-0.295l1.815-1.894l1.812 1.9 c0.377 0.4 1 0.4 1.4 0c0.379-0.396 0.379-1.033 0-1.426l-1.849-1.929c0.675-0.156 1.319-0.437 1.918-0.826 C15.704 13.9 15.8 13.3 15.6 12.802z"/></g>',
        '<g id="weibo"><path fill="none" d="M10.852 10.982c-0.188 0.001-0.379 0.012-0.571 0.03c-2.466 0.231-4.341 1.763-4.188 3.4 c0.153 1.7 2.3 2.8 4.7 2.582c2.469-0.23 4.344-1.766 4.188-3.42C14.884 12.1 13.1 11 10.9 10.982z M11.108 16.211c-1.224 0.528-2.753 0.096-3.123-0.938c-0.37-1.034 0.026-2.414 1.641-2.95c0.216-0.071 0.472-0.111 0.736-0.112 c0.795 0 1.7 0.3 2.1 1.232C12.883 14.4 12.3 15.7 11.1 16.211z"/><path fill="none" d="M10.749 13.609c-0.063 0-0.129 0.016-0.192 0.048c-0.169 0.091-0.25 0.274-0.181 0.4 c0.067 0.1 0.3 0.2 0.4 0.086c0.169-0.092 0.251-0.274 0.182-0.41C10.943 13.7 10.9 13.6 10.7 13.609z"/><path fill="none" d="M9.57 13.982c-0.158 0-0.328 0.043-0.494 0.14c-0.443 0.257-0.518 0.696-0.329 1.1 c0.133 0.3 0.7 0.4 1.1 0.14c0.443-0.258 0.483-0.799 0.309-1.08C10.059 14.1 9.8 14 9.6 13.982z"/><path d="M16.672 10.558c0.605 0.2 0.823-0.293 0.791-1.008c-0.023-0.497-0.229-0.817-0.35-1.026 c-0.319-0.541-0.963-0.885-1.555-0.893c-0.109-0.001-0.218 0.008-0.32 0.031c-0.283 0.061-0.624 0.182-0.494 0.7 c0.143 0.5 0.9 0.2 1.3 0.427s0.374 0.4 0.4 0.714C16.499 9.9 16.2 10.4 16.7 10.558z"/><path d="M19.473 9.129c-0.088-1.024-0.719-2.061-1.505-2.708c-0.653-0.54-1.608-0.859-2.464-0.864 c-0.122 0-0.242 0.006-0.359 0.019c-0.463 0.049-0.938 0.153-0.945 0.692c-0.012 0.5 0.4 0.6 0.6 0.6 c0.859-0.037 1.621-0.222 2.6 0.649c0.574 0.5 1 1.5 0.9 2.076c-0.168 1.098-0.326 1.5 0.2 1.7 C19.574 11.6 19.5 9.9 19.5 9.129z"/><path d="M10.362 12.211c-0.266 0.001-0.52 0.04-0.736 0.112c-1.615 0.536-2.011 1.916-1.641 3 c0.37 1 1.9 1.5 3.1 0.938c1.223-0.529 1.774-1.787 1.344-2.768C12.063 12.6 11.2 12.2 10.4 12.211z M9.858 15.354c-0.442 0.256-0.979 0.144-1.111-0.14c-0.189-0.396-0.112-0.835 0.329-1.092c0.165-0.097 0.336-0.14 0.493-0.14 c0.263 0 0.5 0.1 0.6 0.291C10.34 14.6 10.3 15.1 9.9 15.354z"/><path d="M15.493 11.402c-0.163-0.054 0.651-1.638-0.241-2.087c-1.504-0.756-3.555 0.668-3.464 0.3 c0.168-0.719 0.526-2.196-0.743-2.264c-0.087-0.009-0.176-0.013-0.265-0.012c-2.777 0.022-6.688 4.516-6.246 6.9 c0.479 2.6 3.6 3.8 6.7 3.658c2.804 0 6.714-2.161 6.292-4.678C17.516 12.4 16.6 11.8 15.5 11.402z M10.837 17.016c-2.466 0.23-4.589-0.927-4.743-2.582c-0.153-1.657 1.72-3.188 4.188-3.419c0.193-0.019 0.383-0.029 0.571-0.03 c2.212-0.018 4 1.1 4.2 2.615C15.18 15.3 13.3 16.8 10.8 17.016z"/></g>',
        '<g id="research-gate"><path d="M11.338,16.022c-0.048-0.261-0.078-0.633-0.087-1.129c-0.007-0.49-0.033-0.906-0.07-1.242c-0.039-0.34-0.111-0.614-0.216-0.842c-0.104-0.221-0.252-0.387-0.44-0.501c-0.194-0.119-0.45-0.196-0.772-0.239v-0.027c0.531-0.114,0.922-0.365,1.174-0.758c0.252-0.394,0.377-0.901,0.377-1.522c0-0.808-0.215-1.404-0.651-1.8c-0.435-0.396-1.039-0.591-1.825-0.591H5.358v9.262h1.879v-3.916h0.994c0.384,0,0.66,0.101,0.821,0.312c0.165,0.209,0.253,0.494,0.271,0.856l0.053,1.774c0.007,0.188,0.024,0.357,0.051,0.523c0.024,0.17,0.089,0.318,0.185,0.449h2.057V16.56C11.495,16.463,11.386,16.28,11.338,16.022z M9.062,11.142c-0.244,0.214-0.592,0.317-1.041,0.317H7.237V8.787h0.887c0.869,0,1.302,0.428,1.302,1.285C9.426,10.574,9.306,10.932,9.062,11.142z"/><path d="M15.606,11.641v1.374h1.235v0.947c0,0.247-0.036,0.467-0.114,0.654c-0.08,0.188-0.177,0.338-0.295,0.458c-0.115,0.125-0.242,0.214-0.38,0.271c-0.131,0.066-0.256,0.096-0.368,0.096c-0.269,0-0.486-0.09-0.656-0.25c-0.174-0.17-0.299-0.414-0.396-0.73c-0.092-0.314-0.155-0.693-0.188-1.141c-0.033-0.446-0.051-0.95-0.051-1.509c0-1.162,0.1-1.991,0.305-2.491c0.193-0.502,0.521-0.753,0.973-0.753c0.193,0,0.357,0.05,0.49,0.147c0.133,0.102,0.246,0.225,0.332,0.376c0.088,0.152,0.148,0.319,0.189,0.506s0.057,0.361,0.057,0.525h1.801c0-0.943-0.225-1.666-0.678-2.172c-0.451-0.507-1.189-0.761-2.217-0.761c-0.601,0-1.103,0.101-1.5,0.302c-0.398,0.196-0.724,0.494-0.965,0.887c-0.242,0.394-0.416,0.885-0.513,1.473c-0.104,0.588-0.151,1.271-0.151,2.047c0,0.808,0.032,1.512,0.104,2.122c0.065,0.606,0.205,1.123,0.409,1.537c0.199,0.413,0.486,0.729,0.847,0.938c0.358,0.214,0.834,0.317,1.403,0.317c0.439,0,0.822-0.078,1.142-0.244c0.313-0.162,0.588-0.426,0.812-0.791h0.029v0.855h1.379v-4.991H15.606z"/></g>',
        '<g id="yelp"><path d="M8.378,5.342c0.739-0.581,2.159-0.747,2.743-0.633c0.586,0.112,0.891,0.439,0.895,0.838l0.034,5.08c0.003,0.399-0.205,0.767-0.461,0.815c-0.258,0.049-0.637-0.188-0.845-0.528L8.079,6.558C7.873,6.218,7.455,6.068,8.378,5.342 M7.493,15.003l2.684-0.949c0.373-0.134,0.708-0.504,0.746-0.823c0.036-0.32-0.235-0.701-0.604-0.847l-2.834-1.125c-0.369-0.146-0.795,0.2-0.907,0.767c0,0-0.068,1.972,0,2.379C6.645,14.812,7.119,15.135,7.493,15.003 M12.174,15.477c0.008-0.4-0.206-0.745-0.475-0.77c-0.27-0.025-0.696,0.205-0.951,0.51l-1.872,2.244c-0.256,0.305-0.129,1.021,0.243,1.157l1.957,0.68c0.373,0.137,1.028-0.266,1.036-0.664L12.174,15.477z M16.826,14.955l-2.347-0.676c-0.381-0.108-0.813-0.099-0.96,0.025c-0.146,0.122-0.108,0.51,0.082,0.857l1.481,2.712c0.192,0.349,0.958,0.289,1.169-0.05c0,0,0.893-1.317,1.057-1.811C17.473,15.519,17.207,15.063,16.826,14.955 M17.398,11.142c-0.105-0.343-0.841-1.354-1.237-1.698c-0.397-0.346-0.852-0.303-1.107,0.001l-1.514,1.802c-0.256,0.304-0.324,0.784-0.152,1.067c0.17,0.282,0.627,0.442,1.013,0.356l2.617-0.485C17.489,12.071,17.506,11.484,17.398,11.142"/></g>',
        '<g id="blogger"><path d="M6.031,14.114c0,2.131,1.739,3.854,3.882,3.854h4.179c2.145,0,3.877-1.724,3.877-3.854v-2.732c0-0.425-0.342-0.77-0.771-0.77h-0.654c-0.426,0-0.76-0.318-0.787-0.717c-0.004-2.14-1.742-3.865-3.886-3.865H9.913c-2.144,0-3.88,1.725-3.882,3.855V14.114z M13.086,10c0,0.62-0.345,1.125-0.77,1.125h-2.261c-0.423,0-0.768-0.505-0.768-1.125c0-0.623,0.345-1.125,0.768-1.125h2.261C12.741,8.875,13.086,9.376,13.086,10z M15.256,14.078c0,0.597-0.326,1.089-0.725,1.089h-4.523c-0.399,0-0.721-0.492-0.721-1.089S9.608,13,10.008,13h4.523C14.93,13,15.256,13.481,15.256,14.078z"/></g>',
        '<g id="soundcloud"><path d="M7.521,16.146h1.119V9.094c-0.42,0.119-0.798,0.335-1.119,0.618V16.146z M5.282,11.375v4.762l0.072,0.009h1.047v-4.778H5.354L5.282,11.375z M3.042,13.755c0,0.867,0.451,1.621,1.12,2.04v-4.076C3.493,12.138,3.042,12.891,3.042,13.755z M9.761,16.146h1.12V9.405c-0.335-0.209-0.715-0.346-1.12-0.399V16.146z M18.646,11.367h-0.629c0.032-0.194,0.051-0.393,0.051-0.596c0-1.979-1.552-3.583-3.467-3.583c-1.039,0-1.966,0.478-2.602,1.227v7.731h6.646c1.276,0,2.312-1.07,2.312-2.391C20.958,12.437,19.922,11.367,18.646,11.367z"/></g>'
    ];


    var icons = $('<svg id="svg-source" height="0" version="1.1" xmlns="http://www.w3.org/2000/svg" style="position:absolute; margin-left: -100%" xmlns:xlink="http://www.w3.org/1999/xlink">'+icons+'</svg>');

    $(document.body).prepend($(icons));

    $(".soc-ico a").not(".entry-share .soc-ico a").html('<svg class="icon" viewBox="0 0 24 24"><use xlink:href="#social-500px"></use></svg>');
    $(".entry-share .soc-ico a").append('<svg class="icon" viewBox="0 0 24 24"><use xlink:href="#social-500px"></use></svg>')
    var svg_icon = $(".soc-ico a svg use");

    $(".px-500").find(svg_icon).attr("xlink:href", "#social-500px");
    $(".tripedvisor").find(svg_icon).attr("xlink:href", "#tripedvisor");
    $(".vk").find(svg_icon).attr("xlink:href", "#vk");
    $(".foursquare").find(svg_icon).attr("xlink:href", "#foursquare");
    $(".website").find(svg_icon).attr("xlink:href", "#website");
    $(".mail").find(svg_icon).attr("xlink:href", "#mail");
    $(".behance").find(svg_icon).attr("xlink:href", "#behance");
    $(".stumbleupon").find(svg_icon).attr("xlink:href", "#stumbleupon");
    $(".instagram").find(svg_icon).attr("xlink:href", "#instagram");
    $(".github").find(svg_icon).attr("xlink:href", "#github");
    $(".skype").find(svg_icon).attr("xlink:href", "#skype");
    $(".devian").find(svg_icon).attr("xlink:href", "#devian");
    $(".pinterest").find(svg_icon).attr("xlink:href", "#pinterest");
    $(".tumbler").find(svg_icon).attr("xlink:href", "#tumbler");
    $(".vimeo").find(svg_icon).attr("xlink:href", "#vimeo");
    $(".linkedin").find(svg_icon).attr("xlink:href", "#linkedin");
    $(".lastfm").find(svg_icon).attr("xlink:href", "#lastfm");
    $(".forrst").find(svg_icon).attr("xlink:href", "#forrst");
    $(".flickr").find(svg_icon).attr("xlink:href", "#flickr");
    $(".delicious").find(svg_icon).attr("xlink:href", "#delicious");
    $(".rss").find(svg_icon).attr("xlink:href", "#rss");
    $(".you-tube").find(svg_icon).attr("xlink:href", "#you-tube");
    $(".dribbble").find(svg_icon).attr("xlink:href", "#dribbble");
    $(".google").find(svg_icon).attr("xlink:href", "#google");
    $(".twitter").find(svg_icon).attr("xlink:href", "#twitter");
    $(".facebook").find(svg_icon).attr("xlink:href", "#facebook");
    $(".xing").find(svg_icon).attr("xlink:href", "#xing");
    $(".odnoklassniki").find(svg_icon).attr("xlink:href", "#odnoklassniki");
    $(".weibo").find(svg_icon).attr("xlink:href", "#weibo");
    $(".research-gate").find(svg_icon).attr("xlink:href", "#research-gate");
    $(".yelp").find(svg_icon).attr("xlink:href", "#yelp");
    $(".blogger").find(svg_icon).attr("xlink:href", "#blogger");
    $(".soundcloud").find(svg_icon).attr("xlink:href", "#soundcloud");

    /*Show soc icons*/
    $(".soc-ico a").css("visibility", "visible");



    /* #Mobile header
     ================================================== */
// jQuery(document).ready(function($) {
    // function mobileHeader(){
    // var	$mobileNav = $(".main-nav > *").clone();
    // var $document = $(document),
    // 	$window = $(window),
    // 	$html = $("html"),
    // 	$body = $("body"),
    var $mixedHeader = $(".mixed-header"),
        $mobileWidgets = $(".masthead:not(.side-header) .header-bar .mini-widgets > * ").clone(true),
        $mobileSideWidgets = $(".side-header .header-bar .mini-widgets ").clone(true),
        // $firstSwitchWidgetsInMenu = $(".masthead .in-menu-first-switch").clone(true),
        $firstSwitchWidgetsNearLogo = $(".masthead .near-logo-first-switch").clone(true).addClass("show-on-first-switch"),
        // $secondSwitchWidgetsInMenu = $(".masthead .in-menu-second-switch").clone(true),
        $secondSwitchWidgetsNearLogo = $(".masthead .near-logo-second-switch").clone(true).addClass("show-on-second-switch"),
        $mobileWidgetsInMenu = $(".masthead").find(".in-menu-first-switch, .in-menu-second-switch").clone(true),
        $mobileWidgetsNearLogo = $(".masthead").find(".near-logo-first-switch, .near-logo-second-switch ").clone(true).addClass("show-on-second-switch");

    if($mixedHeader.length > 0){
        var $mobileLogo = $mixedHeader.find(".branding > a, .branding > img").clone(true),
            $activeHeader = $mixedHeader
    }else{
        var $mobileLogo = $(".masthead:not(.mixed-header)").find(".branding > a, .branding > img").clone(true),
            $activeHeader = $(".masthead");
    }

    /*Append mobile header-bar to masthead*/
    $("<div class='mobile-header-bar'><div class='mobile-navigation'></div><div class='mobile-mini-widgets'></div><div class='mobile-branding'></div></div>").appendTo(".masthead");
    /*Mobile menu toggle icon*/
    $(".mobile-header-bar .mobile-navigation").append("<a href='#' class='dt-mobile-menu-icon'><span class='lines'></span></a>");
    /*Append mini widgets to mobile header-bar*/
    $(".mobile-header-bar .mobile-mini-widgets").append($mobileWidgets);
    /*Append logo to mobile header-bar*/
    $(".mobile-header-bar .mobile-branding").append($mobileLogo);

    var $mobileMenu = $(".dt-mobile-header");
    if($mobileMenu.siblings().hasClass("dt-parent-menu-clickable")){
        $mobileMenu.addClass("dt-parent-menu-clickable");
    }

    /*Mobile widgets*/
    $($mobileWidgetsInMenu).appendTo(".mobile-mini-widgets-in-menu");
    //$($firstSwitchWidgetsNearLogo).appendTo(".mobile-mini-widgets");
    $($secondSwitchWidgetsNearLogo).appendTo(".mobile-mini-widgets");
    $mobileMenu.append($mobileSideWidgets);


    /*Remove mega menu settings from mobile*/
    $(".mobile-main-nav ").find("li").each(function(){
        var $this = $(this),
            $this_sub = $this.find(" > .dt-mega-menu-wrap > .sub-nav");
        if($this.hasClass("new-column")){
            var $thisPrev = $this.prev().find(" > .sub-nav");
            $(" > .sub-nav > *", $this).appendTo($thisPrev)
        }
        $this_sub.unwrap();
    }).removeClass('dt-mega-menu dt-mega-parent hide-mega-title').find(" > .sub-nav").removeClass("hover-style-click-bg hover-style-bg");


    /*!-Show Hide mobile header*/
    if($mobileMenu.length > 0 ) {
        dtGlobals.mobileMenuPoint = 50;
        var $menu = $(".dt-mobile-header"),
            $Mobilehamburger = $(".dt-mobile-menu-icon");


        /*Mobile floating menu toggle*/
        if(!$(".floating-btn").length > 0 && $(".floating-mobile-menu-icon").length > 0){
            var $hamburgerFloat = $Mobilehamburger.first().clone(true);
            $hamburgerFloat.insertBefore($Mobilehamburger).addClass("floating-btn");
        }
        var $floatMobBtn = $(".floating-btn");

        $window.scroll(function () {
            dtGlobals.mobileMenuPoint = $activeHeader.offset().top + $activeHeader.height() + 50;

            if(dtGlobals.winScrollTop > dtGlobals.mobileMenuPoint){
                //console.log("show float")
                $floatMobBtn.parents(".masthead").addClass("show-floating-icon");
            }
            else {
                $floatMobBtn.parents(".masthead").removeClass("show-floating-icon");
            }
            if(dtGlobals.winScrollTop > $(".masthead:not(.side-header)").height()){
                $menu.addClass("stick-to-top");
            }else{
                $menu.removeClass("stick-to-top");
            }
        });
        var $Mobilehamburger = $(".dt-mobile-menu-icon");

        /*Append overlay for mobile menu*/
        if(!$(".mobile-sticky-header-overlay").length > 0){
            $body.append('<div class="mobile-sticky-header-overlay"></div>');
            //$('<div class="mobile-sticky-header-overlay"></div>').insertAfter(".dt-mobile-header");
        }

        var $mobileOverlay = $(".mobile-sticky-header-overlay");

        /*Click on mobile menu toggle*/
        $Mobilehamburger.on("click", function (e){
            e.preventDefault();

            var $this = $(this);

            if ($this.hasClass("active")){
                $this.removeClass("active");
                $page.removeClass("show-mobile-header").addClass("closed-mobile-header");
                $body.removeClass("show-mobile-overlay-header").addClass("closed-overlay-mobile-header");
                $this.parents("body").removeClass("show-sticky-mobile-header");
                $mobileOverlay.removeClass("active");
            }else{
                $Mobilehamburger.removeClass("active");
                $this.addClass('active');
                $page.addClass("show-mobile-header").removeClass("closed-mobile-header");
                $body.removeClass("closed-overlay-mobile-header").addClass("show-overlay-mobile-header");
                $mobileOverlay.removeClass("active");
                $this.parents("body").addClass("show-sticky-mobile-header");

                $mobileOverlay.addClass("active");
            };


        });
        $mobileOverlay.on("click", function (){
            if($(this).hasClass("active")){
                $Mobilehamburger.removeClass("active");
                $page.removeClass("show-mobile-header").addClass("closed-mobile-header");
                $body.removeClass("show-sticky-mobile-header").removeClass("show-overlay-mobile-header").addClass("closed-overlay-mobile-header");
                $mobileOverlay.removeClass("active");

            }
        });
        $(".dt-close-mobile-menu-icon span").on("click", function (){

            $page.removeClass("show-mobile-header");
            $page.addClass("closed-mobile-header");
            $body.removeClass("show-sticky-mobile-header");
            $body.removeClass("show-overlay-mobile-header").addClass("closed-overlay-mobile-header");
            $mobileOverlay.removeClass("active");
            $Mobilehamburger.removeClass("active");

        });
        $(".dt-mobile-header").wrapInner("<div class='mobile-header-scrollbar-wrap'></div>");
        if(!dtGlobals.isMobile){
            $(".mobile-header-scrollbar-wrap").mCustomScrollbar({
                scrollInertia:150
            });
        }
    };

    $.mobileHeader = function() {
        if($(".sticky-mobile-header ").length > 0){
            if($(".mixed-header").length > 0){
                var headerH = $(".mixed-header").height();
            }else{
                var headerH = $(".masthead").height();
            }
            var stickyMobileHeader = $('.masthead').first();
            if(!$(".mobile-header-space").length > 0 && !$(".floating-navigation-below-slider").length > 0){
                $("<div class='mobile-header-space'></div>").insertBefore(stickyMobileHeader);
            }
            $(".mobile-header-space").css({
                height: headerH
            });
        }
    }
    $.mobileHeader();

// })


    /* #Main menu
     ================================================== */
// jQuery(document).ready(function($) {
    /* We need to fine-tune timings and do something about the usage of jQuery "animate" function */

    //Menu decoration Underline > Left to right

    $(".l-to-r-line > li:not(.menu-item-language) > a > span").not(".l-to-r-line > li > a > span.mega-icon").append("<i class='underline'></i>");

    //Menu/Buttons decoration Animation on click
    $(".btn-material .dt-btn, .btn-material a.button, .no-touchevents .masthead:not(.sub-downwards) .animate-click-decoration > .menu-item > a:not(.not-clickable-item), .no-touchevents .masthead:not(.sub-downwards) .main-nav .hover-style-click-bg > li > a:not(.not-clickable-item)").each(function(){
        var $this = $(this),
            rippleTimer;
        $this.addClass("ripple");
        $this.ripple();
        var $thisRipple = $(".rippleWrap", $this)
        $this.on("click", function(e){
            if(!$thisRipple.parent('a[href^="#"]').length > 0){
                e.preventDefault();
            }
        })
            .on("mousedown", function(e){
                if (e.which == 3) {
                }else if(e.shiftKey || e.ctrlKey || e.metaKey){
                    window.open($this.attr("href"), '_blank');
                }else{
                    e.preventDefault();
                    var $thisTarget = $this.attr("target") ? $this.attr("target") : "_self";
                    clearTimeout( rippleTimer );
                    rippleTimer = setTimeout( function() {
                        if(!$thisRipple.parent('a[href^="#"]').length > 0){

                            window.open($this.attr("href"), $thisTarget);
                            return false;
                        }else{
                            $(this).parent("a").trigger("click");
                            return false;
                        }
                    }, 200)
                }

            });
    });
    $(".not-clickable-item").on("click", function(e){
        e.preventDefault();
        e.stopPropagation();
    });

    //Menu decoration Background / outline / line > Hover/Active line
    if($(".active-line-decoration").length > 0 || $(".hover-line-decoration").length > 0){
        $(".main-nav > .menu-item > a").append("<span class='decoration-line'></span>");
    };

    //declare vars
    var $mainNav = $(".main-nav, .mini-nav"),
        $mainMenu = $(".masthead:not(.sub-downwards) .main-nav, .mini-nav"),
        $mainNavMob = $(".main-nav"),
        $sideHeader = $(".side-header");

    /*Wpml menu item*/
    $(".menu-item-language").each(function(){
        var $this = $(this);
        if($this.children('.submenu-languages').length > 0){
            $this.addClass("has-children");
        }
    });

    //
    $(".act", $mainNav).parents("li").addClass("act");

    var	$mobileNav = $mainNavMob.clone();
    var	$mobileTopNav = $(".mini-nav").clone();


    $(".mini-nav select").change(function() {
        window.location.href = $(this).val();
    });

    dtGlobals.isHovering = false;
    $(".main-nav li", $sideHeader).each(function(){
        var $this = $(this);
        if($this.hasClass("new-column")){
            var $thisPrev = $this.prev().find(" > .sub-nav");
            $(" > .sub-nav > *", $this).appendTo($thisPrev)
        }
    })
    $(".sub-downwards .main-nav > li").each(function(){
        var $this = $(this),
            $this_sub = $this.find(" > .dt-mega-menu-wrap > .sub-nav");
        $this_sub.unwrap();
    });

    /*Top bar select type menu menu*/
    var droupdownCustomMenu = $(".select-type-menu");
    if($(".masthead").find(".sub-nav").length > 0){
        var subMenuClassList = $(".masthead").find(".sub-nav").attr("class");
    }else{
        var subMenuClassList = "sub-nav";
    }
    droupdownCustomMenu.find("> ul").addClass(subMenuClassList ).css("visibility", "visible");

    /*Sub menu*/
    $(" li.has-children ", $mainMenu).each(function() {
        var $this = $(this);
        if($this.parent().hasClass("main-nav") && !$this.parents().hasClass("side-header")){
            var $thisHover = $this.find("> a");
        }else if($this.parent().hasClass("main-nav") && $this.parents().hasClass("side-header")){
            var $thisHover = $this;
        }else if($this.parent().hasClass("sub-nav") || $this.parents().hasClass("mini-nav")){
            var $thisHover = $this;
        };

        if(dtGlobals.isMobile || dtGlobals.isWindowsPhone){
            $this.find("> a").on("click", function(e) {
                if (!$(this).hasClass("dt-clicked")) {
                    e.preventDefault();
                    $mainNav.find(".dt-clicked").removeClass("dt-clicked");
                    $(this).addClass("dt-clicked");
                } else {
                    e.stopPropagation();
                }
            });
        };
        var menuTimeoutShow,
            menuTimeoutHide;


        $thisHover.on("mouseenter tap", function(e) {
            var $this = $(this);
            if(e.type == "tap") e.stopPropagation();
            if($this.parent("li").length > 0){
                var $thisPar = $this.parent(),
                    $subMenu = $this.siblings("div, ul");
            }else{
                var $thisPar = $this,
                    $this_a = $this.find("> a"),
                    $subMenu = $this_a.siblings("div, ul");
                //$this_of_l = $this.offset().left,
                //$this_a = $this.find("> a").offset().left;
            }
            var $this_of_l = $this.offset().left,
                $this_a = $this.offset().left,
                $masthead = $this.parents(".masthead");


            $thisPar.addClass("dt-hovered");
            if($thisPar.hasClass("dt-mega-menu")) $thisPar.addClass("show-mega-menu");

            dtGlobals.isHovering = true;

            /*Right overflow menu*/
            if ($page.width() - ($subMenu.offset().left - $page.offset().left) - $subMenu.width() < 0) {
                $subMenu.addClass("right-overflow");
            }
            /*Bottom overflow menu*/
            if ($window.height() - ($subMenu.offset().top - dtGlobals.winScrollTop) - $subMenu.innerHeight() < 0) {
                $subMenu.addClass("bottom-overflow");
            };

            /*Left position*/
            if(!$sideHeader.length > 0){
                $subMenu.not(".right-overflow").css({
                    left: $this_a - $this_of_l
                });
            };

            /*Mega menu auto width */
            if($thisPar.hasClass("mega-auto-width")){
                var $_this_par_width = $thisPar.width(),
                    $_this_par_of_l = $masthead.offset().left,
                    $_this_of_l = $thisPar.offset().left;
                $_this_parents_ofs = $thisPar.offset().left - $_this_par_of_l;

                if(!$sideHeader.length){
                    var $pageW = $page.width();
                    if($(".boxed").length > 0){
                        var $_this_of_l = $thisPar.position().left;
                    }else{
                        var $_this_of_l = $thisPar.offset().left;
                    }

                    if($subMenu.width()  > ($pageW - $thisPar.position().left)){
                        $subMenu.css({
                            left: -( $subMenu.innerWidth()  - ($pageW - $_this_of_l) )
                        });
                    }
                    if($subMenu.width() > $pageW){
                        if($(".boxed").length > 0){
                            $subMenu.css({
                                width: $masthead.width(),
                                left: -($thisPar.position().left)
                            });
                        }else{
                            $subMenu.css({
                                width: $masthead.width(),
                                left: -($_this_of_l - $_this_par_of_l)
                            });
                        }
                    }
                }
            };

            /*Mega menu -> full width*/
            if($thisPar.hasClass("mega-full-width")){
                var $_this_of_l = $thisPar.offset().left;
                if($this.parents(".header-bar").length > 0){
                    var $_this_par_w = $this.parents(".header-bar").innerWidth(),
                        $_this_par_of_l = $this.parents(".header-bar").offset().left;
                }else{
                    var $_this_par_w = $this.parents(".ph-wrap").innerWidth(),
                        $_this_par_of_l = $this.parents(".ph-wrap").offset().left;

                }
                if(!$sideHeader.length > 0){
                    $subMenu.css({
                        width: $_this_par_w,
                        left: -($_this_of_l - $_this_par_of_l)
                    })
                }
            }

            clearTimeout(menuTimeoutShow);
            clearTimeout(menuTimeoutHide);

            menuTimeoutShow = setTimeout(function() {
                if($thisPar.hasClass("dt-hovered")){
                    $subMenu.stop().css("visibility", "visible").animate({
                        "opacity": 1
                    }, 150);
                }
            }, 100);


        });

        $this.on("mouseleave", function(e) {
            var $this = $(this),
                $thisLink = $this.find("> a"),
                $subMenu = $thisLink.siblings("div, ul");

            $this.removeClass("dt-hovered");
            dtGlobals.isHovering = false;
            clearTimeout(menuTimeoutShow);
            clearTimeout(menuTimeoutHide);

            menuTimeoutHide = setTimeout(function() {
                if(!$this.hasClass("dt-hovered")){
                    $subMenu.stop().animate({
                        "opacity": 0
                    }, 150, function() {
                        $(this).css("visibility", "hidden");
                    });

                    $this.removeClass("show-mega-menu");

                    setTimeout(function() {
                        if(!$this.hasClass("dt-hovered")){
                            $subMenu.removeClass("right-overflow");
                            $subMenu.removeClass("bottom-overflow");
                            if($this.hasClass("mega-auto-width")){
                                $subMenu.css({
                                    width: "",
                                    left: ""
                                });
                            }
                        }
                    }, 400);
                }
            }, 150);

            $this.find("> a").removeClass("dt-clicked");

        });

    });


    var menuTimeoutShow,
        menuTimeoutHide;
    droupdownCustomMenu.on("mouseenter tap", function(e) {
        if(e.type == "tap") e.stopPropagation();

        var $this = $(this);
        $this.addClass("dt-hovered");

        if ($page.width() - ($this.children(".sub-nav").offset().left - $page.offset().left) - $this.find(" > .sub-nav").width() < 0) {
            $this.children(".sub-nav").addClass("right-overflow");
        }

        if ($window.height() - ($this.children(".sub-nav").offset().top - dtGlobals.winScrollTop) - $this.children(".sub-nav").height() < 0) {
            $this.children(".sub-nav").addClass("bottom-overflow");
        };

        dtGlobals.isHovering = true;
        clearTimeout(menuTimeoutShow);
        clearTimeout(menuTimeoutHide);

        menuTimeoutShow = setTimeout(function() {
            if($this.hasClass("dt-hovered")){
                $this.children('.sub-nav').stop().css("visibility", "visible").animate({
                    "opacity": 1
                }, 150);
            }
        }, 100);
    });

    droupdownCustomMenu.on("mouseleave", function(e) {
        var $this = $(this);
        $this.removeClass("dt-hovered");

        dtGlobals.isHovering = false;
        clearTimeout(menuTimeoutShow);
        clearTimeout(menuTimeoutHide);

        menuTimeoutHide = setTimeout(function() {
            if(!$this.hasClass("dt-hovered")){
                if(!$this.parents().hasClass("dt-mega-menu")){
                    $this.children(".sub-nav").stop().animate({
                        "opacity": 0
                    }, 150, function() {
                        $(this).css("visibility", "hidden");
                    });
                }

                setTimeout(function() {
                    if(!$this.hasClass("dt-hovered")){
                        $this.children(".sub-nav").removeClass("right-overflow");
                        $this.children(".sub-nav").removeClass("bottom-overflow");
                    }
                }, 400);
            }
        }, 150);

        //	$this.find("> a").removeClass("dt-clicked");
    });
// });

// })


    /* #Custom menu
     ================================================== */
// jQuery(document).ready(function($) {
    var customTimeoutShow;

    if($(".dt-parent-menu-clickable").length > 0){

        var item = $('.main-nav li.has-children > a, .mobile-main-nav li.has-children > a');
        $("<i class='next-level-button'></i>").insertAfter(item);

        $(".sub-downwards .main-nav li.has-children, .mobile-main-nav li.has-children").each(function(){
            var $this = $(this);
            // if($this.hasClass("dt-mega-menu")){
            // 	var subMenu = $this.find(" > .sub-nav, .sub-menu");
            // }else{
            var subMenu = $this.find(" > .sub-nav, .sub-menu");
            //	}
            if($this.find(".sub-nav li, .sub-menu li").hasClass("act")){
                $this.addClass('active');
            };

            if($this.find(".sub-nav li.act, .sub-menu li.act").hasClass("act")){
                $this.addClass('open-sub');
                subMenu.stop(true, true).slideDown(100);
            };
            $this.find(" > .next-level-button").on("click", function(e){
                var $this = $(this).parent();
                if ($this.hasClass("active")){
                    subMenu.stop(true, true).slideUp(500);
                    $this.removeClass("active");
                    $this.removeClass('open-sub');
                }else{
                    $this.siblings().find(" .sub-nav, .dt-mega-menu-wrap, .sub-menu").stop(true, true).slideUp(400);
                    subMenu.stop(true, true).slideDown(500);
                    $this.siblings().removeClass("active");
                    $this.addClass('active');
                    $this.siblings().removeClass('open-sub');
                    $this.addClass('open-sub');
                };

                //$(".header-bar").mCustomScrollbar("update");
            })
        });

    }else{
        $(".sub-downwards .main-nav li > a, .mobile-main-nav li.has-children > a").each(function(){
            var $this = $(this);
            if($this.parent("li").find(".sub-nav li, .sub-menu li").hasClass("act")){
                $this.addClass('act');
            };
            if($this.parent("li").find(".sub-nav li.act, .sub-menu li.act").hasClass("act")){
                $this.parent("li").addClass('open-sub');
                $this.siblings(".sub-nav, .sub-menu").stop(true, true).slideDown(100);
            };
            $this.on("click", function(e){
                $menuItem = $this.parent();
                if ($menuItem.hasClass("has-children menu-item-language")) e.preventDefault();

                if ($this.hasClass("act")){
                    $this.siblings(".sub-nav, .sub-menu").stop(true, true).slideUp(500);
                    $this.removeClass("act");
                    $this.parent("li").removeClass('open-sub');
                }else{
                    $this.parent().siblings().find(".sub-nav, .dt-mega-menu-wrap, .sub-menu").stop(true, true).slideUp(400);
                    $this.siblings(".sub-nav, .sub-menu").stop(true, true).slideDown(500);
                    $this.parent().siblings().find("> a").removeClass("act");
                    $this.addClass('act');
                    $this.parent("li").siblings().removeClass('open-sub');
                    $this.parent("li").addClass('open-sub');
                };
                $(".header-bar").mCustomScrollbar("update");
            });
        });

    };


    $(".custom-nav > li > a").click(function(e){
        $menuItem = $(this).parent();
        if ($menuItem.hasClass("has-children")) e.preventDefault();


        if ($(this).attr("class") != "active"){
            $(".custom-nav > li > ul").stop(true, true).slideUp(400);
            $(this).next().stop(true, true).slideDown(500);
            $(".custom-nav > li > a").removeClass("active");
            $(this).addClass('active');
        }else{
            $(this).next().stop(true, true).slideUp(500);
            $(this).removeClass("active");
        }

        $menuItem.siblings().removeClass("act");
        $menuItem.addClass("act");
    });

    $(".custom-nav > li > ul").each(function(){
        clearTimeout(customTimeoutShow);
        $this = $(this);
        $thisChildren = $this.find("li");
        if($thisChildren.hasClass("act")){
            $this.prev().addClass("active");
            $this.parent().siblings().removeClass("act");
            $this.parent().addClass("act");
            $(this).slideDown(500);
        }
    });
// })


    /* #Floating menu
     ================================================== */
// jQuery(document).ready(function($) {

    /*--Set variable for floating menu*/
    if (dtGlobals.isMobile && !dtGlobals.isiPad) dtLocal.themeSettings.floatingHeader.showMenu = false;

    // var $body = $("body"),
    // 	$html  = $("html"),
    var bodyTransparent = $body.hasClass("transparent"),
        phantomStickyExists = $(".phantom-sticky").exists(),
        sideHeaderExists = $(".side-header").exists(),
        sideHeaderHStrokeExists = $(".side-header-h-stroke").exists(),
        floatingNavigationBelowSliderExists = $(".floating-navigation-below-slider").exists();


    /* Floating navigation -> Style -> Sticky */

    if(dtLocal.themeSettings.floatingHeader.showMenu) {
        if((phantomStickyExists && !sideHeaderExists ) || (phantomStickyExists && sideHeaderHStrokeExists)){


            var $topBar = $(".top-bar"),
                topBarH = 0,
                stickyHeaderH = $(".masthead").height(),
                logoURL = $(".masthead:not(.side-header) .branding a").attr("href"),
                $stickyHeader = $(".masthead:not(.side-header)"),
                $stickyMenu = $stickyHeader.find(".header-bar"),
                $stickyLogo = $stickyHeader.find(".branding"),
                $topLine = $(".side-header-h-stroke"),
                topLineExists = $topLine.exists(),
                $headerSpace = $(".header-space"),
                $mainSlideshow = $("#main-slideshow, .photo-scroller"),
                $classHeaderExists = $(".classic-header").length > 0;
            if(!floatingNavigationBelowSliderExists) {
                if(!$classHeaderExists){
                    $("<div class='animate-sticky'></div>").prependTo($stickyMenu);
                }
            }
            var $animatedLine = $(".animate-sticky");

            if (topLineExists) {
                // No real header - only a top line
                stickyHeaderH = $topLine.height(),
                    $stickyHeader = $topLine;
            }

            // Append empty div for fixed header
            if (!$headerSpace.exists()) {
                $("<div class='header-space'></div>").insertBefore($stickyHeader);
                $headerSpace = $(".header-space");
            };

            if (topLineExists) {
                $headerSpace.addClass("top-line-space");
            };

            $headerSpace.css({
                height: stickyHeaderH
            });
            $animatedLine.css({
                height: $stickyMenu.height()
            });

            $body.addClass('sticky-off fixed-masthead');

            // Logo for sticky floating
            if(!$(".sticky-logo").length > 0) {
                if (dtLocal.themeSettings.floatingHeader.logo.html && dtLocal.themeSettings.floatingHeader.logo.showLogo) {
                    if (logoURL == undefined) {

                        //$('<img class="sticky-logo" src="'+dtLocal.themeSettings.floatingHeader.logo.src+'" height="'+dtLocal.themeSettings.floatingHeader.logo.h+'" width="'+dtLocal.themeSettings.floatingHeader.logo.w+'">').prependTo($stickyLogo);
                        $(dtLocal.themeSettings.floatingHeader.logo.html).addClass("sticky-logo").prependTo($stickyLogo)
                    }
                    else {
                        //$('<a class="sticky-logo" href="'+logoURL+'"><img src="'+dtLocal.themeSettings.floatingHeader.logo.src+'" height="'+dtLocal.themeSettings.floatingHeader.logo.h+'" width="'+dtLocal.themeSettings.floatingHeader.logo.w+'"></a>').prependTo($stickyLogo);
                        $('<a class="sticky-logo" href="'+logoURL+'">' + dtLocal.themeSettings.floatingHeader.logo.html +' </a>').prependTo($stickyLogo);
                    };
                };
            };
            var $stickyLogo = $(".phantom-custom-logo-on .sticky-logo"),
                $logo = $(".phantom-custom-logo-on").find(".branding > a:not(.sticky-logo), .branding > img:not(.sticky-logo)", $stickyHeader);


            var phantomAnimate = false,
                adminBarExists = $(".admin-bar").exists();

            if (adminBarExists) {
                var adminBarH = 32;
            }
            else {
                var adminBarH = 0;
            };

            if ($topBar.exists() && !$topBar.is( ":hidden" ) && !floatingNavigationBelowSliderExists) {
                topBarH = $topBar.innerHeight();
            };

            var stickyHeaderStartHeight = $stickyHeader.height();

            $window.on("scroll", function() {

                /*When sticky navigation should be shown*/
                var posScrollTop = dtGlobals.winScrollTop, //window scroll top position
                    sliderH,
                    showFloatingAfter;

                if (floatingNavigationBelowSliderExists && !bodyTransparent) {
                    sliderH = $mainSlideshow.height();
                    showFloatingAfter = posScrollTop > sliderH;
                }
                else if (floatingNavigationBelowSliderExists && bodyTransparent) {
                    sliderH = $mainSlideshow.height() - adminBarH - stickyHeaderStartHeight;// + dtLocal.themeSettings.floatingHeader.height;
                    showFloatingAfter = posScrollTop > sliderH;
                }
                else {
                    showFloatingAfter = posScrollTop > dtLocal.themeSettings.floatingHeader.showAfter;
                };

                if (showFloatingAfter && !phantomAnimate && !dtGlobals.mobileProcessed) {
                    phantomAnimate = true;

                    if (!floatingNavigationBelowSliderExists) {
                        $stickyHeader
                            .stop(true, true)
                            .velocity({
                                translateY : -topBarH,
                            }, 300);

                        $animatedLine.stop()
                            .velocity({
                                height : dtLocal.themeSettings.floatingHeader.height,
                            }, 300);


                        if (!bodyTransparent) {
                            $headerSpace.css({
                                height: stickyHeaderH// - topBarH
                            });
                        }
                        else {
                            $headerSpace.css({
                                display: "none",
                            });
                        };
                    }
                    else {
                        if (!bodyTransparent) {
                            $stickyHeader
                                .stop(true, true)
                                .velocity({
                                    translateY : -topBarH,
                                }, 300);
                            $animatedLine.stop()
                                .velocity({
                                    height : dtLocal.themeSettings.floatingHeader.height,
                                }, 300);

                            $headerSpace.css({
                                height: stickyHeaderH// - topBarH
                            });
                        }
                        else {
                            $stickyHeader
                                .velocity({
                                    translateY : ""
                                }, 0, function() {
                                    $stickyHeader.css({
                                        top: adminBarH,
                                        "transform": "",
                                        "-webkit-transform" : "",
                                    });
                                });
                            $animatedLine.stop()
                                .velocity({
                                    height : dtLocal.themeSettings.floatingHeader.height,
                                }, 300);
                            $headerSpace.css({
                                display: "none",
                            });
                        };
                    }
                    $body.removeClass('sticky-off').addClass('sticky-on');
                }
                else if (!showFloatingAfter && phantomAnimate && !dtGlobals.mobileProcessed) {
                    phantomAnimate = false;

                    if (!floatingNavigationBelowSliderExists) {

                        $stickyHeader
                        //	.stop(true, true)
                            .velocity({
                                translateY : 0,
                            }, 0);
                        if(!$html.hasClass("menu-open")){
                            $animatedLine.stop()
                                .velocity({
                                    height : stickyHeaderH,
                                }, 0);
                        }

                        if (!bodyTransparent) {
                            $headerSpace.css({
                                height: stickyHeaderH
                            });
                        }
                        else {
                            $headerSpace.css({
                                display: "none",
                            });
                        };
                    }
                    else {
                        if (!bodyTransparent) {
                            $stickyHeader
                                .stop(true, true)
                                .velocity({
                                    translateY : -topBarH,
                                }, 0);
                            if(!$html.hasClass("menu-open")){
                                $animatedLine.stop()
                                    .velocity({
                                        height : stickyHeaderH,
                                    }, 0);
                            }

                            $headerSpace.css({
                                height: stickyHeaderH// - topBarH
                            });
                        }
                        else {

                            if(!$html.hasClass("menu-open")){
                                $stickyHeader
                                    .css({
                                        bottom : "auto",
                                        top: "auto",
                                        "transform": "translateY(-100%)",
                                        "-webkit-transform" : "translateY(-100%)",
                                    });
                                $headerSpace.css({
                                    display: "none",
                                });

                            }
                        };
                    };
                    if(!$html.hasClass("menu-open")){
                        $body.removeClass('sticky-on').addClass('sticky-off');
                        $animatedLine.stop()
                            .velocity({
                                height : $stickyMenu.height(),
                            }, 0);
                    }
                }
                else if (dtGlobals.mobileProcessed) {
                    $stickyHeader
                        .css({
                            bottom : "auto",
                            top: "auto",
                            "transform": "",
                            "-webkit-transform" : "",
                        });
                    $headerSpace.css({
                        display: "none",
                    });
                    $body.removeClass('sticky-on').addClass('sticky-off');
                };
            });

        };
    };


    /* Floating navigation -> Style -> fade, Slide */

    if(dtLocal.themeSettings.floatingHeader.showMenu) {

        if ((dtLocal.themeSettings.floatingHeader.showMenu && !(sideHeaderExists && !phantomStickyExists)) || (dtLocal.themeSettings.floatingHeader.showMenu && (sideHeaderHStrokeExists && !phantomStickyExists ))) {

            var phantomFadeExists = $(".phantom-fade").exists(),
                phantomSlideExists = $(".phantom-slide").exists(),
                splitHeaderExists = $(".split-header").exists(),
                $mainSlideshow = $("#main-slideshow, .photo-scroller"),
                $mainHeader = $(".masthead:not(.side-header)");

            if( phantomFadeExists || phantomSlideExists) {

                var $headerMenu = $(".masthead:not(#phantom) .main-nav"),
                    logoURL = $(".masthead:not(.side-header) .branding a").attr("href"),
                    isMoved = false;

                if (sideHeaderHStrokeExists || splitHeaderExists) {
                    var $headerTopLine = $(".side-header-h-stroke, .split-header"),
                        headerClass = $headerTopLine.attr("class"),
                        $headerMenu = $(".side-header-h-stroke .header-bar, .split-header .header-bar"),
                        $parent = $headerMenu.parent(),
                        $phantom = $('<div id="phantom" class="'+headerClass+'"><div class="ph-wrap"></div></div>').appendTo("body"),
                        $menuBox = $phantom.find(".ph-wrap"),
                        $widgetBox = $phantom.find(".widget-box"),
                        $widget = $headerMenu.find(".mini-widgets"),
                        $phantomLogo = $headerTopLine.find(".branding");

                    /*Phantom logo*/

                    if($(".phantom-custom-logo-on").length > 0){

                        if (dtLocal.themeSettings.floatingHeader.logo.html && dtLocal.themeSettings.floatingHeader.logo.showLogo) {
                            if (logoURL == undefined){
                                $(dtLocal.themeSettings.floatingHeader.logo.html).prependTo($phantomLogo)
                            }
                            else {
                                $('<a class="phantom-top-line-logo" href="'+logoURL+'">' + dtLocal.themeSettings.floatingHeader.logo.html +' </a>').prependTo($phantomLogo);
                            };
                        };


                    };
                }
                else {
                    var headerClass = $(".masthead").attr("class"),
                        $parent = $headerMenu.parent(),
                        $phantom = $('<div id="phantom" class="'+headerClass+'"><div class="ph-wrap"><div class="logo-box"></div><div class="menu-box"></div><div class="widget-box"></div></div></div>').appendTo("body"),
                        $menuBox = $phantom.find(".menu-box"),
                        $widgetBox = $phantom.find(".widget-box");

                    if ($(".classic-header").length > 0) {
                        var $widget = $(".header-bar .navigation .mini-widgets");
                    }
                    else if (splitHeaderExists) {}
                    else {
                        var $widget = $(".header-bar .mini-widgets");
                    };

                    /*Phantom logo*/
                    if (dtLocal.themeSettings.floatingHeader.logo.html && dtLocal.themeSettings.floatingHeader.logo.showLogo) {
                        $phantom.find(".ph-wrap").addClass("with-logo");

                        if(logoURL == undefined){
                            $phantom.find(".logo-box").html(dtLocal.themeSettings.floatingHeader.logo.html);
                        }
                        else {
                            $phantom.find(".logo-box").html('<a href="'+logoURL+'">' + dtLocal.themeSettings.floatingHeader.logo.html +' </a>');
                        };
                    };


                };

                if ($page.hasClass("boxed")) {
                    $phantom.addClass("boxed").velocity({ translateX : "-50%" }, 0).find(".ph-wrap").addClass("boxed");
                }

                /* Hide floating on load */
                $body.removeClass('phantom-on').addClass('phantom-off');


                var phantomAnimate = false;

                var phantomTimeoutShow,
                    phantomTimeoutHide;

                if (phantomSlideExists) {
                    $phantom.velocity({
                        translateY : -$phantom.height(),
                    }, 0);
                };

                $window.on("scroll", function() {

                    var tempScrTop = dtGlobals.winScrollTop,
                        sliderH = $mainSlideshow.height(),
                        headerH = $mainHeader.height();

                    if (floatingNavigationBelowSliderExists && bodyTransparent) {
                        var showFloatingAfter = tempScrTop > sliderH && isMoved === false,
                            hideFloatingAfter = tempScrTop <= sliderH && isMoved === true;

                    }
                    else if (floatingNavigationBelowSliderExists) {
                        var showFloatingAfter = tempScrTop > (sliderH + headerH) && isMoved === false,
                            hideFloatingAfter = tempScrTop <= (sliderH + headerH) && isMoved === true;
                    }
                    else {
                        var showFloatingAfter = tempScrTop > dtLocal.themeSettings.floatingHeader.showAfter && isMoved === false,
                            hideFloatingAfter = tempScrTop <= dtLocal.themeSettings.floatingHeader.showAfter && isMoved === true;
                    };

                    if (showFloatingAfter) {
                        if(!$html.hasClass("menu-open")){

                            if( !dtGlobals.isHovering && !phantomAnimate ) {
                                phantomAnimate = true;

                                if (sideHeaderHStrokeExists || splitHeaderExists) {
                                    $headerMenu.appendTo($menuBox);
                                }
                                else {
                                    if (splitHeaderExists) {}
                                    else {
                                        $headerMenu.appendTo($menuBox);
                                        $widget.appendTo($widgetBox);
                                    };
                                };

                                if (phantomFadeExists) {
                                    $phantom
                                        .stop()
                                        .css({
                                            "visibility" : "visible"
                                        })
                                        .velocity({
                                            "opacity" : 1
                                        }, 350);
                                }
                                else if (phantomSlideExists) {
                                    $phantom
                                        .stop(true, true)
                                        .css({
                                            "visibility" : "visible"
                                        })
                                        // .velocity("stop")
                                        .velocity({
                                            translateY : 0,
                                            opacity : 1
                                        }, {
                                            duration: 400,
                                            //delay: 100
                                        });
                                };

                                $body.removeClass('phantom-off').addClass('phantom-on');

                                isMoved = true;
                            };
                            // }, 100);
                        }


                    }
                    else if (hideFloatingAfter) {

                        if(phantomAnimate) {

                            // phantomTimeoutHide = setTimeout(function() {
                            if(!$html.hasClass("menu-open")){
                                phantomAnimate = false;

                                if(sideHeaderHStrokeExists || splitHeaderExists) {
                                    $headerMenu.appendTo($parent);
                                }
                                else {
                                    if (splitHeaderExists) {
                                    }
                                    else {
                                        $headerMenu.appendTo($parent);
                                        $widget.appendTo($parent);
                                    };
                                };

                                $body.removeClass('phantom-on').addClass('phantom-off');


                                if (phantomFadeExists) {
                                    $phantom.stop().velocity({
                                        "opacity" : 0
                                    }, 120, function() {
                                        $phantom.css({
                                            "visibility": ""
                                        });
                                    });
                                }
                                else if (phantomSlideExists) {
                                    $phantom.velocity({
                                        opacity : 0
                                    }, 0, function() {
                                        $phantom
                                        //.stop(true, true)
                                            .css({
                                                "visibility": ""
                                            })
                                            .velocity({
                                                translateY : -$phantom.height(),
                                            }, 0);
                                    });
                                }

                                isMoved = false;
                                // }, 100);
                            }
                        }

                    };

                });
            };
        };
    };

// });


    /* #Filter
     ================================================== */
// jQuery(document).ready(function($) {

    /*!-categories filter*/
    $(".filter-categories > a").on("click", function(e) {
        var $this = $(this);

        if ( typeof arguments.callee.dtPreventD == 'undefined' ) {
            var $filter = $this.parents(".filter").first();

            if ( $filter.hasClass("without-isotope") ) {
                arguments.callee.dtPreventD = $filter.hasClass("with-ajax") ? true: false;
            } else {
                arguments.callee.dtPreventD = true;
            };
        };

        e.preventDefault();

        $this.trigger("mouseleave");

        if ($this.hasClass("act") && !$this.hasClass("show-all")) {
            e.stopImmediatePropagation();
            $this.removeClass("act");
            $this.siblings("a.show-all").trigger("click");//.addClass("act");
        } else {
            $this.siblings().removeClass("act");
            $this.addClass("act");

            if ( !arguments.callee.dtPreventD ) {
                window.location.href = $this.attr("href");
            }
        };
    });

    /*!- ordering*/
    $(".filter-extras .filter-switch").each(function(){
        var $_this = $(this);
        if($_this.prev('.act').length > 0){
            $_this.addClass('left-act');
        }else if($_this.next('.act').length > 0){
            $_this.addClass('right-act');
        }else{
            $_this.removeClass('right-act');
            $_this.removeClass('left-act');
        };
    });

    $(".filter-extras a").on("click", function(e) {
        var $this = $(this);

        if ( typeof arguments.callee.dtPreventD == 'undefined' ) {
            var $filter = $this.parents(".filter").first();

            if ( $filter.hasClass("without-isotope") ) {
                arguments.callee.dtPreventD = $filter.hasClass("with-ajax") ? true: false;
            } else {
                arguments.callee.dtPreventD = true;
            }
        };

        if ( arguments.callee.dtPreventD ) {
            e.preventDefault();
        };

        $this.siblings().removeClass("act");
        $this.addClass("act");

        $(".filter-extras .filter-switch").each(function(){
            var $_this = $(this);
            if($_this.prev($this).hasClass('act')){
                $_this.addClass('left-act');
                $_this.removeClass('right-act');
            }else if($_this.next($this).hasClass('act')){
                $_this.addClass('right-act');
                $_this.removeClass('left-act');
            }else{
                $_this.removeClass('right-act');
                $_this.removeClass('left-act');
            };
        });
    });

    $(".filter-extras .filter-switch").each(function(){
        var $this = $(this);
        var $filter = $this.parents(".filter").first();
        $this.on("click", function(){
            if ( $filter.hasClass("without-isotope") ) {
                if($this.hasClass("right-act")){
                    $this.prev("a")[0].click();
                }else if ($this.hasClass("left-act")){

                    $this.next("a")[0].click();
                };
            }else{
                if($this.hasClass("right-act")){
                    $this.prev("a").trigger("click");
                }else if ($this.hasClass("left-act")){
                    $this.next("a").trigger("click");
                };
            };
        });
    });

// });


    /* #One-page
     ================================================== */



// jQuery(document).ready(function($) {
    var $moveBody = $("html");

    /*Detect floating header*/
    if($(".phantom-sticky").length > 0){
        var $phantom = $(".masthead:not(.side-header):not(.side-header-v-stroke)"),
            $phantomVisibility = 1;
    }else{
        var $phantom = $("#phantom"),
            $phantomVisibility = $phantom.css("display")=="block";
    }


    // One page scrolling effect
    var phantomStickyExists = $(".phantom-sticky").exists(),
        sideHeaderExists = $(".side-header").exists(),
        sideHeaderHStrokeExists = $(".side-header-h-stroke").exists(),
        floatMenuH = 0;
    if ($(".mobile-header-bar").css('display') !== 'none') {
        var $headerBar = $(".mobile-header-bar");
        if($(".phantom-sticky").length > 0){
            if($(".sticky-header .masthead.side-header").length > 0 || $(".overlay-navigation .masthead.side-header").length > 0){
                var $phantom = $(".mobile-header-bar").parent(".masthead:not(.side-header)");
            }else{
                var $phantom = $(".mobile-header-bar").parent();
            }
        }
    }else{
        var $headerBar = $(".masthead:not(.side-header):not(.side-header-v-stroke) .header-bar");
    }

    /*Floating header height*/
    function set_sticky_header_height() {
        if(window.innerWidth < dtLocal.themeSettings.mobileHeader.firstSwitchPoint){
            if($(".sticky-mobile-header").length > 0){
                floatMenuH = $phantom.height();
            }else{
                floatMenuH = 0;
            }
        }else{
            if($phantom.css("display")=="block" || (phantomStickyExists && !sideHeaderExists ) || (phantomStickyExists && sideHeaderHStrokeExists)){
                floatMenuH = $phantom.height();
            }else{
                floatMenuH = 0;
            }
        }
    }
    set_sticky_header_height();



    /*Set cuurent item on load*/
    jQuery(window).load(function(){
        var locHash = window.location.hash;
        if(locHash.match("^#!")){
            var urlHash = locHash.substring(3);
        }
        // else if(locHash.match("^#")){
        // 	var urlHash = locHash.substring(1);
        // }else{
        // 	var urlHash = undefined;
        // }
        if( typeof urlHash != 'undefined' && urlHash.length > 0 ) {
            if(urlHash == "up") {
                $.closeMobileHeader();
                $moveBody.stop().velocity("scroll", {
                    offset: 0,
                    duration: 600,
                    mobileHA: false,
                    complete: function(elements) { $.closeSideHeader(); }
                });

            }else{
                setTimeout(function(){
                    $moveBody.stop().velocity("scroll", {
                        offset: $("#" + urlHash).offset().top - floatMenuH,
                        duration: 600,
                        mobileHA: false,
                        complete: function(elements) {
                            //	$.closeSideHeader();

                            if(window.innerWidth < dtLocal.themeSettings.mobileHeader.firstSwitchPoint){
                                if($(".sticky-mobile-header").length > 0){

                                    $moveBody.stop().velocity("scroll", {
                                        offset: $("#" + urlHash).offset().top - $phantom.height(),
                                        duration: 650,
                                        mobileHA: false
                                    });
                                }
                            }else{
                                if((phantomStickyExists && !sideHeaderExists ) || (phantomStickyExists && sideHeaderHStrokeExists )){


                                    $moveBody.stop().velocity("scroll", {
                                        offset: $("#" + urlHash).offset().top - $($headerBar, $phantom).height(),
                                        duration: 650,
                                        mobileHA: false
                                    });

                                }
                            }
                        }
                    });
                },300)
            }
            $('.menu-item a').parent("li").removeClass('act');
            $('.menu-item a[href="'+locHash+'"]').parent("li").addClass('act');
        }else {
            if(urlHash == 'undefined' && $( '.menu-item > a[href="#!/up"]' ).length > 0) {
                $( '.menu-item > a[href="#!/up"]' ).parent("li").addClass("act");
            }
        }
    });


    jQuery( window ).on('resize', function() {
        set_sticky_header_height();
    });


    var $anchors = $( '.stripe' ),
        $menus = $( '.menu-item > a[href^="#!"]' );

    /*!-scroll to anchor*/
    window.clickAnchorLink = function( $a, e ) {
        var url = $a.attr( 'href' ),
            hash = url,
            $target = url.substring(3),
            base_speed  = 600,
            speed       = base_speed;

        set_sticky_header_height();

        if ( typeof $target != 'undefined' && $target && $target.length > 0 ) {
            location.hash = url;
            if($("#" + $target).length > 0) {
                var top = $("#" + $target).offset().top + 1,
                    this_offset = $a.offset(),
                    that_offset = $("#" + $target).offset(),
                    offset_diff = Math.abs(that_offset.top - this_offset.top),
                    speed = 150 * Math.log(offset_diff^2/1000 + 1.02);
                //	speed = 3400 * Math.log(offset_diff/8253 + 1.02);


                $newScrollPosition = top - floatMenuH;


                // targetPos = Math.abs( dtGlobals.winScrollTop + that_offset.top - this_offset.top );

                //    distance = Math.abs( dtGlobals.winScrollTop - targetPos );
                //    speed = ( distance / 1000 ) * 1000;
            };



            if($target == "up") {
                if($body.hasClass("overlay-navigation")){
                    $.closeMobileHeader();
                    $.closeSideHeader();
                    $moveBody.stop().velocity("scroll", {
                        offset: top - floatMenuH,
                        duration: speed,
                        mobileHA: false
                    });
                }else{
                    $.closeMobileHeader();
                    $moveBody.stop().velocity("scroll", {
                        offset: 0,
                        duration: speed,
                        mobileHA: false,
                        complete: function(elements) { $.closeSideHeader(); }
                    });
                }
            }else {
                if($body.hasClass("overlay-navigation")){
                    $.closeMobileHeader();
                    $.closeSideHeader();
                    $moveBody.stop().velocity("scroll", {
                        offset: top - floatMenuH ,
                        duration: speed,
                        mobileHA: false,
                        complete: function(elements) {
                            if(window.innerWidth < dtLocal.themeSettings.mobileHeader.firstSwitchPoint){
                                if($(".sticky-mobile-header").length > 0){
                                    $newScrollPosition = ( top - $phantom.height() );

                                    $moveBody.stop().velocity("scroll", {
                                        offset: $newScrollPosition,
                                        duration: 650,
                                        mobileHA: false,
                                    });

                                }
                            }else{
                                if((phantomStickyExists && !sideHeaderExists ) || (phantomStickyExists && sideHeaderHStrokeExists )){

                                    $newScrollPosition = ( top - $($headerBar, $phantom).height() );

                                    $moveBody.stop().velocity("scroll", {
                                        offset: $newScrollPosition,
                                        duration: 650,
                                        mobileHA: false,
                                    });

                                }
                            }
                        }
                    });
                }else{
                    $.closeMobileHeader();
                    $moveBody.stop().velocity("scroll", {
                        offset: top - floatMenuH ,
                        duration: speed,
                        mobileHA: false,
                        complete: function(elements) {
                            $.closeSideHeader();

                            if(window.innerWidth < dtLocal.themeSettings.mobileHeader.firstSwitchPoint){
                                if($(".sticky-mobile-header").length > 0){
                                    $newScrollPosition = ( top - $phantom.height() );

                                    $moveBody.stop().velocity("scroll", {
                                        offset: $newScrollPosition,
                                        duration: 650,
                                        mobileHA: false,
                                    });
                                }
                            }else{
                                if((phantomStickyExists && !sideHeaderExists ) || (phantomStickyExists && sideHeaderHStrokeExists )){

                                    $newScrollPosition = ( top - $($headerBar, $phantom).height() );

                                    $moveBody.stop().velocity("scroll", {
                                        offset: $newScrollPosition,
                                        duration: 650,
                                        mobileHA: false,
                                    });

                                }
                            }


                        }
                    });
                }
            };

            $('.menu-item a').parent("li").removeClass('act');
            $a.parent("li").addClass('act');
            e.preventDefault();
            return false;
        };

    };

    $body.on( 'click', '.anchor-link[href^="#!"], .anchor-link a[href^="#!"], .logo-box a[href^="#!"], .branding a[href^="#!"], #branding-bottom a[href^="#!"]', function( e ) {
        clickAnchorLink( $( this ), e );
    });

    $menus.on( 'click', function( e ) {
        clickAnchorLink( $( this ), e );
    });


    /*!-set active menu item on scroll*/
    //console.log($('.vc_row').attr('id').length)
    if(($('.one-page-row div[data-anchor^="#"]').length > 0 || $('.vc_row[id]').length > 0) && $(".one-page-row").length > 0){
        $window.scroll(function (e) {
            var currentNode = null;
            if(!$body.hasClass("is-scroll")){
                var currentNode;
                // $('.one-page-row div[data-anchor^="#"]').each(function(){
                // 	var $_this = $(this),
                // 		activeSection = $_this,
                // 		currentId = $_this.attr('data-anchor');
                // 	if(dtGlobals.winScrollTop >= ($(".one-page-row div[data-anchor='" + currentId + "']").offset().top - $phantom.height() - 1)){
                // 		currentNode = "#!/" + currentId.substring(1);
                // 	};
                // 	console.log(currentNode)
                // });
                //for vc row id
                $('.one-page-row .vc_row[id], .one-page-row div[data-anchor^="#"]').each(function(){
                    var $_this = $(this),
                        activeSection = $_this,
                        currentId = $_this.attr('id');

                    if(dtGlobals.winScrollTop >= ($(".one-page-row div[id='" + currentId + "']").offset().top - $phantom.height() - 1)){
                        currentNode = "#!/" + currentId;
                    };
                });






                if($(".one-page-row div[data-anchor^='#']").length > 0){
                    if(dtGlobals.winScrollTop < ($(".one-page-row div[data-anchor^='#']").first().offset().top - $phantom.height())&& $( '.menu-item > a[href="#!/up"]' ).length > 0) {
                        $( '.menu-item > a[href="#!/up"]' ).parent("li").addClass("act");
                    };
                }else if( $('.vc_row[id]').length > 0){
                    //for vc row id
                    if(dtGlobals.winScrollTop < ($('.one-page-row .vc_row[id]').first().offset().top - $phantom.height())&& $( '.menu-item > a[href="#!/up"]' ).length > 0) {
                        $( '.menu-item > a[href="#!/up"]' ).parent("li").addClass("act");
                    };
                }
                $('.menu-item a[href^="#!"]').parent("li").removeClass('act');
                $('.menu-item a[href="'+currentNode+'"]').parent("li").addClass('act');


                if($('.menu-item a[href="#"]').length && currentNode == null){
                    $('.menu-item a[href="#"]').parent("li").addClass('act');
                }
            };
        });
    };
// })

    /* #Images Styling & Hovers
     ================================================== */
// jQuery(document).ready(function($) {

    /* !Append tag </i> to rolovers*/
    $.fn.addRollover = function() {
        return this.each(function() {
            var $this = $(this);
            if ($this.hasClass("this-ready")) {
                return;
            }

            $this.append("<i></i>");
            if($this.find(".rollover-thumbnails").length){
                $this.addClass("rollover-thumbnails-on");
            }
            if($this.parent().find(".links-container").length){
                $this.addClass("rollover-buttons-on");
            }

            $this.addClass("this-ready");
        });
    };
    $(".rollover, .rollover-video, .post-rollover, .rollover-project .show-content, .vc-item .vc-inner > a").addRollover();

    /* !- Grayscale */
    $(".filter-grayscale .slider-masonry").on("mouseenter tap", function(e) {
        if(e.type == "tap") {
            e.stopPropagation();
        };
        $(this).addClass("dt-hovered");
    });

    $(".filter-grayscale .slider-masonry").on("mouseleave", function(e) {
        $(this).removeClass("dt-hovered");
    });


    /* #Hover layouts
     ================================================== */

    /*!-Scale in hover*/
    $.fn.scaleInHover = function() {
        return this.each(function() {

            var $this = $(this);
            if ($this.hasClass("scale-ready")) {
                return;
            }
            var $img = $this.find("img.preload-me"),
                imgWidth = parseInt($img.attr('width')),
                imgHeight = parseInt($img.attr('height')),
                imgRatio = imgWidth/imgHeight;
            if(imgRatio < 2 && imgRatio >= 1.5){
                $this.addClass("ratio_3-2");
            }else if(imgRatio < 1.5 && imgRatio >= 1){
                $this.addClass("ratio_4-3");
            }else if(imgRatio < 1 && imgRatio >= 0.75){
                $this.addClass("ratio_3-4");
            }else if(imgRatio < 0.75 && imgRatio >= 0.6){
                $this.addClass("ratio_2-3");
            }else{
                $this.removeClass("ratio_2-3").removeClass("ratio_3-2").removeClass("ratio-2").removeClass("ratio_4-3").removeClass("ratio_3-4");
            };
            if(imgRatio >= 2){
                $this.addClass("ratio-2");
            };
            if(imgRatio == 1){
                $this.removeClass("ratio_2-3").removeClass("ratio-2").removeClass("ratio_3-2").removeClass("ratio_4-3").removeClass("ratio_3-4");
            };

            $this.addClass("scale-ready");
        });
    };
    $(".hover-scale .rollover-project").scaleInHover();
    /*TOUCH DEVICE*/
    /*!Description on hover show content on click(albums projects touch device)*/

    $.fn.touchNewHover = function() {
        return this.each(function() {
            var $this = $(this);
            if ($this.hasClass("this-ready")) {
                return;
            }

            if( $(".rollover-content", this).length > 0 || $(".woocom-rollover-content", this).length > 0){
                $body.on("touchend", function(e) {
                    $(".mobile-true .rollover-content, .mobile-true .rollover-project, .mobile-true .woocom-rollover-content, .mobile-true .woocom-project").removeClass("is-clicked");
                });

                $this.on("touchstart", function(e) {
                    origY = e.originalEvent.touches[0].pageY;
                    origX = e.originalEvent.touches[0].pageX;
                });
                $this.on("touchend", function(e) {
                    var touchEX = e.originalEvent.changedTouches[0].pageX,
                        touchEY = e.originalEvent.changedTouches[0].pageY;
                    if( origY == touchEY || origX == touchEX ){

                        if ($this.hasClass("is-clicked")) {
                            if($this.find(".dt-gallery-container").length > 0){
                                $this.find(".rollover-content").on("click.dtAlbums", function(e){
                                    $this.find(".rollover-content").off("click.dtAlbums");
                                    $(this).find("a.dt-gallery-mfp-popup, .dt-trigger-first-mfp, .dt-mfp-item").first().trigger('click');
                                });
                            }
                            if($(this).find(".rollover-click-target.go-to").length > 0){
                                window.location.href = $(this).find(".rollover-click-target.go-to").attr('href');
                            }else if($(this).hasClass("woocom-project")){
                                if ( $(e.target).is(".add_to_cart_button") ) {
                                    return true
                                }else{
                                    window.location.href = $(this).find(" > a").attr('href');
                                }
                            }
                        } else {

                            $('.links-container > a', $this).on('touchend', function(e) {
                                e.stopPropagation();
                                $this.addClass("is-clicked");
                            });
                            e.preventDefault();
                            $(".mobile-true .rollover-content, .mobile-true .rollover-project, .mobile-true .woocom-rollover-content, .mobile-true .woocom-project").removeClass("is-clicked");
                            $this.addClass("is-clicked");
                            $this.find(".rollover-content").addClass("is-clicked");
                            $this.find(".woocom-rollover-content").addClass("is-clicked");
                            return false;
                        };
                    };
                });
            };

            $this.addClass("this-ready");
        });
    };
    $(".mobile-true .rollover-project, .mobile-true .woocom-project").touchNewHover();

    /*Description on hover show content on click(albums projects touch device):end*/

    $(".hover-style-one article:not(.description-off) .rollover-project > a, .hover-style-two article:not(.description-off) .rollover-project > a, .mobile-true .cart-btn-on-img .buttons-on-img > a, .hover-style-three article:not(.description-off) .rollover-project > a").on("click", function(e){
        e.preventDefault();
    });
    $(".mobile-false .albums .rollover-content a:not(.portfolio-categories a), .mobile-false .media .rollover-content, .mobile-false .dt-gallery-container .rollover-content").on("click", function(e){
        if ( $(e.target).is("a") ) {return true};
        $(this).siblings("a.dt-single-mfp-popup, a.dt-gallery-mfp-popup, a.dt-mfp-item").first().click();
    });


    $.fn.touchWooHoverImage = function() {
        return this.each(function() {
            var $img = $(this);
            if ($img.hasClass("woo-ready")) {
                return;
            }

            $body.on("touchend", function(e) {
                $(".mobile-true .cart-btn-on-img .buttons-on-img").removeClass("is-clicked");
            });
            var $this = $(this);
            $this.on("touchstart", function(e) {
                origY = e.originalEvent.touches[0].pageY;
                origX = e.originalEvent.touches[0].pageX;
            });
            $this.on("touchend", function(e) {
                var touchEX = e.originalEvent.changedTouches[0].pageX,
                    touchEY = e.originalEvent.changedTouches[0].pageY;
                if( origY == touchEY || origX == touchEX ){
                    if ($this.hasClass("is-clicked")) {
                        if($(e.target).parent().hasClass("woo-buttons")){
                            $(e.target).trigger('click');
                        }else{
                            window.location.href = $this.find("a").first().attr("href");
                        }
                    } else {

                        // console.log($(e.target))
                        e.preventDefault();
                        $(".mobile-true .cart-btn-on-img .buttons-on-img").removeClass("is-clicked");
                        $this.addClass("is-clicked");
                        return false;
                    };
                };
            });

            $img.addClass("woo-ready");
        });
    };
    $(".mobile-true .cart-btn-on-img .buttons-on-img").touchWooHoverImage();




    /* #Comment form
     ================================================== */
// jQuery(document).ready(function($) {
    var $commentForm = $('#commentform');

    $commentForm.on('click', 'a.clear-form', function (e) {
        e.preventDefault();
        $commentForm.find('input[type="text"], textarea').val('');
        if($(".contact-form-material").length > 0){
            $commentForm.find('input[type="text"], textarea').parent().removeClass("is-focused");
        };
        return false;
    });

    $commentForm.on('click', ' a.dt-btn.dt-btn-m', function(e) {
        e.preventDefault();
        $commentForm.find('#submit').trigger('click');
        return false;
    });

    if ($.browser.msie) {
        $('input[type="text"][placeholder], textarea[placeholder]').each(function () {
            var obj = $(this);

            if (obj.attr('placeholder') != '') {
                obj.addClass('IePlaceHolder');

                if ($.trim(obj.val()) == '' && obj.attr('type') != 'password') {
                    obj.val(obj.attr('placeholder'));
                }
            }
        });

        $('.IePlaceHolder').focus(function () {
            var obj = $(this);
            if (obj.val() == obj.attr('placeholder')) {
                obj.val('');
            }
        });

        $('.IePlaceHolder').blur(function () {
            var obj = $(this);
            if ($.trim(obj.val()) == '') {
                obj.val(obj.attr('placeholder'));
            }
        });
    }

    if($(".contact-form-material").length > 0){
        /*!- Material design form*/

        $(".form-fields input, textarea, .comment-form-author input, .comment-form-email input").each(function(c){
            var $this = $(this),
                $parent = $this.parent("span, p"),
                $bigParent = $this.parents(".dt-form");

            $bigParent.find( '.clear-form' ).on( 'click' ,function( ) {
                $parent.removeClass("is-focused").removeClass("active");
            } );
            $this.focus(function() {
                $parent.addClass("is-focused").addClass("active");
                $this.attr('placeholder','');
            });

            $this.change(function() {
                if(0 !== $this.val().length){
                    $parent.addClass("is-focused").removeClass("active");
                    $this.attr('placeholder','');
                }
            });

            $this.blur(function() {
                $parent.removeClass("active");
                if('' === $this.val()){
                    $parent.removeClass("is-focused").removeClass("active");
                }
            });
        });
    }
// });


    /* #Fullwidth row for shortcodes & templates
     ================================================== */
// jQuery(document).ready(function($) {
    function fullWidthWrap(){
        if( $(".full-width-wrap").length > 0 ){
            $(".full-width-wrap").each(function(){
                var $_this = $(this),
                    windowInnerW = window.innerWidth,
                    windowW = $window.width(),
                    contentW = $('.content').width();

                var $offset_fs,
                    $width_fs;

                if ($('.boxed').length > 0) {
                    $offset_fs = ((parseInt($('#main').width()) - parseInt(contentW)) / 2);
                }
                else if ($('.side-header-v-stroke').length && windowInnerW > dtLocal.themeSettings.mobileHeader.firstSwitchPoint){
                    var $windowWidth = (windowInnerW <= parseInt(contentW)) ? parseInt(contentW) : (windowW - $('.side-header-v-stroke').width());
                    $offset_fs = Math.ceil( (($windowWidth - parseInt(contentW)) / 2) );
                }
                else if ($('.sticky-header .side-header').length && windowInnerW > dtLocal.themeSettings.mobileHeader.firstSwitchPoint){
                    var $windowWidth = (windowW <= parseInt(contentW)) ? parseInt(contentW) : windowW;
                    $offset_fs = Math.ceil( ((windowW - parseInt(contentW)) / 2) );
                }
                else if (($('.header-side-left').length && windowInnerW || $('.header-side-right').length && windowInnerW ) > dtLocal.themeSettings.mobileHeader.firstSwitchPoint){
                    var $windowWidth = (windowInnerW <= parseInt(contentW)) ? parseInt(contentW) : (windowW - $('.side-header').width());
                    $offset_fs = Math.ceil( (($windowWidth - parseInt(contentW)) / 2) );
                }
                else {
                    var $windowWidth = (windowW <= parseInt(contentW)) ? parseInt(contentW) : windowW;
                    $offset_fs = Math.ceil( ((windowW - parseInt(contentW)) / 2) );
                };

                if($('.sidebar-left').length > 0 || $('.sidebar-right').length > 0){
                    $width_fs = $(".content").width();
                    $offset_fs = 0;
                }else{
                    $width_fs = $("#main").innerWidth();
                }

                $_this.css({
                    width: $width_fs,
                    "margin-left": -$offset_fs,
                    "opacity": 1
                });
                $_this.find(".full-width-wrap").css({
                    width: "",
                    "margin-left": "",
                    "opacity": 1,
                    "padding-left": $offset_fs
                });
                $_this.find(".ts-wrap").each(function(){
                    var scroller = $(this).data("thePhotoSlider");
                    if(typeof scroller!= "undefined"){
                        scroller.update();
                    };
                });

            });
        };
    };

    if( $(".full-width-wrap").length > 0 ){
        if(dtGlobals.isiOS){
            $window.bind("orientationchange", function() {
                fullWidthWrap();
            }).trigger( "orientationchange" );
        }
        else {
            $window.on("resize", function(){
                fullWidthWrap();
            });
            fullWidthWrap();
        };
    };
    //Rewrite vc functions for row behavior (fix issue with vc full-with row and box layout/side header)
    window.vc_rowBehaviour = function() {
        function fullWidthRow() {
            var $elements = $('[data-vc-full-width="true"]');
            $.each($elements, function(key, item) {
                var $el = $(this);
                $el.addClass("vc_hidden");
                var $el_full = $el.next(".vc_row-full-width");
                $el_full.length || ($el_full = $el.parent().next(".vc_row-full-width"));
                var el_margin_left = parseInt($el.css("margin-left"), 10)
                    , el_margin_right = parseInt($el.css("margin-right"), 10)
                    , offset = 0 - $el_full.offset().left - el_margin_left
                    , width = $(window).width();


                var
                    windowInnerW = window.innerWidth,
                    windowW = $window.width(),
                    contentW = $('.content').width();

                var $offset_fs,
                    $width_fs;

                if ($('.boxed').length > 0) {
                    $offset_fs = ((parseInt($('#main').width()) - parseInt(contentW)) / 2);
                }
                else if ($('.side-header-v-stroke').length && windowInnerW > dtLocal.themeSettings.mobileHeader.firstSwitchPoint){
                    var $windowWidth = (windowInnerW <= parseInt(contentW)) ? parseInt(contentW) : (windowW - $('.side-header-v-stroke').width());
                    $offset_fs = Math.ceil( (($windowWidth - parseInt(contentW)) / 2) );
                }
                else if ($('.sticky-header .side-header').length && windowInnerW > dtLocal.themeSettings.mobileHeader.firstSwitchPoint){
                    var $windowWidth = (windowW <= parseInt(contentW)) ? parseInt(contentW) : windowW;
                    $offset_fs = Math.ceil( ((windowW - parseInt(contentW)) / 2) );
                }
                else if (($('.header-side-left').length && windowInnerW || $('.header-side-right').length && windowInnerW ) > dtLocal.themeSettings.mobileHeader.firstSwitchPoint){
                    var $windowWidth = (windowInnerW <= parseInt(contentW)) ? parseInt(contentW) : (windowW - $('.side-header').width());
                    $offset_fs = Math.ceil( (($windowWidth - parseInt(contentW)) / 2) );
                }
                else {
                    var $windowWidth = (windowW <= parseInt(contentW)) ? parseInt(contentW) : windowW;
                    $offset_fs = Math.ceil( ((windowW - parseInt(contentW)) / 2) );
                };

                if($('.sidebar-left').length > 0 || $('.sidebar-right').length > 0){
                    $width_fs = $(".content").width();
                    $offset_fs = 0;
                }else{
                    $width_fs = $("#main").innerWidth();
                }
                var offset = 0 - $offset_fs - el_margin_left


                if ($el.css({
                        position: "relative",
                        left: offset,
                        "box-sizing": "border-box",
                        width: $width_fs
                    }),
                        !$el.data("vcStretchContent")) {
                    var padding = -1 * offset;
                    0 > padding && (padding = 0);
                    var paddingRight = $width_fs - padding - $el_full.width() + el_margin_left + el_margin_right;
                    0 > paddingRight && (paddingRight = 0),
                        $el.css({
                            "padding-left": padding + "px",
                            "padding-right": paddingRight + "px"
                        })
                }
                $el.attr("data-vc-full-width-init", "true"),
                    $el.removeClass("vc_hidden")
            })
        }

        function parallaxRow() {
            var vcSkrollrOptions, callSkrollInit = !1;
            return window.vcParallaxSkroll && window.vcParallaxSkroll.destroy(),
                $(".vc_parallax-inner").remove(),
                $("[data-5p-top-bottom]").removeAttr("data-5p-top-bottom data-30p-top-bottom"),
                $("[data-vc-parallax]").each(function() {
                    var skrollrSpeed, skrollrSize, skrollrStart, skrollrEnd, $parallaxElement, parallaxImage, youtubeId;
                    callSkrollInit = !0,
                    "on" === $(this).data("vcParallaxOFade") && $(this).children().attr("data-5p-top-bottom", "opacity:0;").attr("data-30p-top-bottom", "opacity:1;"),
                        skrollrSize = 100 * $(this).data("vcParallax"),
                        $parallaxElement = $("<div />").addClass("vc_parallax-inner").appendTo($(this)),
                        $parallaxElement.height(skrollrSize + "%"),
                        parallaxImage = $(this).data("vcParallaxImage"),
                        youtubeId = vcExtractYoutubeId(parallaxImage),
                        youtubeId ? insertYoutubeVideoAsBackground($parallaxElement, youtubeId) : "undefined" != typeof parallaxImage && $parallaxElement.css("background-image", "url(" + parallaxImage + ")"),
                        skrollrSpeed = skrollrSize - 100,
                        skrollrStart = -skrollrSpeed,
                        skrollrEnd = 0,
                        $parallaxElement.attr("data-bottom-top", "top: " + skrollrStart + "%;").attr("data-top-bottom", "top: " + skrollrEnd + "%;")
                }),
                callSkrollInit && window.skrollr ? (vcSkrollrOptions = {
                    forceHeight: !1,
                    smoothScrolling: !1,
                    mobileCheck: function() {
                        return !1
                    }
                },
                    window.vcParallaxSkroll = skrollr.init(vcSkrollrOptions),
                    window.vcParallaxSkroll) : !1
        }
        function fullHeightRow() {
            $(".vc_row-o-full-height:first").each(function() {
                var $window, windowHeight, offsetTop, fullHeight;
                $window = $(window),
                    windowHeight = $window.height(),
                    offsetTop = $(this).offset().top,
                windowHeight > offsetTop && (fullHeight = 100 - offsetTop / (windowHeight / 100),
                    $(this).css("min-height", fullHeight + "vh"))
            })
        }
        function fixIeFlexbox() {
            var ua = window.navigator.userAgent
                , msie = ua.indexOf("MSIE ");
            (msie > 0 || navigator.userAgent.match(/Trident.*rv\:11\./)) && $(".vc_row-o-full-height").each(function() {
                "flex" === $(this).css("display") && $(this).wrap('<div class="vc_ie-flexbox-fixer"></div>')
            })
        }
        var $ = window.jQuery;
        $(window).off("resize.vcRowBehaviour").on("resize.vcRowBehaviour", fullWidthRow).on("resize.vcRowBehaviour", fullHeightRow),
            fullWidthRow(),
            fullHeightRow(),
            fixIeFlexbox(),
            vc_initVideoBackgrounds(),
            parallaxRow()

    }
    // vc_rowBehaviour()
// })


    $window.trigger("dt.removeLoading");
    /* #Misc
     ================================================== */

    /*--Prevent default dragstart event on images*/
    $("img").on("dragstart", function(event) { event.preventDefault(); });
    var $mainSlideshow = $("#main-slideshow");
    if(!$mainSlideshow.find("> div").length > 0){
        $mainSlideshow.addClass("empty-slider");
    };
    /*!-Revolution slider*/
    if ($(".rev_slider_wrapper").length > 0){

        //$("#main-slideshow").each(function(){
        //	var $this = $(this);
        if( $mainSlideshow.find("> .rev_slider_wrapper")){
            $mainSlideshow.addClass("fix rv-slider");
        };
        if ($(".rev_slider_wrapper").hasClass("fullscreen-container") || $(".rev_slider_wrapper").hasClass("fullwidthbanner-container")){
            $mainSlideshow.removeClass("fix");
        };
        //});
    };

    /* #Header elements
     ================================================== */

    /*!Shopping cart top bar*/
    var cartTimeoutShow,
        cartTimeoutHide;
    $(".shopping-cart.show-sub-cart").find(".buttons").first().clone(true).addClass("top-position").insertBefore(".shopping-cart-inner .cart_list");
    $(".shopping-cart.show-sub-cart").each(function(){
        var $this = $(this),
            $dropCart = $this.children('.shopping-cart-wrap');

        if(dtGlobals.isMobile || dtGlobals.isWindowsPhone){
            $this.find("> a").on("click", function(e) {
                if (!$(this).hasClass("dt-clicked")) {
                    e.preventDefault();
                    $(".shopping-cart").find(".dt-clicked").removeClass("dt-clicked");
                    $(this).addClass("dt-clicked");
                } else {
                    e.stopPropagation();
                }

            });
        };

        $this.on("mouseenter tap", function(e) {
            if(e.type == "tap") e.stopPropagation();

            $this.addClass("dt-hovered");
            if ($page.width() - ($dropCart.offset().left - $page.offset().left) - $dropCart.width() < 0) {
                $dropCart.addClass("right-overflow");
            };
            /*Bottom overflow menu*/
            if ($window.height() - ($dropCart.offset().top - dtGlobals.winScrollTop) - $dropCart.innerHeight() < 0) {
                $dropCart.addClass("bottom-overflow");
            };
            if($this.parents(".dt-mobile-header").length > 0) {
                $dropCart.css({
                    top: $this.position().top - 13 - $dropCart.height()
                });
            };
            /*move button to top if cart height is bigger then window*/
            if ($dropCart.height()  > ($window.height() - $dropCart.position().top)) {
                $dropCart.addClass("show-top-buttons");
            };

            /*hide search*/
            $(".searchform .submit", $header).removeClass("act");
            $(".mini-search").removeClass("act");
            //$(".mini-search .field", $header).fadeOut(100);
            $(".mini-search .field", $header).stop().animate({
                "opacity": 0
            }, 150, function() {
                $(this).css("visibility", "hidden");
            });

            clearTimeout(cartTimeoutShow);
            clearTimeout(cartTimeoutHide);

            cartTimeoutShow = setTimeout(function() {
                if($this.hasClass("dt-hovered")){
                    $dropCart.stop().css("visibility", "visible").animate({
                        "opacity": 1
                    }, 150);
                }
            }, 100);
        });

        $this.on("mouseleave", function(e) {
            var $this = $(this),
                $dropCart = $this.children('.shopping-cart-wrap');
            $this.removeClass("dt-hovered");

            clearTimeout(cartTimeoutShow);
            clearTimeout(cartTimeoutHide);

            cartTimeoutHide = setTimeout(function() {
                if(!$this.hasClass("dt-hovered")){
                    $dropCart.stop().animate({
                        "opacity": 0
                    }, 150, function() {
                        $(this).css("visibility", "hidden");
                    });
                    setTimeout(function() {
                        if(!$this.hasClass("dt-hovered")){
                            $dropCart.removeClass("right-overflow");
                            $dropCart.removeClass("bottom-overflow");
                            /*move button to top if cart height is bigger then window*/

                            $dropCart.removeClass("show-top-buttons");

                        }
                    }, 400);
                }
            }, 150);

        });
    });


    /*!-Search*/
    if($(".mini-search").length > 0){
        var $header = $(".masthead, .dt-mobile-header");

        $body.on("click", function(e){
            var target = $(e.target);
            if(!target.is(".mini-search .field", $header)) {
                $(".searchform .submit", $header).removeClass("act");
                $(".mini-search", $header).removeClass("act");
                //$(".mini-search .field", $header).fadeOut(100);
                $(".mini-search .field", $header).stop().animate({
                    "opacity": 0
                }, 150, function() {
                    $(this).css("visibility", "hidden");
                });
                setTimeout(function() {
                    $(".mini-search .field", $header).removeClass("right-overflow");
                    $(".mini-search .field", $header).removeClass("bottom-overflow");
                }, 400);
            }
        })
        $(".searchform .submit", $header).on("click", function(e){
            e.preventDefault();
            e.stopPropagation();
            var $_this = $(this);
            if($_this.hasClass("act")){
                $_this.removeClass("act");
                $_this.parents(".mini-search").removeClass("act");
                //$_this.siblings(".searchform-s").fadeOut(200);
                $_this.siblings(".searchform-s").stop().animate({
                    "opacity": 0
                }, 150, function() {
                    $(this).css("visibility", "hidden");
                });
                setTimeout(function() {
                    $_this.siblings(".searchform-s").removeClass("right-overflow");
                    $_this.siblings(".searchform-s").removeClass("bottom-overflow");
                }, 400);
            }else{
                $_this.addClass("act");
                $_this.parents(".mini-search").addClass("act");
                if($_this.parents(".dt-mobile-header").length > 0) {
                    $_this.siblings(".searchform-s").css({
                        top: $_this.parents(".mini-search").position().top  - $_this.siblings(".searchform-s").height() - 18
                    });

                }
                if ($page.width() - ($_this.siblings(".searchform-s").offset().left - $page.offset().left) - $_this.siblings(".searchform-s").width() < 0) {
                    $_this.siblings(".searchform-s").addClass("right-overflow");
                };

                /*Bottom overflow menu*/
                if ($window.height() - ($_this.siblings(".searchform-s").offset().top - dtGlobals.winScrollTop) - $_this.siblings(".searchform-s").innerHeight() < 0) {
                    $_this.siblings(".searchform-s").addClass("bottom-overflow");
                };
                $_this.siblings(".searchform-s").stop().css("visibility", "visible").animate({
                    "opacity": 1
                }, 150).focus();

                //$_this.siblings(".searchform-s").fadeIn(250);
            }
        });
    };


    /* #Shortcodes
     ================================================== */


    /*!-Before After*/
    $(".twentytwenty-container .preload-me").loaded(null, function() {
        $(".twentytwenty-container").each(function(){
            var $this = $(this),
                $thisOrient = $this.attr("data-orientation").length > 0 ? $this.attr("data-orientation") : 'horizontal',
                $pctOffset = (typeof $this.attr("data-offset") != 'undefined' && $this.attr("data-offset").length > 0) ? $this.attr("data-offset") : 0.5,
                $navigationType = $this.attr("data-navigation") ? true : false;
            $this.twentytwenty({
                default_offset_pct: $pctOffset,
                orientation: $thisOrient,
                navigation_follow: $navigationType
            });
        });
    }, true);

    /*!-Isotope fix for tabs*/
    if($('.wpb_tabs .iso-container').length > 0){
        var tabResizeTimeout;
        $('.wpb_tour_tabs_wrapper').each(function(){
            var $this = $(this),
                isoInside = $this.parents(".wpb_tabs").find(".iso-container");
            $this.tabs( {
                activate: function( event, ui ) {
                    isoInside.isotope("layout");
                }
            });
            $this.find("li").each(function(){
                $(this).on("click", function(){
                    clearTimeout(tabResizeTimeout);
                    $window.trigger( "debouncedresize" );
                    $(this).parents(".wpb_tabs").find(".iso-container").isotope("layout");
                });
            });
        });
    }
    /*!-tabs style four: click effect*/
    $(".tab-style-four .wpb_tabs_nav a").each(function(){
        var $this = $(this);
        $this.addClass("ripple");
        $this.ripple();
    });


    /* #Widgets
     ================================================== */


    // /*!Instagram style photos*/

    $.fn.calcPics = function() {
        var $collection = $(".instagram-photos");
        if ($collection.length < 1) return false;

        return this.each(function() {
            var maxitemwidth = maxitemwidth ? maxitemwidth : parseInt($(this).attr("data-image-max-width")),
                itemmarg = parseInt($(this).find("> a").css("margin-left"));
            $(this).find(" > a").css({
                "max-width": maxitemwidth,
                "opacity": 1
            });

            // Cahce everything
            var $container = $(this),
                containerwidth = $container.width(),
                itemperc = (100/(Math.ceil(containerwidth/maxitemwidth)));

            $container.find("a").css({ "width": itemperc+'%' });
        });
    };
    $(".instagram-photos").calcPics();

    /* !- Accordion Tooltip */
    // $(".st-accordion").dtAccordion({
    // 	open: 0,
    // 	oneOpenedItem: true
    // });

    $('.st-accordion').each(function(){
        var accordion = $(this);
        accordion.find('ul > li > a').on("click", function(e){
            e.preventDefault();
            var $this = $(this),
                $thisNext = $this.next();
            $(".st-content", accordion).not($thisNext).slideUp('fast');
            $thisNext.slideToggle('fast');
        });
    });
    simple_tooltip(".shortcode-tooltip","shortcode-tooltip-content");

    /*!-search widget*/
    $('.widget .searchform .submit').on('click', function(e) {
        e.preventDefault();
        $(this).siblings('input.searchsubmit').click();
        return false;
    });

    // !- Skills
    $.fn.animateSkills = function() {
        $(".skill-value", this).each(function () {
            var $this = $(this),
                $this_data = $this.data("width");

            $this.css({
                width: $this_data + '%'
            });
        });
    };
    $.fn.animateSkills = function() {
        $(".skill-value", this).each(function () {
            var $this = $(this),
                $this_data = $this.data("width");

            $this.css({
                width: $this_data + '%'
            });
        });
    };

    // !- Animation "onScroll" loop
    function doSkillsAnimation() {

        if(dtGlobals.isMobile){
            $(".skills").animateSkills();
        }
    };
    // !- Fire animation
    doSkillsAnimation();


    /* #Posts
     ================================================== */
    var socTimeoutShow,
        socTimeoutHide;

    /*!-Show share buttons*/
    $(".project-share-overlay.allways-visible-icons .share-button").on("click", function(e){
        e.preventDefault();
    });
    //Solve multiple window.onload conflict
    function addOnloadEvent(fnc){
        if ( typeof window.addEventListener != "undefined" )
            window.addEventListener( "load", fnc, false );
        else if ( typeof window.attachEvent != "undefined" ) {
            window.attachEvent( "onload", fnc );
        }
        else {
            if ( window.onload != null ) {
                var oldOnload = window.onload;
                window.onload = function ( e ) {
                    oldOnload( e );
                    window[fnc]();
                };
            }
            else
                window.onload = fnc;
        }
    }
    function showShareBut() {
        $(".album-share-overlay, .project-share-overlay:not(.allways-visible-icons)").each(function(){
            var $this = $(this);
            $this.find(".share-button").on("click", function(e){
                e.preventDefault();
            });

            $this.on("mouseover tap", function(e) {
                if(e.type == "tap") e.stopPropagation();

                var $this = $(this);
                $this.addClass("dt-hovered");

                clearTimeout(socTimeoutShow);
                clearTimeout(socTimeoutHide);

                socTimeoutShow = setTimeout(function() {
                    if($this.hasClass("dt-hovered")){
                        $this.find('.soc-ico a').css("display", "inline-block");
                        $this.find('.soc-ico').stop().css("visibility", "visible").animate({
                            "opacity": 1
                        }, 200);
                    }
                }, 100);
            });

            $this.on("mouseleave ", function(e) {
                var $this = $(this);
                $this.removeClass("dt-hovered");

                clearTimeout(socTimeoutShow);
                clearTimeout(socTimeoutHide);

                socTimeoutHide = setTimeout(function() {
                    if(!$this.hasClass("dt-hovered")){
                        $this.find('.soc-ico').stop().animate({
                            "opacity": 0
                        }, 150, function() {
                            $this.find('.soc-ico a').css("display", "none");
                            $(this).css("visibility", "hidden");
                        });
                    }
                }, 50);

            });
        });
    };
    addOnloadEvent(function(){ showShareBut() });

    /*!-Project floating content*/
    var $floatContent = $(".floating-content"),
        projectPost = $(".project-post");
    var $parentHeight,
        $floatContentHeight,
        phantomHeight = 0;

    //var $scrollHeight;

    function setFloatinProjectContent() {
        $(".project-slider .preload-me").loaded(null, function() {
            var $sidebar = $(".floating-content");
            if ($(".floating-content").length > 0) {
                var offset = $sidebar.offset();
                if($(".top-bar").length > 0 && $(".phantom-sticky").length > 0){
                    var topBarH = $(".top-bar").height();
                }else{
                    var topBarH = 0;
                }
                //$scrollHeight = $(".project-post").height();
                var $scrollOffset = $(".project-post").offset();
                //var $headerHeight = $phantom.height();
                $window.on("scroll", function () {
                    if (window.innerWidth > 1050) {
                        if (dtGlobals.winScrollTop + $phantom.height() > offset.top) {
                            if (dtGlobals.winScrollTop + $phantom.height() + $floatContentHeight + 40 < $scrollOffset.top + $parentHeight) {
                                $sidebar.stop().velocity({
                                    translateY : dtGlobals.winScrollTop - offset.top + $phantom.height() + 5 - topBarH
                                }, 300);
                            } else {
                                $sidebar.stop().velocity({
                                    translateY: $parentHeight - $floatContentHeight - 40 - topBarH
                                }, 300)
                            }
                        } else {
                            $sidebar.stop().velocity({
                                translateY: 0
                            }, 300)
                        }
                    } else {
                        $sidebar
                            .css({
                                "transform": "translateY(0)",
                                "-webkit-transform" : "translateY(0)",
                            });
                    }
                })
            }
        }, true);
    }
    setFloatinProjectContent();
    /* !Fancy header*/
    var fancyFeaderOverlap = $(".transparent #fancy-header").exists(),
        titleOverlap = $(".transparent .page-title").exists();


    $.fancyFeaderCalc = function() {
        $(".branding .preload-me").loaded(null, function() {
            if (fancyFeaderOverlap) {
                $(".transparent #fancy-header > .wf-wrap").css({
                    "padding-top" : $(".masthead:not(.side-header)").height()
                });
            };
            if (titleOverlap) {
                $(".transparent .page-title > .wf-wrap").css({
                    "padding-top" : $(".masthead:not(.side-header)").height()
                });
                $(".transparent .page-title").css("visibility", "visible");
            };
        }, true);
    };


    /*!-Paginator*/
    var $paginator = $('.paginator[role="navigation"]'),
        $dots = $paginator.find('a.dots');
    $dots.on('click', function() {
        $paginator.find('div:hidden').show().find('a').unwrap();
        $dots.remove();
    });

    // pin it
    $(".soc-ico a.pinit-marklet").click(function(event){
        event.preventDefault();
        $("#pinmarklet").remove();
        var e = document.createElement('script');
        e.setAttribute('type','text/javascript');
        e.setAttribute('charset','UTF-8');
        e.setAttribute('id','pinmarklet');
        e.setAttribute('async','async');
        e.setAttribute('defer','defer');
        e.setAttribute('src','//assets.pinterest.com/js/pinmarklet.js?r='+Math.random()*99999999);document.body.appendChild(e);
    });

    /*!-Scroll to Top*/
    $window.on("debouncedresize", function() {
        if(window.innerWidth  > dtLocal.themeSettings.mobileHeader.firstSwitchPoint) {
            if($(".masthead:not(.side-header):not(.mixed-header)").length > 0){
                dtGlobals.showTopBtn = $(".masthead:not(.side-header):not(.mixed-header)").height() + 150;
            }else if($(".masthead.side-header-h-stroke").length > 0){
                dtGlobals.showTopBtn = $(".side-header-h-stroke").height() + 150;
            }else{
                dtGlobals.showTopBtn = 500;
            }
        }else{
            if($(".masthead:not(.mixed-header)").length > 0){
                dtGlobals.showTopBtn = $(".masthead:not(.mixed-header)").height() + 150;
            }else if($(".masthead.mixed-header").length > 0){
                dtGlobals.showTopBtn = $(".mixed-header").height() + 150;
            }else{
                dtGlobals.showTopBtn = 500;
            }
        }
    });
    $window.scroll(function () {

        if (dtGlobals.winScrollTop > dtGlobals.showTopBtn) {
            $('.scroll-top').removeClass('off').addClass('on');
        }
        else {
            $('.scroll-top').removeClass('on').addClass('off');
        }
    });
    $(".scroll-top").click(function(e) {
        e.preventDefault();
        $("html, body").animate({ scrollTop: 0 }, "slow");
        return false;
    });



    /*!-Custom select*/

    // Create the dropdown base
    $("<select />").prependTo("#bottom-bar .mini-nav .menu-select");

    // Create default option "Select"
    $("<option />", {
        "selected"  :  "selected",
        "value"     :  "",
        "text"      :  "———"
    }).appendTo(".mini-nav .menu-select select");

    // Populate dropdown with menu items
    $("#bottom-bar .mini-nav").each(function() {
        var elPar = $(this),
            thisSelect = elPar.find("select");
        $("a", elPar).each(function() {
            var el = $(this);
            $("<option />", {
                "value"   : el.attr("href"),
                "text"    : el.text(),
                "data-level": el.attr("data-level")
            }).appendTo(thisSelect);
        });
    });

    $(".mini-nav select").change(function() {
        window.location = $(this).find("option:selected").val();
    });
    $(".mini-nav select option").each(function(){
        var $this = $(this),
            winHref = window.location.href;
        if($this.attr('value') == winHref){
            $this.attr('selected','selected');
        };
    })
    /*!-Appearance for custom select*/
    $('.woocommerce.widget_layered_nav select, .woocommerce-ordering-div select, #bottom-bar .mini-nav select, .widget_product_categories select').each(function(){
        $(this).customSelect();
    });
    $(".menu-select select, .mini-nav .customSelect1, .vc_pie_chart .vc_pie_wrapper").css("visibility", "visible");

    $(".mini-nav option").each(function(){
        var $this	= $(this),
            text	= $this.text(),

            prefix	= "";

        switch ( parseInt($this.attr("data-level"))) {
            case 1:
                prefix = "";
                break;
            case 2:
                prefix = "— ";
                break;
            case 3:
                prefix = "—— ";
                break;
            case 4:
                prefix = "——— ";
                break;
            case 5:
                prefix = "———— ";
                break;
        }
        $this.text(prefix+text);
    });

    /*!-Material click for menu and buttons*/
    var ua = navigator.userAgent,
        event = (ua.match(/iPhone/i)) ? "touchstart" : "click";

    $(".project-navigation a, .mobile-sticky-header-overlay").bind(event, function(e) {});
    $(".menu-material-style > li > a, .menu-material-style .sub-nav > ul > li > a, .menu-material-underline-style > li > a, .menu-material-underline-style .sub-nav > ul > li > a").each(function(){
        var $this = $(this);
        $this.addClass("ripple");
        $this.ripple();
    });

    $.fn.clickEffectPics = function() {

        return this.each(function() {
            $this = $(this);
            if($(".click-effect-on-img").length > 0){
                $this.addClass("material-click-effect");
            }
        });
    };
    $(".rollover, .post-rollover, .rollover-video").clickEffectPics();



    $(function(){
        $.fn.clickMaterialEffect = function() {
            return this.each(function() {
                var ink, d, x, y;
                var $this = $(this),
                    $this_timer = null,
                    $link_timer = null;
                if($this.find(".ink").length === 0){
                    $this.prepend("<span class='ink'></span>");
                }

                $this.addClass("ripplelink");

                ink = $this.find(".ink");
                ink.removeClass("animate");

                if(!ink.height() && !ink.width()){
                    d = Math.max($(this).outerWidth(), $this.outerHeight());
                    ink.css({height: d, width: d});
                }

                $this.bind( 'mousedown', function( e ) {
                    clearTimeout( $this_timer );
                    x = e.pageX - $this.offset().left - ink.width()/2;
                    y = e.pageY - $this.offset().top - ink.height()/2;

                    ink.css({top: y+'px', left: x+'px'}).addClass("animate");

                } );
                $this.bind( 'mouseup mouseleave', function( e ) {
                    clearTimeout( $link_timer );
                    clearTimeout( $this_timer );
                    $this._timer = setTimeout( function() {
                        ink.removeClass("animate");
                    },400)
                } );

            });
        };

        $(".rollover.material-click-effect, .post-rollover.material-click-effect, .rollover-video.material-click-effect").clickMaterialEffect();
    });
    /*!-Material design clickeffect*/
    if($(".small-portfolio-icons").length > 0){

        $('.links-container a').each(function(){
            var $this = $(this);
            $this.addClass("waves-effect");
        });
        Waves.displayEffect();
    }

    if($(".filter-style-material").length > 0){

        $(".filter-categories a, .paginator .page-links a").each(function(){
            var $this = $(this);
            $this.addClass("ripple");
            $this.ripple();
        });
        $(".filter-switch").append("<span class='filter-switch-toggle'></span>");

        $('.paginator .page-nav a').each(function(){
            var $this = $(this);
            $this.addClass("waves-effect");
        });
        Waves.displayEffect();

        //$(".filter-switch").append('<input class="tgl" type="checkbox">');
        if (Modernizr.touch) {
            $('.filter-switch').on('touchstart',function(e) {
                $('.filter-switch').removeClass("pressed")
                $(this).addClass('pressed');
            });
        } else {
            $('.filter-switch').on('mousedown',function(e) {
                $('.filter-switch').removeClass("pressed")
                $(this).addClass('pressed');
                setTimeout(function(){
                    $(this).removeClass('pressed');
                },600);
            });
        }
        $('.filter-switch .filter-switch-toggle').on('animationend webkitAnimationEnd oanimationend MSAnimationEnd', function(e) {
            $(this).parent().removeClass('pressed');
        });
        if (Modernizr.touch) {
            $('.filter-extras a').on('touchstart',function(e) {
                $('.filter-extras').removeClass("pressed")
                $(this).parent(".filter-extras").addClass('pressed');
            });
        } else {
            $('.filter-extras a').each(function(){
                $(this).on('mousedown',function(e) {
                    $('.filter-extras').removeClass("pressed")
                    $(this).addClass('pressed');
                    setTimeout(function(){
                        $(this).removeClass('pressed');
                    },600);
                });
            });
        }
        $('.filter-extras a').on('animationend webkitAnimationEnd oanimationend MSAnimationEnd', function(e) {
            $(this).removeClass('pressed');
        });


    };

    // Prevent a backgroung rendering glitch in Webkit.
    // if (!window.bgGlitchFixed && $.browser.webkit) {
    // 	setTimeout(function(){
    // 		$window.scrollTop(dtGlobals.winScrollTop + 1);
    // 		window.bgGlitchFixed = true;
    // 	},10)
    // }

    var waitForFinalEvent = (function () {
        var timers = {};
        return function (callback, ms, uniqueId) {
            if (!uniqueId) {
                uniqueId = "Don't call this twice without a uniqueId";
            }
            if (timers[uniqueId]) {
                clearTimeout (timers[uniqueId]);
            }
            timers[uniqueId] = setTimeout(callback, ms);
        };
    })();


    /* #Misc(desctop only)
     ================================================== */


    if(!dtGlobals.isMobile){
        //setTimeout(function(){
        /*!-parallax initialisation*/
        $('.stripe-parallax-bg, .fancy-parallax-bg, .page-title-parallax-bg').each(function(){
            var $_this = $(this),
                speed_prl = $_this.data("prlx-speed");
            $_this.parallax("50%", speed_prl);
            $_this.addClass("parallax-bg-done");
            $_this.css("opacity", "1")
        });
        //}, 600)


        /*!-Animate fancy header elements*/
        var j = -1;
        $("#fancy-header .fancy-title:not(.start-animation), #fancy-header .fancy-subtitle:not(.start-animation), #fancy-header .breadcrumbs:not(.start-animation)").each(function () {
            var $this = $(this);
            var animateTimeout;
            if (!$this.hasClass("start-animation") && !$this.hasClass("start-animation-done")) {
                $this.addClass("start-animation-done");
                j++;
                setTimeout(function () {
                    $this.addClass("start-animation");

                }, 300 * j);
            };
        });

        $("video.stripe-video-bg:in-viewport").each(function() {
            var $thisPar = $(this).parent(".stripe"),
                $video = $thisPar.find("video");

            if ( $video.length > 0 ) {
                $video.get(0).play();
            }
        });
        $window.on("scroll", function () {
            if($("video.stripe-video-bg").length > 0){
                $("video.stripe-video-bg").each(function(){
                    //var stripeVideo = $("video.stripe-video-bg");
                    // stripeVideo.each(function() {
                    var $video = $(this);

                    //if ( $video.length > 0 ) {

                    if ( $video.is(':in-viewport') ) {

                        $video.get(0).play();
                    } else {

                        $video.get(0).pause();
                    }
                    //}
                    //});
                })
            }
        });

    };

    /* #Footer
     ================================================== */

    /*!-Overlap Footer*/
    $(".footer-overlap .footer").css({
        'opacity': 1
    });

    /*Move side header out of page-inner (bug with sticky footer)*/
    if($(".page-inner").length > 0 && $(".side-header").length > 0 || $(".page-inner").length > 0 && $(".dt-mobile-header").length > 0){
        $(".side-header, .mixed-header, .dt-mobile-header, .dt-close-mobile-menu-icon").insertBefore(".page-inner");
    };

    /*Adding class if footer is empty*/
    if(!$(".footer .widget").length > 0) {
        $(".footer").addClass("empty-footer");
    };







    /* #Masonry
     ================================================== */
// jQuery(document).ready(function($) {
    // var $html = $("html"),
    // 	$body = $("body");
    // !- Calculate columns size
    $.fn.calculateColumns = function(minWidth, colNum, padding, switchD, switchTH, switchTV, switchP, mode) {
        return this.each(function() {
            var $container = $(this),
                containerWidth = $container.width() - 1,
                containerPadding = (padding !== false) ? padding : 20,
                containerID = $container.attr("data-cont-id"),
                tempCSS = "",
                first = false;

            if(typeof(minWidth)==='undefined') minWidth = 200;
            if(typeof(colNum)==='undefined') colNum = 6;


            for ( ; Math.floor(containerWidth/colNum) < minWidth; ) {
                colNum--;
                if (colNum <= 1) break;
            }

            if (!$("#col-style-id-"+containerID).exists()) {

                //if(!$html.hasClass("old-ie")){// IE
                var jsStyle = document.createElement("style");
                jsStyle.id = "col-style-id-"+containerID;
                jsStyle.appendChild(document.createTextNode(""));
                document.head.appendChild(jsStyle);

                //}
            } else {
                var jsStyle = document.getElementById("col-style-id-"+containerID);
            }


            var $style = $("#col-style-id-"+containerID);

            var singleWidth,
                doubleWidth,
                columnsNum,
                normalizedPadding,
                normalizedMargin,
                normalizedPaddingTop;

            if (containerPadding < 10) {
                normalizedPadding = 0;
                normalizedPaddingTop = 0;
            }
            else {
                normalizedPaddingTop = containerPadding - 5;
                normalizedPadding = containerPadding - 10;
            };
            if (containerPadding == 0) {
                normalizedMargin = 0;
            }
            else {
                normalizedMargin = -containerPadding;
            };


            if($container.hasClass("resize-by-browser-width")){


                if (Modernizr.mq('only screen and (max-width:767px)')) {
                    singleWidth = Math.floor(containerWidth / switchP)+"px";
                    doubleWidth = Math.floor(containerWidth  / switchP)*2+"px";
                    columnsNum = switchP;
                }else if(Modernizr.mq('(min-width:768px) and (max-width:991px)')){
                    singleWidth = Math.floor(containerWidth / switchTV)+"px";
                    doubleWidth = Math.floor(containerWidth  / switchTV)*2+"px";
                    columnsNum = switchTV;
                }else if(Modernizr.mq('(min-width:992px) and (max-width:1199px)')){
                    singleWidth = Math.floor(containerWidth / switchTH)+"px";
                    doubleWidth = Math.floor(containerWidth  / switchTH)*2+"px";
                    columnsNum = switchTH;
                }else {
                    singleWidth = Math.floor(containerWidth / switchD)+"px";
                    doubleWidth = Math.floor(containerWidth  / switchD)*2+"px";
                    columnsNum = switchD;
                }

            }else{
                if (mode == "px") {
                    singleWidth = Math.floor(containerWidth / colNum)+"px";
                    doubleWidth = Math.floor(containerWidth  / colNum)*2+"px";
                    columnsNum = colNum;
                }
                else {
                    singleWidth = Math.floor(100000 / colNum)/1000+"%";
                    doubleWidth = Math.floor(100000 / colNum)*2/1000+"%";
                };
            }

            if ( $(".cont-id-"+containerID+"").not(".bg-under-post").hasClass("description-under-image") ) {
                if (columnsNum > 1) {
                    tempCSS = " \
							.cont-id-"+containerID+" { margin: -"+normalizedPaddingTop+"px  -"+containerPadding+"px -"+normalizedPadding+"px ; } \
							.full-width-wrap .cont-id-"+containerID+" { margin: "+(-normalizedPaddingTop)+"px "+containerPadding+"px "+(-normalizedPadding)+"px ; } \
							.cont-id-"+containerID+" > .wf-cell { width: "+singleWidth+"; padding: "+normalizedPaddingTop +"px "+containerPadding+"px "+normalizedPadding+"px; } \
							.cont-id-"+containerID+" > .wf-cell.double-width { width: "+doubleWidth+"; } \
						";
                }
                else {
                    tempCSS = " \
							.cont-id-"+containerID+" { margin: -"+normalizedPaddingTop+"px  -"+normalizedPadding+"px -"+containerPadding+"px ; } \
							.full-width-wrap .cont-id-"+containerID+" { margin: "+(-normalizedPaddingTop)+"px "+containerPadding+"px "+(-normalizedPadding)+"px ; } \
							.cont-id-"+containerID+" > .wf-cell { width: "+singleWidth+"; padding: "+normalizedPaddingTop +"px "+normalizedPadding+"px "+containerPadding+"px; } \
						";
                };
            }else {
                if (columnsNum > 1) {
                    tempCSS = " \
							.cont-id-"+containerID+" { margin: -"+containerPadding+"px; } \
							.full-width-wrap .cont-id-"+containerID+" { margin: "+normalizedMargin+"px  "+containerPadding+"px; } \
							.cont-id-"+containerID+" > .wf-cell { width: "+singleWidth+";  padding: "+containerPadding+"px; } \
							.cont-id-"+containerID+" > .wf-cell.double-width { width: "+doubleWidth+"; } \
						";

                }
                else {
                    tempCSS = " \
							.cont-id-"+containerID+" { margin: -"+containerPadding+"px; } \
							.full-width-wrap .cont-id-"+containerID+" { margin: "+normalizedMargin+"px "+containerPadding+"px; } \
							.cont-id-"+containerID+" > .wf-cell { width: "+singleWidth+"; padding: "+containerPadding+"px; } \
						";
                };
            };

            //if(!$html.hasClass("old-ie") ){''
            $style.html(tempCSS);
            var newRuleID = jsStyle.sheet.cssRules.length;
            jsStyle.sheet.insertRule(".webkit-hack { }", newRuleID);
            jsStyle.sheet.deleteRule(newRuleID);

            //}

            $container.trigger("columnsReady");

        });
    };

    // !- Initialise slider
    $.fn.initSlider = function() {
        return this.each(function() {

            var $_this = $(this),
                attrW = $_this.data('width'),
                attrH = $_this.data('height');

            if ($_this.hasClass("royalReady")) {
                return;
            }

            $_this.postTypeScroller();

            $_this.addClass("royalReady");

        });
    };
    //disable isotope animation
    var positionFunc = Isotope.prototype._positionItem;
    Isotope.prototype._positionItem = function( item, x, y, isInstant ) {
        // ignore isInstant, pass in true;
        positionFunc(item, x, y, true);
    };
    $.fn.IsoLayzrInitialisation = function(container) {

        return this.each(function() {
            var $this = $(this);

            var layzrMsnr = new Layzr({
                container: container,
                selector: '.iso-lazy-load',
                attr: 'data-src',
                attrSrcSet: 'data-srcset',
                retinaAttr: 'data-src-retina',
                threshold: 30,
                before: function() {

                    // For fixed-size images with srcset; or have to be updated on window resize.
                    this.setAttribute("sizes", this.width+"px");
                },
                callback: function() {
                    this.classList.add("iso-layzr-loaded");
                    var $this =  $(this);
                    $this.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(e) {
                        setTimeout(function(){
                            $this.parent().removeClass("layzr-bg");
                        }, 200)
                    });
                }
            });
        });

    };

    /* !Containers of masonry and grid content */
    var	$isoCollection = $(".iso-container"),
        $gridCollection = $(".iso-grid:not(.jg-container, .iso-container), .blog.layout-grid .wf-container.description-under-image:not(.jg-container, .iso-container), .grid-masonry:not(.iso-container), .shortcode-blog-posts.iso-grid"),
        $combinedCollection = $isoCollection.add($gridCollection),
        $isoPreloader = dtGlobals.isoPreloader = $('<div class="iso-preloader pace pace-active"><div class="pace-activity"></div></div>').appendTo("body").hide();
    $combinedCollection.addClass("dt-isotope");

    /* !Smart responsive columns */
    if ($combinedCollection.exists()) {
        $combinedCollection.each(function(i) {
            var $container = $(this),
                contWidth = parseInt($container.attr("data-width")),
                contNum = parseInt($container.attr("data-columns")),
                desktopNum = parseInt($container.attr("data-desktop-columns-num")),
                tabletHNum = parseInt($container.attr("data-h-tablet-columns-num")),
                tabletVNum = parseInt($container.attr("data-v-tablet-columns-num")),
                phoneNum = parseInt($container.attr("data-phone-columns-num"));
            var contPadding = parseInt($container.attr("data-padding"));

            $container.addClass("cont-id-"+i).attr("data-cont-id", i);
            $container.calculateColumns(contWidth, contNum, contPadding, desktopNum, tabletHNum, tabletVNum, phoneNum, "px");
            if(contPadding > 10){
                $container.addClass("mobile-paddings");
            }

            $window.on("debouncedresize", function () {
                $container.calculateColumns(contWidth, contNum, contPadding, desktopNum, tabletHNum, tabletVNum, phoneNum, "px");

                if(contPadding > 10){
                    $container.addClass("mobile-paddings");
                }
            });
        });
    }


    if(!dtGlobals.isPhone){
        // !- Responsive height hack
        $.fn.heightHack = function() {
            //if(!$(".layzr-loading-on").length > 0){

            return this.each(function() {
                var $img = $(this);
                if ($img.hasClass("height-ready") || $img.parents(".post-rollover").exists() || $img.parents(".slider-masonry").exists()) {
                    return;
                }

                var	imgWidth = parseInt($img.attr('width')),
                    imgHeight = parseInt($img.attr('height')),
                    imgRatio = imgWidth/imgHeight;

                if($img.parents(".testimonial-vcard, .dt-format-gallery, .shortcode-blog-posts.iso-grid ").exists()) {
                    $img.wrap("<div />");
                };

                $img.parent().css({
                    "padding-bottom" : 100/imgRatio+"%",
                    "height" : 0,
                    "display" : "block"
                });

                $img.attr("data-ratio", imgRatio).addClass("height-ready");

            });
            //}
        };

        /* !Isotope initialization */
        $.fn.IsoInitialisation = function(item, mode, trans) {
            return this.each(function() {
                var $this = $(this);
                if ($this.hasClass("iso-item-ready")) {
                    return;
                }
                $this.isotope({
                    itemSelector : item,
                    //transformsEnabled: false,
                    //isResizeBound: false,
                    layoutMode : mode,
                    stagger: 30,
                    resize: false,
                    transitionDuration: 0,
                    hiddenStyle: {
                        opacity: 0
                    },
                    visibleStyle: {
                        opacity: 1
                    },
                    //isInitLayout: false,
                    /*animationEngine: typeOfAnimation,*/
                    masonry: { columnWidth: 1 },
                    getSortData : {
                        date : function( $elem ) {
                            return $($elem).attr('data-date');
                        },
                        name : function( $elem ) {
                            return $($elem).attr('data-name');
                        }
                    }
                });
                $this.addClass("iso-item-ready");

            });

        };



        /* !Masonry and grid layout */

        /* !Filter: */
        //var $container = $('.iso-container, .portfolio-grid');
        $('.iso-container, .portfolio-grid').each(function(){
            var $container = $(this);
            $('.filter:not(.iso-filter, .without-isotope, .with-ajax) .filter-categories a').on('click.presscorFilterCategories', function(e) {
                var selector = $(this).attr('data-filter');

                $container.isotope({ filter: selector });
                return false;
            });

            // !- filtering
            $('.filter:not(.iso-filter, .without-isotope, .with-ajax) .filter-extras .filter-by a').on('click', function(e) {
                var sorting = $(this).attr('data-by'),
                    sort = $(this).parents('.filter-extras').find('.filter-sorting > a.act').first().attr('data-sort');

                $container.isotope({ sortBy : sorting, sortAscending : 'asc' == sort });
                return false;
            });

            // !- sorting
            $('.filter:not(.iso-filter, .without-isotope, .with-ajax) .filter-extras .filter-sorting a').on('click', function(e) {
                var sort = $(this).attr('data-sort'),
                    sorting = $(this).parents('.filter-extras').find('.filter-by > a.act').first().attr('data-by');

                $container.isotope({ sortBy : sorting, sortAscending : 'asc' == sort });
                return false;
            });
        });


        /* !Masonry layout */
        if ($isoCollection.exists() || $gridCollection.exists() ) {

            // Show preloader
            $isoPreloader.fadeIn(50);

            $combinedCollection.each(function() {
                var $isoContainer = $(this);

                // Hack to make sure that masonry will correctly calculate columns with responsive images height.
                $(".preload-me", $isoContainer).heightHack();
                // Slider initialization
                $(".slider-masonry", $isoContainer).initSlider();


                // postsFilter.init(filterConfig);
                $isoContainer.one("columnsReady", function() {

                    //Call isotope
                    if($isoContainer.hasClass("iso-container")){
                        $isoContainer.IsoInitialisation('.iso-item', 'masonry', 400);
                    }else{
                        $isoContainer.IsoInitialisation('.wf-cell', 'fitRows', 400);
                    }

                    $isoContainer.isotope('on', 'layoutComplete', function (objArray){
                        //callback isotope on load ...
                        for(var i = 0; i < objArray.length; i++){
                            var obj = objArray[i];
                            var  $container = $(this);
                            $isoContainer.trigger("IsoReady");
                        }
                    });
                    /* !Call layzr on isotope layoutComplete */
                    $isoContainer.one("IsoReady", function() {

                        //$(".iso-lazy-load", $isoContainer).deleteLayzrHack();
                        $isoContainer.isotope("layout");

                        /*Init layzr*/
                        $isoContainer.IsoLayzrInitialisation();


                    });

                    // Recalculate everything on window resize
                    $window.on("columnsReady", function () {
                        if($(".slider-masonry", $isoContainer).hasClass("royalReady")){
                            $(".slider-masonry", $isoContainer).each(function(){
                                var scroller = $(this).parents(".ts-wrap").data("thePhotoSlider");
                                if(typeof scroller!= "undefined"){
                                    scroller.update();
                                };
                            });
                        }

                        $isoContainer.isotope("layout");


                    });

                });
            });

            // Hide preloader
            $isoPreloader.stop().fadeOut(300);


        };
    };

    /*!- Phone only*/
    if(dtGlobals.isPhone){
        $(".slider-masonry").initSlider();
        $window.on("columnsReady", function () {
            $(".slider-masonry").each(function(){
                var scroller = $(this).parents(".ts-wrap").data("thePhotoSlider");
                if(typeof scroller!= "undefined"){
                    scroller.update();
                };
            });
        });

        $(".filter-extras").css("display", "none");

        var $container = $(".filter").next('.iso-container, .portfolio-grid'),
            $items = $(".iso-item, .wf-cell", $container),
            selector = null;
        $(".mobile-true .iso-container, .mobile-true .iso-grid").IsoLayzrInitialisation();

        $(".filter-categories:not(.iso-filter) a").each(function(){
            $(this).on('click', function(e) {
                e.preventDefault();
                selector = $(this).attr('data-filter');
                $items.css("display", "none");
                $items.filter(selector).css("display", "inline-block");
                $(".mobile-true .slider-masonry").IsoLayzrInitialisation();
            });
        });

    };
// })

// jQuery(document).ready(function($) {
    /* !Debounced resize event */

    /*!Change filter appearance when too much categories*/

    function changeFilter(){
        $(".filter-categories").each(function(){
            var width = 0;
            $(".filter-categories a").each(function(){
                var $_this = $(this);
                if($(".style-ios").length > 0){
                    width += ($_this.innerWidth()-1);
                }else{
                    width += $_this.innerWidth();
                }
            });
            if( width > $(this).width() ){
                $(this).addClass("new-style")
            }else{
                $(this).removeClass("new-style")
            }
        });
    };
    changeFilter();

    $window.on("debouncedresize", function( event ) {
        dtGlobals.resizeCounter++;

        //Photos widget
        if ( $.isFunction($.fn.calcPics) ) {
            $(".instagram-photos").calcPics();
        }
        //Filter responsiveness
        changeFilter();
        $.mobileHeader();
        $.headerBelowSlider();

        /*Mobile header*/
        if(window.innerWidth >= dtLocal.themeSettings.mobileHeader.firstSwitchPoint){
            $page.removeClass("show-mobile-header");
            $page.addClass("closed-mobile-header");
            $body.removeClass("show-sticky-mobile-header");
            $body.removeClass("show-overlay-mobile-header").addClass("closed-overlay-mobile-header");
            $(".mobile-sticky-header-overlay").removeClass("active");
            $(".dt-mobile-menu-icon").removeClass("active");
            $html.removeClass("menu-open");
        }
        if(window.innerWidth <= dtLocal.themeSettings.mobileHeader.firstSwitchPoint){
            $('.masthead:not(.mixed-header):not(#phantom)').addClass("masthead-mobile");
        }else{
            $('.masthead:not(.mixed-header):not(#phantom)').removeClass("masthead-mobile");
        }
        //Custom select
        $('.mini-nav select').trigger('render');

        //Fancy headers
        $.fancyFeaderCalc();


        /*Detect first/last visible item microwidgets*/
        $(".mini-widgets, .mobile-mini-widgets").find(" > *").removeClass("first last");
        $(".mini-widgets, .mobile-mini-widgets").find(" > *:visible:first").addClass("first");
        $(".mini-widgets, .mobile-mini-widgets").find(" > *:visible:last").addClass("last");

        //Stripe Video bg
        $(".stripe-video-bg > video").each(function(){
            if($(".header-side-line").length > 0 && !$(".boxed").length > 0 ){
                var sideHW = $(".side-header-v-stroke").width();
            }else if(!$("body").hasClass("sticky-header") && !$("body").hasClass("overlay-navigation") && $(".side-header").length > 0){
                var sideHW = $(".side-header").width();
            }else{
                var sideHW = 0;
            }
            var stripePadL  = 2000 + sideHW,
                pageOfL  = stripePadL - $(".content").position().left - 22;

            var $_this = $(this),
                $this_h = $_this.height(),
                $pageW = $("#page").width();
            $_this.css({
                // "marginTop": -$this_h/2,
                left: pageOfL,
                width: $pageW
            });
        });

        //Set full height stripe
        $(".stripe, .dt-default").each(function(){
            var $_this = $(this),
                $_this_min_height = $_this.attr("data-min-height");
            if($.isNumeric($_this_min_height)){
                $_this.css({
                    "minHeight": $_this_min_height + "px"
                });
            }else if(!$_this_min_height){
                $_this.css({
                    "minHeight": 0
                });
            }else if($_this_min_height.search( '%' ) > 0){
                $_this.css({
                    "minHeight": $window.height() * (parseInt($_this_min_height)/100) + "px"
                });
            }else{
                $_this.css({
                    "minHeight": $_this_min_height
                });
            };
        });

        /*Floating content*/

        //$(".project-slider .preload-me").loaded(null, function() {
        $parentHeight = projectPost.height();
        $floatContentHeight = $floatContent.height();
        //}, true);

        // if ( $floatContent.length > 0 && window.innerWidth > 1050 ){
        // 	//$(".project-slider .preload-me").loaded(null, function() {
        // 		if ( (dtGlobals.winScrollTop + $phantom.height() + $floatContentHeight + 40) > (projectPost.offset().top + $parentHeight)) {
        // 			$floatContent.css({
        // 				top: $parentHeight - $floatContentHeight - 40
        // 			});
        // 		};
        // 	//}, true);
        // };
        //	setFloatinProjectContent();


        /* Sticky footer */

        $(".mobile-false .footer-overlap .page-inner").css({
            'min-height': window.innerHeight - $(".footer").innerHeight(),
            'margin-bottom': $(".footer").innerHeight()
        });

    }).trigger( "debouncedresize" );

    /*Custom resize function:end* })


     /* #AJAX
     ================================================== */
// jQuery(document).ready(function($) {

    $.fn.inView = function(){
        //Window Object
        var win = $(window);
        //Object to Check
        obj = $(this);
        //the top Scroll Position in the page
        var scrollPosition = win.scrollTop();
        //the end of the visible area in the page, starting from the scroll position
        var visibleArea = win.scrollTop() + win.height();
        //the end of the object to check
        var objEndPos = (obj.offset().top + 20);
        return(visibleArea >= objEndPos && scrollPosition <= objEndPos ? true : false);
    };

    // 4 Alla & Danil: we need to unify all ajax and masonry and other stuff in this manner:
    function loadingEffects() {
        //if(dtGlobals.isiPhone) return;

        var $isotope = $(".dt-isotope"),
            $grid = $(".iso-grid .wf-cell:not(.shown)");

        if ($grid.exists()) {
            precessEffects($grid);
        }

        if (!$isotope.exists()) {
            var $isoFallback = $(".iso-item:not(.shown)");

            if (!$isoFallback.exists()) return;
            precessEffects($isoFallback);
        }
        else {
            var t = 0;

            $isotope.each(function() {
                t++;
                var $atoms = $(this).find(".wf-cell");
                if (!$atoms.exists()) return;
                precessEffects($atoms, function(){});

            });
        };
    };

    function precessEffects($atoms, callback) {
        var k = 0;

        $atoms.each(function () {
            var $this = $(this);
            if($(".mobile-true").length > 0 || $this.parents(".loading-effect-none").length > 0){
                if (!$this.hasClass("shown") && !$this.hasClass("animation-triggered")) {
                    $this.addClass("animation-triggered");
                    setTimeout(function () {
                        if ($this.hasClass("animation-triggered")) {
                            $this.removeClass("animation-triggered").addClass("shown");
                        };
                    }, 200);
                };
            }else{
                if (!$this.hasClass("shown") && !$this.hasClass("animation-triggered") && $this.inView()) {
                    $this.addClass("animation-triggered");
                    k++;
                    setTimeout(function () {
                        if ($this.hasClass("animation-triggered")) {
                            $this.removeClass("animation-triggered").addClass("shown");
                        };
                    }, 100 * k);
                };


            }
            if (typeof callback == "function") {
                callback.call(this);
            }
        });

    };

    function resetEffects() {
        $(".iso-item.shown, .iso-grid .wf-cell.shown").removeClass("start-animation").removeClass("animation-triggered").removeClass("shown");
    };

    var dtAjaxing = {
        xhr: false,
        settings: false,
        lunch: function( settings ) {

            var ajaxObj = this;

            if ( settings ) {
                this.settings = settings;
            }

            if ( this.xhr ) {
                this.xhr.abort();
            }

            var action = 'presscore_template_ajax';

            this.xhr = $.post(
                settings.ajaxurl,
                {
                    action : action,
                    postID : settings.postID,
                    paged : settings.paged,
                    targetPage : settings.targetPage,
                    term : settings.term,
                    orderby : settings.orderBy,
                    order : settings.order,
                    nonce : settings.nonce,
                    visibleItems : settings.visibleItems,
                    contentType : settings.contentType,
                    pageData : settings.pageData,
                    sender : settings.sender
                },
                function( responce ) {

                    if ( responce.success ) {

                        var $responceItems = jQuery(responce.html),
                            $isoContainer = settings.targetContainer,

                            contWidth = parseInt($isoContainer.attr("data-width")),
                            contMaxWidth = parseInt($isoContainer.attr("data-max-width")),
                            contPadding = parseInt($isoContainer.attr("data-padding"));
                        isIsotope = 'grid' == settings.layout || 'masonry' == settings.layout,
                            itemsToDeleteLength = 0,
                            trashItems = new Array(),
                            sortBy = responce.orderby.replace('title', 'name'),
                            sortAscending = ('asc' == responce.order.toString());

                        if ( dtGlobals.isPhone ) {
                            isIsotope = false;
                        }

                        if ( responce.newNonce ) {
                            dtLocal.ajaxNonce = responce.newNonce;
                        }

                        if ( typeof responce.itemsToDelete != 'undefined' ) {
                            itemsToDeleteLength = responce.itemsToDelete.length;
                        }

                        // if not mobile isotope with spare parts
                        if ( isIsotope && itemsToDeleteLength > 0 ) {

                            for( var i = 0; i < responce.itemsToDelete.length; i++ ) {
                                trashItems.push('.wf-cell[data-post-id="' + responce.itemsToDelete[i] + '"]');
                            }

                            $isoContainer.isotope('remove', $isoContainer.find(trashItems.join(',')));

                            // if mobile or not isotope and sender is filter or paginator
                        } else if ( !isIsotope && ('filter' == settings.sender || 'paginator' == settings.sender) ) {

                            $isoContainer.find('.wf-cell, article').remove();
                        }

                        if ( $responceItems.length > 0 ) {

                            // append new items
                            $isoContainer.append($responceItems);
                            dtGlobals.ajaxContainerItems = $isoContainer.find('div.wf-cell, .project-even, .project-odd').not('.animation-triggered');

                            // for isotope - insert new elements
                            if ( isIsotope ) {

                                $(".preload-me", $isoContainer).heightHack();
                                $(".slider-masonry", $isoContainer).initSlider();
                                $(".slider-masonry", $isoContainer).css("visibility", "visible");


                                $isoContainer.isotope('addItems', $responceItems);

                                if ( 'media' != settings.contentType ) {
                                    $isoContainer.isotope({ sortBy : sortBy, sortAscending : sortAscending });
                                } else {
                                    $isoContainer.isotope({ sortBy: 'original-order' });
                                }

                                $isoContainer.isotope("layout");

                                ajaxObj.init();


                                $isoContainer.layzrInitialisation();

                                $isoContainer.IsoLayzrInitialisation();

                                // all other cases - append new elements
                            } else {

                                // mobile isotope filtering emulation
                                if ( dtGlobals.isPhone && ('masonry' == settings.layout || 'grid' == settings.layout) ) {}

                                $(".slider-masonry", $isoContainer).initSlider();
                                $("ul.photoSlider:not(.slider-masonry)").each(function(){
                                    $(this).postTypeScroller();
                                });
                                $("ul.photoSlider").css("visibility", "visible");

                                if ( 'jgrid' == settings.layout ) {
                                    $isoContainer.collagePlus(dtGlobals.jGrid);
                                }

                                ajaxObj.init();

                                $isoContainer.layzrInitialisation();
                                $isoContainer.IsoLayzrInitialisation(".mobile-true");

                            }

                            if ( typeof settings.afterSuccessInit != 'undefined' ) {
                                settings.afterSuccessInit( responce );
                            }

                            $window.trigger('dt.ajax.content.appended');

                        } else if ( isIsotope ) {

                            // if no responce items - reorder isotope
                            $isoContainer.isotope({ sortBy : sortBy, sortAscending : sortAscending });
                        }

                    }

                    if ( typeof settings.afterResponce != 'undefined' ) {
                        settings.afterResponce( responce );
                    }

                    loadingEffects();

                    /* By Raymond */
                    $(".links-container a").hoverLinks();

                },'json' /* By Raymond */
            );
        },
        init : function() {
            switch ( this.settings.contentType ) {
                case 'portfolio' :
                    this.initPortfolio();
                    break;

                case 'albums' :
                    this.initAlbums();
                    break;

                case 'media' :
                    this.initMedia();
                    break;

                case 'blog':
                    this.basicInit();
                    break;
                case 'testimonials':
                    this.basicInit();
                    break;
            }
        },
        initPortfolio : function() {
            this.basicInit();
        },
        initAlbums : function() {
            this.basicInit();
        },
        initMedia : function() {
            this.basicInit();

            $(".mobile-false .albums .rollover-content, .mobile-false .media .rollover-content").on("click", function(e){
                if ( $(e.target).is("a") ) {
                    return true;
                }
                $(this).siblings("a.dt-single-mfp-popup, a.dt-gallery-mfp-popup, a.dt-mfp-item").first().click();
            });

        },
        basicInit : function() {
            //retinizer();

            var $container = this.settings.targetContainer;

            $('.dt-gallery-mfp-popup', $container).not('.mfp-ready').on('click', function(){
                var $this = $(this),
                    $container = $this.parents('article.post');

                if ( $container.length > 0 ) {
                    var $target = $container.find('.dt-gallery-container a.dt-mfp-item');

                    if ( $target.length > 0 ) {
                        $target.first().trigger('click');
                    }
                }

                return false;
            }).addClass('mfp-ready');

            // trigger click on first a.dt-mfp-item in the container
            $('.dt-trigger-first-mfp', $container).not('.mfp-ready').on('click', function(){
                var $this = $(this),
                    $container = $this.parents('article.post');

                if ( $container.length > 0 ) {
                    var $target = $container.find('a.dt-mfp-item');

                    if ( $target.length > 0 ) {
                        $target.first().trigger('click');
                    }
                }

                return false;
            }).addClass('mfp-ready');

            // single opup
            $('.dt-single-image', $container).not('.mfp-ready').magnificPopup({
                type: 'image'
            }).addClass('mfp-ready');

            $('.dt-single-video', $container).not('.mfp-ready').magnificPopup({
                type: 'iframe'
            }).addClass('mfp-ready');

            $('.dt-single-mfp-popup', $container).not('.mfp-ready').magnificPopup({
                type: 'image'
            }).addClass('mfp-ready');


            $(".dt-gallery-container", $container).not('.mfp-ready').each(function(){
                $(this).addClass('mfp-ready').magnificPopup( $.extend( {}, dtGlobals.magnificPopupBaseConfig, {
                    delegate: 'a.dt-mfp-item',
                    gallery: {
                        enabled: true,
                        navigateByImgClick: true,
                        preload: [0,1] // Will preload 0 - before current, and 1 after the current image
                    }
                }));
            });

            $(".rollover, .rollover-video, .post-rollover, .rollover-project .show-content", $container).addRollover();
            if ( $.isFunction($.fn.hoverdir) ) {
                $('.mobile-false .hover-grid .rollover-project').each( function() { $(this).hoverdir(); } );

                $('.mobile-false .hover-grid-reverse .rollover-project ').each( function() { $(this).hoverdir({
                    inverse : true
                }); } );
            }
            $(".mobile-true .rollover-project a.link.show-content, .hover-style-one article:not(.description-off) .rollover-project > a, .hover-style-two article:not(.description-off) .rollover-project > a, .hover-style-three article:not(.description-off) .rollover-project > a").on("click", function(e){
                e.preventDefault();
            });
            $(".rollover, .post-rollover, .rollover-video").clickEffectPics();
            $(".rollover.material-click-effect, .post-rollover.material-click-effect, .rollover-video.material-click-effect").clickMaterialEffect();

            if($(".small-portfolio-icons").length > 0){

                $('.links-container a').each(function(){
                    var $this = $(this);
                    $this.addClass("waves-effect");
                });
                Waves.displayEffect();
            }


            $(".mobile-true .rollover-project").touchNewHover();
            if ( $.isFunction($.fn.triggerHoverClick) ) {
                // $(".touch .links-container > a").touchHoverLinks();
                $(".mobile-false .rollover-project:not(.rollover-active) .rollover-content, .buttons-on-img:not(.rollover-active) .rollover-content").triggerHoverClick();
            }
            if ( $.isFunction($.fn.triggerHoverClick) ) {
                $(".mobile-false .rollover-project.forward-post").triggerHoverClick();
            }
            if ( $.isFunction($.fn.triggerHoverClick) ) {
                $(".mobile-false .rollover-project.rollover-active, .mobile-false .buttons-on-img.rollover-active").followCurentLink();
            }
            if ( $.isFunction($.fn.triggerAlbumsClick) ) {
                $(".albums .rollover-project, .albums .buttons-on-img, .archive .type-dt_gallery .buttons-on-img").triggerAlbumsClick();
            }
            if ( $.isFunction($.fn.touchforwardToPost) ) {
                $(".mobile-true .rollover-project.forward-post").touchforwardToPost();
            }
            if ( $.isFunction($.fn.touchHoverImage) ) {
                $(".mobile-true .buttons-on-img").touchHoverImage();
            }

            $(".hover-scale .rollover-project").scaleInHover();
            if ( $.isFunction($.fn.hoverLinks) ) {
                $(".links-container a").hoverLinks();
            }
            if($(".style-material-design").length > 0) {
                $('.links-container a, .paginator .page-nav a').each(function(){
                    var $this = $(this);
                    $this.addClass("waves-effect");
                });
                Waves.displayEffect();
            }

        }
    };

    // get ajax data
    function dtGetAjaxData( $parentContainer ) {
        var	$filtersContainer = $parentContainer.find('.filter.with-ajax').first(),
            $itemsContainer = $parentContainer.find('.wf-container.with-ajax, .articles-list.with-ajax').first(),
            $currentCategory = $filtersContainer.find('.filter-categories a.act'),
            $currentOrderBy = $filtersContainer.find('.filter-by a.act'),
            $currentOrder = $filtersContainer.find('.filter-sorting a.act'),
            paged = parseInt($itemsContainer.attr('data-cur-page')),
            nonce = null,
            visibleItems = new Array(),
            term = ( $currentCategory.length > 0 ) ? $currentCategory.attr('data-filter').replace('.category-', '').replace('*', '') : '';

        if ( '0' == term ) {
            term = 'none';
        }

        if ( $itemsContainer.hasClass('dt-isotope') ) {

            $('.wf-cell', $itemsContainer).each( function(){
                visibleItems.push( $(this).attr('data-post-id') );
            });
        }

        return {
            visibleItems : visibleItems,
            postID : dtLocal.postID,
            paged : paged,
            term : term,
            orderBy : ( $currentOrderBy.length > 0 ) ? $currentOrderBy.attr('data-by') : '',
            order : ( $currentOrder.length > 0 ) ? $currentOrder.attr('data-sort') : '',
            ajaxurl : dtLocal.ajaxurl,
            nonce : dtLocal.ajaxNonce,
            pageData : dtLocal.pageData,
            layout : dtLocal.pageData.layout,
            targetContainer : $itemsContainer,
            isPhone : dtGlobals.isPhone
        }
    }

    // paginator
    $('#content').on('click', '.paginator.with-ajax a', function(e){
        e.preventDefault();

        //resetEffects();

        if ( $(e.target).hasClass('dots') || $(e.target).hasClass('disabled') ) {
            return;
        }

        var $this = $(this),
            $paginatorContainer = $this.closest('.paginator'),
            $parentContainer = $paginatorContainer.parent(),
            $itemsContainer = $parentContainer.find('.wf-container.with-ajax, .articles-list.with-ajax').first(),

            $loadMoreButton = $(".button-load-more"),
            loadMoreButtonCaption = $loadMoreButton.find('.button-caption').text(),

            paginatorType = $paginatorContainer.hasClass('paginator-more-button') ? 'more' : 'paginator',
            isMore = ('more' == paginatorType),

            ajaxData = dtGetAjaxData($parentContainer),
            targetPage = isMore ? ajaxData.paged + 1 : $this.attr('data-page-num'),
            isoPreloaderExists = dtGlobals.isoPreloader;


        $loadMoreButton.addClass("animate-load").find('.button-caption').text(dtLocal.moreButtonText.loading);

        // show preloader
        if ( isoPreloaderExists && !$(".paginator-more-button").length ) {
            dtGlobals.isoPreloader.fadeIn(50);
        }

        if ( !isMore ) {
            var $scrollTo = $parentContainer.find('.filter.with-ajax').first(),
                paddingTop = 44;

            if (!$scrollTo.exists()) {
                $scrollTo = $itemsContainer;
                paddingTop = 50;
            }

            // scroll to top
            $("html, body").animate({
                scrollTop: $scrollTo.offset().top - $("#phantom").height() - paddingTop
            }, 400);
        }else{
            $("html, body").scrollTop($window.scrollTop() + 1);
        }

        // lunch ajax
        dtAjaxing.lunch($.extend({}, ajaxData, {
            contentType : ajaxData.pageData.template,
            targetPage : targetPage,
            sender : paginatorType,
            visibleItems : isMore ? new Array() : ajaxData.visibleItems,
            afterResponce : function( responce ) {

                // we have paginator
                if ( $paginatorContainer.length > 0 ) {

                    if ( responce.paginationHtml ) {

                        // update paginator with responce content
                        $paginatorContainer.html($(responce.paginationHtml).html()).show();
                        if($(".filter-style-material").length > 0){
                            $(".paginator .page-links a").each(function(){
                                var $this = $(this);
                                $this.addClass("ripple");
                            });
                            $( '.page-links a.ripple' ).ripple();

                            $('.paginator .page-nav a').each(function(){
                                var $this = $(this);
                                $this.addClass("waves-effect");
                            });
                            Waves.displayEffect();
                        }

                    } else {

                        if ( false && isMore ) {
                            $paginatorContainer.html('<span class="loading-ready">' + dtLocal.moreButtonAllLoadedText + '</span>');
                        } else {
                            // clear paginator and hide it
                            $paginatorContainer.html('').hide();
                        }
                    }
                    setTimeout (function(){
                        $(".button-load-more").removeClass("animate-load").find('.button-caption').text(loadMoreButtonCaption);
                    }, 200);

                } else if ( responce.paginationHtml ) {

                    // if there are no paginator on page but ajax responce have it
                    $itemsContainer.parent().append($(responce.paginationHtml));
                }


                // add dots onclick event handler
                $paginatorContainer.find('.dots').on('click', function() {
                    $paginatorContainer.find('div:hidden').show().find('a').unwrap();
                    $(this).remove();
                });

                // update current page field
                $itemsContainer.attr('data-cur-page', responce.currentPage);

                // hide preloader
                dtGlobals.isoPreloader.stop().fadeOut(300);

                // update load more button
                dtGlobals.loadMoreButton = $(".button-load-more");
            }
        }));
    });

    // filter
    $('.filter.with-ajax .filter-categories a, .filter.with-ajax .filter-extras a').on('click', function(e){
        e.preventDefault();

        resetEffects();

        var $this = $(this),
            $filterContainer = $this.closest('.filter'),
            $parentContainer = $filterContainer.parent(),
            $itemsContainer = $parentContainer.find('.wf-container.with-ajax').first(),
            $paginatorContainer = $parentContainer.find('.paginator').first(),

            ajaxData = dtGetAjaxData($parentContainer),
            isoPreloaderExists = dtGlobals.isoPreloader;

        // show preloader
        if ( isoPreloaderExists ) {
            dtGlobals.isoPreloader.fadeIn(50);
        }

        // lunch ajax
        dtAjaxing.lunch($.extend({}, ajaxData, {
            contentType : ajaxData.pageData.template,
            targetPage : 1,
            paged : 1,
            sender : 'filter',
            afterResponce : function( responce ) {

                // we have paginator
                if ( $paginatorContainer.length > 0 ) {

                    if ( responce.paginationHtml ) {

                        // update paginator with responce content
                        $paginatorContainer.html($(responce.paginationHtml).html()).show();
                    } else {

                        // clear paginator and hide it
                        $paginatorContainer.html('').hide();
                    }

                } else if ( responce.paginationHtml ) {

                    // if there are no paginator on page but ajax responce have it
                    $itemsContainer.parent().append($(responce.paginationHtml));
                }


                // add dots onclick event handler
                $paginatorContainer.find('.dots').on('click', function() {
                    $paginatorContainer.find('div:hidden').show().find('a').unwrap();
                    $(this).remove();
                });

                // update current page field
                $itemsContainer.attr('data-cur-page', responce.currentPage);


                // hide preloader
                dtGlobals.isoPreloader.stop().fadeOut(300);

                // update load more button
                dtGlobals.loadMoreButton = $(".button-load-more");
            }
        }));

    });

    function lazyLoading() {
        if ( dtGlobals.loadMoreButton && dtGlobals.loadMoreButton.exists() ) {

            var buttonOffset = dtGlobals.loadMoreButton.offset();
            if ( buttonOffset && $window.scrollTop() > (buttonOffset.top - $window.height()) / 2 && !dtGlobals.loadMoreButton.hasClass('animate-load') ) {
                dtGlobals.loadMoreButton.trigger('click');
            }

        }
    }

    // lazy loading
    if ( typeof dtLocal.themeSettings.lazyLoading != 'undefined' && dtLocal.themeSettings.lazyLoading ) {

        dtGlobals.loadMoreButton = $(".button-load-more");
        var timer = null;
        $window.on('scroll', function () {
            lazyLoading();
        });
        lazyLoading();
    }

    // Prevent a backgroung rendering glitch in Webkit.
    // if (!window.bgGlitchFixed && $.browser.webkit) {
    // 	setTimeout(function(){
    // 		$window.scrollTop($window.scrollTop() + 1);
    // 		window.bgGlitchFixed = true;
    // 	},10)
    // }

    var waitForFinalEvent = (function () {
        var timers = {};
        return function (callback, ms, uniqueId) {
            if (!uniqueId) {
                uniqueId = "Don't call this twice without a uniqueId";
            }
            if (timers[uniqueId]) {
                clearTimeout (timers[uniqueId]);
            }
            timers[uniqueId] = setTimeout(callback, ms);
        };
    })();

    // Usage
    $window.resize(function () {

        /*Animate iso-items on resize*/
        $(".iso-item, .iso-grid .wf-cell").addClass("animate-position");
        waitForFinalEvent(function(){
            $(".iso-item, .iso-grid .wf-cell").removeClass("animate-position");
        }, 2500, "");

    });

    var $isotope = $(".dt-isotope"),
        $isoFallback = $(".iso-item:not(.shown):not(.is-visible)"),
        $grid = $(".iso-grid .wf-cell:not(.shown):not(.is-visible)");

    if ($isotope.exists() || $isoFallback.exists() || $grid.exists()) {
        setTimeout(function () {
            loadingEffects();
        }, 100);

        $window.on("scroll", function() {
            loadingEffects();
        });
    };
    //})


    /* #Filter for posts shortcode
     ================================================== */
// jQuery(document).ready(function($) {
    var dtPostsJQueryFilter = {
        timeouts: {},

        init: function(settings) {
            this.config = {
                postsContainer: null,
                categoryContainer: null,
                paginatorContainer: null,
                curPage: 1,
                curCategory: '*',
                postsPerPage: -1,
                items: []
            };

            $.extend( this.config, settings );

            this._setPostsPerPage();
            this._setCategory();
            this._setCurPage();
            this._setItems();

            this.setup();
        },

        setup: function() {
            $('a', this.config.paginatorContainer).on('click.dtPostsPaginationFilter', {self: this}, this.paginationFilter);
            $('a', this.config.categoryContainer).on('click.dtPostsCategoryFilter', {self: this}, this.categoryFilter);

            this._getActiveElement(this.config.paginatorContainer).trigger('click.dtPostsPaginationFilter', { onSetup: true });

        },

        paginationFilter: function(event, onSetup) {
            event.preventDefault();

            var item = $(this);
            var self = event.data.self;

            self._setAsActive(item);
            self._setCurPage();

            if ( ! onSetup ) {
                self._scrollToTopOfContainer( self._filterPosts );


            } else {
                self._filterPosts();
            };


        },

        categoryFilter: function(event) {
            event.preventDefault();

            var item = $(this);
            var self = event.data.self;

            self._setAsActive(item);
            self._setCategory();
            self._setAsActive(self.config.paginatorContainer.find('a').first());
            self._setCurPage();

            self._showPagination();
            self._filterPosts();
        },

        _showPagination: function() {
            if ( this.config.curCategory && '*' != this.config.curCategory ) {
                var itemsCount = this.config.postsContainer.find(this.config.curCategory).length;
                var maxPage = Math.ceil( itemsCount / this.config.postsPerPage );
                if ( maxPage == 1 ) {
                    this.config.paginatorContainer.find('a').hide();
                } else {
                    this.config.paginatorContainer.find('a').each(function(index) {
                        var $this = $(this);
                        if ( (index + 1) > maxPage ) {
                            $this.hide();
                        } else {
                            $this.show();
                        }
                    });
                }
            } else {
                this.config.paginatorContainer.find('a').show();
            }

        },

        _filterPosts: function() {
            var self = this;

            // category filter emulation
            self.config.items.css("display", "none");

            var itemsCount = 0;
            self.config.items.filter(self.config.curCategory).each(function() {
                if ( self._showOnCurPage(++itemsCount) ) {
                    $(this).css("display", "block");
                }
            });

        },

        _setPostsPerPage: function() {
            this.config.postsPerPage = parseInt( this.config.postsContainer.attr('data-posts-per-page') );
        },

        _setCategory: function() {
            this.config.curCategory = this._getActiveElement(this.config.categoryContainer).attr('data-filter') || this.config.curCategory;
        },

        _setCurPage: function(page) {
            this.config.curPage = page ? page : this._getActiveElement(this.config.paginatorContainer).attr('data-page-num');
        },

        _setItems: function() {
            this.config.items = $(".wf-cell", this.config.postsContainer);


        },

        _showOnCurPage: function(index) {
            return this.config.postsPerPage <= 0 || ( this.config.postsPerPage*(this.config.curPage - 1) < index && index <= this.config.postsPerPage*this.config.curPage );
        },

        _setAsActive: function(item) {
            item.addClass('act').siblings().removeClass('act');
        },

        _getActiveElement: function(items) {
            return items.find('a.act').first();
        },

        _isActive: function(item) {
            return item.hasClass('act');
        },

        _scrollToTopOfContainer: function(onComplite) {
            var scrollTo = this.config.postsContainer.parent();

            $("html, body").animate({
                scrollTop: scrollTo.offset().top - $("#phantom").height() - 50
            }, 400, onComplite ? onComplite.bind(this) : undefined);

        },

        _setTimeout: function(id, handler, time) {
            var self = this;

            if ( ! id ) {
                handler.bind(self);
            }

            if ( this.timeouts[id] ) {
                window.clearTimeout( this.timeouts[id] );
            }

            this.timeouts[id] = window.setTimeout(handler.bind(self), time);
        }
    };

    var dtPostsIsotopeFilter = $.extend({}, dtPostsJQueryFilter, {
        init: function(settings) {
            this.config = {
                postsContainer: null,
                categoryContainer: null,
                orderByContainer: null,
                orderContainer: null,
                paginatorContainer: null,
                curPage: 1,
                curCategory: '*',
                initialOrder: '',
                order: '',
                orderBy: '',
                postsPerPage: -1,
                items: [],
                isPhone: false
            };

            $.extend( this.config, settings );

            this._setPostsPerPage();
            this._setCategory();
            this._setOrderBy();
            this._setOrder();
            this._setCurPage();
            this._setItems();

            this.config.initialOrder = this.config.order;

            this.setup();
        },

        setup: function() {
            $('a', this.config.paginatorContainer).on('click.dtPostsPaginationFilter', {self: this}, this.paginationFilter);
            $('a', this.config.categoryContainer).on('click.dtPostsCategoryFilter', {self: this}, this.categoryFilter);
            $('a', this.config.orderContainer).on('click.dtPostsOrderFilter', {self: this}, this.orderFilter);
            $('a', this.config.orderByContainer).on('click.dtPostsOrderByFilter', {self: this}, this.orderByFilter);

            this._getActiveElement(this.config.paginatorContainer).trigger('click.dtPostsPaginationFilter', { onSetup: true });
        },

        orderFilter: function(event) {
            event.preventDefault();

            var item = $(this);
            var self = event.data.self;

            self._setAsActive(item);
            self._setOrder();
            self._filterPosts();
        },

        orderByFilter: function(event) {
            event.preventDefault();

            var item = $(this);
            var self = event.data.self;

            self._setAsActive(item);
            self._setOrderBy();
            self._filterPosts();
        },

        _filterPosts: function() {
            var self = this;

            if ( self.config.isPhone ) {

                // category filter emulation
                self.config.items.css("display", "none");

                var itemsCount = 0;
                self.config.items.filter(self.config.curCategory).each(function() {
                    if ( self._showOnCurPage(++itemsCount) ) {
                        $(this).css("display", "inline-block");
                    }
                });


            } else {
                self.config.postsContainer.isotope({ filter: self.config.curCategory, sortAscending: 'asc' == self.config.order, sortBy: self.config.orderBy });

                if ( self.config.curPage ) {
                    self._filterByCurPage();
                }
                setTimeout(function(){
                    $(".iso-container").isotope('layout');
                }, 800)
            }
        },

        _filterByCurPage: function() {
            var items = this.config.items.slice(0);
            if ( this.config.initialOrder && this.config.initialOrder != this.config.order ) {
                items.reverse();
            }

            var itemsCount = 0;
            items.map(function(item) {
                if ( ! item.isHidden && ! this._showOnCurPage(++itemsCount) ) {
                    item.hide();
                }
            }, this);

            this.config.postsContainer.isotope('layout');
        },

        _setOrderBy: function() {
            this.config.orderBy = this._getActiveElement(this.config.orderByContainer).attr('data-by');
        },

        _setOrder: function() {
            this.config.order = this._getActiveElement(this.config.orderContainer).attr('data-sort');
        },

        _setItems: function() {
            if ( this.config.isPhone ) {
                this.config.items = $(".iso-item, .wf-cell", this.config.postsContainer);
            } else {
                this.config.items = this.config.postsContainer.isotope('getItemElements').map(function(item) { return this.config.postsContainer.isotope('getItem', item); }, this);
            }
        }
    });

    var dtPostsJGridFilter = $.extend({}, dtPostsJQueryFilter, {
        _filterPosts: function() {
            var self = this;

            // category filter emulation
            self.config.items.css("display", "none");

            var itemsCount = 0;
            var visibleItems = [];
            self.config.items.filter(self.config.curCategory).each(function() {
                if ( self._showOnCurPage( ++itemsCount ) ) {
                    $(this).css("display", "block");
                    visibleItems.push( this );
                }
            });

            visibleItems = $(visibleItems);
            self.config.postsContainer.data('visibleItems', visibleItems);
            self.config.postsContainer.collage({ images: visibleItems });
        },

        _setItems: function() {
            this.config.items = $(".wf-cell", this.config.postsContainer);
        }
    });

    $('.dt-shortcode.with-isotope').each(function() {
        var $this = $(this);
        var $container = $this.find('.wf-container');
        var filterConfig = {
            postsContainer: $container,
            categoryContainer: $this.find('.filter-categories'),
            paginatorContainer: $this.find('.iso-paginator')
        };

        if ( $container.hasClass('dt-isotope') ) {
            var postsFilter = Object.create(dtPostsIsotopeFilter);
            $.extend(filterConfig, {
                orderByContainer: $this.find('.filter-extras .filter-by'),
                orderContainer: $this.find('.filter-extras .filter-sorting'),
                isPhone: dtGlobals.isPhone
            });
        } else {
            var postsFilter = Object.create(dtPostsJGridFilter);
        }

        postsFilter.init(filterConfig);
    });
});

