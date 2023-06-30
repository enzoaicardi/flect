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
            <input x-type="type" x-placeholder="count" x-show="zero">
        </label>
    `);

    this.effect('count', (value)=>{datas.zero = value; console.log(value);});
    datas.count = 0;
    // datas.count = datas.count || 0;
    
    // setTimeout(() => {
    //     datas.count++;
    // }, 1000);

});

define('container', function(datas, render){

    render(/* html */`
        <div style="background-color:red">
            <p>Input</p>
            <x-input x-count="count"></x-input>
        </div>
    `);

    datas.count = 0;

    setTimeout(() => {
        datas.count+=10;
        console.log('linked ?', datas.count)
    }, 1500);

});

// <x-input x-type="text" x-placeholder="Votre nom..." x-datas="mydatas"></x-input>

// utiliser un proxy pour les propriétés