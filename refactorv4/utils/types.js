/*
    Définition de l'ensemble des types grace à JsDoc pour mieux fournir plus de détails
    sur l'implémentation de la librairie
*/

/**
 * @typedef {{}} xDatas Object containing component's relative datas
 * @typedef {[xDefinition]} xMap Array of xDefinitions
 * @typedef {{index: Number, template: DocumentFragment, map: xMap, attributes: {name: xDefinitionAttribute}}} xDefinition Object representing the definition of a HTMLElement in Flect
 * @typedef {{expression: xExpression|String, directive: Function}} xDefinitionAttribute Object defining a directive and the associated expression
 * @typedef {{name: String, value: String}} Attribute HTMLElement attribute representation
 * @typedef {Map<HTMLElement, [Function]>} xTrace Map containing component's reactive functions
 * @typedef {{eventHandler: Function, context: xDatas}} xHandler Class representing an event handler object
 * @typedef {Set<xReactive>} xSignalDependencies Set of reactive functions trigerred by signal
 * @typedef {Set<xSignalDependencies>} xReactiveDependencies Set of reactive functions trigerred by signal
 */

/**
 * @callback xRenderFunction Function used to hydrate datas and create component template & map
 * @param {Function} data Function used to create signals
 * @param {Function} html Function used to create html template
 * @returns {DocumentFragment} The final template of the component
 */

/**
 * @callback xSignal Function used to get or change value rerunning dependencies functions
 * @param {any?} updatedValue The (optional) new value of the variable
 * @property {any} data That property access data without triggering signal
 * @property {Boolean} issignal That property is used to test if a property is a signal
 * @returns {any} Returns the variable value
 */

/**
 * @callback xExpression Function generated from string with the evaluator
 * @param {xDatas} scope Object used to retrieve datas without prefixing "this"
 * @property {xHandler} handler That property is used to store the handler attached to the expression
 * @returns {any}
 */

/**
 * @callback xDirective Function creating a Flect directive
 * @param {xDatas} context The context of the expression passed throught "with"
 * @param {HTMLElement} element The element affected by the directive
 * @param {xExpression} expression The expression executed
 * @param {String} attributeName The attribute responsible of the directive
 * @returns {Function}
 */

/**
 * @callback xReactive Function running everytime a containing signal value change
 * @returns
 */
