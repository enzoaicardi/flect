
export function getAttributeAction(name){

    switch (name){
        case 'x-text': return updateTextAction
        case 'x-html': return updateHtmlAction
        case 'x-show': return updateDisplayAction
        default: return updateAttributeAction
    }

}

/**
 * this - represent the component class instance
 * @param {*} _ the value of the variable
 * @param {HTMLElement} element the affected element
 * @param {Pattern} pattern
 */
export function updateTextAction(_, element, pattern){
    element.textContent = this.getValue(pattern)
}

export function updateHtmlAction(_, element, pattern){
    element.innerHTML = this.getValue(pattern)
}

export function updateDisplayAction(_, element, pattern){

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

export function updateAttributeAction(_, element, pattern){
    element.setAttribute(pattern.attribute, this.getValue(pattern))
}