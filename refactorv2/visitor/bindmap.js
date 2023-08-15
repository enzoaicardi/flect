import { isXAttribute } from "../utils/tests.js"

export function bindmapCreate(node, map){

    let bindmap;
    let pending = map || {attributes: {}, bindmap: {}}

    for(let attribute of node.attributes){

        let name = attribute.name

        if(isXAttribute(name)){
            bindmap = pending
            bindmap.attributes[name] = attribute.value
            // TODO -> créer le mirroir d'effet
        }

    }

    let children = node.children

    for(let x = 0; x < children.length; x++){

        let result = bindmapCreate(children[x])

        if(result){
            bindmap = pending
            bindmap.bindmap[x] = result
        }

    }

    return bindmap

}