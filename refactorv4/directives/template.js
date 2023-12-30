import { forDirective } from "./for.js";

/**
 * Retrieve the corresponding directive from the attribute name
 * @param {HTMLElement.attribute} attribute
 */
export function templateDirective(attribute) {
    switch (attribute.name) {
        case "x-for":
            return forDirective;
        case "x-if":
            return;
    }
}
