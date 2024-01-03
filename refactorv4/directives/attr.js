import { reactive } from "../reactivity/signal.js";
import { FLECT } from "../utils/types.js";
import { cssDirective } from "./css.js";
import { refDirective } from "./ref.js";
import { showDirective } from "./show.js";
import { textDirective } from "./text.js";

/*
    What append in a directive function ?
    1 - the directive function is stored inside component's schema
    2 - during the hydration process the directive function run with the following parameters
    3 - the directive function includes a reactive function, once activated it rerun every
        time a containing signal change. On every run the reactive function will trigger the
        expression with the new context (contains all this... values)
    4 - the result of the expression based on the context is used to update the directive
*/

/**
 * Set HTMLElement attribute from the expression result
 * @type {FLECT.Directive}
 */
const defaultDirective = (context, element, expression, attributeName) => {
    return reactive(() =>
        element.setAttribute(attributeName, expression(context))
    );
};

/**
 * Retrieve the corresponding directive from the attribute name
 * @param {HTMLElement.attribute} attribute
 */
export const attributeDirective = (attribute) => {
    switch (attribute.name) {
        case "x-text":
            return textDirective;
        case "x-show":
            return showDirective;
        case "x-ref":
            return refDirective;
        case "x-css":
            return cssDirective;
        default:
            return defaultDirective; // default attribute directive
    }
};
