import { isXAttribute, isXElement } from "../utils/utils-tests.js"
import { getPath } from "../path/path-definition.js"
import { getAttributeAction } from "./binding-map-attribute.js"

export function createBindingMap(nodeList){

    let list = []

    for(let x = 0; x < nodeList.length; x++){

        let element = nodeList[x]
        let isComponent = isXElement(element)

        let map = {
            effects: [],
            once: [],
            list: false,
            index: false,
            template: false
        }

        let l = element.attributes.length-1

        while(l--){
            
            // setup shortcuts
            let attribute = element.attributes[l]
            let value = attribute.value
            let name = attribute.name

            if(!isXAttribute(name)) continue

            // setup map.index
            map.index = x

            if(isComponent){
                
                // ...

            }

            else{

                // setup [path, action]
                let path = getPath(value)
                let action = getAttributeAction(name, path)

                if(path.isPattern){

                    let uniques = {}

                    // create all effects related to unique paths
                    for(let p of path.paths){
                        if(uniques[p.key]) continue
                        createBindingMapEffect(map, path, action, p.key)
                    }

                }

                else {
                    // create effect for the only path
                    createBindingMapEffect(map, path, action)
                }

            }

            // clear attribute
            element.removeAttribute(name)

        }

        // explore, prebind
        // add references
        // add _xcache {bindingMap, template} + add registry

        // setup map list (even for xElements)
        map.list = createBindingMap(element.children)

        // push map into the list
        map.index !== false || map.list && (list.push(map))


    }

    return list.length && list

}

function createBindingMapEffect(map, path, action, key){

    let effect = [path, action]
        effect.key = key || path.key

    map.effects.push(effect)

}