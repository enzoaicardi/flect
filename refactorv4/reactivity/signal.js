/** The current running function */
let currentFunction = null;

/**
 * Create a signal function
 * @param {any} value
 * @returns {Function}
 */
function signal(value) {
    const dependencies = new Set();
    const getter = function (dataUpdated) {
        if (dataUpdated) {
            getter.data = dataUpdated;
            for (const fn of dependencies) {
                fn();
            }
        } else {
            currentFunction && dependencies.add(currentFunction);
            return getter.data;
        }
    };
    // use this to access data without triggering signal
    getter.data = value;
    return getter;
}

/**
 * Run a function, if signal is played add the function to it's dependencies
 * @param {Function} fn
 */
function reactive(fn) {
    const previousValue = currentFunction;
    currentFunction = fn;
    fn();
    currentFunction = previousValue;
}
