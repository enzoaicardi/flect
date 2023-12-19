import { reactive, signal } from "../reactivity/signal";

/**
 * Set Flect component datas from the expression result
 * @type {xDirective}
 */
export function dataDirective(context, element, expression, attributeName) {
    /** @type {xDatas} */
    element.datas = element.datas || {};
    const data = element.datas[attributeName];

    return reactive(() => {
        const value = expression(context);

        if (data.issignal) {
            // we use the signal function
            data(value);
        } else {
            // we create the signal function
            element.datas[attributeName] = signal(value);
        }
    });
}
