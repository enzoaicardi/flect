
export function getAction(name){

    switch (name){
        case 'x-text': return updateTextAction
        case 'x-html': return updateHtmlAction
        default: return updateAttributeAction
    }

}

export function updateTextAction(_, element, pattern){

    element.textContent = this.getValue(pattern)

}

export function updateHtmlAction(_, element, pattern){

    element.innerHTML = this.getValue(pattern)

}

export function updateStyleAction(_, element, pattern){

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