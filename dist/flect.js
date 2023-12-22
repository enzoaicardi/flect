var Flect = (function () {
    "use strict";
    function t(t, e, o, c) {
        const r = (e.t = e.t || new n());
        (r[c] = o(t)), e.addEventListener(c, r);
    }
    class n {
        o(t) {
            this[t.type](t);
        }
    }
    let e = null;
    function o(t) {
        const n = new Set(),
            o = function (t) {
                if (void 0 !== t) {
                    o.data = t;
                    for (const t of n) t();
                } else e && (n.add(e), e.u.add(n));
                return o.data;
            };
        return (o.data = t), (o.i = !0), o;
    }
    function c(t) {
        const n = e;
        return (e = t), (e.u = new Set()), t(), (e = n), t;
    }
    const r = document;
    r.createComment("");
    let s = r.createElement("template"),
        u = r.createDocumentFragment();
    function i(t, ...n) {
        return t.reduce(
            (e, o, c) => e + (o + (c === t.length - 1 ? "" : n[c])),
            ""
        );
    }
    function f(t) {
        let n = u.cloneNode();
        return n.append(...t), n;
    }
    const l = document,
        a = l.createElement("style"),
        d = "css-x";
    let h = 1;
    function x(t, n) {
        return "$" + (n || h) + t;
    }
    function p(t, ...n) {
        if ("string" == typeof t) return `${d}="${x(t, h)}"`;
        {
            const e = (function (t, n) {
                return t.reduce(
                    (e, o, c) => e + (o + (c === t.length - 1 ? "" : n[c])),
                    ""
                );
            })(t, n);
            (a.textContent += e), a.parentElement || l.head.appendChild(a);
        }
    }
    function m(t, n, e) {
        const o = e,
            r = t.l(o);
        let s = !0;
        return c(() => {
            const t = r.h();
            if (s) {
                for (const e of t) e(n);
                s = !1;
            } else t[t.length - 1](n);
        });
    }
    function w(t, n, e) {
        const o = n.style.display;
        return c(() => {
            e(t)
                ? o
                    ? (n.style.display = o)
                    : n.style.removeProperty("display")
                : (n.style.display = "none");
        });
    }
    function $(t, n, e) {
        return c(() => (n.textContent = e(t)));
    }
    function y(t) {
        switch (t.name) {
            case "x-text":
                return $;
            case "x-show":
                return w;
            case "x-ref":
                return m;
            case "x-css":
                return (function () {
                    const t = h;
                    return (n, e, o) => {
                        const c = o;
                        e.setAttribute(d, x(c, t));
                    };
                })();
            case "x-if":
            case "x-for":
                break;
            default:
                return E;
        }
    }
    function E(t, n, e, o) {
        return c(() => n.setAttribute(o, e(t)));
    }
    function b(t, n, e, r) {
        n.p = n.p || {};
        const s = n.p[r];
        return c(() => {
            const c = e(t);
            s.i ? s(c) : (n.p[r] = o(c));
        });
    }
    const v = {};
    function _(t) {
        if (v[t]) return v[t];
        let n = Object.getPrototypeOf(function () {}).constructor,
            e =
                /^[\n\s]*if.*\(.*\)/.test(t.trim()) ||
                /^(let|const)\s/.test(t.trim())
                    ? `(()=>{ ${t} })()`
                    : t;
        let o = (() => {
            try {
                let o = new n(["scope"], `with (scope) { return ${e} };`);
                return (
                    Object.defineProperty(o, "name", {
                        value: `FlectExpression ${t}`,
                    }),
                    o
                );
            } catch (n) {
                return console.error("FlectExpression error : " + t, n), !1;
            }
        })();
        return (v[t] = o), o;
    }
    function k(t) {
        return 0 === t.name.indexOf("x-on:");
    }
    function F(t) {
        return 0 === t.tagName.indexOf("X-");
    }
    function M(n) {
        const e = [];
        for (let o = 0; o < n.length; o++) {
            const c = n[o],
                r = F(c),
                s = { index: o, m: !1, $: !1, v: new Map() };
            let u = c.attributes.length;
            for (; u--; ) {
                const n = c.attributes[u];
                if (0 === n.name.indexOf("x-")) {
                    const e = k(n),
                        o = e ? n.name.substring(5) : n.name.substring(2),
                        u = {
                            _:
                                n.value &&
                                ("ref" === o || "css" === o
                                    ? n.value
                                    : _(n.value)),
                            k: r ? b : e ? t : y(n),
                        };
                    s.v.set(o, u), c.removeAttribute(n.name);
                }
            }
            c.children.length &&
                (r && (c = s.$ = f(c.children)), (s.m = M(c.children))),
                (s.m || s.v.size) && e.push(s);
        }
        return e.length > 0 && e;
    }
    function S() {}
    class g extends HTMLElement {
        constructor() {
            super();
            let t = this;
            (t.p = t.p || {}), (t.F = new Set()), (t.M = {});
        }
        onMount() {}
        connectedCallback() {
            let t = this;
            for (const n of t.attributes) t.p[n.name] = n.value;
            (t.p.l = (n, e) => {
                const c =
                    t.M[n] ||
                    (t.M[n] = (function () {
                        const t = [];
                        return (t.h = o([])), t;
                    })());
                if (!e) return c;
                c.push(e), c.h(c);
            }),
                t.onMount(),
                t.S();
        }
        onUnmount() {}
        g() {
            this.onUnmount(), this.clear(this.F);
        }
        S() {
            let t = this;
            const n = t.j || t.C;
            let e = n.$,
                c = n.m,
                r = n.O;
            const u = o,
                l = e ? S : i,
                a = r ? S : p,
                d = t.C.H.call(t.p, u, l, a);
            d &&
                (e ||
                    ((e =
                        "string" == typeof d
                            ? (n.$ = (function (t) {
                                  let n = s.cloneNode();
                                  return (n.innerHTML = t), n.content;
                              })(d))
                            : f(d)),
                    (c = n.m = M(e.children)))),
                n.$ && (e = e.cloneNode(!0)),
                r || (n.O = h++),
                c && t.L(e.children, c),
                t.parentNode.replaceChild(e, t);
        }
        L(t, n) {
            for (const e of n) {
                const n = t[e.index],
                    o = !!e.$;
                for (const [t, o] of e.v) {
                    const e = o.k(this.p, n, o._, t);
                    e && this.F.add(e);
                }
                o && e.$ ? (n.j = e) : !o && e.m && this.L(n.children, e.m);
            }
        }
        clear(t) {
            for (const n of t) for (const t of n.u) t.delete(n);
        }
    }
    const j = {};
    return {
        define: function (t, n) {
            const e = `__flect_${t}__`;
            if (window[e]) throw `customElement x-${t} is already defined !`;
            return (
                (j[e] = class extends g {
                    constructor() {
                        super();
                    }
                }),
                (j[e].H = n),
                (j[e].prototype.C = j[e]),
                customElements.define(`x-${t}`, j[e]),
                j[e]
            );
        },
    };
})();
