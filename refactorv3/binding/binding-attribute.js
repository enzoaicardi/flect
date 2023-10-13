import { getPathValue, getPatternValue } from "../path/path-accesser.js"

export function getAttributeAction(name, path){

    switch(name){
        case 'x-ref': return updateRefAction
        case 'x-show': return updateDisplayAction
        case 'x-text': return path.isPattern ? updateTextPatternAction : updateTextAction
        case 'x-html': return path.isPattern ? updateHtmlPatternAction : updateHtmlAction
        default: return path.isPattern ? updateAttributePatternAction : updateAttributeAction
    }

}

// x-text
function updateTextAction(value, path){
    this.textContent = getPathValue(value, path)
}

function updateTextPatternAction(value, pattern, key){
    this.textContent = getPatternValue(value, pattern, key)
}

// x-html
function updateHtmlAction(value, path){
    this.innerHTML = getPathValue(value, path)
}

function updateHtmlPatternAction(value, pattern, key){
    this.innerHTML = getPatternValue(value, pattern, key)
}

// x-attr
function updateAttributeAction(value, path){
    this.setAttribute(path.attribute, getPathValue(value, path))
}

function updateAttributePatternAction(value, pattern, key){
    this.setAttribute(pattern.attribute, getPatternValue(value, pattern, key))
}

// x-show
function updateDisplayAction(value, path){

    let initial = this.style.display
    let visible = getPathValue(value, path)

    if(!visible){
        this.style.display = 'none'
    }
    else{
        initial ? (this.style.display = initial) : (this.style.removeProperty('display'))
    }

}

// x-ref
// TODO : a réimplémenter comme il faut