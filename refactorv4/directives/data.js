/*
    What append in a directive function ?
    1 - the directive function is stored inside component's schema
    2 - during the hydration process the directive function run with the following parameters
    3 - the directive function includes a reactive function, once activated it rerun every
        time a containing signal change. On every run the reactive function will trigger the
        expression with the new context (contains all this... values)
    4 - the result of the expression based on the context is used to update the directive
*/

import { reactive } from "../reactivity/signal.js";
import { FLECT } from "../utils/types.js";

/**
 * Set Flect component datas from the expression result
 * @type {FLECT.Directive}
 */
export const dataDirective = (context, element, expression, attributeName) => {
    /** @type {FLECT.Element.Datas} */
    element.datas || (element.datas = {});

    /*
        Why do we use a mutableSignal instead of a simple signal ?
        - In a dataDirective we use a reactive function to trigger signals.
        - So when defining the reactive function, it becomes "currentReactive"
          which indicates that any signal triggered during its construction will
          add the function to its dependency list.
        - The problem is that we are asking to execute all signal dependencies
          if we used "signal(value)". But these dependencies themselves contain
          signals. As the "currentReactive" function is defined, they will also
          add it to their dependency list.
        - To solve this we use a mutableSignal which fires only when the reactive
          function definition is completed.
    */

    let props = null;

    const mutable = {
        mutableSignal: (signal, value) => (props = { signal, value }),
    };

    const reactiveFunction = reactive(() => {
        const signal = element.datas[attributeName];
        const value = expression(context);

        if (signal && signal.issignal) {
            // we use the mutableSignal function instead of signal(value)
            // to prevent side effects (infinite dependencies loop)
            mutable.mutableSignal(signal, value);
        } else {
            // we store the value, later the signal will be built by the element
            element.datas[attributeName] = value;
        }
    });

    // if the signal is not defined yet, we prevent execution
    if (props) {
        props.signal(props.value);
    }

    // mutate the mutableSignal
    mutable.mutableSignal = (signal, value) => signal(value);

    return reactiveFunction;
};
