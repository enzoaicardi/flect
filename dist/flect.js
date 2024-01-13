var Flect = (function () {
    "use strict";
    const t = (t, n, s, o) => {
        const r = n.handler || (n.handler = new e());
        (r[o] = s(t)), n.addEventListener(o, r);
    };
    class e {
        t(t) {
            this[t.type](t);
        }
    }
    const n = document,
        s = (t) => n.createElement(t),
        o = (t, e) => t.cloneNode(e),
        r = (t) => t.children,
        c = (t) => t.o || t.children,
        l = (t, e) => t.name.substring(e),
        i = (t) => 0 === t.name.indexOf("x-"),
        f = (t) => 0 === t.tagName.indexOf("X-"),
        u = (t) => !!t.content,
        a = (t) => !!J[t.tagName] || u(t),
        p = {
            l(t) {
                let e = this;
                e.i || (e.i = t || {}), e.u || (e.u = new Set());
            },
            p() {
                this.h();
            },
            m(t, e, n) {
                let s = this,
                    o = e.length - 1;
                for (; o >= 0; ) {
                    const r = e[o],
                        l = t[r.v];
                    if ((r.g && ((l.$ = r.S), (n || s.u).add(l)), !n))
                        for (const [t, e] of r.j) {
                            const n = e.k(s.i, l, e.O, t);
                            n && s.u.add(n);
                        }
                    if (r.S) {
                        (!r.g || (n = !a(l) && (l.u = new Set()))) &&
                            s.m(c(l), r.S, n);
                    }
                    o--;
                }
            },
            h() {
                for (const t of this.u) t.p && t.p();
                this.u.clear();
            },
        };
    function h(t) {
        this.l(t);
    }
    h.prototype = p;
    let d = null;
    const x = (t) => {
            const e = function (t) {
                if (void 0 !== t) {
                    e.data = t;
                    for (const t of e.C) t();
                } else d && (e.C.add(d), d.F.add(e.C));
                return e.data;
            };
            return (
                (e.data = t), (e.L = !0), (e.C = new Set()), (e.effect = e.C), e
            );
        },
        y = (t) => {
            const e = d;
            return (
                (d = t),
                (d.F = new Set()),
                (d.p = ((t) => () => {
                    for (const e of t.F) e.delete(t);
                })(d)),
                t(),
                (d = e),
                t
            );
        };
    let m = n.createComment(""),
        v = s("template"),
        w = n.createDocumentFragment();
    const b = () => {},
        g = (t, ...e) =>
            t.reduce(
                (n, s, o) => n + (s + (o === t.length - 1 ? "" : e[o])),
                ""
            ),
        $ = s("style"),
        E = "css-x";
    let S = 1;
    const j = (t, e) => "$" + (e || S) + t,
        k = (t, ...e) => {
            if ("string" == typeof t) return `${E}="${j(t, S)}"`;
            {
                const s = g(t, e);
                ($.textContent += s), $.parentElement || n.head.appendChild($);
            }
        },
        O = (t, e, n) => {
            const s = n,
                o = t.component.M;
            e.setAttribute(E, j(s, o));
        },
        C = (t, e, n) => {
            const s = n,
                o = t.ref(s);
            let r = !0;
            return y(() => {
                const t = o.H();
                if (r) {
                    for (const n of t) n(e);
                    r = !1;
                } else t[t.length - 1](e);
            });
        },
        F = (t, e, n) => {
            const s = e.style.display;
            return y(() => {
                n(t)
                    ? s
                        ? (e.style.display = s)
                        : e.style.removeProperty("display")
                    : (e.style.display = "none");
            });
        },
        L = (t, e, n) => y(() => (e.textContent = n(t))),
        M = (t, e, n, s) => y(() => e.setAttribute(s, n(t))),
        H = (t) =>
            "x-text" === t
                ? L
                : "x-show" === t
                ? F
                : "x-ref" === t
                ? C
                : "x-css" === t
                ? O
                : M,
        U = (t, e, n, s) => {
            e.i || (e.i = {});
            let o = null;
            const r = { U: (t, e) => (o = { X: t, R: e }) },
                c = y(() => {
                    const o = e.i[s],
                        c = n(t);
                    o && o.L ? r.U(o, c) : (e.i[s] = c);
                });
            return o && o.X(o.R), (r.U = (t, e) => t(e)), c;
        },
        X = {},
        R = (t) => {
            if (X[t]) return X[t];
            let e = Object.getPrototypeOf(function () {}).constructor,
                n =
                    /^[\n\s]*if.*\(.*\)/.test(t.trim()) ||
                    /^(let|const)\s/.test(t.trim())
                        ? `(()=>{ ${t} })()`
                        : t;
            let s = (() => {
                try {
                    let s = new e(["scope"], `with(scope){return ${n}};`);
                    return (
                        Object.defineProperty(s, "name", {
                            value: `FlectExpression ${t}`,
                        }),
                        s
                    );
                } catch (e) {
                    return console.error("FlectExpression error : " + t, e), !1;
                }
            })();
            return (X[t] = s), s;
        },
        T = (t, e, n) => {
            let s = [];
            const c = [{ T: q() }],
                l = e.getAttribute("key") || "item";
            return (
                (e.p = () => {
                    for (let t = 1; t < c.length; t++) c[t].V.p();
                }),
                e.replaceWith(c[0].T),
                y(() => {
                    const i = n(t);
                    !(function (t, e, n, s, c, l) {
                        const i = e.content;
                        let f = 0;
                        const u = n.length,
                            a = s.length;
                        let p = a - u;
                        for (; f < u && f < a; )
                            n[f] !== s[f] && c[f + 1].X(s[f]), f++;
                        const h = [],
                            d = c[f].T;
                        for (; p > 0; ) {
                            let n;
                            const u = o(i, !0);
                            (n = c[f + 1])
                                ? n.X(s[f])
                                : (n = c[f + 1] = z(t, l, s[f])),
                                h.push(u, n.T),
                                e.$ && n.V.m(r(u), e.$),
                                p--,
                                f++;
                        }
                        h.length && d.replaceWith(d, ...h);
                        for (; p < 0; ) {
                            let t = c[f].T.nextSibling;
                            const e = c[f + 1].T;
                            for (c[f + 1].V.p(); t !== e; ) {
                                const e = t;
                                (t = t.nextSibling), e.remove();
                            }
                            p++, f++;
                        }
                    })(t, e, s, i, c, l),
                        (s = i);
                })
            );
        };
    const V = (t, e, n) =>
            y(() => {
                n(t);
            }),
        q = () => o(m),
        z = (t, e, n) => {
            const s = q(),
                o = x(n);
            return { T: s, X: o, V: new h({ ...t, [e]: o }) };
        };
    let A = {},
        B = null;
    const D = (t) => {
            A[t] && (A[t](), (A[t] = !1));
        },
        G = (e) => {
            const n = [];
            for (let o = 0; o < e.length; o++) {
                let r = e[o];
                const a = u(r),
                    p = !a && f(r),
                    h = { v: o, S: !1, g: a || p, j: new Map() };
                p && B && B(r.tagName);
                let d = r.attributes.length;
                for (; d--; ) {
                    const e = r.attributes[d];
                    if (i(e)) {
                        const n = 0 === e.name.indexOf("x-on:"),
                            o = l(e, n ? 5 : 2),
                            c = {
                                O:
                                    "ref" === o || "css" === o || "route" === o
                                        ? e.value
                                        : R(e.value || ""),
                                k: p
                                    ? U
                                    : a
                                    ? "x-for" === (s = e.name)
                                        ? T
                                        : "x-if" === s
                                        ? V
                                        : void 0
                                    : n
                                    ? t
                                    : H(e.name),
                            };
                        h.j.set(o, c), !p && r.removeAttribute(e.name);
                    }
                }
                const x = c((r = r.content || r));
                x.length && (h.S = G(x)), (h.j.size || h.S) && n.push(h);
            }
            var s;
            return n.length > 0 && n;
        };
    class I extends HTMLElement {
        constructor() {
            super(), this.l(), (this.q = {});
        }
        onMount() {}
        connectedCallback() {
            let t = this,
                e = t.i;
            for (const n of t.attributes)
                if (i(n)) {
                    const t = l(n, 2);
                    e[t] = x(e[t]);
                } else e[n.name] = n.value || !0;
            (e.component = t), (e.ref = t.A), t.onMount(e), t.B();
        }
        onUnmount() {}
        p() {
            let t = this;
            t.onUnmount(t.i), t.h();
        }
        B() {
            let t = this;
            const e = t.D;
            let n = e.G,
                s = e.S,
                c = e.M;
            const l = n ? b : g,
                i = c ? b : k,
                f = e.I.call(t.i, x, l, i);
            if (
                (f &&
                    ("string" == typeof f
                        ? ((n = e.G =
                              ((t) => {
                                  let e = o(v);
                                  return (e.innerHTML = t), e.content;
                              })(f)),
                          (s = e.S = G(r(n))))
                        : ((n =
                              f === t
                                  ? t
                                  : ((t) => {
                                        let e = o(w);
                                        return e.append(...t), e;
                                    })(f)),
                          (s = t.$ || G(t.o || r(n))))),
                (t.M = e.M = c || S++),
                e.G && (n = o(n, !0)),
                s && t.m(t.o || r(n), s),
                n !== t)
            ) {
                const e = t.parentNode;
                e.o || (e.o = [].slice.call(r(e))), t.replaceWith(n);
            }
        }
        A(t, e) {
            const n = this.component.q,
                s =
                    n[t] ||
                    (n[t] = (() => {
                        const t = [];
                        return (t.H = x([])), t;
                    })());
            if (!e) return s;
            s.push(e), s.H(s);
        }
    }
    Object.assign(I.prototype, p);
    const J = {};
    let K = location;
    const N = () => K.pathname + K.search,
        P = x(N());
    addEventListener("popstate", () => {
        (K = location), P(N());
    });
    const Q = (t) => {
        if ("string" == typeof t)
            (K = new URL(t, K)), history.pushState({}, "", K), P(N());
        else {
            t.preventDefault();
            const e = t.currentTarget.href;
            if (e) return Q(e);
        }
        return N();
    };
    return {
        define: (t, e) => {
            const n = "X-" + t.toUpperCase();
            return (
                (J[n] = class extends I {
                    constructor() {
                        super();
                    }
                }),
                (J[n].I = e),
                (J[n].prototype.D = J[n]),
                customElements.define(`x-${t}`, J[n]),
                J[n]
            );
        },
        signal: x,
        observe: (t) => {
            (A = Object.assign(t, A)), (B = D);
        },
        navigate: Q,
    };
})();
