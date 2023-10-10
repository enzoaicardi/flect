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
    let value = this.getPathValue(path, element)

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
    let value = this.getPathValue(path, element)

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
    // TODO : delete this if unused
    // element._xbounds || (element._xbounds = {})
    element._xbinded || (element._xbinded = {})
    element._xcount || (element._xcount = 0)
}

function transformerAppend(element, map, index, path){

    // clone xroot and setup matches
    let clone = map.xroot.cloneNode(true)
        clone._xmatches = path ? new Map(element._xmatches) : element._xmatches
        !path || (clone._xmatches.set(path, index))

    // add xroot reference to boundary
    clone.firstChild.xroot = map.xroot
    // TODO : voir si pas mieux de ne pas passer par le xroot property

    // bind fragment
    element._xbinded[index] = this.bindElements(clone, map)

    // get _xbinded
    element.parentNode.insertBefore(clone, element)

}

function transformerRemove(element, map, index){

    // remove element effects from proxy
    this.unbindElements(element._xbinded[index])
    delete element._xbinded[index]

    let sibling = {}
    let parent = element.parentNode

    while((!sibling.xroot || sibling.xroot !== map.xroot) && (sibling = element.previousSibling)){
        parent.removeChild(sibling)
    }

    // dev => check if proxy is cleared
    // console.log('- remove elements', this.proxy.effects, this.proxy.mapping)

}