export function bindElement(element, bindmap){

    let maps = bindmap.children

    for(let index in maps){

        let map = maps[index]
        let node = element.children[index]
        let effects = map.effects

        for(let key in effects){

            this.proxy.effect(key, node, effects[key], map)

            // run action the first time to hydrate component
            for(let [action, pattern] of effects[key]){
                action.call(this, null, node, pattern, map)
            }

        }

        for(let action of map.onces){
            action.call(this, node, map)
        }

        // bind childs only if node is not action node
        map.break || (this.bindElement(node, map))

    }

}