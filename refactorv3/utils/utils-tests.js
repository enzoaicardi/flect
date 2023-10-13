export function isXElement(element){
    return element.tagName.indexOf('X-') === 0
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