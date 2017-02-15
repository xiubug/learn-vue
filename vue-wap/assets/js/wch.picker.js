/**
 * WCH核心JS
 */
export const wch = (function(document, undefined) {
    var readyRE = /complete|loaded|interactive/;
    var idSelectorRE = /^#([\w-]+)$/;
    var classSelectorRE = /^\.([\w-]+)$/;
    var tagSelectorRE = /^[\w-]+$/;
    var translateRE = /translate(?:3d)?\((.+?)\)/;
    var translateMatrixRE = /matrix(3d)?\((.+?)\)/;

    var $ = function(selector, context) {
        context = context || document;
        if (!selector)
            return wrap();
        if (typeof selector === 'object')
            if ($.isArrayLike(selector)) {
                return wrap($.slice.call(selector), null);
            } else {
                return wrap([selector], null);
            }
        if (typeof selector === 'function')
            return $.ready(selector);
        if (typeof selector === 'string') {
            try {
                selector = selector.trim();
                if (idSelectorRE.test(selector)) {
                    var found = document.getElementById(RegExp.$1);
                    return wrap(found ? [found] : []);
                }
                return wrap($.qsa(selector, context), selector);
            } catch (e) {}
        }
        return wrap();
    };

    var wrap = function(dom, selector) {
        dom = dom || [];
        Object.setPrototypeOf(dom, $.fn);
        dom.selector = selector || '';
        return dom;
    };

    $.uuid = 0;

    $.data = {};
    /**
     * extend(simple)
     * @param {type} target
     * @param {type} source
     * @param {type} deep
     * @returns {unresolved}
     */
    $.extend = function() { //from jquery2
        var options, name, src, copy, copyIsArray, clone,
            target = arguments[0] || {},
            i = 1,
            length = arguments.length,
            deep = false;

        if (typeof target === "boolean") {
            deep = target;

            target = arguments[i] || {};
            i++;
        }

        if (typeof target !== "object" && !$.isFunction(target)) {
            target = {};
        }

        if (i === length) {
            target = this;
            i--;
        }

        for (; i < length; i++) {
            if ((options = arguments[i]) != null) {
                for (name in options) {
                    src = target[name];
                    copy = options[name];

                    if (target === copy) {
                        continue;
                    }

                    if (deep && copy && ($.isPlainObject(copy) || (copyIsArray = $.isArray(copy)))) {
                        if (copyIsArray) {
                            copyIsArray = false;
                            clone = src && $.isArray(src) ? src : [];

                        } else {
                            clone = src && $.isPlainObject(src) ? src : {};
                        }

                        target[name] = $.extend(deep, clone, copy);

                    } else if (copy !== undefined) {
                        target[name] = copy;
                    }
                }
            }
        }

        return target;
    };
    /**
     * wch noop(function)
     */
    $.noop = function() {};
    /**
     * wch slice(array)
     */
    $.slice = [].slice;
    /**
     * wch filter(array)
     */
    $.filter = [].filter;

    $.type = function(obj) {
        return obj == null ? String(obj) : class2type[{}.toString.call(obj)] || "object";
    };
    /**
     * wch isArray
     */
    $.isArray = Array.isArray ||
        function(object) {
            return object instanceof Array;
        };
    /**
     * wch isArrayLike 
     * @param {Object} obj
     */
    $.isArrayLike = function(obj) {
        var length = !!obj && "length" in obj && obj.length;
        var type = $.type(obj);
        if (type === "function" || $.isWindow(obj)) {
            return false;
        }
        return type === "array" || length === 0 ||
            typeof length === "number" && length > 0 && (length - 1) in obj;
    };
    /**
     * wch isWindow(需考虑obj为undefined的情况)
     */
    $.isWindow = function(obj) {
        return obj != null && obj === obj.window;
    };
    /**
     * wch isObject
     */
    $.isObject = function(obj) {
        return $.type(obj) === "object";
    };
    /**
     * wch isPlainObject
     */
    $.isPlainObject = function(obj) {
        return $.isObject(obj) && !$.isWindow(obj) && Object.getPrototypeOf(obj) === Object.prototype;
    };
    /**
     * wch isEmptyObject
     * @param {Object} o
     */
    $.isEmptyObject = function(o) {
        for (var p in o) {
            if (p !== undefined) {
                return false;
            }
        }
        return true;
    };
    /**
     * wch isFunction
     */
    $.isFunction = function(value) {
        return $.type(value) === "function";
    };
    /**
     * wch querySelectorAll
     * @param {type} selector
     * @param {type} context
     * @returns {Array}
     */
    $.qsa = function(selector, context) {
        context = context || document;
        return $.slice.call(classSelectorRE.test(selector) ? context.getElementsByClassName(RegExp.$1) : tagSelectorRE.test(selector) ? context.getElementsByTagName(selector) : context.querySelectorAll(selector));
    };
    /**
     * ready(DOMContentLoaded)
     * @param {type} callback
     * @returns {_L6.$}
     */
    $.ready = function(callback) {
        if (readyRE.test(document.readyState)) {
            callback($);
        } else {
            document.addEventListener('DOMContentLoaded', function() {
                callback($);
            }, false);
        }
        return this;
    };
    /**
     * 将 fn 缓存一段时间后, 再被调用执行
     * 此方法为了避免在 ms 段时间内, 执行 fn 多次. 常用于 resize , scroll , mousemove 等连续性事件中;
     * 当 ms 设置为 -1, 表示立即执行 fn, 即和直接调用 fn 一样;
     * 调用返回函数的 stop 停止最后一次的 buffer 效果
     * @param {Object} fn
     * @param {Object} ms
     * @param {Object} context
     */
    $.buffer = function(fn, ms, context) {
        var timer;
        var lastStart = 0;
        var lastEnd = 0;
        var ms = ms || 150;

        function run() {
            if (timer) {
                timer.cancel();
                timer = 0;
            }
            lastStart = $.now();
            fn.apply(context || this, arguments);
            lastEnd = $.now();
        }

        return $.extend(function() {
            if (
                (!lastStart) || // 从未运行过
                (lastEnd >= lastStart && $.now() - lastEnd > ms) || // 上次运行成功后已经超过ms毫秒
                (lastEnd < lastStart && $.now() - lastStart > ms * 8) // 上次运行或未完成，后8*ms毫秒
            ) {
                run();
            } else {
                if (timer) {
                    timer.cancel();
                }
                timer = $.later(run, ms, null, arguments);
            }
        }, {
            stop: function() {
                if (timer) {
                    timer.cancel();
                    timer = 0;
                }
            }
        });
    };
    /**
     * each
     * @param {type} elements
     * @param {type} callback
     * @returns {_L8.$}
     */
    $.each = function(elements, callback, hasOwnProperty) {
        if (!elements) {
            return this;
        }
        if (typeof elements.length === 'number') {
            [].every.call(elements, function(el, idx) {
                return callback.call(el, idx, el) !== false;
            });
        } else {
            for (var key in elements) {
                if (hasOwnProperty) {
                    if (elements.hasOwnProperty(key)) {
                        if (callback.call(elements[key], key, elements[key]) === false) return elements;
                    }
                } else {
                    if (callback.call(elements[key], key, elements[key]) === false) return elements;
                }
            }
        }
        return this;
    };
    $.focus = function(element) {
        if ($.os.ios) {
            setTimeout(function() {
                element.focus();
            }, 10);
        } else {
            element.focus();
        }
    };
    /**
     * trigger event
     * @param {type} element
     * @param {type} eventType
     * @param {type} eventData
     * @returns {_L8.$}
     */
    $.trigger = function(element, eventType, eventData) {
        element.dispatchEvent(new CustomEvent(eventType, {
            detail: eventData,
            bubbles: true,
            cancelable: true
        }));
        return this;
    };
    /**
     * getStyles
     * @param {type} element
     * @param {type} property
     * @returns {styles}
     */
    $.getStyles = function(element, property) {
        var styles = element.ownerDocument.defaultView.getComputedStyle(element, null);
        if (property) {
            return styles.getPropertyValue(property) || styles[property];
        }
        return styles;
    };
    /**
     * parseTranslate
     * @param {type} translateString
     * @param {type} position
     * @returns {Object}
     */
    $.parseTranslate = function(translateString, position) {
        var result = translateString.match(translateRE || '');
        if (!result || !result[1]) {
            result = ['', '0,0,0'];
        }
        result = result[1].split(",");
        result = {
            x: parseFloat(result[0]),
            y: parseFloat(result[1]),
            z: parseFloat(result[2])
        };
        if (position && result.hasOwnProperty(position)) {
            return result[position];
        }
        return result;
    };
    /**
     * parseTranslateMatrix
     * @param {type} translateString
     * @param {type} position
     * @returns {Object}
     */
    $.parseTranslateMatrix = function(translateString, position) {
        var matrix = translateString.match(translateMatrixRE);
        var is3D = matrix && matrix[1];
        if (matrix) {
            matrix = matrix[2].split(",");
            if (is3D === "3d")
                matrix = matrix.slice(12, 15);
            else {
                matrix.push(0);
                matrix = matrix.slice(4, 7);
            }
        } else {
            matrix = [0, 0, 0];
        }
        var result = {
            x: parseFloat(matrix[0]),
            y: parseFloat(matrix[1]),
            z: parseFloat(matrix[2])
        };
        if (position && result.hasOwnProperty(position)) {
            return result[position];
        }
        return result;
    };
    $.hooks = {};
    $.addAction = function(type, hook) {
        var hooks = $.hooks[type];
        if (!hooks) {
            hooks = [];
        }
        hook.index = hook.index || 1000;
        hooks.push(hook);
        hooks.sort(function(a, b) {
            return a.index - b.index;
        });
        $.hooks[type] = hooks;
        return $.hooks[type];
    };
    $.doAction = function(type, callback) {
        if ($.isFunction(callback)) { //指定了callback
            $.each($.hooks[type], callback);
        } else { //未指定callback，直接执行
            $.each($.hooks[type], function(index, hook) {
                return !hook.handle();
            });
        }
    };
    /**
     * setTimeout封装
     * @param {Object} fn
     * @param {Object} when
     * @param {Object} context
     * @param {Object} data
     */
    $.later = function(fn, when, context, data) {
        when = when || 0;
        var m = fn;
        var d = data;
        var f;
        var r;

        if (typeof fn === 'string') {
            m = context[fn];
        }

        f = function() {
            m.apply(context, $.isArray(d) ? d : [d]);
        };

        r = setTimeout(f, when);

        return {
            id: r,
            cancel: function() {
                clearTimeout(r);
            }
        };
    };
    $.now = Date.now || function() {
        return +new Date();
    };
    var class2type = {};
    $.each(['Boolean', 'Number', 'String', 'Function', 'Array', 'Date', 'RegExp', 'Object', 'Error'], function(i, name) {
        class2type["[object " + name + "]"] = name.toLowerCase();
    });
    if (window.JSON) {
        $.parseJSON = JSON.parse;
    }
    /**
     * $.fn
     */
    $.fn = {
        each: function(callback) {
            [].every.call(this, function(el, idx) {
                return callback.call(el, idx, el) !== false;
            });
            return this;
        }
    };

    /**
     * 兼容 AMD 模块
     **/
    if (typeof define === 'function' && define.amd) {
        define('wch', [], function() {
            return $;
        });
    }

    return $;
})(document);


/**
 * $.os
 * @param {type} $
 * @returns {undefined}
 */
(function($, window) {
    function detect(ua) {
        this.os = {};
        var funcs = [

            function() { //wechat
                var wechat = ua.match(/(MicroMessenger)\/([\d\.]+)/i);
                if (wechat) { //wechat
                    this.os.wechat = {
                        version: wechat[2].replace(/_/g, '.')
                    };
                }
                return false;
            },
            function() { //android
                var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
                if (android) {
                    this.os.android = true;
                    this.os.version = android[2];

                    this.os.isBadAndroid = !(/Chrome\/\d/.test(window.navigator.appVersion));
                }
                return this.os.android === true;
            },
            function() { //ios
                var iphone = ua.match(/(iPhone\sOS)\s([\d_]+)/);
                if (iphone) { //iphone
                    this.os.ios = this.os.iphone = true;
                    this.os.version = iphone[2].replace(/_/g, '.');
                } else {
                    var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
                    if (ipad) { //ipad
                        this.os.ios = this.os.ipad = true;
                        this.os.version = ipad[2].replace(/_/g, '.');
                    }
                }
                return this.os.ios === true;
            }
        ];
        [].every.call(funcs, function(func) {
            return !func.call($);
        });
    }
    detect.call($, navigator.userAgent);
})(wch, window);

/**
 * 仅提供简单的on，off(仅支持事件委托，不支持当前元素绑定，当前元素绑定请直接使用addEventListener,removeEventListener)
 * @param {Object} $
 */
(function($) {
    if ('ontouchstart' in window) {
        $.isTouchable = true;
        $.EVENT_START = 'touchstart';
        $.EVENT_MOVE = 'touchmove';
        $.EVENT_END = 'touchend';
    } else {
        $.isTouchable = false;
        $.EVENT_START = 'mousedown';
        $.EVENT_MOVE = 'mousemove';
        $.EVENT_END = 'mouseup';
    }
    $.EVENT_CANCEL = 'touchcancel';
    $.EVENT_CLICK = 'click';

    var _mid = 1;
    var delegates = {};
    //需要wrap的函数
    var eventMethods = {
        preventDefault: 'isDefaultPrevented',
        stopImmediatePropagation: 'isImmediatePropagationStopped',
        stopPropagation: 'isPropagationStopped'
    };
    //默认true返回函数
    var returnTrue = function() {
        return true
    };
    //默认false返回函数
    var returnFalse = function() {
        return false
    };
    //wrap浏览器事件
    var compatible = function(event, target) {
        if (!event.detail) {
            event.detail = {
                currentTarget: target
            };
        } else {
            event.detail.currentTarget = target;
        }
        $.each(eventMethods, function(name, predicate) {
            var sourceMethod = event[name];
            event[name] = function() {
                this[predicate] = returnTrue;
                return sourceMethod && sourceMethod.apply(event, arguments)
            }
            event[predicate] = returnFalse;
        }, true);
        return event;
    };
    //简单的wrap对象_mid
    var mid = function(obj) {
        return obj && (obj._mid || (obj._mid = _mid++));
    };
    //事件委托对象绑定的事件回调列表
    var delegateFns = {};
    //返回事件委托的wrap事件回调
    var delegateFn = function(element, event, selector, callback) {
        return function(e) {
            //same event
            var callbackObjs = delegates[element._mid][event];
            var handlerQueue = [];
            var target = e.target;
            var selectorAlls = {};
            for (; target && target !== document; target = target.parentNode) {
                if (target === element) {
                    break;
                }
                if (~['click', 'tap', 'doubletap', 'longtap', 'hold'].indexOf(event) && (target.disabled || target.classList.contains('wch-disabled'))) {
                    break;
                }
                var matches = {};
                $.each(callbackObjs, function(selector, callbacks) { //same selector
                    selectorAlls[selector] || (selectorAlls[selector] = $.qsa(selector, element));
                    if (selectorAlls[selector] && ~(selectorAlls[selector]).indexOf(target)) {
                        if (!matches[selector]) {
                            matches[selector] = callbacks;
                        }
                    }
                }, true);
                if (!$.isEmptyObject(matches)) {
                    handlerQueue.push({
                        element: target,
                        handlers: matches
                    });
                }
            }
            selectorAlls = null;
            e = compatible(e); //compatible event
            $.each(handlerQueue, function(index, handler) {
                target = handler.element;
                var tagName = target.tagName;
                if (event === 'tap' && (tagName !== 'INPUT' && tagName !== 'TEXTAREA' && tagName !== 'SELECT')) {
                    e.preventDefault();
                    e.detail && e.detail.gesture && e.detail.gesture.preventDefault();
                }
                $.each(handler.handlers, function(index, handler) {
                    $.each(handler, function(index, callback) {
                        if (callback.call(target, e) === false) {
                            e.preventDefault();
                            e.stopPropagation();
                        }
                    }, true);
                }, true)
                if (e.isPropagationStopped()) {
                    return false;
                }
            }, true);
        };
    };
    var findDelegateFn = function(element, event) {
        var delegateCallbacks = delegateFns[mid(element)];
        var result = [];
        if (delegateCallbacks) {
            result = [];
            if (event) {
                var filterFn = function(fn) {
                    return fn.type === event;
                }
                return delegateCallbacks.filter(filterFn);
            } else {
                result = delegateCallbacks;
            }
        }
        return result;
    };
    var preventDefaultException = /^(INPUT|TEXTAREA|BUTTON|SELECT)$/;
    /**
     * wch delegate events
     * @param {type} event
     * @param {type} selector
     * @param {type} callback
     * @returns {undefined}
     */
    $.fn.on = function(event, selector, callback) { //仅支持简单的事件委托,主要是tap事件使用，类似mouse,focus之类暂不封装支持
        return this.each(function() {
            var element = this;
            mid(element);
            mid(callback);
            var isAddEventListener = false;
            var delegateEvents = delegates[element._mid] || (delegates[element._mid] = {});
            var delegateCallbackObjs = delegateEvents[event] || ((delegateEvents[event] = {}));
            if ($.isEmptyObject(delegateCallbackObjs)) {
                isAddEventListener = true;
            }
            var delegateCallbacks = delegateCallbackObjs[selector] || (delegateCallbackObjs[selector] = []);
            delegateCallbacks.push(callback);
            if (isAddEventListener) {
                var delegateFnArray = delegateFns[mid(element)];
                if (!delegateFnArray) {
                    delegateFnArray = [];
                }
                var delegateCallback = delegateFn(element, event, selector, callback);
                delegateFnArray.push(delegateCallback);
                delegateCallback.i = delegateFnArray.length - 1;
                delegateCallback.type = event;
                delegateFns[mid(element)] = delegateFnArray;
                element.addEventListener(event, delegateCallback);
                if (event === 'tap') { //TODO 需要找个更好的解决方案
                    element.addEventListener('click', function(e) {
                        if (e.target) {
                            var tagName = e.target.tagName;
                            if (!preventDefaultException.test(tagName)) {
                                if (tagName === 'A') {
                                    var href = e.target.href;
                                    if (!(href && ~href.indexOf('tel:'))) {
                                        e.preventDefault();
                                    }
                                } else {
                                    e.preventDefault();
                                }
                            }
                        }
                    });
                }
            }
        });
    };
    $.fn.off = function(event, selector, callback) {
        return this.each(function() {
            var _mid = mid(this);
            if (!event) { //wch(selector).off();
                delegates[_mid] && delete delegates[_mid];
            } else if (!selector) { //wch(selector).off(event);
                delegates[_mid] && delete delegates[_mid][event];
            } else if (!callback) { //wch(selector).off(event,selector);
                delegates[_mid] && delegates[_mid][event] && delete delegates[_mid][event][selector];
            } else { //wch(selector).off(event,selector,callback);
                var delegateCallbacks = delegates[_mid] && delegates[_mid][event] && delegates[_mid][event][selector];
                $.each(delegateCallbacks, function(index, delegateCallback) {
                    if (mid(delegateCallback) === mid(callback)) {
                        delegateCallbacks.splice(index, 1);
                        return false;
                    }
                }, true);
            }
            if (delegates[_mid]) {
                //如果off掉了所有当前element的指定的event事件，则remove掉当前element的delegate回调
                if ((!delegates[_mid][event] || $.isEmptyObject(delegates[_mid][event]))) {
                    findDelegateFn(this, event).forEach(function(fn) {
                        this.removeEventListener(fn.type, fn);
                        delete delegateFns[_mid][fn.i];
                    }.bind(this));
                }
            } else {
                //如果delegates[_mid]已不存在，删除所有
                findDelegateFn(this).forEach(function(fn) {
                    this.removeEventListener(fn.type, fn);
                    delete delegateFns[_mid][fn.i];
                }.bind(this));
            }
        });

    };
})(wch);
/**
 * wch target(action>popover>modal>tab>toggle)
 */
(function($, window, document) {
    /**
     * targets
     */
    $.targets = {};
    /**
     * target handles
     */
    $.targetHandles = [];
    /**
     * register target
     * @param {type} target
     * @returns {$.targets}
     */
    $.registerTarget = function(target) {

        target.index = target.index || 1000;

        $.targetHandles.push(target);

        $.targetHandles.sort(function(a, b) {
            return a.index - b.index;
        });

        return $.targetHandles;
    };
    window.addEventListener($.EVENT_START, function(event) {
        var target = event.target;
        var founds = {};
        for (; target && target !== document; target = target.parentNode) {
            var isFound = false;
            $.each($.targetHandles, function(index, targetHandle) {
                var name = targetHandle.name;
                if (!isFound && !founds[name] && targetHandle.hasOwnProperty('handle')) {
                    $.targets[name] = targetHandle.handle(event, target);
                    if ($.targets[name]) {
                        founds[name] = true;
                        if (targetHandle.isContinue !== true) {
                            isFound = true;
                        }
                    }
                } else {
                    if (!founds[name]) {
                        if (targetHandle.isReset !== false)
                            $.targets[name] = false;
                    }
                }
            });
            if (isFound) {
                break;
            }
        }
    });
    window.addEventListener('click', function(event) { //解决touch与click的target不一致的问题(比如链接边缘点击时，touch的target为html，而click的target为A)
        var target = event.target;
        var isFound = false;
        for (; target && target !== document; target = target.parentNode) {
            if (target.tagName === 'A') {
                $.each($.targetHandles, function(index, targetHandle) {
                    var name = targetHandle.name;
                    if (targetHandle.hasOwnProperty('handle')) {
                        if (targetHandle.handle(event, target)) {
                            isFound = true;
                            event.preventDefault();
                            return false;
                        }
                    }
                });
                if (isFound) {
                    break;
                }
            }
        }
    });
})(wch, window, document);

/**
 * fixed trim
 * @param {type} undefined
 * @returns {undefined}
 */
(function(undefined) {
    if (String.prototype.trim === undefined) { // fix for iOS 3.2
        String.prototype.trim = function() {
            return this.replace(/^\s+|\s+$/g, '');
        };
    }
    Object.setPrototypeOf = Object.setPrototypeOf || function(obj, proto) {
        obj['__proto__'] = proto;
        return obj;
    };

})();


/**
 * wch namespace(optimization)
 * @param {type} $
 * @returns {undefined}
 */
(function($) {
    $.namespace = 'wch';
    $.classNamePrefix = $.namespace + '-';
    $.classSelectorPrefix = '.' + $.classNamePrefix;
    /**
     * 返回正确的className
     * @param {type} className
     * @returns {String}
     */
    $.className = function(className) {
        return $.classNamePrefix + className;
    };
    /**
     * 返回正确的classSelector
     * @param {type} classSelector
     * @returns {String}
     */
    $.classSelector = function(classSelector) {
        return classSelector.replace(/\./g, $.classSelectorPrefix);
    };
    /**
     * 返回正确的eventName
     * @param {type} event
     * @param {type} module
     * @returns {String}
     */
    $.eventName = function(event, module) {
        return event + ($.namespace ? ('.' + $.namespace) : '') + (module ? ('.' + module) : '');
    };
})(wch);

/**
 * wch gestures
 * @param {type} $
 * @param {type} window
 * @returns {undefined}
 */
(function($, window) {
    $.gestures = {
        session: {}
    };
    /**
     * Gesture preventDefault
     * @param {type} e
     * @returns {undefined}
     */
    $.preventDefault = function(e) {
        e.preventDefault();
    };
    /**
     * Gesture stopPropagation
     * @param {type} e
     * @returns {undefined}
     */
    $.stopPropagation = function(e) {
        e.stopPropagation();
    };

    /**
     * register gesture
     * @param {type} gesture
     * @returns {$.gestures}
     */
    $.addGesture = function(gesture) {
        return $.addAction('gestures', gesture);

    };

    var round = Math.round;
    var abs = Math.abs;
    var sqrt = Math.sqrt;
    var atan = Math.atan;
    var atan2 = Math.atan2;
    /**
     * distance
     * @param {type} p1
     * @param {type} p2
     * @returns {Number}
     */
    var getDistance = function(p1, p2, props) {
        if (!props) {
            props = ['x', 'y'];
        }
        var x = p2[props[0]] - p1[props[0]];
        var y = p2[props[1]] - p1[props[1]];
        return sqrt((x * x) + (y * y));
    };
    /**
     * scale
     * @param {Object} starts
     * @param {Object} moves
     */
    var getScale = function(starts, moves) {
        if (starts.length >= 2 && moves.length >= 2) {
            var props = ['pageX', 'pageY'];
            return getDistance(moves[1], moves[0], props) / getDistance(starts[1], starts[0], props);
        }
        return 1;
    };
    /**
     * angle
     * @param {type} p1
     * @param {type} p2
     * @returns {Number}
     */
    var getAngle = function(p1, p2, props) {
        if (!props) {
            props = ['x', 'y'];
        }
        var x = p2[props[0]] - p1[props[0]];
        var y = p2[props[1]] - p1[props[1]];
        return atan2(y, x) * 180 / Math.PI;
    };
    /**
     * direction
     * @param {Object} x
     * @param {Object} y
     */
    var getDirection = function(x, y) {
        if (x === y) {
            return '';
        }
        if (abs(x) >= abs(y)) {
            return x > 0 ? 'left' : 'right';
        }
        return y > 0 ? 'up' : 'down';
    };
    /**
     * rotation
     * @param {Object} start
     * @param {Object} end
     */
    var getRotation = function(start, end) {
        var props = ['pageX', 'pageY'];
        return getAngle(end[1], end[0], props) - getAngle(start[1], start[0], props);
    };
    /**
     * px per ms
     * @param {Object} deltaTime
     * @param {Object} x
     * @param {Object} y
     */
    var getVelocity = function(deltaTime, x, y) {
        return {
            x: x / deltaTime || 0,
            y: y / deltaTime || 0
        };
    };
    /**
     * detect gestures
     * @param {type} event
     * @param {type} touch
     * @returns {undefined}
     */
    var detect = function(event, touch) {
        if ($.gestures.stoped) {
            return;
        }
        $.doAction('gestures', function(index, gesture) {
            if (!$.gestures.stoped) {
                if ($.options.gestureConfig[gesture.name] !== false) {
                    gesture.handle(event, touch);
                }
            }
        });
    };
    /**
     * 暂时无用
     * @param {Object} node
     * @param {Object} parent
     */
    var hasParent = function(node, parent) {
        while (node) {
            if (node == parent) {
                return true;
            }
            node = node.parentNode;
        }
        return false;
    };

    var uniqueArray = function(src, key, sort) {
        var results = [];
        var values = [];
        var i = 0;

        while (i < src.length) {
            var val = key ? src[i][key] : src[i];
            if (values.indexOf(val) < 0) {
                results.push(src[i]);
            }
            values[i] = val;
            i++;
        }

        if (sort) {
            if (!key) {
                results = results.sort();
            } else {
                results = results.sort(function sortUniqueArray(a, b) {
                    return a[key] > b[key];
                });
            }
        }

        return results;
    };
    var getMultiCenter = function(touches) {
        var touchesLength = touches.length;
        if (touchesLength === 1) {
            return {
                x: round(touches[0].pageX),
                y: round(touches[0].pageY)
            };
        }

        var x = 0;
        var y = 0;
        var i = 0;
        while (i < touchesLength) {
            x += touches[i].pageX;
            y += touches[i].pageY;
            i++;
        }

        return {
            x: round(x / touchesLength),
            y: round(y / touchesLength)
        };
    };
    var multiTouch = function() {
        return $.options.gestureConfig.pinch;
    };
    var copySimpleTouchData = function(touch) {
        var touches = [];
        var i = 0;
        while (i < touch.touches.length) {
            touches[i] = {
                pageX: round(touch.touches[i].pageX),
                pageY: round(touch.touches[i].pageY)
            };
            i++;
        }
        return {
            timestamp: $.now(),
            gesture: touch.gesture,
            touches: touches,
            center: getMultiCenter(touch.touches),
            deltaX: touch.deltaX,
            deltaY: touch.deltaY
        };
    };

    var calDelta = function(touch) {
        var session = $.gestures.session;
        var center = touch.center;
        var offset = session.offsetDelta || {};
        var prevDelta = session.prevDelta || {};
        var prevTouch = session.prevTouch || {};

        if (touch.gesture.type === $.EVENT_START || touch.gesture.type === $.EVENT_END) {
            prevDelta = session.prevDelta = {
                x: prevTouch.deltaX || 0,
                y: prevTouch.deltaY || 0
            };

            offset = session.offsetDelta = {
                x: center.x,
                y: center.y
            };
        }
        touch.deltaX = prevDelta.x + (center.x - offset.x);
        touch.deltaY = prevDelta.y + (center.y - offset.y);
    };
    var calTouchData = function(touch) {
        var session = $.gestures.session;
        var touches = touch.touches;
        var touchesLength = touches.length;

        if (!session.firstTouch) {
            session.firstTouch = copySimpleTouchData(touch);
        }

        if (multiTouch() && touchesLength > 1 && !session.firstMultiTouch) {
            session.firstMultiTouch = copySimpleTouchData(touch);
        } else if (touchesLength === 1) {
            session.firstMultiTouch = false;
        }

        var firstTouch = session.firstTouch;
        var firstMultiTouch = session.firstMultiTouch;
        var offsetCenter = firstMultiTouch ? firstMultiTouch.center : firstTouch.center;

        var center = touch.center = getMultiCenter(touches);
        touch.timestamp = $.now();
        touch.deltaTime = touch.timestamp - firstTouch.timestamp;

        touch.angle = getAngle(offsetCenter, center);
        touch.distance = getDistance(offsetCenter, center);

        calDelta(touch);

        touch.offsetDirection = getDirection(touch.deltaX, touch.deltaY);

        touch.scale = firstMultiTouch ? getScale(firstMultiTouch.touches, touches) : 1;
        touch.rotation = firstMultiTouch ? getRotation(firstMultiTouch.touches, touches) : 0;

        calIntervalTouchData(touch);

    };
    var CAL_INTERVAL = 25;
    var calIntervalTouchData = function(touch) {
        var session = $.gestures.session;
        var last = session.lastInterval || touch;
        var deltaTime = touch.timestamp - last.timestamp;
        var velocity;
        var velocityX;
        var velocityY;
        var direction;

        if (touch.gesture.type != $.EVENT_CANCEL && (deltaTime > CAL_INTERVAL || last.velocity === undefined)) {
            var deltaX = last.deltaX - touch.deltaX;
            var deltaY = last.deltaY - touch.deltaY;

            var v = getVelocity(deltaTime, deltaX, deltaY);
            velocityX = v.x;
            velocityY = v.y;
            velocity = (abs(v.x) > abs(v.y)) ? v.x : v.y;
            direction = getDirection(deltaX, deltaY) || last.direction;

            session.lastInterval = touch;
        } else {
            velocity = last.velocity;
            velocityX = last.velocityX;
            velocityY = last.velocityY;
            direction = last.direction;
        }

        touch.velocity = velocity;
        touch.velocityX = velocityX;
        touch.velocityY = velocityY;
        touch.direction = direction;
    };
    var targetIds = {};
    var convertTouches = function(touches) {
        for (var i = 0; i < touches.length; i++) {
            !touches['identifier'] && (touches['identifier'] = 0);
        }
        return touches;
    };
    var getTouches = function(event, touch) {
        var allTouches = convertTouches($.slice.call(event.touches || [event]));

        var type = event.type;

        var targetTouches = [];
        var changedTargetTouches = [];

        //当touchstart或touchmove且touches长度为1，直接获得all和changed
        if ((type === $.EVENT_START || type === $.EVENT_MOVE) && allTouches.length === 1) {
            targetIds[allTouches[0].identifier] = true;
            targetTouches = allTouches;
            changedTargetTouches = allTouches;
            touch.target = event.target;
        } else {
            var i = 0;
            var targetTouches = [];
            var changedTargetTouches = [];
            var changedTouches = convertTouches($.slice.call(event.changedTouches || [event]));

            touch.target = event.target;
            var sessionTarget = $.gestures.session.target || event.target;
            targetTouches = allTouches.filter(function(touch) {
                return hasParent(touch.target, sessionTarget);
            });

            if (type === $.EVENT_START) {
                i = 0;
                while (i < targetTouches.length) {
                    targetIds[targetTouches[i].identifier] = true;
                    i++;
                }
            }

            i = 0;
            while (i < changedTouches.length) {
                if (targetIds[changedTouches[i].identifier]) {
                    changedTargetTouches.push(changedTouches[i]);
                }
                if (type === $.EVENT_END || type === $.EVENT_CANCEL) {
                    delete targetIds[changedTouches[i].identifier];
                }
                i++;
            }

            if (!changedTargetTouches.length) {
                return false;
            }
        }
        targetTouches = uniqueArray(targetTouches.concat(changedTargetTouches), 'identifier', true);
        var touchesLength = targetTouches.length;
        var changedTouchesLength = changedTargetTouches.length;
        if (type === $.EVENT_START && touchesLength - changedTouchesLength === 0) { //first
            touch.isFirst = true;
            $.gestures.touch = $.gestures.session = {
                target: event.target
            };
        }
        touch.isFinal = ((type === $.EVENT_END || type === $.EVENT_CANCEL) && (touchesLength - changedTouchesLength === 0));

        touch.touches = targetTouches;
        touch.changedTouches = changedTargetTouches;
        return true;

    };
    var handleTouchEvent = function(event) {
        var touch = {
            gesture: event
        };
        var touches = getTouches(event, touch);
        if (!touches) {
            return;
        }
        calTouchData(touch);
        detect(event, touch);
        $.gestures.session.prevTouch = touch;
        if (event.type === $.EVENT_END && !$.isTouchable) {
            $.gestures.touch = $.gestures.session = {};
        }
    };
    window.addEventListener($.EVENT_START, handleTouchEvent);
    window.addEventListener($.EVENT_MOVE, handleTouchEvent);
    window.addEventListener($.EVENT_END, handleTouchEvent);
    window.addEventListener($.EVENT_CANCEL, handleTouchEvent);
    //fixed hashchange(android)
    window.addEventListener($.EVENT_CLICK, function(e) {
        //TODO 应该判断当前target是不是在targets.popover内部，而不是非要相等
        if (($.os.android || $.os.ios) && (($.targets.popover && e.target === $.targets.popover) || ($.targets.tab) || $.targets.offcanvas || $.targets.modal)) {
            e.preventDefault();
        }
    }, true);


    //增加原生滚动识别
    $.isScrolling = false;
    var scrollingTimeout = null;
    window.addEventListener('scroll', function() {
        $.isScrolling = true;
        scrollingTimeout && clearTimeout(scrollingTimeout);
        scrollingTimeout = setTimeout(function() {
            $.isScrolling = false;
        }, 250);
    });
})(wch, window);

/**
 * wch gesture tap and doubleTap
 * @param {type} $
 * @param {type} name
 * @returns {undefined}
 */
(function($, name) {
    var lastTarget;
    var lastTapTime;
    var handle = function(event, touch) {
        var session = $.gestures.session;
        var options = this.options;
        switch (event.type) {
            case $.EVENT_END:
                if (!touch.isFinal) {
                    return;
                }
                var target = session.target;
                if (!target || (target.disabled || (target.classList && target.classList.contains('wch-disabled')))) {
                    return;
                }
                if (touch.distance < options.tapMaxDistance && touch.deltaTime < options.tapMaxTime) {
                    if ($.options.gestureConfig.doubletap && lastTarget && (lastTarget === target)) { //same target
                        if (lastTapTime && (touch.timestamp - lastTapTime) < options.tapMaxInterval) {
                            $.trigger(target, 'doubletap', touch);
                            lastTapTime = $.now();
                            lastTarget = target;
                            return;
                        }
                    }
                    $.trigger(target, name, touch);
                    lastTapTime = $.now();
                    lastTarget = target;
                }
                break;
        }
    };
    /**
     * wch gesture tap
     */
    $.addGesture({
        name: name,
        index: 30,
        handle: handle,
        options: {
            fingers: 1,
            tapMaxInterval: 300,
            tapMaxDistance: 5,
            tapMaxTime: 250
        }
    });
})(wch, 'tap');

/**
 * wch.init
 * @param {type} $
 * @returns {undefined}
 */
(function($) {
    $.global = $.options = {
        gestureConfig: {
            tap: true,
            doubletap: false,
            longtap: false,
            hold: false,
            flick: true,
            swipe: true,
            drag: true,
            pinch: false
        }
    };
    /**
     *
     * @param {type} options
     * @returns {undefined}
     */
    $.initGlobal = function(options) {
        $.options = $.extend(true, $.global, options);
        return this;
    };
    var inits = {};

    var isInitialized = false;
    //TODO 自动调用init?因为用户自己调用init的时机可能不确定，如果晚于自动init，则会有潜在问题
    //  $.ready(function() {
    //      setTimeout(function() {
    //          if (!isInitialized) {
    //              $.init();
    //          }
    //      }, 300);
    //  });
    /**
     * 单页配置 初始化
     * @param {object} options
     */
    $.init = function(options) {
        isInitialized = true;
        $.options = $.extend(true, $.global, options || {});
        $.ready(function() {
            $.doAction('inits', function(index, init) {
                var isInit = !!(!inits[init.name] || init.repeat);
                if (isInit) {
                    init.handle.call($);
                    inits[init.name] = true;
                }
            });
        });
        return this;
    };

    /**
     * 增加初始化执行流程
     * @param {function} init
     */
    $.addInit = function(init) {
        return $.addAction('inits', init);
    };
    /**
     * 处理html5版本subpages 
     */
    $.addInit({
        name: 'iframe',
        index: 100,
        handle: function() {
            var options = $.options;
            var subpages = options.subpages || [];
            if (!$.os.plus && subpages.length) {
                //暂时只处理单个subpage。后续可以考虑支持多个subpage
                createIframe(subpages[0]);
            }
        }
    });
    var createIframe = function(options) {
        var wrapper = document.createElement('div');
        wrapper.className = 'wch-iframe-wrapper';
        var styles = options.styles || {};
        if (typeof styles.top !== 'string') {
            styles.top = '0px';
        }
        if (typeof styles.bottom !== 'string') {
            styles.bottom = '0px';
        }
        wrapper.style.top = styles.top;
        wrapper.style.bottom = styles.bottom;
        var iframe = document.createElement('iframe');
        iframe.src = options.url;
        iframe.id = options.id || options.url;
        iframe.name = iframe.id;
        wrapper.appendChild(iframe);
        document.body.appendChild(wrapper);
        //目前仅处理微信
        $.os.wechat && handleScroll(wrapper, iframe);
    };

    function handleScroll(wrapper, iframe) {
        var key = 'wch_SCROLL_POSITION_' + document.location.href + '_' + iframe.src;
        var scrollTop = (parseFloat(localStorage.getItem(key)) || 0);
        if (scrollTop) {
            (function(y) {
                iframe.onload = function() {
                    window.scrollTo(0, y);
                };
            })(scrollTop);
        }
        setInterval(function() {
            var _scrollTop = window.scrollY;
            if (scrollTop !== _scrollTop) {
                localStorage.setItem(key, _scrollTop + '');
                scrollTop = _scrollTop;
            }
        }, 100);
    };
    $(function() {
        var classList = document.body.classList;
        var os = [];
        if ($.os.ios) {
            os.push({
                os: 'ios',
                version: $.os.version
            });
            classList.add('wch-ios');
        } else if ($.os.android) {
            os.push({
                os: 'android',
                version: $.os.version
            });
            classList.add('wch-android');
        }
        if ($.os.wechat) {
            os.push({
                os: 'wechat',
                version: $.os.wechat.version
            });
            classList.add('wch-wechat');
        }
        if (os.length) {
            $.each(os, function(index, osObj) {
                var version = '';
                var classArray = [];
                if (osObj.version) {
                    $.each(osObj.version.split('.'), function(i, v) {
                        version = version + (version ? '-' : '') + v;
                        classList.add($.className(osObj.os + '-' + version));
                    });
                }
            });
        }
    });
})(wch);



(function($) {
    var initializing = false,
        fnTest = /xyz/.test(function() {
            xyz;
        }) ? /\b_super\b/ : /.*/;

    var Class = function() {};
    Class.extend = function(prop) {
        var _super = this.prototype;
        initializing = true;
        var prototype = new this();
        initializing = false;
        for (var name in prop) {
            prototype[name] = typeof prop[name] == "function" &&
                typeof _super[name] == "function" && fnTest.test(prop[name]) ?
                (function(name, fn) {
                    return function() {
                        var tmp = this._super;

                        this._super = _super[name];

                        var ret = fn.apply(this, arguments);
                        this._super = tmp;

                        return ret;
                    };
                })(name, prop[name]) :
                prop[name];
        }

        function Class() {
            if (!initializing && this.init)
                this.init.apply(this, arguments);
        }
        Class.prototype = prototype;
        Class.prototype.constructor = Class;
        Class.extend = arguments.callee;
        return Class;
    };
    $.Class = Class;
})(wch);


/**
 * Popovers
 * @param {type} $
 * @param {type} window
 * @param {type} document
 * @param {type} name
 * @param {type} undefined
 * @returns {undefined}
 */
(function($, window, document, name) {

    var CLASS_POPOVER = 'wch-popover';
    var CLASS_POPOVER_ARROW = 'wch-popover-arrow';
    var CLASS_ACTION_POPOVER = 'wch-popover-action';
    var CLASS_BACKDROP = 'wch-backdrop';
    var CLASS_BAR_POPOVER = 'wch-bar-popover';
    var CLASS_BAR_BACKDROP = 'wch-bar-backdrop';
    var CLASS_ACTION_BACKDROP = 'wch-backdrop-action';
    var CLASS_ACTIVE = 'wch-active';
    var CLASS_BOTTOM = 'wch-bottom';



    var handle = function(event, target) {
        if (target.tagName === 'A' && target.hash) {
            $.targets._popover = document.getElementById(target.hash.replace('#', ''));
            if ($.targets._popover && $.targets._popover.classList.contains(CLASS_POPOVER)) {
                return target;
            } else {
                $.targets._popover = null;
            }
        }
        return false;
    };

    $.registerTarget({
        name: name,
        index: 60,
        handle: handle,
        target: false,
        isReset: false,
        isContinue: true
    });

    var fixedPopoverScroll = function(isPopoverScroll) {
        //      if (isPopoverScroll) {
        //          document.body.setAttribute('style', 'overflow:hidden;');
        //      } else {
        //          document.body.setAttribute('style', '');
        //      }
    };
    var onPopoverShown = function(e) {
        this.removeEventListener('webkitTransitionEnd', onPopoverShown);
        this.addEventListener($.EVENT_MOVE, $.preventDefault);
        $.trigger(this, 'shown', this);
    }
    var onPopoverHidden = function(e) {
        setStyle(this, 'none');
        this.removeEventListener('webkitTransitionEnd', onPopoverHidden);
        this.removeEventListener($.EVENT_MOVE, $.preventDefault);
        fixedPopoverScroll(false);
        $.trigger(this, 'hidden', this);
    };

    var backdrop = (function() {
        var element = document.createElement('div');
        element.classList.add(CLASS_BACKDROP);
        element.addEventListener($.EVENT_MOVE, $.preventDefault);
        element.addEventListener('tap', function(e) {
            var popover = $.targets._popover;
            if (popover) {
                popover.addEventListener('webkitTransitionEnd', onPopoverHidden);
                popover.classList.remove(CLASS_ACTIVE);
                removeBackdrop(popover);
                document.body.setAttribute('style', ''); //webkitTransitionEnd有时候不触发？
            }
        });

        return element;
    }());
    var removeBackdropTimer;
    var removeBackdrop = function(popover) {
        backdrop.setAttribute('style', 'opacity:0');
        $.targets.popover = $.targets._popover = null; //reset
        removeBackdropTimer = $.later(function() {
            if (!popover.classList.contains(CLASS_ACTIVE) && backdrop.parentNode && backdrop.parentNode === document.body) {
                document.body.removeChild(backdrop);
            }
        }, 350);
    };
    window.addEventListener('tap', function(e) {
        if (!$.targets.popover) {
            return;
        }
        var toggle = false;
        var target = e.target;
        for (; target && target !== document; target = target.parentNode) {
            if (target === $.targets.popover) {
                toggle = true;
            }
        }
        if (toggle) {
            e.detail.gesture.preventDefault(); //fixed hashchange
            togglePopover($.targets._popover, $.targets.popover);
        }

    });

    var togglePopover = function(popover, anchor, state) {
        if ((state === 'show' && popover.classList.contains(CLASS_ACTIVE)) || (state === 'hide' && !popover.classList.contains(CLASS_ACTIVE))) {
            return;
        }
        removeBackdropTimer && removeBackdropTimer.cancel(); //取消remove的timer
        //remove一遍，以免来回快速切换，导致webkitTransitionEnd不触发，无法remove
        popover.removeEventListener('webkitTransitionEnd', onPopoverShown);
        popover.removeEventListener('webkitTransitionEnd', onPopoverHidden);
        backdrop.classList.remove(CLASS_BAR_BACKDROP);
        backdrop.classList.remove(CLASS_ACTION_BACKDROP);
        var _popover = document.querySelector('.wch-popover.wch-active');
        if (_popover) {
            //          _popover.setAttribute('style', '');
            _popover.addEventListener('webkitTransitionEnd', onPopoverHidden);
            _popover.classList.remove(CLASS_ACTIVE);
            //同一个弹出则直接返回，解决同一个popover的toggle
            if (popover === _popover) {
                removeBackdrop(_popover);
                return;
            }
        }
        var isActionSheet = false;
        if (popover.classList.contains(CLASS_BAR_POPOVER) || popover.classList.contains(CLASS_ACTION_POPOVER)) { //navBar
            if (popover.classList.contains(CLASS_ACTION_POPOVER)) { //action sheet popover
                isActionSheet = true;
                backdrop.classList.add(CLASS_ACTION_BACKDROP);
            } else { //bar popover
                backdrop.classList.add(CLASS_BAR_BACKDROP);
            }
        }
        setStyle(popover, 'block'); //actionsheet transform
        popover.offsetHeight;
        popover.classList.add(CLASS_ACTIVE);
        backdrop.setAttribute('style', '');
        document.body.appendChild(backdrop);
        fixedPopoverScroll(true);
        calPosition(popover, anchor, isActionSheet); //position
        backdrop.classList.add(CLASS_ACTIVE);
        popover.addEventListener('webkitTransitionEnd', onPopoverShown);
    };
    var setStyle = function(popover, display, top, left) {
        var style = popover.style;
        if (typeof display !== 'undefined')
            style.display = display;
        if (typeof top !== 'undefined')
            style.top = top + 'px';
        if (typeof left !== 'undefined')
            style.left = left + 'px';
    };
    var calPosition = function(popover, anchor, isActionSheet) {
        if (!popover || !anchor) {
            return;
        }

        if (isActionSheet) { //actionsheet
            setStyle(popover, 'block')
            return;
        }

        var wWidth = window.innerWidth;
        var wHeight = window.innerHeight;

        var pWidth = popover.offsetWidth;
        var pHeight = popover.offsetHeight;

        var aWidth = anchor.offsetWidth;
        var aHeight = anchor.offsetHeight;
        var offset = $.offset(anchor);

        var arrow = popover.querySelector('.' + CLASS_POPOVER_ARROW);
        if (!arrow) {
            arrow = document.createElement('div');
            arrow.className = CLASS_POPOVER_ARROW;
            popover.appendChild(arrow);
        }
        var arrowSize = arrow && arrow.offsetWidth / 2 || 0;



        var pTop = 0;
        var pLeft = 0;
        var diff = 0;
        var arrowLeft = 0;
        var defaultPadding = popover.classList.contains(CLASS_ACTION_POPOVER) ? 0 : 5;

        var position = 'top';
        if ((pHeight + arrowSize) < (offset.top - window.pageYOffset)) { //top
            pTop = offset.top - pHeight - arrowSize;
        } else if ((pHeight + arrowSize) < (wHeight - (offset.top - window.pageYOffset) - aHeight)) { //bottom
            position = 'bottom';
            pTop = offset.top + aHeight + arrowSize;
        } else { //middle
            position = 'middle';
            pTop = Math.max((wHeight - pHeight) / 2 + window.pageYOffset, 0);
            pLeft = Math.max((wWidth - pWidth) / 2 + window.pageXOffset, 0);
        }
        if (position === 'top' || position === 'bottom') {
            pLeft = aWidth / 2 + offset.left - pWidth / 2;
            diff = pLeft;
            if (pLeft < defaultPadding) pLeft = defaultPadding;
            if (pLeft + pWidth > wWidth) pLeft = wWidth - pWidth - defaultPadding;

            if (arrow) {
                if (position === 'top') {
                    arrow.classList.add(CLASS_BOTTOM);
                } else {
                    arrow.classList.remove(CLASS_BOTTOM);
                }
                diff = diff - pLeft;
                arrowLeft = (pWidth / 2 - arrowSize / 2 + diff);
                arrowLeft = Math.max(Math.min(arrowLeft, pWidth - arrowSize * 2 - 6), 6);
                arrow.setAttribute('style', 'left:' + arrowLeft + 'px');
            }
        } else if (position === 'middle') {
            arrow.setAttribute('style', 'display:none');
        }
        setStyle(popover, 'block', pTop, pLeft);
    };

    $.createMask = function(callback) {
        var element = document.createElement('div');
        element.classList.add(CLASS_BACKDROP);
        element.addEventListener($.EVENT_MOVE, $.preventDefault);
        element.addEventListener('tap', function() {
            mask.close();
        });
        var mask = [element];
        mask._show = false;
        mask.show = function() {
            mask._show = true;
            element.setAttribute('style', 'opacity:1');
            document.body.appendChild(element);
            return mask;
        };
        mask._remove = function() {
            if (mask._show) {
                mask._show = false;
                element.setAttribute('style', 'opacity:0');
                $.later(function() {
                    var body = document.body;
                    element.parentNode === body && body.removeChild(element);
                }, 350);
            }
            return mask;
        };
        mask.close = function() {
            if (callback) {
                if (callback() !== false) {
                    mask._remove();
                }
            } else {
                mask._remove();
            }
        };
        return mask;
    };
    $.fn.popover = function() {
        var args = arguments;
        this.each(function() {
            $.targets._popover = this;
            if (args[0] === 'show' || args[0] === 'hide' || args[0] === 'toggle') {
                togglePopover(this, args[1], args[0]);
            }
        });
    };

})(wch, window, document, 'popover');
/**
 * 选择列表插件
 * varstion 2.0.0
 * by Houfeng
 * Houfeng@DCloud.io
 */

(function($, window, document, undefined) {

    var MAX_EXCEED = 30;
    var VISIBLE_RANGE = 90;
    var DEFAULT_ITEM_HEIGHT = 40;
    var BLUR_WIDTH = 10;

    var rad2deg = $.rad2deg = function(rad) {
        return rad / (Math.PI / 180);
    };

    var deg2rad = $.deg2rad = function(deg) {
        return deg * (Math.PI / 180);
    };

    var platform = navigator.platform.toLowerCase();
    var userAgent = navigator.userAgent.toLowerCase();
    var isIos = (userAgent.indexOf('iphone') > -1 ||
            userAgent.indexOf('ipad') > -1 ||
            userAgent.indexOf('ipod') > -1) &&
        (platform.indexOf('iphone') > -1 ||
            platform.indexOf('ipad') > -1 ||
            platform.indexOf('ipod') > -1);
    //alert(isIos);

    var Picker = $.Picker = function(holder, options) {
        var self = this;
        self.holder = holder;
        self.options = options || {};
        self.init();
        self.initInertiaParams();
        self.calcElementItemPostion(true);
        self.bindEvent();
    };

    Picker.prototype.findElementItems = function() {
        var self = this;
        self.elementItems = [].slice.call(self.holder.querySelectorAll('li'));
        return self.elementItems;
    };

    Picker.prototype.init = function() {
        var self = this;
        self.list = self.holder.querySelector('ul');
        self.findElementItems();
        self.height = self.holder.offsetHeight;
        self.r = self.height / 2 - BLUR_WIDTH;
        self.d = self.r * 2;
        self.itemHeight = self.elementItems.length > 0 ? self.elementItems[0].offsetHeight : DEFAULT_ITEM_HEIGHT;
        self.itemAngle = parseInt(self.calcAngle(self.itemHeight * 0.8));
        self.hightlightRange = self.itemAngle / 2;
        self.visibleRange = VISIBLE_RANGE;
        self.beginAngle = 0;
        self.beginExceed = self.beginAngle - MAX_EXCEED;
        self.list.angle = self.beginAngle;
        if (isIos) {
            self.list.style.webkitTransformOrigin = "center center " + self.r + "px";
        }
    };

    Picker.prototype.calcElementItemPostion = function(andGenerateItms) {
        var self = this;
        if (andGenerateItms) {
            self.items = [];
        }
        self.elementItems.forEach(function(item) {
            var index = self.elementItems.indexOf(item);
            self.endAngle = self.itemAngle * index;
            item.angle = self.endAngle;
            item.style.webkitTransformOrigin = "center center -" + self.r + "px";
            item.style.webkitTransform = "translateZ(" + self.r + "px) rotateX(" + (-self.endAngle) + "deg)";
            if (andGenerateItms) {
                var dataItem = {};
                dataItem.text = item.innerHTML || '';
                dataItem.value = item.getAttribute('data-value') || dataItem.text;
                self.items.push(dataItem);
            }
        });
        self.endExceed = self.endAngle + MAX_EXCEED;
        self.calcElementItemVisibility(self.beginAngle);
    };

    Picker.prototype.calcAngle = function(c) {
        var self = this;
        var a = b = parseFloat(self.r);
        //直径的整倍数部分直接乘以 180
        c = Math.abs(c); //只算角度不关心正否值
        var intDeg = parseInt(c / self.d) * 180;
        c = c % self.d;
        //余弦
        var cosC = (a * a + b * b - c * c) / (2 * a * b);
        var angleC = intDeg + rad2deg(Math.acos(cosC));
        return angleC;
    };

    Picker.prototype.calcElementItemVisibility = function(angle) {
        var self = this;
        self.elementItems.forEach(function(item) {
            var difference = Math.abs(item.angle - angle);
            if (difference < self.hightlightRange) {
                item.classList.add('highlight');
            } else if (difference < self.visibleRange) {
                item.classList.add('visible');
                item.classList.remove('highlight');
            } else {
                item.classList.remove('highlight');
                item.classList.remove('visible');
            }
        });
    };

    Picker.prototype.setAngle = function(angle) {
        var self = this;
        self.list.angle = angle;
        self.list.style.webkitTransform = "perspective(1000px) rotateY(0deg) rotateX(" + angle + "deg)";
        self.calcElementItemVisibility(angle);
    };

    Picker.prototype.bindEvent = function() {
        var self = this;
        var lastAngle = 0;
        var startY = null;
        var isPicking = false;
        self.holder.addEventListener($.EVENT_START, function(event) {
            isPicking = true;
            event.preventDefault();
            self.list.style.webkitTransition = '';
            startY = (event.changedTouches ? event.changedTouches[0] : event).pageY;
            lastAngle = self.list.angle;
            self.updateInertiaParams(event, true);
        }, false);
        self.holder.addEventListener($.EVENT_END, function(event) {
            isPicking = false;
            event.preventDefault();
            self.startInertiaScroll(event);
        }, false);
        self.holder.addEventListener($.EVENT_CANCEL, function(event) {
            isPicking = false;
            event.preventDefault();
            self.startInertiaScroll(event);
        }, false);
        self.holder.addEventListener($.EVENT_MOVE, function(event) {
            if (!isPicking) {
                return;
            }
            event.preventDefault();
            var endY = (event.changedTouches ? event.changedTouches[0] : event).pageY;
            var dragRange = endY - startY;
            var dragAngle = self.calcAngle(dragRange);
            var newAngle = dragRange > 0 ? lastAngle - dragAngle : lastAngle + dragAngle;
            if (newAngle > self.endExceed) {
                newAngle = self.endExceed
            }
            if (newAngle < self.beginExceed) {
                newAngle = self.beginExceed
            }
            self.setAngle(newAngle);
            self.updateInertiaParams(event);
        }, false);
        //--
        self.list.addEventListener('tap', function(event) {
            elementItem = event.target;
            if (elementItem.tagName == 'LI') {
                self.setSelectedIndex(self.elementItems.indexOf(elementItem), 200);
            }
        }, false);
    };

    Picker.prototype.initInertiaParams = function() {
        var self = this;
        self.lastMoveTime = 0;
        self.lastMoveStart = 0;
        self.stopInertiaMove = false;
    };

    Picker.prototype.updateInertiaParams = function(event, isStart) {
        var self = this;
        var point = event.changedTouches ? event.changedTouches[0] : event;
        if (isStart) {
            self.lastMoveStart = point.pageY;
            self.lastMoveTime = event.timeStamp || Date.now();
            self.startAngle = self.list.angle;
        } else {
            var nowTime = event.timeStamp || Date.now();
            if (nowTime - self.lastMoveTime > 300) {
                self.lastMoveTime = nowTime;
                self.lastMoveStart = point.pageY;
            }
        }
        self.stopInertiaMove = true;
    };

    Picker.prototype.startInertiaScroll = function(event) {
        var self = this;
        var point = event.changedTouches ? event.changedTouches[0] : event;
        /** 
         * 缓动代码
         */
        var nowTime = event.timeStamp || Date.now();
        var v = (point.pageY - self.lastMoveStart) / (nowTime - self.lastMoveTime); //最后一段时间手指划动速度  
        var dir = v > 0 ? -1 : 1; //加速度方向  
        var deceleration = dir * 0.0006 * -1;
        var duration = Math.abs(v / deceleration); // 速度消减至0所需时间  
        var dist = v * duration / 2; //最终移动多少 
        var startAngle = self.list.angle;
        var distAngle = self.calcAngle(dist) * dir;
        //----
        var srcDistAngle = distAngle;
        if (startAngle + distAngle < self.beginExceed) {
            distAngle = self.beginExceed - startAngle;
            duration = duration * (distAngle / srcDistAngle) * 0.6;
        }
        if (startAngle + distAngle > self.endExceed) {
            distAngle = self.endExceed - startAngle;
            duration = duration * (distAngle / srcDistAngle) * 0.6;
        }
        //----
        if (distAngle == 0) {
            self.endScroll();
            return;
        }
        self.scrollDistAngle(nowTime, startAngle, distAngle, duration);
    };

    Picker.prototype.scrollDistAngle = function(nowTime, startAngle, distAngle, duration) {
        var self = this;
        self.stopInertiaMove = false;
        (function(nowTime, startAngle, distAngle, duration) {
            var frameInterval = 13;
            var stepCount = duration / frameInterval;
            var stepIndex = 0;
            (function inertiaMove() {
                if (self.stopInertiaMove) return;
                var newAngle = self.quartEaseOut(stepIndex, startAngle, distAngle, stepCount);
                self.setAngle(newAngle);
                stepIndex++;
                if (stepIndex > stepCount - 1 || newAngle < self.beginExceed || newAngle > self.endExceed) {
                    self.endScroll();
                    return;
                }
                setTimeout(inertiaMove, frameInterval);
            })();
        })(nowTime, startAngle, distAngle, duration);
    };

    Picker.prototype.quartEaseOut = function(t, b, c, d) {
        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
    };

    Picker.prototype.endScroll = function() {
        var self = this;
        if (self.list.angle < self.beginAngle) {
            self.list.style.webkitTransition = "150ms ease-out";
            self.setAngle(self.beginAngle);
        } else if (self.list.angle > self.endAngle) {
            self.list.style.webkitTransition = "150ms ease-out";
            self.setAngle(self.endAngle);
        } else {
            var index = parseInt((self.list.angle / self.itemAngle).toFixed(0));
            self.list.style.webkitTransition = "100ms ease-out";
            self.setAngle(self.itemAngle * index);
        }
        self.triggerChange();
    };

    Picker.prototype.triggerChange = function(force) {
        var self = this;
        setTimeout(function() {
            var index = self.getSelectedIndex();
            var item = self.items[index];
            if ($.trigger && (index != self.lastIndex || force === true)) {
                $.trigger(self.holder, 'change', {
                    "index": index,
                    "item": item
                });
            }
            self.lastIndex = index;
            typeof force === 'function' && force();
        }, 0);
    };

    Picker.prototype.correctAngle = function(angle) {
        var self = this;
        if (angle < self.beginAngle) {
            return self.beginAngle;
        } else if (angle > self.endAngle) {
            return self.endAngle;
        } else {
            return angle;
        }
    };

    Picker.prototype.setItems = function(deafult, items) {
        var self = this;
        self.items = items || [];
        var buffer = [];
        self.items.forEach(function(item) {
            if (item !== null && item !== undefined) {
                buffer.push('<li>' + (item.text || item) + '</li>');
            }
        });
        self.list.innerHTML = buffer.join('');
        self.findElementItems();
        self.calcElementItemPostion();
        if (deafult && deafult !== undefined) {
            for (var index in items) {
                if (deafult.indexOf(items[index].text) > -1) {
                    var angle = self.itemAngle * index;
                    self.setAngle(self.correctAngle(angle));
                }
            }
        } else if (deafult === undefined) {
            self.setAngle(self.correctAngle(self.list.angle));
        } else {
            self.setAngle(self.correctAngle(0));
        }
        self.triggerChange(true);
    };

    Picker.prototype.getItems = function() {
        var self = this;
        return self.items;
    };

    Picker.prototype.getSelectedIndex = function() {
        var self = this;
        return parseInt((self.list.angle / self.itemAngle).toFixed(0));
    };

    Picker.prototype.setSelectedIndex = function(index, duration, callback) {
        var self = this;
        self.list.style.webkitTransition = '';
        var angle = self.correctAngle(self.itemAngle * index);
        if (duration && duration > 0) {
            var distAngle = angle - self.list.angle;
            self.scrollDistAngle(Date.now(), self.list.angle, distAngle, duration);
        } else {
            self.setAngle(angle);
        }
        self.triggerChange(callback);
    };

    Picker.prototype.getSelectedItem = function() {
        var self = this;
        return self.items[self.getSelectedIndex()];
    };

    Picker.prototype.getSelectedValue = function() {
        var self = this;
        return (self.items[self.getSelectedIndex()] || {}).value;
    };

    Picker.prototype.getSelectedText = function() {
        var self = this;
        return (self.items[self.getSelectedIndex()] || {}).text;
    };

    Picker.prototype.setSelectedValue = function(value, duration, callback) {
        var self = this;
        if (value == '') {
            for (var index in self.items) {
                var item = self.items[index];
                if (value.indexOf(item.text) > -1) {
                    self.setSelectedIndex(index, duration, callback);
                    return;
                }
            }
        } else {
            self.setItems(value, self.items);
        }

    };

    if ($.fn) {
        $.fn.picker = function(options) {
            //遍历选择的元素
            this.each(function(i, element) {
                if (element.picker) return;
                if (options) {
                    element.picker = new Picker(element, options);
                } else {
                    var optionsText = element.getAttribute('data-picker-options');
                    var _options = optionsText ? JSON.parse(optionsText) : {};
                    element.picker = new Picker(element, _options);
                }
            });
            return this[0] ? this[0].picker : null;
        };

        //自动初始化
        $.ready(function() {
            $('.wch-picker').picker();
        });
    }

})(window.wch || window, window, document, undefined);
//end
/**
 * 弹出选择列表插件
 * varstion 1.0.1
 * by Houfeng
 * Houfeng@DCloud.io
 */

(function($, document) {

    //创建 DOM
    $.dom = function(str) {
        if (typeof(str) !== 'string') {
            if ((str instanceof Array) || (str[0] && str.length)) {
                return [].slice.call(str);
            } else {
                return [str];
            }
        }
        if (!$.__create_dom_div__) {
            $.__create_dom_div__ = document.createElement('div');
        }
        $.__create_dom_div__.innerHTML = str;
        return [].slice.call($.__create_dom_div__.childNodes);
    };

    var panelBuffer = '<div class="wch-poppicker">\
        <div class="wch-poppicker-header">\
            <a class="wch-btn wch-poppicker-btn-cancel">取消</a>\
            <a class="wch-btn wch-btn-blue wch-poppicker-btn-ok">确定</a>\
            <div class="wch-poppicker-clear"></div>\
        </div>\
        <div class="wch-poppicker-body">\
        </div>\
    </div>';

    var pickerBuffer = '<div class="wch-picker">\
        <div class="wch-picker-inner">\
            <div class="wch-pciker-rule wch-pciker-rule-ft"></div>\
            <ul class="wch-pciker-list">\
            </ul>\
            <div class="wch-pciker-rule wch-pciker-rule-bg"></div>\
        </div>\
    </div>';

    //定义弹出选择器类
    var PopPicker = $.PopPicker = $.Class.extend({
        //构造函数
        init: function(options) {
            var self = this;
            self.options = options || {};
            self.tmpValue = options.deafultValue;
            self.options.buttons = self.options.buttons || ['取消', '确定'];
            self.clicked = 'ok';
            self.panel = $.dom(panelBuffer)[0];
            document.body.appendChild(self.panel);
            self.ok = self.panel.querySelector('.wch-poppicker-btn-ok');
            self.cancel = self.panel.querySelector('.wch-poppicker-btn-cancel');
            self.body = self.panel.querySelector('.wch-poppicker-body');
            self.mask = $.createMask();
            self.cancel.innerText = self.options.buttons[0];
            self.ok.innerText = self.options.buttons[1];
            self.cancel.addEventListener('tap', function(event) {
                if (self.tmpValue) self.options.deafultValue = self.tmpValue;
                self.clicked = 'cancel';
                self.hide();
            }, false);
            self.ok.addEventListener('tap', function(event) {
                self.tmpValue = undefined;
                if (self.callback) {
                    var rs = self.callback(self.getSelectedItems());
                    if (rs !== false) {
                        self.clicked = 'ok';
                        self.hide();
                    }
                }
            }, false);
            self.mask[0].addEventListener('tap', function() {
                if (self.tmpValue) self.options.deafultValue = self.tmpValue;
                self.clicked = 'cancel';
                self.hide();
            }, false);
            self._createPicker();
            //防止滚动穿透
            self.panel.addEventListener($.EVENT_START, function(event) {
                event.preventDefault();
            }, false);
            self.panel.addEventListener($.EVENT_MOVE, function(event) {
                event.preventDefault();
            }, false);
        },
        _createPicker: function() {
            var self = this;
            var layer = self.options.layer || 1;
            var width = (100 / layer) + '%';
            self.pickers = [];
            for (var i = 1; i <= layer; i++) {
                var pickerElement = $.dom(pickerBuffer)[0];
                pickerElement.style.width = width;
                self.body.appendChild(pickerElement);
                var picker = $(pickerElement).picker();
                self.pickers.push(picker);
                pickerElement.addEventListener('change', function(event) {
                    var nextPickerElement = this.nextSibling;
                    if (nextPickerElement && nextPickerElement.picker) {
                        var eventData = event.detail || {};
                        var preItem = eventData.item || {};
                        nextPickerElement.picker.setItems(self.options.deafultValue, preItem.children);
                    }
                }, false);
            }
        },
        //填充数据
        setData: function(data) {
            var self = this;
            data = data || [];
            self.pickers[0].setItems(undefined, data);
        },
        //获取选中的项（数组）
        getSelectedItems: function() {
            var self = this;
            var items = [];
            for (var i in self.pickers) {
                var picker = self.pickers[i];
                items.push(picker.getSelectedItem() || {});
            }
            return items;
        },
        //显示
        show: function(callback) {
            var self = this;
            self.tmpValue = self.options.deafultValue;
            self.options.deafultValue = '';
            self.callback = callback;
            self.mask.show();
            document.body.classList.add($.className('poppicker-active-for-page'));
            self.panel.classList.add($.className('active'));
            //处理物理返回键
            self.__back = $.back;
            $.back = function() {
                self.hide();
            };
        },
        //隐藏
        hide: function() {
            var self = this;
            if (self.disposed) return;
            self.panel.classList.remove($.className('active'));
            self.mask.close();
            document.body.classList.remove($.className('poppicker-active-for-page'));
            //处理物理返回键
            $.back = self.__back;
        },
        dispose: function() {
            var self = this;
            self.hide();
            setTimeout(function() {
                self.panel.parentNode.removeChild(self.panel);
                for (var name in self) {
                    self[name] = null;
                    delete self[name];
                };
                self.disposed = true;
            }, 300);
        }
    });

})(wch, document);
