import xElement from "./xelement.js";

export default function define(name, render, properties){

    let className = `x${name}Element`;

    if(window[className]){ throw `Element x-${name} is already defined !`; }
    if(!render){ throw `Element x-${name} need a render function !`; }
    
    window[className] = class extends xElement{
        constructor(){ super(); }
        class = window[className];
        static name = name;
        static render = render;
        static template = false;
    };
    
    if(properties){
        Object.assign(window[className].prototype, properties);
    }

    customElements.define(`x-${name}`, window[className]);

    // console.log(name, window[className].render)

}

define('input', (datas)=>{
    return `<input x-type="datas.type" x-placeholder="datas.placeholder" x-required="!datas.optionnal">`;
});

// <x-input x-type="text" x-placeholder="Votre nom..." x-datas="mydatas"></x-input>

// utiliser un proxy pour les propriétés