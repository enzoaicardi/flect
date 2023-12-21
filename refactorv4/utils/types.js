/*
    Définition de l'ensemble des types grace à JsDoc pour mieux fournir plus de détails
    sur l'implémentation de la librairie
*/

import { xHandler } from "../directives/event.js";
import { xElement } from "../templates/element.js";
export const Flect = {};

/**
 * Element prototype
 * -- Element
 * @typedef {xElement} Flect.Element Main customElement class
 * -- Element.Datas
 * @typedef {{}} Flect.Element.Datas Object containing component's relative datas
 *
 * Element static representation
 * -- Template
 * @typedef {DocumentFragment} Flect.Template HTML templates used in components
 * -- Map
 * @typedef {[Flect.Definition]} Flect.Map Array of definitions
 */

/**
 * Hydration
 * -- Definition
 * @typedef {{index: Number, template: Flect.Template, map: Flect.Map, attributes: Flect.Attributes}} Flect.Definition Object representing the definition of a HTMLElement
 * -- Attributes
 * @typedef {Map<String, Flect.Action>} Flect.Attributes Map of attributes with associated actions
 * -- Action
 * @typedef {{expression: Flect.Expression|String, directive: Function}} Flect.Action Object defining a directive and the associated expression
 * -- Handler
 * @typedef {xHandler} Flect.Handler Class representing an event handler object
 */
/** - Directive
 * @callback Flect.Directive Function creating a reactive function
 * @param {Flect.Element.Datas} context The context of the expression passed throught "with"
 * @param {HTMLElement} element The element affected by the directive
 * @param {Flect.Expression} expression The expression executed
 * @param {String} attributeName The attribute responsible of the directive
 * @param {Flect.Definition} definition The definition responsible of the directive
 * @returns {Flect.Reactive}
 */
/** - Expression
 * @callback Flect.Expression Function generated from string with the evaluator
 * @param {Flect.Element.Datas} scope Object used to retrieve datas without prefixing "this"
 * @property {Flect.Handler} handler That property is used to store the handler attached to the expression
 * @returns {any}
 */

/**
 * Reactivity
 * -- Dependencies...
 * @typedef {Set<Flect.Reactive>} Flect.Dependencies.Reactives Set of reactive functions trigerred by signal
 * @typedef {Set<Flect.Dependencies.Reactives>} Flect.Dependencies.Signals Set of reactive functions trigerred by signal
 */
/** - Reactive
 * @callback Flect.Reactive Function running everytime a containing signal value change
 * @returns
 */
/** - Signal
 * @callback Flect.Signal Function used to get or change value rerunning dependencies functions
 * @param {any?} updatedValue The (optional) new value of the variable
 * @property {any} data That property access data without triggering signal
 * @property {Boolean} issignal That property is used to test if a property is a signal
 * @returns {any} Returns the variable value
 */

/**
 * Methods
 */
/** - Define
 * @callback Flect.Method.Define Function used to define a customElement
 * @param {Flect.Method.Define.Name} name The name of the customElement without x- prefix
 * @param {Flect.Method.Define.Render} renderFunction Function used to render the component
 * @returns {Flect.Element} The customElement class
 */
/** - Define.Name
 * @typedef {String} Flect.Method.Define.Name The name of the customElement without x- prefix
 */
/** - Define.Render
 * @callback Flect.Method.Define.Render Function used to hydrate datas and create component template & map
 * @param {Flect.Method.Define.Render.Signal} data Function used to create signals
 * @param {Flect.Method.Define.Render.HTML} html Function used to create html template
 * @returns {Flect.Template} The final template of the component
 */
/** - Define.Render.Signal
 * @callback Flect.Method.Define.Render.Signal Function used to create a signal
 * @param {any?} value Function used to create signals
 * @returns {Flect.Signal} The final template of the component
 */
/** - Define.Render.HTML
 * @callback Flect.Method.Define.Render.HTML Function used to create html template
 * @param {String?} templateLiteral Function used to create signals
 * @returns {Flect.Template|null} The final template of the component
 */
