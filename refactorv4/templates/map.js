/*
    Carte des expressions, evalue un template et construit le schema d'intéractivité
    cela permet de rendre beaucoup plus performant l'analyse d'un nouveau template
*/

/**
 * Create a xElement template map
 * @param {NodeList} nodeList
 * @returns {xMap}
 */
export function createTemplateMap(nodeList) {
    /** @type {xMap} */
    const mapList = [];

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
            // bind here
        }
    }

    return;
}
