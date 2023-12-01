/*
    Pas viable car on get a chaque fois, ce qui fait que pour chaque modification on entraine a son
    tour plusieurs getters etc...
*/

// globalKey correspon to the actual key used by the proxy
// this key should be global because contexts can be shared
export let globalKey = ''

export function createProxyDatas(contexts, root = false){

    return {
        root: root,
        contexts: contexts,
        get: getter,
        set: setter
    }

}

function getter(target, property){
    globalKey += ('.' + property)
    return target[property]
}

function setter(target, property, value){

    // populate the new value with ProxyDatas
    if(typeof value === 'object'){
        // ...
    }

    // set the new value
    target[property] = value

    // get the contexts to apply effects
    const contexts = (this.root ? this.contexts : this.contexts.contexts)

    // apply effects from globalKey value
    let x = contexts.length
    while(x--){
        let effects = contexts[x]._xeffects
        // lazy remove effects if 
        !effects ? (contexts.splice(x, 1)) : (effects.applyEffects(this.key, key, value))
    }

    // reset globalKey
    globalKey = ''
}