/*
    Carte des expressions, evalue un template et construit le schema d'intéractivité
    cela permet de rendre beaucoup plus performant l'analyse d'un nouveau template
*/

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
            map: false,
            template: false,
            attributes: {},
        };

        let index = element.attributes.length;

        while (index--) {
            /** @type {Attribute} */
            const attr = element.attributes[index];

            // tester les variations possibles avant
            // xEventAttribute -> must have -> event bindind
            // xScopedAttribute ? a voir...

            if (isXAttribute(attr)) {
                // TODO
                // Si xElement -> bind les données
                // Sinon -> bind les attributs -> directives attr
                //  on bind if et for ici aussi -> mais on verifie si element = template

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
