var Flect=function(t){"use strict";let e=new DOMParser;function i(t,e){let i=e.children,s=[];for(let e in i){let n=i[e],h=n.effects,f=t.childNodes[e];f.component=this,n.t||s.push(f),!t.i||(f.i=t.i);for(let t in h){this.h.effect(t,f,h[t]);for(let[e,i]of h[t])e.call(this,null,f,i)}for(let t of n.l)t.call(this,f,n);n.o||s.push(...this.u(f,n))}return s}function s(t){return"X-FOR"===t.tagName||"X-IF"===t.tagName}function n(t){return 0===t.tagName.indexOf("X-")&&!s(t)}function h(t){return 0===t.indexOf("x-")}function f(t){return 0===t.indexOf("x-on:")}function l(t){return"x-scoped"===t}let r="style-ref",o="xEventHandler_";function u(t){switch(t){case"x-text":return d;case"x-html":return p;case"x-show":return x;case"x-ref":return m;default:return w}}function c(t){t.setAttribute(r,this.p.selector)}function a(t,e){for(let i of e.v.m)t.addEventListener(i,e.v)}function d(t,e,i){e.textContent=this.X(i,e)}function p(t,e,i){e.innerHTML=this.X(i,e)}function x(t,e,i){let s=e.style.display;this.X(i,e)?e.style.display="none":s?e.style.display=s:e.style.removeProperty("display")}function m(t,e,i){if(t){let t=this.F[i.M];!t||t(e)}else for(let t of this.O[i.M])t(e)}function w(t,e,i){e.setAttribute(i.$,this.X(i,e))}function y(t,e,i){e.datas||(e.datas={}),e.datas[i.$]=this.X(i,e)}let v=document.createComment("");function X(t,e,i){F(e);let s=i.g,n=e.P,h=this.getData(i,e);h&&!n?(M.call(this,e,s,0),e.P=1):!h&&n&&(O.call(this,e,s,0),e.P=0)}function E(t,e,i){F(e);let s=i.g,n=e.P,h=this.getData(i,e),f="number"==typeof h?h:h.length,l=f-n;if(l>0)for(let t=n;t<n+l&&t<f;t++)M.call(this,e,s,t,i);else if(l<0)for(let t=n-1;t>n-1+l&&t>=0;t--)O.call(this,e,s,t);e.P+=l}function F(t){t.i||(t.i=[]),t.R||(t.R={}),t.P||(t.P=0)}function M(t,e,i,s){let n=e.rootElement.cloneNode(!0);n.i=s?new Map(t.i):t.i,!s||n.i.set(s,i);let h=v.cloneNode();h.rootElement=e.rootElement,t.R[i]=this.u(n,e);do{t.parentNode.insertBefore(h,t)}while(h=n.firstChild)}function O(t,e,i){let s={};for(;(!s.rootElement||s.rootElement!==e.rootElement)&&(s=t.previousSibling);)s.remove();this.k(t.R[i])}let b=/\{[a-zA-Z0-9_.$!?|-]+\}/g;function $(t,e={}){let i={C:"!"===t[0],D:("!"===t[0]?t.substring(1):t).split(".").map((t=>t.split("|")))},s=e[g(i)];return i.H=g(s||i),i.D[0].I=s,i}function g(t){return t.H||t.D[0][0]}function P(t,e){let i={datas:{},M:t},s=t.match(b);if(s)for(let t of s)i.datas[t]=$(t.substring(1,t.length-1),e);else i.datas[t]=$(t,e);return i}function R(t,e={}){let i,r={type:t.tagName,effects:{},l:[],children:{}};if(s(t)){let s=t.getAttribute("key"),n=t.getAttribute("var");if(n){let h=$(n,e),f=function(t){switch(t){case"X-IF":return X;case"X-FOR":return E;default:throw"Undefined"}}(t.tagName);!s||(e[s]=h),i||(i=r),i.o=!0,i.rootElement=t,i.effects[h.H]=[[f,h]],h.g=i}t.replaceWith(v.cloneNode())}else for(let s=0;s<t.attributes.length;s++){let d=t.attributes[s],p=d.name,x=d.value;if(h(p)){if(i||(i=r),f(p)){let t=p.substring(5);i.v||(i.v={m:[],S:t=>{i.v[o+t.type].call(this,t)}}),i.v.m.push(t),i.v[o+t]=this[x],i.l.push(a)}else if(l(p))!this.p.selector||i.l.push(c);else{let s=n(t)&&t!==this?y:u(p),h=P(x,e);h.$=p.substring(2);for(let t in h.datas){let e=h.datas[t].H;i.effects[e]||(i.effects[e]=[]),i.effects[e].push([s,h])}}t.removeAttribute(p),s--}}if(!n(t)||t===this){let s=t.firstChild,n=0;if(s)do{if(1===s.nodeType||8===s.nodeType){let t=this._(s,e);t&&(i||(i=r)&&(i.t=!0),i.children[n]=t)}n++}while(s=s.nextSibling)}return i}function k(t){for(let e of t){if(!e.tagName||!n(e)||e.j(),e.R)for(let t in e.R)this.k(e.R[t]);this.h.remove(e)}}let C=0,D=!1;function H(t,e){return t.datas[t.M]?this.getData(t.datas[t.M],e):t.M.replace(b,(i=>this.getData(t.datas[i],e)))}function I(t,e){let i=this.F;for(let s=0;s<t.D.length&&i;s++){let n=t.D[s];i=n.I?this.getData(n.I,e)[e.i.get(n.I)]:i[n[0]];for(let t=1;t<n.length;t++)i=this.filters[n[t]](i)}return t.C?!i:i}class S extends HTMLElement{constructor(){super(),this.F=this.datas,this.datas={},this.filters={},this.effects={},this.O={},this._=R,this.k=k,this.u=i,this.X=H,this.getData=I}A(){this.init(),this.J(),this.F=this.F?Object.assign(this.datas,this.F):this.datas,this.L(),this.N&&(this.p.selector||this.T()),this.U()}j(){this.disconnect(),delete this.datas,delete this.h,delete this.F,delete this.O,delete this.filters,delete this.effects}init(){}disconnect(){}refs(t,e){let i=this.O;i[t]||(i[t]=[]),i[t].push(e),this.datas[t]=e}J(){let t=this.datas;t.body=this.childNodes;for(let e of this.attributes){let i=e.name;if("datas-"===i.substring(0,6)){let s=JSON.parse(e.value);t[i.substring(6)]=s}else t[i]=e.value}}L(){var t;this.h={Z:t=this,effects:{},mapping:new Map,effect(t,e,i){let s=this.effects,n=this.mapping;s[t]||(s[t]=new Map),s[t].get(e)||(s[t].set(e,[]),n.get(e)||n.set(e,[])),s[t].get(e).push(...i),n.get(e).push(t)},remove(t){for(let e of this.mapping.get(t))this.effects[e].delete(t),this.mapping.delete(t)},q(e,i){let s=this.effects;if(s[e])for(let[n,h]of s[e])for(let[e,s]of h)e.call(t,i,n,s)},set(t,e,i){return t[e]=i,this.q(e,i),!0}},this.datas=new Proxy(this.F,this.h);for(let t in this.effects)this.h.effect(t,this,[[this.effects[t]]]),this.effects[t](this.F[t])}T(){this.p.selector=function(t){let e="x"+C++;return D||(D=document.createElement("style"),document.head.appendChild(D)),D.textContent+=t(`[${r}="${e}"]`),e}(this.N)}U(){let t,i=this.p;if(!i.B){let n=this.G();"string"!=typeof n?t=n:i.B=(s=n,e.parseFromString(s,"text/html").body),i.g=this._(i.B||n)}var s;t||(t=i.B.cloneNode(!0)),!i.g||this.u(t,i.g),this.replaceWith(...t.childNodes)}}let _={},j=S;return t.define=function(t,e){if(_[t])throw`Component x-${t} is already defined !`;e.prototype.p=e,customElements.define("x-"+t,e)},t.x=j,t}({});
