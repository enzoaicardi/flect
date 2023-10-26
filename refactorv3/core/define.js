/*

*/

export function define(name, definition){

    // setup class statics
    definition.prototype._xclass = definition

    // define native customElement
    customElements.define('x-' + name, definition)

}