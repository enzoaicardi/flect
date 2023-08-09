export function proxyDatas(){

    return {

        /*effects : { *Object
            dataName: [[ *Map
                key|element: [action, action, action]
            ]]
        }*/
        effects: {},

        effect(dataName, key, action){

            let effects = this.effects;

            // setup the default dataName Map
            if(!effects[dataName]){
                effects[dataName] = new Map();
            }

            // setup the default key Array
            if(!effects[dataName].get(key)){
                effects[dataName].set(key, []);
            }

            // push the current binded action
            effects[dataName].get(key).push(action);

        },

        run(dataName, value){
            if(this.effects[dataName]){
                for(let [key, array] of this.effects[dataName]){
                    for(let action of array){
                        // console.log('run action on ->', key, 'for value =', value);
                        action(value, key);
                    }
                }
            }
        },

        set(target, dataName, value){

            // update the value first
            target[dataName] = value;

            // explore related effects
            this.run(dataName, value);

            // return success
            return true;

        }

        /*
        clear(dataName, key){
            if(key){ this.effects[dataName].delete(key); }
            else{ delete this.effects[dataName]; }
        },
        */

    }

};

export function proxyIterable(dataName){

    return {

        get(target, key){
            if(key === '_xiterable'){ return true; }
            if(key === 'get'){ return target[dataName]; }
            return {
                get key(){
                    return key;
                },
                get value(){
                    return target[dataName][key];
                },
                get parent(){
                    return target[dataName];
                }
            };
        }

    };

}