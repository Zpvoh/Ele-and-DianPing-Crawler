
var a = new function () {
    var e = Math.round, t = Math.max, n = Math.pow, a = Math.log, r = "0123456789bcdefghjkmnpqrstuvwxyz", i = new RegExp("^[" + r + "]+$"), o = function () {
    };
    o.prototype = {
        minlat: -90, maxlat: 90, minlng: -180, maxlng: 180, halfLat: function () {
            return (this.minlat + this.maxlat) / 2
        }, halfLng: function () {
            return (this.minlng + this.maxlng) / 2
        }
    }, this.encode = function (e, a) {
        if (e instanceof Array && null == a && (a = e[1], e = e[0]), e *= 1, a *= 1, e !== e)throw new Error("Geohash.encode: lat must be a Number");
        if (a !== a)throw new Error("Geohash.encode: lng must be a Number");
        for (var i, s, c = e.toString().length - e.toFixed().length - 2, l = a.toString().length - e.toFixed().length - 2, u = n(10, -t(c, l, 0)) / 2, d = new o, f = [], p = 180, h = !0, m = 0, g = 4; p >= u;)if (h ? (i = d.halfLng(), a > i ? (m |= 1 << g, d.minlng = i) : d.maxlng = i) : (i = d.halfLat(), e > i ? (m |= 1 << g, d.minlat = i) : d.maxlat = i), h = !h, g) g--; else {
            if (s = p, p = t(d.maxlng - d.minlng, d.maxlat - d.minlat), s === p)break;
            f.push(r[m]), g = 4, m = 0
        }
        return f.join("")
    }, this.decode = function (s) {
        if (!i.test(s))throw new Error("Geohash.decode: hash must be a geohash string");
        for (var c = new o, l = 90, u = 180, d = function (e, t, n) {
            var a = 1 << e;
            !(1 & e) ^ !(1 & n) ? a & t ? c.minlat = c.halfLat() : c.maxlat = c.halfLat() : a & t ? c.minlng = c.halfLng() : c.maxlng = c.halfLng()
        }, f = 0, p = s.length; p > f; f++) {
            for (var h = r.indexOf(s[f]), m = 1 & f, g = 4; g >= 0; g--)d(g, h, m);
            m ? (l /= 8, u /= 4) : (l /= 4, u /= 8)
        }
        var b = n(10, t(1, -e(a(l) / a(10))) - 1), v = n(10, t(1, -e(a(u) / a(10))) - 1);
        return [e(c.halfLat() * b) / b, e(c.halfLng() * v) / v]
    }
};

//console.log(a.encode(38, 32))


