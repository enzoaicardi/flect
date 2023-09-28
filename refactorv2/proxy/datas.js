
export function proxyDatas(ctx){

    return {

        /* 
        effects: {
            'dataName': [[
                element : [a,b,c],
                clone:  '---^'
            ]]
        }
        */

        ctx: ctx,
        effects: {},
        mapping: new Map(),

        effect(dataName, caller, actions){

            let effects = this.effects
            let mapping = this.mapping

            // setup the default dataName object
            if(!effects[dataName]){
                effects[dataName] = new Map()
            }

            // setup the default caller array
            if(!effects[dataName].get(caller)){
                effects[dataName].set(caller, [])
                if(!mapping.get(caller)){
                    mapping.set(caller, [])
                }
            }

            // push the current binded action
            effects[dataName].get(caller).push(...actions)
            mapping.get(caller).push(dataName)

        },

        remove(element){
            for(let dataName of this.mapping.get(element)){
                this.effects[dataName].delete(element)
                this.mapping.delete(element)
            }
        },

        run(dataName, value){

            let effects = this.effects

            // if effect exist for that data
            if(effects[dataName]){

                // explore all callers
                for(let [caller, actions] of effects[dataName]){

                    // run every action from every caller
                    for(let [action, pattern] of actions){

                        // dev => check effect
                        // console.log('run action on ->', caller, 'for value =', value);
                        action.call(ctx, value, caller, pattern)

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