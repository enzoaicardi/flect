import { xcomment } from "../utils/node.js"

export function getNodeAction(name){

    switch (name){
        case 'X-IF': return updateIfAction
        case 'X-FOR': return updateForAction
        default: throw 'Undefined'
    }

}

/**
 * context - this represent the component class instance
 * @param {*} _ the value of the variable
 * @param {HTMLElement} element the affected element
 * @param {Path} path
 */

function updateIfAction(_, element, path){
    // this.getData(path)
    // console.log('run x-if transformer !')
}

function updateForAction(_, element, path){

    // defaults values
    element._xmatches || (element._xmatches = [])
    element._xbinded || (element._xbinded = {})
    element._xcount || (element._xcount = 0)

    // retrieve bindmap
    let map = path.bindmap

    // forloop setup
    let count = element._xcount
    let value = this.getData(path, element)
    let length = typeof value === 'number' ? value : value.length
    let gap = length - count

    if(gap > 0){

        for(let x = count; (x < count + gap) && x < length; x++){

            // clone rootElement <x-for>
            let clone = map.rootElement.cloneNode(true)

            // create boundary <!----> and add reference to rootElement
            let child = xcomment.cloneNode()
                child.rootElement = map.rootElement
            
            // setup matches
            clone._xmatches = new Map(element._xmatches)
            clone._xmatches.set(path, x)

            // get _xbinded
            element._xbinded[x] = this.bindElement(clone, map)

            // insert childs and boundary
            do{
                element.parentNode.insertBefore(child, element)
            } while(child = clone.firstChild)

        }

    }

    else if(gap < 0){

        for(let x = count - 1; (x > (count - 1) + gap) && x >= 0; x--){

            let sibling = {}

            // remove corresponding element from dom
            while((!sibling.rootElement || sibling.rootElement !== map.rootElement) && (sibling = element.previousSibling)){
                sibling.remove()
            }

            // remove element effects from proxy
            this.unbindElements(element._xbinded[x])

        }
        
        // dev => check if proxy is cleared
        // console.log('- remove elements', this.proxy.effects, this.proxy.mapping)
    
    }

    element._xcount += gap

}