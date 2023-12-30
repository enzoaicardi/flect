/*
    All the tests for :
    x- attributes
    x-on: attributes
    X- tags
*/

import { Flect } from "../utils/types.js";

/**
 * Test if the attribute is reactive
 * @param {HTMLElement.attribute} attribute
 * @returns {Boolean}
 */
export function isXAttribute(attribute) {
    return attribute.name.indexOf("x-") === 0;
}

/**
 * Test if the attribute represent an event
 * @param {HTMLElement.attribute} attribute
 * @returns {Boolean}
 */
export function isXEventAttribute(attribute) {
    return attribute.name.indexOf("x-on:") === 0;
}

/**
 * Test if the element is a flect custom element
 * @param {Flect.Element} element
 * @returns {Boolean}
 */
export function isXElement(element) {
    return element.tagName.indexOf("X-") === 0;
}

/**
 * Test if the element is a template element
 * @param {HTMLTemplateElement} element
 * @returns {Boolean}
 */
export function isXTemplate(element) {
    return !!element.content;
}
