export function bindElement(element, bindmap){

    let maps = bindmap.children
    let array = []

    for(let index in maps){

        // shortcuts
        let map = maps[index]
        let effects = map.effects

        // setup node defaults
        let node = element.childNodes[index]
            node.component = this

        // binded trace
        map.static || (array.push(node))

        // matches trace
        !element._xmatches || (node._xmatches = element._xmatches)

        // add effects to proxy
        for(let key in effects){

            this.proxy.effect(key, node, effects[key])

            // run action the first time to hydrate component
            for(let [action, pattern] of effects[key]){
                action.call(this, null, node, pattern)
            }

        }

        // call once actions
        for(let action of map.onces){
            action.call(this, node, map)
        }

        // bind childs only if node is not transformer node
        map.break || (array.push(...this.bindElement(node, map)))

    }

    // return an unbindArray
    return array

}

/**
 * matches = Map({
 *  PATH: 5
 *  OTHER_PATH: 2
 * })
 */