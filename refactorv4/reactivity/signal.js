let currentFunction = null;

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
    getter.data = value;
    return getter;
}

function reactive(fn) {
    const previousValue = currentFunction;
    currentFunction = fn;
    fn();
    currentFunction = previousValue;
}
