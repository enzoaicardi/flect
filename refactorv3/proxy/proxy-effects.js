/*

*/

export function createProxyEffects(xelements, key){

    return {
        
        key: key,

        contexts: xelements,

        // explore an object a create necessary proxys
        build: build,

        // push new context into proxy object
        populate: populate,
        
        // set a property, trigger effects and create necessary proxys
        set: setter,

    }

}

function build(object, key){

    // loop over all object properties
    for(let property in object){

        if(typeof object[property] === 'object'){

            // change property to proxy reference 
            object[property] = this.build(object[property], key + '.' + property)

        }

    }

    // create the proxy observer
    let proxy = createProxyEffects(this.contexts, key)

    // define _xproxy property on object
    Object.defineProperty(object, '_xproxy', {
        enumerable: false,
        configurable: false,
        writable: false,
        value: proxy,
    })

    // create a new proxy
    return new Proxy(object, proxy)

}

function populate(xelement, target){

    this.contexts.push(xelement)

    for(let key in target){

        if(!!target[key]._xproxy){

            target[key]._xproxy.populate(xelement, target)

        }

    }

}

// every property set (works also for push, pop, etc...)
function setter(object, property, value){

    // trigger update only if property value change
    if(object[property] !== value){

        // setup the proxy access key
        let key = this.key + '.' + property

        // build if the new value is an object
        if(typeof value === 'object'){
            value = this.build(value, key)
        }

        // setup property value
        object[property] = value

        let x = this.contexts.length - 1
        
        // apply effects of all contexts or lazy remove
        while(x--){
            let effects = this.contexts[x]._xeffects
            !effects ? (this.contexts.splice(x, 1)) : (effects.applyEffects(key, value))
        }

    }

    return true

}