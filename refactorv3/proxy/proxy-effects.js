/*

*/

import { buildProxy } from "./proxy-globals"

export function createProxyEffects(xelement){

    return proxy = {

        context: xelement,

        // explore an object a create necessary proxys
        build: build,
        
        // set a property, trigger effects and create necessary proxys
        set: setter,
        
        // apply all triggered effects
        run: runner

    }

}

function build(object){

    // loop over all object properties
    for(let property in object){

        if(typeof object[property] === 'object'){

            // change property to proxy reference 
            object[property] = this.build(object[property])

        }

    }

    return buildProxy(object, this.context.proxy)

}

// every property set (works also for push, pop, etc...)
function setter(object, property, value){

    // trigger update only if property value change
    if(object[property] !== value){

        if(typeof value === 'object'){
            value = this.build(value)
        }

        object[property] = value

        this.run(property, value)

    }

}

function runner(property, value){

    let xelement = this.context

    // loop over xelement effects linked to property

}