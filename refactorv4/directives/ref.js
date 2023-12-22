import { reactive, signal } from "../reactivity/signal.js";
import { Flect } from "../utils/types.js";

/**
 * Apply reference callbacks based on attribute value
 * @type {Flect.Directive}
 */
export function refDirective(context, element, expression) {
    /** @type {String} */
    const referenceName = expression;

    /** @type {Flect.Element.References.Array} */
    const referenceArray = context.ref(referenceName);

    // used to determine if it's necessary to run the last callback only
    let primaryHydration = true;

    return reactive(() => {
        /** @type {Flect.Element.References.Array} */
        const array = referenceArray.signal();

        // apply all callbacks first time
        if (primaryHydration) {
            for (const callback of array) {
                callback(element);
            }
            primaryHydration = false;
        }
        // after apply only the last callback
        else {
            /** @type {Function} */
            array[array.length - 1](element);
        }
    });
}

/**
 * Function used to create an array with a signal property
 * this is usefull to trigger references updates
 * @returns {Flect.Element.References.Array}
 */
export function createReferenceArray() {
    const array = [];
    array.signal = signal([]);
    return array;
}
