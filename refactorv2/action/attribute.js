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

    // mauvaise gestion des references, les references doivent etre liées a une data du meme nom
    // on doit avoir un proxy pour les références
    // les references doivent pouvoir etre des composants
    // TODO - gérer en plus les évenements avec eventHandler natif ? et attribut x-on:... ?
    // sinon comment avoir la référence du composant parent ?
    let actions = this._xrefs[pattern.base] || []
    
    for(let action of actions){
        action(element)
    }

}

function updateAttributeAction(_, element, pattern){
    element.setAttribute(pattern.attribute, this.getValue(pattern))
}