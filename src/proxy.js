export default function proxyFactory(){

    return {

        /*effects : { *Object
            dataName: [[ *Map
                key|element: [action, action, action]
            ]]
        }*/
        effects: {},

        effect(dataName, key, action){

            // setup the default dataName Map
            if(!this.effects[dataName]){
                this.effects[dataName] = new Map();
            }

            // setup the default key Array
            if(!this.effects[dataName].get(key)){
                this.effects[dataName].set(key, []);
            }

            // push the current binded action
            this.effects[dataName].get(key).push(action);

        },

        clear(dataName, key){
            if(key){ this.effects[dataName].delete(key); }
            else{ delete this.effects[dataName]; }
        },

        set(target, dataName, value){

            // update the value first
            target[dataName] = value;
            // console.log('change prop', dataName, 'for', value);

            // explore related effects
            if(this.effects[dataName]){
                for(let [key, array] of this.effects[dataName]){
                    for(let action of array){
                        action(value, key);
                    }
                }
            }

            return true;

        }

    }

};
