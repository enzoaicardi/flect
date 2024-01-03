import { reactive } from "../reactivity/signal.js";
import { Flect } from "../utils/types.js";

/**
 * Set HTMLElement text content from the expression result
 * @type {Flect.Directive}
 */
export const textDirective = (context, element, expression) => {
    return reactive(() => (element.textContent = expression(context)));
};
