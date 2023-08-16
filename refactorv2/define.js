import { XElement } from "./element/xelement.js";

let registry = {}

// export XElement as Flect.x
export let x = XElement

// export define as Flect.define
export function define(name, definition){

    // check definition registry
    if(registry[name]){
        throw `Component x-${name} is already defined !`
    }

    // define customelement
    definition.prototype._xclass = definition
    customElements.define('x-' + name, definition)

}