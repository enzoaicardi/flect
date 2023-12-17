/*
    Définition de l'ensemble des types grace à JsDoc pour mieux fournir plus de détails
    sur l'implémentation de la librairie
*/

/**
 * @typedef {[{map: xMap, template: NodeList, attributes: {name: String, expression: Function}}]} xMap
 * @typedef {{template: DocumentFragment, map: xMap}} xDefinition
 * @typedef {{directive: Function, expression: Function}} xDefinitionAttribute
 * @typedef {{name: xDefinitionAttribute}} xDefinitionAttributes
 * @typedef {{name: String, value: String}} Attribute
 */
