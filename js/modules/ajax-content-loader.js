define(["require", "exports"], function (a, b) {
    b.ajaxLoader = function (a) {
        function g() {
            for (var a = 0; a < n.length; a++) {
                if (n[a].removeEvent) {
                    n[a].removeEvent("onload")
                }
            }
        }
        function f(a) {
            var b = l[a];
            if (b != undefined) {
                $.ajax({
                    url: b.url,
                    cache: b.cache,
                    dataType: b.dataType || "text",
                    success: function (a) {
                        $('#scrollWrap').append(a);
                        e(b.images)
                    }
                })
            }
        }
        function e(a) {
            h = a;
            var b = new Array;
            for (i = 0; i < h.length; i++) b[i] = d(h[i])
        }
        function d(a) {
            var b = new Image;
            if (b.addEventListener) {
                b.addEventListener("load", c, false)
            } else if (b.attachEvent) {
                b.attachEvent("onload", c)
            }
            b.src = a;
            n.push(b);
            return b
        }
        function c() {
            j++;
            if (j == h.length) {
                j = 0;
                if (k < l.length) {
                    l[k].success && l[k].success();
                    k++;
                    f(k);
                    g()
                }
            }
        }
        function b(a) {
            l = a.contentToLoad;
            f(k)
        }
        var h;
        var j = new Number(0);
        var k = new Number(0);
        var l;
        var n = [];
        var o = {
            initWithSettings: b
        };
        o.initWithSettings(a);
        return o
    }
})