/*
    Flect signals implementation based on S.js
    https://github.com/adamhaile/S/blob/master/src/S.ts
*/

import { FLECT } from "../utils/types.js";

/**
 * The current running reactive function
 * @type {FLECT.Reactive|null}
 */
let currentReactive = null;
/**
 * The current avoided reactive function
 * @type {FLECT.Reactive|null}
 */
let avoidedReactive = null;

/**
 * Create a signal function
 * @type {FLECT.Method.Signal}
 */
export const signal = (value) => {
    // create the getter function
    const getter = function (dataUpdated, avoid) {
        let previousAvoided = avoidedReactive;
        avoid && (avoidedReactive = avoid);

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
            if (currentReactive && currentReactive !== avoidedReactive) {
                getter.reactives.add(currentReactive);
                currentReactive.signals.add(getter.reactives);
            }
        }

        avoid && (avoidedReactive = previousAvoided);

        // return the value
        return getter.data;
    };
    // use this to access data without triggering signal
    getter.data = value;
    // use this to check if a variable is a signal
    getter.issignal = true;
    /**
     * setup dependencies
     * @type {FLECT.Dependencies.Reactives}
     */
    getter.reactives = new Set();

    // return the signal setter/getter function
    return getter;
};

/** @returns {FLECT.Element.DisconnectCallback} */
export const disconnectReactive = (reactive) => () => {
    /** @type {FLECT.Dependencies.Reactives} */
    for (const signalReactives of reactive.signals) {
        // remove the function from the signal dependencies
        // by doing this signal will not trigger the function on change
        signalReactives.delete(reactive);
    }
};

/**
 * Run a function, if signal is played add the function to it's dependencies
 * then return the function as a reactive function
 * @param {Function} callback
 * @returns {FLECT.Reactive}
 */
export const reactive = (callback) => {
    // store the previous value
    const previousValue = currentReactive;

    // update currentReactive function and create a dependency Array
    currentReactive = callback;
    /**
     * setup dependencies
     * @type {FLECT.Dependencies.Signals}
     */
    currentReactive.signals = new Set();

    /** @type {FLECT.Element.DisconnectCallback} */
    currentReactive.disconnectCallback = disconnectReactive(currentReactive);

    // call the function
    callback();

    // set currentReactive value back to previousValue
    // this is very important for nested reactives functions
    currentReactive = previousValue;
    return callback;
};
