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
 * @typedef {{ref: Flect.Element.Datas.Reference, component: Flect.Element}} Flect.Element.Datas Object containing component's relative datas
 * -- Element.References
 * @typedef {{name: [Function]}} Flect.Element.References Object containing component's relative references with callback list
 * -- Element.References.Array
 * @typedef {[Function, signal: Flect.Signal]} Flect.Element.References.Array Array containing reference callback list
 */
/** - Element.Datas.Reference
 * @callback Flect.Element.Datas.Reference Function used to apply effects to a DOM reference
 * @param {String} name The matching name of the DOM references
 * @param {Flect.Element.Datas.Reference.Callback} callback Function to play when the reference is found in the DOM
 */
/** - Element.Datas.Reference.Callback
 * @callback Flect.Element.Datas.Reference.Callback
 * @param {HTMLElement} element The element affected by the callback
 */
/**
 * Element static representation
 * -- Template
 * @typedef {DocumentFragment} Flect.Template HTML templates used in components
 * -- Schema
 * @typedef {[Flect.Definition]} Flect.Schema Array of definitions
 */

/**
 * Hydration
 * -- Definition
 * @typedef {{index: Number, template: Flect.Template, schema: Flect.Schema, attrs: Flect.Attributes}} Flect.Definition Object representing the definition of a HTMLElement
 * -- Attributes
 * @typedef {Schema<String, Flect.Action>} Flect.Attributes Schema of attributes with associated actions
 * -- Action
 * @typedef {{expression: Flect.Expression|String, directive: Function}} Flect.Action Object defining a directive and the associated expression
 * -- Handler
 * @typedef {xHandler} Flect.Handler Class representing an event handler object
 */
/** - Directive
 * @callback Flect.Directive Function creating a reactive function
 * @param {Flect.Element.Datas} context The context of the expression passed throught "with"
 * @param {HTMLElement} element The element affected by the directive
 * @param {Flect.Expression|String} expression The expression executed
 * @param {String} attributeName The attribute responsible of the directive
 * @returns {Flect.Reactive|void}
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
 * @callback Flect.Method.Define.Render Function used to hydrate datas and create component template & schema
 * @param {Flect.Method.Define.Render.Signal} signal Function used to create a signal that can trigger changes through reactives functions
 * @param {Flect.Method.Define.Render.HTML} html Function used to create html template
 * @param {Flect.Method.Define.Render.CSS} css Function used to create css template
 * @this {Flect.Element.Datas}
 * @returns {Flect.Template} The final template of the component
 */
/** - Define.Render.Signal
 * @callback Flect.Method.Define.Render.Signal Function used to create a signal that can trigger changes through reactives functions
 * @param {any?} value Default value of signal data
 * @returns {Flect.Signal} A signal that can be used to create reactive variables
 */
/** - Define.Render.HTML
 * @callback Flect.Method.Define.Render.HTML Function used to create html template
 * @param {String?} templateLiteral String representation of html template
 * @returns {Flect.Template|null} The component template
 */
/** - Define.Render.CSS
 * @callback Flect.Method.Define.Render.CSS Function used to create css template and also define css selectors
 * @param {String?} templateLiteral String representation of css template or the name of the selector
 * @returns {String} String representation of css template
 */
