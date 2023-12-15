/*
    classe qui etend HTMLelement avec son propre cycle de vie
    effectue une mise en cache de sa carté d'interactivité ainsi que de son template
    la mise en cache se prolonge grace à la carte d'intéractivité sur les modeles imbriqués.
*/

import { signal } from "../reactivity/signal";
import {
    createEmptyTemplate,
    createHtmlTemplate,
    createTemplateFragmentFromNodeList,
    createTemplateFragmentFromString,
} from "./html";
import { createTemplateMap } from "./map";

export class xElement extends HTMLElement {
    constructor() {
        super();
        /*
            this.cache - from other xElement templates
            this.datas - from self attributes
            this.static.render - from define
            this.static.template - from renderFunction
            this.static.map - from binding
        */
        /** @type {Object} */
        this.datas = this.datas || {};
    }

    connectedCallback() {
        /*  ---> run this.static.render.connected() ?
            1 -> execute renderFunction(data, html) -> store result
            2 -> check if template ? template = interpreted result (bindmap) : template = template
            3 -> clone the template
            4 -> bind the template (use the bindmap)
            5 -> replace element in dom
        */
    }

    // we use this instead of disconnectedCallback because
    // the element is immediatly disconnected after being initialized
    disconnectCallback() {
        /*  ---> run this.static.render.disconnected() ?
            1 -> unbind the element reactivity
        */
    }

    render() {
        /** @type {xDefinition} */
        const definition = this.cache || this.static;
        let template = definition.template;
        let map = definition.map;

        const data = signal;
        const html = template ? createHtmlTemplate : createEmptyTemplate;

        /**
         * Execute the renderFunction to get the template and hydrate this.datas
         * @type {String|NodeList}
         */
        const renderResult = this.static.renderFunction.call(
            this.datas,
            data,
            html
        );

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

            // if the template is stored (cache or static) we want to clone it
            if (definition.template) {
                template = template.cloneNode(true);
            }

            // bind template map
            // replace x-element by template
        }
    }
}
