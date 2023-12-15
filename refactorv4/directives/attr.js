/*
    Toutes les directives d'attributs ici
    x-text x-show ? x-ref x-... x-on:...
*/

/**
 * Retrieve the corresponding directive from the attribute name
 * @param {Attribute} attribute
 */
export function getAttributeDirective(attribute) {
    switch (attribute.name) {
        case "x-text":
            break; // text directive
        case "x-show":
            break; // show directive
        case "x-ref":
            break; // ref directive ? maybe not here because isn't a simple data refresh
        default:
            break; // default attribute directive
    }
}
