import { isXTransformer, isXAttribute, isXElement, isXEventAttribute, isXScopedAttribute } from "../utils/test.js";
import { addListenersAction, addScopedAction, getAttributeAction } from "../action/attribute.js";
import { updateDataAction } from "../action/data.js";
import { getNodeAction } from "../action/transformer.js";
import { createPattern } from "../pattern/pattern.js";
import { createPath } from "../pattern/path.js";
import { HANDLER_PREFIX } from "../utils/vars.js";
import { fragment, xcomment } from "../utils/node.js";

// TODO : clean this code

export function createBindmap(node, matches = {}){

    // check if it's a bindable node
    if(node.nodeType !== 1 && node.nodeType !== 11) return;

    // avoid over-usage of if statement
    let pending = {
        effects: {},
        onces: [],
        children: {/* bindmaps */}
    }

    // setup bindmap
    let bindmap
        
    if(node.nodeType === 1){

        // if node is a transormer (x-for, x-if, etc...)
        if(isXTransformer(node)){

            pending.type = node.tagName
            let key = node.getAttribute('key')
            let val = node.getAttribute('var')

            // without value we dont trigger binding
            if(val){

                let path = createPath(val, matches)
                let action = getNodeAction(node.tagName)

                // if there is a key we update the matches
                !key || (matches[key] = path)

                /*
                matches = {
                    dataName: Path,
                    dataName: Path
                }
                */

                // here we can directly replace the node because
                // children are stored inside bindmap.rootElement and
                // must be used by the tranformer action
                node.replaceWith(xcomment.cloneNode())
                
                // bindmap update for binding
                bindmap || (bindmap = pending)
                bindmap.break = true
                bindmap.rootElement = fragment.cloneNode()
                bindmap.effects[path.dataName] = [[action, path]]

                // path update for transformers
                path.bindmap = bindmap

                // fragment update
                bindmap.rootElement.append(xcomment.cloneNode(), ...node.childNodes)
                node = bindmap.rootElement

            }
            
        }

        // if node is an element node (including x-elements)
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
                        let action = !isXElement(node) || node === this ? (getAttributeAction(name)) : updateDataAction
                        
                        let pattern = createPattern(value, matches)
                            pattern.attribute = name.substring(2)
                        
                        for(let key in pattern.datas){
            
                            // get the parent data name
                            let dataName = pattern.datas[key].dataName
            
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

    }

    // create children bindmaps
    if((!isXElement(node) || node === this) && node.firstChild){
    
        let child = node.firstChild
        let index = 0

        do {

            let result = this.createBindmap(child, matches)

            if(result){
                bindmap || ((bindmap = pending) && (bindmap.static = true))
                bindmap.children[index] = result
            }
                
            index++

        } while (child = child.nextSibling)

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