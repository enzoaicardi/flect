/*
    Evaluates a template and builds the interactivity schema.
    This makes the analysis of a new template much more efficient.
*/

import { attributeDirective } from "../directives/attr.js";
import { dataDirective } from "../directives/data.js";
import { eventDirective } from "../directives/event.js";
import { generateFunctionFromString } from "../evaluator/evaluator.js";
import {
    isXAttribute,
    isXElement,
    isXEventAttribute,
    isXTemplate,
} from "../utils/tests.js";
import { createTemplateFragmentFromNodeList } from "./html.js";
import { FLECT } from "../utils/types.js";
import { templateDirective } from "../directives/template.js";
import { childNodesOf, childrenOf } from "../utils/shortcuts.js";

/**
 * Create a xElement template schema
 * @param {NodeList} nodeList
 * @returns {boolean|FLECT.Schema}
 */
export const createTemplateSchema = (nodeList) => {
    /** @type {FLECT.Schema} */
    const schema = [];

    for (let x = 0; x < nodeList.length; x++) {
        /** @type {HTMLElement} */
        let element = nodeList[x];
        const isxtemplate = isXTemplate(element);
        const isxelement = isxtemplate || isXElement(element);

        if (element.cacheChildren) {
            console.log(
                "SCHEMA modified children from ->",
                element,
                "\nchildren:",
                element.cacheChildren,
                element.children
            );
        }

        /** @type {FLECT.Definition} */
        const definition = {
            tagName: element.tagName, // this line is used to debug schema
            index: x,
            schema: false,
            template: false,
            reactive: isxelement,
            attrs: new Map(),
        };

        let index = element.attributes.length;

        while (index--) {
            /** @type {HTMLElement.attribute} */
            const attr = element.attributes[index];

            if (isXAttribute(attr)) {
                /** @type {boolean} */
                const isxevent = isXEventAttribute(attr);
                /** @type {string} */
                const name = isxevent
                    ? attr.name.substring(5)
                    : attr.name.substring(2);

                /**
                 * get the expression function or the attribute value for ref or css
                 * @type {FLECT.Expression|string}
                 */
                const expression =
                    attr.value &&
                    (name === "ref" || name === "css"
                        ? attr.value
                        : generateFunctionFromString(attr.value));

                /**
                 * extract the corresponding attribute or data directive
                 * @type {FLECT.Directive}
                 */
                const directive = isxtemplate
                    ? templateDirective(attr)
                    : isxelement
                    ? dataDirective
                    : isxevent
                    ? eventDirective
                    : attributeDirective(attr);

                /** @type {FLECT.Action} */
                const action = { expression, directive };

                /** @type {FLECT.Attributes} */
                definition.attrs.set(name, action);

                // clear element attribute
                element.removeAttribute(attr.name);
            }
        }

        if (childNodesOf(element.content || element).length) {
            if (isxelement) {
                element.ishydrated = true;
                /**
                 * If the element is a flect custom element
                 * we generate a template and store it in the cache
                 * @type {DocumentFragment}
                 */
                element = definition.template =
                    element.content ||
                    // TODO -> trouver le bug dans le binding
                    // ajuster le binding pour que l'ordre de definition des composants n'ait pas d'impact
                    // (element.cacheDefinition || element.static).template ||
                    createTemplateFragmentFromNodeList(childNodesOf(element));
            }

            /**
             * If the element has children
             * we build the definition of the element
             * @type {FLECT.Schema}
             */
            definition.schema = createTemplateSchema(childrenOf(element));
        }

        // if the definition is not empty we add it to the schema
        if (definition.attrs.size || definition.schema || definition.template) {
            schema.push(definition);
        }
    }

    /**
     * If there is no definition current schema return false
     * else return the array of definitions
     * @type {boolean|FLECT.Schema}
     */
    return schema.length > 0 && schema;
};
