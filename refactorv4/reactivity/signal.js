import { Flect } from "../utils/types.js";

/**
 * The current running reactive function
 * @type {Flect.Reactive|null}
 */
let currentReactive = null;

/**
 * Create a signal function
 * @type {Flect.Method.Define.Render.Signal}
 */
export function signal(value) {
    // create the getter function
    const getter = function (dataUpdated) {
        // if new data is sent
        if (dataUpdated !== undefined) {
            // update the value
            getter.data = dataUpdated;
            // run all the dependencies
            for (const callback of getter.reactives) {
                callback();
            }
        } else {
            // if signal is running inside of a reactive function
            // we create all necessary dependencies
            if (currentReactive) {
                getter.reactives.add(currentReactive);
                currentReactive.signals.add(getter.reactives);
            }
        }
        // return the value
        return getter.data;
    };
    // use this to access data without triggering signal
    getter.data = value;
    // use this to check if a variable is a signal
    getter.issignal = true;
    /**
     * setup dependencies
     * @type {Flect.Dependencies.Reactives}
     */
    getter.reactives = new Set();

    // return the signal setter/getter function
    return getter;
}

/**
 * Run a function, if signal is played add the function to it's dependencies
 * then return the function as a reactive function
 * @param {Function} callback
 * @returns {Flect.Reactive}
 */
export function reactive(callback) {
    // store the previous value
    const previousValue = currentReactive;

    // update currentReactive function and create a dependency Array
    currentReactive = callback;
    /** @type {Flect.Dependencies.Signals} */
    currentReactive.signals = new Set();

    // call the function
    callback();

    // set currentReactive value back to previousValue
    // this is very important for nested reactives functions
    currentReactive = previousValue;
    return callback;
}
