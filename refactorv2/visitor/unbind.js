import { isXElement } from "../utils/test.js"

export function unbindElements(array){

    for(let element of array){

        // unbind x-elements (remove proxy)
        element.nodeType !== 1 || !isXElement(element) || (element.disconnectXElement())
        
        // unbind x-transformer elements (remove sub-elements from proxy)
        if(element._xbinded){
            for(let index in element._xbinded){
                this.unbindElements(element._xbinded[index])
            }
        }

        this.proxy.remove(element)

    }

}