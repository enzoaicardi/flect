/*
    What append in a directive function ?
    1 - the directive function is stored inside component's schema
    2 - during the hydration process the directive function run with the following parameters
    3 - the directive function includes a reactive function, once activated it rerun every
        time a containing signal change. On every run the reactive function will trigger the
        expression with the new context (contains all this... values)
    4 - the result of the expression based on the context is used to update the directive
*/

import { reactive, signal } from "../reactivity/signal.js";
import { FLECT } from "../utils/types.js";

/**
 * Set Flect component datas from the expression result
 * @type {FLECT.Directive}
 */
export const dataDirective = (context, element, expression, attributeName) => {
    /** @type {FLECT.Element.Datas} */
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
};
