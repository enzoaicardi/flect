/*
TODO -> traduire
    xElement est une classe qui étend xAbstract afin de créer des customElements possédant leurs propres cycles de vie définis par les utilisateurs
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
import { elementCloneNode } from "../utils/shortcuts.js";
import { xAbstract } from "./abstract.js";

export class xElement extends HTMLElement {
    constructor() {
        super();
        this.setup();
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
            self.datas[attribute.name] = attribute.value || true;
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
         * every component hydrated inside of an other is marked as hydrated
         * if a component isn't marker as hydrated it can be for two reasons :
         * 1 - the component is a root component so there is no side effect
         * 2 - the component is registred before it's parent, it can result
         *     in multiples side effects, for that reason we keep the original
         *     array of children in a cacheChildren property on the parentElement.
         */
        if (!self.ishydrated) {
            const parent = self.parentElement;
            parent.cacheChildNodes = [].slice.call(parent.children);
            parent.cacheChildren = [].slice.call(parent.children);
            console.log(
                "ELEMENT cache parent from ->",
                self.tagName,
                "\nparent:",
                parent,
                parent.cacheChildren
            );
        }

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
        /** @type {number} */
        let selectorId = self.static.selectorId;

        // console.log(
        //     self,
        //     "\nhas template ?",
        //     !!template,
        //     "\nchildren are:",
        //     [].slice.call(self.children)
        // );

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
         * @type {string|NodeList}
         */
        const renderResult = renderFunction.call(self.datas, signal, html, css);

        // trigger render logic only if renderFunction return a template
        if (renderResult && !template) {
            // if renderResult came from templateLiteral
            if (typeof renderResult === "string") {
                template = definition.template =
                    createTemplateFragmentFromString(renderResult);
            }

            // else we consider renderResult as a NodeList, if renderResult is
            // equal to "this" we don't want to build a new fragment
            else if (renderResult !== self) {
                template = createTemplateFragmentFromNodeList(renderResult);
            } else {
                template = self;
            }

            // build the component schema
            schema = definition.schema = createTemplateSchema(
                template.children
            );
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

        console.log("schema is ->", self.tagName, schema);
        console.log("template is ->", self.tagName, template.childNodes);

        // replace xElement by template
        template !== self && self.replaceWith(template);
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

Object.assign(xElement.prototype, xAbstract);
