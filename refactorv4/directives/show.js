import { reactive } from "../reactivity/signal";

/**
 * Set HTMLElement display from the expression result
 * @type {xDirective}
 */
export function showDirective(context, element, expression) {
    // store the initial display value
    const initialValue = element.style.display;

    return reactive(() => {
        const visible = expression(context);

        if (visible) {
            // if there was an initial value we restore the value
            // else we remove the display style property
            initialValue
                ? (element.style.display = initialValue)
                : element.style.removeProperty("display");
        } else {
            element.style.display = "none";
        }
    });
}
