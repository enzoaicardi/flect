export function isXTransformer(element){
    return element.tagName === 'X-FOR' || element.tagName === 'X-IF'
}

export function isXElement(element){
    return element.tagName.indexOf('X-') === 0 && !isXTransformer(element)
}

export function isXAttribute(name){
    return name.indexOf('x-') === 0
}

export function isXEventAttribute(name){
    return name.indexOf('x-on:') === 0
}

export function isXScopedAttribute(name){
    return name === 'x-scoped'
}