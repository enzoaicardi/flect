import xElement from "./element.js";

export default function define(name, render, properties){

    let className = `x${name}Element`;

    if(window[className]){ throw `Element x-${name} is already defined !`; }
    if(!render){ throw `Element x-${name} need a render function !`; }
    
    window[className] = class extends xElement{
        constructor(){ super(); }
        static name = name;
        static render = render;
        static template = false;
    };

    window[className].prototype.class = window[className];
    
    if(properties){
        Object.assign(window[className].prototype, properties);
    }

    customElements.define(`x-${name}`, window[className]);

}

define('input', function(datas, render){

    render(/* html */`
        <label ref="label">
            <input x-type="type" x-placeholder="style" x-required="optionnal" x-style="style" x-onclick="log">
        </label>
    `);

    datas.style;
    datas.count = 0;
    
    setTimeout(() => {
        datas.count++;
    }, 500);

    this.ref('label').addEventListener('click', e => datas.style = 'background-color:red;');

    // this.ref['label'].addEventListener('click');
    // this.refs['label'].forEach(el => '...');

});

// <x-input x-type="text" x-placeholder="Votre nom..." x-datas="mydatas"></x-input>

// utiliser un proxy pour les propriétés