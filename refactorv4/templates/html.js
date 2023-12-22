export let xcomment = document.createComment("");
export let xtemplate = document.createElement("template");
export let xfragment = document.createDocumentFragment();

/**
 * Used to return HTML templates from components renderFunction
 * @param {[String]} strings
 * @param {...any} values
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
 * Create a DocumentFragment from a string literal
 * @param {String} string
 * @returns {DocumentFragment}
 */
export function createTemplateFragmentFromString(string) {
    // clone the template Element and inject innerHTML (for parsing)
    let template = xtemplate.cloneNode();
    template.innerHTML = string;

    // return the template DocumentFragment
    return template.content;
}

/**
 * Create a DocumentFragment from a NodeList
 * @param {NodeList} nodeList
 * @returns {DocumentFragment}
 */
export function createTemplateFragmentFromNodeList(nodeList) {
    // clone the DocumentFragment and append the NodeList
    let template = xfragment.cloneNode();
    template.append(...nodeList);

    // return the DocumentFragment
    return template;
}
