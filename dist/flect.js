!function(){"use strict";let t,s=0;class e extends HTMLElement{static t=new DOMParser;static clone=function(t){return e.t.parseFromString(t,"text/html").body};constructor(){super(),this.i=!0,this.h={},this.l=this.l||{},this.o=this.o||!1,this.custom={},this.hasAttribute("noinit")||this.init()}init(){this.u(),this.m(),this.p()}ref(t){return this.h[t]?this.h[t][0]:void 0}refs(t){return this.h[t]}D(t,s,e){if(e(t,s),"string"==typeof s)return!1;for(let i in s){let h=t+"."+i;this.D(h,s[i],e)}}m(){this.l.body=[].slice.call(this.childNodes),this.l.html=this.innerHTML,this.l.text=this.textContent;for(let t of this.attributes)if("x"!==t.name[0]||"-"!==t.name[1])if("datas-"===t.name.substring(0,6)){let s=t.name.substring(6),e=JSON.parse(t.value);this.flat(s,e)}else this.l[t.name]=t.value}u(){this.g={M:{},effect(t,s,e,i){this.M[t]||(this.M[t]=new Map),this.M[t].get(s)||this.M[t].set(s,[]),this.M[t].get(s).push(e),void 0!==i&&e(i,s)},clear(t,s){s?this.M[t].delete(s):delete this.M[t]},set(t,s,e){if(t[s]=e,this.M[s])for(let[t,i]of this.M[s])for(let s of i)s(e,t);return!0}},this.datas=new Proxy(this.l,this.g)}O(t,s){this.h[t]||(this.h[t]=[]),this.h[t].push(s)}flat(t,s=!1){s||(s=this.l[t]),this.D(t,s,((t,s)=>{this.datas[t]=s}))}p(){this.v.$.call(this,this.datas,this.P.bind(this),this.S.bind(this))}P(i){if(!i)return;if(!this.v.A&&(this.v.A=e.clone(i),this.v.style)){let e=function(e){t||(t=document.createElement("style"),t.id="x-scoped-stylesheet",document.head.appendChild(t));let i="x"+s++,h=`[style-ref="${i}"]`;return t.textContent+=e(h),i}(this.v.style),i=this.v.A.querySelectorAll(":scope > *");for(let t of i)t.setAttribute("style-ref",e)}this.j=this.v.A.cloneNode(!0),this.k(this.j);const h=this.j.childNodes;for(let t of h)t.o=this.o;this.replaceWith(...h)}S(t){if(!this.v.style&&this.v.A)throw"You should render style before DOM !";this.v.style||(this.v.style=t)}effect(t,s){this.g.effect(t,this,s,this.l[t])}C(t,s,e){let i=t.querySelectorAll("*");for(let t of i)for(let i of t.attributes)"x"===i.name[0]&&"-"===i.name[1]&&(i.value.startsWith(s+".")?t.setAttribute(i.name,e+i.value.substring(s.length)):i.value===s&&t.setAttribute(i.name,e))}F(t){t.H||(t.component=this,t.H=!0,"X"===t.tagName[0]&&"-"===t.tagName[1]?this.J(t):this.L(t))}N(t){this.F(t);let s=t.querySelectorAll(":scope > *");for(let t of s)this.N(t)}k(t){let s=t.querySelectorAll(":scope > *");for(let t of s)this.N(t)}R(t,s,e){t.l[e]=this.l[s];this.g.effect(s,t,((t,s)=>{s.datas[e]=t}))}J(t){for(let s of t.attributes)if("x"===s.name[0]&&"-"===s.name[1]){let e=s.name.substring(2);t.l||(t.l={}),"datas-"===e.substring(0,6)&&(e=e.substring(6),this.D("",this.l[s.value],((i,h)=>{this.datas[s.value+i]=h,this.R(t,s.value+i,e+i)}))),this.R(t,s.value,e)}else"ref"===s.name&&this.O(s.value,t)}L(t){for(let s=0,i=0;s<t.attributes.length;s++,i++){let i=t.attributes[s],h=!0;if("x"===i.name[0]&&"-"===i.name[1]){let s=i.name.substring(2),h=(t,e)=>{e.setAttribute(s,t)};if("text"===s)h=(t,s)=>{s.textContent=t};else if("html"===s)h=(t,s)=>{s.innerHTML=t};else if("append"===s)h=(t,s)=>{t.length?s.append(...t):s.append(t)};else if("prepend"===s)h=(t,s)=>{t.length?s.prepend(...t):s.prepend(t)};else if("toggle"===s)h=(t,s)=>{s.classList.toggle(t,t)};else if("show"===s)h=(t,s)=>{t?s.style.removeProperty("display"):s.style.display="none"};else if("if"===s||"unless"===s)h=(t,e)=>{e.T||(e.T=document.createElement("div"),this.k(e));let i=e.childNodes.length;"if"===s?t&&!i?this.X(e.T,e):!t&&i&&this.X(e,e.T):"unless"===s&&(t&&i?this.X(e,e.T):t||i||this.X(e.T,e))};else if("for"===s){const t=i.value;h=(s,i)=>{i.Y||(i.Y=[],i.q=0,i.B=i.innerHTML,i.innerHTML="");let h="number"==typeof s,l=i.getAttribute("var"),o=h?s:s.length,f=o-i.q;if(this.datas[t+".length"]=o,f>0)for(let s=i.q;s<i.q+f&&s<o;s++){if(!i.Y[s]){let h=e.clone(i.B);this.C(h,l,t+"."+s),h.childNodes.forEach((t=>{t.o=s})),this.k(h),i.Y.push(h)}this.X(i.Y[s],i)}else if(f<0)for(let t=i.q-1;t>i.q-1+f&&t>=0;t--)for(;i.childNodes.length;){let s=i.childNodes[i.childNodes.length-1];if(s.o!==t)break;i.Y[t].prepend(s)}for(;o--;){let e=o;this.datas[t+"."+e]=h?e:s[e],this.datas[t+"."+e+".index"]=e}i.q+=f}}this.g.effect(i.value,t,h,this.l[i.value])}else"ref"===i.name?this.O(i.value,t):h=!1;h&&(t.removeAttribute(i.name),s--)}}X(t,s){for(;t.childNodes.length;){let e=t.childNodes[0];s.appendChild(e)}}}customElements.define("x-element-prototype-factory",e),window.define=function(t,s){let i=`x${t}Element`;if(window[i])throw`Element x-${t} is already defined !`;if(!s)throw`Element x-${t} need a render function !`;return window[i]=class extends e{constructor(){super()}static name=t;static $=s;static A=!1;static style=!1},window[i].prototype.v=window[i],customElements.define(`x-${t}`,window[i]),window[i]}}();
