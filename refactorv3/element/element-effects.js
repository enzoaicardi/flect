/*

map: {
    []: {}
    product: {}
    product.[]: {}
    product.0: {}
    product.0.[]: {}
    product.0.name: {}
}

*/

export function createElementEffects(xelement){

    return {

        context: xelement,
        
        map: {},

        createEffect: createEffect,

        removeEffect: removeEffect,

        applyEffects: applyEffects

    }

}

function createEffect(key, node, action){
    
}

function removeEffect(){

}

function applyEffects(key, value){
    console.log('key:', key, '|value:', value)
}