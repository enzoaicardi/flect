export function bindElement(element, bindmap, temp){

    let maps = bindmap.children
    let array = []

    for(let index in maps){

        let map = maps[index]
        let node = element.childNodes[index]
        let effects = map.effects

        !temp || (array.push(node))

        for(let key in effects){

            this.proxy.effect(key, node, effects[key])

            // run action the first time to hydrate component
            for(let [action, pattern] of effects[key]){
                action.call(this, null, node, pattern)
            }

        }

        for(let action of map.onces){
            action.call(this, node, map)
        }

        // bind childs only if node is not action node
        map.break || (array.push(...this.bindElement(node, map, temp)))

    }

    // return an unbindArray
    return array

}