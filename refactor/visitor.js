import { isXElement } from "./assets.js"

export function visit(root, callback){

    for(let node of [...root.children]){

        let result = callback(node)

        if(result){
            visit(node, callback)
        }

    }

}

export function copyNode(element, jar){

    for(let node of [...element.childNodes]){

        if(node.nodeType === 1){

            if(isXElement(node)){

                let clone = node.cloneNode(true)
                    jar.appendChild(clone)
                    this.bindElement(clone)

            }

            else{
                
                if(!node._xbinded){ this.bindElement(node) }
                
                let clone = node.cloneNode()
                    this.proxy.clone(node, clone)
                    jar.appendChild(clone)
                
                this.copyNode(node, clone)

            }
            
        }

        else{
            jar.appendChild(node.cloneNode())
        }

    }

}