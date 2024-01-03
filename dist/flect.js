var Flect = (function () {
    "use strict";
    const t = (t, n, s, r) => {
        const o = (n.t = n.t || new e());
        (o[r] = s(t)), n.addEventListener(r, o);
    };
    class e {
        o(t) {
            this[t.type](t);
        }
    }
    const n = document,
        s = (t, e) => customElements.define(t, e),
        r = (t) => n.createElement(t),
        o = (t, e) => t.cloneNode(e);
    class c extends HTMLElement {
        constructor(t) {
            super();
            let e = this;
            (e.l = e.l || t || {}), (e.i = new Set());
        }
        u() {
            this.h();
        }
        p(t, e) {
            let n = this;
            for (const s of e) {
                const e = t[s.index];
                s.m && ((e.$ = s), n.i.add(e));
                for (const [t, r] of s.g) {
                    const s = r.v(n.l, e, r._, t);
                    s && n.i.add(s);
                }
                !s.m && s.k && n.p(e.children, s.k);
            }
        }
        h() {
            for (const t of trail) for (const e of t.M) e.delete(t);
            this.i.clear();
        }
    }
    s("x-template", c);
    let l = null;
    const i = (t) => {
            const e = function (t) {
                if (void 0 !== t) {
                    e.data = t;
                    for (const t of e.C) t();
                } else l && (e.C.add(l), l.M.add(e.C));
                return e.data;
            };
            return (e.data = t), (e.F = !0), (e.C = new Set()), e;
        },
        f = (t) => {
            const e = l;
            return (l = t), (l.M = new Set()), t(), (l = e), t;
        };
    let u = n.createComment(""),
        a = r("template"),
        d = n.createDocumentFragment();
    const x = (t) => {
            let e = o(d);
            return e.append(...t), e;
        },
        h = () => {},
        p = (t, ...e) =>
            t.reduce(
                (n, s, r) => n + (s + (r === t.length - 1 ? "" : e[r])),
                ""
            ),
        m = r("style"),
        w = "css-x";
    let y = 1;
    const $ = (t, e) => "$" + (e || y) + t,
        g = (t, ...e) => {
            if ("string" == typeof t) return `${w}="${$(t, y)}"`;
            {
                const s = p(t, e);
                (m.textContent += s), m.parentElement || n.head.appendChild(m);
            }
        },
        E = (t, e, n) => {
            const s = n,
                r = t.component.S;
            e.setAttribute(w, $(s, r));
        },
        v = (t, e, n) => {
            const s = n,
                r = t.ref(s);
            let o = !0;
            return f(() => {
                const t = r.T();
                if (o) {
                    for (const n of t) n(e);
                    o = !1;
                } else t[t.length - 1](e);
            });
        },
        b = (t, e, n) => {
            const s = e.style.display;
            return f(() => {
                n(t)
                    ? s
                        ? (e.style.display = s)
                        : e.style.removeProperty("display")
                    : (e.style.display = "none");
            });
        },
        _ = (t, e, n) => f(() => (e.textContent = n(t))),
        k = (t, e, n, s) => f(() => e.setAttribute(s, n(t))),
        M = (t) => {
            switch (t.name) {
                case "x-text":
                    return _;
                case "x-show":
                    return b;
                case "x-ref":
                    return v;
                case "x-css":
                    return E;
                default:
                    return k;
            }
        },
        C = (t, e, n, s) => (
            (e.l = e.l || {}),
            f(() => {
                const r = e.l[s],
                    o = n(t);
                r && r.F ? r(o) : (e.l[s] = i(o));
            })
        ),
        F = {},
        S = (t) => {
            if (F[t]) return F[t];
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
            return (F[t] = s), s;
        },
        T = (t) => 0 === t.name.indexOf("x-on:"),
        j = (t) => 0 === t.tagName.indexOf("X-"),
        H = (t) => "X-TEMPLATE" === t.tagName,
        L = (t, e, n) => {
            let s = [];
            const r = [{ j: O() }],
                c = e.getAttribute("key") || "item";
            return (
                e.replaceWith(r[0].j),
                f(() => {
                    const l = n(t);
                    !(function (t, e, n, s, r, c) {
                        const l = e.$;
                        let i = 0;
                        const f = n.length,
                            u = s.length;
                        let a = u - f;
                        for (; i < f && i < u; )
                            n[i] !== s[i] && r[i].signal(s[i]), i++;
                        const d = [],
                            x = r[i].j;
                        for (; a > 0; ) {
                            const e = o(l.H, !0),
                                n = r[i + 1] || (r[i + 1] = X(t, c, s[i]));
                            d.push(e, n.j),
                                l.k && n.component.p(e.children, l.k),
                                a--,
                                i++;
                        }
                        if (d.length) x.replaceWith(x, ...d);
                        else if (a < 0) {
                            let t = flags[i];
                            const e = flags[i - a];
                            for (; t !== e; ) {
                                const e = t;
                                (t = t.nextSibling), e.remove();
                            }
                        }
                    })(t, e, s, l, r, c),
                        (s = l);
                })
            );
        };
    const O = () => o(u),
        X = (t, e, n) => {
            const s = O(),
                o = i(n),
                c = r("x-template");
            return (c.l = { ...t, [e]: o }), { j: s, L: o, O: c };
        },
        A = (t) => {
            switch (t.name) {
                case "x-for":
                    return L;
                case "x-if":
                    return;
            }
        },
        P = (e) => {
            const n = [];
            for (let s = 0; s < e.length; s++) {
                let r = e[s];
                const o = H(r),
                    c = o || j(r),
                    l = { index: s, k: !1, H: !1, m: c, g: new Map() };
                let i = r.attributes.length;
                for (; i--; ) {
                    const e = r.attributes[i];
                    if (0 === e.name.indexOf("x-")) {
                        const n = T(e),
                            s = n ? e.name.substring(5) : e.name.substring(2),
                            i = {
                                _:
                                    e.value &&
                                    ("ref" === s || "css" === s
                                        ? e.value
                                        : S(e.value)),
                                v: o ? A(e) : c ? C : n ? t : M(e),
                            };
                        l.g.set(s, i), r.removeAttribute(e.name);
                    }
                }
                r.childNodes.length &&
                    (c && (r = l.H = x(r.childNodes)), (l.k = P(r.children))),
                    (l.k || l.g.size) && n.push(l);
            }
            return n.length > 0 && n;
        };
    class U extends c {
        constructor() {
            super(), (this.X = {});
        }
        onMount() {}
        connectedCallback() {
            let t = this;
            for (const e of t.attributes) t.l[e.name] = e.value;
            (t.l.component = t), (t.l.ref = t.A), t.onMount(t.l), t.P();
        }
        onUnmount() {}
        u() {
            let t = this;
            t.onUnmount(t.l), t.h();
        }
        P() {
            let t = this;
            const e = t.$ || t.U;
            let n = e.H,
                s = e.k,
                r = t.U.S;
            const c = i,
                l = n ? h : p,
                f = r ? h : g,
                u = t.U.q.call(t.l, c, l, f);
            u &&
                (n ||
                    ((n =
                        "string" == typeof u
                            ? (e.H = ((t) => {
                                  let e = o(a);
                                  return (e.innerHTML = t), e.content;
                              })(u))
                            : x(u)),
                    (s = e.k = P(n.children)))),
                (t.S = t.U.S = r || y++),
                e.H && (n = o(n, !0)),
                s && t.p(n.children, s),
                t.replaceWith(n);
        }
        A(t, e) {
            const n =
                this.component.X[t] ||
                (this.component.X[t] = (() => {
                    const t = [];
                    return (t.T = i([])), t;
                })());
            if (!e) return n;
            n.push(e), n.T(n);
        }
    }
    const q = {};
    return {
        define: (t, e) => {
            const n = `__flect_${t}__`;
            if (window[n]) throw `customElement x-${t} is already defined !`;
            return (
                (q[n] = class extends U {
                    constructor() {
                        super();
                    }
                }),
                (q[n].q = e),
                (q[n].prototype.U = q[n]),
                s(`x-${t}`, q[n]),
                q[n]
            );
        },
        signal: i,
    };
})();
