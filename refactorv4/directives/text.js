import { reactive } from "../reactivity/signal";

/**
 * Set HTMLElement text content from the expression result
 * @type {xDirective}
 */
export function textDirective(context, element, expression) {
    return reactive(() => (element.textContent = expression(context)));
}
