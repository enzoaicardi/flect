import { isXAttribute, isXElement } from "../../refactorv2/utils/test.js"
import { getPath } from "../path/path-definition.js"
import { getAttributeAction } from "./binding-attribute.js"

export function createBindingMap(nodeList){

    let list = []

    for(let x = 0; x < nodeList.length; x++){

        let element = nodeList[x]
        let isComponent = isXElement(element)

        let map = {
            effects: [],
            once: [],
            list: false,
            index: false
        }

        let x = element.attributes.length-1

        while(x--){
            
            // setup shortcuts
            let attribute = element.attributes[x]
            let value = attribute.value
            let name = attribute.name

            if(!isXAttribute(name)) continue

            if(isComponent){
                
                // ...

            }

            else{

                let path = getPath(value)
                let action = getAttributeAction(name, path)

            }

            element.removeAttribute(name)
            // clear attribute

        }

        // explore, prebind
        // add references
        // add _xcache {bindingMap, template} + add registry
        // setup map.index

        // explore attrs
        // bind children
        // setup map.index

        // setup map list
        map.list = createBindingMap(element.children)

        // push map into the list
        map.index !== false || map.list && (list.push(map))


    }

    return list.length && list

}