/* Flect Alpine.js implementation */

/** evaluated expressions cache */
const evaluatorMemo = {};

/**
 * Create a secure executable function from string expression
 * @param {String} expression
 * @returns {Function}
 */
function generateFunctionFromString(expression) {
    if (evaluatorMemo[expression]) {
        return evaluatorMemo[expression];
    }

    let SyncFunction = Object.getPrototypeOf(function () {}).constructor;

    // Some expressions that are useful in Flect are not valid as the right side of an expression.
    // Here we'll detect if the expression isn't valid for an assignment and wrap it in a self-
    // calling function so that we don't throw an error AND a "return" statement can b e used.
    let rightSideSafeExpression =
        0 ||
        // Support expressions starting with "if" statements like: "if (...) doSomething()"
        /^[\n\s]*if.*\(.*\)/.test(expression.trim()) ||
        // Support expressions starting with "let/const" like: "let foo = 'bar'"
        /^(let|const)\s/.test(expression.trim())
            ? `(()=>{ ${expression} })()`
            : expression;

    const safeSyncFunction = () => {
        try {
            let func = new SyncFunction(
                ["__self", "scope"],
                `with (scope) { __self.result = ${rightSideSafeExpression} }; __self.finished = true; return __self.result;`
            );

            Object.defineProperty(func, "name", {
                value: `[Flect] ${expression}`,
            });

            return func;
        } catch (error) {
            console.error("[Flect] expression error : " + expression, error);
            return false;
        }
    };
    let func = safeSyncFunction();

    evaluatorMemo[expression] = func;

    return func;
}
