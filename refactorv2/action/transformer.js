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

    // defaults values
    setTransformerDefaults(element)

    // shortcuts
    let map = path.bindmap
    let count = element._xcount
    let value = this.getData(path, element)

    if(!!value && !count){
        transformerAppend.call(this, element, map, 0)
        element._xcount = 1
    }
    else if(!value && count){
        transformerRemove.call(this, element, map, 0)
        element._xcount = 0
    }

}

function updateForAction(_, element, path){

    // defaults values
    setTransformerDefaults(element)

    // shortcuts
    let map = path.bindmap
    let count = element._xcount
    let value = this.getData(path, element)

    // forloop setup
    let length = typeof value === 'number' ? value : value.length
    let gap = length - count

    if(gap > 0){
        for(let x = count; (x < count + gap) && x < length; x++){
            transformerAppend.call(this, element, map, x, path)
        }
    }

    else if(gap < 0){
        for(let x = count - 1; (x > (count - 1) + gap) && x >= 0; x--){
            transformerRemove.call(this, element, map, x)
        }
    }

    element._xcount += gap

}

function setTransformerDefaults(element){
    element._xmatches || (element._xmatches = [])
    element._xbinded || (element._xbinded = {})
    element._xcount || (element._xcount = 0)
}

function transformerAppend(element, map, index, path){

    // clone rootElement and setup matches
    let clone = map.rootElement.cloneNode(true)
        clone._xmatches = path ? new Map(element._xmatches) : element._xmatches
        !path || (clone._xmatches.set(path, index))

    // create boundary <!----> and add reference to rootElement
    let child = xcomment.cloneNode()
        child.rootElement = map.rootElement

    // get _xbinded
    element._xbinded[index] = this.bindElement(clone, map)

    // insert childs and boundary
    do{
        element.parentNode.insertBefore(child, element)
    } while(child = clone.firstChild)

}

function transformerRemove(element, map, index){

    let sibling = {}

    // remove corresponding element from dom
    while((!sibling.rootElement || sibling.rootElement !== map.rootElement) && (sibling = element.previousSibling)){
        sibling.remove()
    }

    // remove element effects from proxy
    this.unbindElements(element._xbinded[index])

    // dev => check if proxy is cleared
    // console.log('- remove elements', this.proxy.effects, this.proxy.mapping)

}