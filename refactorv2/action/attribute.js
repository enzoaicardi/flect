import { STYLE_ATTRIBUTE } from "../element/style.js"

export function getAttributeAction(name){

    switch (name){
        case 'x-text': return updateTextAction
        case 'x-html': return updateHtmlAction
        case 'x-show': return updateDisplayAction
        case 'x-ref': return updateRefAction
        case 'x-scoped': return setScopedAction
        default: return updateAttributeAction
    }

}

/**
 * this - represent the component class instance
 * @param {*} _ the value of the variable
 * @param {HTMLElement} element the affected element
 * @param {Pattern} pattern
 */
function updateTextAction(_, element, pattern){
    element.textContent = this.getValue(pattern)
}

function updateHtmlAction(_, element, pattern){
    element.innerHTML = this.getValue(pattern)
}

function updateDisplayAction(_, element, pattern){

    let initial = element.style.display
    let value = this.getValue(pattern)

    if(value) {
        element.style.display = 'none'
    }
    else{
        if(initial){ element.style.display = initial }
        else { element.style.removeProperty('display') }
    }

}

function updateRefAction(_, element, pattern){

    let actions = this._xrefs[pattern.base] || []
    
    for(let action of actions){
        action(element)
    }

}

function setScopedAction(_, element){
    !this._xclass.selector || (element.setAttribute(STYLE_ATTRIBUTE, this._xclass.selector))
}

function updateAttributeAction(_, element, pattern){
    element.setAttribute(pattern.attribute, this.getValue(pattern))
}