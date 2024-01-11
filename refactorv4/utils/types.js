/*
    All FLECT types definitions via JSDoc, used in major IDEs
*/

import { xHandler } from "../directives/event.js";
import { xElement } from "../classes/element.js";
import { xManager } from "../classes/manager.js";
export const FLECT = {};

/**
 * Element prototype
 * -- Element
 * @typedef {xManager|xElement} FLECT.Element Interactive element class
 * -- Element.Datas
 * @typedef {{ref: FLECT.Element.Datas.Reference, component: FLECT.Element}} FLECT.Element.Datas Object containing component's relative datas
 * -- Element.References
 * @typedef {{name: FLECT.Element.References.Array}} FLECT.Element.References Object containing component's relative references with callback list
 * -- Element.References.Array
 * @typedef {[Function, signal: FLECT.Signal]} FLECT.Element.References.Array Array containing reference callback list
 */
/** - Element.Datas.Reference
 * @callback FLECT.Element.Datas.Reference Function used to apply effects to a DOM reference
 * @param {string} name The matching name of the DOM references
 * @param {FLECT.Element.Datas.Reference.Callback} callback Function to play when the reference is found in the DOM
 */
/** - Element.Datas.Reference.Callback
 * @callback FLECT.Element.Datas.Reference.Callback
 * @param {HTMLElement} element The element affected by the callback
 */
/** - Element.DisconnectCallback
 * @callback FLECT.Element.DisconnectCallback Function used to clear signals dependencies: enabled on xManager, xElement and xReactive
 * @param {FLECT.Element.Datas} [datas] Datas of the element
 */
/**
 * Element static representation
 * -- Template
 * @typedef {DocumentFragment} FLECT.Template HTML templates used in components
 * -- Schema
 * @typedef {[FLECT.Definition]} FLECT.Schema Array of definitions
 */
/**
 * -- Part
 * @typedef {{flag: Comment, property: FLECT.Signal, manager: FLECT.Element}} FLECT.Part Abstract DOM part used to manipulate a fragment
 */

/**
 * Hydration
 * -- Definition
 * @typedef {{pos: number schema: FLECT.Schema, reactive: boolean, attrs: FLECT.Attributes}} FLECT.Definition Object representing the definition of a HTMLElement
 * -- Attributes
 * @typedef {Object<string, FLECT.Action>} FLECT.Attributes Schema of attributes with associated actions
 * -- Action
 * @typedef {{expression: FLECT.Expression|string, directive: Function}} FLECT.Action Object defining a directive and the associated expression
 * -- Handler
 * @typedef {xHandler} FLECT.Handler Class representing an event handler object
 */
/** - Directive
 * @callback FLECT.Directive Function creating a reactive function
 * @param {FLECT.Element.Datas} context The context of the expression passed throught "with"
 * @param {HTMLElement} element The element affected by the directive
 * @param {FLECT.Expression|string} expression The expression executed
 * @param {string} attributeName The attribute responsible of the directive
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
 * -- Dependencies
 * -- Dependencies.Trail
 * @typedef {Set<FLECT.Reactive|FLECT.Element>} FLECT.Dependencies.Trail Set of reactive functions and elements
 * -- Dependencies.Reactives
 * @typedef {Set<FLECT.Reactive>} FLECT.Dependencies.Reactives Set of reactive functions trigerred by signal
 * -- Dependencies.Signals
 * @typedef {Set<FLECT.Dependencies.Reactives>} FLECT.Dependencies.Signals Set of reactive functions trigerred by signal
 */
/** - Reactive
 * @callback FLECT.Reactive Function running everytime a containing signal value change
 * @property {FLECT.Dependencies.Signals} signals All signals dependencies containing that reactive function
 * @returns {any}
 */
/** - Signal
 * @callback FLECT.Signal Function used to get or change value rerunning dependencies functions
 * @param {any?} updatedValue The (optional) new value of the variable
 * @property {any} data That property access data without triggering signal
 * @property {boolean} issignal That property is used to test if a property is a signal
 * @property {FLECT.Dependencies.Reactives} reactives All reactives functions in dependencies
 * @property {FLECT.Dependencies.Reactives} effect Public access to dependencies
 * @returns {any} Returns the variable value
 */

/**
 * Methods
 */
/** - Define
 * @callback FLECT.Method.Define Function used to define a customElement
 * @param {FLECT.Method.Define.Name} name The name of the customElement without x- prefix
 * @param {FLECT.Method.Define.Render} renderFunction Function used to render the component
 * @param {FLECT.Method.Define.Options} options Object used to change component's behavior
 * @returns {FLECT.Element} The customElement class
 */
/** - Define.Name
 * @typedef {string} FLECT.Method.Define.Name The name of the customElement without x- prefix
 */
/** - Define.Render
 * @callback FLECT.Method.Define.Render Function used to hydrate datas and create component template & schema
 * @param {FLECT.Method.Signal} signal Function used to create a signal that can trigger changes through reactives functions
 * @param {FLECT.Method.Define.Render.HTML} html Function used to create html template
 * @param {FLECT.Method.Define.Render.CSS} css Function used to create css template
 * @this {FLECT.Element.Datas}
 * @returns {FLECT.Template} The final template of the component
 */
/** - Define.Render.HTML
 * @callback FLECT.Method.Define.Render.HTML Function used to create html template
 * @param {string?} templateLiteral String representation of html template
 * @returns {FLECT.Template|null} The component template
 */
/** - Define.Render.CSS
 * @callback FLECT.Method.Define.Render.CSS Function used to create css template and also define css selectors
 * @param {string?} templateLiteral String representation of css template or the name of the selector
 * @returns {string} String representation of css template
 */
/** - Signal
 * @callback FLECT.Method.Signal Function used to create a signal that can trigger changes through reactives functions
 * @param {any?} value Default value of signal data
 * @returns {FLECT.Signal} A signal that can be used to create reactive variables
 */
