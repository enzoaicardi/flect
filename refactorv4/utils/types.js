/*
    Définition de l'ensemble des types grace à JsDoc pour mieux fournir plus de détails
    sur l'implémentation de la librairie
*/

import { xHandler } from "../directives/event.js";
import { xElement } from "../classes/element.js";
import { xTemplate } from "../classes/template.js";
export const FLECT = {};

/**
 * Element prototype
 * -- Element
 * @typedef {xTemplate|xElement} FLECT.Element Interactive element class
 * -- Element.Datas
 * @typedef {{ref: FLECT.Element.Datas.Reference, component: FLECT.Element}} FLECT.Element.Datas Object containing component's relative datas
 * -- Element.References
 * @typedef {{name: [Function]}} FLECT.Element.References Object containing component's relative references with callback list
 * -- Element.References.Array
 * @typedef {[Function, signal: FLECT.Signal]} FLECT.Element.References.Array Array containing reference callback list
 */
/**
 * -- Part
 * @typedef {{flag: Comment, property: FLECT.Signal, manager: FLECT.Element}} FLECT.Part Abstract DOM part used to manipulate a fragment
 */
/** - Element.Datas.Reference
 * @callback FLECT.Element.Datas.Reference Function used to apply effects to a DOM reference
 * @param {String} name The matching name of the DOM references
 * @param {FLECT.Element.Datas.Reference.Callback} callback Function to play when the reference is found in the DOM
 */
/** - Element.Datas.Reference.Callback
 * @callback FLECT.Element.Datas.Reference.Callback
 * @param {HTMLElement} element The element affected by the callback
 */
/**
 * Element static representation
 * -- Template
 * @typedef {DocumentFragment} FLECT.Template HTML templates used in components
 * -- Schema
 * @typedef {[FLECT.Definition]} FLECT.Schema Array of definitions
 */

/**
 * Hydration
 * -- Definition
 * @typedef {{index: Number, template: FLECT.Template, schema: FLECT.Schema, reactive: Boolean, attrs: FLECT.Attributes}} FLECT.Definition Object representing the definition of a HTMLElement
 * -- Attributes
 * @typedef {Schema<String, FLECT.Action>} FLECT.Attributes Schema of attributes with associated actions
 * -- Action
 * @typedef {{expression: FLECT.Expression|String, directive: Function}} FLECT.Action Object defining a directive and the associated expression
 * -- Handler
 * @typedef {xHandler} FLECT.Handler Class representing an event handler object
 */
/** - Directive
 * @callback FLECT.Directive Function creating a reactive function
 * @param {FLECT.Element.Datas} context The context of the expression passed throught "with"
 * @param {HTMLElement} element The element affected by the directive
 * @param {FLECT.Expression|String} expression The expression executed
 * @param {String} attributeName The attribute responsible of the directive
 * @returns {FLECT.Reactive|void}
 */
/** - Expression
 * @callback FLECT.Expression Function generated from string with the evaluator
 * @param {FLECT.Element.Datas} scope Object used to retrieve datas without prefixing "this"
 * @property {FLECT.Handler} handler That property is used to store the handler attached to the expression
 * @returns {any}
 */

/**
 * Reactivity
 * -- Dependencies...
 * @typedef {Set<FLECT.Reactive|FLECT.Element>} FLECT.Dependencies.Trail Set of reactive functions and elements
 * @typedef {Set<FLECT.Reactive>} FLECT.Dependencies.Reactives Set of reactive functions trigerred by signal
 * @typedef {Set<FLECT.Dependencies.Reactives>} FLECT.Dependencies.Signals Set of reactive functions trigerred by signal
 */
/** - Reactive
 * @callback FLECT.Reactive Function running everytime a containing signal value change
 * @returns
 */
/** - Signal
 * @callback FLECT.Signal Function used to get or change value rerunning dependencies functions
 * @param {any?} updatedValue The (optional) new value of the variable
 * @property {any} data That property access data without triggering signal
 * @property {Boolean} issignal That property is used to test if a property is a signal
 * @returns {any} Returns the variable value
 */

/**
 * Methods
 */
/** - Define
 * @callback FLECT.Method.Define Function used to define a customElement
 * @param {FLECT.Method.Define.Name} name The name of the customElement without x- prefix
 * @param {FLECT.Method.Define.Render} renderFunction Function used to render the component
 * @returns {FLECT.Element} The customElement class
 */
/** - Define.Name
 * @typedef {String} FLECT.Method.Define.Name The name of the customElement without x- prefix
 */
/** - Define.Render
 * @callback FLECT.Method.Define.Render Function used to hydrate datas and create component template & schema
 * @param {FLECT.Method.Define.Render.Signal} signal Function used to create a signal that can trigger changes through reactives functions
 * @param {FLECT.Method.Define.Render.HTML} html Function used to create html template
 * @param {FLECT.Method.Define.Render.CSS} css Function used to create css template
 * @this {FLECT.Element.Datas}
 * @returns {FLECT.Template} The final template of the component
 */
/** - Define.Render.Signal
 * @callback FLECT.Method.Define.Render.Signal Function used to create a signal that can trigger changes through reactives functions
 * @param {any?} value Default value of signal data
 * @returns {FLECT.Signal} A signal that can be used to create reactive variables
 */
/** - Define.Render.HTML
 * @callback FLECT.Method.Define.Render.HTML Function used to create html template
 * @param {String?} templateLiteral String representation of html template
 * @returns {FLECT.Template|null} The component template
 */
/** - Define.Render.CSS
 * @callback FLECT.Method.Define.Render.CSS Function used to create css template and also define css selectors
 * @param {String?} templateLiteral String representation of css template or the name of the selector
 * @returns {String} String representation of css template
 */
