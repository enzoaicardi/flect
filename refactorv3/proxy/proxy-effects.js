/*

*/

import { buildProxy } from "./proxy-globals.js"

export function createProxyEffects(xelement, key){

    return {
        
        key: key,

        context: xelement,

        // explore an object a create necessary proxys
        build: build,
        
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

    // create a new proxy
    return buildProxy(object, createProxyEffects(this.context, key))

}

// every property set (works also for push, pop, etc...)
function setter(object, property, value){

    // trigger update only if property value change
    if(object[property] !== value){

        let key = this.key + '.' + property

        if(typeof value === 'object'){
            value = this.build(value, key)
        }

        object[property] = value

        this.context._xeffects.applyEffects(key, value)

    }

    return true

}