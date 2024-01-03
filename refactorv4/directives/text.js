import { reactive } from "../reactivity/signal.js";
import { FLECT } from "../utils/types.js";

/**
 * Set HTMLElement text content from the expression result
 * @type {FLECT.Directive}
 */
export const textDirective = (context, element, expression) => {
    return reactive(() => (element.textContent = expression(context)));
};
