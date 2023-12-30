import { reactive, signal } from "../reactivity/signal.js";
import { Flect } from "../utils/types.js";

/**
 * Set Flect component datas from the expression result
 * @type {Flect.Directive}
 */
export function dataDirective(context, element, expression, attributeName) {
    /** @type {Flect.Element.Datas} */
    element.datas = element.datas || {};

    return reactive(() => {
        const data = element.datas[attributeName];
        const value = expression(context);

        if (data && data.issignal) {
            // we use the signal function
            data(value);
        } else {
            // we create the signal function
            element.datas[attributeName] = signal(value);
        }
    });
}
