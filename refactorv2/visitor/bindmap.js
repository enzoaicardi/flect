import { isXTransformer, isXAttribute, isXElement, isXEventAttribute, isXScopedAttribute } from "../utils/test.js";
import { addListenersAction, addScopedAction, getAttributeAction } from "../action/attribute.js";
import { updateDataAction } from "../action/data.js";
import { getNodeAction } from "../action/node.js";
import { createPattern } from "../pattern/pattern.js";
import { createPath } from "../pattern/path.js";
import { HANDLER_PREFIX } from "../utils/vars.js";
import { xcomment } from "../utils/node.js";

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

    if(isXTransformer(node)){

        let key = node.getAttribute('key')
        let val = node.getAttribute('var')

        // without value we dont trigger binding
        if(val){

            let path = createPath(val, matches)
            let action = getNodeAction(node.tagName)

            // if there is a key we update the match array
            if(key){

                let references = pending.references[key] = []
                    pending.match = key
                matches[key] = {path, references}

                /*
                    matches = {
                        item: {path: Path, references: first_bindmap.references}
                        item: {path: Path, references: second_bindmap.references}
                    }
                */
            }
            
            // bindmap update for binding
            bindmap || (bindmap = pending)
            bindmap.break = node.tagName
            bindmap.rootElement = node
            bindmap.effects[path.steps[0][0]] = [[action, path]]

            // path update for transformers
            path.bindmap = bindmap

        }

        // here we can directly replace the node because
        // children are stored inside bindmap.rootElement and
        // must be used by the tranformer action
        node.replaceWith(xcomment.cloneNode())
        
    }

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
                
                // clearing attributes
                node.removeAttribute(name)
                x--
            
            }
    
        }

    }

    if(!isXElement(node) || node === this){
    
        let child = node.firstChild
        let index = 0

        if(child){

            do {

                if(child.nodeType === 1 || child.nodeType === 8){

                    let result = this.createBindmap(child, matches)

                    if(result){
                        bindmap || (bindmap = pending)
                        bindmap.children[index] = result
                    }

                }
                 
                index++

            } while (child = child.nextSibling)

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