export function isXAction(element){
    return element.tagName === 'X-FOR' || element.tagName === 'X-IF'
}

export function isXElement(element){
    return element.tagName[0] === 'X' && element.tagName[1] === '-'
}

export function isXAttribute(name){
    return name[0] === 'x' && name[1] === '-'
}