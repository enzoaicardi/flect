import xElement from "./element.js";

function define(name, render){

    let className = `x${name}Element`;

    if(window[className]){ throw `Element x-${name} is already defined !`; }
    if(!render){ throw `Element x-${name} need a render function !`; }
    
    window[className] = class extends xElement{
        constructor(){ super(); }
        static name = name;
        static render = render;
        static template = false;
        static style = false;
    };

    window[className].prototype.class = window[className];

    customElements.define(`x-${name}`, window[className]);

}

window.define = define;