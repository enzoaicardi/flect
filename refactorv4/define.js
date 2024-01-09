/*
    Function used to define a customElement extending xElement generic class,
    and checks that the element does not already exist in the registry
*/

import { xElement } from "./classes/element.js";
import { FLECT } from "./utils/types.js";

/**
 * keep track of defined components
 * @type {{X-TAG: class}}
 */
export const defineMemo = {};

/** @type {FLECT.Method.Define} */
export const define = (name, renderFunction) => {
    const className = "X-" + name.toUpperCase();

    // check if the element is already defined
    if (defineMemo[className]) {
        throw `x-${name} is already defined`;
    }

    defineMemo[className] = class extends xElement {
        constructor() {
            super();
        }
    };

    // add prototype & static properties
    /** @type {FLECT.Method.Define.Render} */
    defineMemo[className].renderFunction = renderFunction;
    /** @type {FLECT.Definition} */
    defineMemo[className].prototype.static = defineMemo[className];

    // define the customElement
    customElements.define(`x-${name}`, defineMemo[className]);

    return defineMemo[className];
};
