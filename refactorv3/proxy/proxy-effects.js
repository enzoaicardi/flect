/*

    explain...

    doit être utilisé pour affecter un element du dom lors d'un changement sur
    l'objet auquel il est rattaché

*/

export function createProxyEffects(xelement){

    return {

        // store the execution context
        context: xelement,

        createEffect: createEffect,

        removeEffect: removeEffect,

        set: setter

    }

}

// every property set (works also for push, pop, etc...)
function setter(object, property, value){}

function createEffect(){}

function removeEffect(){}