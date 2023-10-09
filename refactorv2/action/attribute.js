import { STYLE_ATTRIBUTE } from "../utils/vars.js"

export function getAttributeAction(name){

    switch (name){
        case 'x-text': return updateTextAction
        case 'x-html': return updateHtmlAction
        case 'x-show': return updateDisplayAction
        case 'x-ref': return updateRefAction
        default: return updateAttributeAction
    }

}

export function addScopedAction(element){
    element.setAttribute(STYLE_ATTRIBUTE, this._xclass.selector)
}

export function addListenersAction(element, bindmap){
    for(let event of bindmap.handler.events){
        element.addEventListener(event, bindmap.handler)
    }
}

/**
 * this - represent the component class instance
 * @param {*} _ the value of the variable
 * @param {HTMLElement} element the affected element
 * @param {Pattern} pattern
 */
function updateTextAction(_, element, pattern){
    element.textContent = this.getPatternValue(pattern, element)
}

function updateHtmlAction(_, element, pattern){
    element.innerHTML = this.getPatternValue(pattern, element)
}

function updateDisplayAction(_, element, pattern){

    let initial = element.style.display
    let value = this.getPatternValue(pattern, element)

    if(value) {
        element.style.display = 'none'
    }
    else{
        if(initial){ element.style.display = initial }
        else { element.style.removeProperty('display') }
    }

}

function updateRefAction(value, element, pattern){

    // if there is no value it's because the element wasn't binded before
    // so we execute all the callstack stored at this._xrefs
    if(!value){
        for(let action of this._xrefs[pattern.base]){
            action(element)
        }
    }
    // else we only execute the new action value
    else{
        let action = this._xdatas[pattern.base]
        !action || (action(element))
    }

}

function updateAttributeAction(_, element, pattern){
    element.setAttribute(pattern.attribute, this.getPatternValue(pattern, element))
}