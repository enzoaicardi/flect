/*
    Toutes les directives d'attributs ici
    x-text x-show x-... x-on:...
    x-if x-for
*/

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
                break; // default attribute directive
        }
    }
}

function textDirective() {}
function showDirective() {}
function dataDirective() {}
function defaultDirective() {}
