/*
    Carte des expressions, evalue un template et construit le schema d'intéractivité
    cela permet de rendre beaucoup plus performant l'analyse d'un nouveau template
*/

import { attributeDirective } from "../directives/attr";
import { isXAttribute, isXElement } from "../utils/tests";
import { createTemplateFragmentFromNodeList } from "./html";

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
                /** @type {xDefinitionAttribute} */
                definition.attributes[attr.name] = {
                    // extract the corresponding attribute directive
                    directive: attributeDirective(attr),
                    // get the expression function
                    expression:
                        attr.value && generateFunctionFromString(attr.value),
                };

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
