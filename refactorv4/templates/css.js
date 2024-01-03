import { documentCreateElement, dom } from "../utils/shortcuts.js";
import { createLiteralTemplate } from "./generic.js";

/** @type {Number} css selectors needs to be unique so we need to store a global id */
const xstyle = documentCreateElement("style");

export const cssAttributeName = "css-x";
export let cssSelectorsId = 1;

/**
 * increment global id of css selectors
 * @returns {Number}
 */
export const cssNextId = () => cssSelectorsId++;

/**
 * used to create a css selector attribute used in css and html templates
 * selector start by "css-" because we to want to interfere with x- attributes
 * @returns {String} css attribute value
 */
export const createCssSelector = (selectorName, selectorId) =>
    "$" + (selectorId || cssSelectorsId) + selectorName;

/**
 * Used to create CSS templates or CSS selectors from components renderFunction
 * and also append style tag into document's head
 * @param {[String]|String} strings
 * @param {...any} values
 * @returns {String}
 */
export const createCssTemplateOrSelector = (strings, ...values) => {
    // in case of an unique string we define a new selector
    if (typeof strings === "string") {
        return `${cssAttributeName}="${createCssSelector(
            strings,
            cssSelectorsId
        )}"`;
    } else {
        // create the css template
        const css = createLiteralTemplate(strings, values);

        // add the content into style tag
        xstyle.textContent += css;

        // add the style tag in the document's head
        if (!xstyle.parentElement) {
            dom.head.appendChild(xstyle);
        }
    }
};
