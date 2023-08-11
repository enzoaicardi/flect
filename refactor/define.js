import { FlectXElement } from "./element.js"

let registry = {}

export function define(componentTag, renderFunction){

    // define new class name
    let className = 'FlectX' + componentTag

    // check registry
    if(registry[className]) {
        throw `Element x-${className} is already defined !`
    }

    // build the class
    registry[className] = class extends FlectXElement{
        constructor(){
            super()
        }
    }
    
    // attach custom meta-datas
    let component = registry[className]
        component.prototype.xclass = component
        component.xname = className
        component.xrender = renderFunction
        component.xtemplate

    // define customElement
    customElements.define('x-' + componentTag, component)

}