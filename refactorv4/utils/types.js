/*
    Définition de l'ensemble des types grace à JsDoc pour mieux fournir plus de détails
    sur l'implémentation de la librairie
*/

/**
 * @typedef {{}} xDatas Object containing component's relative datas
 * @typedef {[xDefinition]} xMap Array of xDefinitions
 * @typedef {{index: Number, template: DocumentFragment, map: xMap, attributes: {name: xDefinitionAttribute}}} xDefinition Object representing the definition of a HTMLElement in Flect
 * @typedef {{directive: Function, expression: xExpression|String}} xDefinitionAttribute Object defining a directive and the associated expression
 * @typedef {{name: String, value: String}} Attribute HTMLElement attribute representation
 * @typedef {Map<HTMLElement, [Function]>} xTrace Map containing component's reactive functions
 */

/**
 * @callback xRenderFunction Function used to hydrate datas and create component template & map
 * @param {Function} data
 * @param {html} html
 * @returns {DocumentFragment}
 */

/**
 * @callback xSignal Function used to get or change value rerunning dependencies functions
 * @param {any?} updatedValue The (optional) new value of the variable
 * @property {any} data That property access data without triggering signal
 * @returns {any} Returns the variable value
 */

/**
 * @callback xExpression Function generated from string with the evaluator
 * @param {xDatas} scope
 * @returns {any}
 */

/**
 * @callback xDirective Function creating a Flect directive
 * @param {xDatas} context
 * @param {HTMLElement} element
 * @param {String} attributeName
 * @param {xExpression} expression
 * @returns {Function}
 */
