/*

    product.[].name

    effects : {

        map: {
            product: {
                0: [node, action]
            }
            product.[]: {
                ...
            }
            product.0: {
                0: [node, action]
                1: [node, action]
            }
        }

    }

*/

export function createElementEffects(xelement){

    return {

        context: xelement,
        
        map: new Map(),

        createEffect: createEffect,

        removeEffect: removeEffect,

        applyEffects: applyEffects

    }

}

function createEffect(){
    
}

function removeEffect(){

}

function applyEffects(key, value){
    console.log('key:', key, '|value:', value)
}