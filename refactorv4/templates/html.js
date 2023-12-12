/**
 * Used to return HTML templates from components renderFunction
 * @param {[String]} strings
 * @param  {...any} values
 * @returns {String}
 */
export function createHtmlTemplate(strings, ...values) {
    return strings.reduce(
        (result, text, i) =>
            (result += text + (i === strings.length - 1 ? "" : values[i])),
        ""
    );
}

/**
 * Used to avoid template evaluation and improve performances
 * @returns {void}
 */
export function createEmptyTemplate() {}

/**
 * Create a documentFragment from a string literal
 * @param {String} string
 * @returns {DocumentFragment}
 */
export function createTemplateFragmentFromString(string) {
    return;
}

/**
 * Create a documentFragment from a NodeList
 * @param {NodeList} nodeList
 * @returns {DocumentFragment}
 */
export function createTemplateFragmentFromNodeList(nodeList) {
    return;
}
