import { createCssSelector, cssAttributeName } from "../templates/css.js";
import { FLECT } from "../utils/types.js";

/**
 * Add scoped style attribute based on attribute value
 * @type {FLECT.Directive}
 */
export const cssDirective = (context, element, expression) => {
    // get select the selector and the indicator
    const selector = expression;
    const indicator = context.component.indicator;

    // set the css-x attribute to the element
    element.setAttribute(
        cssAttributeName,
        createCssSelector(selector, indicator)
    );
};
