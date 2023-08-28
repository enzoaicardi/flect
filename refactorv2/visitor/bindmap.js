import { getAction } from "../bind/action.js";
import { createPattern } from "../pattern/pattern.js";
import { isXAction, isXAttribute, isXElement } from "../utils/tests.js";

export function createBindmap(node, matches = {}){

    let bindmap;
    // avoid over-usage of if statement
    let pending = {type: node.tagName, datas: {}, bindmap: {}, matches: matches}

    for(let attribute of node.attributes){

        let name = attribute.name
        let value = attribute.value

        if(isXAttribute(name)){

            let pattern = createPattern(value)
                pattern.attribute = name.substring(2)

            let action = getAction(name)
            let datas = pattern.datas

            bindmap || (bindmap = pending)
            
            for(let key in datas){

                let dataName = datas[key].steps[0]

                bindmap.datas[dataName] || (bindmap.datas[dataName] = [])
                bindmap.datas[dataName].push([action, pattern])

            }

        }

    }

    if(isXAction(node)){

        let key = node.getAttribute('key')

        if(key){
            matches = {...matches}
            matches[key] = node.getAttribute('var')
        }
        
    }

    if(!isXElement(node) || isXAction(node)){
    
        let children = node.children

        for(let x = 0; x < children.length; x++){

            let result = createBindmap(children[x], matches)

            if(result){
                bindmap || (bindmap = pending)
                bindmap.bindmap[x] = result
            }

        }

    }

    return bindmap

}

/*
    x-text="Hello {client.name} i'm {user.name}"
    x-class="button {icon} {inverted}"

    bindmap = {
        index: 0,
        matches: {
            item: ()=>'dataName.'+this.index
        },
        datas: {
            dataName: [[action, pattern], [action, pattern]]
            otherData: [[action, pattern], [action, pattern]]
        },
        bindmap: {...}
    }

    effects = {
        dataName: [
            element: [[action, access], ...]
        ]
    }
*/