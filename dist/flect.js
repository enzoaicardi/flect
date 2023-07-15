!function(){"use strict";let t,e=0;class i extends HTMLElement{static t=new DOMParser;static parse(t){return i.t.parseFromString(t,"text/html").body}constructor(){super(),this.i=!0,this.h={},this.l=this.l||{},this.o=this.o||!1,this.custom={},this.hasAttribute("noinit")||this.init()}init(){this.u(),this.m(),this.p()}ref(t){return this.h[t]?this.h[t][0]:void 0}refs(t){return this.h[t]}g(t){let e=t.split(".");return"!"===e[0][0]&&(e.v=!0,e[0]=e[0].substring(1)),e}P(t){let e=this.l;for(let i of t)if(e=e[i],void 0===e)break;return t.v?!e:e}m(){this.l.body=[].slice.call(this.childNodes),this.l.html=this.innerHTML,this.l.text=this.textContent;for(let t of this.attributes)if("x"!==t.name[0]||"-"!==t.name[1])if("datas-"===t.name.substring(0,6)){let e=t.name.substring(6),i=JSON.parse(t.value);this.l[e]=i}else this.l[t.name]=t.value}u(){this.D={M:{},effect(t,e,i,s){this.M[t]||(this.M[t]=new Map),this.M[t].get(e)||this.M[t].set(e,[]),this.M[t].get(e).push(i),void 0!==s&&i(s,e)},clear(t,e){e?this.M[t].delete(e):delete this.M[t]},$(t,e){if(this.M[t])for(let[i,s]of this.M[t])for(let t of s)t(e,i)},set(t,e,i){return t[e]=i,this.$(e,i),!0}},this.datas=new Proxy(this.l,this.D)}O(t){return(t.v?"!":"")+t.join(".")}k(t,e){this.h[t]||(this.h[t]=[]),this.h[t].push(e)}iterable(t,e){this.l[e]=new Proxy(this.datas,function(t){return{get:(e,i)=>"_xiterable"===i||("get"===i?e[t]:{get key(){return i},get value(){return e[t][i]},get parent(){return e[t]}})}}(t)),this.effect(t,(()=>{this.D.$(e,this.l[t])}))}p(){this.A.S.call(this,this.datas,this.j.bind(this),this.C.bind(this))}j(s){if(!s)return;if(!this.A.H&&(this.A.H=i.parse(s),this.A.style)){let i=function(i){t||(t=document.createElement("style"),t.id="x-scoped-stylesheet",document.head.appendChild(t));let s="x"+e++,h=`[style-ref="${s}"]`;return t.textContent+=i(h),s}(this.A.style),s=this.A.H.querySelectorAll(":scope > *");for(let t of s)t.setAttribute("style-ref",i)}this.J=this.A.H.cloneNode(!0),this.L(this.J);const h=this.J.childNodes;for(let t of h)t.o=this.o;this.replaceWith(...h)}C(t){if(!this.A.style&&this.A.H)throw"You should render style before DOM !";this.A.style||(this.A.style=t)}effect(t,e){this.D.effect(t,this,e,this.l[t])}N(t,e,i){let s=t.querySelectorAll("*");for(let t of s)for(let s of t.attributes)if("x"===s.name[0]&&"-"===s.name[1]){let h=this.g(s.value);h[0]===e&&(h[0]=i,t.setAttribute(s.name,this.O(h)))}}R(t){t.T||(t.component=this,t.T=!0,"X"===t.tagName[0]&&"-"===t.tagName[1]?this.X(t):this.Y(t))}_(t){this.R(t),this.L(t)}L(t){let e=t.querySelectorAll(":scope > *");for(let t of e)this._(t)}X(t){for(let e of t.attributes)if("x"===e.name[0]&&"-"===e.name[1]){let i=e.name.substring(2),s=this.g(e.value),h=()=>{t.datas[i]=this.P(s)};t.l||(t.datas=t.l={}),t.l[i]=this.P(s),this.D.effect(s[0],t,h)}else"ref"===e.name&&this.k(e.value,t)}Y(t){for(let e=0,s=0;e<t.attributes.length;e++,s++){let s=t.attributes[e],h=!0;if("x"===s.name[0]&&"-"===s.name[1]){let e=s.name.substring(2),h=this.g(s.value),r=()=>{t.setAttribute(e,this.P(h))};if("text"===e)r=()=>{t.textContent=this.P(h)};else if("html"===e)r=()=>{t.innerHTML=this.P(h)};else if("append"===e)r=()=>{let e=this.P(h);e&&(e.length?t.append(...e):t.append(e))};else if("prepend"===e)r=()=>{let e=this.P(h);e&&(e.length?t.prepend(...e):t.prepend(e))};else if("toggle"===e)r=()=>{let e=this.P(h);t.classList.toggle(e,e)};else if("show"===e)r=()=>{this.P(h)?t.style.removeProperty("display"):t.style.display="none"};else if("if"===e)t.q||(t.q=document.createElement("div"),this.L(t)),r=()=>{let i=this.P(h),s=t.childNodes.length;"if"===e&&(i&&!s?this.B(t.q,t):!i&&s&&this.B(t,t.q))};else if("for"===e){const e=s.value,l=t.getAttribute("var");t.F||(t.F=[],t.G=0,t.I=i.parse(t.innerHTML),t.innerHTML=""),r=()=>{let i=this.P(h);if(void 0===i)return;i.K&&(i=i.get);let s="number"==typeof i?i:i.length,r=s-t.G;if(r>0)for(let i=t.G;i<t.G+r&&i<s;i++){if(!t.F[i]){let s=t.I.cloneNode(!0);l&&this.N(s,l,e+"."+i),s.childNodes.forEach((t=>{t.o=i})),this.L(s),t.F.push(s)}this.B(t.F[i],t)}else if(r<0)for(let e=t.G-1;e>t.G-1+r&&e>=0;e--)for(;t.childNodes.length;){let i=t.childNodes[t.childNodes.length-1];if(i.o!==e)break;t.F[e].prepend(i)}t.G+=r}}this.D.effect(h[0],t,r,this.l[h[0]])}else"ref"===s.name?this.k(s.value,t):h=!1;h&&(t.removeAttribute(s.name),e--)}}B(t,e){for(;t.childNodes.length;){let i=t.childNodes[0];e.appendChild(i)}}}customElements.define("x-element-prototype-factory",i),window.define=function(t,e){let s=`x${t}Element`;if(window[s])throw`Element x-${t} is already defined !`;if(!e)throw`Element x-${t} need a render function !`;return window[s]=class extends i{constructor(){super()}static name=t;static S=e;static H=!1;static style=!1},window[s].prototype.A=window[s],customElements.define(`x-${t}`,window[s]),window[s]}}();
