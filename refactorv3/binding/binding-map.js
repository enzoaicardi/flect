import { isXElement } from "../../refactorv2/utils/test"

export function createBindingMap(nodeList){

    let list = []

    for(let x = 0; x < nodeList.length; x++){

        let element = nodeList[x]
        let map = {
            effects: [],
            once: [],
            list: false,
            index: false
        }

        if(isXElement(element)){
            // explore, prebind
            // add references
            // add cache + add registry
            // setup map.index
        }

        else{
            // explore attrs
            // bind children
            // setup map.index
        }

        // setup map list
        map.list = createBindingMap(element.children)

        // push map into the list
        map.index !== false || map.list && (list.push(map))


    }

    return list.length && list

}