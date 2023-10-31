/*

*/

export function bindElements(nodeList, bindings){

    for(let map of bindings){

        let index = map.index
        let element = nodeList[index]
        let isComponent = !!map.template && (element.component = this)
        // can be usefull in case of unbind ?
        // let isBinded = map.effects.length || map.once.length

        // get every Effect<[path, action]>
        for(let effect of map.effects){
            // do something here
            this._xeffects.createEffect(effect.key, element, effect)
        }

        // get every Once<action>
        for(let once of map.once){
            // do something here
        }

        // if it is a xelement we let him self binding
        if(!isComponent && map.bindings){
            this.bindElements(element.children, map.bindings)
        }

    }

}