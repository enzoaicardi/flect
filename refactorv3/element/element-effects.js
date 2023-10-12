/*

map: {
    []: {}
    product: {}
    product[]: {}
    product.0: {}
    product.0[]: {}
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

function applyEffects(key, path, value){

    // global effects
    for(let property in this.map[key + '[]']){
        console.log('[effects] globals -> key:', key, '|value:', value)
    }

    // current effects
    for(let property in this.map[path]){
        console.log('[effects] current -> key:', key, '|value:', value)
    }

}