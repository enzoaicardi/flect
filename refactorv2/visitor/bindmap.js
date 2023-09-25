import { isXAction, isXAttribute, isXElement, isXEventAttribute, isXScopedAttribute } from "../utils/test.js";
import { addListenersAction, addScopedAction, getAttributeAction } from "../action/attribute.js";
import { updateDataAction } from "../action/data.js";
import { getNodeAction } from "../action/node.js";
import { createPattern } from "../pattern/pattern.js";
import { createPath } from "../pattern/path.js";
import { HANDLER_PREFIX } from "../utils/vars.js";

export function createBindmap(node, matches = {}){

    let bindmap;

    // avoid over-usage of if statement
    let pending = {
        type: node.tagName,
        effects: {},
        onces: [],
        children: {/* bindmaps */},
        references: {}
    }

    if(isXAction(node)){

        let key = node.getAttribute('key')
        let val = node.getAttribute('var')

        if(val){

            let path = createPath(val, matches)
            let action = getNodeAction(node.tagName)

            if(key){
                let references = pending.references[key] = []
                    pending.match = key
                matches[key] = {path, references}
            }
            
            bindmap || (bindmap = pending)
            bindmap.break = node.tagName
            bindmap.content = node.childNodes
            bindmap.effects[path.steps[0][0]] = [[action, path]]

            // remove node from DOM
            node.remove()

            // todo remove console
            // console.log('X-FOR', val, bindmap.references)

        }

        
    }

    /*
        matches = {
            item: {path: Path, references: first_bindmap.references}
            item: {path: Path, references: second_bindmap.references}
        }
    */

    else {

        for(let x = 0; x < node.attributes.length; x++){

            let attribute = node.attributes[x]
            let name = attribute.name
            let value = attribute.value

            if(isXAttribute(name)){
                
                bindmap || (bindmap = pending)

                if(isXEventAttribute(name)){

                    let event = name.substring(5)

                    // to keep tracking events we use the magic method handleEvent
                    // that save memory and prevent double binding
                    bindmap.handler || (bindmap.handler = {
                        events: [],
                        handleEvent: (event)=>{
                            bindmap.handler[HANDLER_PREFIX + event.type].call(this, event)
                        }
                    })

                    bindmap.handler.events.push(event)
                    bindmap.handler[HANDLER_PREFIX + event] = this[value]
                    bindmap.onces.push(addListenersAction)

                }

                else if(isXScopedAttribute(name)){

                    // push only if component allow scoped style
                    !this._xclass.selector || (bindmap.onces.push(addScopedAction))

                }
        
                else{

                    // choose between attribute and datas actions
                    let action = !isXElement(node) || node === this ? (getAttributeAction(name)) : (updateDataAction(name))
                    
                    let pattern = createPattern(value, matches)
                        pattern.attribute = name.substring(2)
                    
                    for(let key in pattern.datas){
        
                        // get the parent data name
                        let dataName = pattern.datas[key].steps[0][0]
        
                        bindmap.effects[dataName] || (bindmap.effects[dataName] = [])
                        bindmap.effects[dataName].push([action, pattern])
        
                    }
                            
                }
                
                node.removeAttribute(name)
                x--
            
            }
    
        }

    }

    if(!isXElement(node) || node === this){
    
        let children = node.children

        for(let x = 0; x < children.length; x++){

            let result = this.createBindmap(children[x], matches)

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
        effects: {
            dataName: [[action, pattern], [action, pattern]]
            otherData: [[action, pattern], [action, pattern]]
        },
        children: {...Bindmap},
        references: {
            item: [...['item' ~ reference step to path]]
        }
    }

    effects = {
        dataName: [
            element: [[action, access], ...]
        ]
    }
*/