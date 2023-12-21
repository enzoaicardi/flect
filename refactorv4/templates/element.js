/*
    classe qui etend HTMLelement avec son propre cycle de vie
    effectue une mise en cache de sa carté d'interactivité ainsi que de son template
    la mise en cache se prolonge grace à la carte d'intéractivité sur les modeles imbriqués.
*/

import { signal } from "../reactivity/signal.js";
import {
    createEmptyTemplate,
    createHtmlTemplate,
    createTemplateFragmentFromNodeList,
    createTemplateFragmentFromString,
} from "./html.js";
import { createTemplateMap } from "./map.js";
import { Flect } from "../utils/types.js";

export class xElement extends HTMLElement {
    constructor() {
        super();
        /*
            this.cache - from other xElement templates
            this.datas - from self attributes
            this.static.render - from define
            this.static.template - from renderFunction
            this.static.map - from hydration
        */
        /** @type {Flect.Element.Datas} */
        this.datas = this.datas || {};

        // TODO -> garder une trace des propriétés pour examiner leurs dépendences
        // cela permet d'unhydrate.
        // On peut faire ça lors de l'execution de reactive, a chaque ajout par data de la fonction
        // dans le Set, on ajoute en même temps une référence à la data dans la fonction
        /** @type {Flect.Dependencies.Reactives} */
        this.trace = new Set();
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
         * onMount is an user custom function defined with :
         * myClassReturnedByDefine.prototype.onMount = function(){ stuff here... }
         * @type {Function}
         */
        this.onMount();

        // render the component logic
        this.render();

        /*  ---> run this.static.render.connected() ?
            1 -> execute renderFunction(data, html) -> store result
            2 -> check if template ? template = interpreted result (hydratemap) : template = template
            3 -> clone the template
            4 -> hydrate the template (use the hydratemap)
            5 -> replace element in dom
        */
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

        /*  ---> run this.static.render.disconnected() ?
            1 -> unhydrate the element reactivity
        */
    }

    render() {
        /** @type {Flect.Definition} */
        const definition = this.cache || this.static;
        /** @type {Flect.Template} */
        let template = definition.template;
        /** @type {Flect.Map} */
        let map = definition.map;

        /** @type {Flect.Method.Define.Render.Signal} */
        const data = signal;
        /** @type {Flect.Method.Define.Render.HTML} */
        const html = template ? createEmptyTemplate : createHtmlTemplate;

        /** @type {Flect.Method.Define.Render} */
        const renderFunction = this.static.renderFunction;

        /**
         * Execute the renderFunction to get the template and hydrate this.datas
         * @type {String|NodeList}
         */
        const renderResult = renderFunction.call(this.datas, data, html);

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

            // if the template is stored (cache or static)
            // we want to clone it before hydration
            if (definition.template) {
                template = template.cloneNode(true);
            }
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
                /** @type {Flect.Reactive} */
                const reactiveFunction = action.directive(
                    this.datas,
                    element,
                    action.expression,
                    name
                );

                // push the reactiveFunction into component trace
                this.trace.add(reactiveFunction);
            }

            // if the element is a Flect component we don't need to hydrate children
            if (!isxelement && definition.map) {
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
