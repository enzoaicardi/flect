import { isXAttribute, isXElement } from "../utils/utils-tests.js"
import { getPath } from "../path/path-definition.js"
import { getAttributeAction } from "./binding-map-attribute.js"
import { asTemplate } from "../utils/utils-templates.js"
import { getDataAction } from "./binding-map-datas.js"

export function createBindingMap(nodeList){

    let bindings = []

    for(let x = 0; x < nodeList.length; x++){

        let element = nodeList[x]
        let isComponent = isXElement(element)

        let map = {
            effects: [],
            once: [],
            bindings: 0,
            index: false,
            template: false
        }

        // check element attributes
        let l = element.attributes.length

        while(l--){
            
            // setup shortcuts
            let attribute = element.attributes[l]
            let value = attribute.value
            let name = attribute.name

            if(!isXAttribute(name)) continue

            // setup map.index
            map.index = x

            // setup [path, action]
            let path = getPath(value)
            let action = !isComponent ? (getAttributeAction(name, path)) : (getDataAction(name, path))

            if(path.isPattern){

                let uniques = {}

                // create all effects related to unique paths
                for(let p of path.paths){
                    if(uniques[p.key]) continue
                    createBindingMapEffect(map, path, action, p.key)
                    uniques[p.key] = 1
                }

            }

            else {
                // create effect for the only path
                createBindingMapEffect(map, path, action)
            }

            // clear attribute
            element.removeAttribute(name)

        }

        if(element.children.length){

            if(isComponent){

                // setup map.index
                map.index = x

                // update template cache of xelement
                map.template = asTemplate(element)

                // update element to keep tracking
                element = map.template

            }

            // setup map bindings (even for xElements)
            map.bindings = createBindingMap(element.children)

        }

        // push map into the bindings
        if(map.index !== false || map.bindings){
            bindings.push(map)
        }


    }

    return bindings.length && bindings

}

function createBindingMapEffect(map, path, action, key){

    let effect = [path, action]
        effect.key = key || path.key

    map.effects.push(effect)

}