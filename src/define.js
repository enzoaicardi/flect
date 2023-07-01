import xElement from "./element.js";
import scopedStyle from "./style.js";

export default function define(name, render, style){

    let className = `x${name}Element`;

    if(window[className]){ throw `Element x-${name} is already defined !`; }
    if(!render){ throw `Element x-${name} need a render function !`; }
    
    window[className] = class extends xElement{
        constructor(){ super(); }
        static name = name;
        static render = render;
        static template = false;
        static style = style ? scopedStyle(style) : false;
    };

    window[className].prototype.class = window[className];

    customElements.define(`x-${name}`, window[className]);

}