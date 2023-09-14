export function bindElement(element, bindmap){

    let maps = bindmap.children

    for(let index in maps){

        let map = maps[index]
        let node = element.children[index]
        let datas = map.datas

        for(let key in datas){

            this.proxy.effect(key, node, datas[key])

            // run action the first time to hydrate component
            for(let [action, pattern] of datas[key]){
                action.call(this, null, node, pattern)
            }

        }

        // bind childs only if node is not action node
        map.action || (this.bindElement(node, map))

    }

}