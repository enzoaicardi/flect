/*
    Class that extends HTMLElement with its own lifecycle,
    caches its interactivity schema as well as its template.
    Caching is extended thanks to the interactivity schema
    on nested models.
*/

import { signal } from "../reactivity/signal.js";
import {
    createHtmlTemplate,
    createTemplateFragmentFromNodeList,
    createTemplateFragmentFromString,
} from "./html.js";
import { createTemplateSchema } from "./schema.js";
import { Flect } from "../utils/types.js";
import { createReferenceArray } from "../directives/ref.js";
import { createEmptyTemplate } from "./empty.js";
import { createCssTemplateOrSelector, cssNextId } from "./css.js";

export class xElement extends HTMLElement {
    constructor() {
        super();
        let self = this;
        /**
         * datas is used as a context for the render function
         * @type {Flect.Element.Datas}
         */
        self.datas = self.datas || {};

        /**
         * every time a directive run, we store the reactive function
         * inside dependencies at this.trail, theses dependencies can be
         * used to unhydrate a component or a sub set of elements
         * @type {Flect.Dependencies.Reactives}
         */
        self.trail = new Set();

        /**
         * store every references with the callback list
         * @type {Flect.Element.References}
         */
        self.references = {};
    }

    onMount() {}
    connectedCallback() {
        let self = this;
        /**
         * hydrate datas with (non x) attributes values
         * @type {HTMLElement.attribute}
         */
        for (const attribute of self.attributes) {
            self.datas[attribute.name] = attribute.value;
        }

        /**
         * define the component property
         * @type {Flect.Element}
         */
        self.datas.component = self;

        /**
         * create the context.ref method
         * @type {Flect.Element.Datas.Reference}
         */
        self.datas.ref = self.reference;

        /**
         * onMount is an user custom function defined with :
         * myClassReturnedByDefine.prototype.onMount = function(){ stuff here... }
         * @type {Function}
         */
        self.onMount(self.datas);

        // render the component logic
        self.render();
    }

    // we use this instead of disconnectedCallback because
    // the element is immediatly disconnected after being initialized
    onUnmount() {}
    disconnectCallback() {
        let self = this;
        /**
         * onUnmount is an user custom function defined with :
         * myClassReturnedByDefine.prototype.onUnmount = function(){ stuff here... }
         * @type {Function}
         */
        self.onUnmount(self.datas);

        self.unHydrate(self.trail);
    }

    render() {
        let self = this;

        /** @type {Flect.Definition} */
        const definition = self.cacheDefinition || self.static;
        /** @type {Flect.Template} */
        let template = definition.template;
        /** @type {Flect.Schema} */
        let schema = definition.schema;
        /** @type {Number} */
        let selectorId = self.static.selectorId;

        /** @type {Flect.Method.Define.Render.Signal} */
        const data = signal;
        /** @type {Flect.Method.Define.Render.HTML} */
        const html = template ? createEmptyTemplate : createHtmlTemplate;
        /** @type {Flect.Method.Define.Render.CSS} */
        const css = selectorId
            ? createEmptyTemplate
            : createCssTemplateOrSelector;

        /** @type {Flect.Method.Define.Render} */
        const renderFunction = self.static.renderFunction;

        /**
         * Execute the renderFunction to get the template and hydrate this.datas
         * @type {String|NodeList}
         */
        const renderResult = renderFunction.call(self.datas, data, html, css);

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

                // build the component schema
                schema = definition.schema = createTemplateSchema(
                    template.children
                );
            }
        }

        // if there is no selectorId we add it to the definition
        // and to the context.component property (used in cssDirective)
        // and finaly increment the cssSelectorsId if necessary
        self.selectorId = self.static.selectorId = selectorId || cssNextId();

        // if the template is stored (cache or static)
        // we want to clone it before hydration
        if (definition.template) {
            template = template.cloneNode(true);
        }

        // hydrate template schema
        if (schema) {
            self.hydrate(template.children, schema);
        }

        // replace x-element by template
        self.replaceWith(template);
    }

    /**
     * Hydrate HTMLElements based on schema
     * @param {NodeList} nodeList
     * @param {Flect.Schema} schema
     * @param {Flect.Datas} datas
     */
    hydrate(nodeList, schema, datas = this.datas) {
        /** @type {Flect.Definition} */
        for (const definition of schema) {
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
            for (const [name, action] of definition.attrs) {
                // apply the corresponding directive
                /** @type {Flect.Reactive|undefined} */
                const reactiveFunction = action.directive(
                    datas,
                    element,
                    action.expression,
                    name
                );

                // push the reactiveFunction into component trail
                // only if the directive return a reactive function
                if (reactiveFunction) {
                    this.trail.add(reactiveFunction);
                }
            }

            // if the element is a Flect component we give the cache
            if (isxelement && definition.template) {
                /** @type {Flect.Definition} */
                element.cacheDefinition = definition;
            }
            // if the element is not a Flect component we hydrate children
            else if (!isxelement && definition.schema) {
                this.hydrate(element.children, definition.schema);
            }
        }
    }

    /**
     * UnHydrate HTMLElements based on trail
     * @param {Flect.Dependencies.Reactives} trail
     */
    unHydrate(trail = this.trail) {
        /** @type {Flect.Reactive} */
        for (const reactiveFunction of trail) {
            /** @type {Flect.Dependencies.Signals} */
            for (const signalDependencies of reactiveFunction.signals) {
                // remove the function from the signal dependencies
                // by doing this signal will not trigger the function on change
                signalDependencies.delete(reactiveFunction);
            }
        }
        // clear the trail dependencies
        trail.clear();
    }

    /**
     * reference function used in context.ref
     * @type {Flect.Element.Datas.Reference}
     */
    reference(name, callback) {
        /**
         * get the reference's callback array or create it
         * @type {Flect.Element.References.Array}
         */
        const referenceArray =
            this.component.references[name] ||
            (this.component.references[name] = createReferenceArray());

        if (callback) {
            // we push the callback into the reference array
            referenceArray.push(callback);

            // we trigger the signal associated at the reference
            referenceArray.signalGetter(referenceArray);
        } else {
            // if there is no callback we return the reference array
            // this is usefull in refDirective to retrieve the signal
            return referenceArray;
        }
    }
}
