/*
    Carte des expressions, evalue un template et construit le schema d'intéractivité
    cela permet de rendre beaucoup plus performant l'analyse d'un nouveau template
*/

import { attributeDirective } from "../directives/attr.js";
import { dataDirective } from "../directives/data.js";
import { eventDirective } from "../directives/event.js";
import { isXAttribute, isXElement, isXEventAttribute } from "../utils/tests.js";
import { createTemplateFragmentFromNodeList } from "./html.js";

/**
 * Create a xElement template map
 * @param {NodeList} nodeList
 * @returns {Boolean|xMap}
 */
export function createTemplateMap(nodeList) {
    /** @type {xMap} */
    const map = [];

    for (const x = 0; x < nodeList.length; x++) {
        /** @type {HTMLElement} */
        const element = nodeList[x];
        const isxelement = isXElement(element);

        /** @type {xDefinition} */
        const definition = {
            index: x,
            map: false,
            template: false,
            attributes: {},
        };

        let index = element.attributes.length;

        while (index--) {
            /** @type {Attribute} */
            const attr = element.attributes[index];

            if (isXAttribute(attr)) {
                /** @type {Boolean} */
                const isxevent = isXEventAttribute(attr);
                /** @type {String} */
                const name = isxevent ? attr.name.substring(5) : attr.name;

                /**
                 * get the expression function
                 * @type {xExpression}
                 */
                const expression =
                    attr.value && generateFunctionFromString(attr.value);

                /**
                 * extract the corresponding attribute or data directive
                 * @type {xDirective}
                 */
                const directive = isxelement
                    ? dataDirective
                    : isxevent
                    ? eventDirective
                    : attributeDirective(attr);

                /** @type {xDefinitionAttribute} */
                definition.attributes[name] = { expression, directive };

                // clear element attribute
                element.removeAttribute(attr);
            }
        }

        if (element.children.length) {
            if (isxelement) {
                /**
                 * If the element is a flect custom element
                 * we generate a template and store it in the cache
                 * @type {DocumentFragment}
                 */
                element = map.template = createTemplateFragmentFromNodeList(
                    element.children
                );
            }

            /**
             * If the element has children
             * we build the definition of the element
             * @type {xMap}
             */
            definition.map = createTemplateMap(element.children);
        }
    }

    /**
     * If there is no definition current map return false
     * else return the array of definitions
     * @type {Boolean|xMap}
     */
    return map.length > 0 && map;
}
