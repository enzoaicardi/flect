/** @type {Number} css selectors needs to be unique so we need to store a global id */
const dom = document;
const xstyle = dom.createElement("style");

export const cssAttributeName = "css-x";
export let cssSelectorsId = 1;

/**
 * increment global id of css selectors
 * @returns {Number}
 */
export function cssNextId() {
    return cssSelectorsId++;
}

/**
 * Used to create a css selector attribute used in css and html templates
 * @returns {String} css attribute value
 */
export function createCssSelector(selectorName, selectorId) {
    // selector start by "css-" because we to want to interfere with x- attributes
    return "$" + (selectorId || cssSelectorsId) + selectorName;
}

/**
 * Used to create CSS templates from components renderFunction
 * @param {[String]} strings
 * @param {Array} values
 * @returns {String}
 */
export function createCssTemplate(strings, values) {
    return strings.reduce(
        (result, text, i) =>
            (result += text + (i === strings.length - 1 ? "" : values[i])),
        ""
    );
}

/**
 * Used to create CSS templates or CSS selectors from components renderFunction
 * and also append style tag into document's head
 * @param {[String]|String} strings
 * @param {...any} values
 * @returns {String}
 */
export function createCssTemplateOrSelector(strings, ...values) {
    // in case of an unique string we define a new selector
    if (typeof strings === "string") {
        return `${cssAttributeName}="${createCssSelector(
            strings,
            cssSelectorsId
        )}"`;
    } else {
        // create the css template
        const css = createCssTemplate(strings, values);

        // add the content into style tag
        xstyle.textContent += css;

        // add the style tag in the document's head
        if (!xstyle.parentElement) {
            dom.head.appendChild(xstyle);
        }
    }
}
