/*

    product.[].name

    effects : {

        map: {
            []: {

            }
            product: {
                0: [node, action]
            }
            product.[]: {
                index: [[node, node, node], action]
            }
            product.0: {
                0: [node, action]
                1: [node, action]
                ... cascading to product.0.[]
            }
            product.0.[]: {
                ...
            }
            product.0.name: {
                ... only this
            }
        }

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