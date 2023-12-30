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
import { Flect } from "../utils/types.js";
import { templateDirective } from "../directives/template.js";

/**
 * Create a xElement template schema
 * @param {NodeList} nodeList
 * @returns {Boolean|Flect.Schema}
 */
export function createTemplateSchema(nodeList) {
    /** @type {Flect.Schema} */
    const schema = [];

    for (let x = 0; x < nodeList.length; x++) {
        /** @type {HTMLElement} */
        let element = nodeList[x];
        const isxelement = isXElement(element);
        const isxtemplate = !isxelement && isXTemplate(element);

        /** @type {Flect.Definition} */
        const definition = {
            index: x,
            schema: false,
            template: false,
            attrs: new Map(),
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
                    : isxtemplate
                    ? templateDirective(attr)
                    : isxevent
                    ? eventDirective
                    : attributeDirective(attr);

                /** @type {Flect.Action} */
                const action = { expression, directive };

                /** @type {Flect.Attributes} */
                definition.attrs.set(name, action);

                // clear element attribute
                element.removeAttribute(attr.name);
            }
        }

        // in case of <template> childNodes are always empty
        // because <template> return a documentFragment, itself
        // accessible with the element.content property
        if ((element.content || element).childNodes.length) {
            if (isxelement || isxtemplate) {
                /**
                 * If the element is a flect custom element
                 * we generate a template and store it in the cache
                 * @type {DocumentFragment}
                 */
                element = definition.template = isxtemplate
                    ? element.content
                    : createTemplateFragmentFromNodeList(element.childNodes);
            }

            /**
             * If the element has children
             * we build the definition of the element
             * @type {Flect.Schema}
             */
            definition.schema = createTemplateSchema(element.children);
        }

        // if the definition is not empty we add it to the schema
        if (definition.schema || definition.attrs.size) {
            schema.push(definition);
        }
    }

    /**
     * If there is no definition current schema return false
     * else return the array of definitions
     * @type {Boolean|Flect.Schema}
     */
    return schema.length > 0 && schema;
}
