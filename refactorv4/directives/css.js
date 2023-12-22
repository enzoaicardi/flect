import {
    createCssSelector,
    cssAttributeName,
    cssSelectorsId,
} from "../templates/css.js";
import { Flect } from "../utils/types.js";

/**
 * Add scoped style attribute based on attribute value
 * @type {Flect.Directive}
 */
export function cssDirective() {
    const selectorId = cssSelectorsId;
    return (context, element, expression) => {
        const selectorName = expression;
        element.setAttribute(
            cssAttributeName,
            createCssSelector(selectorName, selectorId)
        );
    };
}
