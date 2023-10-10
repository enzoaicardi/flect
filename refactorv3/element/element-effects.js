/*

    effects : {

        map: {
            product: [[
                [node, [action, ]]
            ]]
            product.[]: 
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