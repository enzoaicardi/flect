/**
 * The current running reactive function
 * @type {Function|null}
 */
let currentReactive = null;

/**
 * Create a signal function
 * @param {any} value
 * @returns {xSignal}
 */
export function signal(value) {
    // setup dependencies
    const reactives = new Set();

    // create the getter function
    const getter = function (dataUpdated) {
        // if new data is sent
        if (dataUpdated) {
            // update the value
            getter.data = dataUpdated;
            // run all the dependencies
            for (const callback of reactives) {
                callback();
            }
        } else {
            // if signal is running inside of a reactive function
            // we create all necessary dependencies
            if (currentReactive) {
                reactives.add(currentReactive);
                currentReactive.signals.add(dependencies);
            }
        }
        // return the value
        return getter.data;
    };
    // use this to access data without triggering signal
    getter.data = value;
    return getter;
}

/**
 * Run a function, if signal is played add the function to it's dependencies
 * @param {Function} callback
 */
export function reactive(callback) {
    // store the previous value
    const previousValue = currentReactive;

    // update currentReactive function and create a dependency Array
    currentReactive = callback;
    currentReactive.signals = new Set();

    // call the function
    callback();

    // set currentReactive value back to previousValue
    // this is very important for nested reactives functions
    currentReactive = previousValue;
    return callback;
}
