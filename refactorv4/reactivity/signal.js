/**
 * The current running reactive function
 * @type {Function|null}
 */
let currentFunction = null;

/**
 * Create a signal function
 * @param {any} value
 * @returns {Function}
 */
export function signal(value) {
    const dependencies = new Set();
    const getter = function (dataUpdated) {
        if (dataUpdated) {
            getter.data = dataUpdated;
            for (const callback of dependencies) {
                callback();
            }
        } else {
            if (currentFunction) {
                dependencies.add(currentFunction);
                // TODO ->
                // currentFunction.signals.add(dependencies);
            }
            return getter.data;
        }
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
    const previousValue = currentFunction;
    currentFunction = callback;
    // TODO ->
    // currentFunction.signals = new Set();
    callback();
    currentFunction = previousValue;
}
