/*
    Carte des expressions, evalue un template et construit le schema d'intéractivité
    cela permet de rendre beaucoup plus performant l'analyse d'un nouveau template
*/

import { isXAttribute } from "../utils/tests";

/**
 * Create a xElement template map
 * @param {NodeList} nodeList
 * @returns {xMap}
 */
export function createTemplateMap(nodeList) {
    /** @type {xMap} */
    const map = [];

    for (const x = 0; x < nodeList.length; x++) {
        /** @type {HTMLElement} */
        let element = nodeList[x];

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
            }
        }
    }

    return;
}
