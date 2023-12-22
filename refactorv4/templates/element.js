/*
    Class that extends HTMLElement with its own lifecycle,
    caches its interactivity map as well as its template.
    Caching is extended thanks to the interactivity map
    on nested models.
*/

import { signal } from "../reactivity/signal.js";
import {
    createHtmlTemplate,
    createTemplateFragmentFromNodeList,
    createTemplateFragmentFromString,
} from "./html.js";
import { createTemplateMap } from "./map.js";
import { Flect } from "../utils/types.js";
import { createReferenceArray } from "../directives/ref.js";
import { createEmptyTemplate } from "./empty.js";
import { createCssTemplateOrSelector, cssNextId } from "./css.js";

export class xElement extends HTMLElement {
    constructor() {
        super();
        /**
         * datas is used as a context for the render function
         * @type {Flect.Element.Datas}
         */
        this.datas = this.datas || {};

        /**
         * every time a directive run, we store the reactive function
         * inside dependencies at this.trace, theses dependencies can be
         * used to unhydrate a component or a sub set of elements
         * @type {Flect.Dependencies.Reactives}
         */
        this.trace = new Set();

        /**
         * store every references with the callback list
         * @type {Flect.Element.References}
         */
        this.references = {};
    }

    onMount() {}
    connectedCallback() {
        console.log("Flect element found in the dom");

        /**
         * hydrate datas with (non x) attributes values
         * @type {HTMLElement.attribute}
         */
        for (const attribute of this.attributes) {
            this.datas[attribute.name] = attribute.value;
        }

        /**
         * create the context.ref method
         * @type {Flect.Element.Datas.Reference}
         */
        this.datas.ref = (name, callback) => {
            /**
             * get the reference's callback array or create it
             * @type {Flect.Element.References.Array}
             */
            const referenceArray =
                this.references[name] ||
                (this.references[name] = createReferenceArray());

            if (callback) {
                // we push the callback into the reference array
                referenceArray.push(callback);

                // we trigger the signal associated at the reference
                referenceArray.signal(referenceArray);
            } else {
                // if there is no callback we return the reference array
                // this is usefull in refDirective to retrieve the signal
                return referenceArray;
            }
        };

        /**
         * onMount is an user custom function defined with :
         * myClassReturnedByDefine.prototype.onMount = function(){ stuff here... }
         * @type {Function}
         */
        this.onMount();

        // render the component logic
        this.render();
    }

    // we use this instead of disconnectedCallback because
    // the element is immediatly disconnected after being initialized
    onUnmount() {}
    disconnectCallback() {
        /**
         * onUnmount is an user custom function defined with :
         * myClassReturnedByDefine.prototype.onUnmount = function(){ stuff here... }
         * @type {Function}
         */
        this.onUnmount();

        this.clear(this.trace);
    }

    render() {
        /** @type {Flect.Definition} */
        const definition = this.cache || this.static;
        /** @type {Flect.Template} */
        let template = definition.template;
        /** @type {Flect.Map} */
        let map = definition.map;
        /** @type {Number} */
        let selector = definition.selector;

        /** @type {Flect.Method.Define.Render.Signal} */
        const data = signal;
        /** @type {Flect.Method.Define.Render.HTML} */
        const html = template ? createEmptyTemplate : createHtmlTemplate;
        /** @type {Flect.Method.Define.Render.CSS} */
        const css = selector
            ? createEmptyTemplate
            : createCssTemplateOrSelector;

        /** @type {Flect.Method.Define.Render} */
        const renderFunction = this.static.renderFunction;

        /**
         * Execute the renderFunction to get the template and hydrate this.datas
         * @type {String|NodeList}
         */
        const renderResult = renderFunction.call(this.datas, data, html, css);

        // trigger render logic only if renderFunction return template
        if (renderResult) {
            if (!template) {
                // if renderResult came from templateLiteral
                if (typeof renderResult === "string") {
                    template = definition.template =
                        createTemplateFragmentFromString(renderResult);
                }

                // else we consider renderResult as a NodeList
                else {
                    template = createTemplateFragmentFromNodeList(renderResult);
                }

                // build the component map
                map = definition.map = createTemplateMap(template.children);
            }
        }

        // if the template is stored (cache or static)
        // we want to clone it before hydration
        if (definition.template) {
            template = template.cloneNode(true);
        }

        // if there is no selector we add it to the definition
        // and finaly increment the cssSelectorsId
        if (!selector) {
            definition.selector = cssNextId();
        }

        // hydrate template map
        if (map) {
            this.hydrate(template.children, map);
        }

        // replace x-element by template
        this.parentNode.replaceChild(template, this);
    }

    /**
     * Hydrate HTMLElements based on map
     * @param {NodeList} nodeList
     * @param {Flect.Map} map
     */
    hydrate(nodeList, map) {
        /** @type {Flect.Definition} */
        for (const definition of map) {
            /**
             * retrieve the HTMLElement from the index
             * @type {HTMLElement}
             */
            const element = nodeList[definition.index];

            /** @type {Boolean} */
            const isxelement = !!definition.template;

            /**
             * loop over all hydratable attributes
             * @type {[String, Flect.Action]}
             */
            for (const [name, action] of definition.attributes) {
                // apply the corresponding directive
                /** @type {Flect.Reactive|undefined} */
                const reactiveFunction = action.directive(
                    this.datas,
                    element,
                    action.expression,
                    name
                );

                // push the reactiveFunction into component trace
                // only if the directive return a reactive function
                if (reactiveFunction) {
                    this.trace.add(reactiveFunction);
                }
            }

            // if the element is a Flect component we give the cache
            if (isxelement && definition.template) {
                /** @type {Flect.Definition} */
                element.cache = definition;
            }
            // if the element is not a Flect component we hydrate children
            else if (!isxelement && definition.map) {
                this.hydrate(element.children, definition.map);
            }
        }
    }

    /**
     * UnHydrate HTMLElements based on trace
     * @param {Flect.Dependencies.Reactives} trace
     */
    clear(trace) {
        /** @type {Flect.Reactive} */
        for (const reactiveFunction of trace) {
            /** @type {Flect.Dependencies.Signals} */
            for (const signalDependencies of reactiveFunction.signals) {
                // remove the function from the signal dependencies
                // by doing this signal will not trigger the function on change
                signalDependencies.delete(reactiveFunction);
            }
        }
    }
}
