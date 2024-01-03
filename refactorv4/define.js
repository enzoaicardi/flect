/*
    TODO traduire
    fonction define qui définit un element custom de type x-nom
    verifie que l'élément n'existe pas déjà dans le registre avant de le créer
    enregistre le customelement class extends xElement
*/

import { xElement } from "./classes/element.js";
import { customElementsDefine } from "./utils/shortcuts.js";
import { Flect } from "./utils/types.js";

// keep track of defined components
const defineMemo = {};

/** @type {Flect.Method.Define} */
export const define = (name, renderFunction) => {
    const className = `__flect_${name}__`;

    if (window[className]) {
        throw `customElement x-${name} is already defined !`;
    }

    defineMemo[className] = class extends xElement {
        constructor() {
            super();
        }
    };

    // add prototype & static properties
    /** @type {Flect.Method.Define.Render} */
    defineMemo[className].renderFunction = renderFunction;
    /** @type {Flect.Definition} */
    defineMemo[className].prototype.static = defineMemo[className];

    // define the customElement
    customElementsDefine(`x-${name}`, defineMemo[className]);

    return defineMemo[className];
};
