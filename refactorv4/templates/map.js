/*
    Expression map, evaluates a template and builds the interactivity schema.
    This makes the analysis of a new template much more efficient.
*/

import { attributeDirective } from "../directives/attr.js";
import { dataDirective } from "../directives/data.js";
import { eventDirective } from "../directives/event.js";
import { generateFunctionFromString } from "../evaluator/evaluator.js";
import { isXAttribute, isXElement, isXEventAttribute } from "../utils/tests.js";
import { createTemplateFragmentFromNodeList } from "./html.js";
import { Flect } from "../utils/types.js";

/**
 * Create a xElement template map
 * @param {NodeList} nodeList
 * @returns {Boolean|Flect.Map}
 */
export function createTemplateMap(nodeList) {
    /** @type {Flect.Map} */
    const map = [];

    for (let x = 0; x < nodeList.length; x++) {
        /** @type {HTMLElement} */
        const element = nodeList[x];
        const isxelement = isXElement(element);

        /** @type {Flect.Definition} */
        const definition = {
            index: x,
            map: false,
            template: false,
            attributes: new Map(),
        };

        let index = element.attributes.length;

        while (index--) {
            /** @type {HTMLElement.attribute} */
            const attr = element.attributes[index];

            if (isXAttribute(attr)) {
                /** @type {Boolean} */
                const isxevent = isXEventAttribute(attr);
                /** @type {String} */
                const name = isxevent
                    ? attr.name.substring(5)
                    : attr.name.substring(2);

                /**
                 * get the expression function or the attribute value for ref or css
                 * @type {Flect.Expression|String}
                 */
                const expression =
                    attr.value &&
                    (name === "ref" || name === "css"
                        ? attr.value
                        : generateFunctionFromString(attr.value));

                /**
                 * extract the corresponding attribute or data directive
                 * @type {Flect.Directive}
                 */
                const directive = isxelement
                    ? dataDirective
                    : isxevent
                    ? eventDirective
                    : attributeDirective(attr);

                /** @type {Flect.Action} */
                const action = { expression, directive };

                /** @type {Flect.Attributes} */
                definition.attributes.set(name, action);

                // clear element attribute
                element.removeAttribute(attr.name);
            }
        }

        if (element.children.length) {
            if (isxelement) {
                /**
                 * If the element is a flect custom element
                 * we generate a template and store it in the cache
                 * @type {DocumentFragment}
                 */
                element = definition.template =
                    createTemplateFragmentFromNodeList(element.children);
            }

            /**
             * If the element has children
             * we build the definition of the element
             * @type {Flect.Map}
             */
            definition.map = createTemplateMap(element.children);
        }

        // if the definition is not empty we add it to the map
        if (definition.map || definition.attributes.size) {
            map.push(definition);
        }
    }

    /**
     * If there is no definition current map return false
     * else return the array of definitions
     * @type {Boolean|Flect.Map}
     */
    return map.length > 0 && map;
}
