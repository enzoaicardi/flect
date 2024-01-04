/*
    All the tests for :
    x- attributes
    x-on: attributes
    X- tags
*/

import { FLECT } from "../utils/types.js";

/**
 * Test if the attribute is reactive
 * @param {HTMLElement.attribute} attribute
 * @returns {boolean}
 */
export const isXAttribute = (attribute) => attribute.name.indexOf("x-") === 0;

/**
 * Test if the attribute represent an event
 * @param {HTMLElement.attribute} attribute
 * @returns {boolean}
 */
export const isXEventAttribute = (attribute) =>
    attribute.name.indexOf("x-on:") === 0;

/**
 * Test if the element is a flect custom element
 * @param {FLECT.Element} element
 * @returns {boolean}
 */
export const isXElement = (element) => element.tagName.indexOf("X-") === 0;

/**
 * Test if the element is a template element
 * @param {HTMLTemplateElement} element
 * @returns {boolean}
 */
export const isXTemplate = (element) => element.tagName === "X-TEMPLATE";
