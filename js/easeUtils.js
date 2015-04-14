var easeUtils = (function(exports){
    function linear(e) {
        return e;
    }
    function easeInQuad(e) {
        return e * e;
    }
    function easeOutQuad(e) {
        return e * (2 - e);
    }
    function easeInOutQuad(e) {
        if ((e *= 2) < 1) return 0.5 * e * e;
        return - 0.5 * (--e * (e - 2) - 1);
    }
    function easeInCubic(e) {
        return e * e * e;
    }
    function easeOutCubic(e) {
        return --e * e * e + 1;
    }
    function easeInOutCubic(e) {
        if ((e *= 2) < 1) return 0.5 * e * e * e;
        return 0.5 * ((e -= 2) * e * e + 2);
    }
    function easeInQuart(e) {
        return e * e * e * e;
    }
    function easeOutQuart(e) {
        return 1 - --e * e * e * e;
    }
    function easeInOutQuart(e) {
        if ((e *= 2) < 1) return 0.5 * e * e * e * e;
        return - 0.5 * ((e -= 2) * e * e * e - 2);
    }
    function easeInQuint(e) {
        return e * e * e * e * e;
    }
    function easeOutQuint(e) {
        return --e * e * e * e * e + 1;
    }
    function easeInOutQuint(e) {
        if ((e *= 2) < 1) return 0.5 * e * e * e * e * e;
        return 0.5 * ((e -= 2) * e * e * e * e + 2);
    }
    function easeInSine(e) {
        return 1 - Math.cos(e * Math.PI / 2);
    }
    function easeOutSine(e) {
        return Math.sin(e * Math.PI / 2);
    }
    function easeInOutSine(e) {
        return 0.5 * (1 - Math.cos(Math.PI * e));
    }
    function easeInExpo(e) {
        return e === 0 ? 0 : Math.pow(1024, e - 1);
    }
    function easeOutExpo(e) {
        return e === 1 ? 1 : 1 - Math.pow(2, -10 * e);
    }
    function easeInOutExpo(e) {
        if (e === 0) return 0;
        if (e === 1) return 1;
        if ((e *= 2) < 1) return 0.5 * Math.pow(1024, e - 1);
        return 0.5 * (-Math.pow(2, -10 * (e - 1)) + 2);
    }
    function easeInCirc(e) {
        return 1 - Math.sqrt(1 - e * e);
    }
    function easeOutCirc(e) {
        return Math.sqrt(1 - --e * e);
    }
    function easeInOutCirc(e) {
        if ((e *= 2) < 1) return - 0.5 * (Math.sqrt(1 - e * e) - 1);
        return 0.5 * (Math.sqrt(1 - (e -= 2) * e) + 1);
    }
    function easeInElastic(e) {
        var t, n =0.1,
            r =0.4;
        if (e === 0) return 0;
        if (e === 1) return 1;
        if (!n || n < 1) {
            n = 1;
            t = r / 4;
        } else t = r * Math.asin(1 / n) / (2 * Math.PI);
        return -(n * Math.pow(2, 10 * (e -= 1)) * Math.sin((e - t) * 2 * Math.PI / r));
    }
    function easeOutElastic(e) {
        var t, n =0.1,
            r =0.4;
        if (e === 0) return 0;
        if (e === 1) return 1;
        if (!n || n < 1) {
            n = 1;
            t = r / 4;
        } else t = r * Math.asin(1 / n) / (2 * Math.PI);
        return n * Math.pow(2, -10 * e) * Math.sin((e - t) * 2 * Math.PI / r) + 1;
    }
    function easeInOutElastic(e) {
        var t, n =0.1,
            r =0.4;
        if (e === 0) return 0;
        if (e === 1) return 1;
        if (!n || n < 1) {
            n = 1;
            t = r / 4;
        } else t = r * Math.asin(1 / n) / (2 * Math.PI);
        if ((e *= 2) < 1) return - 0.5 * n * Math.pow(2, 10 * (e -= 1)) * Math.sin((e - t) * 2 * Math.PI / r);
        return n * Math.pow(2, -10 * (e -= 1)) * Math.sin((e - t) * 2 * Math.PI / r) *0.5 + 1;
    }
    function easeInBack(e) {
        var t = 1.70158;
        return e * e * ((t + 1) * e - t);
    }
    function easeOutBack(e) {
        var t = 1.70158;
        return --e * e * ((t + 1) * e + t) + 1;
    }
    function easeInOutBack(e) {
        var t = 1.70158 * 1.525;
        if ((e *= 2) < 1) return 0.5 * e * e * ((t + 1) * e - t);
        return 0.5 * ((e -= 2) * e * ((t + 1) * e + t) + 2);
    }
    function easeInBounce(e) {
        return 1 - easeOutBounce(1 - e);
    }
    function easeOutBounce(e) {
        if (e < 1 / 2.75) {
            return 7.5625 * e * e;
        } else if (e < 2 / 2.75) {
            return 7.5625 * (e -= 1.5 / 2.75) * e +0.75;
        } else if (e < 2.5 / 2.75) {
            return 7.5625 * (e -= 2.25 / 2.75) * e +0.9375;
        } else {
            return 7.5625 * (e -= 2.625 / 2.75) * e +0.984375;
        }
    }
    function easeInOutBounce(e) {
        if (e <0.5) return easeOutBounce(e * 2) *0.5;
        return easeOutBounce(e * 2 - 1) *0.5 +0.5;
    }

    exports.linear = linear;
    exports.easeInQuad = easeInQuad;
    exports.easeOutQuad = easeOutQuad;
    exports.easeInOutQuad = easeInOutQuad;
    exports.easeInCubic = easeInCubic;
    exports.easeOutCubic = easeOutCubic;
    exports.easeInOutCubic = easeInOutCubic;
    exports.easeInQuart = easeInQuart;
    exports.easeOutQuart = easeOutQuart;
    exports.easeInOutQuart = easeInOutQuart;
    exports.easeInQuint = easeInQuint;
    exports.easeOutQuint = easeOutQuint;
    exports.easeInOutQuint = easeInOutQuint;
    exports.easeInSine = easeInSine;
    exports.easeOutSine = easeOutSine;
    exports.easeInOutSine = easeInOutSine;
    exports.easeInExpo = easeInExpo;
    exports.easeOutExpo = easeOutExpo;
    exports.easeInOutExpo = easeInOutExpo;
    exports.easeInCirc = easeInCirc;
    exports.easeOutCirc = easeOutCirc;
    exports.easeInOutCirc = easeInOutCirc;
    exports.easeInElastic = easeInElastic;
    exports.easeOutElastic = easeOutElastic;
    exports.easeInOutElastic = easeInOutElastic;
    exports.easeInBack = easeInBack;
    exports.easeOutBack = easeOutBack;
    exports.easeInOutBack = easeInOutBack;
    exports.easeInBounce = easeInBounce;
    exports.easeOutBounce = easeOutBounce;
    exports.easeInOutBounce = easeInOutBounce;

    return exports;

}({}));
