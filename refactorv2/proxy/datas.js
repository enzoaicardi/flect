
export function proxyDatas(){

    return {

        /* 
        effects: {
            'dataName': [[
                element : [a,b,c],
                clone:  '---^'
            ]]
        }
        */

        effects: {},

        effect(dataName, caller, action){

            let effects = this.effects

            // setup the default dataName object
            if(!effects[dataName]){
                effects[dataName] = new Map()
            }

            // setup the default caller array
            if(!effects[dataName].get(caller)){
                effects[dataName].set(caller, [])
            }

            // push the current binded action
            effects[dataName].get(caller).push(action)

        },

        run(dataName, value){

            let effects = this.effects

            // if effect exist for that data
            if(effects[dataName]){

                // explore all callers
                for(let [caller, actions] of effects[dataName]){

                    // run every action from every caller
                    for(let action of actions){

                        // console.log('run action on ->', caller, 'for value =', value);
                        action.call(caller, value)

                    }

                }

            }

        },

        set(target, dataName, value){

            // update the value first
            target[dataName] = value

            // explore related effects
            this.run(dataName, value)

            // return success
            return true

        }
        
    }

}