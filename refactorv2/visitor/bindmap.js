import { isXAction, isXAttribute, isXElement } from "../utils/test.js";
import { getAttributeAction } from "../action/attribute.js";
import { getNodeAction } from "../action/node.js";
import { createPattern } from "../pattern/pattern.js";
import { createPath } from "../pattern/path.js";

export function createBindmap(node, matches = {}){

    let bindmap;
    // avoid over-usage of if statement
    let pending = {type: node.tagName, datas: {}, children: {}, dynamic: {}}

    if(isXAction(node)){

        let key = node.getAttribute('key')
        let val = node.getAttribute('var')

        if(val){

            let path = createPath(val, matches)
            let action = getNodeAction(node.tagName)

            if(key){
                let ref = pending.dynamic[key] = []
                matches[key] = {path, ref}
            }
            
            bindmap = pending
            bindmap.action = node.tagName
            bindmap.datas[path.steps[0][0]] = [[action, path]]

            // todo remove console
            // console.log('X-FOR', val, bindmap.dynamic)

        }

        
    }

    /*
        matches = {
            item: {path: Path, ref: first_bindmap.dynamic}
            item: {path: Path, ref: second_bindmap.dynamic}
        }
    */

    else {

        for(let x = 0; x < node.attributes.length; x++){

            let attribute = node.attributes[x]
            let name = attribute.name
            let value = attribute.value
    
            if(isXAttribute(name)){
    
                let pattern = createPattern(value, matches)
                    pattern.attribute = name.substring(2)
    
                let action = getAttributeAction(name)
                let datas = pattern.datas
    
                bindmap || (bindmap = pending)
                
                for(let key in datas){
    
                    let dataName = datas[key].steps[0][0]
    
                    bindmap.datas[dataName] || (bindmap.datas[dataName] = [])
                    bindmap.datas[dataName].push([action, pattern])
    
                }
    
                node.removeAttribute(name)
                x--
    
            }
    
        }

    }

    if(!isXElement(node) || isXAction(node) || node === this){
    
        let children = node.children

        for(let x = 0; x < children.length; x++){

            let result = createBindmap(children[x], matches)

            if(result){
                bindmap || (bindmap = pending)
                bindmap.children[x] = result
            }

        }

    }

    return bindmap

}

/*
    x-text="Hello {client.name} i'm {user.name}"
    x-class="button {icon} {inverted}"

    bindmap = index: {
        datas: {
            dataName: [[action, pattern], [action, pattern]]
            otherData: [[action, pattern], [action, pattern]]
        },
        children: {...Bindmap},
        dynamic: {
            item: [...['item' ~ reference step to path]]
        }
    }

    effects = {
        dataName: [
            element: [[action, access], ...]
        ]
    }
*/