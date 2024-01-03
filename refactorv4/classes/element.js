/*
    xElement est une classe qui étend xTemplate afin de créer des customElements possédant leurs propres cycles de vie définis par les utilisateurs
*/

import { signal } from "../reactivity/signal.js";
import {
    createTemplateFragmentFromNodeList,
    createTemplateFragmentFromString,
} from "../templates/html.js";
import { createTemplateSchema } from "../templates/schema.js";
import { FLECT } from "../utils/types.js";
import { createReferenceArray } from "../directives/ref.js";
import {
    createEmptyTemplate,
    createLiteralTemplate,
} from "../templates/generic.js";
import { createCssTemplateOrSelector, cssNextId } from "../templates/css.js";
import { xTemplate } from "./template.js";
import { elementCloneNode } from "../utils/shortcuts.js";

export class xElement extends xTemplate {
    constructor() {
        super();
        /**
         * store every references with the callback list
         * @type {FLECT.Element.References}
         */
        this.references = {};
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
         * @type {FLECT.Element}
         */
        self.datas.component = self;

        /**
         * create the context.ref method
         * @type {FLECT.Element.Datas.Reference}
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

        self.unHydrate();
    }

    render() {
        let self = this;

        /** @type {FLECT.Definition} */
        const definition = self.cacheDefinition || self.static;
        /** @type {FLECT.Template} */
        let template = definition.template;
        /** @type {FLECT.Schema} */
        let schema = definition.schema;
        /** @type {Number} */
        let selectorId = self.static.selectorId;

        /** @type {FLECT.Method.Define.Render.Signal} */
        const data = signal;
        /** @type {FLECT.Method.Define.Render.HTML} */
        const html = template ? createEmptyTemplate : createLiteralTemplate;
        /** @type {FLECT.Method.Define.Render.CSS} */
        const css = selectorId
            ? createEmptyTemplate
            : createCssTemplateOrSelector;

        /** @type {FLECT.Method.Define.Render} */
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
            template = elementCloneNode(template, true);
        }

        // hydrate template schema
        if (schema) {
            self.hydrate(template.children, schema);
        }

        // replace xTemplate by template
        self.replaceWith(template);
    }

    /**
     * reference function used in context.ref
     * @type {FLECT.Element.Datas.Reference}
     */
    reference(name, callback) {
        /**
         * get the reference's callback array or create it
         * @type {FLECT.Element.References.Array}
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
