!function(){"use strict";let t,i=0;function e(e){let s="x"+i++;t||(t=document.createElement("style"),t.id="x-scoped-stylesheet",document.head.appendChild(t));let h=`[style-ref="${s}"]`;return t.textContent+=e(h),s}class s extends HTMLElement{constructor(){super(),this.t={},this.i=this.i||{},this.custom={},this.init()}init(){this.h(),this.o(),this.l()}ref(t){return this.t[t]?this.t[t][0]:void 0}refs(t){return this.t[t]}u(t,i){let e=t.split(".");return"!"===e[0][0]&&(e.m=!0,e[0]=e[0].substring(1)),i&&i[e[0]]&&e.splice(0,1,...i[e[0]][0],i[e[0]][1]),e}p(t){let i=this.i;for(let e of t)if(i=i[e],void 0===i)break;return t.m?!i:i}o(){this.i.body=this.childNodes;for(let t of this.attributes)if(!this.g(t))if("datas-"===t.name.substring(0,6)){let i=t.name.substring(6),e=JSON.parse(t.value);this.i[i]=e}else this.i[t.name]=t.value}h(){this.$={v:{},effect(t,i,e,s){this.v[t]||(this.v[t]=new Map),this.v[t].get(i)||this.v[t].set(i,[]),this.v[t].get(i).push(e),void 0!==s&&e(s,i)},clear(t,i){i?this.v[t].delete(i):delete this.v[t]},P(t,i){if(this.v[t])for(let[e,s]of this.v[t])for(let t of s)t(i,e)},set(t,i,e){return t[i]=e,this.P(i,e),!0}},this.datas=new Proxy(this.i,this.$)}X(t){return(t.m?"!":"")+t.join(".")}O(t,i){this.t[t]||(this.t[t]=[]),this.t[t].push(i)}iterable(t,i){this.i[i]=new Proxy(this.datas,function(t){return{get:(i,e)=>"_xiterable"===e||("get"===e?i[t]:{get key(){return e},get value(){return i[t][e]},get parent(){return i[t]}})}}(t)),this.effect(t,(()=>{this.$.P(i,this.i[t])}))}l(){this.D.A.call(this,this.datas,this.F.bind(this),this.M.bind(this))}F(t){if(t){"string"==typeof t?(this.D.k||(this.D.k=s.parse(t)),this.R=this.D.k.cloneNode(!0).childNodes):this.R=this.D.k=t;for(let t of this.R)1===t.nodeType&&(this.D.selector&&t.setAttribute("style-ref",this.D.selector),this.I(t));this.replaceWith(...this.R)}}M(t){if(!this.D.selector){if(this.D.k)throw`You must use style() before render() in x-${this.D.S} !`;this.D.selector=e(t)}}effect(t,i){this.$.effect(t,this,i,this.i[t])}I(t,i){t.j||(this.C(t,i),this.H(t)||this.J(t,i))}J(t,i){if(!this.H(t))for(let e of[].slice.call(t.children))this.I(e,i)}C(t,i){t.component=this,t.j=!0,this.L(t)?this.N(t,i):this.H(t)?this.T(t,i):this.Y(t,i)}N(t,i={}){let e,h=t.tagName.substring(2),r=this.u(t.getAttribute("var"),i.replace),n=t.getAttribute("key"),o=document.createComment(`x-${h}-begin`),l=document.createComment(`x-${h}-end`),f=t.innerHTML,d=document.createElement("div");if(d.append(...t.childNodes),t.replaceWith(o,l),"IF"===h)this.J(d,i),e=()=>{let t,i=this.p(r),e=o.nextSibling===l;if(i&&e)for(;d.childNodes.length;)l.parentNode.insertBefore(d.childNodes[0],l);else if(!i&&!e)for(;(t=o.nextSibling)!==l;)d.append(t)};else{if("FOR"!==h)return;{let t=[],d=0;e=()=>{let e=this.p(r);if(void 0===e)return;e._&&(e=e.get);let u="number"==typeof e?e:e.length,c=u-d;if(c>0)for(let e=d;e<d+c&&e<u;e++){if(!t[e]){n&&(i.replace=i.replace||{},i.replace[n]=[r,e]);let o=s.parse(f);this.J(o,i);let l=document.createComment(`x-${h}-item`);l.q=o,o.prepend(l),t.push(o)}for(;t[e].childNodes.length;)l.parentNode.insertBefore(t[e].childNodes[0],l)}else if(c<0)for(let i=d-1;i>d-1+c&&i>=0;i--){let e=l.previousSibling;for(;(!e.q||e.q!==t[i])&&e!==o;)e=l.previousSibling,t[i].prepend(e)}d+=c}}}this.$.effect(r[0],t,e,this.i[r[0]])}T(t,i={}){for(let e of t.attributes)if(this.g(e)){let s=e.name.substring(2),h=this.u(e.value,i.replace),r=()=>{t.datas[s]=this.p(h)};t.i||(t.datas=t.i={}),t.i[s]=this.p(h),this.$.effect(h[0],t,r)}else"ref"===e.name&&this.O(e.value,t)}Y(t,i={}){for(let e=0;e<t.attributes.length;e++){let s=t.attributes[e],h=!0;if(this.g(s)){let e=s.name.substring(2),h=this.u(s.value,i.replace),r=()=>{t.setAttribute(e,this.p(h))};"text"===e?r=()=>{t.textContent=this.p(h)}:"html"===e?r=()=>{t.innerHTML=this.p(h)}:"append"===e||"prepend"===e?r=()=>{let i=this.p(h);i&&(i.length?t[e](...i):t[e](i))}:"toggle"===e?r=()=>{let i=this.p(h);t.classList.toggle(i,i)}:"show"===e&&(r=()=>{this.p(h)?t.style.removeProperty("display"):t.style.display="none"}),this.$.effect(h[0],t,r,this.i[h[0]])}else"ref"===s.name?this.O(s.value,t):h=!1;h&&(t.removeAttribute(s.name),e--)}}L(t){return"X-FOR"===t.tagName||"X-IF"===t.tagName}H(t){return"X"===t.tagName[0]&&"-"===t.tagName[1]}g(t){return"x"===t.name[0]&&"-"===t.name[1]}}s.B=new DOMParser,s.parse=t=>s.B.parseFromString(t,"text/html").body,customElements.define("x-element-prototype-factory",s),window.define=function(t,i){let e=`x${t}Element`;if(window[e])throw`Element x-${t} is already defined !`;if(!i)throw`Element x-${t} need a render function !`;return window[e]=class extends s{constructor(){super()}},window[e].S=t,window[e].A=i,window[e].k=!1,window[e].selector=!1,window[e].prototype.D=window[e],customElements.define(`x-${t}`,window[e]),window[e]}}();
