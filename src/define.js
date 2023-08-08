import xElement from "./element.js";

function define(name, render){

    let className = `x${name}Element`;

    if(window[className]){ throw `Element x-${name} is already defined !`; }
    if(!render){ throw `Element x-${name} need a render function !`; }
    
    window[className] = class extends xElement{
        constructor(){ super(); }
    };

    window[className].xname = name;
    window[className].render = render;
    window[className].template = false;
    window[className].selector = false;
    window[className].xregex = /\{[a-zA-Z0-9_.$!?-]+\}/g;

    window[className].prototype.class = window[className];
    customElements.define(`x-${name}`, window[className]);

    return window[className];

}

window.define = define;