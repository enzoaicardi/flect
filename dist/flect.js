!function(){"use strict";let t,s=0;class e extends HTMLElement{static t=new DOMParser;constructor(){super(),this.i=!0,this.h={},this.l=this.l||{},this.o=this.o||!1,this.hasAttribute("noinit")||this.init()}init(){this.u(),this.m(),this.p()}ref(t){return this.h[t]?this.h[t][0]:void 0}refs(t){return this.h[t]}D(t,s,e){if("string"==typeof s)return!1;for(let h in s){var i=!0;let l=t+"."+h;this.D(l,s[h],e)||e(l,s[h])}return i||!1}m(){this.l.body=[].slice.call(this.childNodes),this.l.v=this.innerHTML,this.l.text=this.textContent;for(let t of this.attributes)if("x"!==t.name[0]||"-"!==t.name[1])if("datas-"===t.name.substring(0,6)){let s=t.name.substring(6),e=JSON.parse(t.value);this.flat(s,e)}else this.l[t.name]=t.value}u(){this.M={O:{},effect(t,s,e,i){this.O[t]||(this.O[t]=new Map),this.O[t].get(s)||this.O[t].set(s,[]),this.O[t].get(s).push(e),void 0!==i&&e(i,s)},clear(t,s){s?this.O[t].delete(s):delete this.O[t]},set(t,s,e){if(t[s]=e,this.O[s])for(let[t,i]of this.O[s])for(let s of i)s(e,t);return!0}},this.$=new Proxy(this.l,this.M)}g(t,s){this.h[t]||(this.h[t]=[]),this.h[t].push(s)}flat(t,s=!1){s?this.$[t]=s:s=this.l[t],this.D(t,s,((t,s)=>{this.$[t]=s}))}p(){this.S.P.call(this,this.$,this.A.bind(this),this.j.bind(this))}A(i){if(!i)return;if(!this.S.k&&(this.S.k=e.t.parseFromString(i,"text/html"),this.S.style)){let e=function(e){t||(t=document.createElement("style"),t.id="x-scoped-stylesheet",document.head.appendChild(t));let i="x"+s++,h=`[style-ref="${i}"]`;return t.textContent+=e(h),i}(this.S.style),i=this.S.k.body.querySelectorAll(":scope > *");for(let t of i)t.setAttribute("style-ref",e)}this.C=this.S.k.cloneNode(!0).body,this.F(this.C);const h=this.C.childNodes;for(let t of h)t.o=this.o;this.replaceWith(...h)}j(t){if(!this.S.style&&this.S.k)throw"You should render style before DOM !";this.S.style||(this.S.style=t)}effect(t,s){this.M.effect(t,this,s,this.l[t])}H(t,s,e){let i=t.querySelectorAll("*");for(let t of i)for(let i of t.attributes)"x"===i.name[0]&&"-"===i.name[1]&&i.value===s&&t.setAttribute(i.name,e)}J(t){"X"===t.tagName[0]&&"-"===t.tagName[1]?this.L(t):this.N(t)}R(t){this.J(t);let s=t.querySelectorAll(":scope > *");for(let t of s)this.R(t)}F(t){let s=t.querySelectorAll(":scope > *");for(let t of s)this.R(t)}T(t,s,e){t.l[e]=this.l[s];this.M.effect(s,t,((t,s)=>{s.$[e]=t}))}L(t){for(let s of t.attributes)if("x"===s.name[0]&&"-"===s.name[1]){let e=s.name.substring(2);t.l||(t.l={}),"datas-"===e.substring(0,6)&&(e=e.substring(6),this.D("",this.l[s.value],((i,h)=>{this.$[s.value+i]=h,this.T(t,s.value+i,e+i)}))),this.T(t,s.value,e)}else"ref"===s.name&&this.g(s.value,t)}N(t){for(let s=0,e=0;s<t.attributes.length;s++,e++){let e=t.attributes[s],i=!0;if("x"===e.name[0]&&"-"===e.name[1]){let s=e.name.substring(2),i=(t,e)=>{e.setAttribute(s,t)};if("text"===s)i=(t,s)=>{s.textContent=t};else if("html"===s)i=(t,s)=>{s.innerHTML=t};else if("append"===s)i=(t,s)=>{t.length?s.append(...t):s.append(t)};else if("prepend"===s)i=(t,s)=>{t.length?s.prepend(...t):s.prepend(t)};else if("toggle"===s)i=(t,s)=>{s.classList.toggle(t,t)};else if("show"===s)i=(t,s)=>{t?s.style.removeProperty("display"):s.style.display="none"};else if("if"===s||"unless"===s)i=(t,e)=>{e.X||(e.X=document.createElement("div"));let i=e.childNodes.length;"if"===s?t&&!i?this.Y(e.X,e):!t&&i&&this.Y(e,e.X):"unless"===s&&(t&&i?this.Y(e,e.X):t||i||this.Y(e.X,e))};else if("for"===s){const t=e.value;i=(s,e)=>{e.q||(e.q=[],e.B=0,e.G=document.createElement("div"),this.Y(e,e.G));let i="number"==typeof s,h=!i&&e.getAttribute("var"),l=i?s:s.length,f=l-e.B;if(f>0){for(let i=0;i<e.B+f&&i<l;i++)if(h&&(this.$[t+"."+i]=s[i]),i>=e.B){if(!e.q[i]){let s=e.G.cloneNode(!0);h&&this.H(s,h,t+"."+i),s.childNodes.forEach((t=>{t.o=i})),this.F(s),e.q.push(s)}this.Y(e.q[i],e)}}else if(f<0)for(let t=e.B-1;t>e.B-1+f&&t>=0;t--)for(;e.childNodes.length;){let s=e.childNodes[e.childNodes.length-1];if(s.o!==t)break;e.q[t].prepend(s)}e.B+=f}}this.M.effect(e.value,t,i,this.l[e.value])}else"ref"===e.name?this.g(e.value,t):i=!1;i&&(t.removeAttribute(e.name),s--)}}Y(t,s){for(;t.childNodes.length;){let e=t.childNodes[0];s.appendChild(e)}}}customElements.define("x-element-prototype-factory",e),window.define=function(t,s){let i=`x${t}Element`;if(window[i])throw`Element x-${t} is already defined !`;if(!s)throw`Element x-${t} need a render function !`;window[i]=class extends e{constructor(){super()}static name=t;static P=s;static k=!1;static style=!1},window[i].prototype.S=window[i],customElements.define(`x-${t}`,window[i])}}();
