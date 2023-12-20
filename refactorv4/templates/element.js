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
        /** @type {Object} */
        this.datas = this.datas || {};

        // TODO -> garder une trace des propriétés pour examiner leurs dépendences
        // cela permet d'unhydrate.
        // On peut faire ça lors de l'execution de reactive, a chaque ajout par data de la fonction
        // dans le Set, on ajoute en même temps une référence à la data dans la fonction
        /** @type {xTrace} */
        this.trace = new Map();
    }

    connectedCallback() {
        console.log("Flect element found in the dom");
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
    disconnectCallback() {
        /*  ---> run this.static.render.disconnected() ?
            1 -> unhydrate the element reactivity
        */
    }

    render() {
        /** @type {xDefinition} */
        const definition = this.cache || this.static;
        /** @type {DocumentFragment} */
        let template = definition.template;
        /** @type {xMap} */
        let map = definition.map;

        /** @type {xSignal} */
        const data = signal;
        /** @type {Function} */
        const html = template ? createHtmlTemplate : createEmptyTemplate;

        /** @type {xRenderFunction} */
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
        this.hydrate(template.children, map);

        // replace x-element by template
        // this.parentNode.replaceChild(template, this);
    }

    /**
     * Hydrate HTMLElements based on xMap
     * @param {NodeList} nodeList
     * @param {xMap} map
     */
    hydrate(nodeList, map) {
        /** @type {xDefinition} */
        for (const definition of map) {
            // retrieve the HTMLElement from the index
            const element = nodeList[definition.index];
            // ... hydration here
        }
    }

    /**
     * UnHydrate HTMLElements based on xTrace
     * @param {HTMLElement} element
     */
    clear(element) {
        const dependencies = this.trace.get(element);
        // ... clear element hydration
        // and children hydration
    }
}
