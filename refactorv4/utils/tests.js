/*
    L'ensemble des tests sur les 
    x- attributs
    x-on: attributs
    X- tags
*/

import { xElement } from "../templates/element.js";

/**
 * Test if the attribute is reactive
 * @param {Attribute} attribute
 */
export function isXAttribute(attribute) {
    return attribute.name.indexOf("x-") === 0;
}

/**
 * Test if the attribute represent an event
 * @param {Attribute} attribute
 */
export function isXEventAttribute(attribute) {
    return attribute.name.indexOf("x-on:") === 0;
}

/**
 * Test if the element is a flect custom element
 * @param {xElement} element
 */
export function isXElement(element) {
    return element.tagName.indexOf("X-") === 0;
}
