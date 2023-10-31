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
    let globalKey = key + '[]'
    executeEffects(this.map[globalKey], globalKey, value)

    // current effects
    executeEffects(this.map[path], path, value)

}

function executeEffects(map, key, value){

    console.log(map, key, value)

    // if map does not exist
    if(!map) return;

    // get all Effect<node: [path, action]>
    for(let [node, [path, action]] of map){

        // run the effect
        action.call(node, value, path, key)

    }

}