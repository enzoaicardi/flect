/*
    fonction define qui définit un element custom de type x-nom
    verifie que l'élément n'existe pas déjà dans le registre avant de le créer
    enregistre le customelement class extends XElement
*/

import { xElement } from "./templates/element";

// keep track of defined components
const defineMemo = {};

/**
 * Define a custom xElement
 * @param {String} name
 * @param {Function} renderFunction
 * @returns {xElement}
 */
export function define(name, renderFunction) {
    const className = `__flect_${name}__`;

    if (window[className]) {
        throw `Element x-${name} is already defined !`;
    }

    defineMemo[className] = class extends xElement {
        constructor() {
            super();
        }
    };

    // add prototype & static properties
    defineMemo[className].renderFunction = renderFunction;

    /** @type {xElementDefinition} */
    defineMemo[className].prototype.static = defineMemo[className];

    // define the customElement
    customElements.define(`x-${name}`, defineMemo[className]);

    return defineMemo[className];
}
