let registry = {}

// export XElement as Flect.x
export { XElement as x }

// export define as Flect.define
export function define(name, definition){

    // check class definition in registry
    if(registry[name]){
        throw `Component x-${name} is already defined !`
    }

    // add class definition to registry
    registry[name] = 1

    // define native customElement
    definition.prototype._xclass = definition
    customElements.define('x-' + name, definition)

}