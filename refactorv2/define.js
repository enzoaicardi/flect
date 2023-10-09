import { XElement } from "./element/xelement.js";
import { proxyContext } from "./proxy/context.js";

let registry = {}

// export XElement as Flect.x
export { XElement as x }

// export context as Flect.context
export { proxyContext as context }

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

export function disconnect(element){
    element.disconnectXElement()
}