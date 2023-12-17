/*
    Toutes les directives d'attributs ici
    x-text x-show x-... x-on:...
    x-if x-for
*/

import { reactive } from "../reactivity/signal";
import { isXEventAttribute } from "../utils/tests";

/**
 * Retrieve the corresponding directive from the attribute name
 * @param {Attribute} attribute
 */
export function attributeDirective(attribute) {
    if (isXEventAttribute(attribute)) {
        // event directive -> without reactive() wrapper
    } else {
        switch (attribute.name) {
            case "x-text":
                break; // text directive
            case "x-show":
                break; // show directive
            case "x-ref":
                break; // ref directive
            case "x-css":
                break; // css directive
            case "x-if":
                break; // if directive
            case "x-for":
                break; // for directive
            default:
                return defaultDirective; // default attribute directive
        }
    }
}

/**
 * Set HTMLElement attribute from the expression result
 * @type {xDirective}
 */
function defaultDirective(context, element, attributeName, expression) {
    return reactive(() =>
        element.setAttribute(attributeName, expression(context))
    );
}
