/*

*/

export function createElementEffects(xelement){

    return {

        context: xelement,

        map: {/*
            []: {}
            product: {}
            product[]: {}
            product.0: {}
            product.0[]: {}
            product.0.name: {}
        */},

        createEffect: createEffect,

        removeEffect: removeEffect,

        applyEffects: applyEffects

    }

}

function createEffect(key, node, effect){
    !this.map[key] && (this.map[key] = new Map())
    this.map[key].set(node, effect)
}

function removeEffect(key, node){
    this.map[key].delete(node)
}

function applyEffects(key, path, value){

    // global effects
    executeEffects(this.map, key + '[]', value)

    // current effects
    executeEffects(this.map, path, value)

}

function executeEffects(map, key, value){
    
    // if map does not exist
    if(!map[key]) return;

    console.log(map[key], key, value)

    // get all Effect<node: [path, action]>
    for(let [node, [path, action]] of map[key]){

        // run the effect
        action.call(node, value, path, key)

    }

}