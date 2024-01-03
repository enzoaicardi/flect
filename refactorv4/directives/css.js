import { createCssSelector, cssAttributeName } from "../templates/css.js";
import { Flect } from "../utils/types.js";

/**
 * Add scoped style attribute based on attribute value
 * @type {Flect.Directive}
 */
export const cssDirective = (context, element, expression) => {
    // get select the selector id and name
    const selectorName = expression;
    const selectorId = context.component.selectorId;

    // set the css-x attribute to the element
    element.setAttribute(
        cssAttributeName,
        createCssSelector(selectorName, selectorId)
    );
};
