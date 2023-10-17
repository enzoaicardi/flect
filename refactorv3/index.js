/*

*/

import { xForElement } from "./element/element-class-for.js";
import { XElement } from "./element/element-class.js";

// export XElement as Flect.x
export { XElement as x }

// export define as Flect.define
export function define(name, definition){

    // setup class statics
    definition.prototype._xclass = definition

    // define native customElement
    customElements.define('x-' + name, definition)

}

// define core elements
define('for', xForElement)