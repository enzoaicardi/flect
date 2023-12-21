/*
    L'ensemble des tests sur les 
    x- attributs
    x-on: attributs
    X- tags
*/

import { Flect } from "../utils/types.js";

/**
 * Test if the attribute is reactive
 * @param {HTMLElement.attribute} attribute
 */
export function isXAttribute(attribute) {
    return attribute.name.indexOf("x-") === 0;
}

/**
 * Test if the attribute represent an event
 * @param {HTMLElement.attribute} attribute
 */
export function isXEventAttribute(attribute) {
    return attribute.name.indexOf("x-on:") === 0;
}

/**
 * Test if the element is a flect custom element
 * @param {Flect.Element} element
 */
export function isXElement(element) {
    return element.tagName.indexOf("X-") === 0;
}
