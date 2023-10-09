export function bindElements(element, bindmap){

    let maps = bindmap.children
    let array = []

    for(let index in maps){

        // shortcuts
        let map = maps[index]
        let node = element.childNodes[index]

        // matches trace
        !element._xmatches || (node._xmatches = element._xmatches)

        // if map is not static
        if(!map.static){
        
            node.component = this
            let effects = map.effects

            // binded trace
            array.push(node)

            // add effects to proxy
            for(let key in effects){

                this.proxy.addEffect(key, node, effects[key])

                // run action the first time to hydrate component
                for(let [action, pattern] of effects[key]){
                    action.call(this, null, node, pattern)
                }

            }

            // call once actions
            for(let action of map.onces){
                action.call(this, node, map)
            }

        }

        // bind childs only if node is not transformer node
        map.break || (array.push(...this.bindElements(node, map)))

    }

    // return an bindedArray
    return array

}

/**
 * element._xmatches = Map({
 *  Path: index,
 *  Path: index
 * })
 */